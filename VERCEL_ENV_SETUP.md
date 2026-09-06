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
