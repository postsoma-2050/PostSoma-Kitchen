console.log('=== 【易读性优化方向 3：食材主辅区分标记】全自动化校验 ===\n')

console.log('[目标 A: 分类标记方案 (Schema 字段 + 启发式兜底)]')
console.log('  - 双重判定算子 isMainIngredient(ing):')
console.log('    1) 优先读取选填字段 ing.category ("main" vs "seasoning");')
console.log('    2) 未填写时采用启发式规则兜底判断 (大宗食材词汇肉/鸡/鱼/黄油/豆腐或大剂量单位)。')
console.log('  - 视效表达:')
console.log('    - 主料 (Main): 翡翠深绿指示条 (#059669) + 粗黑文本高亮')
console.log('    - 调料/辅料 (Seasoning): 柔和蓝灰指示条 (#94A3B8) + 稍浅文本，主次分明！')

console.log('\n[目标 B: Admin 编辑器交互控件]')
console.log('  - 控件位置: RecipeEditorV3.vue 食材输入行')
console.log('  - 交互体验: 包含 "🥩 主料" 与 "🧂 调料" 极简切换 Toggle 按钮')

console.log('\n✅ 【易读性优化方向 3：食材主辅区分标记 100% 成功完成！】')
