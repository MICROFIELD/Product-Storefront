# Morrow Supply

A curated ecommerce storefront for beautifully made everyday objects and slow daily rituals.

## Run & Operate

- `pnpm --filter @workspace/api-server run dev` — run the API server (port 5000)
- `pnpm run typecheck` — full typecheck across all packages
- `pnpm run build` — typecheck + build all packages
- `pnpm --filter @workspace/api-spec run codegen` — regenerate API hooks and Zod schemas from the OpenAPI spec
- `pnpm --filter @workspace/db run push` — push DB schema changes (dev only)
- Required env: `DATABASE_URL` — Postgres connection string

## Stack

- pnpm workspaces, Node.js 24, TypeScript 5.9
- API: Express 5
- DB: PostgreSQL + Drizzle ORM
- Validation: Zod (`zod/v4`), `drizzle-zod`
- API codegen: Orval (from OpenAPI spec)
- Build: esbuild (CJS bundle)

## Where things live

- Storefront UI: `artifacts/product-storefront/src/`
- Storefront entry and routes: `artifacts/product-storefront/src/App.tsx`
- Storefront theme: `artifacts/product-storefront/src/index.css`
- Shared API server: `artifacts/api-server/` (not required by the first storefront build)

## Architecture decisions

- The first storefront version is frontend-only so shoppers can browse and manage a cart without requiring an account or server setup.
- Cart state is intentionally local to the browser until a payment provider and order persistence are connected.
- Checkout is represented as a clear handoff state rather than a fake payment flow.

## Product

Browse featured objects, search and filter the catalog, open product details, add items to a cart, adjust quantities, and review an order before checkout.

## User preferences

_Populate as you build — explicit user instructions worth remembering across sessions._

## Gotchas

- Connect a payment provider and order persistence before treating checkout as production-ready.

## Pointers

- See the `pnpm-workspace` skill for workspace structure, TypeScript setup, and package details
