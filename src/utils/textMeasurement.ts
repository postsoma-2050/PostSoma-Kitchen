/**
 * 基于 Canvas 2D 的高性能文本宽度测量与智能折行工具 (纯原生无依赖)
 * 带有 LRU Cache 机制，防止重复测量造成的性能开销
 */

let canvasContext: CanvasRenderingContext2D | null = null

function getContext(): CanvasRenderingContext2D | null {
    if (canvasContext) return canvasContext
    if (typeof document !== 'undefined') {
        const canvas = document.createElement('canvas')
        canvasContext = canvas.getContext('2d')
    }
    return canvasContext
}

const measureCache = new Map<string, number>()
const MAX_CACHE_SIZE = 500

/**
 * 测量文本在特定字号与粗细下的渲染像素宽度 (px)
 */
export function measureTextWidth(
    text: string,
    fontSize: number = 12,
    isBold: boolean = false
): number {
    if (!text || text.length === 0) return 0

    const cacheKey = `${fontSize}_${isBold ? 'b' : 'n'}_${text}`
    if (measureCache.has(cacheKey)) {
        return measureCache.get(cacheKey)!
    }

    const ctx = getContext()
    let width = 0

    if (ctx) {
        const weight = isBold ? 'bold' : 'normal'
        ctx.font = `${weight} ${fontSize}px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "PingFang SC", sans-serif`
        width = Math.ceil(ctx.measureText(text).width)
    } else {
        let estimated = 0
        for (let i = 0; i < text.length; i++) {
            const code = text.charCodeAt(i)
            if (code > 255) {
                estimated += fontSize
            } else {
                estimated += fontSize * 0.6
            }
        }
        width = Math.ceil(estimated)
    }

    if (measureCache.size > MAX_CACHE_SIZE) {
        measureCache.clear()
    }
    measureCache.set(cacheKey, width)

    return width
}

/**
 * 将超过最大渲染宽度的文本按词/字边界智能折分为多行 (Text Wrapping)
 * 英文优先按单词空格折行，中文按字符折行
 */
export function wrapTextToLines(
    text: string,
    maxWidth: number,
    fontSize: number = 12,
    isBold: boolean = false
): string[] {
    if (!text) return []
    const totalW = measureTextWidth(text, fontSize, isBold)
    if (totalW <= maxWidth) {
        return [text]
    }

    const lines: string[] = []
    // 区分英文/数字单词、空白、中文单字与中英文标点符号
    const tokens = text.match(/[a-zA-Z0-9_.-]+|\s+|[^\x00-\x7F]|[\x00-\x7F]/g) || [text]

    let currentLine = ''
    for (const token of tokens) {
        const testLine = currentLine + token
        const testW = measureTextWidth(testLine.trim(), fontSize, isBold)

        if (testW <= maxWidth || currentLine === '') {
            currentLine += token
        } else {
            // 避头法则：若 token 为标点符号，优先吸附在上一行行末，避免行首出现孤立标点
            if (/^[，,、。；;！？!?:：）)\]】》”’]/.test(token)) {
                currentLine += token
                lines.push(currentLine.trim())
                currentLine = ''
            } else {
                lines.push(currentLine.trim())
                currentLine = token.trimStart()
            }
        }
    }

    if (currentLine.trim()) {
        lines.push(currentLine.trim())
    }

    return lines
}
