const buildDate = new Date(__BUILD_DATE__);

/** Whole years from a start month (YYYY-MM) until the build date. */
function yearsSince(start: string): number {
  const [year, month] = start.split('-').map(Number);
  const months = (buildDate.getUTCFullYear() - year) * 12 + (buildDate.getUTCMonth() + 1 - month);
  return Math.floor(months / 12);
}

/** First Game QA role: Space Bit Games, Sep 2022. */
export const qaYears = yearsSince('2022-09');

/**
 * Technology roles before QA add about three years (7 in total as of 2026). The figure came from the
 * old Notion portfolio, retired on 18/09/2026; it is no longer checkable there, so treat this line
 * as the record of it.
 */
export const techYears = qaYears + 3;

export const buildYear = buildDate.getUTCFullYear();

const numberWords = {
  en: ['zero', 'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine', 'ten'],
  pt: ['zero', 'um', 'dois', 'três', 'quatro', 'cinco', 'seis', 'sete', 'oito', 'nove', 'dez'],
};

/** "four" / "quatro" for small numbers in running text; digits above ten. */
export const numberWord = (n: number, lang: 'en' | 'pt') => numberWords[lang][n] ?? String(n);
