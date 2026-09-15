import fs from 'fs'
import path from 'path'
import { caseARaw } from './inspect_case_a_layout'
import { normalizeRecipe } from '../src/services/recipeNormalizer'
import { CHINESE_HEALTHY_RECIPES } from '../src/data/chineseHealthyRecipes'
import { generatePageSvgString, generateContinuousTableSvgString } from '../src/utils/exportFlowCard'

const ARTIFACT_DIR = '/Users/grangerfdad/.gemini/antigravity-ide/brain/b3d8bae8-a245-4642-ad40-da66b219ac68'

// 1. Export Case A (Remote 2-step snapshot)
const caseANorm = normalizeRecipe(caseARaw)
const svgCaseA = generatePageSvgString(caseANorm, 0, 1, undefined, 'full', 'flow')
fs.writeFileSync(path.join(ARTIFACT_DIR, 'export_case_a_cn59.svg'), svgCaseA.svgString, 'utf8')
fs.writeFileSync(path.join(process.cwd(), 'scratch', 'export_case_a_cn59.svg'), svgCaseA.svgString, 'utf8')
console.log('✅ Exported Case A SVG:', path.join(ARTIFACT_DIR, 'export_case_a_cn59.svg'))

// 2. Export Case B Flow (Local 4-step)
const cn59Local = CHINESE_HEALTHY_RECIPES.find(r => r.id === 'cn-59-qincai-niurou')!
const svgCaseBFlow = generatePageSvgString(cn59Local, 0, 1, undefined, 'full', 'flow')
fs.writeFileSync(path.join(ARTIFACT_DIR, 'export_case_b_cn59_flow.svg'), svgCaseBFlow.svgString, 'utf8')
fs.writeFileSync(path.join(process.cwd(), 'scratch', 'export_case_b_cn59_flow.svg'), svgCaseBFlow.svgString, 'utf8')
console.log('✅ Exported Case B Flow SVG:', path.join(ARTIFACT_DIR, 'export_case_b_cn59_flow.svg'))

// 3. Export Case B Table (Local 4-step)
const svgCaseBTable = generateContinuousTableSvgString(cn59Local)
fs.writeFileSync(path.join(ARTIFACT_DIR, 'export_case_b_cn59_table.svg'), svgCaseBTable.svgString, 'utf8')
fs.writeFileSync(path.join(process.cwd(), 'scratch', 'export_case_b_cn59_table.svg'), svgCaseBTable.svgString, 'utf8')
console.log('✅ Exported Case B Table SVG:', path.join(ARTIFACT_DIR, 'export_case_b_cn59_table.svg'))
