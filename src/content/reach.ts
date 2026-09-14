import type { L, Lang } from './types';

export type ReachKind = 'downloads' | 'visits' | 'players' | 'minutes' | 'peak' | 'rating';
export type Reach = { count: number; kind: ReachKind };

/**
 * Public reach of titles Giovanni tested, rounded down, at most two figures per title. Shown on the
 * site without the source; the sources and raw figures stay here so the numbers can be re-checked.
 * Checked on 2026-09-14.
 * - Stores: Google Play download buckets; AppBrain for PSG (before the game left the stores).
 * - Roblox: games API visit counts.
 * - Fortnite: minutes played and all-time peak from fortnite.gg; unique players from the public
 *   portfolio of Gabriel Budzinski, game designer on the same projects.
 * - Ports (Gameloft, Lume Pad) show no figures: public counts belong to the original versions.
 */
export const reach: Record<string, Reach[]> = {
  // Google Play, "5M+ downloads" (br.com.tapps.logicpic)
  'Logic Pic': [{ count: 5_000_000, kind: 'downloads' }],
  // AppBrain, 1.6M+ downloads before the game left the stores
  'PSG Football Freestyle': [{ count: 1_600_000, kind: 'downloads' }],
  // Roblox games API: 1,156,992 visits
  'Pro Kick Simulator': [{ count: 1_100_000, kind: 'visits' }],
  // Roblox games API: 149,236 visits
  'CAIXA Universe': [{ count: 140_000, kind: 'visits' }],
  // Roblox games API: 80,845 visits
  'Corrida do Galo': [{ count: 80_000, kind: 'visits' }],
  // Google Play, "50K+ downloads" (com.hermitcrabstudio.f2p.rl)
  'Rumble Kong League': [{ count: 50_000, kind: 'downloads' }],
  // Google Play, "50K+ downloads" (com.byaliens.spacebit.arcanemerge)
  'Arcane Merge – Fantasy Mix': [{ count: 50_000, kind: 'downloads' }],
  // Roblox games API: 35,928 visits
  'Vasco Universe': [{ count: 35_000, kind: 'visits' }],
  // Google Play, "10K+ downloads" (com.hermitcrabstudio.f2p.allstarsmerge)
  'All Stars Merge': [{ count: 10_000, kind: 'downloads' }],

  // Fortnite. 5473-4322-7315: 2M+ unique players (Gabriel), 40.4M minutes
  'Tuning Cars Tycoon': [
    { count: 2_000_000, kind: 'players' },
    { count: 40_000_000, kind: 'minutes' },
  ],
  // 8773-9657-5309: 110.7M minutes, all-time peak 18,990
  'Football Tycoon (Soccer Tycoon)': [
    { count: 110_000_000, kind: 'minutes' },
    { count: 18_000, kind: 'peak' },
  ],
  // 8861-6784-3687: 800K+ unique players (Gabriel), 36.7M minutes
  'World Soccer Tycoon': [
    { count: 800_000, kind: 'players' },
    { count: 36_000_000, kind: 'minutes' },
  ],
  // 3286-6093-6738: 800K+ unique players (Gabriel), 20.9M minutes
  'Surf Tycoon': [
    { count: 800_000, kind: 'players' },
    { count: 20_000_000, kind: 'minutes' },
  ],
  // 0543-1357-2916: 24.7M minutes
  'Skate Tycoon': [{ count: 24_000_000, kind: 'minutes' }],
  // 0752-0223-8137: 18.1M minutes
  'Baseball Tycoon': [{ count: 18_000_000, kind: 'minutes' }],
  // 1701-7859-9582: 16.2M minutes
  'Soccer Team Tycoon': [{ count: 16_000_000, kind: 'minutes' }],
  // 6081-4755-9263: 8M minutes
  'Football Tycoon 2': [{ count: 8_000_000, kind: 'minutes' }],
  // 3737-8784-3421: 2.6M minutes
  'American Football Tycoon': [{ count: 2_000_000, kind: 'minutes' }],

  // The Sandbox: 4.8/5 player rating (Gabriel's portfolio)
  'Stonebridge — Dungeon Siege': [{ count: 4.8, kind: 'rating' }],
};

/** Minutes played on every Fortnite island in the project list (fortnite.gg, 2026-09-14). */
const fortniteIslandMinutes = [
  110.7e6, 40.4e6, 36.7e6, 24.7e6, 20.9e6, 18.1e6, 16.2e6, 8e6, 2.6e6, 954.8e3, 926.7e3, 300.9e3, 252.8e3,
  200.1e3, 118.2e3, 115.6e3, 111.8e3, 26.4e3, 2.1e3,
];

/** Every Fortnite minute above, rounded down to tens of millions: "280M+". */
export const fortniteMinutes =
  Math.floor(fortniteIslandMinutes.reduce((sum, minutes) => sum + minutes, 0) / 10_000_000) * 10_000_000;

export const reachKindLabel: Record<ReachKind, L> = {
  downloads: { en: 'downloads', pt: 'downloads' },
  visits: { en: 'visits', pt: 'visitas' },
  players: { en: 'players', pt: 'jogadores' },
  minutes: { en: 'minutes played', pt: 'minutos jogados' },
  peak: { en: 'peak concurrent players', pt: 'jogadores simultâneos (pico)' },
  rating: { en: 'player rating', pt: 'nota dos jogadores' },
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

/** The figure alone: "1.1M+", "4.8/5". */
export function reachValue(r: Reach, lang: Lang): string {
  if (r.kind === 'rating') return `${lang === 'pt' ? String(r.count).replace('.', ',') : r.count}/5`;
  return compactCount(r.count, lang);
}

export const formatReach = (r: Reach, lang: Lang) => `${reachValue(r, lang)} ${reachKindLabel[r.kind][lang]}`;

export const formatReachList = (list: Reach[] | undefined, lang: Lang) =>
  (list ?? []).map((r) => formatReach(r, lang)).join(' · ');

const audience: ReachKind[] = ['downloads', 'visits', 'players'];

/** Players, downloads and visits across every title above (not minutes, peaks or ratings), rounded down to millions: "11M+". */
export const totalReach =
  Math.floor(
    Object.values(reach)
      .flat()
      .filter((r) => audience.includes(r.kind))
      .reduce((sum, r) => sum + r.count, 0) / 1_000_000,
  ) * 1_000_000;
