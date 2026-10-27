# wanderlust

Next.js 16.4.3 App Router app (`npm run dev` / `build` / `lint`; no test script exists).

<!-- BEGIN:nextjs-agent-rules -->

## This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

## Non-obvious framework config

- `next.config.ts` enables `cacheComponents`, `partialPrefetching`, and React Compiler. Compile-time React Compiler transforms apply — don't hand-memoize (`useMemo`/`useCallback`/`memo`) per old habits; components may be auto-memoized.
- Turbopack is the bundler; Tailwind v4 is loaded as a Turbopack rule on `*.css`. There is **no** `tailwind.config.*` — theme tokens live CSS-first in `src/app/globals.css` (`@theme inline`, imports from `shadcn/tailwind.css` and `tw-animate-css`).
- Verification: `npm run lint` (flat ESLint 9 config in `eslint.config.mjs`, flat `globalIgnores`) and `tsc --noEmit` (`npx tsc`). There is no CI, no tests, no pre-commit hooks.

## shadcn/ui — Base UI, not Radix

- This project uses the `base-nova` shadcn style (`components.json`): `src/components/ui/*` components are built on **`@base-ui/react`**, not Radix, and not the default shadcn Radix-based output. Check the exact import paths of an existing `src/components/ui/*.tsx` file before assuming a Radix-based variant API.
- `components.json` style: RSC on, Tailwind with CSS variables (neutral base color), icons from lucide-react.
- The `cn` import is the npm package `cn` (`import { cn } from "cn"`), not `clsx` + `tailwind-merge` composed manually. Utility lives in `src/lib/utils.ts`; path aliases `@/*` → `src/*` (components → `@/components`, ui → `@/components/ui`, lib/hooks likewise).

## Structure

- App code: `src/app` (currently only `layout.tsx` + `page.tsx`), custom hooks `src/hooks`, helpers `src/lib` (also `highlighter.tsx` using shiki for code highlighting).
- Font: Google `Josefin_Sans` via `next/font` in the root layout.
