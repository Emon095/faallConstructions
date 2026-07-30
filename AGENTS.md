# Repository Guidelines

## Project Structure & Module Organization

This is a unified Cloudflare Pages project. The React/Vite app lives in `src/`; components are in `src/components/`, company content is in `src/data/content.js`, employee records are in `src/data/employees.js`, and global styles are in `src/styles/main.css`. Brand and leadership media live under `public/assets/`. Employee photos belong in `public/images/employees/`; missing or broken images fall back to `public/images/default-employee-avatar.svg`. The same-origin contact endpoint is `functions/api/contact.js`. Never edit or commit generated `dist/`.

## Development, Build, and Deployment

Use Node.js 20+ from the repository root:

```bash
npm ci
npm run dev
npm run build
npm run preview
npm run check:functions
npx wrangler pages dev dist
npx wrangler pages deploy dist --project-name faall-constructions --branch main
```

Build before running or deploying with Wrangler. Vite alone does not execute Pages Functions.

## Style & Directory Conventions

Use ES modules, two-space indentation, double quotes, and semicolons. Use `PascalCase` for React components, `camelCase` for JavaScript identifiers, and kebab-case for CSS.

The directory currently maps:

- `emp_01` → Fahad → `EMPLOYEE_001_EMAIL`
- `emp_02` → Bader → `EMPLOYEE_002_EMAIL`
- `emp_03` → Ali → `EMPLOYEE_003_EMAIL`

Keep `src/data/employees.js`, the Function’s `employeeNames` array, and Cloudflare secret numbering aligned. Each UI record needs `name`, `nameAr`, and optional `image`. Do not display roles, departments, or recipient addresses. Add new slots only with approved names and matching encrypted secrets.

## Testing Guidelines

No automated suite is configured. Before submitting, run `npm run build`, `npm run check:functions`, and `git diff --check`. Manually verify responsive and Arabic/RTL layouts, default-avatar fallback, employee selection, modal validation, attachments, rate limiting, CORS, and email delivery. The form intentionally has no Inquiry Type field.

## Security & Email Configuration

Never commit API keys, sender credentials, or recipient addresses. Configure `RESEND_API_KEY`, `EMAIL_FROM_ADDRESS`, `EMPLOYEE_001_EMAIL` through `EMPLOYEE_003_EMAIL`, and `CONTACT_DRY_RUN` as Cloudflare secrets. Resend delivery uses the SDK inside the Function; the frontend must call relative `/api/contact`.

Use `CONTACT_DRY_RUN=true` for validation without delivery. Production requires `false` and an `EMAIL_FROM_ADDRESS` on a verified Resend domain; `onboarding@resend.dev` is test-only. Preserve server-side mapping, validation, attachment limits, HTML escaping, same-origin CORS, and rate limiting.

## Commits & Pull Requests

Use short, imperative commit subjects. Keep changes focused. Pull requests should summarize UI and Function effects, list checks performed, link issues, and include screenshots for visual or RTL changes.
