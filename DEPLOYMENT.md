# Deployment

## App root

- This repository is a single Next.js app.
- The app root is the repository root: `.`
- Railway must build from the repo root so it can see `package.json`, `package-lock.json`, `next.config.ts`, `public/`, `content/`, and `src/`.
- Runtime assets needed by the app must live under `public/` or inside tracked source folders. Do not import deploy-time assets from local design folders like `images, logos, favicon, etc/`.

## Package manager and Node version

- Package manager: `npm`
- Lockfile: `package-lock.json`
- Node version: `22.x`
- Local version hint: `.nvmrc`

## Build and start commands

- Install: `npm ci`
- Build: `npm run build`
- Start: `npm run start`
- Dev: `npm run dev`

The app uses Next.js' production server, which reads Railway's `PORT` environment variable automatically.

## Railway expectations

- Use the GitHub integration, not `railway up`, for normal deploys.
- Set the service Root Directory to blank or `.`.
- Do not set the Root Directory to `/` or another folder.
- Railway should detect the root `package.json` and use the committed `package-lock.json`.
- `railway.json` pins the builder and deploy commands so remote builds do not depend on local CLI behavior.

## Required environment variables

- `NEXT_PUBLIC_SITE_URL`
- `NEXT_PUBLIC_WHATSAPP_NUMBER`
- `NEXT_PUBLIC_INSTAGRAM_URL`
- `NEXT_PUBLIC_CONTACT_EMAIL`
- `NEXT_PUBLIC_OPENING_HOURS`
- `LEAD_WEBHOOK_URL`
- `LEAD_WEBHOOK_SECRET`

Optional server-side values used by current features:

- `DATABASE_URL`
- `ADMIN_PASSWORD`
- `ADMIN_SESSION_SECRET`

## Clean clone validation

From a fresh clone, this should work with committed files only:

```bash
nvm use
npm ci
npm run build
PORT=3000 npm run start
```

## Git hygiene

Ignored locally and for CLI uploads:

- `node_modules/`
- `.next/`
- `dist/`, `build/`, `out/`
- caches and tsbuildinfo files
- local env files
- temp files

If generated files were ever committed before, remove them from the index once:

```bash
git rm -r --cached node_modules .next dist build out coverage
git rm --cached *.tsbuildinfo .eslintcache
git commit -m "Remove generated files from git"
```
