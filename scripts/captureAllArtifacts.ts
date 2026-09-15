import { execSync } from 'child_process'
import path from 'path'
import fs from 'fs'

const CHROME_BIN = '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome'
const ARTIFACT_DIR = '/Users/grangerfdad/.gemini/antigravity-ide/brain/b3d8bae8-a245-4642-ad40-da66b219ac68'

const targets = [
  {
    name: 'chrome_cn14_table_desktop.png',
    url: 'http://localhost:5173/recipe/cn-14-zhurou-dun-fentiao?source=local',
    width: 1400,
    height: 3000
  },
  {
    name: 'chrome_cn14_mobile.png',
    url: 'http://localhost:5173/recipe/cn-14-zhurou-dun-fentiao?source=local',
    width: 390,
    height: 3200
  },
  {
    name: 'chrome_cn59_table_desktop.png',
    url: 'http://localhost:5173/recipe/cn-59-qincai-niurou?source=local',
    width: 1400,
    height: 2400
  },
  {
    name: 'chrome_cn59_mobile.png',
    url: 'http://localhost:5173/recipe/cn-59-qincai-niurou?source=local',
    width: 390,
    height: 2600
  },
  {
    name: 'chrome_brownies_desktop.png',
    url: 'http://localhost:5173/recipe/v3-espresso-brownies?source=local',
    width: 1400,
    height: 2600
  },
  {
    name: 'chrome_cn01_fallback_desktop.png',
    url: 'http://localhost:5173/recipe/cn-01-yuxiang-rousi?source=local',
    width: 1400,
    height: 2400
  }
]

console.log('=== 使用原生 Google Chrome 捕获真实页面屏幕截图 ===\n')

for (const t of targets) {
  const outPath = path.join(ARTIFACT_DIR, t.name)
  console.log(`正在捕获: ${t.name} (${t.width}x${t.height}) -> ${t.url}`)
  const cmd = `"${CHROME_BIN}" --headless --disable-gpu --virtual-time-budget=3000 --window-size=${t.width},${t.height} --screenshot="${outPath}" "${t.url}"`
  try {
    execSync(cmd, { stdio: 'ignore' })
    if (fs.existsSync(outPath)) {
      const stats = fs.statSync(outPath)
      console.log(`✅ 成功生成: ${t.name} (${stats.size} bytes)`)
    } else {
      console.error(`❌ 未能生成: ${t.name}`)
    }
  } catch (err: any) {
    console.error(`❌ 捕获 ${t.name} 失败:`, err.message)
  }
}

console.log('\n=== 全部屏幕截图生成完毕！ ===')
