const { chromium } = require('playwright-chromium');
const path = require('path');
const fs = require('fs');

const OUT_DIR = path.join(__dirname, '..', 'public', 'media', 'placeholders', 'offers');
const PREVIEW_DIR = path.join(__dirname, '..', '.preview-out');

const CATEGORY_LIST = [
  'bike-wash', 'car-wash', 'hotel', 'spa', 'salon', 'home-tuition', 'restaurant', 'gym',
  'clinic', 'retail', 'service', 'food', 'shop', 'beauty', 'health', 'fitness', 'learn',
  'auto', 'space', 'travel', 'event', 'biz', 'other'
];

(async () => {
  fs.mkdirSync(PREVIEW_DIR, { recursive: true });
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 1600, height: 2200 } });

  const cards = CATEGORY_LIST.map((c, i) => {
    let svg = fs.readFileSync(path.join(OUT_DIR, `${c}.svg`), 'utf-8');
    // namespace every id so multiple inline SVGs in one HTML doc don't collide
    svg = svg.replace(/id="([^"]+)"/g, `id="$1-${i}"`).replace(/url\(#([^)]+)\)/g, `url(#$1-${i})`);
    // force scale-to-fit instead of native 800x500 (which would get clipped by the narrow grid cell)
    svg = svg.replace('<svg xmlns', '<svg style="display:block;width:100%;height:100%" xmlns');
    return `<figure style="margin:0;background:#111;border-radius:8px;overflow:hidden">
      <div style="width:100%;aspect-ratio:8/5">${svg}</div>
      <figcaption style="color:#fff;font:14px sans-serif;padding:6px 10px;background:#000">${c}</figcaption>
    </figure>`;
  }).join('\n');

  const html = `<html><body style="margin:0;background:#222;padding:16px">
    <div style="display:grid;grid-template-columns:repeat(4,1fr);gap:12px">${cards}</div>
  </body></html>`;

  await page.setContent(html);
  await page.waitForTimeout(200);
  const height = await page.evaluate(() => document.body.scrollHeight);
  await page.setViewportSize({ width: 1600, height });
  await page.screenshot({ path: path.join(PREVIEW_DIR, 'montage.png'), fullPage: true });
  console.log('rendered montage.png');

  await browser.close();
})();
