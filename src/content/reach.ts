import { monthYear } from './dates';
import type { L, Lang } from './types';

export type ReachKind = 'downloads' | 'visits' | 'players' | 'minutes' | 'peak' | 'rating';
export type ReachSource = 'play' | 'appbrain' | 'roblox' | 'fortnitegg' | 'designer';
export type Reach = { count: number; kind: ReachKind; source: ReachSource };

/** Month every figure below was last checked (2026-09-14). */
export const REACH_CHECKED = '2026-09';

/**
 * Public reach of titles Giovanni tested, rounded down, at most two figures per title. Each figure
 * is shown on its own project with its source and the month it was checked. These are product
 * numbers for the whole team's work, so they are never summed across titles or units.
 * - Stores: Google Play download buckets; AppBrain for PSG (before the game left the stores).
 * - Roblox: games API visit counts.
 * - Fortnite: minutes played and all-time peak from fortnite.gg; unique players from the public
 *   portfolio of Gabriel Budzinski, game designer on the same projects.
 * - Ports (Gameloft, Lume Pad) show no figures: public counts belong to the original versions.
 */
export const reach: Record<string, Reach[]> = {
  // Google Play, "5M+ downloads" (br.com.tapps.logicpic)
  'Logic Pic': [{ count: 5_000_000, kind: 'downloads', source: 'play' }],
  // AppBrain, 1.6M+ downloads before the game left the stores
  'PSG Football Freestyle': [{ count: 1_600_000, kind: 'downloads', source: 'appbrain' }],
  // Roblox games API: 1,156,992 visits
  'Pro Kick Simulator': [{ count: 1_100_000, kind: 'visits', source: 'roblox' }],
  // Roblox games API: 149,236 visits
  'CAIXA Universe': [{ count: 140_000, kind: 'visits', source: 'roblox' }],
  // Roblox games API: 80,845 visits
  'Corrida do Galo': [{ count: 80_000, kind: 'visits', source: 'roblox' }],
  // Google Play, "50K+ downloads" (com.hermitcrabstudio.f2p.rl)
  'Rumble Kong League': [{ count: 50_000, kind: 'downloads', source: 'play' }],
  // Google Play, "50K+ downloads" (com.byaliens.spacebit.arcanemerge)
  'Arcane Merge – Fantasy Mix': [{ count: 50_000, kind: 'downloads', source: 'play' }],
  // Roblox games API: 35,928 visits
  'Vasco Universe': [{ count: 35_000, kind: 'visits', source: 'roblox' }],
  // Google Play, "10K+ downloads" (com.hermitcrabstudio.f2p.allstarsmerge)
  'All Stars Merge': [{ count: 10_000, kind: 'downloads', source: 'play' }],

  // Fortnite. 5473-4322-7315: 2M+ unique players (Gabriel), 40.4M minutes
  'Tuning Cars Tycoon': [
    { count: 2_000_000, kind: 'players', source: 'designer' },
    { count: 40_000_000, kind: 'minutes', source: 'fortnitegg' },
  ],
  // 8773-9657-5309: 110.7M minutes, all-time peak 18,990
  'Football Tycoon (Soccer Tycoon)': [
    { count: 110_000_000, kind: 'minutes', source: 'fortnitegg' },
    { count: 18_000, kind: 'peak', source: 'fortnitegg' },
  ],
  // 8861-6784-3687: 800K+ unique players (Gabriel), 36.7M minutes
  'World Soccer Tycoon': [
    { count: 800_000, kind: 'players', source: 'designer' },
    { count: 36_000_000, kind: 'minutes', source: 'fortnitegg' },
  ],
  // 3286-6093-6738: 800K+ unique players (Gabriel), 20.9M minutes
  'Surf Tycoon': [
    { count: 800_000, kind: 'players', source: 'designer' },
    { count: 20_000_000, kind: 'minutes', source: 'fortnitegg' },
  ],
  // 0543-1357-2916: 24.7M minutes
  'Skate Tycoon': [{ count: 24_000_000, kind: 'minutes', source: 'fortnitegg' }],
  // 0752-0223-8137: 18.1M minutes
  'Baseball Tycoon': [{ count: 18_000_000, kind: 'minutes', source: 'fortnitegg' }],
  // 1701-7859-9582: 16.2M minutes
  'Soccer Team Tycoon': [{ count: 16_000_000, kind: 'minutes', source: 'fortnitegg' }],
  // 6081-4755-9263: 8M minutes
  'Football Tycoon 2': [{ count: 8_000_000, kind: 'minutes', source: 'fortnitegg' }],
  // 3737-8784-3421: 2.6M minutes
  'American Football Tycoon': [{ count: 2_000_000, kind: 'minutes', source: 'fortnitegg' }],

  // The Sandbox: 4.8/5 player rating (Gabriel's portfolio)
  'Stonebridge — Dungeon Siege': [{ count: 4.8, kind: 'rating', source: 'designer' }],
};

export const reachKindLabel: Record<ReachKind, L> = {
  downloads: { en: 'downloads', pt: 'downloads' },
  visits: { en: 'visits', pt: 'visitas' },
  players: { en: 'players', pt: 'jogadores' },
  minutes: { en: 'minutes played', pt: 'minutos jogados' },
  peak: { en: 'peak concurrent players', pt: 'jogadores simultâneos (pico)' },
  rating: { en: 'player rating', pt: 'nota dos jogadores' },
};

export const reachSourceLabel: Record<ReachSource, L> = {
  play: { en: 'Google Play', pt: 'Google Play' },
  appbrain: { en: 'AppBrain', pt: 'AppBrain' },
  roblox: { en: 'Roblox', pt: 'Roblox' },
  fortnitegg: { en: 'fortnite.gg', pt: 'fortnite.gg' },
  designer: { en: "the game designer's public portfolio", pt: 'portfólio público do game designer' },
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

const checkedLabel = (lang: Lang) =>
  lang === 'pt' ? monthYear(REACH_CHECKED, 'pt').replace(' ', '/') : monthYear(REACH_CHECKED, 'en');

/** "Roblox, Sep 2026" / "fortnite.gg, set/2026". */
export function reachSourceShort(list: Reach[] | undefined, lang: Lang): string {
  if (!list?.length) return '';
  const names = [...new Set(list.map((r) => r.source))].map((source) => reachSourceLabel[source][lang]);
  return `${names.join(lang === 'pt' ? ' e ' : ' and ')}, ${checkedLabel(lang)}`;
}

/** "Source: Roblox, Sep 2026" / "Fontes: … e fortnite.gg, set/2026". */
export function reachSource(list: Reach[] | undefined, lang: Lang): string {
  if (!list?.length) return '';
  const plural = new Set(list.map((r) => r.source)).size > 1;
  const label = lang === 'pt' ? (plural ? 'Fontes' : 'Fonte') : plural ? 'Sources' : 'Source';
  return `${label}: ${reachSourceShort(list, lang)}`;
}

/** "1.1M+ visits (Roblox, Sep 2026)", for the resume and the machine-readable files. */
export const formatReachWithSource = (list: Reach[] | undefined, lang: Lang) =>
  list?.length ? `${formatReachList(list, lang)} (${reachSourceShort(list, lang)})` : '';
