import { CHINESE_HEALTHY_RECIPES } from '../src/data/chineseHealthyRecipes';
import { measureTextWidth } from '../src/utils/textMeasurement';

function wrapTextToLinesFixed(
    text: string,
    maxWidth: number,
    fontSize: number = 12,
    isBold: boolean = false
): string[] {
    if (!text) return []
    const totalW = measureTextWidth(text, fontSize, isBold)
    if (totalW <= maxWidth) {
        return [text]
    }

    const lines: string[] = []
    const tokens = text.match(/[a-zA-Z0-9_.-]+|\s+|[^\x00-\x7F]|[\x00-\x7F]/g) || [text]

    let currentLine = ''
    for (const token of tokens) {
        const testLine = currentLine + token
        const testW = measureTextWidth(testLine.trim(), fontSize, isBold)

        if (testW <= maxWidth || currentLine === '') {
            currentLine += token
        } else {
            if (/^[，,、。；;！？!?:：）)\]】》”’]/.test(token)) {
                currentLine += token
                lines.push(currentLine.trim())
                currentLine = ''
            } else {
                lines.push(currentLine.trim())
                currentLine = token.trimStart()
            }
        }
    }

    if (currentLine.trim()) {
        lines.push(currentLine.trim())
    }

    return lines
}

const recipe = CHINESE_HEALTHY_RECIPES.find((r: any) => r.id === 'cn-29-kugua-donggu-gutang')!;
console.log('Recipe:', recipe.title);

recipe.actionBlocks.forEach((b: any) => {
    const rawNote = (b.notes || '').trim();
    const cleanNote = rawNote.replace(/^(注[：:]|注意[：:]|要点[：:]|提示[：:])/g, '').trim();
    console.log(`\nBlock [${b.id}] ${b.label}:`);
    console.log('  Clean note:', cleanNote);
    const wrapped = wrapTextToLinesFixed(cleanNote, 134, 10.5, false);
    console.log('  Wrapped to 134px:', wrapped);
});
