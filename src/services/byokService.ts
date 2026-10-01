/**
 * BYOK (Bring Your Own Key) 本地密钥与配置服务
 * 密钥纯本地存储在 localStorage，绝不上传服务器
 */

export interface ByokConfig {
    apiKey: string
    baseUrl: string
    model: string
}

const BYOK_CONFIG_KEY = 'what-to-eat-user-api-config'

const DEFAULT_CONFIG: ByokConfig = {
    apiKey: '',
    baseUrl: 'https://api.openai.com/v1',
    model: 'gpt-3.5-turbo'
}

/**
 * 净化清理字符串中的不可见字符、BOM头 (0xFEFF)、零宽空格 (\u200B-\u200D) 与换行符
 */
export function sanitizeHeaderValue(val: string): string {
    if (!val) return ''
    return val
        .replace(/[\u200B-\u200D\uFEFF]/g, '') // 移除 Unicode 零宽字符与 BOM
        .replace(/[\r\n\t]/g, '')              // 移除换行与制表符
        .trim()
}

/**
 * 获取本地 BYOK 配置 (自动清洗安全过滤)
 */
export function getByokConfig(): ByokConfig {
    try {
        const stored = localStorage.getItem(BYOK_CONFIG_KEY)
        if (!stored) return { ...DEFAULT_CONFIG }
        const parsed = JSON.parse(stored)
        return {
            apiKey: sanitizeHeaderValue(parsed.apiKey || ''),
            baseUrl: sanitizeHeaderValue(parsed.baseUrl || DEFAULT_CONFIG.baseUrl),
            model: (parsed.model || DEFAULT_CONFIG.model).trim()
        }
    } catch (e) {
        console.error('读取 BYOK 配置失败:', e)
        return { ...DEFAULT_CONFIG }
    }
}

/**
 * 保存 BYOK 配置到本地 localStorage (写入前清洗)
 */
export function saveByokConfig(config: ByokConfig): void {
    try {
        const cleanConfig: ByokConfig = {
            apiKey: sanitizeHeaderValue(config.apiKey),
            baseUrl: sanitizeHeaderValue(config.baseUrl),
            model: (config.model || DEFAULT_CONFIG.model).trim()
        }
        localStorage.setItem(BYOK_CONFIG_KEY, JSON.stringify(cleanConfig))
    } catch (e) {
        console.error('保存 BYOK 配置失败:', e)
    }
}

/**
 * 检查是否存在有效配置的 API Key
 */
export function hasValidByokConfig(): boolean {
    const config = getByokConfig()
    return Boolean(config.apiKey && config.apiKey.length > 0)
}
