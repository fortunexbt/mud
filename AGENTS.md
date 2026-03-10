# AGENTS.md
This file guides coding agents working in this repository.

## Project
- Stack: Next.js 16 App Router, React 19, TypeScript 5, Tailwind CSS 3, Zod.
- App type: multilingual marketing site for MUD Escola de Ceramica.
- Main code lives in `src/app`, `src/components`, `src/content`, `src/lib`, and `src/config`.
- Path alias: `@/*` maps to `src/*`.
- Supported locales: `pt`, `es`, `en`.
- Default locale: `pt`.

## Repo-Specific Rules
- No repository Cursor rules were found in `.cursor/rules/`.
- No `.cursorrules` file was found.
- No Copilot instructions file was found at `.github/copilot-instructions.md`.
- If any of those files appear later, treat them as higher-priority repo instructions.

## Commands
- Install dependencies: `npm install`
- Start dev server: `npm run dev`
- Build production app: `npm run build`
- Start production server: `npm run start`
- Lint all code: `npm run lint`
- Type-check: `npm run typecheck`

## Validation Notes
- `npm run lint` works as-is.
- `npm run build` works and also performs Next.js production type validation.
- In a fresh checkout, `npm run typecheck` can fail until `.next/types` exists.
- If typecheck fails with missing `.next/types/*`, run `npm run build` or `npm run dev` first, then rerun `npm run typecheck`.

## Tests
- There is currently no configured test runner.
- `package.json` has no `test` script.
- No test files were found under `src/`.
- There is no supported single-test command today.
- For validation, use `npm run lint`, `npm run build`, and `npm run typecheck`.

## Targeted Commands
- Lint one file: `npx eslint src/components/ui/button.tsx`
- Lint multiple files: `npx eslint src/app/api/leads/route.ts src/lib/forms.ts`
- There is no project-provided single-test command because tests are not configured.
- There is no project-provided single-file TypeScript check; use full `npm run typecheck` after `.next/types` is generated.

## Environment Variables
- `NEXT_PUBLIC_SITE_URL`
- `NEXT_PUBLIC_WHATSAPP_NUMBER`
- `NEXT_PUBLIC_INSTAGRAM_URL`
- `NEXT_PUBLIC_CONTACT_EMAIL`
- `NEXT_PUBLIC_OPENING_HOURS`
- `LEAD_WEBHOOK_URL`
- `LEAD_WEBHOOK_SECRET`
- Public client-safe values use the `NEXT_PUBLIC_` prefix.
- Do not hardcode secrets.
- Lead routing depends on `LEAD_WEBHOOK_URL` and optionally `LEAD_WEBHOOK_SECRET`.

## Structure
- `src/app`: App Router entrypoints, layout, localized pages, API route, metadata files.
- `src/components`: UI primitives, site chrome, cards, forms, page sections.
- `src/content/site`: locale dictionaries and shared dictionary types.
- `src/lib`: routing, blog loading, metadata, structured data, utilities, validation.
- `src/config`: site-wide config and env-backed constants.
- `public`: icons and static assets.

## Imports
- Use double quotes.
- Use semicolons.
- Order imports as: framework/external, blank line, `@/` imports, blank line, side-effect imports like CSS.
- Prefer `import type` for type-only imports.
- Prefer `@/` alias imports over long relative paths.
- Keep import lists stable and reasonably sorted.

## TypeScript
- The repo uses `strict` mode; avoid `any`.
- Prefer explicit unions and literal types for constrained values.
- Use `as const` for locale arrays, option lists, and route dictionaries.
- Use `satisfies` when checking object shape without widening.
- Use `interface` for exported shared object shapes.
- Use `type` for unions, derived types, and local aliases.
- Reuse existing types such as `Locale`, `PageKey`, `SiteDictionary`, and `LeadInput`.
- Type component props explicitly.

## Naming
- Components and exported React helpers use PascalCase.
- Functions and variables use camelCase.
- String union members use concise lowerCamelCase values like `oneOff`.
- Prefer descriptive names like `resolveRoute`, `getLocalizedPath`, and `buildMetadata`.
- Avoid abbreviations unless they are already established.

## React And Next.js
- Default to server components; add `"use client"` only when hooks or browser APIs are required.
- Use `next/link` for internal navigation.
- Use `next/font/google` patterns already established in `src/app/layout.tsx`.
- Keep metadata centralized through existing helpers.
- Use `notFound()` for missing localized routes or missing content.
- Keep `generateStaticParams()` aligned with all locales.
- Preserve the current localized routing model in `src/lib/routes.ts`.

## Internationalization
- New user-facing copy usually needs `pt`, `es`, and `en` entries.
- Keep dictionary shape changes synchronized across `src/content/site/pt.ts`, `src/content/site/es.ts`, and `src/content/site/en.ts`.
- Update `src/content/site/types.ts` whenever dictionary structure changes.
- Keep route changes synchronized with `src/lib/routes.ts` and navigation helpers.
- Avoid shipping one locale with missing keys unless the task explicitly allows it.

## Styling
- Styling is primarily Tailwind utility classes in JSX.
- Reuse tokens from `src/app/globals.css` and `tailwind.config.ts`.
- Prefer semantic tokens like `bg-background`, `text-ink`, `border-outline`, `text-muted`, `font-body`, and `font-display`.
- Reuse shared helpers like `cn()` and `buttonClasses()` instead of duplicating class logic.
- Preserve the warm, editorial, handcrafted aesthetic already present in the site.
- Add global CSS only for true app-wide behavior.

## Formatting
- Follow the existing formatter style already present in the repo.
- Keep JSX and object literals multiline when expressions get dense.
- Keep readable line breaks over compressed one-liners for non-trivial logic.
- Accept trailing commas where the formatter would place them.
- Keep files ASCII unless the file already contains locale-specific accented copy.

## Validation And Forms
- Validate incoming form data with Zod.
- Prefer `safeParse()` for request and payload validation.
- Derive TS types from schemas with `z.infer` when useful.
- Keep honeypot, consent, and UTM handling intact unless requirements change.
- When adding a form field, update the schema, client payload, API route, and localized labels together.

## Error Handling
- Prefer early returns over deeply nested conditionals.
- In API routes, return structured JSON with appropriate HTTP status codes.
- Follow the existing error response shape: `{ ok: false, message: "..." }`.
- Treat configuration failures as user-safe responses, not crashes.
- Use `notFound()` rather than generic exceptions for invalid pages or missing content.

## Shared Logic
- Use `cn()` from `src/lib/utils.ts` for class merging.
- Keep utilities pure where possible.
- Put route, metadata, validation, and content helpers in `src/lib` or `src/config`, not inside page components.
- Avoid duplicating locale lists, route dictionaries, or site config constants.

## When Editing
- Check whether the change affects all three locales.
- Check whether SEO metadata, JSON-LD, sitemap, or navigation also needs an update.
- Run `npm run lint` for most code changes.
- Run `npm run build` for route, metadata, or App Router changes.
- Run `npm run typecheck` after `.next/types` exists if you want an additional TS-only pass.

## Known Quirks
- `package.json` has no `test` script.
- `package.json` currently contains a duplicated `@tailwindcss/typography` entry in `devDependencies`; avoid adding more dependency duplication.
- Standalone `tsc --noEmit` depends on generated Next.js type artifacts under `.next/types`.

## Good Defaults
- Make the smallest change that fully solves the request.
- Preserve existing naming, file placement, and route patterns.
- Extend existing helpers before adding parallel abstractions.
- Keep UI behavior and copy consistent across locales.
- When an agent finishes requested code changes, it should commit and push them unless the user explicitly says not to or a remote/push is not available.
