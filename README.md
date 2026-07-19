# tanstack-start-react-starter

A clean, reusable TanStack Start + React starter template for building new applications with a production-minded development baseline.

This repository intentionally starts with a blank UI and focuses on project scaffolding: routing, styling, type checking, testing, linting, formatting, Git hooks, CI, dependency updates, and locked tooling versions. It is meant to be copied into future projects and extended with only the product-specific decisions each project needs.

## What is included

- TanStack Start + React 19
- TanStack Router file-based routing
- Vite build tooling
- Tailwind CSS
- React Compiler
- TypeScript
- Vitest with jsdom, React Testing Library, jest-dom, and V8 coverage
- Biome linting and formatting
- Husky, lint-staged, and Commitlint
- GitHub Actions CI with Biome, type checking, tests, dependency audit, build, and CodeQL
- Dependabot for npm packages and GitHub Actions
- Locked Node.js and pnpm versions

## What is intentionally not included

- Product UI, branding, demo routes, or decorative components
- Authentication
- Database, ORM, or API client setup
- Form library or UI kit
- Query-client setup
- Docker/containerization
- Deployment adapter or host-specific deployment config

Choose these per project instead of baking them into the base template.

## Requirements

- Node.js `24.15.0`
- pnpm `11.15.0`
- Corepack enabled

The required versions are declared in:

- `.nvmrc`
- `.node-version`
- `packageManager` in `package.json`
- `engines` in `package.json`

Enable Corepack before installing dependencies:

```bash
corepack enable
```

## Quick start

```bash
pnpm install
pnpm dev
```

The dev server runs on port `3000`:

```txt
http://localhost:3000
```

## Using this as a fresh starter template

Clone this repository into a new project folder:

```bash
git clone git@github.com:Zakaria-Bli/tanstack-start-react-starter.git your-project-name
cd your-project-name
```

Remove the starter repository history if you want the new project to begin with a fresh Git timeline:

```bash
rm -rf .git
git init
```

Update project identity:

```bash
pnpm pkg set name="your-project-name"
```

Review project metadata before the first commit:

- Update this README for the new product.
- Keep, replace, or remove `LICENSE` according to the new project's distribution model.
- If keeping the MIT license, update the copyright owner/year.
- Update routes, metadata, package details, and any repository URLs.

Install dependencies and verify the starter still passes validation:

```bash
corepack enable
pnpm install
pnpm validate
```

Create a new initial commit. If Husky hooks are already active and intentionally block committing directly on `main`, either create a compliant working branch or bypass only this bootstrap commit intentionally.

```bash
git add .
git commit \
  -m "chore(init): bootstrap project from starter template" \
  -m "Selected configurations:
- TanStack Start with React and file-based routing
- Vite, TypeScript, Tailwind CSS, and React Compiler
- Vitest with jsdom, jest-dom, React Testing Library, and V8 coverage
- Biome linting and formatting
- Husky, lint-staged, and Commitlint
- GitHub Actions CI, CodeQL, and Dependabot
- Locked Node.js 24.15.0 and pnpm 11.15.0

Template: https://github.com/Zakaria-Bli/tanstack-start-react-starter"
```

Optional remote setup:

```bash
git branch -M main
git remote add origin git@github.com:<owner>/<repo>.git
git push -u origin main
```

## Project structure

```txt
src/
  lib/
    tests/
      setup.ts          # Vitest/jest-dom setup
  routes/
    __root.tsx          # document shell, metadata, scripts, devtools
    index.tsx           # blank home route
  router.tsx            # router factory and type registration
  routeTree.gen.ts      # generated route tree; do not edit
  styles.css            # Tailwind entry and minimal base CSS

.github/
  actions/setup/        # shared CI dependency setup
  workflows/ci.yml      # CI workflow
  dependabot.yml        # dependency update automation

.husky/                 # local Git hooks
biome.json              # lint/format configuration
commitlint.config.mjs   # Conventional Commits rules
pnpm-workspace.yaml     # pnpm workspace/settings
vitest.config.ts        # test configuration
vite.config.ts          # Vite/TanStack Start/React Compiler config
tsconfig.json           # TypeScript configuration
```

## Available scripts

| Command                   | Description                                             |
| ------------------------- | ------------------------------------------------------- |
| `pnpm dev`                | Start the local dev server on port `3000`.              |
| `pnpm generate-routes`    | Regenerate TanStack Router route types.                 |
| `pnpm build`              | Build the app for production.                           |
| `pnpm preview`            | Preview the production build locally.                   |
| `pnpm test`               | Run Vitest once. Allows no tests for the blank starter. |
| `pnpm test:watch`         | Run Vitest in watch mode.                               |
| `pnpm test:coverage`      | Run Vitest with V8 coverage.                            |
| `pnpm lint`               | Run Biome linting.                                      |
| `pnpm format`             | Run Biome formatting check.                             |
| `pnpm check`              | Run Biome formatter/linter checks.                      |
| `pnpm check:ci`           | Run Biome in CI mode with CI-friendly diagnostics.      |
| `pnpm typecheck`          | Run TypeScript without emitting files.                  |
| `pnpm audit:dependencies` | Audit dependencies at moderate severity and above.      |
| `pnpm validate`           | Run `check`, `typecheck`, `test`, and `build`.          |

## Development workflow

Before opening a pull request or pushing significant changes, run:

```bash
pnpm validate
```

The `pre-push` hook also runs `pnpm validate`.

For route changes, run route generation when the dev server or build has not already done it:

```bash
pnpm generate-routes
```

Do not edit `src/routeTree.gen.ts` by hand.

## Testing

Vitest is configured in `vitest.config.ts` with:

- `jsdom` test environment
- global Vitest APIs
- jest-dom matchers from `src/lib/tests/setup.ts`
- V8 coverage via `@vitest/coverage-v8`

The starter has no sample tests by design. Add tests alongside features or in a project-specific test structure when the app grows.

Coverage output is written to `coverage/`, which is ignored by Git.

## Linting and formatting

Biome is the single formatter/linter. Generated files and build artifacts are excluded from Biome checks.

Common commands:

```bash
pnpm check
pnpm check:ci
pnpm lint
pnpm format
```

## Git hooks and commits

Husky hooks are installed by the `prepare` script.

Configured hooks:

- `pre-commit` validates branch names and runs lint-staged with Biome.
- `commit-msg` runs Commitlint.
- `pre-push` runs `pnpm validate`.

Commit messages use Conventional Commits with a required scope:

```txt
type(scope): description
```

Example:

```txt
feat(router): add dashboard route
```

Branch names use:

```txt
type/scope-description
```

Example:

```txt
feat/dashboard-route
```

## Continuous integration

GitHub Actions CI runs on pushes to `main` and `staging`, and on pull requests.

CI jobs include:

- Biome CI
- Type checking
- Unit tests
- Dependency audit
- Production build
- CodeQL analysis

Dependabot checks npm packages and GitHub Actions weekly.

## Environment variables

No environment variables are required by the starter.

Guidelines for future projects:

- Use `VITE_` only for values that are safe to expose to browser code.
- Do not use `VITE_` for server secrets.
- Do not read `process.env` at module scope.
- Read server-only environment values inside `createServerFn` handlers, server route handlers, or request middleware.

## Extending the template

Use this starter as a baseline, then add project-specific decisions intentionally.

Recommended extension path:

1. Rename the package and update README/project metadata.
2. Replace the blank home route in `src/routes/index.tsx`.
3. Add new routes under `src/routes/`.
4. Add shared application code under `src/lib/`.
5. Add tests for new behavior.
6. Choose and document environment variables.
7. Choose a deployment target before adding any adapter packages or platform config.
8. Add product-specific dependencies only when there is a clear requirement.

TanStack Start code is isomorphic by default. Use `createServerFn` for server-only work such as secrets, database access, privileged APIs, or trusted mutations.

## Deployment

No deployment adapter is configured yet.

Choose the target host first, then add the matching TanStack Start/Nitro or platform setup. Common future targets include:

- Cloudflare Workers
- Netlify
- Vercel
- Railway
- Node.js/Docker hosts

## License

This starter is MIT licensed. See [`LICENSE`](./LICENSE).

When creating a new project from this starter, review the license as project metadata: keep MIT, replace it with the new project's chosen license, or remove it for private/proprietary work if appropriate. Update the copyright owner and year when keeping a license file.
