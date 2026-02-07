# AGENTS.md

Guidance for coding agents working in `febrero-14`.

## Project Snapshot
- Stack: Next.js 16 (App Router), React 19, TypeScript 5, Tailwind CSS 4.
- Package manager: npm (lockfile present: `package-lock.json`).
- Linting: ESLint 9 with `eslint-config-next` (`core-web-vitals` + TypeScript).
- Styling: Tailwind utility classes + custom theme tokens in `src/app/globals.css`.
- UI primitives: shadcn/ui config present in `components.json`.
- Media-heavy romantic invitation site (animations, gallery, audio player).

## Setup And Core Commands
- Install deps: `npm ci`
- Dev server (reference only): `npm run dev`
- Production build (reference only): `npm run build`
- Start prod server (reference only): `npm run start`
- Lint full repo (reference only): `npm run lint`
- Type-check only (no emit, reference only): `npx tsc --noEmit`

## Owner Execution Policy (Important)
- Do **not** run development or production servers (`npm run dev`, `npm run start`) unless the user explicitly asks.
- Do **not** run tests, type-check, lint, or build by default; the repository owner performs verification.
- When finishing a change, provide a short list of recommended commands the owner can run manually.

## Lint/Test Commands (Including Single-Test Guidance)
- Lint one file: `npx eslint src/components/MusicPlayer.tsx`
- Lint a folder: `npx eslint src/components`
- Build verification: `npm run build`
- Type verification: `npx tsc --noEmit`

### Current Test Status
- There is no test runner configured right now.
- No `*.test.*` / `*.spec.*` files were found in the repository.
- No `vitest`, `jest`, `playwright`, or `cypress` config files were found.

### Single-Test Command (Important)
- Single-test execution is currently **not available** because no test framework is installed.
- If tests are introduced later, add scripts to `package.json` and document exact single-test commands here.
- Typical future examples (only after setup):
- Vitest single test file: `npx vitest run src/path/file.test.ts`
- Vitest single test name: `npx vitest run -t "test name"`
- Jest single test file: `npx jest src/path/file.test.ts`
- Playwright single spec: `npx playwright test tests/example.spec.ts`

## Repository Structure
- App routes: `src/app/**`
- Shared components: `src/components/**`
- Shared utilities: `src/lib/**`
- Shared types: `src/types/**`
- Static assets: `public/**`
- Global styles/theme: `src/app/globals.css`

## TypeScript Rules
- TS strict mode is enabled; keep all new code type-safe.
- Prefer explicit prop interfaces for React components.
- Keep domain types in `src/types/*` when reused in multiple files.
- Use `Readonly<{ ... }>` for immutable prop wrappers when appropriate.
- Avoid `any`; use unions, generics, `unknown`, or narrowed interfaces.
- Keep function return types inferred unless explicit annotations improve clarity.
- Use the `@/*` path alias for imports from `src`.

## React And Next.js Conventions
- Use App Router patterns (`src/app`), not Pages Router.
- Add `"use client"` only for components that require client hooks/browser APIs.
- Default to Server Components where possible; keep client boundaries intentional.
- Keep route files named `page.tsx`, layout files `layout.tsx`.
- Keep metadata in route/layout files using typed `Metadata` where relevant.
- Use `next/image` for image rendering in UI pages/components.
- Use `next/navigation` hooks in client components for navigation.

## Import Organization
- Group imports in this order when possible:
- 1) React/Next imports.
- 2) Third-party libraries.
- 3) Internal aliases (`@/...`).
- 4) Relative imports.
- Use `import type` for type-only imports when practical.
- Keep named imports concise and avoid unused imports.
- Prefer double quotes in TS/TSX files to match existing style.

## Naming Conventions
- Components: PascalCase (`PhotoGallery`, `MusicPlayer`).
- Hooks/functions/variables: camelCase (`handleAccept`, `isPlaying`).
- Interfaces/types: PascalCase (`PhotoGalleryProps`, `Flower`).
- Booleans should read like predicates (`isVisible`, `showConfetti`).
- Constants that are fixed collections can be `const` with `as const`.
- File naming: component files use PascalCase; route files follow Next defaults.

## Formatting And Style
- Follow existing file-local style; do not reformat unrelated lines.
- Prefer concise, readable functions over clever one-liners.
- Keep JSX trees readable with consistent indentation.
- Use trailing commas where current file style already uses them.
- Comments should be minimal and only for non-obvious intent.
- Keep user-facing copy in Spanish when editing existing Spanish UI text.

## Tailwind/CSS Guidelines
- Reuse existing theme tokens: `valentine-*`, CSS variables in `globals.css`.
- Prefer utility classes; add global CSS only when utilities are insufficient.
- Preserve visual language (romantic palette, rounded cards, soft shadows, motion).
- Keep responsive behavior explicit (`sm:`, `md:`, `lg:`) for layout-critical UI.
- Respect layering/z-index patterns already present in animated and modal views.
- Avoid introducing conflicting color systems when existing tokens already fit.

## Color Palette Guidelines
- Primary romantic palette (from `src/app/globals.css`):
- `--color-valentine-pink`: `#ff85a2`
- `--color-valentine-red`: `#ff4d6d`
- `--color-valentine-cream`: `#fff0f3`
- `--color-valentine-dark`: `#590d22`
- UI semantic tokens also exist in `:root` (`--background`, `--foreground`, `--primary`, `--ring`, etc.); prefer existing variables over hardcoded colors.
- For new styles, favor `bg-valentine-*`, `text-valentine-*`, and `border-valentine-*` classes.

## Error Handling And Resilience
- Fail safely in UI interactions (`if (!ref.current) return`).
- Guard browser-only APIs behind client components/effects.
- Use try/catch or promise `.catch` for async browser actions (audio/media/nav).
- Surface user-facing fallbacks for known failures (loading/error states).
- Do not swallow errors silently; log or expose meaningful state when needed.
- Keep cleanup functions in effects for timers, listeners, and media resources.

## Accessibility And UX Baselines
- Keep semantic elements (`button`, `main`, headings) where possible.
- Preserve keyboard-accessible controls and focus behavior.
- Provide descriptive `alt` text for images.
- Ensure interactive controls have clear visual feedback.
- Keep text readable against decorative backgrounds.

## Agent Working Rules
- Make focused changes; avoid touching unrelated files.
- Before editing, inspect nearby code for existing patterns and follow them.
- Prefer small, reviewable diffs.
- Do not execute lint/build/type-check/test/server commands unless the user explicitly requests command execution.
- If a command cannot be run, state it clearly and explain why.
- Never commit generated artifacts unless the repo convention requires it.

## Verification Checklist For Typical Changes
- Suggest owner-run command: `npm run lint`
- Suggest owner-run command: `npx tsc --noEmit`
- Suggest owner-run command: `npm run build` for route or config-level changes
- Ask owner to manually verify key pages in browser
- Ask owner to confirm no console/runtime errors in affected flows

## Rules Files (Cursor/Copilot)
- Checked `.cursor/rules/`: not present.
- Checked `.cursorrules`: not present.
- Checked `.github/copilot-instructions.md`: not present.
- Therefore, no additional Cursor/Copilot repository rules are currently applied.

## Notes For Future Maintenance
- If a test framework is added, update this file first with exact commands.
- Add `npm` scripts for `test` and `test:watch` as part of that setup.
- Include canonical single-test commands once test tooling is established.
