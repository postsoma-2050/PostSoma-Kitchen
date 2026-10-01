import type { VisualRecipeV3 } from '@/types/recipeV3'
import {
    buildV3MatrixLayout,
    type V3LayoutActionBlock,
    isColdFinalBlock,
    getFinalServingInstructions,
    formatIngredientRowDisplay,
} from '@/utils/matrixFlowLayout'
import {
    buildV3ContinuousTableLayout,
    resolveLayoutMode,
} from '@/utils/continuousTableLayout'
import { flowCardTheme } from '@/theme/flowCardTheme'

/**
 * 单页最大高度阈值 (px)，超过此高度自动智能分页
 */
export const MAX_SINGLE_PAGE_HEIGHT = 1600

export type ExportMode = 'full' | 'compact'
export type FlowCardLayoutMode = 'auto' | 'table' | 'flow'

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

function getFirstLineYOffset(block: V3LayoutActionBlock): string {
    const lCount = block.labelLines.length
    const sCount = block.sublabelLines.length
    const gCount = block.guidanceLines?.length || 0
    const hasHeat = Boolean(block.block.heatLevel || block.block.durationText || block.block.durationMinutes)
    const equipmentCount = block.equipmentLines.length

    const totalLines = lCount + sCount + gCount + (hasHeat ? 1 : 0) + equipmentCount
    if (totalLines <= 1) return '0em'
    
    const startOffset = -((totalLines - 1) * 0.58)
    return `${startOffset}em`
}

/**
 * 生成连续工序表的 SVG 字符串 (共享统一尺寸、单次绘制网格线、终止内部横线)
 */
export function generateContinuousTableSvgString(
    recipe: VisualRecipeV3
): { svgString: string; width: number; height: number } {
    const tableLayout = buildV3ContinuousTableLayout(recipe)
    const w = tableLayout.canvasWidth
    const h = tableLayout.canvasHeight

    let xml = `<?xml version="1.0" encoding="UTF-8"?>\n`
    xml += `<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}" viewBox="0 0 ${w} ${h}" style="background-color: ${theme.colors.canvasBg}; font-family: ${escapeXml(theme.typography.fontFamily)};">\n`

    // 0. 表格单层外边框 (建筑感中性色实线，严整无重叠)
    xml += `  <rect x="${tableLayout.outerRect.x}" y="${tableLayout.outerRect.y}" width="${tableLayout.outerRect.w}" height="${tableLayout.outerRect.h}" fill="#FFFFFF" stroke="#CBD5E1" stroke-width="1.5" />\n`

    // 1. Header 横栏 (容器大小与预热处理)
    if (tableLayout.header.hasHeader) {
        xml += `  <g class="v3-table-header-group">\n`
        xml += `    <rect x="${tableLayout.outerRect.x}" y="${tableLayout.header.headerY}" width="${tableLayout.ingredientColWidth}" height="${tableLayout.header.headerHeight}" fill="#F8FAFC" stroke="#CBD5E1" stroke-width="1.2" />\n`
        xml += `    <text x="${tableLayout.outerRect.x + tableLayout.ingredientColWidth / 2}" y="${tableLayout.header.headerY + tableLayout.header.headerHeight / 2}" text-anchor="middle" dominant-baseline="central" font-size="13.5" font-weight="700" fill="#334155">材料</text>\n`

        if (tableLayout.header.hasContainer) {
            xml += `    <rect x="${tableLayout.outerRect.x + tableLayout.ingredientColWidth}" y="${tableLayout.header.headerY}" width="${tableLayout.outerRect.w - tableLayout.ingredientColWidth}" height="28" fill="#FFFFFF" stroke="#CBD5E1" stroke-width="1.2" />\n`
            xml += `    <text x="${tableLayout.outerRect.x + tableLayout.ingredientColWidth + 14}" y="${tableLayout.header.headerY + 14}" dominant-baseline="central" font-size="12" font-weight="600" fill="#0F172A">${escapeXml(tableLayout.header.containerText || '')}</text>\n`
            xml += `    <text x="${tableLayout.outerRect.x + tableLayout.outerRect.w - 14}" y="${tableLayout.header.headerY + 14}" text-anchor="end" dominant-baseline="central" font-size="11" font-weight="700" fill="#0F766E">容器大小</text>\n`
        }

        if (tableLayout.header.hasPreheat) {
            const preheatY = tableLayout.header.headerY + (tableLayout.header.hasContainer ? 28 : 0)
            xml += `    <rect x="${tableLayout.outerRect.x + tableLayout.ingredientColWidth}" y="${preheatY}" width="${tableLayout.outerRect.w - tableLayout.ingredientColWidth}" height="28" fill="#FFFFFF" stroke="#CBD5E1" stroke-width="1.2" />\n`
            xml += `    <text x="${tableLayout.outerRect.x + tableLayout.ingredientColWidth + 14}" y="${preheatY + 14}" dominant-baseline="central" font-size="12" font-weight="600" fill="#0F172A">${escapeXml(tableLayout.header.preheatText || '')}</text>\n`
            xml += `    <text x="${tableLayout.outerRect.x + tableLayout.outerRect.w - 14}" y="${preheatY + 14}" text-anchor="end" dominant-baseline="central" font-size="11" font-weight="700" fill="#B45309">预热等预备处理</text>\n`
        }
        xml += `  </g>\n`
    }

    // 2. 等待通道 (Waiting Lanes: 食材未加入阶段的横向延续行，终点附微小汇入圆点与入锅提示)
    xml += `  <g class="v3-table-waiting-lanes">\n`
    tableLayout.waitingLanes.forEach(lane => {
        xml += `    <rect x="${lane.x}" y="${lane.y}" width="${lane.w}" height="${lane.h}" fill="#F8FAFC" fill-opacity="0.85" />\n`
    })
    xml += `  </g>\n`

    // 3. 暂存备用走廊 (Hold-Aside Bridges)
    if (tableLayout.holdAsideBridges.length > 0) {
        xml += `  <g class="v3-table-bridges">\n`
        tableLayout.holdAsideBridges.forEach(bridge => {
            xml += `    <rect x="${bridge.x}" y="${bridge.y}" width="${bridge.w}" height="${bridge.h}" fill="#F0FDF4" fill-opacity="0.85" stroke="#059669" stroke-width="1.5" stroke-dasharray="5 3" />\n`
            xml += `    <text x="${bridge.x + bridge.w / 2}" y="${bridge.y + bridge.h / 2}" text-anchor="middle" dominant-baseline="central" font-size="11" font-weight="bold" fill="#059669">${escapeXml(bridge.label)}</text>\n`
        })
        xml += `  </g>\n`
    }

    // 4. 单次渲染网格线 (Single-pass Grid Lines: 建筑感细线，绝无重叠)
    xml += `  <g class="v3-table-grid-lines">\n`
    tableLayout.horizontalLines.forEach(hl => {
        xml += `    <line x1="${hl.x1}" y1="${hl.y1}" x2="${hl.x2}" y2="${hl.y2}" stroke="#E2E8F0" stroke-width="1.2" />\n`
    })
    tableLayout.verticalLines.forEach(vl => {
        xml += `    <line x1="${vl.x1}" y1="${vl.y1}" x2="${vl.x2}" y2="${vl.y2}" stroke="#E2E8F0" stroke-width="1.2" />\n`
    })
    xml += `  </g>\n`

    // 5. 原料单元格文字 (整洁表格单元格，用量深绿加粗，名称与预备说明区分)
    xml += `  <g class="v3-table-ingredient-cells">\n`
    tableLayout.ingredientCells.forEach(cell => {
        const amt = escapeXml(cell.amountText)
        const name = escapeXml(cell.nameText)
        const prep = escapeXml(cell.prepText || '')
        xml += `    <g transform="translate(${cell.x}, ${cell.y})">\n`
        xml += `      <text x="14" y="${cell.h / 2}" dominant-baseline="central" font-size="12" font-weight="500" fill="#0F172A">\n`
        if (amt) {
            xml += `        <tspan font-weight="700" fill="#047857">${amt}</tspan>\n`
        }
        xml += `        <tspan dx="${amt ? '8' : '0'}" font-weight="600" fill="#0F172A">${name}</tspan>\n`
        if (prep) {
            xml += `        <tspan dx="6" font-size="11" font-weight="normal" fill="#64748B">${prep}</tspan>\n`
        }
        xml += `      </text>\n`
        xml += `    </g>\n`
    })
    xml += `  </g>\n`

    // 6. 工序合并单元格文字 (语义事实分层，与前端 Canvas 严格一致)
    xml += `  <g class="v3-table-process-cells">\n`
    tableLayout.processCells.forEach(pCell => {
        xml += `    <g transform="translate(${pCell.x}, ${pCell.y})">\n`
        xml += `      <g transform="translate(${pCell.w / 2}, ${pCell.h / 2})">\n`
        if (pCell.isFinalBlock) {
            const durY = pCell.durationText ? -16 : 0
            xml += `        <text text-anchor="middle" dominant-baseline="central" font-size="14" font-weight="800" fill="#065F46" y="${durY}">${escapeXml(pCell.label)}</text>\n`
            if (pCell.durationText) {
                xml += `        <text text-anchor="middle" dominant-baseline="central" font-size="11" font-weight="700" fill="#047857" y="6">${escapeXml(pCell.durationText)}</text>\n`
            }
        } else {
            xml += `        <text text-anchor="middle" dominant-baseline="central">\n`
            const lCount = pCell.labelLines.length
            const sCount = pCell.sublabelLines.length
            const hasHeat = Boolean(pCell.heatLevel || pCell.durationText || pCell.equipment)
            const hasHold = Boolean(pCell.holdAsideLabel)
            const total = lCount + sCount + (hasHeat ? 1 : 0) + (hasHold ? 1 : 0)
            const firstDy = total <= 1 ? '0em' : `${-((total - 1) * 0.62)}em`

            pCell.labelLines.forEach((line, lIdx) => {
                const dy = lIdx === 0 ? firstDy : '1.3em'
                xml += `          <tspan x="0" dy="${dy}" font-size="13.5" font-weight="800" fill="#0F172A">${escapeXml(line)}</tspan>\n`
            })
            pCell.sublabelLines.forEach((sLine, sIdx) => {
                const dy = sIdx === 0 && pCell.labelLines.length > 0 ? '1.3em' : '1.1em'
                xml += `          <tspan x="0" dy="${dy}" font-size="10.5" font-weight="500" fill="#64748B">${escapeXml(sLine)}</tspan>\n`
            })
            if (pCell.heatLevel || pCell.durationText || pCell.equipment) {
                const heatText = `${pCell.heatLevel ? `${pCell.heatLevel} ` : ''}${pCell.durationText ? `${pCell.durationText} ` : ''}${pCell.equipment ? `· ${pCell.equipment}` : ''}`.trim()
                xml += `          <tspan x="0" dy="1.3em" font-size="10" font-weight="700" fill="#B45309">${escapeXml(heatText)}</tspan>\n`
            }
            if (pCell.holdAsideLabel) {
                xml += `          <tspan x="0" dy="1.3em" font-size="9.5" font-weight="bold" fill="#059669">${escapeXml(pCell.holdAsideLabel)}</tspan>\n`
            }
            xml += `        </text>\n`
        }
        xml += `      </g>\n`
        xml += `    </g>\n`
    })
    xml += `  </g>\n`

    xml += `</svg>`
    return {
        svgString: xml,
        width: w,
        height: h
    }
}

/**
 * 生成特定页码的 SVG 字符串 (主辅料分级视效 + 离屏完整渲染)
 */
export function generatePageSvgString(
    recipe: VisualRecipeV3,
    pageIndex: number,
    totalPages: number,
    ingredientSubset?: VisualRecipeV3['ingredients'],
    mode: ExportMode = 'full',
    layoutMode: FlowCardLayoutMode = 'flow'
): { svgString: string; width: number; height: number } {
    const effectiveLayoutMode = resolveLayoutMode(recipe, layoutMode)
    if (effectiveLayoutMode === 'table') {
        return generateContinuousTableSvgString(recipe)
    }

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
    const isColdFinal = isColdFinalBlock(recipe)

    const markerSuffix = `${(recipe.id || 'export').replace(/[^a-zA-Z0-9_-]/g, '_')}_p${pageIndex}`
    let xml = `<?xml version="1.0" encoding="UTF-8"?>\n`
    xml += `<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}" viewBox="0 0 ${w} ${h}" style="background-color: ${theme.colors.canvasBg}; font-family: ${escapeXml(theme.typography.fontFamily)};">\n`

    // 0. 箭头 Marker 与纸张底板 (多实例 scoped ID 杜绝冲突)
    xml += `  <defs>\n`
    xml += `    <marker id="flow-arrow-material-${markerSuffix}" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="5" markerHeight="5" orient="auto">\n`
    xml += `      <path d="M 0 1 L 9 5 L 0 9 z" fill="#059669" />\n`
    xml += `    </marker>\n`
    xml += `    <marker id="flow-arrow-order-${markerSuffix}" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="5" markerHeight="5" orient="auto">\n`
    xml += `      <path d="M 0 1 L 9 5 L 0 9 z" fill="#64748B" />\n`
    xml += `    </marker>\n`
    xml += `    <filter id="flow-card-shadow-${markerSuffix}" x="-20%" y="-20%" width="140%" height="150%"><feDropShadow dx="0" dy="1.5" stdDeviation="2" flood-color="#0F172A" flood-opacity="0.09" /></filter>\n`
    xml += `  </defs>\n`
    xml += `  <rect x="16" y="16" width="${w - 32}" height="${h - 32}" rx="12" fill="#FFFFFF" stroke="#CBD5E1" stroke-width="1.5" />\n`

    // 1. Header 横栏 (容器大小与预热处理)
    if (baseLayout.hasHeader) {
        xml += `  <g class="v3-header-group">\n`
        const ingColW = baseLayout.ingredientRows[0]?.w || 300
        const headerRightW = w - 32 - ingColW

        if (baseLayout.hasContainer) {
            xml += `    <rect x="16" y="${baseLayout.headerY}" width="${w - 32}" height="28" fill="#FFFFFF" stroke="#CBD5E1" stroke-width="1.2" />\n`
            xml += `    <text x="28" y="${baseLayout.headerY + 14}" dominant-baseline="central" font-size="12" font-weight="600" fill="#0F172A">${escapeXml(p.containerSize || '')}</text>\n`
            xml += `    <text x="${w - 28}" y="${baseLayout.headerY + 14}" text-anchor="end" dominant-baseline="central" font-size="11" font-weight="700" fill="#0F766E">容器大小</text>\n`
        }

        const preheatY = baseLayout.headerY + (baseLayout.hasContainer ? 28 : 0)
        xml += `    <rect x="16" y="${preheatY}" width="${ingColW}" height="28" fill="#F8FAFC" stroke="#CBD5E1" stroke-width="1.2" />\n`
        xml += `    <text x="${16 + ingColW / 2}" y="${preheatY + 14}" text-anchor="middle" dominant-baseline="central" font-size="13.5" font-weight="700" fill="#334155">材料</text>\n`

        xml += `    <rect x="${16 + ingColW}" y="${preheatY}" width="${headerRightW}" height="28" fill="#FFFFFF" stroke="#CBD5E1" stroke-width="1.2" />\n`
        if (p.preheat) {
            xml += `    <text x="${28 + ingColW}" y="${preheatY + 14}" dominant-baseline="central" font-size="12" font-weight="600" fill="#0F172A">${escapeXml(p.preheat || '')}</text>\n`
            xml += `    <text x="${w - 28}" y="${preheatY + 14}" text-anchor="end" dominant-baseline="central" font-size="11" font-weight="700" fill="#B45309">预热等预备处理</text>\n`
        }
        xml += `  </g>\n`
    }

    xml += `  <g class="v3-stage-bands">\n`
    baseLayout.stageBands.forEach(band => {
        const fill = band.colIndex % 2 === 0 ? '#F8FAFC' : '#FCFDFD'
        xml += `    <rect x="${band.x}" y="${band.y}" width="${band.w}" height="${band.h}" rx="12" fill="${fill}" />\n`
    })
    xml += `  </g>\n`

    // 2. 左侧食材行 (整洁表格单元格)
    const fontSize = isCompact ? "10.5" : "12"
    xml += `  <g class="v3-ingredients-group">\n`
    baseLayout.ingredientRows.forEach(row => {
        const display = formatIngredientRowDisplay(row.ingredient)
        const amt = escapeXml(display.amount)
        const line1 = escapeXml(display.nameLine1)
        const line2 = escapeXml(display.nameLine2)

        xml += `    <g transform="translate(${row.x}, ${row.y})">\n`
        xml += `      <rect width="${row.w}" height="${row.h}" fill="#FFFFFF" stroke="#E2E8F0" stroke-width="1.2" />\n`
        xml += `      <text x="14" y="${row.h / 2}" dominant-baseline="central" font-size="${fontSize}" font-weight="500" fill="#0F172A">\n`
        if (amt) {
            xml += `        <tspan font-weight="700" fill="#047857">${amt}</tspan>\n`
        }
        xml += `        <tspan dx="${amt ? '8' : '0'}" font-weight="600" fill="#0F172A">${line1}${line2 ? ` ${line2}` : ''}</tspan>\n`
        xml += `      </text>\n`
        xml += `    </g>\n`
    })
    xml += `  </g>\n`

    // 2.4 食材未加工阶段等待路径 (Waiting Paths: 虚线延伸至实际工序，遇中间卡片避障绕行，终点微小圆点)
    if (baseLayout.ingredientWaitingPaths && baseLayout.ingredientWaitingPaths.length > 0) {
        xml += `  <g class="v3-flow-waiting-paths">\n`
        baseLayout.ingredientWaitingPaths.forEach(wp => {
            if (wp.pathD) {
                xml += `    <path d="${wp.pathD}" fill="none" stroke="#CBD5E1" stroke-width="1.3" stroke-dasharray="3 3" />\n`
            } else {
                xml += `    <line x1="${wp.startX}" y1="${wp.startY}" x2="${wp.endX}" y2="${wp.startY}" stroke="#CBD5E1" stroke-width="1.3" stroke-dasharray="3 3" />\n`
            }
            xml += `    <circle cx="${wp.endX}" cy="${wp.startY}" r="2.25" fill="#059669" />\n`
        })
        xml += `  </g>\n`
    }

    // 2.5 全部工序流转：包含显式依赖、兼容推导与终点连接
    const flowConnectors = baseLayout.connectorLayouts || []
    if (flowConnectors.length > 0) {
        xml += `  <g class="v3-flow-connectors">\n`
        flowConnectors.forEach(conn => {
            const strokeColor = conn.isOrder ? '#64748B' : (conn.type === 'legacy' ? '#94A3B8' : '#059669')
            const dashAttr = conn.isOrder ? ' stroke-dasharray="5 4"' : (conn.type === 'legacy' ? ' stroke-dasharray="4 3"' : '')
            const markerAttr = conn.isOrder ? ` marker-end="url(#flow-arrow-order-${markerSuffix})"` : ` marker-end="url(#flow-arrow-material-${markerSuffix})"`
            xml += `    <path d="${conn.pathD}" fill="none" stroke="${strokeColor}"${dashAttr} stroke-width="${conn.isMaterial ? '2.2' : '1.6'}" stroke-linecap="round" stroke-linejoin="round"${markerAttr} />\n`
            if (conn.label && conn.midPoint) {
                const labelWidth = conn.label.length * 11 + 16
                const badgeFill = conn.isOrder ? '#F1F5F9' : '#ECFDF5'
                const badgeStroke = conn.isOrder ? '#94A3B8' : '#059669'
                const badgeTextFill = conn.isOrder ? '#475569' : '#047857'
                xml += `    <g transform="translate(${conn.midPoint.x}, ${conn.midPoint.y})">\n`
                xml += `      <rect x="${-(labelWidth / 2)}" y="-9" width="${labelWidth}" height="18" rx="9" fill="${badgeFill}" stroke="${badgeStroke}" stroke-width="1" />\n`
                xml += `      <text x="0" y="3.5" text-anchor="middle" font-size="9.5" font-weight="bold" fill="${badgeTextFill}">${escapeXml(conn.label)}</text>\n`
                xml += `    </g>\n`
            }
        })
        xml += `  </g>\n`
    }

    // 3. 拓扑工序节点：内容决定高度，食材跨度由输入总线表达
    xml += `  <g class="v3-actions-group">\n`
    baseLayout.actionBlockLayouts.forEach(lb => {
        const isPlaceholder = lb.isEmptyPlaceholder

        xml += `    <g transform="translate(${lb.x}, ${lb.y})">\n`
        xml += `      <rect width="${lb.w}" height="${lb.h}" rx="10" fill="#FFFFFF" stroke="#CBD5E1" stroke-width="1.25" filter="url(#flow-card-shadow-${markerSuffix})" />\n`
        xml += `      <rect width="4" height="${lb.h}" rx="2" fill="#10B981" />\n`
        xml += `      <g transform="translate(${lb.w / 2}, ${lb.h / 2})">\n`
        if (!isPlaceholder) {
            xml += `        <text text-anchor="middle" dominant-baseline="central">\n`
            
            // 多行主标题 (深色中性大字)
            lb.labelLines.forEach((lText, lIdx) => {
                const dy = lIdx === 0 ? getFirstLineYOffset(lb) : '1.3em'
                xml += `          <tspan x="0" dy="${dy}" font-size="13.5" font-weight="800" fill="#0F172A">${escapeXml(lText)}</tspan>\n`
            })

            // 多行副标题 (英文次级弱化)
            lb.sublabelLines.forEach((sText, sIdx) => {
                const dy = sIdx === 0 && lb.labelLines.length > 0 ? '1.3em' : '1.1em'
                xml += `          <tspan x="0" dy="${dy}" font-size="10.5" font-weight="500" fill="#64748B">${escapeXml(sText)}</tspan>\n`
            })

            // 火候/时长
            if (lb.block.heatLevel || lb.block.durationText || lb.block.durationMinutes) {
                const durationText = lb.block.durationText || (lb.block.durationMinutes ? `${lb.block.durationMinutes}m` : '')
                const heatText = escapeXml(`${lb.block.heatLevel ? `${lb.block.heatLevel} ` : ''}${durationText}`.trim())
                xml += `          <tspan x="0" dy="1.35em" font-size="10" font-weight="700" fill="#B45309">${heatText}</tspan>\n`
            }

            lb.equipmentLines.forEach(equipmentLine => {
                xml += `          <tspan x="0" dy="1.25em" font-size="9.5" fill="#64748B">${escapeXml(equipmentLine)}</tspan>\n`
            })

            xml += `        </text>\n`
        } else {
            xml += `        <text text-anchor="middle" dominant-baseline="central" font-size="11" fill="#9CA3AF" y="0">请选择相关食材</text>\n`
        }
        xml += `      </g>\n`
        xml += `    </g>\n`
    })
    xml += `  </g>\n`

    // 3.5 食材接入引线、锚点与聚成分段导轨 (置于卡片上方，清晰呈现且不跨中间未参与行)
    xml += `  <g class="v3-intake-rails">\n`
    baseLayout.intakeRailSegments.forEach(rail => {
        xml += `    <line id="${rail.id}" x1="${rail.x}" y1="${rail.startY}" x2="${rail.x}" y2="${rail.endY}" stroke="#059669" stroke-width="2.5" stroke-linecap="round" />\n`
        xml += `    <path d="${rail.pathD}" fill="none" stroke="#059669" stroke-width="2.5" stroke-linecap="round" />\n`
        xml += `    <circle cx="${rail.portX}" cy="${rail.portY}" r="3.5" fill="#FFFFFF" stroke="#059669" stroke-width="2" />\n`
    })
    baseLayout.ingredientIntakeFeeds.forEach(feed => {
        xml += `    <circle id="${feed.id}" cx="${feed.pinX}" cy="${feed.pinY}" r="2.75" fill="#059669" />\n`
    })
    xml += `  </g>\n`

    // 4. 最右侧最终完成区；结果型终点保持紧凑并由末端箭头接入
    const fbLayout = baseLayout.finalBlockLayout
    const fb = fbLayout.finalBlock
    const isPlaceholder = fbLayout.isPlaceholder

    xml += `  <g transform="translate(${fbLayout.x}, ${fbLayout.y})">\n`
    xml += `    <rect width="${fbLayout.w}" height="${fbLayout.h}" rx="${fbLayout.isOutcomeOnly ? 12 : 8}" fill="${fbLayout.isOutcomeOnly ? '#ECFDF5' : '#FFFFFF'}" stroke="${fbLayout.isOutcomeOnly ? '#10B981' : '#CBD5E1'}" stroke-width="1.2" filter="url(#flow-card-shadow-${markerSuffix})" />\n`
    xml += `    <g transform="translate(${fbLayout.w / 2}, ${fbLayout.h / 2})">\n`

    if (isPlaceholder) {
        xml += `      <text text-anchor="middle" dominant-baseline="central" font-size="13" font-weight="bold" fill="#6B7280" y="-10">完成方式待补充</text>\n`
    } else if (fbLayout.isOutcomeOnly) {
        xml += `      <text text-anchor="middle" dominant-baseline="central" font-size="12" font-weight="800" fill="#047857">完成</text>\n`
    } else {
        const hasTemp = !isColdFinal && Boolean(fb.temperatureF || fb.temperatureC)
        const labelY = hasTemp ? -16 : -10
        const durationY = hasTemp ? 18 : 10
        xml += `      <text text-anchor="middle" dominant-baseline="central" font-size="14" font-weight="800" fill="#065F46" y="${labelY}">${escapeXml(fb.label)}</text>\n`
        if (hasTemp) {
            const tempText = escapeXml(`${fb.temperatureF ? `${fb.temperatureF}°F` : ''} ${fb.temperatureC ? `(${fb.temperatureC}°C)` : ''}`.trim())
            xml += `      <text text-anchor="middle" dominant-baseline="central" font-size="11" font-weight="600" fill="#B45309" y="1">${tempText}</text>\n`
        }
        const finalDurationOrInstruction = fb.durationText || getFinalServingInstructions(recipe)
        xml += `      <text text-anchor="middle" dominant-baseline="central" font-size="11" font-weight="700" fill="#047857" y="${durationY}">${escapeXml(finalDurationOrInstruction)}</text>\n`
        if (fbLayout.instructionLines && fbLayout.instructionLines.length > 0) {
            xml += `      <text text-anchor="middle" dominant-baseline="central">\n`
            fbLayout.instructionLines.forEach((line, idx) => {
                const dy = idx === 0 ? '26px' : '1.3em'
                xml += `        <tspan x="0" dy="${dy}" font-size="9.5" font-weight="500" fill="#475569">${escapeXml(line)}</tspan>\n`
            })
            xml += `      </text>\n`
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
    const result: Array<{ ingredients: typeof ingredients; pageIndex: number; totalPages: number }> = []

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
    mode: ExportMode = 'full',
    layoutMode: FlowCardLayoutMode = 'auto'
): Promise<void> {
    const isTable = resolveLayoutMode(recipe, layoutMode) === 'table'

    if (isTable) {
        const { svgString, width, height } = generateContinuousTableSvgString(recipe)
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

                        const downloadName = filename || `${recipe.title || 'VisualRecipe'}-Table.png`
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
        return
    }

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
            mode,
            'flow'
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
