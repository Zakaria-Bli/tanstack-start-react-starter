# tanstack-start-react-starter

Reusable TanStack Start + React starter template.

## Commands

```bash
pnpm install
pnpm dev
pnpm build
pnpm preview
pnpm test
pnpm test:watch
pnpm test:coverage
pnpm lint
pnpm format
pnpm check
pnpm check:ci
pnpm typecheck
pnpm validate
pnpm audit:dependencies
```

## Stack

- TanStack Start + React
- TanStack Router file-based routing
- Vite
- Tailwind CSS
- React Compiler
- Biome linting and formatting
- Husky, lint-staged, and Commitlint
- GitHub Actions CI and Dependabot
- Vitest, React Testing Library, and jest-dom
- Node.js 24.x
- pnpm 11.x

## Tooling requirements

- Node.js: `24.15.0` (`.nvmrc` and `.node-version`)
- Package manager: `pnpm@11.15.0` (`packageManager` in `package.json`)
- Runtime guardrails: `engines.node` is `>=24 <25`; `engines.pnpm` is `>=11 <12`

Use Corepack so the pinned pnpm version is selected automatically:

```bash
corepack enable
pnpm install
```

## Project structure

- `src/routes/__root.tsx` — document shell, metadata, stylesheet, scripts, devtools panel
- `src/routes/index.tsx` — blank home route
- `src/router.tsx` — router factory and type registration
- `src/routeTree.gen.ts` — generated route tree; do not edit by hand
- `src/styles.css` — global Tailwind entry and minimal base CSS
- `biome.json` — lint and format configuration
- `vitest.config.ts` — Vitest configuration for jsdom, jest-dom setup, and V8 coverage
- `src/lib/tests/setup.ts` — shared test setup file
- `commitlint.config.mjs` — Conventional Commits enforcement
- `.husky/` — local Git hooks
- `.github/actions/setup/action.yml` — shared CI setup action
- `.github/workflows/ci.yml` — CI workflow
- `.github/dependabot.yml` — dependency update automation
- `.github/PULL_REQUEST_TEMPLATE.md` — pull request template

## Notes

- `src/routeTree.gen.ts` is generated. Regenerate with `pnpm generate-routes` after route changes.
- `verbatimModuleSyntax` stays disabled for TanStack Start server/client boundaries.
- React Compiler is enabled in `vite.config.ts` via `reactCompilerPreset()`.
- Tests run in jsdom with jest-dom matchers loaded from `src/lib/tests/setup.ts`.
- Coverage is available with `pnpm test:coverage` and writes to ignored `coverage/` output.

## Environment variables

None required for the blank scaffold.

Use `VITE_` prefixes only for values that are safe to expose to browser code. Keep secrets server-only and access them from server-only code or server functions.
