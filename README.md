# Madrasah Management System (MMS)

Production-oriented **pnpm workspace + Turborepo** monorepo for a Madrasah Management System.

| Package                 | Name                | Port | Description                       |
| ----------------------- | ------------------- | ---- | --------------------------------- |
| `packages/api`          | `@mms/api`          | 4000 | NestJS REST API                   |
| `packages/web`          | `@mms/web`          | 3000 | Management dashboard              |
| `packages/sms`          | `@mms/sms`          | 3001 | Student Management portal         |
| `packages/rms`          | `@mms/rms`          | 3002 | Result Management portal          |
| `packages/db`           | `@mms/db`           | —    | Prisma schema, client, migrations |
| `packages/shared-types` | `@mms/shared-types` | —    | Shared DTOs and enums             |
| `packages/shared-ui`    | `@mms/shared-ui`    | —    | Shared UI (Tailwind 4 + Radix)    |

## Prerequisites

- **Node.js** ≥ 22 (see `.nvmrc`)
- **pnpm** 12 (`corepack enable && corepack prepare pnpm@12.8.1 --activate`)
- **Docker Desktop** (PostgreSQL 16 + Redis 7 via Compose)
- **ngrok** (optional, for exposing local services)

> **TypeScript 5.9** is used instead of TypeScript 7 because NestJS relies on `emitDecoratorMetadata`, which is not supported on the TS 7 native preview.

## Repository structure

```
.
├── .github/workflows/ci.yml
├── .husky/
├── docker-compose.yml
├── ngrok.yml
├── packages/
│   ├── api/
│   ├── web/
│   ├── sms/
│   ├── rms/
│   ├── db/
│   ├── shared-types/
│   ├── shared-ui/
│   ├── tsconfig/
│   └── eslint-config/
├── package.json
├── pnpm-workspace.yaml
└── turbo.json
```

## Step-by-step local setup

### 1. Clone and install

```bash
git clone <your-repo-url>
cd madrasha-management-system
pnpm install
```

On first install, pnpm may require approving dependency build scripts. The repo commits `allowBuilds` in [`pnpm-workspace.yaml`](./pnpm-workspace.yaml); if your pnpm version still prompts, run `pnpm approve-builds --all --yes` once locally.

### 2. Environment files

Copy example env files and adjust secrets for local use:

```bash
cp .env.example .env
cp packages/api/.env.example packages/api/.env
cp packages/db/.env.example packages/db/.env
cp packages/web/.env.example packages/web/.env
cp packages/sms/.env.example packages/sms/.env
cp packages/rms/.env.example packages/rms/.env
```

Ensure `DATABASE_URL` and `REDIS_URL` in `packages/api/.env` match root Docker credentials:

- Postgres: `postgresql://mms:mms_secret@localhost:5432/mms?schema=public`
- Redis: `redis://:mms_redis_secret@localhost:6379`

### 3. Start infrastructure

```bash
pnpm docker:up
pnpm docker:logs   # optional — wait until postgres and redis are healthy
```

### 4. Database migrate and seed

```bash
pnpm db:generate
pnpm db:migrate    # creates/applies migrations (interactive name on first run)
pnpm db:seed       # optional sample data
```

### 5. Run all applications

```bash
pnpm dev
```

Or run individually:

```bash
pnpm dev:api
pnpm dev:web
pnpm dev:sms
pnpm dev:rms
```

Verify:

- API health: [http://localhost:4000/health](http://localhost:4000/health)
- Swagger: [http://localhost:4000/docs](http://localhost:4000/docs)
- Web: [http://localhost:3000](http://localhost:3000)
- SMS: [http://localhost:3001](http://localhost:3001)
- RMS: [http://localhost:3002](http://localhost:3002)

## ngrok tunneling

1. Set `NGROK_AUTHTOKEN` in root `.env` (see [ngrok dashboard](https://dashboard.ngrok.com/get-started/your-authtoken)).
2. Start tunnels:

```bash
pnpm tunnel       # all services (api, web, sms, rms)
pnpm tunnel:api   # API only (webhooks)
```

Configuration: [`ngrok.yml`](./ngrok.yml).

## Scripts (root)

| Script              | Description                        |
| ------------------- | ---------------------------------- |
| `pnpm dev`          | All packages in dev mode (Turbo)   |
| `pnpm build`        | Production build (cached)          |
| `pnpm lint`         | ESLint, zero warnings allowed      |
| `pnpm type-check`   | TypeScript across workspace        |
| `pnpm format`       | Prettier write                     |
| `pnpm format:check` | Prettier check (CI)                |
| `pnpm db:*`         | Prisma generate / migrate / studio |
| `pnpm docker:up`    | Start Postgres + Redis             |

## Code quality gates

- **ESLint** (flat config via `@mms/eslint-config`): strict TypeScript rules, **no unused imports/variables** (`eslint-plugin-unused-imports`).
- **Prettier** for formatting.
- **Husky** `pre-commit`: `lint-staged` + full-repo `pnpm type-check`.
- **Commitlint**: [Conventional Commits](https://www.conventionalcommits.org/) (`feat:`, `fix:`, `chore:`, …).

Commits are **blocked** if lint, format (on staged files), type-check, or commit message rules fail.

## CI (GitHub Actions)

Workflow: [`.github/workflows/ci.yml`](./.github/workflows/ci.yml)

On push/PR to `main`/`master`:

1. `pnpm install --frozen-lockfile`
2. `pnpm format:check`
3. `pnpm lint`
4. `pnpm type-check`
5. `pnpm build`

PRs also run **commitlint** on the commit range.

Recommended: enable branch protection requiring the **quality** check (and **commitlint** on PRs) before merge.

## Adding a new package

1. Create `packages/my-pkg/` with `package.json` name `@mms/my-pkg`.
2. Extend `@mms/tsconfig` and `@mms/eslint-config`.
3. Add `lint`, `type-check`, and `build`/`dev` scripts for Turbo.
4. Declare workspace dependencies with `"workspace:*"`.
5. Run `pnpm install` from the repo root.

## Troubleshooting

| Issue                                 | Fix                                                                                     |
| ------------------------------------- | --------------------------------------------------------------------------------------- |
| Husky hooks not running on Windows    | Run `pnpm prepare`; ensure Git Bash or compatible hook runner; hooks use `pnpm` on PATH |
| Prisma client missing                 | Run `pnpm db:generate` from root                                                        |
| Port already in use                   | Change `PORT` in package `.env` or stop conflicting process                             |
| API health `degraded`                 | Confirm Docker is up, credentials match `.env`, run `pnpm db:migrate`                   |
| Next cannot resolve `@mms/shared-ui`  | Ensure `transpilePackages: ["@mms/shared-ui"]` in `next.config.ts`                      |
| ESLint project service slow first run | Normal on first lint; subsequent runs use cache                                         |

## License

Private — all rights reserved unless otherwise specified.
