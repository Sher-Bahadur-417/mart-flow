# MartFlow

Production-ready mart management system. Stack: Next.js 16, React 19, TypeScript, Tailwind CSS v4, shadcn/ui (Base UI), Prisma 6, and PostgreSQL.

Money is stored as `Decimal(14,2)`. Quantities are `Decimal(14,3)`. Stock only changes through inventory movements. Khata balances are computed from transactions and are never overwritten.

## Requirements

- Node.js 20+
- npm
- Docker Desktop (recommended) **or** a local PostgreSQL 16 instance

## Setup

```bash
npm install
copy .env.example .env
```

Set `SESSION_SECRET` in `.env` to a random string of at least 32 characters:

```bash
node -e "console.log(require('crypto').randomBytes(32).toString('base64'))"
```

Start PostgreSQL, then apply migrations (auth, commerce, and employee management) and seed:

```bash
npm run db:up
npx prisma migrate deploy
npm run db:seed
npm run dev
```

If you prefer Prisma's interactive migrate:

```bash
npx prisma migrate dev
```

On macOS/Linux use `cp .env.example .env`. If PostgreSQL is already running, skip `db:up` and point `DATABASE_URL` at that instance.

If `prisma generate` fails with `EPERM` on Windows, stop `next dev` first. The query engine DLL is locked while the app is running.

Open [http://localhost:3000](http://localhost:3000). Unauthenticated visitors are sent to `/login`.

## Seeded accounts

Password is `SEED_USER_PASSWORD` (default `ChangeMe!123`).

| Email | Username | Role |
| --- | --- | --- |
| admin@martflow.local | admin | Super Admin |
| owner@martflow.local | owner | Owner |
| manager@martflow.local | manager | Manager |
| cashier@martflow.local | cashier | Cashier |
| inventory@martflow.local | inventory | Inventory Staff |
| accountant@martflow.local | accountant | Accountant |

The seed also creates categories, units, six products with opening stock, a credit customer, a supplier, and expense categories so POS can be used immediately.

Cashier can open POS, sales, and customers, but not products or settings. Accountant can open expenses and reports only. Sign in with email or username. Permission checks run on the server, not only in the sidebar.

## Scripts

| Command | Purpose |
| --- | --- |
| `npm run dev` | Next.js development server |
| `npm run build` | Generate Prisma Client, then production build |
| `npm run start` | Serve the production build |
| `npm run lint` | ESLint |
| `npm test` | Permission, employee, money, and inventory unit tests |
| `npm run db:up` | Start PostgreSQL via Docker Compose |
| `npm run db:generate` | Generate Prisma Client |
| `npm run db:migrate` | Create/apply Prisma migrations |
| `npm run db:push` | Push schema without a migration file |
| `npm run db:seed` | Seed roles, users, catalog, and demo stock |
| `npm run db:studio` | Open Prisma Studio |

## Environment

```
DATABASE_URL="postgresql://martflow:martflow@localhost:5432/martflow?schema=public"
NEXT_PUBLIC_APP_NAME="MartFlow"
SESSION_SECRET="replace-with-a-long-random-string-at-least-32-chars"
SEED_USER_PASSWORD="ChangeMe!123"
```

Do not commit `.env`.

## Modules

- Auth, roles, and httpOnly sessions
- Products, categories, barcodes, inventory movements
- POS (search, cart, cash/card/credit, hold/resume, F2/F4/F8/F9)
- Sales, returns, receipts (80mm print)
- Purchases: DRAFT → ORDERED → RECEIVED (stock in) → COMPLETED
- Customers, suppliers, khata (computed outstanding/payable)
- Expenses, dashboard, reports, CSV export
- Employees, notifications, audit log

## Business rules

- Payments on checkout must equal the sale total
- Credit sales require a customer and respect credit limits
- Receiving a purchase is the only purchase step that increases stock
- Profit = revenue − COGS − expenses
- Sale line items snapshot name, SKU, unit price, and cost price
