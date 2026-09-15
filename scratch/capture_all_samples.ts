// @ts-ignore
import puppeteer from 'puppeteer';
import path from 'path';

const CHROME_PATH = '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';
const ARTIFACT_DIR = '/Users/grangerfdad/.gemini/antigravity-ide/brain/b3d8bae8-a245-4642-ad40-da66b219ac68';

const targets = [
  { id: 'cn-59-qincai-niurou', name: 'cn59', modes: ['flow', 'table'] },
  { id: 'cn-12-xihongshi-jidan', name: 'cn12', modes: ['flow', 'table'] },
  { id: 'cn-24-jianzhi-fanqie-doufugeng', name: 'cn24', modes: ['flow', 'table'] },
  { id: 'cn-14-zhurou-dun-fentiao', name: 'cn14', modes: ['flow', 'table'] },
  { id: 'cn-01-yuxiang-rousi', name: 'cn01', modes: ['flow'] },
  { id: 'v3-espresso-brownies', name: 'brownies', modes: ['flow', 'table'] },
];

async function capture() {
  const browser = await puppeteer.launch({
    executablePath: CHROME_PATH,
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  for (const target of targets) {
    for (const mode of target.modes) {
      // Desktop
      const pageDesktop = await browser.newPage();
      await pageDesktop.setViewport({ width: 1440, height: 1800, deviceScaleFactor: 2 });
      const urlDesktop = `http://localhost:5173/recipe/${target.id}?source=local&layoutMode=${mode}`;
      console.log(`Navigating desktop: ${urlDesktop}`);
      await pageDesktop.goto(urlDesktop, { waitUntil: 'networkidle0' });
      await new Promise(r => setTimeout(r, 600));
      const desktopFile = path.join(ARTIFACT_DIR, `${target.name}_${mode}_desktop.png`);
      await pageDesktop.screenshot({ path: desktopFile, fullPage: false });
      console.log(`Saved: ${desktopFile}`);
      await pageDesktop.close();

      // Mobile (only for key recipes)
      if (mode === 'flow' || target.name === 'cn59' || target.name === 'cn12') {
        const pageMobile = await browser.newPage();
        await pageMobile.setViewport({ width: 390, height: 1200, deviceScaleFactor: 2 });
        const urlMobile = `http://localhost:5173/recipe/${target.id}?source=local&layoutMode=${mode}`;
        await pageMobile.goto(urlMobile, { waitUntil: 'networkidle0' });
        await new Promise(r => setTimeout(r, 600));
        const mobileFile = path.join(ARTIFACT_DIR, `${target.name}_${mode}_mobile.png`);
        await pageMobile.screenshot({ path: mobileFile, fullPage: false });
        console.log(`Saved: ${mobileFile}`);
        await pageMobile.close();
      }
    }
  }

  await browser.close();
  console.log('All screenshots captured successfully!');
}

capture().catch(err => {
  console.error('Capture failed:', err);
  process.exit(1);
});
