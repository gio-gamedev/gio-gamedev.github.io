import type { L } from './types';

/** Expanded on hover (<abbr title>) and for screening tools that don't know industry shorthand. */
export const abbreviations: Record<string, L> = {
  FTUE: { en: 'First-time user experience', pt: 'Experiência de primeiro uso' },
  UEFN: { en: 'Unreal Editor for Fortnite', pt: 'Unreal Editor for Fortnite' },
  CLT: { en: 'Brazilian formal employment', pt: 'Emprego formal (Consolidação das Leis do Trabalho)' },
  PJ: { en: 'Brazilian contractor company (B2B)', pt: 'Pessoa jurídica (contrato B2B)' },
};
