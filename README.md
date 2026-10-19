# Madrasah Management System (MMS)

[![Repository](https://img.shields.io/badge/GitHub-engrsakib%2Fmadrasha--management--system-181717?style=for-the-badge&logo=github&logoColor=white)](https://github.com/engrsakib/madrasha-management-system)

## Technology stack

| Category | Technologies |
| -------- | ------------ |
| Monorepo & runtime | [![Node.js](https://img.shields.io/badge/Node.js-≥22-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)](https://nodejs.org/) [![pnpm](https://img.shields.io/badge/pnpm-12-F69220?style=for-the-badge&logo=pnpm&logoColor=white)](https://pnpm.io/) [![Turborepo](https://img.shields.io/badge/Turborepo-2-EF4444?style=for-the-badge&logo=turborepo&logoColor=white)](https://turbo.build/) [![TypeScript](https://img.shields.io/badge/TypeScript-5.9-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/) |
| Applications | [![NestJS](https://img.shields.io/badge/NestJS-12-E0234E?style=for-the-badge&logo=nestjs&logoColor=white)](https://nestjs.com/) [![Next.js](https://img.shields.io/badge/Next.js-16-000000?style=for-the-badge&logo=nextdotjs&logoColor=white)](https://nextjs.org/) [![React](https://img.shields.io/badge/React-19-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://react.dev/) [![Zod](https://img.shields.io/badge/Zod-validation-3E67B1?style=for-the-badge&logo=zod&logoColor=white)](https://zod.dev/) |
| Data & infrastructure | [![PostgreSQL](https://img.shields.io/badge/PostgreSQL-16-4169E1?style=for-the-badge&logo=postgresql&logoColor=white)](https://www.postgresql.org/) [![Redis](https://img.shields.io/badge/Redis-7-DC382D?style=for-the-badge&logo=redis&logoColor=white)](https://redis.io/) [![Prisma](https://img.shields.io/badge/Prisma-7-2D3748?style=for-the-badge&logo=prisma&logoColor=white)](https://www.prisma.io/) [![Docker](https://img.shields.io/badge/Docker-Compose-2496ED?style=for-the-badge&logo=docker&logoColor=white)](https://www.docker.com/) [![ngrok](https://img.shields.io/badge/ngrok-tunneling-1F1E37?style=for-the-badge&logo=ngrok&logoColor=white)](https://ngrok.com/) |
| UI | [![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white)](https://tailwindcss.com/) [![Radix UI](https://img.shields.io/badge/Radix_UI-shadcn--style-161618?style=for-the-badge&logo=radixui&logoColor=white)](https://www.radix-ui.com/) |
| Quality & CI | [![ESLint](https://img.shields.io/badge/ESLint-10-4B32C3?style=for-the-badge&logo=eslint&logoColor=white)](https://eslint.org/) [![Prettier](https://img.shields.io/badge/Prettier-3-F7BA3E?style=for-the-badge&logo=prettier&logoColor=black)](https://prettier.io/) [![Husky](https://img.shields.io/badge/Husky-git_hooks-000000?style=for-the-badge&logo=git&logoColor=white)](https://typicode.github.io/husky/) [![Commitlint](https://img.shields.io/badge/Commitlint-conventional-000000?style=for-the-badge&logo=conventionalcommits&logoColor=white)](https://commitlint.js.org/) [![GitHub Actions](https://img.shields.io/badge/GitHub_Actions-CI-2088FF?style=for-the-badge&logo=githubactions&logoColor=white)](https://github.com/features/actions) |

Production-oriented **pnpm workspace + Turborepo** monorepo for a Madrasah Management System.

**Repository:** [github.com/engrsakib/madrasha-management-system](https://github.com/engrsakib/madrasha-management-system)

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
git clone https://github.com/engrsakib/madrasha-management-system.git
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

Copyright (c) 2026 Md. Nazmus Sakib. All Rights Reserved.

This software and associated documentation files (the "Software") are the proprietary and confidential property of the author.

UNAUTHORIZED COPYING, REPRODUCTION, MODIFYING, MERGING, PUBLISHING, DISTRIBUTING, SUBLICENSING, AND/OR SELLING COPIES OF THE SOFTWARE, IN WHOLE OR IN PART, IS STRICTLY PROHIBITED WITHOUT PRIOR WRITTEN PERMISSION FROM THE COPYRIGHT OWNER.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND.

See [LICENSE](./LICENSE) for the full text.
