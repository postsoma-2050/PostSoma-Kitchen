const fs = require('fs')
const path = require('path')
const ts = require('typescript')

// 用于不需要运行时配置的纯领域测试。刻意不读取 .env / .env.local。
const loadedModules = new Map()

function loadTsModule(filePath) {
  const absolutePath = path.resolve(filePath)
  if (loadedModules.has(absolutePath)) return loadedModules.get(absolutePath).exports

  const code = fs.readFileSync(absolutePath, 'utf8')
  const result = ts.transpileModule(code, {
    compilerOptions: {
      module: ts.ModuleKind.CommonJS,
      target: ts.ScriptTarget.ES2020,
      esModuleInterop: true,
    },
  })
  const moduleRecord = { exports: {} }
  loadedModules.set(absolutePath, moduleRecord)

  const customRequire = request => {
    let target
    if (request.startsWith('@/')) target = path.join(process.cwd(), 'src', request.slice(2))
    else if (request.startsWith('./') || request.startsWith('../')) target = path.resolve(path.dirname(absolutePath), request)
    else return require(request)

    if (fs.existsSync(`${target}.ts`)) return loadTsModule(`${target}.ts`)
    if (fs.existsSync(path.join(target, 'index.ts'))) return loadTsModule(path.join(target, 'index.ts'))
    if (fs.existsSync(target)) return loadTsModule(target)
    return require(request)
  }

  const wrapper = new Function('module', 'exports', 'require', '__dirname', '__filename', result.outputText)
  wrapper(moduleRecord, moduleRecord.exports, customRequire, path.dirname(absolutePath), absolutePath)
  return moduleRecord.exports
}

const targetScript = process.argv[2]
if (!targetScript) {
  console.error('用法: node scripts/runTsHermetic.js <path-to-ts-file>')
  process.exit(1)
}

try {
  loadTsModule(targetScript)
} catch (error) {
  console.error(`执行 ${targetScript} 时出错:`, error)
  process.exit(1)
}
