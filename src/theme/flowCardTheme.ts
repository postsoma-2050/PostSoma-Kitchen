/**
 * Visual Recipe Flow Card 统一设计 Token (Design Tokens) 体系 (方向 3 主辅料分级版)
 */

export const flowCardTheme = {
    // 1. 色彩 Token 体系 (Color Palette)
    colors: {
        // 全局底板与纸张色调
        workspaceBg: '#FAF8F5',       // 页面外层暖杏米色背景
        canvasBg: '#FDFBF7',          // SVG 容器底色
        paperBg: '#FFFFFF',           // 纸张主体纯白
        paperStroke: '#2D5A37',       // 柔和深森林绿外描边

        // 顶栏 Header 区分色调 (设备 / 准备)
        headerEquipmentFill: '#E0F2FE', // 浅天空蓝 (设备)
        headerEquipmentText: '#0369A1',
        headerEquipmentBodyFill: '#F8FAFC',
        headerEquipmentBodyText: '#0C4A6E',

        headerPreheatFill: '#E8F5E9',   // 嫩芽绿 (准备)
        headerPreheatText: '#2E7D32',
        headerPreheatBodyFill: '#F9FBF7',
        headerPreheatBodyText: '#1B5E20',

        // 辅助网格线色调
        gridLine: '#E5E7EB',

        // 区段 1：左侧食材行 (方向 3 主辅料分级视效)
        ingredientFill: '#FAFAFA',      // 极淡微灰底
        ingredientStroke: '#E5E7EB',    // 细浅灰边框

        // 主料 (Main Ingredient) Token
        ingredientMainAccent: '#059669',   // 翡翠深绿点睛条 (主料)
        ingredientMainAmountText: '#047857',
        ingredientMainNameText: '#111827', // 粗黑高亮

        // 调料/辅料 (Seasoning Ingredient) Token
        ingredientSeasoningAccent: '#94A3B8', // 柔和蓝灰点睛条 (调料)
        ingredientSeasoningAmountText: '#475569',
        ingredientSeasoningNameText: '#374151',// 稍浅灰

        ingredientSubText: '#6B7280',

        // 区段 2：中间工序块
        actionFill: '#FFFFFF',
        actionPlaceholderFill: '#F8FAFC',
        actionStroke: '#D1D5DB',
        actionLabelText: '#991B1B',
        actionSublabelText: '#B91C1C',
        actionHeatText: '#991B1B',

        // 区段 3：最右侧终点 Cooking Method
        finalBakeFill: '#FEF3C7',
        finalBakeBadge: '#F59E0B',
        finalBakeStroke: '#D97706',
        finalBakeText: '#92400E',

        finalColdFill: '#D1FAE5',
        finalColdBadge: '#10B981',
        finalColdStroke: '#059669',
        finalColdText: '#047857',

        finalPlaceholderFill: '#F3F4F6'
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
        cardShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.05), 0 8px 10px -6px rgba(0, 0, 0, 0.03)',
        blockShadow: '0 2px 4px rgba(0, 0, 0, 0.02)'
    },

    // 4. 描边与线框 Token
    strokes: {
        paperWidth: 2.0,
        blockWidth: 1.2,
        gridWidth: 1.0,
        dashArray: '3 3'
    },

    // 5. 文字与排版 Token
    typography: {
        fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "PingFang SC", sans-serif',
        headerTitleSize: 12,
        headerTitleWeight: '900',
        ingredientSize: 11.5,
        actionTitleSize: 13,
        actionTitleWeight: 'bold',
        actionSublabelSize: 11,
        finalTitleSize: 14
    }
}
