import type { L, Lang } from './types';

export type Reach = { count: number; kind: 'downloads' | 'visits' };

/**
 * Public reach of titles Giovanni tested, rounded down. Shown on the site without the source;
 * the source and the raw figure are kept here so the numbers can be re-checked.
 * Checked on 2026-09-14.
 */
export const reach: Record<string, Reach> = {
  // Google Play, "5M+ downloads" (br.com.tapps.logicpic)
  'Logic Pic': { count: 5_000_000, kind: 'downloads' },
  // AppBrain, 1.6M+ downloads before the game left the stores
  'PSG Football Freestyle': { count: 1_600_000, kind: 'downloads' },
  // Roblox games API: 1,156,992 visits
  'Pro Kick Simulator': { count: 1_100_000, kind: 'visits' },
  // Roblox games API: 149,236 visits
  'CAIXA Universe': { count: 140_000, kind: 'visits' },
  // Roblox games API: 80,843 visits
  'Corrida do Galo': { count: 80_000, kind: 'visits' },
  // Google Play, "50K+ downloads" (com.hermitcrabstudio.f2p.rl)
  'Rumble Kong League': { count: 50_000, kind: 'downloads' },
  // Google Play, "50K+ downloads" (com.byaliens.spacebit.arcanemerge)
  'Arcane Merge – Fantasy Mix': { count: 50_000, kind: 'downloads' },
  // Roblox games API: 35,926 visits
  'Vasco Universe': { count: 35_000, kind: 'visits' },
  // Google Play, "10K+ downloads" (com.hermitcrabstudio.f2p.allstarsmerge)
  'All Stars Merge': { count: 10_000, kind: 'downloads' },
  // Google Play, "10K+ downloads" (mobile version)
  Tetragon: { count: 10_000, kind: 'downloads' },
};

export const reachKindLabel: Record<Reach['kind'], L> = {
  downloads: { en: 'downloads', pt: 'downloads' },
  visits: { en: 'visits', pt: 'visitas' },
};

/** "1.1M+" / "1,1 mi+", "140K+" / "140 mil+". */
export function compactCount(count: number, lang: Lang): string {
  const decimal = (n: number) => {
    const text = (Math.floor(n * 10) / 10).toFixed(1).replace(/\.0$/, '');
    return lang === 'pt' ? text.replace('.', ',') : text;
  };
  if (count >= 1_000_000) return lang === 'pt' ? `${decimal(count / 1_000_000)} mi+` : `${decimal(count / 1_000_000)}M+`;
  if (count >= 1_000) return lang === 'pt' ? `${Math.floor(count / 1_000)} mil+` : `${Math.floor(count / 1_000)}K+`;
  return `${count}+`;
}

export const formatReach = (r: Reach, lang: Lang) => `${compactCount(r.count, lang)} ${reachKindLabel[r.kind][lang]}`;

/** Sum of every figure above, rounded down to whole millions: "8M+". */
export const totalReach = Math.floor(Object.values(reach).reduce((sum, r) => sum + r.count, 0) / 1_000_000) * 1_000_000;
