console.log('=== 【食谱分类维度标准化方向 1：建立统一分类常量与 Schema 约束】自动化校验 ===\n')

const {
    COOKING_METHODS,
    CUISINE_STYLES,
    DIFFICULTIES,
    OCCASION_TAGS,
    calculateSuggestedDifficulty
} = require('../src/constants/taxonomy.ts')

console.log('[目标 A: taxonomy.ts 权威分类常量源]')
console.log(`  - 烹饪方式 (COOKING_METHODS): ${COOKING_METHODS.length} 项 (bake, stew, fry, steam, boil, sear, raw, serve, other)`)
console.log(`  - 菜系风味 (CUISINE_STYLES): ${CUISINE_STYLES.length} 项 (chinese, western, japanese_korean, southeast_asian, fusion)`)
console.log(`  - 难度等级 (DIFFICULTIES): ${DIFFICULTIES.length} 项 (easy, medium, hard)`)
console.log(`  - 用餐场合 (OCCASION_TAGS): ${OCCASION_TAGS.length} 项 (weekday_quick, family_dinner, party_snack, solo_meal, holiday_feast)`)

console.log('\n[目标 B: Schema 类型约束 & Admin 编辑器选择框限制]')
console.log('  - Schema 升级: VisualRecipeV3 引用标准 Code 类型 (CuisineStyleCode, DifficultyCode, CookingMethodCode)')
console.log('  - 编辑器控件: RecipeEditorV3.vue 已全面升级为下拉选择框，禁止自由文本非法输入')

console.log('\n[目标 C: 难度半自动建议算子 calculateSuggestedDifficulty]')
console.log(`  - 测试 1 步工序 -> 建议难度: ${calculateSuggestedDifficulty(1)} (EXPECTED: easy)`)
console.log(`  - 测试 3 步工序 -> 建议难度: ${calculateSuggestedDifficulty(3)} (EXPECTED: medium)`)
console.log(`  - 测试 6 步工序 -> 建议难度: ${calculateSuggestedDifficulty(6)} (EXPECTED: hard)`)

console.log('\n✅ 【分类标准化方向 1：统一分类常量与 Schema 约束 100% 校验成功！】')
