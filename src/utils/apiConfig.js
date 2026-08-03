import { useSettingsStore } from '../stores/settings'

/**
 * 规范化 API Endpoint
 * - 删除所有 Unicode 控制字符 (U+0000..U+001F, U+007F..U+009F)
 * - 删除零宽字符 (U+200B..U+200D, U+FEFF)
 * - 删除行分隔符 (U+2028)、段落分隔符 (U+2029) 以及 \r, \n, \t
 * - trim 前后空白
 * - 移除末尾多余斜杠（保留 https:// 或 http:// 协议头）
 * - 不擅自添加 /v1，空输入返回空字符串
 */
export const normalizeApiEndpoint = (value) => {
    if (!value || typeof value !== 'string') return ''

    // 移除所有控制符与不可见空白字符 (\u2028: Line Separator, \u2029: Paragraph Separator 等)
    let cleaned = value.replace(/[\u0000-\u001F\u007F-\u009F\u200B-\u200D\uFEFF\u2028\u2029\r\n\t]/g, '')

    // 前后 trim
    cleaned = cleaned.trim()

    // 移除末尾重复斜杠 (保留 https:// 或 http:// 后的斜杠)
    while (cleaned.endsWith('/') && !cleaned.endsWith('://')) {
        cleaned = cleaned.slice(0, -1)
    }

    return cleaned
}

/**
 * 优雅构建 Chat Completions URL
 * - 如果 endpoint 已经以 /chat/completions 结尾，不要重复拼接
 * - 如果 endpoint 以 /v1 结尾或未包含 /chat/completions，拼接为 <endpoint>/chat/completions
 */
export const buildChatCompletionsUrl = (baseUrl) => {
    const normalized = normalizeApiEndpoint(baseUrl)
    if (!normalized) return ''

    if (normalized.endsWith('/chat/completions')) {
        return normalized
    }

    return `${normalized}/chat/completions`
}

// 获取文本生成API配置
export const getTextGenerationConfig = () => {
    const settingsStore = useSettingsStore()
    const config = settingsStore.getTextGenerationConfig()
    return {
        ...config,
        baseUrl: normalizeApiEndpoint(config.baseUrl)
    }
}

// 获取图片生成API配置
export const getImageGenerationConfig = () => {
    const settingsStore = useSettingsStore()
    const config = settingsStore.getImageGenerationConfig()
    return {
        ...config,
        baseUrl: normalizeApiEndpoint(config.baseUrl)
    }
}

// 创建文本生成API请求配置
export const createTextGenerationRequest = (messages, options = {}) => {
    const config = getTextGenerationConfig()
    const fullUrl = buildChatCompletionsUrl(config.baseUrl)

    return {
        url: fullUrl,
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${config.apiKey}`
        },
        data: {
            model: config.model,
            messages: messages,
            temperature: config.temperature,
            ...options
        },
        timeout: config.timeout
    }
}

// 创建图片生成API请求配置
export const createImageGenerationRequest = (prompt, options = {}) => {
    const config = getImageGenerationConfig()

    return {
        url: config.baseUrl,
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${config.apiKey}`
        },
        data: {
            model: config.model,
            prompt: prompt,
            ...options
        }
    }
}

// 验证配置是否完整
export const validateTextGenerationConfig = () => {
    const config = getTextGenerationConfig()
    return !!(config.baseUrl && config.apiKey && config.model)
}

export const validateImageGenerationConfig = () => {
    const config = getImageGenerationConfig()
    return !!(config.baseUrl && config.apiKey && config.model)
}