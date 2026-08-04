import {
  AI_SUGGESTION_SCHEMA_VERSION,
  createAiSuggestionError,
  type AiIngredientSnapshot,
  type AiSuggestionError,
  type AiSuggestionErrorCode,
  type AiSuggestionRequest,
  type AiSuggestionResponse,
} from './aiSuggestionContract'
import { deriveAiSuggestionSafetyRules } from './aiFoodSafety'

export type AiSuggestionGatewayMode = 'prototype-byok' | 'server-proxy' | 'unconfigured'

export type AiSuggestionGatewayReadiness =
  | {
    status: 'ready'
    mode: Exclude<AiSuggestionGatewayMode, 'unconfigured'>
    destinationOrigin: string
    destinationHost: string
  }
  | {
    status: 'unconfigured'
    mode: 'unconfigured'
    reason: string
  }

export interface AiSuggestionGateway {
  getReadiness(): AiSuggestionGatewayReadiness
  generate(request: AiSuggestionRequest, signal: AbortSignal): Promise<AiSuggestionResponse>
}

export class AiSuggestionGatewayError extends Error {
  readonly detail: AiSuggestionError

  constructor(
    code: AiSuggestionErrorCode,
    message: string,
    options: { retryable?: boolean; retryAfterSeconds?: number } = {},
  ) {
    super(message)
    this.name = 'AiSuggestionGatewayError'
    this.detail = createAiSuggestionError(code, message, options)
  }
}

function cloneSnapshot(snapshot: AiIngredientSnapshot): AiIngredientSnapshot {
  return {
    id: snapshot.id,
    selectedIngredients: snapshot.selectedIngredients.map(item => ({ ...item })),
    customIngredients: snapshot.customIngredients.map(item => ({ ...item })),
    relatedRecipeIds: [...snapshot.relatedRecipeIds],
  }
}

export function createAiSuggestionRequest(
  snapshot: AiIngredientSnapshot,
  requestId: string,
): AiSuggestionRequest {
  const safeSnapshot = cloneSnapshot(snapshot)
  return {
    schemaVersion: AI_SUGGESTION_SCHEMA_VERSION,
    requestId,
    snapshot: safeSnapshot,
    safetyRules: deriveAiSuggestionSafetyRules(safeSnapshot),
  }
}

/**
 * Default gateway for the pre-integration stage. It is intentionally incapable of
 * network access, secret access, or generating placeholder AI content.
 */
export class UnconfiguredAiSuggestionGateway implements AiSuggestionGateway {
  getReadiness(): AiSuggestionGatewayReadiness {
    return {
      status: 'unconfigured',
      mode: 'unconfigured',
      reason: 'AI 调用方式尚未配置',
    }
  }

  async generate(_request: AiSuggestionRequest, _signal: AbortSignal): Promise<AiSuggestionResponse> {
    throw new AiSuggestionGatewayError('not-configured', 'AI 调用方式尚未配置', { retryable: false })
  }
}
