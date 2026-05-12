---
name: testing-mern-app
description: Test the MERN banking app (Shoreline Bank) end-to-end locally. Use when verifying UI or API changes including the Renovation Schedule feature.
---

# Testing the MERN Banking App

## Prerequisites

### Devin Secrets Needed
- `MONGODB_URI` (org-level) — but for local testing, use the local MongoDB instead (see below)

### Environment Setup

1. **Start local MongoDB** (Docker):
   ```bash
   docker start mern-mongo || docker run -d --name mern-mongo -p 27017:27017 mongo:7
   ```

2. **Important: Unset MONGODB_URI before running server or seed commands.**
   The org-level `MONGODB_URI` secret may point to Atlas with an invalid DB name. The `.env` file has the correct local URI (`mongodb://127.0.0.1:27017/mern_banking`), but `dotenv` won't override an existing env var.
   ```bash
   unset MONGODB_URI
   ```

3. **Ensure `.env` exists** in `server/`:
   ```bash
   cp server/.env.example server/.env
   sed -i "s|^JWT_SECRET=.*|JWT_SECRET=dev-$(openssl rand -hex 16)|" server/.env
   ```

4. **Seed demo user:**
   ```bash
   cd /home/ubuntu/repos/mern/server && unset MONGODB_URI && node src/seed.js
   ```
   Creates: `demo@example.com` / `password123`

5. **Start dev servers** (in separate shells, both with `MONGODB_URI` unset):
   ```bash
   # Shell 1 — API server
   cd /home/ubuntu/repos/mern && unset MONGODB_URI && npm run dev:server
   # Express on http://localhost:4000

   # Shell 2 — Frontend
   cd /home/ubuntu/repos/mern && npm run dev:client
   # Vite on http://localhost:5173 (proxies /api to :4000)
   ```

## Navigation Paths

- **Login**: `http://localhost:5173/login`
- **Dashboard**: `/` (after login)
- **Renovation Schedule**: `/renovation` (via Navbar "Renovation" link)
- **Transfer/Deposit/Withdraw**: via respective Navbar links

## Lint & Build Commands

```bash
npm --prefix client run lint     # ESLint
npm --prefix client run build    # Vite production build
node --check server/src/app.js   # Server syntax check
```

## Common Gotchas

- The shell environment may have `MONGODB_URI` set to an Atlas connection string with an invalid namespace (space in DB name). Always `unset MONGODB_URI` before running the server or seed script locally.
- The app uses JWT auth — all API routes except `/api/auth/*` and `/api/health` require a Bearer token.
- The Renovation feature stores data in a `renovations` MongoDB collection with per-user isolation.
