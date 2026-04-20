# Deploying Shoreline Bank

## Stack
- **Database:** MongoDB Atlas (free M0 tier)
- **API:** Fly.io (Docker, 256 MB shared-CPU, 2 machines in primary region `iad`)
- **Client:** static Vite build, served from any static host (devinapps.com, Vercel, Netlify, Cloudflare Pages, etc.)

## Prerequisites
1. A MongoDB Atlas connection string with the DB name (e.g. `banking-app`) and no leading/trailing whitespace:
   `mongodb+srv://USER:PASS@cluster.xxxx.mongodb.net/banking-app?retryWrites=true&w=majority`
2. A Fly.io account and [personal access token](https://fly.io/user/personal_access_tokens).
3. [`flyctl`](https://fly.io/docs/flyctl/install/) installed locally.

## Deploy the API (server/)
```bash
cd server
export FLY_API_TOKEN=<your-token>

# one-time: pick a globally unique app name
APP=shoreline-bank-api-$(openssl rand -hex 3)
flyctl apps create "$APP" --org personal
sed -i "s/^app = .*/app = \"$APP\"/" fly.toml

# secrets
flyctl secrets set \
  MONGODB_URI="<atlas-uri>" \
  JWT_SECRET="$(openssl rand -hex 32)" \
  CLIENT_ORIGIN="*"

# deploy
flyctl deploy --remote-only
```

Health check: `curl https://$APP.fly.dev/api/health` → `{"status":"ok",...}`.

Seed a demo user (`demo@example.com` / `password123`) against Atlas:
```bash
MONGODB_URI="<atlas-uri>" JWT_SECRET=seed npm run seed
```

## Build + host the client (client/)
```bash
cd client
VITE_API_URL=https://$APP.fly.dev/api npm run build
# serve client/dist from any static host
```

## Gotchas
- Remove whitespace around the DB name in `MONGODB_URI` — MongoDB rejects namespaces with leading/trailing spaces (`InvalidNamespace` error).
- `CLIENT_ORIGIN=*` opens CORS for demo deploys. In production, set it to the exact client origin (e.g. `https://app.example.com`).
- Atlas Network Access must allow Fly.io outbound IPs. For a quick demo, allow `0.0.0.0/0`; for production, use [private networking](https://www.mongodb.com/docs/atlas/security-vpc-peering/) or an Atlas IP allowlist tied to Fly's regions.
