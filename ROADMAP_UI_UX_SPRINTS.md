# UI/UX Sprint Roadmap

This document is the working roadmap for the next coding agents improving the MUD website.

It reflects the current state of the product after the initial redesign passes and should be treated as the source of truth for follow-up UI/UX work.

## Current status

The site is functional and deployable, but the UX is not yet in a final or polished state.

Main unresolved issues:

- too many buttons and competing actions across header, cards, sections, and footer
- weak hierarchy between primary, secondary, and tertiary actions
- some text is too light or too dense to scan comfortably
- header logo is still not readable enough at a glance
- footer is too tall and still repeats information unnecessarily
- several pages still feel like stacked brochure modules instead of focused journeys
- desktop and mobile are both improved, but neither is fully refined
- component styles are not yet normalized into a disciplined system
- content duplication still exists across home, classes, about, team, contact, and inquiry

Operational realities already confirmed:

- the current form is not production-ready as a durable lead system
- `LEAD_WEBHOOK_URL` and `LEAD_WEBHOOK_SECRET` were missing in Railway at audit time
- `NEXT_PUBLIC_CONTACT_EMAIL` and `NEXT_PUBLIC_OPENING_HOURS` were also missing at audit time
- no Railway Postgres integration is currently wired into the app
- no Railway volume is currently in use, and a volume is not the right substitute for a lead database
- the site can become a brochure launch before it becomes a fully operational lead-capture launch

This means the project is in the middle of a UX refinement cycle, not the end.

## Delivery rules for future agents

Any agent continuing this work should follow these rules:

1. Work one sprint at a time.
2. Do not combine major IA changes, copy rewrites, and design system rewrites into one uncontrolled pass.
3. Prefer simplifying and removing before adding.
4. Preserve the warm earthy MUD identity unless explicitly told to rebrand.
5. Always validate changes with:

```bash
npm run lint
npm run typecheck
npm run build
```

6. Always capture before/after screenshots for at least:

- `/en`
- `/en/classes`
- `/en/enroll`
- `/en/contact`

7. If changing shared UI, check at least one desktop and one mobile view.
8. If changing copy structure, verify all locale files still compile and render.

## Sprint 0 - Baseline Audit And Freeze

### Goal

Create a shared understanding of what stays, what gets simplified, and what gets removed.

### Problems being solved

- no strict page-by-page hierarchy map
- too much overlap between content, navigation, and conversion patterns
- decisions are being made component-first instead of journey-first

### Files to inspect

- `src/components/pages/home-page.tsx`
- `src/components/pages/classes-page.tsx`
- `src/components/pages/inquiry-page.tsx`
- `src/components/pages/contact-page.tsx`
- `src/components/pages/about-page.tsx`
- `src/components/pages/team-page.tsx`
- `src/components/site/site-header.tsx`
- `src/components/site/mobile-nav.tsx`
- `src/components/site/site-footer.tsx`
- `src/components/ui/button.tsx`
- `src/components/ui/section-heading.tsx`
- `src/content/site/en.ts`
- `src/content/site/pt.ts`
- `src/content/site/es.ts`

### Tasks

- inventory every CTA on every main page
- identify the single primary intent for each page
- identify all repeated content themes across pages
- mark each section as `keep`, `simplify`, `merge`, or `remove`
- identify which design tokens are effectively in use vs one-off utility styling

### Deliverables

- CTA inventory table
- page intent map
- section decision map
- design token inconsistency list

### Acceptance criteria

- every main page has one clear primary user action
- every section has an explicit status
- duplicated content themes are documented

## Sprint 1 - Header, Navigation, Footer

### Goal

Make the global chrome much easier to understand and reduce cognitive load.

### Problems being solved

- header has too many equal-priority elements
- logo readability is weak
- locale switcher and CTAs compete with navigation
- footer is too tall and too repetitive

### Files

- `src/components/site/site-header.tsx`
- `src/components/site/mobile-nav.tsx`
- `src/components/site/mobile-dock.tsx`
- `src/components/site/site-footer.tsx`
- `src/components/site/site-frame.tsx`
- `src/components/ui/button.tsx`

### Tasks

- make the logo larger, darker, or placed on a more readable background
- reduce desktop header to one primary CTA and one secondary action max
- simplify locale switcher presentation
- review whether `Send inquiry` belongs in the header on desktop
- restructure footer into compact, non-redundant groups
- reduce footer vertical height on both desktop and mobile
- remove duplicate contact info or duplicate nav content from footer
- ensure mobile dock and top nav do not duplicate the same jobs unnecessarily

### Acceptance criteria

- header has one obvious primary action
- logo is readable at a glance on desktop and mobile
- footer is significantly shorter vertically
- footer content is grouped by usefulness, not by arbitrary symmetry

## Sprint 2 - Design System Normalization

### Goal

Create a more disciplined visual system that makes the interface easier to digest.

### Problems being solved

- too many button treatments and emphasis levels
- inconsistent spacing rhythm
- body text can feel low-contrast or too airy in places
- cards and containers are visually similar even when they serve different roles

### Files

- `src/app/globals.css`
- `tailwind.config.ts`
- `src/components/ui/button.tsx`
- `src/components/ui/section-heading.tsx`
- `src/components/ui/art-image.tsx`
- `src/components/cards/class-card.tsx`
- `src/components/cards/blog-card.tsx`
- `src/components/cards/team-card.tsx`

### Tasks

- define one clear button hierarchy: primary, secondary, text-only
- tighten body text contrast and line-height where needed
- create predictable section spacing tiers
- reduce radius and shadow variation
- define card roles: informational, navigational, featured, conversion
- ensure headings scale by role rather than one-off page styling

### Acceptance criteria

- shared UI components reflect a consistent system
- body text is easier to read in long paragraphs and cards
- cards no longer all look equally important
- button styles are used consistently across pages

## Sprint 3 - Home Page Information Architecture

### Goal

Turn the home page into a focused landing experience instead of a long stacked brochure.

### Problems being solved

- too many sections compete for attention
- repeated messaging about pedagogy, studio values, and team proximity
- too many buttons in sequence
- the user journey is not strict enough

### Files

- `src/components/pages/home-page.tsx`
- `src/components/cards/blog-card.tsx`
- `src/components/cards/class-card.tsx`

### Tasks

- keep the hero but simplify supporting chips and supporting copy
- reduce the number of mid-page promo modules
- merge overlapping about/pedagogy/team preview content
- simplify the special formats block
- simplify blog preview into a lighter editorial teaser
- make the location block a clean close, not another heavy promo band
- review whether the floating foundation card is necessary on desktop

### Acceptance criteria

- home has fewer total sections
- there is one obvious next step above the fold
- total button count is lower
- scroll flow feels intentional instead of repetitive

## Sprint 4 - Classes, Inquiry, Contact Funnel

### Goal

Clarify the enrollment path and reduce decision friction.

### Problems being solved

- `Classes`, `Inquiry`, and `Contact` still overlap too much
- class cards are still denser than necessary
- WhatsApp is promoted repeatedly across multiple layers
- forms still ask for attention in a way that feels heavier than necessary

### Files

- `src/components/pages/classes-page.tsx`
- `src/components/pages/inquiry-page.tsx`
- `src/components/pages/contact-page.tsx`
- `src/components/forms/lead-form.tsx`
- `src/components/cards/class-card.tsx`

### Tasks

- define the job of `Classes`: browse and understand options
- define the job of `Inquiry`: structured lead capture
- define the job of `Contact`: quick channels and location
- simplify class cards further if possible
- reduce repeated CTA prompts to WhatsApp and inquiry
- shorten or restructure the form experience
- ensure optional fields stay optional and visually secondary

### Acceptance criteria

- users are not asked to make the same decision more than once
- `Classes`, `Inquiry`, and `Contact` each serve a distinct purpose
- form flow feels shorter and more digestible

## Sprint 5 - About, Team, Blog Simplification

### Goal

Make supporting pages clearer and reduce narrative repetition.

### Problems being solved

- about and team still repeat themes that appear elsewhere
- team cards remain visually and textually heavy
- blog preview and blog list need stronger scanning behavior

### Files

- `src/components/pages/about-page.tsx`
- `src/components/pages/team-page.tsx`
- `src/components/pages/blog-index-page.tsx`
- `src/components/cards/team-card.tsx`
- `src/components/cards/blog-card.tsx`
- `src/content/site/en.ts`
- `src/content/site/pt.ts`
- `src/content/site/es.ts`

### Tasks

- reduce about story repetition
- tighten founder and team bios
- decide what team detail belongs on cards vs dedicated content
- improve blog card scanability and metadata hierarchy
- remove duplicate brand statements that already appear in the home page or footer

### Acceptance criteria

- each supporting page has a distinct reason to exist
- supporting pages are shorter or easier to scan
- fewer repeated phrases appear across the site

## Sprint 6 - Accessibility And Usability QA

### Goal

Harden the interface and remove hidden quality issues.

### Problems being solved

- possible contrast issues
- inconsistent heading semantics
- possible focus and keyboard issues
- uncertain tap target consistency

### Files

- all files touched in prior sprints

### Tasks

- run a contrast pass across text and controls
- verify heading order page by page
- verify keyboard navigation for header, menus, forms, and footer
- check focus visible states
- check mobile tap target sizes
- verify screen reader labels for interactive elements
- run screenshot QA for desktop and mobile routes

### Acceptance criteria

- no major accessibility regressions remain
- all critical flows are keyboard-usable
- all key pages are visually verified across breakpoints

## Sprint 7 - Conversion Measurement And Post-Launch Refinement

### Goal

Measure whether simplification improves user behavior.

### Problems being solved

- currently there is limited visibility into which CTA patterns actually work
- future design decisions risk being subjective without usage data

### Files

- analytics integration points across `src/app/*` and shared interactive components

### Tasks

- instrument primary CTA clicks
- instrument WhatsApp click sources
- instrument inquiry form start and submit events
- instrument contact page engagement
- optionally A/B test CTA language or order later

### Acceptance criteria

- primary funnel actions are measurable
- the team can compare click behavior before and after major refinements

## Deferred Production Track

This track should remain visible in the roadmap, but it is intentionally secondary while the frontend is still being refined.

### Current truth

- the public site is closer to brochure-ready than lead-ops-ready
- the frontend still needs UX refinement before a full operational launch
- backend lead durability, agent workflows, and CRM routing should not be treated as solved yet

### Production items that are still pending

- durable lead storage behind `POST /api/leads`
- Railway Postgres service and schema for leads/events/conversations
- webhook destination or internal ingestion service for form submissions
- rate limiting and anti-spam protection on the public form endpoint
- contact email configuration in Railway
- opening hours configuration in Railway
- custom production domain and canonical cutover if/when the final domain changes
- health endpoint, monitoring, and stronger post-deploy observability

### Recommended later execution order

1. finish frontend information architecture and visual cleanup
2. lock the business facts shown on the site
3. implement durable lead storage and delivery
4. add internal lead inbox / operational tooling
5. connect agent-assisted drafting only after lead infrastructure is stable

### Notes for future agents

- a Railway volume is not the recommended path for lead handling
- use Railway Postgres for structured, queryable lead data
- keep the public form contract, but change the backend from synchronous webhook passthrough to durable write-first ingestion
- start any agent workflow in human-approval mode, not autonomous send mode

## Immediate backlog for the next coding agent

These are the highest-priority unresolved items right now:

1. Fix header logo readability.
2. Reduce header action count and hierarchy confusion.
3. Compress and reorganize the footer.
4. Reduce total button count across home and classes.
5. Improve text contrast and readability across cards and body copy.
6. Reduce repeated promo modules on the home page.
7. Tighten class card copy density.
8. Clarify the primary action on every page.

## Definition of done for the overall UI/UX cycle

The UI/UX cycle should not be considered done until:

- every page has one clear primary action
- header and footer feel calm and readable
- desktop and mobile both feel intentional, not improvised
- the number of visually prominent buttons is reduced
- text density is manageable on every main page
- duplicate content themes are meaningfully reduced
- shared components reflect a disciplined system
- accessibility and build validation pass

## Recommended handoff format for future agents

When completing a sprint, future agents should report back with:

- what changed
- which files were touched
- what was removed or simplified
- what still feels unresolved
- screenshots reviewed
- validation commands run

This helps keep follow-up work aligned instead of starting a fresh redesign each time.
