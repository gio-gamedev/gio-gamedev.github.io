import { existsSync } from 'node:fs';

/** Local Chrome (or Edge) used for printing the resume and rendering the Open Graph image. */
export function findChrome() {
  const candidates = [
    process.env.CHROME_PATH,
    'C:/Program Files/Google/Chrome/Application/chrome.exe',
    'C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe',
    '/usr/bin/google-chrome',
    '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
  ];
  const chrome = candidates.find((candidate) => candidate && existsSync(candidate));
  if (!chrome) throw new Error('Chrome not found; set CHROME_PATH to its executable');
  return chrome;
}
