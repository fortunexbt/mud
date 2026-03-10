# MUD Escola de Ceramica

Production-ready multilingual website for MUD Escola de Ceramica, built with Next.js App Router, TypeScript, and Tailwind CSS.

## Stack

- Next.js 16 + App Router
- TypeScript
- Tailwind CSS
- Route-based i18n with `pt`, `es`, and `en`
- Markdown blog content with localized posts
- SEO metadata, sitemap, robots, JSON-LD, and hreflang support

## Project structure

- `src/app` - app routes, metadata routes, API route, and localized page entrypoint
- `src/components` - page sections, cards, forms, layout, and UI primitives
- `src/content/site` - localized page copy and SEO strings
- `src/lib` - routing, blog loading, metadata, forms, WhatsApp helpers, utilities
- `content/blog` - localized markdown posts by locale
- `src/assets` - logo variants and reused brand/source assets from the workspace

## Local development

1. Install dependencies

```bash
npm install
```

2. Copy environment variables

```bash
cp .env.example .env.local
```

3. Start the dev server

```bash
npm run dev
```

4. Open `http://localhost:3000`

The middleware redirects root visits to `/pt`, `/es`, or `/en` using cookie + browser locale + country hints.

## Available scripts

```bash
npm run dev
npm run build
npm run start
npm run lint
npm run typecheck
```

## Environment variables

- `NEXT_PUBLIC_SITE_URL` - canonical base URL for metadata, sitemap, and hreflang
- `NEXT_PUBLIC_WHATSAPP_NUMBER` - WhatsApp number used for `wa.me` CTAs
- `NEXT_PUBLIC_INSTAGRAM_URL` - Instagram profile URL
- `NEXT_PUBLIC_CONTACT_EMAIL` - institutional email shown in footer/contact
- `NEXT_PUBLIC_OPENING_HOURS` - optional hours string for future display
- `LEAD_WEBHOOK_URL` - webhook destination for form submissions
- `LEAD_WEBHOOK_SECRET` - optional bearer token for the webhook

If `LEAD_WEBHOOK_URL` is not set, the forms stay usable in the UI but clearly surface that automatic delivery still needs configuration.

## Content editing

### Page copy

Edit localized content in:

- `src/content/site/pt.ts`
- `src/content/site/es.ts`
- `src/content/site/en.ts`

This is where navigation labels, page copy, form labels, and SEO strings live.

### Blog posts

Localized blog posts live in:

- `content/blog/pt`
- `content/blog/es`
- `content/blog/en`

Each post is a Markdown file with frontmatter:

```md
---
title: "Post title"
excerpt: "Short description"
publishedAt: "2026-03-09"
category: "Category"
translationKey: "shared-key-across-locales"
cover: "heroProcess"
---
```

Notes:

- `slug` comes from the filename
- `translationKey` should match across `pt`, `es`, and `en` versions of the same article
- `cover` must match a key from `src/lib/media.ts`

## Brand and assets

The new interface derives its palette and imagery from the provided MUD logo family and available source assets already found in the working directory.

Primary assets currently reused:

- main logo and alternate color variants
- favicon set
- identity moodboard image
- legacy photography/screenshots cropped into editorial image blocks

## Lead capture integration

The frontend sends form submissions to `POST /api/leads`.

Behavior:

- validates payloads with Zod
- captures UTM data and referrer info
- includes a honeypot field (`company`)
- forwards to `LEAD_WEBHOOK_URL` when configured
- returns `503` with a clear UI message when webhook delivery is not configured yet

To connect email, CRM, or automation later, point `LEAD_WEBHOOK_URL` to your handler and map the payload there.

## SEO and metadata

Included foundations:

- localized metadata per route
- canonical + hreflang support
- `robots.txt`
- `sitemap.xml`
- organization, breadcrumb, blog posting, and FAQ JSON-LD
- localized blog URLs and metadata

## Architecture decisions

- One localized catch-all page route handles all page slugs by locale while keeping clean translated URLs.
- Copy is centralized in typed dictionaries instead of hardcoding text inside components.
- WhatsApp messaging is centralized in `src/lib/whatsapp.ts` with localized prefilled messages.
- Form delivery is abstracted behind `src/app/api/leads/route.ts` for future CRM/email/webhook wiring.
- Blog content stays flat and maintainable with Markdown files instead of a heavier CMS.

## Known business-data TODOs

These are intentionally configurable rather than invented in the UI:

- institutional email
- opening hours
- exact schedules by class type
- pricing
- confirmed availability and operating model for corporate/group offers
- whether tourist-style experiences are officially active

## Verification

The current project has been verified with:

```bash
npm run typecheck
npm run lint
npm run build
```
