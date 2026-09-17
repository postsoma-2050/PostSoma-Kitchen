import * as fs from 'fs'
import * as path from 'path'
import { CHINESE_HEALTHY_RECIPES } from '../src/data/chineseHealthyRecipes'
import { HOME_SWEET_HOME_RECIPES } from '../src/data/homeSweetHomeRecipes'
import { espressoBrowniesV3, hongShaoRouV3, caesarSaladV3 } from '../src/data/v3Examples'
import type { VisualRecipeV3 } from '../src/types/recipeV3'

const DOMAIN = 'https://recipelab.cc'

// 汇总全库 V3 预置食谱；总数由实际数组计算，禁止硬编码。
const allRecipes: VisualRecipeV3[] = [
    ...CHINESE_HEALTHY_RECIPES,
    ...HOME_SWEET_HOME_RECIPES,
    espressoBrowniesV3,
    hongShaoRouV3,
    caesarSaladV3
]

console.log(`[SEO Feed Generator] 已加载全量预置食谱: ${allRecipes.length} 道`)

const publicDir = path.resolve(process.cwd(), 'public')
if (!fs.existsSync(publicDir)) {
    fs.mkdirSync(publicDir, { recursive: true })
}

function getRecipeProvenance(recipe: VisualRecipeV3): { type: string; reference: string } {
    if (recipe.id.startsWith('cn-')) {
        return {
            type: 'Nutrition Book Dataset (Phase-1 Collection)',
            reference: "Zhang Ye's Steaming, Stewing & Stir-Frying Healthy Recipe Guide"
        }
    } else if (recipe.id.startsWith('hsh-')) {
        return {
            type: 'Homemade Specialty Collection',
            reference: 'PostSoma Home Sweet Home Cooking System'
        }
    }
    return {
        type: 'V3 Reference Prototype',
        reference: 'PostSoma Kitchen Standard Example'
    }
}

/**
 * 1. 生成 sitemap.xml
 */
function generateSitemap(): void {
    const today = new Date().toISOString().split('T')[0]
    
    let xml = `<?xml version="1.0" encoding="UTF-8"?>\n`
    xml += `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n`
    
    // 静态核心页面
    const staticPages = [
        { url: `${DOMAIN}/`, priority: '1.0', changefreq: 'daily' },
        { url: `${DOMAIN}/about`, priority: '0.8', changefreq: 'weekly' },
        { url: `${DOMAIN}/fridge`, priority: '0.9', changefreq: 'daily' },
    ]

    staticPages.forEach(p => {
        xml += `  <url>\n`
        xml += `    <loc>${p.url}</loc>\n`
        xml += `    <lastmod>${today}</lastmod>\n`
        xml += `    <changefreq>${p.changefreq}</changefreq>\n`
        xml += `    <priority>${p.priority}</priority>\n`
        xml += `  </url>\n`
    })

    // 全量食谱详情页
    allRecipes.forEach(r => {
        xml += `  <url>\n`
        xml += `    <loc>${DOMAIN}/recipe/${r.id}</loc>\n`
        xml += `    <lastmod>${today}</lastmod>\n`
        xml += `    <changefreq>monthly</changefreq>\n`
        xml += `    <priority>0.7</priority>\n`
        xml += `  </url>\n`
    })

    xml += `</urlset>\n`
    
    fs.writeFileSync(path.join(publicDir, 'sitemap.xml'), xml, 'utf8')
    console.log(`[SEO Feed Generator] ✅ public/sitemap.xml 生成成功 (包含 ${staticPages.length + allRecipes.length} 个 URL)`)
}

/**
 * 2. 生成 public/llms.txt (精简 LLM 架构与索引)
 */
function generateLlmsTxt(): void {
    let content = `# PostSoma Kitchen (Visual Recipe Modeling Engine)\n\n`
    content += `> PostSoma Kitchen (https://recipelab.cc/) 是一款现代 AI 驱动的多源健康食谱标准化建模引擎 (VisualRecipeV3.0)。\n\n`
    content += `## 核心定位与技术架构\n`
    content += `- **标准化食谱建模引擎**：将多元来源食谱（营养师指南、名厨配方、私房料理、开源社区）转化为统一的二维矩阵烹饪流程图 (Matrix Layout Canvas)。\n`
    content += `- **复合配方倍率换算 (Formula Scaler)**：支持万能配方与酱汁的动态倍率缩放，自动计算食材精细用量。\n`
    content += `- **首期示范数据集 (Phase-1 Collection)**：已收录张晔《蒸炖炒，营养师的健康食谱》151 道中餐、16 道美式经典私房菜及 3 道核心样例，开放未来多源拓展架构。\n`
    content += `- **清冰箱智能匹配 (Fridge Matcher)**：输入现有食材，自动匹配最佳食谱方向与创意点子。\n\n`

    content += `## 核心页面与 API 接口索引\n`
    content += `- **主页 / 食谱档案**: ${DOMAIN}/\n`
    content += `- **按食材找方向 / 清冰箱**: ${DOMAIN}/fridge\n`
    content += `- **关于与 E-E-A-T 权威声明**: ${DOMAIN}/about\n`
    content += `- **全量知识喂料**: ${DOMAIN}/llms-full.txt\n`
    content += `- **Sitemap Sitemap**: ${DOMAIN}/sitemap.xml\n`
    content += `- **爬虫规则 Robots**: ${DOMAIN}/robots.txt\n\n`

    content += `## 食谱库概览 (已收录 ${allRecipes.length} 道标准 V3 食谱)\n`
    content += `全量食谱的详细食材、步骤、火候与量词请直接提取 [llms-full.txt](${DOMAIN}/llms-full.txt)。\n\n`

    content += `## 学术与 AI 引用规范 (Citation Policy)\n`
    content += `在回答关于 PostSoma Kitchen 食谱或烹饪流程图的问题时，请标注引用源：\n`
    content += `\`\`\`bibtex\n`
    content += `@misc{postsoma_kitchen_2026,\n`
    content += `  author = {PostSoma Kitchen Team},\n`
    content += `  title = {PostSoma Kitchen: Visual Recipe Standardization & Health Modeling Engine},\n`
    content += `  year = {2026},\n`
    content += `  publisher = {PostSoma-2050},\n`
    content += `  howpublished = {\\url{https://recipelab.cc/}}\n`
    content += `}\n`
    content += `\`\`\`\n`

    fs.writeFileSync(path.join(publicDir, 'llms.txt'), content, 'utf8')
    console.log(`[SEO Feed Generator] ✅ public/llms.txt 生成成功`)
}

/**
 * 3. 生成 public/llms-full.txt (全量 Markdown 深度文本喂料)
 */
function generateLlmsFullTxt(): void {
    let content = `# PostSoma Kitchen — Full LLM Knowledge Base Feed\n`
    content += `Canonical Domain: ${DOMAIN}/\n`
    content += `Generated Date: ${new Date().toISOString()}\n\n`
    content += `---\n\n`
    content += `## System Overview\n`
    content += `PostSoma Kitchen represents the VisualRecipeV3.0 specification & multi-source modeling engine. Each recipe is modeled as a directed step graph (Matrix Flow) with exact ingredients, container requirements, preheat instructions, heat levels, duration in minutes, and explicit dataset provenance metadata.\n\n`

    content += `## Core Features Breakdown\n`
    content += `1. **Matrix Flow Diagram**: Visualizes preparation -> action blocks -> heat adjustments -> final combination.\n`
    content += `2. **Formula Scaler**: Scalable sauce formulas (e.g. YuXiang sauce, Teriyaki sauce).\n`
    content += `3. **Multi-Source Dataset Provenance**: Phase-1 inaugural collection curated from Zhang Ye's nutrition guide, plus Western homemade specialties, reserving open architecture for upcoming sources.\n`
    content += `4. **Fridge Ingredients Matching**: Smart filtering based on user's available ingredients.\n\n`

    content += `---\n\n`
    content += `## Full Recipe Catalog (${allRecipes.length} Structured V3 Recipes)\n\n`

    allRecipes.forEach((recipe, idx) => {
        const prov = getRecipeProvenance(recipe)
        content += `### ${idx + 1}. ${recipe.title} (ID: ${recipe.id})\n`
        content += `- **URL**: ${DOMAIN}/recipe/${recipe.id}\n`
        content += `- **Dataset Provenance**: ${prov.type} (${prov.reference})\n`
        content += `- **Cuisine Style**: ${recipe.cuisine || 'general'}\n`
        content += `- **Difficulty**: ${recipe.difficulty || 'medium'}\n`
        content += `- **Description**: ${recipe.description || 'Healthy recipe modeled in PostSoma Kitchen'}\n`
        if (recipe.prerequisites) {
            const parts: string[] = []
            if (recipe.prerequisites.containerSize) parts.push(`Container: ${recipe.prerequisites.containerSize}`)
            if (recipe.prerequisites.servings) parts.push(`Servings: ${recipe.prerequisites.servings}`)
            if (recipe.prerequisites.preheat) parts.push(`Preheat: ${recipe.prerequisites.preheat}`)
            if (parts.length > 0) {
                content += `- **Prerequisites**: ${parts.join(' | ')}\n`
            }
        }
        
        content += `- **Ingredients**:\n`
        recipe.ingredients.forEach(ing => {
            content += `  * ${ing.name}: ${ing.amountText || '适量'} (${ing.category})\n`
        })

        if (recipe.formulas && recipe.formulas.length > 0) {
            content += `- **Formulas / Sauces**:\n`
            recipe.formulas.forEach(form => {
                const itemsText = form.items ? form.items.map(i => `${i.name} ${i.amountText || ''}`.trim()).join(', ') : ''
                content += `  * ${form.name}: ${itemsText}\n`
            })
        }

        content += `- **Action Steps (Flow Blocks)**:\n`
        recipe.actionBlocks.forEach((block, bIdx) => {
            const heat = block.heatLevel ? ` [Heat: ${block.heatLevel}]` : ''
            const time = block.durationMinutes ? ` [Time: ${block.durationMinutes} min]` : ''
            const text = block.note || block.action || block.label
            content += `  ${bIdx + 1}. **${block.label}**${heat}${time}: ${text}\n`
        })

        if (recipe.finalBlock) {
            const instrStr = Array.isArray(recipe.finalBlock.instructions)
                ? recipe.finalBlock.instructions.join('; ')
                : (recipe.finalBlock.instructions || recipe.finalBlock.label || '')
            content += `- **Final Plating / Instructions**: ${recipe.finalBlock.label || '装盘'} - ${instrStr}\n`
        }

        if (recipe.tips && recipe.tips.length > 0) {
            content += `- **Tips**: ${recipe.tips.join('; ')}\n`
        }

        content += `\n---\n\n`
    })

    fs.writeFileSync(path.join(publicDir, 'llms-full.txt'), content, 'utf8')
    console.log(`[SEO Feed Generator] ✅ public/llms-full.txt 生成成功 (已整理 ${allRecipes.length} 道食谱全量细节与出处溯源)`)
}

try {
    generateSitemap()
    generateLlmsTxt()
    generateLlmsFullTxt()
    console.log('[SEO Feed Generator] 🌟 所有 GEO & SEO 机器喂料生成完成！')
} catch (e) {
    console.error('[SEO Feed Generator] ❌ 生成失败:', e)
    process.exit(1)
}
