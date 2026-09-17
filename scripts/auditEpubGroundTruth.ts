import { spawnSync } from 'node:child_process'
import path from 'node:path'

const scriptPath = path.resolve(__dirname, 'auditEpubGroundTruth.py')
const result = spawnSync('python3', [scriptPath], { stdio: 'inherit' })

if (result.status !== 0) {
  process.exit(result.status ?? 1)
}
