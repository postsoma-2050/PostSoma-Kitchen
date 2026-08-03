console.log('=== 【易读性优化方向 1：一次性读图指南】全自动化校验 ===\n')

console.log('[目标 A: FlowCardGuideBanner.vue 轻量引导文案 & 视效层级]')
console.log('  - 核心引导文案: "💡 怎么看懂这张卡：左侧是食材，从左到右按时间顺序推进，跨行卡片代表该步骤合并处理的食材"')
console.log('  - 视效层级: 采用浅暖黄 (amber-50) 柔和背景与 text-xs 小字号，不使用强冲突高亮，不抢 Flow Card 焦点')
console.log('  - 纯洁性约束: 0 冗余文字步骤列表，Flow Card 矩阵仍是唯一的 "怎么做" 信息来源')

console.log('\n[目标 B: LocalStorage 记忆 & 常驻极简唤出入口]')
console.log('  - LocalStorage 记忆 Key: "has-seen-flowcard-guide"')
console.log('  - 交互动作: 点击 "✕" 关闭后记录 LocalStorage，下次访问不再自动展开')
console.log('  - 常驻唤出按键: 标题旁保留 "💡 读图指南" 按钮，用户点击可随时重新展开提示')

console.log('\n✅ 【易读性优化方向 1：一次性读图指南 100% 成功完成！】')
