# Faall Contracting website

A presentation-ready React/Vite landing page and a separately deployable Vercel contact endpoint. The website uses the supplied Faall Arabic/English brand files unchanged. No employee address or email credential is present in the frontend.

> Demo content is intentionally labelled. The source folder did not include a company profile, employee list, project records, photos, certificates, address, phone number, verified service list, or metrics.

## Structure

- `frontend/` — static React website for GitHub Pages
- `backend/` — Vercel serverless contact endpoint using Resend
- `.github/workflows/deploy-pages.yml` — GitHub Pages build/deploy
- `faall_logo_and_names_extracted/` — original supplied artwork

## Run locally

Requires Node.js 20+.

```bash
cd frontend
npm install
cp .env.example .env
npm run dev
```

In a second terminal:

```bash
cd backend
npm install
cp .env.example .env
npm run dev
```

For safe local UI testing, retain `CONTACT_DRY_RUN=true`. The backend validates the request and logs only employee ID, inquiry type, and attachment count; it does not claim delivery or log message content. Set `VITE_CONTACT_API_URL=http://localhost:3001/api/contact` and `ALLOWED_ORIGIN=http://localhost:5173`.

## Configure secure delivery

1. Create a Vercel project whose root is `backend`.
2. Add every variable from `backend/.env.example` in Vercel project settings.
3. Set each `EMPLOYEE_00X_EMAIL` to its protected recipient. Never prefix these with `VITE_`.
4. Verify a sender/domain with Resend and set `EMAIL_FROM_ADDRESS`.
5. Set `CONTACT_DRY_RUN=false`.
6. Set `ALLOWED_ORIGIN` to the exact GitHub Pages origin, without a trailing slash.
7. Deploy and test success, invalid file, unknown employee, rate-limit and CORS cases.

The recipient is selected exclusively by server-side identifier mapping. The API never returns recipient addresses. To change providers later, replace only the send block in `backend/api/contact.js`; the multipart API contract and frontend can remain unchanged.

Before production, connect CAPTCHA at the marked integration point and use a persistent rate limiter (for example Vercel KV/Upstash) because the included in-memory limiter is best-effort per warm serverless instance.

## Deploy the frontend

1. Push to `main` and enable GitHub Pages with **GitHub Actions** as the source.
2. Add the repository Actions variable `VITE_CONTACT_API_URL` containing the deployed endpoint URL.
3. The workflow supplies the repository-name Vite base path automatically.

Manual production check:

```bash
cd frontend
VITE_BASE_PATH=/repository-name/ npm run build
npm run preview
```

## Content handoff checklist

Replace the clearly labelled placeholders only with approved details:

- verified company profile, services, markets and locations;
- real project imagery and case-study facts;
- approved employee names, roles and photos (IDs may remain stable);
- verified statistics, policies and certificates;
- office address, public phone/email and business hours;
- privacy policy, terms, Arabic translations, and social links.

The generated site photograph is a demo visual, not a representation of completed Faall work.
