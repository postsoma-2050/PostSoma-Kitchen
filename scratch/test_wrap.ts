import { measureTextWidth } from '../src/utils/textMeasurement';

function wrapText(text: string, maxWidth: number, fontSize = 10.5, isBold = false): string[] {
  if (!text) return []
  const tokens = text.match(/[a-zA-Z0-9]+|\s+|[^\x00-\x7F]|[\x00-\x7F]/g) || [text]

  let lines: string[] = []
  let currentLine = ''
  for (const token of tokens) {
    const testLine = currentLine + token
    const testW = measureTextWidth(testLine.trim(), fontSize, isBold)
    if (testW <= maxWidth || currentLine === '') {
      currentLine += token
    } else {
      if (/^[，,、。；;！？!?:：）)]/.test(token)) {
        currentLine += token
        lines.push(currentLine.trim())
        currentLine = ''
      } else {
        lines.push(currentLine.trim())
        currentLine = token.trimStart()
      }
    }
  }
  if (currentLine.trim()) lines.push(currentLine.trim())
  return lines
}

console.log('--- Test Improved Wrap ---');
console.log('Block 1 wrapped 109px:');
console.log(wrapText('煲锅放水烧开，入排骨大火煮沸转小火炖40分钟', 109, 10.5));

console.log('Block 2 wrapped 134px:');
console.log(wrapText('放入苦瓜、冬菇、姜蒜、黄豆、山药与盐，小火炖40分钟撒香菜', 134, 10.5));
