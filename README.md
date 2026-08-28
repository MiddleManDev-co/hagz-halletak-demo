# Dawwar — دوّر على القاعة المناسبة والمتاحة فعلًا

Dawwar is an Egyptian venue marketplace + lightweight venue operating system.

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
Customer payments and deposits go directly to the venue. Dawwar does **not** need to hold the full booking value during the pilot.

Online deposit collection, hard atomic holds, automated refunds, settlement and venue payouts are post-MVP capabilities that become worthwhile after transaction volume validates the need.

## Default demo story

1. Open Home and enter date / area / guest count / budget.
2. Explore availability-first venue results.
3. Open Royal Garden.
4. Send a Request-to-Book instead of creating a hard hold.
5. Review the venue response and final quote.
6. Simulate a direct deposit to the venue.
7. Confirm booking `DWR-2031` from both customer and venue sides.
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

### Pilot routes
- `#/home`
- `#/explore`
- `#/venue/royal-garden`
- `#/pilot/request/royal-garden`
- `#/pilot/quote/royal-garden`
- `#/pilot/confirmed`
- `#/pilot/commission`
- `#/pilot/ops`

### Existing customer / VenueOS / Admin / Investor vision routes
The original advanced demo routes remain available for product exploration and are marked as Future Vision where appropriate.

## Languages and responsive behavior
- Arabic RTL.
- English LTR.
- Language preference persistence.
- Desktop, laptop, tablet and mobile layouts.
- Keyboard focus indicators.
- Skip-to-content support.
- `prefers-reduced-motion` handling.

## Stack
- Semantic HTML5.
- Vanilla CSS.
- Vanilla JavaScript.
- Hash-based client-side routing.
- `localStorage` for demo state.
- GitHub Pages deployment.

No production backend, database, authentication or payment gateway exists in this repository.

## Validation
GitHub Pages CI validates JavaScript syntax, bilingual behavior, route/file integrity, guided-demo layers, responsive behavior, the 360/BI vision layers and the Dawwar pilot presentation layer before deployment.
