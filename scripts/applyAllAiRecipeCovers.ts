import fs from 'fs';
import path from 'path';

const root = process.cwd();
const recipes = JSON.parse(fs.readFileSync('scratch/recipe_summary.json', 'utf-8'));

console.log(`Starting to inject coverImageUrl (.webp) for all ${recipes.length} recipes...`);

// 1. Process Chinese Batches (cn-01 ~ cn-151)
const chineseDir = path.join(root, 'src', 'data', 'recipes', 'chinese');
const batchFiles = fs.readdirSync(chineseDir).filter(f => f.startsWith('batch') && f.endsWith('.ts'));

let chineseCount = 0;
for (const file of batchFiles) {
  const filePath = path.join(chineseDir, file);
  let content = fs.readFileSync(filePath, 'utf8');
  let fileModified = false;

  for (const r of recipes) {
    if (!r.id.startsWith('cn-')) continue;
    const id = r.id;
    const targetCover = `/recipe-covers/${id}.webp`;

    // Regex to match the id block
    const idRegex = new RegExp(`("id":\\s*"${id}",[\\s\\S]*?"title":\\s*"[^"]+",)(\\s*\\n\\s*"coverImageUrl":\\s*"[^"]+",)?`);
    if (idRegex.test(content)) {
      content = content.replace(idRegex, (_match, prefix) => {
        return `${prefix}\n    "coverImageUrl": "${targetCover}",`;
      });
      fileModified = true;
      chineseCount++;
    }
  }

  if (fileModified) {
    fs.writeFileSync(filePath, content, 'utf8');
    console.log(`✓ [${file}] Updated recipes with AI covers.`);
  }
}
console.log(`Total Chinese recipes updated: ${chineseCount}`);

// 2. Process homeSweetHomeRecipes.ts (hsh-01 ~ hsh-16)
const hshPath = path.join(root, 'src', 'data', 'homeSweetHomeRecipes.ts');
let hshContent = fs.readFileSync(hshPath, 'utf8');
let hshCount = 0;
for (const r of recipes) {
  if (!r.id.startsWith('hsh-')) continue;
  const id = r.id;
  const targetCover = `/recipe-covers/${id}.webp`;
  const pattern = new RegExp(`(id:\\s*'${id}',[\\s\\S]*?title:\\s*'[^']+',)(\\s*\\n\\s*coverImageUrl:\\s*'[^']+',)?`);
  if (pattern.test(hshContent)) {
    hshContent = hshContent.replace(pattern, (_match, prefix) => {
      return `${prefix}\n    coverImageUrl: '${targetCover}',`;
    });
    hshCount++;
  }
}
fs.writeFileSync(hshPath, hshContent, 'utf8');
console.log(`✓ [homeSweetHomeRecipes.ts] Updated ${hshCount} recipes with AI covers.`);

// 3. Process v3Examples.ts (v3-01 ~ v3-03)
const v3Path = path.join(root, 'src', 'data', 'v3Examples.ts');
let v3Content = fs.readFileSync(v3Path, 'utf8');
let v3Count = 0;
for (const r of recipes) {
  if (!r.id.startsWith('v3-')) continue;
  const id = r.id;
  const targetCover = `/recipe-covers/${id}.webp`;
  const pattern = new RegExp(`(id:\\s*'${id}',[\\s\\S]*?title:\\s*'[^']+',)(\\s*\\n\\s*coverImageUrl:\\s*'[^']+',)?`);
  if (pattern.test(v3Content)) {
    v3Content = v3Content.replace(pattern, (_match, prefix) => {
      return `${prefix}\n    coverImageUrl: '${targetCover}',`;
    });
    v3Count++;
  }
}
fs.writeFileSync(v3Path, v3Content, 'utf8');
console.log(`✓ [v3Examples.ts] Updated ${v3Count} recipes with AI covers.`);

console.log(`\n🎉 All ${chineseCount + hshCount + v3Count} recipes successfully bound to official AI .webp covers!`);
