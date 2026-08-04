import type { VisualRecipeV3, V3Ingredient } from '@/types/recipeV3'
import { buildV3MatrixLayout, type V3LayoutActionBlock } from '@/utils/matrixFlowLayout'
import { flowCardTheme } from '@/theme/flowCardTheme'

/**
 * 单页最大高度阈值 (px)，超过此高度自动智能分页
 */
export const MAX_SINGLE_PAGE_HEIGHT = 1600

export type ExportMode = 'full' | 'compact'

const theme = flowCardTheme

function escapeXml(unsafe: string): string {
    if (!unsafe) return ''
    return unsafe
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&apos;')
}

function isMainIngredient(ing: V3Ingredient): boolean {
    if (ing.category === 'main') return true
    if (ing.category === 'seasoning') return false

    const name = ing.name || ''
    const mainKeywords = ['肉', '鸡', '鸭', '鱼', '虾', '牛', '羊', '排骨', '米', '面', '豆腐', '笋', '黄油', '土豆', '鳗', '鳝', 'butter', 'chicken', 'beef', 'pork']
    const isMatchName = mainKeywords.some(kw => name.toLowerCase().includes(kw))

    const amt = ing.amountText || ''
    const isLargeAmount = /[0-9]{2,}\s*(g|克|oz)/.test(amt) || /cup|磅|kg/.test(amt.toLowerCase())

    return isMatchName || isLargeAmount
}

function getStageToken(tokens: readonly string[], stageIndex: number): string {
    return tokens[stageIndex % tokens.length]
}

function getMethodIcon(method?: string): string {
    switch (method) {
        case 'bake': return '♨️'
        case 'stew': return '🍲'
        case 'fry': return '🍳'
        case 'steam': return '💨'
        case 'serve':
        case 'raw': return '🥗'
        default: return '🍽️'
    }
}

function getIngredientLine1(name: string): string {
    if (!name) return ''
    const parts = name.split(/\s(?=[\u4e00-\u9fa5])/)
    if (parts.length >= 2) {
        return parts[0]
    }
    return name
}

function getIngredientLine2(name: string): string {
    if (!name) return ''
    const parts = name.split(/\s(?=[\u4e00-\u9fa5])/)
    if (parts.length >= 2) {
        return parts.slice(1).join(' ')
    }
    return ''
}

function getFirstLineYOffset(block: V3LayoutActionBlock): string {
    const lCount = block.labelLines.length
    const sCount = block.sublabelLines.length
    const hasHeat = Boolean(block.block.heatLevel || block.block.durationMinutes)
    const equipmentCount = block.equipmentLines.length

    const totalLines = lCount + sCount + (hasHeat ? 1 : 0) + equipmentCount
    if (totalLines <= 1) return '0em'
    
    const startOffset = -((totalLines - 1) * 0.6)
    return `${startOffset}em`
}

/**
 * 生成特定页码的 SVG 字符串 (主辅料分级视效 + 离屏完整渲染)
 */
export function generatePageSvgString(
    recipe: VisualRecipeV3,
    pageIndex: number,
    totalPages: number,
    ingredientSubset?: VisualRecipeV3['ingredients'],
    mode: ExportMode = 'full'
): { svgString: string; width: number; height: number } {
    const isCompact = mode === 'compact'

    const subsetRecipe: VisualRecipeV3 = ingredientSubset ? {
        ...recipe,
        ingredients: ingredientSubset
    } : recipe

    const baseLayout = buildV3MatrixLayout(subsetRecipe)
    let w = baseLayout.canvasWidth
    let h = baseLayout.canvasHeight

    if (isCompact) {
        const rowCount = subsetRecipe.ingredients?.length || 1
        const heightReduction = rowCount * 12
        h = Math.max(h - heightReduction, 320)
    }

    const footerHeight = totalPages > 1 ? 28 : 0
    h += footerHeight

    const p = recipe.prerequisites || {}
    const isColdFinal = recipe.finalBlock?.method === 'raw' || recipe.finalBlock?.method === 'serve'

    let xml = `<?xml version="1.0" encoding="UTF-8"?>\n`
    xml += `<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}" viewBox="0 0 ${w} ${h}" style="background-color: ${theme.colors.canvasBg}; font-family: ${escapeXml(theme.typography.fontFamily)};">\n`

    // 0. 最外层纸张底板
    xml += `  <rect x="16" y="16" width="${w - 32}" height="${h - 32}" fill="${theme.colors.paperBg}" stroke="${theme.colors.paperStroke}" stroke-width="${theme.strokes.paperWidth}" rx="${theme.radii.card}" />\n`

    // 1. Header 拆分横栏
    if (baseLayout.hasHeader) {
        xml += `  <g class="v3-header-group">\n`
        if (baseLayout.hasContainer) {
            xml += `    <rect x="16" y="${baseLayout.headerY}" width="75" height="28" fill="${theme.colors.headerEquipmentFill}" stroke="${theme.colors.paperStroke}" stroke-width="${theme.strokes.blockWidth}" />\n`
            xml += `    <text x="53.5" y="${baseLayout.headerY + 18}" text-anchor="middle" font-size="12" font-weight="900" fill="${theme.colors.headerEquipmentText}">设备</text>\n`
            xml += `    <rect x="91" y="${baseLayout.headerY}" width="${w - 107}" height="28" fill="${theme.colors.headerEquipmentBodyFill}" stroke="${theme.colors.paperStroke}" stroke-width="${theme.strokes.blockWidth}" />\n`
            xml += `    <text x="103" y="${baseLayout.headerY + 18}" font-size="12" font-weight="bold" fill="${theme.colors.headerEquipmentBodyText}">${escapeXml(p.containerSize || '')}</text>\n`
        }

        if (baseLayout.hasPreheat) {
            const offsetY = baseLayout.hasContainer ? 30 : 0
            xml += `    <g transform="translate(0, ${offsetY})">\n`
            xml += `      <rect x="16" y="${baseLayout.headerY}" width="75" height="28" fill="${theme.colors.headerPreheatFill}" stroke="${theme.colors.paperStroke}" stroke-width="${theme.strokes.blockWidth}" />\n`
            xml += `      <text x="53.5" y="${baseLayout.headerY + 18}" text-anchor="middle" font-size="12" font-weight="900" fill="${theme.colors.headerPreheatText}">准备</text>\n`
            xml += `      <rect x="91" y="${baseLayout.headerY}" width="${w - 107}" height="28" fill="${theme.colors.headerPreheatBodyFill}" stroke="${theme.colors.paperStroke}" stroke-width="${theme.strokes.blockWidth}" />\n`
            xml += `      <text x="103" y="${baseLayout.headerY + 18}" font-size="12" font-weight="bold" fill="${theme.colors.headerPreheatBodyText}">${escapeXml(p.preheat || '')}</text>\n`
            xml += `    </g>\n`
        }
        xml += `  </g>\n`
    }

    // 2. 左侧食材行 (方向 3: 主料 vs 调料/辅料 分级视效)
    const fontSize = isCompact ? "10.5" : "11.5"
    xml += `  <g class="v3-ingredients-group">\n`
    baseLayout.ingredientRows.forEach(row => {
        const amt = escapeXml(row.ingredient.amountText || '')
        const line1 = escapeXml(getIngredientLine1(row.ingredient.name))
        const line2 = escapeXml(getIngredientLine2(row.ingredient.name))
        const isMain = isMainIngredient(row.ingredient)
        const accentFill = isMain ? theme.colors.ingredientMainAccent : theme.colors.ingredientSeasoningAccent
        const nameFill = isMain ? theme.colors.ingredientMainNameText : theme.colors.ingredientSeasoningNameText
        const amountFill = isMain ? theme.colors.ingredientMainAmountText : theme.colors.ingredientSeasoningAmountText

        xml += `    <g transform="translate(${row.x}, ${row.y})">\n`
        xml += `      <rect width="${row.w}" height="${row.h}" fill="${theme.colors.ingredientFill}" stroke="${theme.colors.ingredientStroke}" stroke-width="${theme.strokes.blockWidth}" rx="${theme.radii.block}" />\n`
        xml += `      <rect x="0" y="0" width="3.5" height="${row.h}" fill="${accentFill}" rx="2" />\n`
        xml += `      <text x="14" y="20" font-size="${fontSize}" font-weight="600" fill="${nameFill}">\n`
        if (amt) {
            xml += `        <tspan font-weight="${isMain ? 'bold' : '600'}" fill="${amountFill}">${amt}</tspan>\n`
        }
        xml += `        <tspan dx="6" font-weight="${isMain ? 'bold' : '500'}" fill="${nameFill}">${line1}</tspan>\n`
        if (line2 && !isCompact) {
            xml += `        <tspan x="14" dy="16" font-size="10.5" fill="${theme.colors.ingredientSubText}">${line2}</tspan>\n`
        }
        xml += `      </text>\n`
        xml += `    </g>\n`
    })
    xml += `  </g>\n`

    // 3. 中间矩阵工序块：依靠列位置表达顺序，不导出编号或路径
    xml += `  <g class="v3-actions-group">\n`
    baseLayout.actionBlockLayouts.forEach(lb => {
        const isPlaceholder = lb.isEmptyPlaceholder
        const bgFill = isPlaceholder
            ? theme.colors.actionPlaceholderFill
            : getStageToken(theme.colors.actionStageFills, lb.computedColIndex)
        const blockStroke = isPlaceholder
            ? theme.colors.actionStroke
            : getStageToken(theme.colors.actionStageStrokes, lb.computedColIndex)
        const blockAccent = getStageToken(theme.colors.actionStageAccents, lb.computedColIndex)

        xml += `    <g transform="translate(${lb.x}, ${lb.y})">\n`
        xml += `      <rect width="${lb.w}" height="${lb.h}" fill="${bgFill}" stroke="${blockStroke}" stroke-width="${theme.strokes.blockWidth}" rx="${theme.radii.block}" />\n`
        if (!isPlaceholder) {
            xml += `      <rect x="0" y="0" width="4" height="${lb.h}" fill="${blockAccent}" rx="2" />\n`
        }
        xml += `      <g transform="translate(${lb.w / 2}, ${lb.h / 2})">\n`
        if (!isPlaceholder) {
            xml += `        <text text-anchor="middle" dominant-baseline="central">\n`
            
            // 多行主标题
            lb.labelLines.forEach((lText, lIdx) => {
                const dy = lIdx === 0 ? getFirstLineYOffset(lb) : '1.3em'
                xml += `          <tspan x="0" dy="${dy}" font-size="13" font-weight="bold" fill="${theme.colors.actionLabelText}">${escapeXml(lText)}</tspan>\n`
            })

            // 多行副标题
            lb.sublabelLines.forEach((sText, sIdx) => {
                const dy = sIdx === 0 && lb.labelLines.length > 0 ? '1.4em' : '1.2em'
                xml += `          <tspan x="0" dy="${dy}" font-size="11" font-weight="500" fill="${theme.colors.actionSublabelText}">${escapeXml(sText)}</tspan>\n`
            })

            // 火候/时长
            if (lb.block.heatLevel || lb.block.durationMinutes) {
                const heatText = escapeXml(`${lb.block.heatLevel || ''} ${lb.block.durationMinutes ? `${lb.block.durationMinutes}m` : ''}`)
                xml += `          <tspan x="0" dy="1.4em" font-size="10" fill="${theme.colors.actionHeatText}">${heatText}</tspan>\n`
            }

            lb.equipmentLines.forEach(equipmentLine => {
                xml += `          <tspan x="0" dy="1.3em" font-size="10" fill="${theme.colors.actionSublabelText}">${escapeXml(equipmentLine)}</tspan>\n`
            })

            xml += `        </text>\n`
        } else {
            xml += `        <text text-anchor="middle" dominant-baseline="central" font-size="11" fill="#9CA3AF" y="0">请选择相关食材</text>\n`
        }
        xml += `      </g>\n`
        xml += `    </g>\n`
    })
    xml += `  </g>\n`

    // 4. 最右侧最终完成区
    const fbLayout = baseLayout.finalBlockLayout
    const fb = fbLayout.finalBlock
    const isPlaceholder = fbLayout.isPlaceholder
    const fbFill = isPlaceholder ? theme.colors.finalPlaceholderFill : (isColdFinal ? theme.colors.finalColdFill : theme.colors.finalBakeFill)
    const fbStroke = isPlaceholder ? theme.colors.actionStroke : (isColdFinal ? theme.colors.finalColdStroke : theme.colors.finalBakeStroke)
    const fbBadgeFill = isColdFinal ? theme.colors.finalColdBadge : theme.colors.finalBakeBadge

    xml += `  <g transform="translate(${fbLayout.x}, ${fbLayout.y})">\n`
    xml += `    <rect width="${fbLayout.w}" height="${fbLayout.h}" fill="${fbFill}" stroke="${fbStroke}" stroke-width="1.8" rx="${theme.radii.block}" />\n`
    xml += `    <g transform="translate(${fbLayout.w / 2}, ${fbLayout.h / 2})">\n`

    if (isPlaceholder) {
        xml += `      <text text-anchor="middle" dominant-baseline="central" font-size="12" font-weight="bold" fill="#6B7280" y="-10">完成方式待补充</text>\n`
        xml += `      <text text-anchor="middle" dominant-baseline="central" font-size="10" fill="#9CA3AF" y="12">(设定最终烹饪或装盘)</text>\n`
    } else {
        xml += `      <circle cx="0" cy="-36" r="15" fill="${fbBadgeFill}" />\n`
        xml += `      <text x="0" y="-35" text-anchor="middle" dominant-baseline="central" font-size="14" fill="#FFFFFF">${getMethodIcon(fb.method)}</text>\n`
        xml += `      <text text-anchor="middle" dominant-baseline="central" font-size="13.5" font-weight="bold" fill="${isColdFinal ? theme.colors.finalColdText : theme.colors.finalBakeText}" y="-10">${escapeXml(fb.label)}</text>\n`
        if (!isColdFinal && (fb.temperatureF || fb.temperatureC)) {
            const tempText = escapeXml(`${fb.temperatureF ? `${fb.temperatureF}°F` : ''} ${fb.temperatureC ? `(${fb.temperatureC}°C)` : ''}`)
            xml += `      <text text-anchor="middle" dominant-baseline="central" font-size="11.5" font-weight="600" fill="#B45309" y="14">${tempText}</text>\n`
        }
        if (!isColdFinal && fb.durationText) {
            xml += `      <text text-anchor="middle" dominant-baseline="central" font-size="10.5" font-weight="500" fill="#B45309" y="32">${escapeXml(fb.durationText)}</text>\n`
        }
        if (isColdFinal) {
            xml += `      <text text-anchor="middle" dominant-baseline="central" font-size="10.5" font-weight="500" fill="#059669" y="16">免加热 / 拌匀即享</text>\n`
        }
    }
    xml += `    </g>\n`
    xml += `  </g>\n`

    // 5. 多页页脚印章标注
    if (totalPages > 1) {
        const pageText = escapeXml(`Page ${pageIndex + 1} of ${totalPages}`)
        xml += `  <g class="v3-footer-group">\n`
        xml += `    <text x="${w / 2}" y="${h - 8}" text-anchor="middle" font-size="11" font-weight="bold" fill="${theme.colors.paperStroke}">${pageText}</text>\n`
        xml += `  </g>\n`
    }

    xml += `</svg>`

    return {
        svgString: xml,
        width: w,
        height: h
    }
}

/**
 * 智能切分食谱食材列表为多页
 */
export function splitRecipeIntoPages(recipe: VisualRecipeV3): Array<{ ingredients: VisualRecipeV3['ingredients']; pageIndex: number; totalPages: number }> {
    const fullLayout = buildV3MatrixLayout(recipe)

    if (fullLayout.canvasHeight <= MAX_SINGLE_PAGE_HEIGHT) {
        return [{
            ingredients: recipe.ingredients,
            pageIndex: 0,
            totalPages: 1
        }]
    }

    const ROWS_PER_PAGE = 25
    const ingredients = recipe.ingredients || []
    const pagesCount = Math.ceil(ingredients.length / ROWS_PER_PAGE)
    const result = []

    for (let i = 0; i < pagesCount; i++) {
        const chunk = ingredients.slice(i * ROWS_PER_PAGE, (i + 1) * ROWS_PER_PAGE)
        result.push({
            ingredients: chunk,
            pageIndex: i,
            totalPages: pagesCount
        })
    }

    return result
}

/**
 * 离屏 PNG 导出 (支持 完整模式 与 紧凑社交平台模式)
 */
export async function exportFlowCardAsPng(
    recipe: VisualRecipeV3,
    filename?: string,
    mode: ExportMode = 'full'
): Promise<void> {
    if (mode === 'compact') {
        const ingCount = recipe.ingredients?.length || 0
        if (ingCount > 25) {
            alert(`提示：该食谱食材较多 (${ingCount} 项)，已为你自动适配【紧凑社交模式】；若需最清晰的高清细节，建议使用【完整模式】。`)
        }
    }

    const pageSplits = mode === 'compact' ? [{ ingredients: recipe.ingredients, pageIndex: 0, totalPages: 1 }] : splitRecipeIntoPages(recipe)

    if (pageSplits.length > 1 && mode === 'full') {
        alert(`食谱内容较长 (${recipe.ingredients?.length || 0} 项食材)，已自动智能分页生成 ${pageSplits.length} 张高清 Flow Card 图卡。`)
    }

    for (const pageItem of pageSplits) {
        const { svgString, width, height } = generatePageSvgString(
            recipe,
            pageItem.pageIndex,
            pageItem.totalPages,
            pageItem.ingredients,
            mode
        )

        const blob = new Blob([svgString], { type: 'image/svg+xml;charset=utf-8' })
        const url = URL.createObjectURL(blob)

        await new Promise<void>((resolve, reject) => {
            const img = new Image()
            img.crossOrigin = 'anonymous'

            img.onload = () => {
                try {
                    const scale = 2
                    const canvas = document.createElement('canvas')
                    canvas.width = width * scale
                    canvas.height = height * scale

                    const ctx = canvas.getContext('2d')
                    if (!ctx) {
                        URL.revokeObjectURL(url)
                        reject(new Error('无法创建 Canvas 2D 上下文'))
                        return
                    }

                    ctx.fillStyle = theme.colors.canvasBg
                    ctx.fillRect(0, 0, canvas.width, canvas.height)
                    ctx.scale(scale, scale)
                    ctx.drawImage(img, 0, 0, width, height)

                    canvas.toBlob((pngBlob) => {
                        URL.revokeObjectURL(url)
                        if (!pngBlob) {
                            reject(new Error('生成 PNG Blob 失败'))
                            return
                        }

                        const modeTag = mode === 'compact' ? '-Social' : ''
                        const pageSuffix = pageSplits.length > 1 ? `-Page${pageItem.pageIndex + 1}` : ''
                        const downloadName = filename || `${recipe.title || 'VisualRecipe'}-FlowCard${modeTag}${pageSuffix}.png`

                        const downloadUrl = URL.createObjectURL(pngBlob)
                        const a = document.createElement('a')
                        a.href = downloadUrl
                        a.download = downloadName
                        document.body.appendChild(a)
                        a.click()
                        document.body.removeChild(a)
                        URL.revokeObjectURL(downloadUrl)

                        resolve()
                    }, 'image/png')
                } catch (err) {
                    URL.revokeObjectURL(url)
                    reject(err)
                }
            }

            img.onerror = () => {
                URL.revokeObjectURL(url)
                reject(new Error('加载离屏 SVG 图像失败'))
            }

            img.src = url
        })
    }
}
