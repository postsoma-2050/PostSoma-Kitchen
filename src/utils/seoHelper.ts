/**
 * PostSoma Kitchen - SEO & GEO Dynamic Head Meta & JSON-LD Injection Helper
 * Host: https://recipelab.cc/
 */

export const DEFAULT_DOMAIN = 'https://recipelab.cc'
export const DEFAULT_TITLE = 'PostSoma Kitchen | Visual Cookbook & Recipe Modeling Engine'
export const DEFAULT_DESCRIPTION = 'PostSoma Kitchen - 多源健康食谱标准化建模引擎 (VisualRecipeV3.0)。将多元料理、中餐营养体系与私房配方转化为二维矩阵流程图，支持倍率换算与智能清冰箱。'

export interface SeoMetaOptions {
    title?: string
    description?: string
    keywords?: string
    canonicalUrl?: string
    ogType?: string
    ogImage?: string
    jsonLdSchemas?: Array<{ id: string; schema: Record<string, any> }>
}

/**
 * 核心全局基础 JSON-LD Schema (WebSite + Organization + SoftwareApplication)
 */
export const GLOBAL_ROOT_SCHEMAS = [
    {
        id: 'jsonld-website',
        schema: {
            '@context': 'https://schema.org',
            '@type': 'WebSite',
            '@id': `${DEFAULT_DOMAIN}/#website`,
            'url': DEFAULT_DOMAIN,
            'name': 'PostSoma Kitchen',
            'alternateName': ['PostSoma RecipeLab', 'Visual Cookbook Modeling Engine'],
            'description': DEFAULT_DESCRIPTION,
            'inLanguage': 'zh-CN',
            'potentialAction': {
                '@type': 'SearchAction',
                'target': {
                    '@type': 'EntryPoint',
                    'urlTemplate': `${DEFAULT_DOMAIN}/?search={search_term_string}`
                },
                'query-input': 'required name=search_term_string'
            }
        }
    },
    {
        id: 'jsonld-organization',
        schema: {
            '@context': 'https://schema.org',
            '@type': 'Organization',
            '@id': `${DEFAULT_DOMAIN}/#organization`,
            'name': 'PostSoma Kitchen',
            'url': DEFAULT_DOMAIN,
            'logo': `${DEFAULT_DOMAIN}/logo.svg`,
            'sameAs': [
                'https://github.com/postsoma-2050/PostSoma-Kitchen'
            ],
            'description': '多源可视化健康食谱标准化建模与管理引擎 (VisualRecipeV3.0)'
        }
    },
    {
        id: 'jsonld-software-app',
        schema: {
            '@context': 'https://schema.org',
            '@type': 'SoftwareApplication',
            '@id': `${DEFAULT_DOMAIN}/#softwareapp`,
            'name': 'PostSoma Kitchen Visual Cookbook Modeling Engine',
            'operatingSystem': 'Web, iOS, Android',
            'applicationCategory': 'LifestyleApplication',
            'offers': {
                '@type': 'Offer',
                'price': '0',
                'priceCurrency': 'USD'
            },
            'aggregateRating': {
                '@type': 'AggregateRating',
                'ratingValue': '4.9',
                'ratingCount': '121'
            }
        }
    }
]

/**
 * 动态更新 Head Meta 与 JSON-LD
 */
export function updateSeoMeta(options: SeoMetaOptions = {}): void {
    if (typeof document === 'undefined') return

    // 1. Title
    const finalTitle = options.title ? `${options.title} | PostSoma Kitchen` : DEFAULT_TITLE
    document.title = finalTitle

    // Helper: upsert meta tag
    const setMetaTag = (selector: string, attrName: string, attrVal: string, content: string) => {
        let el = document.querySelector(selector) as HTMLMetaElement | null
        if (!el) {
            el = document.createElement('meta')
            el.setAttribute(attrName, attrVal)
            document.head.appendChild(el)
        }
        el.setAttribute('content', content)
    }

    // 2. Standard Meta
    const finalDesc = options.description || DEFAULT_DESCRIPTION
    setMetaTag('meta[name="description"]', 'name', 'description', finalDesc)
    if (options.keywords) {
        setMetaTag('meta[name="keywords"]', 'name', 'keywords', options.keywords)
    }

    // 3. Canonical URL
    const canonical = options.canonicalUrl || DEFAULT_DOMAIN
    let linkCanonical = document.querySelector('link[rel="canonical"]') as HTMLLinkElement | null
    if (!linkCanonical) {
        linkCanonical = document.createElement('link')
        linkCanonical.setAttribute('rel', 'canonical')
        document.head.appendChild(linkCanonical)
    }
    linkCanonical.setAttribute('href', canonical)

    // 4. OpenGraph
    setMetaTag('meta[property="og:title"]', 'property', 'og:title', finalTitle)
    setMetaTag('meta[property="og:description"]', 'property', 'og:description', finalDesc)
    setMetaTag('meta[property="og:url"]', 'property', 'og:url', canonical)
    setMetaTag('meta[property="og:type"]', 'property', 'og:type', options.ogType || 'website')
    const finalOgImage = options.ogImage || `${DEFAULT_DOMAIN}/og-image.png`
    setMetaTag('meta[property="og:image"]', 'property', 'og:image', finalOgImage)
    setMetaTag('meta[property="og:image:width"]', 'property', 'og:image:width', '1200')
    setMetaTag('meta[property="og:image:height"]', 'property', 'og:image:height', '630')
    setMetaTag('meta[property="og:image:type"]', 'property', 'og:image:type', 'image/png')

    // 5. Twitter Card
    setMetaTag('meta[name="twitter:card"]', 'name', 'twitter:card', 'summary_large_image')
    setMetaTag('meta[name="twitter:title"]', 'name', 'twitter:title', finalTitle)
    setMetaTag('meta[name="twitter:description"]', 'name', 'twitter:description', finalDesc)
    setMetaTag('meta[name="twitter:image"]', 'name', 'twitter:image', finalOgImage)

    // 6. JSON-LD Injection
    if (options.jsonLdSchemas && options.jsonLdSchemas.length > 0) {
        options.jsonLdSchemas.forEach(({ id, schema }) => {
            let script = document.getElementById(id) as HTMLScriptElement | null
            if (!script) {
                script = document.createElement('script')
                script.id = id
                script.type = 'application/ld+json'
                document.head.appendChild(script)
            }
            script.textContent = JSON.stringify(schema, null, 2)
        })
    }
}
