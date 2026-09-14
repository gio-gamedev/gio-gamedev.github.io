/// <reference types="vite/client" />

/** ISO timestamp injected at build time (see vite.config.ts). */
declare const __BUILD_DATE__: string;

/** True in `npm run dev` and `npm run build:review`; a literal false in the published build. */
declare const __SHOW_DRAFTS__: boolean;
