import fs from 'fs'
import path from 'path'
import crypto from 'crypto'
import { execFileSync } from 'child_process'
import { CHINESE_HEALTHY_RECIPES } from '../src/data/chineseHealthyRecipes'

interface SourceRecipe {
  sourceIndex: number
  title: string
  method?: string
  locator: string
  htmlFile: string
  anchor: string
  preparationMinutes?: number
  cookingMinutes?: number
  materialsText?: string
  seasoningsText?: string
  steps: string[]
  nutritionNote?: string
  sourceText: string
}

function findSourceForRecipe(recipe: typeof CHINESE_HEALTHY_RECIPES[number], sourceRecipes: SourceRecipe[]): SourceRecipe | undefined {
  const currentTitleClean = stripEmojiTitle(recipe.title)
  const normCurrent = normalizeForSimilarity(currentTitleClean)
  let matched = sourceRecipes.find(s => s.title === currentTitleClean)
  if (matched) return matched
  matched = sourceRecipes.find(s => normalizeForSimilarity(s.title) === normCurrent)
  if (matched) return matched
  if (recipe.provenance?.locator) {
    matched = sourceRecipes.find(s => recipe.provenance?.locator?.includes(s.title))
    if (matched) return matched
  }
  const sorted = [...sourceRecipes].map(s => ({
    s,
    score: dice(currentTitleClean, s.title)
  })).sort((a, b) => b.score - a.score)
  if (sorted[0] && sorted[0].score >= 0.5) {
    return sorted[0].s
  }
  return undefined
}

const entityMap: Record<string, string> = {
  amp: '&', lt: '<', gt: '>', quot: '"', apos: "'", nbsp: ' ',
}

function decodeHtml(value: string): string {
  return value
    .replace(/&#x([0-9a-f]+);/gi, (_, hex) => String.fromCodePoint(Number.parseInt(hex, 16)))
    .replace(/&#(\d+);/g, (_, decimal) => String.fromCodePoint(Number.parseInt(decimal, 10)))
    .replace(/&([a-z]+);/gi, (match, name) => entityMap[name.toLowerCase()] ?? match)
}

function cleanHtml(value: string): string {
  return decodeHtml(value)
    .replace(/<br\s*\/?\s*>/gi, ' ')
    .replace(/<[^>]+>/g, ' ')
    .replace(/[\u00a0\u3000]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()
}

function readZipEntry(epubPath: string, entry: string): string {
  return execFileSync('unzip', ['-p', epubPath, entry], {
    encoding: 'utf8',
    maxBuffer: 32 * 1024 * 1024,
  })
}

function listZipEntries(epubPath: string): string[] {
  return execFileSync('unzip', ['-Z1', epubPath], {
    encoding: 'utf8',
    maxBuffer: 8 * 1024 * 1024,
  }).split(/\r?\n/).filter(Boolean)
}

function parseMetadata(opf: string) {
  const pick = (tag: string) => cleanHtml(opf.match(new RegExp(`<dc:${tag}[^>]*>([\\s\\S]*?)<\\/dc:${tag}>`, 'i'))?.[1] || '')
  const uuid = opf.match(/<dc:identifier[^>]*id=["']bookid["'][^>]*>([\s\S]*?)<\/dc:identifier>/i)?.[1]
  const asin = opf.match(/<dc:identifier[^>]*opf:scheme=["']ASIN["'][^>]*>([\s\S]*?)<\/dc:identifier>/i)?.[1]
  return {
    title: pick('title'),
    author: pick('creator'),
    publisher: pick('publisher'),
    publicationDate: pick('date'),
    uuid: uuid ? cleanHtml(uuid) : undefined,
    asin: asin ? cleanHtml(asin) : undefined,
  }
}

function parseMinutes(text: string, label: string): number | undefined {
  const matched = text.match(new RegExp(`${label}(\\d+)分钟`))
  return matched ? Number(matched[1]) : undefined
}

function parseSourceRecipes(epubPath: string) {
  const entries = listZipEntries(epubPath)
  const opfEntry = entries.find(item => /(?:^|\/)content\.opf$/i.test(item))
  if (!opfEntry) throw new Error('EPUB 缺少 content.opf，无法确认书目元数据')
  const metadata = parseMetadata(readZipEntry(epubPath, opfEntry))
  const htmlEntries = entries.filter(item => /(?:^|\/)text\d+\.html$/i.test(item)).sort()
  const recipes: SourceRecipe[] = []

  for (const htmlFile of htmlEntries) {
    const html = readZipEntry(epubPath, htmlFile)
    const recipePattern = /<h4\b([^>]*)class=["'][^"']*kindle-cn-heading4[^"']*["']([^>]*)>([\s\S]*?)<\/h4>([\s\S]*?)(?=<h[234]\b|<\/body>)/gi
    for (const matched of html.matchAll(recipePattern)) {
      const attrs = `${matched[1]} ${matched[2]}`
      const anchor = attrs.match(/id=["']([^"']+)["']/i)?.[1]
      if (!anchor) continue
      const headingText = cleanHtml(matched[3])
      const method = headingText.match(/(?:^|\s)(蒸|炖|炒|拌|煮|烤)$/)?.[1]
      const title = headingText.replace(/\s*(蒸|炖|炒|拌|煮|烤)$/, '').trim()
      const paragraphs = [...matched[4].matchAll(/<p\b[^>]*>([\s\S]*?)<\/p>/gi)]
        .map(item => cleanHtml(item[1]))
        .filter(Boolean)
      const timing = paragraphs.find(item => /准备\d+分钟/.test(item)) || ''
      const materialsText = paragraphs.find(item => item.startsWith('材料'))?.replace(/^材料\s*/, '')
      const seasoningsText = paragraphs.find(item => item.startsWith('调料'))?.replace(/^调料\s*/, '')
      const steps = paragraphs
        .filter(item => /^\d+\s/.test(item))
        .map(item => item.replace(/^\d+\s*/, '').trim())
      const nutritionNote = paragraphs.find(item => item.startsWith('营养笔记：'))?.replace(/^营养笔记：/, '')
      recipes.push({
        sourceIndex: recipes.length + 1,
        title,
        method,
        locator: `${htmlFile}#${anchor}`,
        htmlFile,
        anchor,
        preparationMinutes: parseMinutes(timing, '准备'),
        cookingMinutes: parseMinutes(timing, '烹(?:调|饪)'),
        materialsText,
        seasoningsText,
        steps,
        nutritionNote,
        sourceText: paragraphs.join(' '),
      })
    }
  }
  return { metadata, recipes }
}

function stripEmojiTitle(value: string): string {
  return value.replace(/^[^\p{L}\p{N}]+/u, '').trim()
}

function normalizeForSimilarity(value: string): string {
  return value
    .normalize('NFKC')
    .toLowerCase()
    .replace(/[（(][^）)]*[）)]/g, '')
    .replace(/经典|传统|蒜香|清爽|开胃|浓郁|原味|鲜香|秘制|纯手工|手工|营养师|健康/g, '')
    .replace(/[^\p{L}\p{N}]/gu, '')
}

function bigrams(value: string): Set<string> {
  const normalized = normalizeForSimilarity(value)
  const result = new Set<string>()
  if (normalized.length < 2) {
    if (normalized) result.add(normalized)
    return result
  }
  for (let index = 0; index < normalized.length - 1; index += 1) result.add(normalized.slice(index, index + 2))
  return result
}

function dice(left: string, right: string): number {
  const a = bigrams(left)
  const b = bigrams(right)
  if (a.size === 0 || b.size === 0) return 0
  let overlap = 0
  for (const item of a) if (b.has(item)) overlap += 1
  return (2 * overlap) / (a.size + b.size)
}

function getCurrentText(recipe: typeof CHINESE_HEALTHY_RECIPES[number]): string {
  return [
    stripEmojiTitle(recipe.title),
    recipe.description || '',
    ...recipe.ingredients.flatMap(item => [item.name, item.amountText || '', item.note || '']),
    ...recipe.actionBlocks.flatMap(block => [block.label, block.note || '', block.notes || '']),
  ].join(' ')
}

function numericFacts(value: string): string[] {
  return [...new Set(
    (value.normalize('NFKC').match(/\d+(?:\.\d+)?\s*(?:克|g|千克|kg|毫升|ml|分钟|分|秒|个|只|条|片|瓣|枚|勺|碗|盒|袋|杯|℃|度)/gi) || [])
      .map(item => item.replace(/\s+/g, '').toLowerCase()),
  )]
}

function gitIntroduction() {
  try {
    const commit = execFileSync('git', ['log', '--diff-filter=A', '--format=%H', '--', 'src/data/chineseHealthyRecipes.ts'], { encoding: 'utf8' })
      .trim().split(/\r?\n/).filter(Boolean).at(-1)
    if (!commit) return undefined
    const details = execFileSync('git', ['show', '-s', '--format=%aI%x09%s', commit], { encoding: 'utf8' }).trim()
    const [introducedAt, subject] = details.split('\t')
    return { commit, introducedAt, subject }
  } catch {
    return undefined
  }
}

const sourceArg = process.argv.find(arg => arg.startsWith('--source='))?.slice('--source='.length)
const epubPath = path.resolve(sourceArg || '蒸炖炒，营养师的健康食谱.epub')
if (!fs.existsSync(epubPath)) {
  throw new Error(`找不到原书 EPUB：${epubPath}\n用法：npm run audit:book-source -- --source=/absolute/path/book.epub`)
}

const epubBytes = fs.readFileSync(epubPath)
const { metadata, recipes: sourceRecipes } = parseSourceRecipes(epubPath)
const sourceByAnchor = new Map(sourceRecipes.map(recipe => [recipe.anchor, recipe]))
const confirmedMappings = CHINESE_HEALTHY_RECIPES.map(current => {
  const source = findSourceForRecipe(current, sourceRecipes)
  if (!source) return null
  const currentText = getCurrentText(current)
  const sourceFacts = numericFacts(source.sourceText)
  const currentFacts = numericFacts(currentText)
  return {
    recipeId: current.id,
    currentTitle: stripEmojiTitle(current.title),
    sourceTitle: source.title,
    locator: source.locator,
    sourceIndex: source.sourceIndex,
    sourcePreparationMinutes: source.preparationMinutes,
    sourceCookingMinutes: source.cookingMinutes,
    sourceStepCount: source.steps.length,
    currentActionCount: current.actionBlocks.length,
    sourceNumericFacts: sourceFacts,
    currentNumericFacts: currentFacts,
    sourceFactsMissingFromCurrent: sourceFacts.filter(item => !currentFacts.includes(item)),
    currentFactsAbsentFromSource: currentFacts.filter(item => !sourceFacts.includes(item)),
    titleSimilarity: Number(dice(stripEmojiTitle(current.title), source.title).toFixed(3)),
    contentSimilarity: Number(dice(currentText, source.sourceText).toFixed(3)),
  }
}).filter(Boolean) as any[]

const confirmedCurrentIds = new Set(confirmedMappings.map(item => item.recipeId))
const confirmedSourceAnchors = new Set(confirmedMappings.map(item => sourceRecipes[item.sourceIndex - 1]?.anchor).filter(Boolean))
const unmatchedCurrent = CHINESE_HEALTHY_RECIPES
  .filter(recipe => !confirmedCurrentIds.has(recipe.id))
  .map(recipe => {
    const currentText = getCurrentText(recipe)
    const candidates = sourceRecipes
      .map(source => ({
        sourceTitle: source.title,
        locator: source.locator,
        titleSimilarity: dice(stripEmojiTitle(recipe.title), source.title),
        contentSimilarity: dice(currentText, source.sourceText),
      }))
      .map(candidate => ({
        ...candidate,
        score: candidate.titleSimilarity * 0.7 + candidate.contentSimilarity * 0.3,
      }))
      .sort((left, right) => right.score - left.score)
      .slice(0, 3)
      .map(candidate => ({
        ...candidate,
        titleSimilarity: Number(candidate.titleSimilarity.toFixed(3)),
        contentSimilarity: Number(candidate.contentSimilarity.toFixed(3)),
        score: Number(candidate.score.toFixed(3)),
      }))
    return {
      recipeId: recipe.id,
      currentTitle: stripEmojiTitle(recipe.title),
      reason: '尚未找到可人工确认的一对一原书食谱条目；不得继续把书名当作已核实来源。',
      candidates,
    }
  })

const unmatchedSource = sourceRecipes
  .filter(recipe => !confirmedSourceAnchors.has(recipe.anchor))
  .map(recipe => ({ sourceIndex: recipe.sourceIndex, title: recipe.title, locator: recipe.locator }))

const report = {
  generatedAt: new Date().toISOString(),
  source: {
    path: epubPath,
    sizeBytes: epubBytes.length,
    sha256: crypto.createHash('sha256').update(epubBytes).digest('hex'),
    metadata,
    parsedRecipeEntries: sourceRecipes.length,
  },
  currentDataset: {
    path: 'src/data/chineseHealthyRecipes.ts',
    recipes: CHINESE_HEALTHY_RECIPES.length,
    introducedBy: gitIntroduction(),
  },
  summary: {
    sourceRecipeEntries: sourceRecipes.length,
    currentRecipes: CHINESE_HEALTHY_RECIPES.length,
    confirmedMappings: confirmedMappings.length,
    currentWithoutConfirmedSourceEntry: unmatchedCurrent.length,
    sourceEntriesAbsentFromCurrentMapping: unmatchedSource.length,
    confirmedCurrentCoveragePercent: Number((confirmedMappings.length / CHINESE_HEALTHY_RECIPES.length * 100).toFixed(1)),
    confirmedSourceCoveragePercent: Number((confirmedMappings.length / sourceRecipes.length * 100).toFixed(1)),
    currentClaimIsFullySupported: unmatchedCurrent.length === 0,
  },
  confirmedMappings,
  unmatchedCurrent,
  unmatchedSource,
  sourceIndex: sourceRecipes,
}

const reportDir = path.join(process.cwd(), 'reports', 'book-source-audit')
fs.mkdirSync(reportDir, { recursive: true })
fs.writeFileSync(path.join(reportDir, 'book-source-audit.json'), JSON.stringify(report, null, 2), 'utf8')

const confirmedRows = confirmedMappings.map(item =>
  `| \`${item.recipeId}\` | ${item.currentTitle} | ${item.sourceTitle} | \`${item.locator}\` | ${item.sourceStepCount} / ${item.currentActionCount} | ${item.sourceFactsMissingFromCurrent.length} | ${item.currentFactsAbsentFromSource.length} |`,
).join('\n')
const unmatchedRows = unmatchedCurrent.map(item => {
  const best = item.candidates[0]
  return `| \`${item.recipeId}\` | ${item.currentTitle} | ${best ? `${best.sourceTitle} (${best.score.toFixed(3)})` : '—'} |`
}).join('\n')

const markdown = `# 《${metadata.title}》原书与当前中餐数据库血缘审计

> 生成时间：${report.generatedAt}  
> 原书：\`${path.basename(epubPath)}\`，SHA-256 \`${report.source.sha256}\`  
> 本报告只建立来源证据与差异队列，不自动把相似菜名认定为同一配方，也不写入 Supabase。

## 结论

- EPUB 书目元数据：${metadata.author}，${metadata.publisher}，${metadata.publicationDate}，ASIN ${metadata.asin || '未提供'}。
- 原书正文解析到 **${sourceRecipes.length}** 个具备“材料 / 调料 / 做法”的明确食谱条目；当前中餐数据集为 **${CHINESE_HEALTHY_RECIPES.length}** 道。
- 目前仅有 **${confirmedMappings.length}/${CHINESE_HEALTHY_RECIPES.length}（${report.summary.confirmedCurrentCoveragePercent}%）** 可以确认到具体原书锚点。
- 仍有 **${unmatchedCurrent.length}** 道当前食谱没有确认的一对一原书条目；继续统一标注“来源于本书”缺少证据。
- 原书另有 **${unmatchedSource.length}** 个条目未进入已确认映射，说明当前“102 道”不是对原书食谱的完整抽取。
- Git 记录显示该 102 道数据在 ${report.currentDataset.introducedBy?.introducedAt || '未知时间'} 由单次提交 \`${report.currentDataset.introducedBy?.commit?.slice(0, 8) || 'unknown'}\` 整体加入；仓库中没有与该提交配套的 EPUB 解析器、逐项来源定位或抽取中间表。

这证明当前问题首先是**数据血缘和抽取完整性问题**。渲染器可以表达正确结构，但无法从压缩、遗漏或推断的食谱事实中恢复原书内容。

## 数字差异的判定口径

- “原书缺失于当前”：原文中出现的带单位数字没有出现在当前食谱文本中。
- “当前未见于原书”：当前食材、说明或工序中出现的带单位数字没有出现在对应原文中。
- 这两项是复核线索，并不直接等同于错误；单位换算、拆步和厨房实测都可能形成合理差异，但必须留下依据。

## 已确认的 52 个来源映射

| 当前 ID | 当前标题 | 原书标题 | EPUB 定位 | 原书步骤 / 当前动作 | 原书数字缺失 | 当前新增数字 |
| :--- | :--- | :--- | :--- | ---: | ---: | ---: |
${confirmedRows}

## 当前没有确认原书条目的 50 道

相似候选只用于人工检索，不代表来源关系；低分候选尤其不能自动采用。

| 当前 ID | 当前标题 | 最高相似候选（综合分） |
| :--- | :--- | :--- |
${unmatchedRows}

## 数据整改顺序

1. 先人工确认 50 道未映射记录的真实来源：能映射则补 EPUB locator，不能映射则移除本书来源声明并保持未核验/草稿状态。
2. 对 52 道已映射记录逐项比较材料、调料、数量、准备/烹调时间和做法；先忠实转录，再单独记录产品建模拆步。
3. 从原书未映射的 ${unmatchedSource.length} 道中确定产品真正要收录的范围，禁止为了凑“102 道”用推断菜谱补位。
4. 只有完成逐项核对并记录 reviewer、reviewedAt 和 locator 后，才能标记 source_verified。
5. 本地验收完成后再生成 Supabase dry-run；本审计不执行任何云端写入。

完整机器可读索引、原书文本字段、数字差异和相似候选见 \`reports/book-source-audit/book-source-audit.json\`。
`

fs.writeFileSync(path.join(reportDir, 'book-source-audit.md'), markdown, 'utf8')
console.log(`原书条目: ${sourceRecipes.length}`)
console.log(`当前中餐: ${CHINESE_HEALTHY_RECIPES.length}`)
console.log(`确认映射: ${confirmedMappings.length}`)
console.log(`当前未确认来源: ${unmatchedCurrent.length}`)
console.log(`原书未进入确认映射: ${unmatchedSource.length}`)
console.log(`报告: ${path.join(reportDir, 'book-source-audit.md')}`)
