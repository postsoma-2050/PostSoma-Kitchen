import fs from 'node:fs'
import path from 'node:path'
import crypto from 'node:crypto'
import { spawnSync } from 'node:child_process'
import { CHINESE_HEALTHY_RECIPES } from '../src/data/chineseHealthyRecipes'
import { HOME_SWEET_HOME_RECIPES } from '../src/data/homeSweetHomeRecipes'
import { espressoBrowniesV3, hongShaoRouV3, caesarSaladV3 } from '../src/data/v3Examples'
import { normalizeRecipe } from '../src/services/recipeNormalizer'
import type { VisualRecipeV3 } from '../src/types/recipeV3'

type Confidence = 'high' | 'medium' | 'low'
type Provider = 'wikimedia' | 'openverse'

interface Candidate {
  provider: Provider
  id: string
  title: string
  creator: string
  license: string
  sourcePage: string
  imageUrl: string
  width: number
  height: number
  query: string
  score: number
  confidence: Confidence
  matchReason: string
}

interface PrototypeRecord {
  recipeId: string
  recipeTitle: string
  status: 'prototype'
  assetPath: string
  confidence: Confidence
  matchReason: string
  query: string
  provider: Provider | 'existing-url'
  candidateTitle: string
  creator: string
  license: string
  sourcePage: string
  originalUrl: string
  sourceWidth: number
  sourceHeight: number
  outputWidth: 1200
  outputHeight: 900
  sha256: string
  perceptualHash: string
  reviewFlags: string[]
}

interface FailureRecord {
  recipeId: string
  recipeTitle: string
  status: 'fallback'
  queries: string[]
  reason: string
}

interface PrototypeManifest {
  generatedAt: string
  mode: 'prototype'
  records: PrototypeRecord[]
  fallback: FailureRecord[]
}

const ROOT = process.cwd()
const OUTPUT_DIR = path.join(ROOT, 'public', 'recipe-covers', 'prototype')
const CACHE_DIR = path.join(ROOT, '.prototype-cover-cache')
const MANIFEST_PATH = path.join(ROOT, 'src', 'data', 'recipeCoverPrototypeManifest.json')
const REVIEW_JSON_PATH = path.join(ROOT, 'reports', 'recipe-cover-prototype-review.json')
const REVIEW_HTML_PATH = path.join(ROOT, 'reports', 'recipe-cover-prototype-review.html')
const ACTUAL = process.argv.includes('--actual')
const FORCE = process.argv.includes('--force')
const LIMIT_ARG = process.argv.find(arg => arg.startsWith('--limit='))
const LIMIT = LIMIT_ARG ? Math.max(1, Number(LIMIT_ARG.split('=')[1]) || 1) : Number.POSITIVE_INFINITY

const recipes = [
  ...CHINESE_HEALTHY_RECIPES,
  ...HOME_SWEET_HOME_RECIPES,
  espressoBrowniesV3,
  hongShaoRouV3,
  caesarSaladV3,
].map(normalizeRecipe)

const DESCRIPTORS = [
  '私房', '私家', '经典', '传统', '老北京', '东北', '京味', '粤式', '鲁味', '鲁菜名菜',
  '汉民风味', '家常', '主厨', '祖母秘制', '老式', '手工', '纯手工', '秘制', '特制',
  '少油', '减脂', '高纤维', '健康', '营养', '滋补', '清润', '润肺', '润喉', '补血',
  '平肝', '顺气', '瓜氨酸', '原味', '清爽开胃', '清爽', '浓香', '浓郁', '香浓',
  '甜美', '鲜', '新鲜', '金黄', '酥脆', '飘香', '奶白', '蒜香', '酱香', '酸辣',
  '冰镇', '冰糖', '蜂蜜', '桂花蜜汁', '去核', '双色', '四蔬聚会蘸汁',
]

const INGREDIENT_TERMS: Array<[string, string]> = [
  ['五花肉', 'pork belly'], ['猪排骨', 'pork ribs'], ['排骨', 'pork ribs'], ['猪肝', 'pork liver'],
  ['猪肉', 'pork'], ['里脊', 'pork'], ['鸡腿', 'chicken'], ['鸡胸', 'chicken'], ['土鸡', 'chicken'],
  ['鸡肉', 'chicken'], ['牛腩', 'beef brisket'], ['牛肉', 'beef'], ['羊肉', 'lamb'], ['白鳝', 'eel'],
  ['黑鱼', 'fish'], ['鲫鱼', 'fish soup'], ['海参', 'sea cucumber'], ['扇贝', 'scallops'], ['鲜虾', 'shrimp'],
  ['虾仁', 'shrimp'], ['鸡蛋', 'egg'], ['咸蛋黄', 'salted egg yolk'], ['豆腐干', 'tofu'], ['豆腐', 'tofu'],
  ['番茄', 'tomato'], ['西红柿', 'tomato'], ['紫茄', 'eggplant'], ['茄子', 'eggplant'],
  ['胡萝卜', 'carrot'], ['白萝卜', 'daikon'], ['萝卜', 'radish'], ['红薯', 'sweet potato'],
  ['土豆', 'potato'], ['山药', 'Chinese yam'], ['南瓜', 'pumpkin'], ['丝瓜', 'luffa'],
  ['西葫芦', 'zucchini'], ['黄瓜', 'cucumber'], ['苦瓜', 'bitter melon'], ['莴笋', 'celtuce'],
  ['芥蓝', 'Chinese broccoli'], ['西蓝花', 'broccoli'], ['菜花', 'cauliflower'], ['菠菜', 'spinach'],
  ['圆白菜', 'cabbage'], ['卷心菜', 'cabbage'], ['生菜', 'lettuce'], ['油菜', 'bok choy'],
  ['苋菜', 'amaranth greens'], ['芹菜', 'celery'], ['香菇', 'mushroom'], ['金针菇', 'enoki mushroom'],
  ['蘑菇', 'mushroom'], ['银耳', 'snow fungus'], ['百合', 'lily bulb'], ['雪梨', 'pear'],
  ['洋葱', 'onion'], ['蚕豆', 'fava beans'], ['板栗', 'chestnut'], ['芦荟', 'aloe vera'],
  ['仙人掌', 'cactus'], ['饼干', 'biscuits'], ['布朗尼', 'brownies'], ['蛋糕', 'cake'],
  ['米饭', 'rice'], ['面条', 'noodles'], ['包', 'steamed buns'],
]

const REJECT_WORDS = [
  'logo', 'menu', 'map', 'poster', 'package', 'packaging', 'advert', 'sign', 'book', 'cover',
  'illustration', 'drawing', 'diagram', 'icon', 'vector', 'museum', 'festival', 'competition',
  'restaurant exterior', 'storefront', 'people', 'person', 'portrait', 'selfie', 'plant', 'flowering',
  'farm', 'field', 'seed', 'raw meat', 'uncooked', 'pdf', 'djvu', 'cadal', 'manuscript', 'newspaper', 'catalog',
]

const FOOD_WORDS = [
  'food', 'dish', 'meal', 'dinner', 'lunch', 'cuisine', 'chicken', 'pork', 'beef', 'lamb', 'fish',
  'shrimp', 'scallop', 'egg', 'tofu', 'tomato', 'eggplant', 'potato', 'pumpkin', 'cucumber',
  'zucchini', 'mushroom', 'broccoli', 'cabbage', 'spinach', 'celery', 'onion', 'soup', 'stew',
  'salad', 'cake', 'brownie', 'biscuit', 'rice', 'noodle', 'dumpling', 'bean', 'vegetable', 'roll',
  '炒', '蒸', '炖', '汤', '菜', '肉', '鸡', '鱼', '虾', '蛋', '豆腐', '饭', '面', '糕', '饼',
]

const SUBJECT_WORDS = [
  'chicken', 'turkey', 'pork', 'beef', 'lamb', 'fish', 'eel', 'shrimp', 'scallop', 'oyster',
  'egg', 'tofu', 'tomato', 'eggplant', 'carrot', 'daikon', 'radish', 'potato', 'yam', 'pumpkin',
  'luffa', 'zucchini', 'cucumber', 'melon', 'celtuce', 'broccoli', 'cauliflower', 'spinach',
  'cabbage', 'lettuce', 'bok choy', 'celery', 'mushroom', 'enoki', 'pear', 'onion', 'beans',
  'chestnut', 'aloe', 'cactus', 'brownie', 'cake', 'biscuit', 'rice', 'noodle', 'dumpling',
]

const DISH_FORM_WORDS = [
  'dumpling', 'soup', 'stew', 'salad', 'cake', 'brownie', 'biscuit', 'cookie', 'roll', 'bun',
  'tart', 'sandwich', 'pizza', 'noodle', 'rice', 'drink', 'smoothie', 'casserole', 'lasagna',
]

const stripHtml = (value: unknown): string => String(value || '').replace(/<[^>]+>/g, ' ').replace(/&[^;]+;/g, ' ').replace(/\s+/g, ' ').trim()

function cleanTitle(title: string): string {
  return title.replace(/^[^\p{L}\p{N}]+/u, '').trim()
}

function simplifyTitle(title: string): string {
  let value = cleanTitle(title)
    .replace(/[（(][^）)]*[）)]/g, ' ')
    .replace(/(煲|盅|浓汤|清汤|甜羹|特饮干粉)$/g, '')

  for (const descriptor of DESCRIPTORS) value = value.replaceAll(descriptor, '')
  return value.replace(/\s+/g, ' ').trim()
}

function englishAlias(title: string): string {
  const parenthetical = title.match(/[（(]([^）)]*[A-Za-z][^）)]*)[）)]/)
  if (parenthetical) return parenthetical[1].replace(/[’]/g, "'").trim()
  const latin = cleanTitle(title).match(/^([A-Za-z][A-Za-z\s&'-]+)/)
  return latin?.[1]?.trim() || ''
}

function translateKeyIngredients(recipe: VisualRecipeV3): string[] {
  const source = recipe.ingredients
    .filter(item => ['main', 'produce', 'grain', 'dairy'].includes(item.category))
    .slice(0, 5)
    .map(item => item.name)
    .join(' ')
  const found: string[] = []
  for (const [cn, en] of INGREDIENT_TERMS) {
    if (source.includes(cn) && !found.includes(en)) found.push(en)
    if (found.length >= 2) break
  }
  return found
}

function methodWord(method?: string): string {
  switch (method) {
    case 'steam': return 'steamed'
    case 'stew': return 'stew'
    case 'bake': return 'baked'
    case 'serve': return 'salad'
    case 'sear': return 'stir fry'
    default: return 'stir fry'
  }
}

function buildQueries(recipe: VisualRecipeV3): string[] {
  const title = cleanTitle(recipe.title)
  const simplified = simplifyTitle(recipe.title)
  const english = englishAlias(recipe.title)
  const ingredients = translateKeyIngredients(recipe)
  const generic = `${recipe.cuisine === 'chinese' ? 'Chinese ' : ''}${methodWord(recipe.finalBlock?.method)} ${ingredients.join(' ')} dish`.replace(/\s+/g, ' ').trim()
  return [...new Set([title, simplified, english, generic].filter(query => query.length >= 3))]
}

function tokenize(value: string): string[] {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9\u3400-\u9fff]+/g, ' ')
    .split(/\s+/)
    .filter(token => token.length >= 2 && !['chinese', 'dish', 'food', 'style', 'with', 'and'].includes(token))
}

function candidateScore(candidateTitle: string, query: string, exactTitle: string): { score: number; confidence: Confidence; reason: string } {
  const title = candidateTitle.toLowerCase()
  if (REJECT_WORDS.some(word => title.includes(word))) return { score: -100, confidence: 'low', reason: 'rejected visual subject' }
  const foodSignal = FOOD_WORDS.some(word => title.includes(word))
  const queryTokens = tokenize(query)
  const overlap = queryTokens.filter(token => title.includes(token)).length
  const requiredSubjects = SUBJECT_WORDS.filter(word => query.toLowerCase().includes(word))
  const subjectOverlap = requiredSubjects.filter(word => title.includes(word)).length
  const conflictingForm = DISH_FORM_WORDS.find(word => title.includes(word) && !query.toLowerCase().includes(word))
  const simplifiedExact = simplifyTitle(exactTitle).toLowerCase().replace(/\s+/g, '')
  const normalizedCandidate = title.replace(/^file:/, '').replace(/\.[a-z0-9]+$/, '').replace(/\s+/g, '')

  if (simplifiedExact.length >= 3 && normalizedCandidate.includes(simplifiedExact)) {
    return { score: 100 + overlap * 8, confidence: 'high', reason: '候选标题与规范菜名直接匹配' }
  }
  if (requiredSubjects.length > 0 && subjectOverlap === 0 && /[A-Za-z]/.test(query)) {
    return { score: -60, confidence: 'low', reason: '候选未匹配检索画像中的主要食材' }
  }
  if (requiredSubjects.length >= 2 && subjectOverlap < requiredSubjects.length && /[A-Za-z]/.test(query)) {
    return { score: 42, confidence: 'low', reason: '候选缺少第二项决定性食材' }
  }
  if (conflictingForm && /[A-Za-z]/.test(query)) {
    return { score: -55, confidence: 'low', reason: `候选料理形态冲突：${conflictingForm}` }
  }
  if (overlap >= 2 && foodSignal) return { score: 74 + overlap * 6, confidence: 'medium', reason: '候选标题匹配多项菜名或食材关键词' }
  if (overlap >= 1 && foodSignal) return { score: 52 + overlap * 5, confidence: 'low', reason: '候选仅匹配主要食材或烹饪类型' }
  if (foodSignal && /[\u3400-\u9fff]/.test(query)) return { score: 44, confidence: 'low', reason: '中文检索返回相关料理图片，语义需复核' }
  return { score: -20, confidence: 'low', reason: '语义信号不足' }
}

async function fetchJson(url: string, attempts = 2): Promise<any> {
  let lastError: unknown
  for (let attempt = 1; attempt <= attempts; attempt++) {
    try {
      const response = await fetch(url, { headers: { 'User-Agent': 'PostSoma-Kitchen-Prototype/1.0' } })
      if (!response.ok) {
        if (response.status === 429) await new Promise(resolve => setTimeout(resolve, 1000 * attempt))
        throw new Error(`HTTP ${response.status}`)
      }
      return await response.json()
    } catch (error) {
      lastError = error
      await new Promise(resolve => setTimeout(resolve, 350 * attempt))
    }
  }
  throw lastError
}

async function searchWikimedia(query: string, recipeTitle: string): Promise<Candidate[]> {
  const params = new URLSearchParams({
    action: 'query', format: 'json', origin: '*', generator: 'search', gsrsearch: query,
    gsrnamespace: '6', gsrlimit: '12', prop: 'imageinfo',
    iiprop: 'url|mime|size|extmetadata', iiurlwidth: '1280',
  })
  const json = await fetchJson(`https://commons.wikimedia.org/w/api.php?${params}`)
  return Object.values(json.query?.pages || {}).flatMap((raw: any) => {
    const info = raw.imageinfo?.[0]
    const supportedMime = ['image/jpeg', 'image/png', 'image/webp'].includes(String(info?.mime || ''))
    if (!info || !supportedMime || !info.thumburl) return []
    if ((info.width || 0) < 640 || (info.height || 0) < 480) return []
    let ranked = candidateScore(raw.title || '', query, recipeTitle)
    const isSpecificChineseQuery = /[\u3400-\u9fff]{3,}/.test(query) && !/\b(Chinese|dish|food)\b/i.test(query)
    if (isSpecificChineseQuery && ranked.score < 68) {
      ranked = { score: 68, confidence: 'medium', reason: 'Wikimedia 精确中文检索返回的料理候选' }
    }
    if (ranked.score < 0) return []
    const meta = info.extmetadata || {}
    return [{
      provider: 'wikimedia' as const,
      id: String(raw.pageid),
      title: String(raw.title || '').replace(/^File:/, ''),
      creator: stripHtml(meta.Artist?.value || meta.Credit?.value),
      license: stripHtml(meta.LicenseShortName?.value || meta.UsageTerms?.value),
      sourcePage: info.descriptionurl || '', imageUrl: info.thumburl,
      width: Number(info.width || 0), height: Number(info.height || 0), query,
      ...ranked,
    }]
  })
}

async function searchOpenverse(query: string, recipeTitle: string): Promise<Candidate[]> {
  const url = new URL('https://api.openverse.org/v1/images/')
  url.searchParams.set('q', query)
  url.searchParams.set('page_size', '15')
  url.searchParams.set('license_type', 'commercial,modification')
  const json = await fetchJson(url.toString())
  return (json.results || []).flatMap((item: any) => {
    if (!item.thumbnail || (item.width || 0) < 640 || (item.height || 0) < 480) return []
    if (/restaurant|buffet|food court|menu/i.test(String(item.title || ''))) return []
    const ranked = candidateScore(item.title || '', query, recipeTitle)
    if (ranked.score < 35) return []
    return [{
      provider: 'openverse' as const,
      id: String(item.id), title: String(item.title || ''), creator: String(item.creator || ''),
      license: String(item.license || ''), sourcePage: String(item.foreign_landing_url || item.detail_url || ''),
      imageUrl: String(item.thumbnail), width: Number(item.width || 0), height: Number(item.height || 0),
      query, ...ranked,
    }]
  })
}

async function findCandidates(recipe: VisualRecipeV3, queries: string[]): Promise<Candidate[]> {
  const candidates: Candidate[] = []
  const primaryQuery = recipe.cuisine === 'chinese'
    ? simplifyTitle(recipe.title)
    : (englishAlias(recipe.title) || cleanTitle(recipe.title))
  const wikimediaQueries = [primaryQuery]
  for (const query of wikimediaQueries) {
    try {
      candidates.push(...await searchWikimedia(query, recipe.title))
    } catch (error) {
      console.warn(`  Wikimedia 检索失败: ${query} · ${error instanceof Error ? error.message : error}`)
    }
    await new Promise(resolve => setTimeout(resolve, 900))
    if (candidates.some(candidate => candidate.score >= 68)) break
  }

  if (!candidates.some(candidate => candidate.score >= 68)) {
    const fallbackQueries = queries.filter(query => /[A-Za-z]/.test(query)).slice(-1)
    for (const query of fallbackQueries) {
      try {
        candidates.push(...await searchOpenverse(query, recipe.title))
      } catch (error) {
        console.warn(`  Openverse 检索失败: ${query} · ${error instanceof Error ? error.message : error}`)
      }
      await new Promise(resolve => setTimeout(resolve, 500))
    }
  }

  const unique = new Map<string, Candidate>()
  for (const candidate of candidates.sort((a, b) => b.score - a.score)) {
    if (candidate.score >= 60 && !unique.has(candidate.imageUrl)) unique.set(candidate.imageUrl, candidate)
  }
  return [...unique.values()]
}

async function download(url: string, destination: string): Promise<void> {
  const response = await fetch(url, { headers: { 'User-Agent': 'PostSoma-Kitchen-Prototype/1.0' }, redirect: 'follow' })
  if (!response.ok) throw new Error(`图片下载 HTTP ${response.status}`)
  const contentType = response.headers.get('content-type') || ''
  if (!contentType.startsWith('image/')) throw new Error(`非图片响应 ${contentType}`)
  const bytes = Buffer.from(await response.arrayBuffer())
  if (bytes.length < 12_000) throw new Error('图片文件过小')
  fs.writeFileSync(destination, bytes)
}

function renderPrototype(input: string, output: string): void {
  const result = spawnSync('ffmpeg', [
    '-y', '-loglevel', 'error', '-i', input,
    '-vf', 'scale=1200:900:force_original_aspect_ratio=increase,crop=1200:900,eq=saturation=0.92:contrast=1.025:brightness=-0.005',
    '-frames:v', '1', '-q:v', '4', output,
  ], { encoding: 'utf8' })
  if (result.status !== 0) throw new Error(result.stderr || 'ffmpeg 处理失败')
}

function sha256(file: string): string {
  return crypto.createHash('sha256').update(fs.readFileSync(file)).digest('hex')
}

function averageHash(file: string): string {
  const result = spawnSync('ffmpeg', [
    '-loglevel', 'error', '-i', file, '-vf', 'scale=8:8,format=gray',
    '-frames:v', '1', '-f', 'rawvideo', 'pipe:1',
  ], { encoding: null, maxBuffer: 1024 * 1024 })
  if (result.status !== 0 || !result.stdout || result.stdout.length < 64) throw new Error('感知哈希生成失败')
  const pixels = [...result.stdout.subarray(0, 64)]
  const average = pixels.reduce((sum, value) => sum + value, 0) / pixels.length
  return pixels.map(value => value >= average ? '1' : '0').join('')
}

function hamming(left: string, right: string): number {
  let distance = 0
  for (let i = 0; i < Math.min(left.length, right.length); i++) if (left[i] !== right[i]) distance++
  return distance + Math.abs(left.length - right.length)
}

function reviewFlags(candidate: Candidate): string[] {
  const flags: string[] = []
  if (candidate.confidence === 'low') flags.push('LOW_SEMANTIC_CONFIDENCE')
  if (candidate.width / candidate.height < 0.9) flags.push('PORTRAIT_SOURCE_CROP')
  if (!candidate.creator) flags.push('MISSING_CREATOR_METADATA')
  if (!candidate.license) flags.push('MISSING_LICENSE_METADATA')
  if (/restaurant|buffet|cafe|starbucks/i.test(candidate.title)) flags.push('RESTAURANT_CONTEXT')
  return flags
}

function escapeHtml(value: unknown): string {
  return String(value ?? '').replace(/[&<>'"]/g, char => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', "'": '&#39;', '"': '&quot;' })[char] || char)
}

function writeReview(manifest: PrototypeManifest): void {
  const summary = {
    total: recipes.length,
    prototype: manifest.records.length,
    fallback: manifest.fallback.length,
    high: manifest.records.filter(record => record.confidence === 'high').length,
    medium: manifest.records.filter(record => record.confidence === 'medium').length,
    low: manifest.records.filter(record => record.confidence === 'low').length,
    wikimedia: manifest.records.filter(record => record.provider === 'wikimedia').length,
    openverse: manifest.records.filter(record => record.provider === 'openverse').length,
  }
  fs.mkdirSync(path.dirname(REVIEW_JSON_PATH), { recursive: true })
  fs.writeFileSync(REVIEW_JSON_PATH, JSON.stringify({ ...manifest, summary }, null, 2))

  const cards = manifest.records.map(record => `
    <article class="card ${record.confidence}">
      <img src="../public${escapeHtml(record.assetPath)}" alt="" loading="lazy">
      <div class="copy">
        <div class="meta"><b>${escapeHtml(record.confidence.toUpperCase())}</b> · ${escapeHtml(record.provider)}</div>
        <h2>${escapeHtml(record.recipeTitle)}</h2>
        <p>${escapeHtml(record.candidateTitle)}</p>
        <p class="small">${escapeHtml(record.matchReason)}</p>
        <a href="${escapeHtml(record.sourcePage)}">查看来源</a>
      </div>
    </article>`).join('')
  const fallback = manifest.fallback.map(item => `<li><b>${escapeHtml(item.recipeTitle)}</b> — ${escapeHtml(item.reason)}</li>`).join('')
  fs.writeFileSync(REVIEW_HTML_PATH, `<!doctype html><html lang="zh-CN"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width"><title>PostSoma prototype covers</title><style>
    :root{font-family:system-ui,sans-serif;color:#19231e;background:#f7f4ee}body{margin:0;padding:24px}header{max-width:1440px;margin:auto auto 24px}.summary{display:flex;gap:10px;flex-wrap:wrap}.summary span{border:1px solid #cbc7bd;background:#fffefa;border-radius:8px;padding:8px 12px}.grid{max-width:1440px;margin:auto;display:grid;grid-template-columns:repeat(auto-fill,minmax(260px,1fr));gap:18px}.card{overflow:hidden;border:1px solid #d9d5cc;background:#fffefa;border-radius:14px}.card.low{border-color:#b7791f}.card.medium{border-color:#6b8a76}.card img{width:100%;aspect-ratio:4/3;object-fit:cover;display:block}.copy{padding:14px}.meta,.small{font-size:12px;color:#687168}h1{font-family:Georgia,serif}h2{font-size:16px;margin:8px 0}p{font-size:13px;margin:6px 0;line-height:1.5}a{font-size:12px;color:#285840}.fallback{max-width:1440px;margin:36px auto;background:#fffefa;border:1px solid #d9d5cc;border-radius:14px;padding:20px}li{margin:8px 0;font-size:13px}
  </style></head><body><header><h1>PostSoma Kitchen · Prototype Covers</h1><div class="summary"><span>覆盖 ${summary.prototype}/${summary.total}</span><span>高 ${summary.high}</span><span>中 ${summary.medium}</span><span>低 ${summary.low}</span><span>Fallback ${summary.fallback}</span></div></header><main class="grid">${cards}</main><section class="fallback"><h2>继续使用 fallback</h2><ul>${fallback}</ul></section></body></html>`)
}

function persist(records: PrototypeRecord[], fallback: FailureRecord[]): void {
  const manifest: PrototypeManifest = { generatedAt: new Date().toISOString(), mode: 'prototype', records, fallback }
  fs.mkdirSync(path.dirname(MANIFEST_PATH), { recursive: true })
  fs.writeFileSync(MANIFEST_PATH, JSON.stringify(manifest, null, 2))
  writeReview(manifest)
}

async function main(): Promise<void> {
  if (!ACTUAL) {
    console.log(`Dry-run：检测到 ${recipes.length} 道食谱。使用 --actual 才会检索、下载并生成 prototype 资产。`)
    return
  }
  if (spawnSync('ffmpeg', ['-version'], { stdio: 'ignore' }).status !== 0) {
    throw new Error('未检测到 ffmpeg，无法生成统一 4:3 prototype 图片')
  }

  fs.mkdirSync(OUTPUT_DIR, { recursive: true })
  fs.mkdirSync(CACHE_DIR, { recursive: true })
  if (FORCE) {
    for (const name of fs.readdirSync(OUTPUT_DIR)) {
      if (name.endsWith('.jpg')) fs.unlinkSync(path.join(OUTPUT_DIR, name))
    }
  }
  const existingManifest: PrototypeManifest | null = fs.existsSync(MANIFEST_PATH)
    ? JSON.parse(fs.readFileSync(MANIFEST_PATH, 'utf8'))
    : null
  const records: PrototypeRecord[] = FORCE ? [] : [...(existingManifest?.records || [])]
  const fallback: FailureRecord[] = []
  const usedUrls = new Set(records.map(record => record.originalUrl))
  const usedHashes = records.map(record => ({ id: record.recipeId, hash: record.perceptualHash }))
  const alreadyCovered = new Set(records.map(record => record.recipeId))
  const targets = recipes.filter(recipe => !alreadyCovered.has(recipe.id)).slice(0, LIMIT)

  console.log(`Prototype cover pipeline · ${targets.length} targets · ${records.length} existing`)
  for (let index = 0; index < targets.length; index++) {
    const recipe = targets[index]
    const queries = buildQueries(recipe)
    console.log(`[${index + 1}/${targets.length}] ${recipe.id} · ${cleanTitle(recipe.title)}`)
    const candidates = await findCandidates(recipe, queries)
    let accepted: PrototypeRecord | null = null

    for (const candidate of candidates) {
      if (usedUrls.has(candidate.imageUrl)) continue
      const cachePath = path.join(CACHE_DIR, `${recipe.id}-${candidate.provider}-${candidate.id}.source`)
      const outputPath = path.join(OUTPUT_DIR, `${recipe.id}.jpg`)
      try {
        await download(candidate.imageUrl, cachePath)
        renderPrototype(cachePath, outputPath)
        const pHash = averageHash(outputPath)
        const nearDuplicate = usedHashes.find(item => hamming(item.hash, pHash) <= 4)
        if (nearDuplicate) {
          fs.unlinkSync(outputPath)
          console.log(`  跳过近似重复图（与 ${nearDuplicate.id} 相似）`)
          continue
        }
        accepted = {
          recipeId: recipe.id, recipeTitle: recipe.title, status: 'prototype',
          assetPath: `/recipe-covers/prototype/${recipe.id}.jpg`, confidence: candidate.confidence,
          matchReason: candidate.matchReason, query: candidate.query, provider: candidate.provider,
          candidateTitle: candidate.title, creator: candidate.creator, license: candidate.license,
          sourcePage: candidate.sourcePage, originalUrl: candidate.imageUrl,
          sourceWidth: candidate.width, sourceHeight: candidate.height,
          outputWidth: 1200, outputHeight: 900, sha256: sha256(outputPath), perceptualHash: pHash,
          reviewFlags: reviewFlags(candidate),
        }
        usedUrls.add(candidate.imageUrl)
        usedHashes.push({ id: recipe.id, hash: pHash })
        records.push(accepted)
        console.log(`  ✓ ${candidate.provider} · ${candidate.confidence} · ${candidate.title}`)
        break
      } catch (error) {
        console.log(`  候选处理失败: ${error instanceof Error ? error.message : error}`)
      } finally {
        if (fs.existsSync(cachePath)) fs.unlinkSync(cachePath)
      }
    }

    if (!accepted) {
      fallback.push({ recipeId: recipe.id, recipeTitle: recipe.title, status: 'fallback', queries, reason: candidates.length ? '候选重复、下载失败或无法处理' : '未找到具备基本语义信号的真实图片候选' })
      console.log('  — 保留统一 fallback')
    }
    persist(records, fallback)
    await new Promise(resolve => setTimeout(resolve, 120))
  }

  if (fs.existsSync(CACHE_DIR) && fs.readdirSync(CACHE_DIR).length === 0) fs.rmdirSync(CACHE_DIR)
  persist(records, fallback)
  console.log(`完成：prototype ${records.length} · fallback ${fallback.length}`)
  console.log(`审核页：${REVIEW_HTML_PATH}`)
}

main().catch(error => {
  console.error(error)
  process.exitCode = 1
})
