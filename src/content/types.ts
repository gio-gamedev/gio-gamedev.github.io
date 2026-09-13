export type Lang = 'en' | 'pt';

/** A value available in every supported language. */
export type L<T = string> = Record<Lang, T>;

export type Tone = 'accent' | 'violet' | 'red' | 'blue' | 'amber' | 'slate' | 'yellow' | 'neutral';
