# Stay Connect local review

This update builds on commit `9821b8c`. The initial review was performed locally without pushing or modifying live data; production release was subsequently authorized on 6 September 2026. The existing gold/black/cream branding, hospitality sections, add-on services, property-owner dropdown and bulk image selection are retained.

## Open the preview

- Homepage: http://localhost:3000
- Search by location: http://localhost:3000/properties
- Residence: http://localhost:3000/properties/stay-connect-lekki
- Property registration: http://localhost:3000/list-your-property
- Partner workspace: http://localhost:3000/partner
- Admin property reviews: http://localhost:3000/admin/properties
- Room inventory: http://localhost:3000/admin/rooms
- Reservations and payment confirmation: http://localhost:3000/admin/bookings
- Flights: http://localhost:3000/flights

Local admin password: `stayconnect1`. This fallback works only with local-preview mode enabled. Production requires `ADMIN_PASSWORD` and `ADMIN_SESSION_SECRET`; the old client-side password check has been replaced with a server-issued HTTP-only session.

`npm run dev -- --hostname 127.0.0.1` starts the preview. `.env.local` enables isolated preview mode. Data persists in the ignored `.local-data/platform.json`, and new photos live in ignored `.local-data/uploads`. Email and MongoDB connections are disabled in this mode. No payment is taken.

## Review the complete flow

1. Create a property with contact details, at least one image, a description, amenities, location, rate and the actual room/unit count.
2. Save the private partner key shown after registration. The listing starts as Draft.
3. Open the partner workspace, edit photos/details as needed, and submit for verification.
4. In Admin → Properties, approve the submission or request changes with feedback. Unapproved listings are excluded from public properties, room details and booking APIs.
5. In Admin → Rooms, select the correct property and add its room types. Set the number of units per room type and the nightly price. The property-level count describes the property; room-type counts control payment-confirmation inventory checks.
6. Find the approved property by city/area, open a room and reserve dates. Prices are recalculated server-side using the existing base-nightly-price and add-on/tax calculation.
7. The booking starts as Reservation / Pending Payment. Save the private status link shown after submission.
8. In Admin → Bookings, use Confirm payment only after verifying payment. The customer status page and partner workspace show the updated status. The confirmation records its timestamp and the administrator role. Revenue totals count paid bookings only.

Reservations are requests, with no automatic inventory hold. Payment confirmation checks occupied units for each requested night. The local store serializes writes and persists across restarts. MongoDB integration is retained, with production-shaped records tested in a separate disposable database. Production writes now use MongoDB transactions. Payment confirmation and room-inventory changes acquire a write lock on the room document, forcing concurrent confirmations to retry against a fresh snapshot. The admin remains one shared administrator account; individual staff identities are a future extension.

## Agent attribution

A link such as `http://localhost:3000/?ref=BANJO-01` captures the referring agent code for 30 days and attaches it and a visitor identifier to the booking. The code is visible/editable at checkout and searchable in Admin → Bookings alongside customer, booking value and payment status. Use one assigned code per agent. Codes are attribution labels, not authenticated agent identities or proof of commission entitlement. An agent directory and commissions remain future extensions.

## Residence and media

The existing `prop-lekki-1` property and `stay-connect-lekki` URL are retained, now presented as Stay Connect Residence & Suites. Existing room identifiers, price data and four Saffron images are preserved. No additional rooms, unverified inventory quantities, or new property photographs have been invented.

Available repository assets:

| Asset                   | Location                                                      | Current use                          |
| ----------------------- | ------------------------------------------------------------- | ------------------------------------ |
| Saffron room photos 1–4 | `public/images/saffron/saffron-1.jpg` through `saffron-4.jpg` | Existing Residence and Standard Room |
| Brand logo              | `public/logo.png` and `public/images/logo.png`                | Existing brand/navigation assets     |

Still needed from Stay Connect: correctly labelled high-resolution property/room/facility images; walkthrough and facilities videos; lifestyle and guest content with usage permission; promotional videos, Instagram/TikTok reels and previous ads; original brand assets. No additional media files were supplied with the brief, so other-property image assignment and campaign creative review remain pending.

## Discoverability and future services

Property metadata now comes from saved listings; pages have real not-found behavior; public property pages include lodging structured data; sitemap and robots routes are present. The local preview is explicitly non-indexable. Set the verified public website URL in `NEXT_PUBLIC_SITE_URL` before production use.

Google Business Profile changes remain pending access to the correct business account and verified business details (official name, address, telephone, website, business category and photos). No Google profile or search-engine submission was made during this local-only work. The website changes do not promise rankings.

Flights is a Coming Soon page linked from navigation. No Wakanow endpoints, inventory or integration are simulated.

## Validation

- TypeScript check and production build.
- `node scripts/test-platform-local.mjs`: end-to-end HTTP checks for registration, image validation, custom amenities, 15 units, draft visibility, ownership restrictions, submission, review feedback, approval, room creation, search, reservation, server pricing, agent attribution, payment confirmation, customer/partner visibility, inventory conflict handling and Residence booking. The script refuses to run outside local-preview mode and removes only its own fixtures.
- Browser review of desktop search, mobile layout and checkout, referral capture, empty state, and Flights.

Live email delivery, Google Business verification, real payment reconciliation and final property-media accuracy still require their real services/assets. Database compatibility and inventory concurrency are covered by the isolated production-storage checks described below.

## Production release preparation — 6 September 2026

The user authorized publishing this update. Production compatibility now supports older properties without amenities/policy fields, both MongoDB and historical property IDs, and the former Standard Room URL. The existing database records are preserved; storage tests copy only property/room listings into a disposable database and use synthetic guest records there.

Vercel holds the live admin password and signing key. The private admin access handoff is saved locally in `.local-data/production-admin-access.txt`, excluded from Git. The old locally documented preview password does not unlock production.

`node scripts/test-production-storage.mjs` exercises the actual MongoDB path and concurrent payment confirmation against a separate temporary database, then removes that temporary database. It does not send emails or mutate live guest records.
