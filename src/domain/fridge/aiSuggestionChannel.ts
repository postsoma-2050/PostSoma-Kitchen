import {
  beginAiSuggestion,
  cancelAiSuggestion,
  createAiSuggestionError,
  createAiSuggestionState,
  reconcileAiSuggestionSnapshot,
  validateAiSuggestionResponse,
  type AiIngredientSnapshot,
  type AiSuggestionError,
  type AiSuggestionState,
} from './aiSuggestionContract'
import { applyAiSuggestionSafetyPolicy } from './aiFoodSafety'
import {
  AiSuggestionGatewayError,
  createAiSuggestionRequest,
  type AiSuggestionGateway,
} from './aiSuggestionGateway'

export type AiSuggestionStateListener = (state: AiSuggestionState) => void

interface ActiveRequest {
  id: string
  controller: AbortController
}

function canGenerateForSnapshot(snapshot: AiIngredientSnapshot): boolean {
  return snapshot.customIngredients.length > 0
    || snapshot.selectedIngredients.some(ingredient => !ingredient.isBasicPantry)
}

function errorFromUnknown(error: unknown): AiSuggestionError {
  if (error instanceof AiSuggestionGatewayError) return error.detail
  if (error instanceof Error && error.name === 'AbortError') {
    return createAiSuggestionError('cancelled', '已取消 AI 即时做法生成', { retryable: false })
  }
  return createAiSuggestionError('unknown', error instanceof Error ? error.message : 'AI 建议生成失败')
}

/**
 * Vue-independent coordinator for one explicit AI request at a time. It owns no
 * recipe store and exposes no persistence callback, so a successful suggestion can
 * only become transient channel state.
 */
export class AiSuggestionChannel {
  private state: AiSuggestionState
  private activeRequest?: ActiveRequest
  private requestSequence = 0
  private readonly listeners = new Set<AiSuggestionStateListener>()

  constructor(
    initialSnapshot: AiIngredientSnapshot,
    private readonly gateway: AiSuggestionGateway,
  ) {
    this.state = createAiSuggestionState(initialSnapshot, gateway.getReadiness().status === 'ready')
  }

  getState(): AiSuggestionState {
    return this.state
  }

  subscribe(listener: AiSuggestionStateListener): () => void {
    this.listeners.add(listener)
    listener(this.state)
    return () => this.listeners.delete(listener)
  }

  refreshReadiness(): AiSuggestionState {
    if (this.activeRequest) return this.state
    this.state = createAiSuggestionState(this.state.snapshot, this.gateway.getReadiness().status === 'ready')
    this.notify()
    return this.state
  }

  updateSnapshot(nextSnapshot: AiIngredientSnapshot): AiSuggestionState {
    if (this.state.snapshot.id === nextSnapshot.id) return this.state
    const active = this.activeRequest
    this.activeRequest = undefined
    active?.controller.abort()
    this.state = reconcileAiSuggestionSnapshot(
      this.state,
      nextSnapshot,
      this.gateway.getReadiness().status === 'ready',
    )
    this.notify()
    return this.state
  }

  cancel(): AiSuggestionState {
    if (!this.activeRequest || this.state.status !== 'generating') return this.state
    const active = this.activeRequest
    this.activeRequest = undefined
    this.state = cancelAiSuggestion(this.state)
    active.controller.abort()
    this.notify()
    return this.state
  }

  async requestSuggestion(): Promise<AiSuggestionState> {
    if (this.activeRequest) return this.state

    if (!canGenerateForSnapshot(this.state.snapshot)) {
      const error = createAiSuggestionError(
        'invalid-input',
        '请至少选择一种非基础调味食材，或输入一种自定义食材',
        { retryable: false },
      )
      this.state = {
        status: 'failure',
        snapshot: this.state.snapshot,
        message: error.message,
        error,
      }
      this.notify()
      return this.state
    }

    const readiness = this.gateway.getReadiness()
    if (readiness.status !== 'ready') {
      this.state = { status: 'unconfigured', snapshot: this.state.snapshot }
      this.notify()
      return this.state
    }

    this.requestSequence += 1
    const requestId = `ai-request-${this.requestSequence}-${this.state.snapshot.id}`
    const request = createAiSuggestionRequest(this.state.snapshot, requestId)
    const controller = new AbortController()
    this.activeRequest = { id: requestId, controller }
    this.state = beginAiSuggestion(this.state, requestId)
    this.notify()

    try {
      const rawResponse = await this.gateway.generate(request, controller.signal)
      if (this.activeRequest?.id !== requestId || this.state.snapshot.id !== request.snapshot.id) return this.state

      const validated = validateAiSuggestionResponse(rawResponse, request)
      if (!validated.ok) {
        const error = createAiSuggestionError('invalid-response', validated.errors.join('；'), { retryable: false })
        this.activeRequest = undefined
        this.state = {
          status: 'failure',
          snapshot: request.snapshot,
          requestId,
          message: error.message,
          error,
        }
        this.notify()
        return this.state
      }

      const safetyChecked = applyAiSuggestionSafetyPolicy(validated.value, request.safetyRules)
      if (!safetyChecked.ok) {
        const error = createAiSuggestionError('safety-blocked', safetyChecked.errors.join('；'), { retryable: false })
        this.activeRequest = undefined
        this.state = {
          status: 'failure',
          snapshot: request.snapshot,
          requestId,
          message: error.message,
          error,
        }
        this.notify()
        return this.state
      }

      this.activeRequest = undefined
      this.state = {
        status: 'success',
        snapshot: request.snapshot,
        requestId,
        suggestion: safetyChecked.value,
      }
      this.notify()
      return this.state
    } catch (error) {
      if (this.activeRequest?.id !== requestId) return this.state
      this.activeRequest = undefined
      const detail = errorFromUnknown(error)
      if (detail.code === 'cancelled') {
        this.state = cancelAiSuggestion(this.state)
      } else {
        this.state = {
          status: 'failure',
          snapshot: request.snapshot,
          requestId,
          message: detail.message,
          error: detail,
        }
      }
      this.notify()
      return this.state
    }
  }

  dispose(): void {
    const active = this.activeRequest
    this.activeRequest = undefined
    active?.controller.abort()
    this.listeners.clear()
  }

  private notify(): void {
    this.listeners.forEach(listener => listener(this.state))
  }
}
