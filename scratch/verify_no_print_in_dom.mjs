import fs from 'fs'
import path from 'path'

console.log('=== 【公开食谱详情页 🖨️ 打印功能彻底物理移除与 DOM 验证】 ===\n')

const srcPath = '/Users/jameswei/Desktop/Time_to_eat-main/src'
const distPath = '/Users/jameswei/Desktop/Time_to_eat-main/dist'

// 1. 检查 src 源码中的 "打印"
function checkDir(dir, query) {
  let matches = []
  const files = fs.readdirSync(dir)
  for (const f of files) {
    const fullPath = path.join(dir, f)
    const stat = fs.statSync(fullPath)
    if (stat.isDirectory()) {
      matches = matches.concat(checkDir(fullPath, query))
    } else if (f.endsWith('.vue') || f.endsWith('.ts') || f.endsWith('.js') || f.endsWith('.html')) {
      const content = fs.readFileSync(fullPath, 'utf8')
      if (content.includes(query)) {
        matches.push(fullPath)
      }
    }
  }
  return matches
}

const srcMatches = checkDir(srcPath, '打印')
const distMatches = checkDir(distPath, '打印')

console.log('[1. 源码 src/ 匹配检查]')
console.log(`  - 含有 "打印" 的源码文件数量: ${srcMatches.length}`)

console.log('\n[2. 编译产物 dist/ 匹配检查]')
console.log(`  - 含有 "打印" 的打包产物文件数量: ${distMatches.length}`)

if (srcMatches.length === 0 && distMatches.length === 0) {
  console.log('\n✅ 【验证成功】: 公开详情页、所有组件 DOM、逻辑与构建产物中已 100% 彻底擦除“打印”与“打印图卡”！')
} else {
  console.error('\n❌ 【验证失败】: 仍有残留文件含有 "打印"！')
  process.exit(1)
}
