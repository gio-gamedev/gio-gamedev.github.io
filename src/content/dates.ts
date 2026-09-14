import type { L, Lang } from './types';

const months: L<string[]> = {
  en: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
  pt: ['jan', 'fev', 'mar', 'abr', 'mai', 'jun', 'jul', 'ago', 'set', 'out', 'nov', 'dez'],
};

export const present: L = { en: 'Present', pt: 'atual' };

/** "2022-11" → "Nov 2022" / "nov 2022". Dates are stored as ISO months so they stay machine-readable. */
export function monthYear(iso: string, lang: Lang): string {
  const [year, month] = iso.split('-').map(Number);
  return `${months[lang][month - 1]} ${year}`;
}
