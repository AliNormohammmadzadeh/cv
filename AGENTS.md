# AGENTS.md

## Cursor Cloud specific instructions

This is a React + TypeScript portfolio website built with Vite, Tailwind CSS, and shadcn/ui. It is a **frontend-only** project with no backend, database, or external API dependencies.

### Services

| Service | Command | Port | Notes |
|---------|---------|------|-------|
| Vite Dev Server | `npm run dev` | 8080 | Only service needed. Serves at `http://localhost:8080/cv/` (note the `/cv/` base path) |

### Key commands

See `package.json` scripts. Summary:

- **Dev server**: `npm run dev` (Vite on port 8080, base path `/cv/`)
- **Lint**: `npm run lint` (ESLint 9 flat config)
- **Test**: `npm test` (Vitest, single-run) or `npm run test:watch`
- **Build**: `npm run build` (production) or `npm run build:dev` (development mode)

### Non-obvious notes

- The app is served under the `/cv/` base path (configured in `vite.config.ts`). Always navigate to `http://localhost:8080/cv/` — not just `http://localhost:8080/`.
- ESLint reports 3 pre-existing errors in auto-generated shadcn/ui components (`command.tsx`, `textarea.tsx`, `tailwind.config.ts`). These are expected and should not be treated as regressions.
- The contact form uses a simulated delay then opens a `mailto:` link — there is no server-side form processing.
- Path alias `@` maps to `./src` (configured in `vite.config.ts` and `tsconfig.json`).
