# Hagz Halletak — حجز هالتك

Large interactive product demo for an Egyptian event-tech concept combining:

- Real-time venue availability marketplace
- Venue discovery, comparison, visits, holds and booking
- Shared family shortlist
- Venue management SaaS (`VenueOS`)
- Platform administration and marketplace intelligence

> This repository is intentionally a front-end demo, not a production application. All data, payments, analytics and bookings are simulated.

## Live demo

https://middlemandev-co.github.io/hagz-halletak-demo/

## Recommended presentation flow

Use **Demo Scenario** and walk through one connected story:

1. **Customer**
   - Search: 15 Oct 2027 / New Cairo / 300 guests / 100K–180K
   - Explore available venues
   - Open Royal Garden
   - Check the availability calendar
   - Compare venues
   - Create a 24-hour Hold
   - Simulate the EGP 30,000 deposit
   - Booking `HGZ-2031` becomes confirmed

2. **Venue Owner / VenueOS**
   - Switch to VenueOS
   - See the same booking on the October calendar
   - Review overview KPIs
   - Leads CRM pipeline
   - Booking/payment details
   - Packages and dynamic pricing
   - Revenue, occupancy and lost-demand analytics

3. **Platform Admin**
   - Switch to Admin
   - See the booking reflected in platform booking count and GMV
   - Venue verification / quality view
   - Booking and payment monitoring
   - Demand heatmap and supply-gap intelligence

4. **Product Vision**
   - Problem → product transformation
   - Business model options
   - Expansion from wedding venues to a broader Event Booking Operating System

## Demo routes

### Customer

- `#/home`
- `#/explore`
- `#/venue/royal-garden`
- `#/compare`
- `#/booking/royal-garden`
- `#/success`
- `#/my-wedding`

### VenueOS

- `#/venue-os/overview`
- `#/venue-os/calendar`
- `#/venue-os/leads`
- `#/venue-os/bookings`
- `#/venue-os/packages`
- `#/venue-os/analytics`

### Admin

- `#/admin/overview`
- `#/admin/venues`
- `#/admin/bookings`
- `#/admin/analytics`

### Vision

- `#/vision`

## Included product ideas

- Real-time availability states
- Verified venue badge
- Smart match percentage
- Flexible-date concept
- DateDrop / last-minute deal concept
- Reverse-marketplace concept
- Family shortlist and voting
- Venue comparison
- Visit scheduling simulation
- 24-hour hold countdown
- Checkout and deposit simulation
- Booking lifecycle timeline
- VenueOS overview
- Online + offline calendar concept
- Double-booking prevention concept
- Leads CRM
- Quick booking concept
- Booking/payment management
- Packages and dynamic pricing
- Calendar Health Score
- Venue analytics and lost revenue
- Platform GMV and booking metrics
- Venue verification operations
- Demand heatmap and supply gap
- Marketplace intelligence
- Business model and expansion vision

## Responsive design

The demo is designed for:

- Desktop / presentation screens
- Laptops
- Tablets
- Mobile devices

Responsive behavior includes stacked content, mobile-friendly cards, horizontally scrollable operational tables/calendars where appropriate, and a mobile bottom navigation bar.

## Stack

- Semantic HTML5
- Vanilla CSS
- Vanilla JavaScript
- Hash-based client-side routes
- `localStorage` for demo state continuity
- External Unsplash venue imagery
- Alexandria Arabic typeface

No build step, framework, database, backend, API, authentication or real payment integration is required.

## Reset the demo

To reset the simulated booking/shortlist state, clear this site's browser storage (`localStorage`) and refresh.

## Deployment

GitHub Pages deployment is handled by:

`.github/workflows/pages.yml`

Every push to `main` publishes the latest demo automatically.
