const fs = require('fs');
const path = require('path');
const ts = require('typescript');

// 兼容 Node.js < 22 环境下 Supabase Client 初始化对 WebSocket 的检查
if (typeof global.WebSocket === 'undefined') {
  global.WebSocket = class DummyWebSocket {}
}

// 自动加载根目录的 .env 与 .env.local 环境变量到 process.env
function loadEnvFiles() {
  ['.env', '.env.local'].forEach(file => {
    const envPath = path.resolve(process.cwd(), file);
    if (fs.existsSync(envPath)) {
      const content = fs.readFileSync(envPath, 'utf8');
      content.split('\n').forEach(line => {
        const trimmed = line.trim();
        if (trimmed && !trimmed.startsWith('#') && trimmed.includes('=')) {
          const idx = trimmed.indexOf('=');
          const key = trimmed.substring(0, idx).trim();
          const val = trimmed.substring(idx + 1).trim().replace(/^["']|["']$/g, '');
          if (key && !process.env[key]) {
            process.env[key] = val;
          }
        }
      });
    }
  });
}

loadEnvFiles();

const targetScript = process.argv[2];
if (!targetScript) {
  console.error('用法: node scripts/runTs.js <path-to-ts-file>');
  process.exit(1);
}

const loadedModules = new Map();

function loadTsModule(filePath) {
  const absPath = path.resolve(filePath);
  if (loadedModules.has(absPath)) return loadedModules.get(absPath).exports;

  const code = fs.readFileSync(absPath, 'utf8');
  const result = ts.transpileModule(code, {
    compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2020, esModuleInterop: true }
  });
  
  const m = { exports: {} };
  loadedModules.set(absPath, m);

  const customRequire = (p) => {
    if (p.startsWith('@/')) {
      const rel = p.replace('@/', '');
      let target = path.join(process.cwd(), 'src', rel);
      if (fs.existsSync(target + '.ts')) return loadTsModule(target + '.ts');
      if (fs.existsSync(target + '/index.ts')) return loadTsModule(target + '/index.ts');
      if (fs.existsSync(target)) return loadTsModule(target);
    } else if (p.startsWith('./') || p.startsWith('../')) {
      let target = path.resolve(path.dirname(absPath), p);
      if (fs.existsSync(target + '.ts')) return loadTsModule(target + '.ts');
      if (fs.existsSync(target + '/index.ts')) return loadTsModule(target + '/index.ts');
    }
    return require(p);
  };

  const wrapper = new Function('module', 'exports', 'require', '__dirname', '__filename', result.outputText);
  wrapper(m, m.exports, customRequire, path.dirname(absPath), absPath);
  return m.exports;
}

try {
  loadTsModule(targetScript);
} catch (e) {
  console.error(`执行 ${targetScript} 时出错:`, e);
  process.exit(1);
}
