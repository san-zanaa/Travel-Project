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



## Current Project Progress — Wanderlust

**### Backend**
- Backend uses Express.js and MongoDB.
- Backend runs on `http://localhost:8000`.
- MongoDB connection uses the `MONGODB_URL` environment variable.
- MongoDB database: `wanderlust`.
- MongoDB collection: `destinations`.
- `POST /add-destination` receives destination data from the frontend and saves it to MongoDB using `insertOne()`.
- `GET /destinations` fetches all destination documents from MongoDB and returns them as JSON.
- `express.json()` middleware parses incoming JSON request bodies.
- CORS is configured to allow requests from `http://localhost:3000`.
- Nodemon is installed as a development dependency and can be run using `npm run dev`.

**### Frontend**
- The frontend uses Next.js App Router, TypeScript, Tailwind CSS v4, and shadcn/ui with the `base-nova` style.
- `AddDestinationPage` provides a form to add new travel packages.
- Form fields: destination name, country, category, price, duration, departure date, image URL, and description.
- The form submits JSON data to `http://localhost:8000/add-destination` using `fetch()`.
- The destination listing page fetches data from `http://localhost:8000/destinations` and displays destination cards.
- Destination cards display the image, country, category, destination name, price, duration, and rating.
- The listing page includes loading, error, and empty states.
- Destination data is rendered dynamically using React state and `.map()`.

**### Current API Data Structure**
Each destination document contains:
- `_id`
- `destinationName`
- `country`
- `category`
- `price`
- `duration`
- `departureDate`
- `imageUrl`
- `description`

The `rating` field is optional and is not currently included in the add-destination form.

**### Current Status**
- The backend API successfully returns destination data from MongoDB.
- Three destination documents have been retrieved successfully through `GET /destinations`.
- The frontend and backend communicate through HTTP requests.
- The next development steps may include implementing functional category, price range, and sorting filters on the destination listing page.

**### Development Guidelines**
- Preserve the existing project structure and configurations.
- Before implementing Next.js features, consult the relevant documentation in `node_modules/next/dist/docs/` as required by the project rules.
- Use the existing shadcn/ui components and their actual Base UI APIs.
- Keep the UI responsive and consistent with the provided Wanderlust design references.
- Avoid modifying unrelated files or existing configurations.

## General Development Rules

- Always inspect existing code before making changes.
- Treat the actual codebase as the source of truth if this document becomes outdated.
- Make minimal, targeted changes and preserve existing working functionality.
- Follow the existing project structure, coding conventions, UI design, and installed dependencies.
- Use TypeScript types appropriately and avoid unnecessary `any`.
- Follow Next.js App Router conventions and check the installed documentation when needed.
- Use existing shadcn/ui Base UI components and Tailwind CSS v4 conventions.
- Keep the UI responsive and accessible across mobile, tablet, and desktop.
- Handle loading, empty, success, and error states where appropriate.
- Validate user input and handle API and database errors safely.
- Never expose secrets or environment variables in frontend code.
- Do not use hardcoded mock data to hide API or database failures.
- Do not install new dependencies or modify unrelated files without a clear reason.
- Do not claim that a feature, build, or test works unless it has been verified.
- After each task, summarize the changes, affected files, verification results, and any remaining issues.
- Keep this document updated when important project architecture, API routes, or development conventions change.
