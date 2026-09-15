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

/** "2019-02-22" → "Feb 22, 2019" / "22/02/2019". */
export function fullDate(iso: string, lang: Lang): string {
  const [year, month, day] = iso.split('-');
  if (lang === 'pt') return `${day}/${month}/${year}`;
  return `${months.en[Number(month) - 1]} ${Number(day)}, ${year}`;
}
