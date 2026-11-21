# LEXIGAM production deployment

Architecture:
- React 19 + Vite frontend: Vercel, project root `frontend`.
- Laravel 12 API + Sanctum: Railway, service root directory `/backend`.
- MySQL: Railway MySQL service.
- Uploaded product images: a Railway Volume mounted at `/app/storage/app/public`.

## 1. Deploy the Laravel API on Railway

1. Create a Railway project and add a MySQL service.
2. Add a service from this GitHub repository and select branch `deploy/production-readiness` for the first preview. Set the service Root Directory to `/backend`.
3. Generate a public domain for the Laravel service. The checked-in `backend/railway.json` runs migrations at startup, creates the public storage symlink, serves Laravel on Railway's `PORT`, and exposes the Laravel `/up` health endpoint.
4. In the Laravel service Variables, set:
   - `APP_NAME=LEXIGAM`
   - `APP_ENV=production`
   - `APP_DEBUG=false`
   - `APP_KEY=<generated Laravel key>`
   - `APP_URL=https://<your-railway-api-domain>`
   - `FRONTEND_URL=https://<your-vercel-domain>`
   - `LOG_LEVEL=warning`
   - `DB_CONNECTION=mysql`
   - `DB_HOST=${{MySQL.MYSQLHOST}}`
   - `DB_PORT=${{MySQL.MYSQLPORT}}`
   - `DB_DATABASE=${{MySQL.MYSQLDATABASE}}`
   - `DB_USERNAME=${{MySQL.MYSQLUSER}}`
   - `DB_PASSWORD=${{MySQL.MYSQLPASSWORD}}`
   - `FILESYSTEM_DISK=public`
   - `SESSION_DRIVER=database`
   - `CACHE_STORE=database`
   - `QUEUE_CONNECTION=database`
5. Generate `APP_KEY` from the backend directory with `php artisan key:generate --show` in a trusted local terminal, then paste the generated value into Railway Variables. Never commit it or put it in Vercel.
6. Add a Railway Volume to the Laravel service with mount path exactly `/app/storage/app/public`. This keeps product image uploads across redeploys. The API's public storage symlink points to this directory.
7. Deploy and check `https://<your-railway-api-domain>/up`. It should return a healthy response.

Railway MySQL service references use the service name in the variable expression. If your database service is not named `MySQL`, change the reference prefix to its actual Railway service name.

## 2. Deploy React on Vercel

1. Import the same GitHub repository into Vercel.
2. Set Root Directory to `frontend` (not the repository root and not `backend`).
3. Framework preset: Vite. Build command: `npm run build`. Output directory: `dist`. Install command: `npm install`.
4. Add Environment Variable:
   - `VITE_API_URL=https://<your-railway-api-domain>/api`
5. Add the final Vercel production domain to Railway's `FRONTEND_URL` variable. If you use both a `www` and non-`www` domain, set both as a comma-separated list.
6. Redeploy both services after changing environment variables.

The `frontend/vercel.json` rewrite is required so React Router URLs work when opened directly or refreshed.

## 3. Data migration — do not skip

The repository does not contain a committed SQLite database file or a SQL dump. The Laravel migration files create the schema; they do **not** copy your existing local users, products, categories, carts, orders, payments, deliveries, reviews, returns, or uploaded images.

Before switching real users to production:
1. Back up your current local database and the contents of `backend/storage/app/public`.
2. Create the Railway MySQL schema by deploying the API migrations.
3. Convert/export the local SQLite data to MySQL while preserving primary keys, foreign keys, timestamps, enum values, password hashes, and token policy. Do not use `migrate:fresh`, `db:wipe`, or destructive seeders on production.
4. Copy uploaded product images into the Railway Volume at the matching relative paths under `/app/storage/app/public`.
5. Verify row counts and sample relationships for every table before pointing the public frontend to the new API.
6. Keep the original local database and backup untouched until production is verified.

Do not assume that creating the MySQL service automatically imports the local SQLite records.

## 4. Smoke tests after deployment

- `GET /up` returns healthy.
- `GET /api/categories` returns category data.
- `GET /api/produits` returns the public approved product list.
- Register a test client and a test vendor; verify that a public registration cannot create an admin.
- Log in, call `GET /api/me`, then log out and verify the token is revoked.
- Test product image upload and confirm the image still loads after a Railway redeploy.
- Test cart sync, checkout, stock decrement, order history, vendor orders, admin approvals, returns and reviews.
- Test React Router refreshes on nested URLs and verify browser network requests target the Railway API, not localhost.

## 5. Important security review still required

This deployment preparation fixes the hard-coded local API URL, configures CORS, adds request validation/rate limits to public auth routes, and prevents self-registration as an administrator. It is not a complete application security audit. Before production, review ownership/authorization in all order, cart, payment, delivery, return, review and line-item endpoints. In particular, verify that a user cannot read or modify another user's records by changing an ID in an API URL.
