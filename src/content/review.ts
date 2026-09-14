/**
 * Draft content (marked `draft: true`) is fictional material Giovanni still has to review or redo.
 * It shows only in review mode — `npm run dev` or `npm run build:review` — never on the published site.
 */
export const SHOW_DRAFTS = import.meta.env.DEV || import.meta.env.VITE_SHOW_DRAFTS === '1';

export const visible = <T extends { draft?: boolean }>(items: T[]): T[] =>
  SHOW_DRAFTS ? items : items.filter((item) => !item.draft);
