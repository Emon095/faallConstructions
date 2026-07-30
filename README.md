# Faall Contracting website

A unified React/Vite website and native Cloudflare Pages Functions contact API. The static app and `/api/contact` Function deploy together on one Cloudflare Pages domain.

## Project structure

- `src/` — React application, components, styles, company content, and employee data
- `public/` — logos, project imagery, leadership portraits, and employee placeholders
- `functions/api/contact.js` — Cloudflare Pages contact endpoint
- `dist/` — generated production assets

## Local development

Requires Node.js 20+.

```bash
npm ci
npm run dev
```

Vite serves the interface at `http://localhost:5173`. To exercise the Pages Function locally, build first and use Wrangler:

```bash
npm run build
npx wrangler pages dev dist
```

Keep `CONTACT_DRY_RUN=true` during safe local form testing. The browser always submits to the same-origin `/api/contact` endpoint.

## Cloudflare Pages deployment

1. Import this repository in Cloudflare Pages.
2. Set the framework preset to **Vite**, build command to `npm run build`, and output directory to `dist`.
3. Add `RESEND_API_KEY`, `EMAIL_FROM_ADDRESS`, `CONTACT_DRY_RUN`, and the required `EMPLOYEE_001_EMAIL` through `EMPLOYEE_030_EMAIL` values under **Settings → Variables and Secrets**. Store credentials and recipient addresses as encrypted secrets.
4. Verify the `EMAIL_FROM_ADDRESS` sender or domain in Resend.
5. Deploy, then test successful delivery, invalid input, attachments, rate limiting, and cross-origin rejection.

Employee IDs map to recipient secrets only inside the Function. Recipient email addresses are never included in client code or API responses. Each attachment is restricted to PDF, Office, PNG, or JPEG formats, 5 MB per file, three files, and 15 MB total.

## Validation

```bash
npm run build
npm run check:functions
```
