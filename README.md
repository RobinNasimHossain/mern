# Shoreline Bank — MERN Banking App

A real-world-style banking application built on the MERN stack (MongoDB,
Express, React, Node.js). Designed as a reusable foundation for any
future MERN project that needs authentication, money movement, and a
clean, production-leaning structure.

## Features

- **JWT authentication** — register / login / `/me`, bcrypt-hashed passwords,
  rate-limited auth routes.
- **Multi-account banking** — each user starts with a primary checking
  account and can open additional checking or savings accounts with
  generated 10-digit account numbers.
- **Money movement** — deposits, withdrawals, and transfers to any
  Shoreline Bank account number. Balances are stored in integer cents
  and updated with atomic `findOneAndUpdate` + conditional `$gte`
  guards so accounts can never go negative under concurrency. Failed
  credits are automatically compensated to keep balances consistent.
- **Transaction history** — every movement logs a ledger entry with the
  post-transaction balance and a shared reference for matched
  `transfer_in` / `transfer_out` pairs.
- **React 18 + Vite + Tailwind UI** — dashboard, per-account detail,
  deposit/withdraw/transfer forms, protected routes, persistent auth
  via `localStorage`, and a Vite dev proxy to the API.

## Project structure

```
mern/
├── server/                # Express + Mongoose API
│   ├── src/
│   │   ├── app.js         # Express app factory
│   │   ├── index.js       # Entry point (connects DB, starts server)
│   │   ├── config.js      # Env-driven configuration
│   │   ├── db.js          # Mongoose connection helper
│   │   ├── models/        # User, Account, Transaction
│   │   ├── routes/        # auth, accounts, transactions
│   │   ├── middleware/    # auth, error handling
│   │   └── utils/         # money / account number helpers
│   ├── .env.example
│   └── package.json
├── client/                # React 18 + Vite + Tailwind app
│   ├── src/
│   │   ├── pages/         # Login, Register, Dashboard, AccountDetail, Deposit, Withdraw, Transfer
│   │   ├── components/    # Navbar, AccountCard, TransactionList, ProtectedRoute
│   │   ├── context/       # AuthContext
│   │   ├── api.js         # Axios client + helpers
│   │   └── ...
│   └── package.json
└── package.json           # Root orchestrator scripts
```

## Prerequisites

- Node.js 18+
- MongoDB running locally (default: `mongodb://127.0.0.1:27017/mern_banking`)

## Quick start

```bash
# 1. Install dependencies for both server and client
npm run install:all

# 2. Create a .env file for the server
cp server/.env.example server/.env
# (edit JWT_SECRET, MONGODB_URI, etc. as needed)

# 3. (Optional) seed a demo user: demo@example.com / password123
npm --prefix server run seed

# 4. Start the API (port 4000)
npm run dev:server

# 5. In another terminal, start the web app (port 5173)
npm run dev:client
```

Open `http://localhost:5173`, register an account, and start moving money.

## Environment variables (server)

| Variable         | Default                                    | Notes                                       |
| ---------------- | ------------------------------------------ | ------------------------------------------- |
| `PORT`           | `4000`                                     | API port                                    |
| `MONGODB_URI`    | `mongodb://127.0.0.1:27017/mern_banking`   | Mongo connection string                     |
| `JWT_SECRET`     | _required_                                 | Use a long random string in production      |
| `JWT_EXPIRES_IN` | `7d`                                       | Any ms / vercel-ms style expression         |
| `CLIENT_ORIGIN`  | `http://localhost:5173`                    | Allowed CORS origin (`*` to allow any)      |

## API overview

All money amounts in request bodies are decimal dollars (e.g. `12.34`);
the server stores and returns amounts in both `amountCents` and a
convenience `amount` field.

### Auth

- `POST /api/auth/register` — `{ name, email, password }` → `{ token, user, account }`
- `POST /api/auth/login` — `{ email, password }` → `{ token, user }`
- `GET  /api/auth/me` — requires Bearer token → `{ user }`

### Accounts (all require Bearer token)

- `GET  /api/accounts` — list the caller's accounts
- `POST /api/accounts` — `{ type: "checking"|"savings", name }`
- `GET  /api/accounts/:id` — account detail
- `GET  /api/accounts/:id/transactions?limit=25&before=ISO` — paginated history

### Transactions (all require Bearer token)

- `POST /api/transactions/deposit` — `{ accountId, amount, description? }`
- `POST /api/transactions/withdraw` — `{ accountId, amount, description? }`
- `POST /api/transactions/transfer` — `{ fromAccountId, toAccountNumber, amount, description? }`

## Scripts

| Script                        | What it does                              |
| ----------------------------- | ----------------------------------------- |
| `npm run install:all`         | Install server + client dependencies      |
| `npm run dev:server`          | Run the API with nodemon                  |
| `npm run dev:client`          | Run the Vite dev server                   |
| `npm --prefix server run seed`| Reset + seed demo data                    |
| `npm run lint`                | ESLint the client                         |
| `npm run build`               | Build the client for production           |

## Notes on correctness

- Balances are stored as **integer cents** (`balanceCents`) to avoid
  floating-point drift.
- Withdrawals use a conditional `findOneAndUpdate` with
  `balanceCents: { $gte: amountCents }` so the operation is atomic and
  cannot oversell a balance under concurrency.
- Transfers debit the source first, then credit the destination; a
  credit failure triggers a compensating refund so the source account
  is restored. Matched `transfer_out` / `transfer_in` ledger entries
  share a `reference`.
