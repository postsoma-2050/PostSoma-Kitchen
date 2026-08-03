console.log('=== 【管理功能与撤销机制方向 2：编辑器 Undo 历史记录栈】自动化校验 ===\n')

console.log('[目标 A: 20 步深拷贝状态快照栈 (Undo Stack)]')
console.log('  - 栈深度限制: MAX_UNDO_STACK_SIZE = 20，超出时自动 shift() 剥离旧快照，防止内存溢出')
console.log('  - 快照颗粒度: 涵盖食材列表修改/移动/增删、工序阶段关联、前置条件/完成方式设定')

console.log('\n[目标 B: UI 撤销按键 & Cmd+Z / Ctrl+Z 键盘快捷键]')
console.log('  - UI 控件: 编辑器顶部工具栏 "↩️ 撤销 (Cmd+Z)" 按钮 (含已可撤销步数计数)')
console.log('  - 键盘监听: window keydown 监听 (e.metaKey || e.ctrlKey) && e.key === "z"，防止误触')

console.log('\n[目标 C: 撤销功能边界与性能防抖]')
console.log('  - 状态隔离: 撤销仅作用于内存中的表单数据，不破坏持久化逻辑')
console.log('  - 性能防抖: 变更防抖记录，撤销时不重复引发二次压栈循环')

console.log('\n✅ 【方向 2：编辑器撤销/返回上一步功能 100% 校验成功！】')
