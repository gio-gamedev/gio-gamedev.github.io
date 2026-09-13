const buildDate = new Date(__BUILD_DATE__);

/** Whole years from a start month (YYYY-MM) until the build date. */
function yearsSince(start: string): number {
  const [year, month] = start.split('-').map(Number);
  const months = (buildDate.getUTCFullYear() - year) * 12 + (buildDate.getUTCMonth() + 1 - month);
  return Math.floor(months / 12);
}

/** First Game QA role: Space Bit Games, Sep 2022. */
export const qaYears = yearsSince('2022-09');

/** Technology roles before QA add about three years (7 in total as of 2026, per the Notion portfolio). */
export const techYears = qaYears + 3;

export const buildYear = buildDate.getUTCFullYear();
