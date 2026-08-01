# Repository Guidelines

Read [`docs/PROJECT-HANDBOOK.md`](docs/PROJECT-HANDBOOK.md) before making architectural, deployment, DNS, email, employee-directory, or production configuration changes. It is the authoritative project handoff.

## System Summary

Faall Contracting is a single-repository React/Vite website with a same-origin Cloudflare contact endpoint. The production domain is `https://faallconstructions.com/`. The browser posts multipart form data to `/api/contact`; `functions/api/contact.js` validates the request, resolves an employee ID to an encrypted runtime secret, and sends through Resend.

The Cloudflare account currently contains two similarly named applications:

- `faallconstructions` — Git-connected Worker at a `workers.dev` hostname. Git pushes also trigger Cloudflare Workers Builds, and the custom domain has been observed serving this build.
- `faall-constructions` — Direct Upload Pages project at `faall-constructions.pages.dev`, deployed by `.github/workflows/deploy-pages.yml`.

Do not assume these are interchangeable. Before changing routes, custom domains, secrets, or deleting either application, verify which application currently serves `faallconstructions.com` and `/api/contact`. Consolidating the duplicate deployments requires explicit owner approval.

## Project Structure

- `src/App.jsx` — page composition, English/Arabic copy, language state, footer contact details
- `src/components/` — employee directory and contact modal
- `src/data/content.js` — leadership, divisions, standards, projects
- `src/data/employees.js` — public employee records and stable routing IDs
- `src/styles/main.css` — global responsive and RTL styling
- `functions/api/contact.js` — contact validation, employee-secret lookup, attachment conversion, Resend delivery
- `public/assets/` — brand, hero, and leadership media
- `public/images/employees/` — employee photos when available
- `public/images/default-employee-avatar.svg` — missing-image fallback
- `public/robots.txt`, `public/sitemap.xml`, `index.html` — SEO and production metadata
- `.github/workflows/deploy-pages.yml` — GitHub-to-Cloudflare Pages Direct Upload workflow
- `docs/PROJECT-HANDBOOK.md` — complete operations and development documentation

Never edit or commit generated `dist/`.

## Development and Validation

Use Node.js 24, matching GitHub Actions:

```bash
npm ci
npm run dev
npm run build
npm run preview
npm run check:functions
git diff --check
```

Vite alone does not execute the Cloudflare endpoint. For integrated local testing:

```bash
npm run build
npx wrangler pages dev dist
```

Before any handoff, run `npm run build`, `npm run check:functions`, and `git diff --check`. For UI changes, manually check desktop, mobile, English, Arabic/RTL, navigation, image fallback, modal focus/close behavior, validation, and success/error states. For backend changes, also test attachments, same-origin enforcement, rate limiting, dry-run mode, and real delivery.

## Code Conventions

Use ES modules, two-space indentation, double quotes, and semicolons. Use `PascalCase` for React components, `camelCase` for JavaScript identifiers, and kebab-case for CSS classes.

Preserve accessible semantic HTML, keyboard operation, focus states, Arabic RTL behavior, and the relative `/api/contact` URL. Do not add an Inquiry Type field; its absence is intentional.

## Employee Routing Invariant

The persistent routing map is:

- `emp_01` → Fahad → `EMPLOYEE_001_EMAIL`
- `emp_02` → Bader → `EMPLOYEE_002_EMAIL`
- `emp_03` → Ali → `EMPLOYEE_003_EMAIL`
- `emp_04` → Jahangir Alam → `EMPLOYEE_004_EMAIL`

The visible order is not the routing order. Jahangir is marked `featured` and sorted to the first visible position while retaining `emp_04`. Never renumber existing employees to change display order.

Keep `src/data/employees.js`, `employeeNames` in `functions/api/contact.js`, `.env.example`, and Cloudflare secret numbering aligned. New slots require an approved name and a corresponding encrypted runtime secret. Public fields may include approved `position`, `positionAr`, `email`, `phone`, and `phoneHref`; recipient secrets remain server-side.

Jahangir is the only employee currently approved to display a position, email, and phone publicly:

- Email: `Jahangir@faallconstructions.com`
- Phone: `+966 50 458 8131`
- Position: Marketing Manager

## Security and Email

Never commit API keys, Cloudflare credentials, personal recipient addresses, or secret values. Runtime configuration includes:

- `RESEND_API_KEY`
- `EMAIL_FROM_ADDRESS`
- `EMPLOYEE_001_EMAIL` through `EMPLOYEE_004_EMAIL`
- `CONTACT_DRY_RUN`
- `ADMIN_NOTIFICATION_EMAIL` is reserved/configured in some environments but is not currently used by the Function

Production uses a Resend-verified sender, currently intended as `Faall Contracting <website@mail.faallconstructions.com>`, and `CONTACT_DRY_RUN=false`. Employee recipient secrets may contain private Gmail addresses; they must never be returned to the frontend.

Preserve server-side routing, same-origin CORS, the honeypot, input bounds, header-safety checks, HTML escaping, filename sanitization, MIME/extension validation, three-file maximum, 5 MB per-file limit, 15 MB aggregate limit, and rate limiting. The in-memory rate limiter is best-effort per Worker isolate, not a globally durable limiter.

Cloudflare Email Routing for `Jahangir@faallconstructions.com` is separate from Resend. Email Routing handles inbound forwarding to Gmail; Resend sends website enquiries outbound. DNS and provider details are in the handbook.

## Deployment and Git

The GitHub workflow uses Node 24, `cloudflare/wrangler-action@v4`, Wrangler 4, and these GitHub repository secrets:

- `CLOUDFLARE_API_TOKEN`
- `CLOUDFLARE_ACCOUNT_ID`

It deploys with:

```bash
npx wrangler pages deploy dist --project-name=faall-constructions --branch=main
```

Because a separate Git-connected Worker also builds `main`, a push may create two Cloudflare deployments. Treat successful GitHub Actions as proof of the Pages upload only, not proof that the custom domain is routed to Pages.

Use short imperative commit subjects and keep commits focused. Do not overwrite unrelated user changes. Include checks performed and screenshots for visual or RTL changes.
