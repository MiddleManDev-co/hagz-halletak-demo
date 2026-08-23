# Hagz Halletak — حجز هالتك

Large, responsive, bilingual interactive product demo for an Egyptian event-tech concept combining:

- Real-time venue availability marketplace
- Venue discovery, map view, comparison, visits, holds and booking
- Flexible-date search and waitlist
- DateDrop / last-minute inventory
- Reverse marketplace / request offers
- Shared family shortlist
- Customer account, booking lifecycle, messages, alerts and refunds
- Venue management SaaS (`VenueOS`)
- Platform operations, verification, disputes, payouts, reviews and support
- Investor / partner product view

> This repository is intentionally a front-end demo, not a production application. All data, payments, analytics, bookings and operational actions are simulated.

## Live demo

https://middlemandev-co.github.io/hagz-halletak-demo/

## Languages

Use the `عربي / EN` switch in the top navigation.

- Arabic: RTL
- English: LTR
- Language selection persists in `localStorage`
- Dynamically rendered screens react to language changes

## Presentation mode

Use **Demo Map** or **Demo Scenario**. The demo is intentionally organized around four perspectives.

### 1. Customer story

Recommended sequence:

1. Search: `15 Oct 2027 / New Cairo / 300 guests / 100K–180K`
2. Explore availability-first search results
3. Toggle list / Map View
4. Try Flexible Dates
5. Open DateDrop
6. Try Reverse Marketplace / Request Offers
7. Open Royal Garden
8. Check the availability calendar
9. Open the Package Builder and change options
10. Schedule a venue visit
11. Compare venues / Family Shortlist
12. Create a Hold
13. Simulate the EGP 30,000 deposit
14. Confirm booking `HGZ-2031`
15. Open My Account
16. Review Booking Details, Messages, Notifications and Visits
17. Open Cancellation / Refund
18. Open Recovery States to show payment failure, expired holds and unavailable-date recovery

### 2. Venue Owner / VenueOS story

Recommended sequence:

1. Overview KPIs + Calendar Health
2. Calendar — online + offline inventory
3. Quick Booking — create a walk-in / phone booking in under 30 seconds
4. Simulate a booking conflict to demonstrate double-booking prevention
5. Leads CRM
6. Visit Schedule
7. Booking Detail for `HGZ-2031`
8. Record-payment concept
9. DateDrop Manager
10. Packages & Dynamic Pricing
11. Halls & Team permissions
12. Availability Sync status
13. Revenue / occupancy / conversion / lost-demand analytics

### 3. Platform Admin story

Recommended sequence:

1. Platform Overview / GMV / supply gap
2. Venue Operations
3. Verification Queue and document checklist
4. Bookings & Payments
5. Disputes & Refunds with evidence timeline
6. Payouts & Platform Fees
7. Review Moderation
8. Promotions / supply activation
9. Support Operations
10. Marketplace Intelligence / demand heatmap

### 4. Investor / Partner story

Open `#/investor` to show:

- Marketplace + VenueOS + Data flywheel
- Why the concept is more than a venue directory
- Customer acquisition layer
- Supply-retention / SaaS layer
- Data advantage
- Monetization surfaces
- Expected investor questions around stale availability, venue retention, moat and revenue model

All figures on the investor screen are explicitly mock demo metrics, not financial forecasts.

## Customer routes

- `#/home`
- `#/explore`
- `#/map`
- `#/flexible-dates`
- `#/datedrop`
- `#/request-offers`
- `#/venue/royal-garden`
- `#/package-builder/royal-garden`
- `#/compare`
- `#/booking/royal-garden`
- `#/success`
- `#/my-wedding`
- `#/account`
- `#/visits`
- `#/messages`
- `#/notifications`
- `#/booking-details/HGZ-2031`
- `#/refund/HGZ-2031`
- `#/states`

## VenueOS routes

- `#/venue-os/overview`
- `#/venue-os/calendar`
- `#/venue-os/quick-booking`
- `#/venue-os/leads`
- `#/venue-os/visits`
- `#/venue-os/bookings`
- `#/venue-os/booking-detail`
- `#/venue-os/datedrop`
- `#/venue-os/packages`
- `#/venue-os/team`
- `#/venue-os/analytics`

## Admin routes

- `#/admin/overview`
- `#/admin/venues`
- `#/admin/verification`
- `#/admin/bookings`
- `#/admin/disputes`
- `#/admin/payouts`
- `#/admin/reviews`
- `#/admin/promotions`
- `#/admin/support`
- `#/admin/analytics`

## Product / investor routes

- `#/vision`
- `#/investor`

## Major concepts represented

- Real-time availability states
- Verified venue model
- Match score
- Flexible dates
- Waitlist
- DateDrop
- Reverse marketplace
- Map-based discovery
- Shared family shortlist and voting
- Visit scheduling
- Venue messaging
- Package builder
- Hold countdown
- Checkout / deposit simulation
- Booking account and lifecycle
- Cancellation / refund estimate and review timeline
- Payment failed / hold expired / date unavailable recovery states
- VenueOS unified online + offline calendar
- Quick Booking
- Conflict prevention
- Visit operations
- CRM pipeline
- Booking/payment detail
- Packages and dynamic pricing
- Calendar Health Score
- Multiple halls
- Staff permissions
- Availability sync health
- Venue analytics and lost revenue
- Venue verification operations
- Disputes and evidence review
- Payout / platform-fee view
- Review moderation
- Promotions
- Support operations
- GMV metrics
- Demand heatmap
- Supply gap
- Marketplace intelligence
- Investor flywheel / monetization / moat story

## Responsive / accessibility behavior

The demo supports desktop presentation screens, laptops, tablets and phones.

It includes:

- Responsive grid collapse
- Mobile bottom navigation
- Scroll-safe operational tables
- Responsive dashboard layouts
- Responsive map and chat layouts
- Mobile-safe modal / Demo Map
- Arabic RTL and English LTR
- Keyboard focus indicators
- Skip-to-content link
- `prefers-reduced-motion` handling

## Demo state

`localStorage` keeps selected demo state such as language, booking, visits, refund flow and package options.

Use **Reset Demo** from the Demo Map / scenario UI to restore the presentation story.

## Stack

- Semantic HTML5
- Vanilla CSS
- Vanilla JavaScript
- Hash-based client-side routes
- `localStorage` for demo state continuity
- External Unsplash venue imagery
- Alexandria Arabic typeface

No build step, framework, database, backend, API, authentication or real payment integration is required.

## Validation before deployment

GitHub Pages deployment runs automated checks before publishing:

- JavaScript syntax validation
- Arabic / English translation tests
- Demo route and file integrity checks
- Responsive breakpoint checks
- Required static-file linkage checks

Deployment is handled by `.github/workflows/pages.yml`. Every push to `main` publishes the latest passing demo automatically.
