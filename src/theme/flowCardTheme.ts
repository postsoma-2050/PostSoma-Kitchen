/**
 * Visual Recipe Flow Card 统一设计 Token (Design Tokens) 体系 (方向 3 主辅料分级版)
 */

export const flowCardTheme = {
    // 1. 色彩 Token 体系 (Color Palette - 连续工序表与分支流程图统一共享)
    colors: {
        // 全局底板与纸张色调
        workspaceBg: '#FAF8F5',       // 页面外层暖杏米色背景
        canvasBg: '#FAF8F5',          // SVG 容器底色
        paperBg: '#FFFFFF',           // 纸张主体纯白
        paperStroke: '#CBD5E1',       // 中性建筑感外边框 (废弃旧森林绿)
        outerBorder: '#CBD5E1',       // 统一外围实线边框
        gridLine: '#E2E8F0',          // 统一单元格/卡片内部细线

        // 顶栏 Header 区分色调 (材料 / 容器 / 预备)
        headerFill: '#F8FAFC',
        headerText: '#334155',
        headerContainerTag: '#0F766E',
        headerPreheatTag: '#B45309',

        // 区段 1：左侧食材行 (中性整洁表格)
        ingredientFill: '#FFFFFF',
        ingredientStroke: '#E2E8F0',
        ingredientAmountText: '#047857',   // 份量深绿加粗
        ingredientNameText: '#0F172A',     // 食材名称中性深黑
        ingredientPrepText: '#64748B',     // 预备说明次级灰

        // 区段 2：中间工序块 (简短动作与必要参数)
        actionFill: '#FFFFFF',
        actionPlaceholderFill: '#F8FAFC',
        actionStroke: '#E2E8F0',
        actionLabelText: '#0F172A',        // 动作标题中性深黑加粗 (废弃大红)
        actionSublabelText: '#64748B',     // 英文副标弱化灰调
        actionHeatText: '#B45309',         // 火候与时间暖琥珀色
        actionEquipmentText: '#64748B',
        actionStageFills: ['#F0FDF4', '#EFF6FF', '#FFF7ED', '#F5F3FF'],
        actionStageStrokes: ['#86B99A', '#93B4D8', '#E7B979', '#B9A7D4'],
        actionStageAccents: ['#2D6A4F', '#3B6E9F', '#B86B24', '#735C96'],

        // 暂存与回锅走廊
        holdAsideFill: '#F0FDF4',
        holdAsideStroke: '#059669',
        holdAsideText: '#059669',

        // 显式依赖连线 (分支模式)
        materialLine: '#059669',          // 物料流向深绿实线
        orderLine: '#64748B',             // 纯时序/等待灰蓝虚线
        legacyLine: '#94A3B8',            // 未分类依赖淡灰虚线

        // 区段 3：最右侧终点 Cooking Method
        finalFill: '#FFFFFF',
        finalStroke: '#CBD5E1',
        finalMethodText: '#065F46',       // 终点动作深翡翠绿
        finalDurationText: '#047857',
        finalInstText: '#475569',
    },

    // 2. 圆角 Token
    radii: {
        card: 14,
        header: 6,
        block: 8,
        badge: 9999
    },

    // 3. 阴影 Token
    shadows: {
        cardShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.05)',
        blockShadow: '0 1px 2px 0 rgba(0, 0, 0, 0.02)'
    },

    // 4. 描边与线框 Token
    strokes: {
        paperWidth: 1.5,
        blockWidth: 1.2
    },

    // 5. 文字与排版 Token
    typography: {
        fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "PingFang SC", sans-serif',
        headerTitleSize: 13.5,
        headerTitleWeight: '700',
        ingredientSize: 12,
        actionTitleSize: 13.5,
        actionTitleWeight: '800',
        actionSublabelSize: 10.5,
        finalTitleSize: 14,
        finalTitleWeight: '800'
    }
}
