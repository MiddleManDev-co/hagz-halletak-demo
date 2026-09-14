# MATRAH | مَطرح — المطرح الصح، في المعاد الصح

MATRAH is an Egyptian venue marketplace + lightweight venue operating system.

The launch product is intentionally narrower than the full product vision:

**Customer:** search → credible availability → venue detail → request-to-book / visit → quote → confirmed booking.

**Venue:** join free → get verified → maintain availability → receive qualified enquiries → manage leads/visits/bookings → pay a small success commission only when a platform-sourced booking is confirmed.

> This repository is an interactive front-end product demo. All bookings, availability, commission figures, payments, analytics and operational actions are simulated.

## Pilot business model

### Customer
- Free to use.
- Search by date, area, guest count and budget.
- See verified venues and availability context.
- Request a booking or venue visit.
- Receive a venue response / quote.
- Confirm the booking after paying the venue directly.

### Venue
- Free listing/onboarding during the pilot.
- No mandatory monthly or annual subscription at launch.
- Success commission only on a confirmed platform-sourced booking.
- The commission rule is configurable/versioned; the demo does not define a permanent commercial percentage.
- VenueOS Lite provides the calendar, leads, visits, bookings and commission statement needed for the pilot.

### Payment model during pilot
Customer payments and deposits go directly to the venue. MATRAH does **not** need to hold the full booking value during the pilot.

Online deposit collection, hard atomic holds, automated refunds, settlement and venue payouts are post-MVP capabilities that become worthwhile after transaction volume validates the need.

## Default demo story

1. Open Home and enter date / area / guest count / budget.
2. Explore availability-first venue results.
3. Open Royal Garden.
4. Send a Request-to-Book instead of creating a hard hold.
5. Review the venue response and final quote.
6. Simulate a direct deposit to the venue.
7. Confirm booking `MTR-2031` from both customer and venue sides.
8. Open VenueOS Lite to see the lead, visit, booking and commission state.
9. Open Admin/Ops to see verification, stale-availability follow-up, attribution and commission reconciliation.
10. Explore the remaining advanced screens as **Future Vision**.

## Pilot product scope

### Trusted supply
- Venue onboarding and curation.
- Venue verification.
- Halls, capacities, packages and price context.
- Availability per hall/date.
- Online + offline calendar inventory.
- Availability freshness policy.
- Stale inventory monitoring.

### Customer marketplace
- Search by date, area, guest count and budget.
- Availability-first results.
- Verified venue model.
- Venue details, gallery, amenities and package context.
- Basic filters, comparison and shortlist.
- Request-to-Book.
- Venue visit scheduling.
- Quote / response flow.
- Booking confirmation and history.

### VenueOS Lite
- Overview of pending leads, visits and bookings.
- Unified calendar.
- Lead inbox / pipeline.
- Visit schedule.
- Booking list and detail.
- Record direct deposit received as information.
- Commission due / paid / waived / disputed states.
- Basic staff access.

### Admin / Ops
- Venue verification queue.
- Availability freshness queue.
- Customer / venue / lead / booking lookup.
- Booking source attribution.
- Commission reconciliation.
- Support notes and basic dispute handling.
- Venue suspension.
- Audit trail.

### Pilot analytics
- Search submitted / zero results.
- Venue detail viewed.
- Enquiry created.
- Venue responded.
- Visit requested / completed.
- Quote accepted.
- Booking confirmed / cancelled.
- Availability freshness / mismatch.
- Confirmed GMV.
- Commission receivable / collected.

## Future Vision — intentionally not launch blockers

The demo still contains the broader product concept, but these capabilities should be prioritized only when real data proves the need:

- Flexible dates and waitlist.
- DateDrop / last-minute inventory.
- Reverse marketplace.
- Family shortlist / voting.
- Advanced reviews and promotions.
- Online deposit and hard holds.
- Automated refunds and payouts.
- Venue subscriptions and hybrid monetization.
- Dynamic pricing.
- Full P&L / cash flow / receivables.
- Revenue intelligence and Action Center.
- Marketplace health / demand heatmaps / area economics.
- 360 customer tours and content-quality tooling.
- Pricing / strategic simulators.
- AI recommendations, forecasting and churn prediction.

## Monetization evolution

### Stage 1 — Pilot
- Customer: free.
- Venue listing: free.
- Revenue: small success commission only.

### Stage 2 — Validated marketplace
Test a hybrid model once VenueOS creates recurring standalone value:
- Starter: no subscription + higher success commission.
- VenueOS Pro: monthly/annual subscription + lower commission + richer operating tools.
- Growth/Premium: higher subscription, lower commission, automation, analytics and promotional tooling.

Verification must never be purchasable. It is a trust mechanism, not an advertising product.

## Launch strategy

Start with one dense Cairo cluster and a curated founding cohort rather than broad geographic coverage.

Current hypothesis to validate:
- Primary candidate: New Cairo.
- Secondary candidate: Sheikh Zayed / 6th of October.
- Target 20–30 verified, availability-active venues before scaling paid customer acquisition.

Manual founder/ops-assisted onboarding and availability follow-up are acceptable during the pilot because they accelerate learning.

## Demo routes

Routes are locale-prefixed (`/ar/...` and `/en/...`).

### Pilot routes
- `/ar/`
- `/ar/explore`
- `/ar/venue/royal-garden`
- `/ar/pilot/request/royal-garden`
- `/ar/pilot/quote/royal-garden`
- `/ar/pilot/confirmed`
- `/ar/pilot/commission`
- `/ar/pilot/ops`

### Existing customer / VenueOS / Admin / Investor vision routes
The original advanced demo routes remain available for product exploration and are marked as Future Vision where appropriate.

### Legacy hash links
The pre-migration hash URLs (`#/venue/royal-garden`, `?tour=full#/home`) still work:
they are mapped onto the equivalent route on first paint, so previously shared links
keep resolving.

## Languages and responsive behavior
- Arabic RTL.
- English LTR.
- Language preference persistence.
- Desktop, laptop, tablet and mobile layouts.
- Keyboard focus indicators.
- Skip-to-content support.
- `prefers-reduced-motion` handling.

## Stack
- Next.js 16 (App Router), React 19, TypeScript.
- Tailwind CSS v4.
- `next-intl` with Arabic and English message catalogs and `[locale]` routing.
- Static export (`output: 'export'`) served from GitHub Pages under `/hagz-halletak-demo`.
- `localStorage` for demo state (persona, shortlist, guided-tour position).

Because the site is a static export there is no server at runtime: no Server Actions,
route handlers, or image optimization. Every screen is prerendered at build time and all
interactivity is client-side. No production backend, database, authentication or payment
gateway exists in this repository.

## Development

```bash
npm install
npm run dev          # http://localhost:3000/hagz-halletak-demo/ar
npm run build        # static export into out/
npm run serve        # serve out/ the way GitHub Pages does
```

| Command | Purpose |
|---|---|
| `npm run typecheck` | TypeScript, no emit |
| `npm run lint` | ESLint (`next lint` was removed in Next.js 16) |
| `npm test` | Vitest — catalog parity, message-key usage, route coverage |
| `npm run e2e` | Playwright — demo story, tours, persona navigation |

## Validation
CI runs typecheck, lint, unit tests, the production build, and the Playwright suite
before deploying. The end-to-end tests run against the built `out/` directory through
`scripts/serve-export.mjs`, which mirrors the GitHub Pages basePath mount, so
`basePath`/`trailingSlash` regressions fail in CI rather than after a deploy.

Language rules and their enforcement are documented in `STRICT-LOCALE-V2.md`.
