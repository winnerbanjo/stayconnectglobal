# Stay Connect production configuration

Deploy the `main` branch of `winnerbanjo/stayconnectglobal` to the existing Vercel project `stayconnectglobal`.

Configure these values in Vercel environment settings. Do not commit credentials:

- `MONGODB_URI`: existing production MongoDB connection.
- `CLOUDINARY_CLOUD_NAME`, `CLOUDINARY_API_KEY`, `CLOUDINARY_API_SECRET`: existing media-storage account.
- `MAILTRAP_TOKEN`: existing transactional-mail credential.
- `ADMIN_PASSWORD`: private production administrator password.
- `ADMIN_SESSION_SECRET`: independent, cryptographically random session-signing secret.
- `NEXT_PUBLIC_SITE_URL`: `https://www.stayconnectglobal.com`.
- `STAYCONNECT_LOCAL_PREVIEW`: `false` (or absent).

`.env.local`, `.local-data` and local uploads are excluded from Git. Production uses MongoDB transactions and Cloudinary; it never reads the preview fixtures. The obsolete destructive seed endpoint is disabled.

The previous version of this repository contained credentials. This revision removes them from the environment file and setup guide; repository history is unchanged.

## Rollout verification

Run `npm run build` and `node scripts/test-admin-session.mjs` before pushing.
The login compares the exact configured password (including spaces) and never
accepts generic production fallbacks. A missing password or signing secret now
returns a configuration error instead of claiming the password is wrong.

The bundled catalog and local-preview defaults are empty. Destination counts use
published database listings. Demo packages, booking extras, testimonials and
automatic five-star ratings have been removed. The legacy seed script cannot
write to a database.

Admin APIs support targeted cleanup with an authenticated session:
- `PATCH /api/bookings` with `{ "id": "…", "action": "archive" }` archives only past unpaid reservations.
- `PATCH /api/partners` with `{ "id": "…", "action": "archive" }` archives pending applications without active linked properties.
- `PATCH /api/rooms` with `{ "id": "…", "action": "clear-reviews" }` clears synthetic rating aggregates.

Archiving keeps records in storage with `archivedAt` for recovery, while excluding
them from active dashboards. Restore by unsetting `archivedAt` on the exact record
in MongoDB. Never clear a collection: the database also holds another service's
appointments. Confirm uncertain records before cleanup.
