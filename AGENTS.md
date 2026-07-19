<!-- intent-skills:start -->
## Skill Loading

Before editing files for a substantial task:
- Run `pnpm dlx @tanstack/intent@latest list` from the workspace root to see available local skills.
- If a listed skill matches the task, run `pnpm dlx @tanstack/intent@latest load <package>#<skill>` before changing files.
- Use the loaded `SKILL.md` guidance while making the change.
- Monorepos: when working across packages, run the skill check from the workspace root and prefer the local skill for the package being changed.
- Multiple matches: prefer the most specific local skill for the package or concern you are changing; load additional skills only when the task spans multiple packages or concerns.
<!-- intent-skills:end -->

# Project Context

## Starter Baseline

- Project/package name: `tanstack-start-react-starter`.
- Purpose: clean, reusable TanStack Start + React starter template for future projects.
- UI intent: intentionally blank. Product UI, branding, auth, database, ORM, form library, UI kit, and query-client setup are not included.
- Included tooling: Vite, TypeScript, Node.js 24.x, pnpm 11.x, Tailwind CSS, Vitest, Biome, React Compiler, TanStack Devtools, and Router Devtools.
- Not included yet: Git hooks, lint-staged, CI/CD workflows, Docker/containerization, deployment adapter, or platform-specific deployment config.

## Source of Truth

- Current repository files are the source of truth. Scaffold history is not required for future maintenance.
- Preserve the minimal starter baseline unless a task explicitly asks for more opinionated features.
- Do not add demo routes, decorative components, UI kits, deployment adapters, or integration packages without a clear requirement.

## Project Structure

- `src/routes/__root.tsx` — document shell, metadata, stylesheet link, `<HeadContent />`, `<Scripts />`, and devtools panel wiring.
- `src/routes/index.tsx` — intentionally blank home route rendering an empty `<main />`.
- `src/router.tsx` — router factory and TanStack Router type registration.
- `src/routeTree.gen.ts` — generated route tree. Do not hand-edit.
- `src/styles.css` — Tailwind entry and minimal base CSS.
- `biome.json` — Biome lint/format configuration.
- `pnpm-workspace.yaml` — pnpm workspace/settings file, including allowed build-script dependencies.
- `.nvmrc` and `.node-version` — pinned Node.js version for local tooling.
- `.vscode/settings.json` — editor defaults, including readonly generated route tree and Biome formatter settings.

## Commands

- Dev server: `pnpm dev`
- Generate routes: `pnpm generate-routes`
- Production build: `pnpm build`
- Preview build: `pnpm preview`
- Tests: `pnpm test`
- Lint: `pnpm lint`
- Format: `pnpm format`
- Biome check: `pnpm check`

After meaningful changes, run at least:

```bash
pnpm check
pnpm test
pnpm build
```

After route file changes, regenerate route types with `pnpm generate-routes` when dev/build has not already done so.

## Tooling Decisions

- Runtime/tooling versions are locked to Node.js `24.15.0` and `pnpm@11.15.0`.
- `package.json` declares `packageManager`, `engines.node`, and `engines.pnpm`; keep them aligned with `.nvmrc` and `.node-version`.
- pnpm package-manager settings belong in `pnpm-workspace.yaml`, not the deprecated `pnpm` field in `package.json`.
- Biome is the formatter/linter. Keep `src/routeTree.gen.ts` excluded because it is generated.
- `pnpm test` uses `vitest run --passWithNoTests` because the starter intentionally has no tests yet.
- `tsconfig.json` keeps `verbatimModuleSyntax: false` per TanStack Start guidance to avoid server/client bundle boundary issues.
- React Compiler is enabled in `vite.config.ts` using `reactCompilerPreset()` from `@vitejs/plugin-react` with `@rolldown/plugin-babel`.
- Keep the Vite plugin order unless intentionally changing the build pipeline:
  1. `devtools()` first
  2. `tailwindcss()`
  3. `tanstackStart()` before React
  4. `viteReact()`
  5. `babel({ presets: [reactCompilerPreset()] })`

## TanStack Start Rules

- TanStack Start code is isomorphic by default. Loaders and shared modules can run on both server and client.
- Use `createServerFn` for server-only work, secrets, database access, privileged API calls, and other trusted operations.
- Do not use Next.js or Remix patterns such as `getServerSideProps`, App Router files, or `"use server"` directives.
- Keep `<Scripts />` in the root document body; it is required for client hydration.
- Keep `src/routeTree.gen.ts` generated and readonly; never edit it by hand.

## Environment Variables

- No environment variables are required by the starter.
- `VITE_` variables are public and can be exposed to browser code.
- Server secrets must not use `VITE_`.
- Do not read `process.env` at module scope. Read env inside `createServerFn` handlers, server route handlers, or request middleware.
- For Cloudflare/edge deployments, env can be injected per request, so module-scope env reads may be `undefined` even server-side.

## Deployment

- No deployment adapter is configured yet.
- Choose the hosting target before adding adapter packages or platform config.
- Common future targets:
  - Cloudflare Workers: `@cloudflare/vite-plugin`, `wrangler`, and `nodejs_compat`.
  - Netlify: `@netlify/vite-plugin-tanstack-start`.
  - Node/Vercel/Railway/Docker: add the appropriate TanStack Start/Nitro deployment setup for that target.
