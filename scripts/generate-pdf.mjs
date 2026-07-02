import puppeteer from 'puppeteer';
import { fileURLToPath } from 'url';
import path from 'path';
import fs from 'fs';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, '..');
const htmlPath = path.join(root, 'index.html');
const docsDir = path.join(root, 'docs');
const pdfPath = path.join(docsDir, 'commercial-proposal.pdf');

fs.mkdirSync(docsDir, { recursive: true });

const browser = await puppeteer.launch({
  headless: true,
  args: ['--no-sandbox', '--disable-setuid-sandbox'],
});
const page = await browser.newPage();

await page.goto(`file://${htmlPath}`, { waitUntil: 'networkidle0' });

await page.pdf({
  path: pdfPath,
  format: 'A4',
  printBackground: true,
  margin: { top: '20mm', right: '15mm', bottom: '20mm', left: '15mm' },
});

await browser.close();
console.log(`PDF saved to ${pdfPath}`);
