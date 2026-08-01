# Faall Contracting Project Handbook

This document is the authoritative handoff for developers and agents working on the Faall Contracting website. It describes the system as deployed on 2026-08-01. Update it whenever architecture, production services, employee routing, secrets, DNS, or operational procedures change.

## 1. Product overview

The site is a bilingual English/Arabic company website and secure employee contact directory for Faall Contracting. It presents company leadership, capabilities, standards, projects, and employee contact cards. Visitors can select an employee and submit a message with optional attachments.

Primary production URL:

```text
https://faallconstructions.com/
```

Core requirements:

- Responsive React interface with English and Arabic/RTL modes
- Approved company content and brand assets
- Stable employee-to-recipient routing without exposing private destinations
- Same-origin contact submission at `/api/contact`
- Resend delivery with reply-to set to the visitor's email
- PDF, Office, PNG, and JPEG attachments
- Crawlable production metadata and sitemap

## 2. Architecture

```text
Visitor browser
  │
  ├─ GET / ────────────────> Cloudflare static React/Vite assets
  │
  └─ POST /api/contact ────> functions/api/contact.js
                                │
                                ├─ validates origin and form data
                                ├─ resolves emp_XX to EMPLOYEE_XXX_EMAIL
                                ├─ validates and Base64-encodes attachments
                                └─ Resend API
                                      │
                                      └─ private employee destination
```

The frontend never receives the private employee destination. It sends only a stable employee identifier such as `emp_04`.

### Technology

- React 18
- Vite 6
- JavaScript ES modules
- Lucide React icons
- Cloudflare static assets and serverless runtime
- Resend Node SDK
- GitHub Actions and Wrangler 4

There is no database, CMS, automated test suite, or durable queue.

## 3. Repository map

```text
.
├── .github/workflows/deploy-pages.yml
├── docs/PROJECT-HANDBOOK.md
├── functions/api/contact.js
├── public/
│   ├── assets/
│   ├── images/
│   ├── robots.txt
│   └── sitemap.xml
├── src/
│   ├── components/
│   │   ├── ContactModal.jsx
│   │   ├── EmployeeCard.jsx
│   │   └── EmployeeList.jsx
│   ├── data/
│   │   ├── content.js
│   │   └── employees.js
│   ├── styles/main.css
│   ├── App.jsx
│   └── main.jsx
├── .env.example
├── AGENTS.md
├── index.html
├── package.json
└── vite.config.js
```

Important ownership:

- `App.jsx`: layout, translations, footer address and company telephone
- `content.js`: leadership, project, standard, and service content
- `employees.js`: public employee data and stable IDs
- `ContactModal.jsx`: form state, browser validation, multipart request, UI status
- `contact.js`: all security-sensitive validation and email delivery
- `index.html`: canonical SEO metadata and JSON-LD

`dist/` is generated and must not be committed.

## 4. Frontend behavior

### Language handling

English is the default. Arabic is selected using `?lang=ar`. `App.jsx` updates the document `lang` and `dir` attributes and rewrites the query string without a navigation. All visible copy is held in the `translations` object.

When adding copy, provide both English and Arabic. Test layout direction, alignment, phone/email rendering, mobile navigation, and modal controls in RTL mode.

### Employee cards

Cards accept these public fields:

```js
{
  id,
  name,
  nameAr,
  image,
  featured,
  position,
  positionAr,
  email,
  phone,
  phoneHref
}
```

Only `name`, `nameAr`, and `id` are required. Missing images fall back to `/images/default-employee-avatar.svg` both initially and after an image load error.

Jahangir is intentionally displayed first using `featured: true`, but his persistent ID remains `emp_04`. Display sorting must never renumber delivery slots.

### Contact modal

The modal submits `multipart/form-data` to relative `/api/contact`. The payload includes:

- `employeeId`
- visitor `name`
- visitor `email`
- optional `phone`
- optional `company`
- `subject`
- `message`
- zero to three `attachments`
- hidden honeypot `website`

The submit handler captures the form DOM element before awaiting `fetch`; do not change it back to using `event.currentTarget` after an `await`, because React clears that value and causes `Cannot read properties of null (reading 'reset')`.

## 5. Employee directory and routing

### Current stable map

| Public ID | Employee | Secret |
|---|---|---|
| `emp_01` | Fahad | `EMPLOYEE_001_EMAIL` |
| `emp_02` | Bader | `EMPLOYEE_002_EMAIL` |
| `emp_03` | Ali | `EMPLOYEE_003_EMAIL` |
| `emp_04` | Jahangir Alam | `EMPLOYEE_004_EMAIL` |

`EMPLOYEE_004_EMAIL` may be a private Gmail destination. Jahangir's public card displays `Jahangir@faallconstructions.com`; the two values do not need to be identical.

### Adding an employee

1. Choose the next unused permanent slot. Never insert into the middle if that would renumber existing secrets.
2. Add the employee to the end of `directory` in `src/data/employees.js`.
3. Add the same employee name at the matching index in `employeeNames` in `functions/api/contact.js`.
4. Add `EMPLOYEE_NNN_EMAIL=` to `.env.example`.
5. Create the encrypted secret on every production runtime that may serve `/api/contact`.
6. Use `featured` or a separate display sort to change visual order without changing the ID.
7. Build and run Function syntax validation.
8. Test dry-run and real delivery to that employee.

Example fifth slot:

```js
["Noura", "نورة", "/images/employees/noura.webp"]
```

and:

```js
const employeeNames = ["Fahad", "Bader", "Ali", "Jahangir Alam", "Noura"];
```

with secret:

```text
EMPLOYEE_005_EMAIL
```

### Removing an employee

Do not compact or renumber the array without also planning a secret migration. Prefer disabling/hiding the public record while retaining slot semantics, or replace the slot only after explicit approval and coordinated secret changes.

## 6. Contact API

`functions/api/contact.js` exports `onRequestOptions` and `onRequestPost`.

### Request protections

- Same-origin CORS: only the request URL's own origin is reflected
- Honeypot rejection
- Employee ID format validation
- Server-side secret lookup
- Required-field and length checks
- Email syntax and header-newline checks
- Phone allowlist pattern
- HTML escaping for all interpolated visitor content
- Filename sanitization
- Extension and MIME allowlists
- Maximum three attachments
- Maximum 5 MB per attachment
- Maximum 15 MB total attachment input
- Best-effort in-memory rate limit: more than five requests per IP in 15 minutes

The rate-limit `Map` is local to a runtime isolate. It is not global or durable. For stronger abuse protection, migrate this control to Cloudflare Rate Limiting, Turnstile, Durable Objects, or KV with an intentional design review.

### Attachment flow

Files are read from FormData, validated, converted to Base64, and sent using Resend's actual `attachments` property:

```js
{
  filename,
  content
}
```

The attachment filenames in the HTML body are a human-readable summary; they are not the attachment implementation.

### Status behavior

- `200`: accepted/delivered or accepted dry run
- `400`: invalid input, honeypot, unsupported attachment, or malformed request
- `403`: rejected cross-origin preflight/request
- `429`: local rate limit exceeded
- `502`: Resend rejected the delivery
- `503`: API key or sender missing

The current Function does not perform an administrator fallback. `ADMIN_NOTIFICATION_EMAIL` may exist in configuration for historical reasons, but no code reads it. Do not document a fallback as active unless it is implemented and tested.

## 7. Runtime configuration

### Cloudflare runtime variables/secrets

| Name | Purpose | Secret? |
|---|---|---|
| `RESEND_API_KEY` | Resend API credential | Yes |
| `EMAIL_FROM_ADDRESS` | Verified outbound sender | Yes |
| `EMPLOYEE_001_EMAIL` | Fahad destination | Yes |
| `EMPLOYEE_002_EMAIL` | Bader destination | Yes |
| `EMPLOYEE_003_EMAIL` | Ali destination | Yes |
| `EMPLOYEE_004_EMAIL` | Jahangir destination | Yes |
| `CONTACT_DRY_RUN` | `true` prevents delivery; production is `false` | Plain or secret |
| `ADMIN_NOTIFICATION_EMAIL` | Reserved; currently unused | Yes |

Recommended sender:

```text
Faall Contracting <website@mail.faallconstructions.com>
```

The domain after `@` must exactly match a verified Resend domain/subdomain. Do not include line breaks in the secret.

After changing Cloudflare variables or secrets, create a new deployment before testing.

### GitHub Actions secrets

These repository secrets authorize deployment only:

- `CLOUDFLARE_API_TOKEN`
- `CLOUDFLARE_ACCOUNT_ID`

The API token requires permission to edit Cloudflare Pages in the correct account. These are not application runtime secrets.

## 8. Resend and email model

Resend handles outbound website enquiries. The recommended verified sending subdomain is:

```text
mail.faallconstructions.com
```

Resend requires its generated SPF, DKIM, and return-path records under that subdomain. Copy provider-generated values exactly and leave mail DNS records unproxied/DNS-only.

Resend does not provide Jahangir's inbox. `replyTo` is the visitor email, so replying to the delivered enquiry addresses the visitor.

### Cloudflare Email Routing

Cloudflare Email Routing is an independent inbound forwarding service:

```text
Jahangir@faallconstructions.com
  → Cloudflare Email Routing rule
  → verified Gmail destination
```

To use it, the root domain's MX records must point to Cloudflare (`route1`, `route2`, and `route3.mx.cloudflare.net`) rather than Namecheap `eforward` servers. Cloudflare also manages root SPF and DKIM for routing.

Resend records on `mail.faallconstructions.com` do not conflict with root-domain Cloudflare Email Routing records.

Adding a destination Gmail address is not enough. The destination must be verified and a routing rule must map local part `Jahangir` to that destination.

Cloudflare Email Routing only receives/forwards. Sending from Gmail as `Jahangir@faallconstructions.com` requires a separate SMTP or mailbox provider.

### Changing away from Resend

1. Select and provision the new transactional email provider.
2. Verify the same sending subdomain or a new dedicated subdomain.
3. Add its DNS records without creating duplicate SPF records at the same hostname.
4. Replace the Resend SDK/import and the `resend.emails.send` adapter in `contact.js`.
5. Preserve the validated `emailData`, reply-to semantics, attachment limits, and server-side employee lookup.
6. Add the new API credential as an encrypted runtime secret.
7. Test delivery, reply-to, attachment integrity, bounces, and error mapping.
8. Revoke the Resend key and remove obsolete DNS records only after the new provider is confirmed.

The frontend should require no change if `/api/contact` retains its contract.

## 9. Cloudflare DNS and domain

The domain is registered at Namecheap, but Cloudflare is authoritative DNS via Cloudflare-assigned nameservers. DNS records must be managed in Cloudflare, not Namecheap Advanced DNS.

Website:

- Apex: `faallconstructions.com`
- Optional alias: `www.faallconstructions.com`
- TLS is managed by Cloudflare

Email DNS categories:

- Root MX/SPF/DKIM: inbound routing provider
- `mail.faallconstructions.com` and provider-generated children: Resend outbound authentication
- Google Search Console TXT: ownership verification; retain it

Never delete unfamiliar DNS records casually. Identify the hostname and service first. Apex website records, root inbound MX records, and outbound subdomain records serve different purposes.

## 10. Deployment topology

### Known duplicate Cloudflare applications

There are currently two Cloudflare applications:

1. `faallconstructions` — Git-connected Worker, with automatic Cloudflare Workers Builds from the GitHub repository.
2. `faall-constructions` — Direct Upload Pages project, with no native Git connection. GitHub Actions deploys it using Wrangler.

Observed behavior on 2026-08-01 indicated the custom domain served the Git-connected Worker build, while GitHub Actions also successfully uploaded the same commit to Pages. The similarly named projects and duplicated builds are easy to confuse.

Before any production configuration change:

1. Inspect the custom domain association in both application dashboards.
2. Fetch the live site and compare its asset hashes/current metadata.
3. Confirm `/api/contact` works on the custom domain.
4. Confirm required runtime secrets exist on the application serving the endpoint.
5. Do not delete or detach either application without owner approval and a rollback plan.

### GitHub Actions Pages deployment

Workflow: `.github/workflows/deploy-pages.yml`

Triggers:

- Push to `main`
- Manual `workflow_dispatch`

It uses Node 24, installs with `npm ci`, runs the Vite build, then runs Wrangler 4:

```text
pages deploy dist --project-name=faall-constructions --branch=main
```

Running from the repository root ensures the Pages `functions/` folder is included.

### Manual deployment

```bash
npm ci
npm run build
npm run check:functions
npx wrangler pages deploy dist --project-name faall-constructions --branch main
```

Use manual deployment only with the correct authenticated Cloudflare account.

## 11. SEO and Google Search

`index.html` contains:

- Production title and meta description
- Self-referencing canonical URL
- Robots index/follow instruction
- Absolute Open Graph and Twitter image URLs
- `GeneralContractor` JSON-LD with organization, URL, logo, service description, company telephone, Riyadh postal address, and Saudi Arabia service area

The company telephone currently used in the footer and structured data is `011 402 4028` (`+966 11 402 4028`). It originated in existing project content; confirm ownership before using it in external business profiles.

Discovery files:

- `https://faallconstructions.com/robots.txt`
- `https://faallconstructions.com/sitemap.xml`

Cloudflare may inject Managed Content Signals into `robots.txt`. The observed configuration allows normal search indexing (`search=yes`, `Allow: /`) while restricting certain AI crawlers. `Google-Extended` is not Google Search indexing.

Google Search Console setup:

1. Use a Domain property for `faallconstructions.com`.
2. Retain Google's DNS TXT verification record.
3. Submit the complete sitemap URL if the UI rejects a relative path:

```text
https://faallconstructions.com/sitemap.xml
```

4. Inspect `https://faallconstructions.com/` and request indexing.

Indexing is not immediate or guaranteed. A verified Google Business Profile is separate and recommended for local Search/Maps visibility.

## 12. Local development

Required: Node.js 24 and npm.

Frontend only:

```bash
npm ci
npm run dev
```

Production build preview, without the Function:

```bash
npm run build
npm run preview
```

Integrated Cloudflare Pages development:

```bash
npm run build
npx wrangler pages dev dist
```

For local secrets, use an ignored `.dev.vars` or `.env` file. Never commit real values. Start with `CONTACT_DRY_RUN=true`.

## 13. Testing checklist

### Always

```bash
npm run build
npm run check:functions
git diff --check
```

### UI

- Desktop and mobile breakpoints
- English and `?lang=ar`
- RTL alignment and navigation
- Header scroll state and mobile menu
- Reveal animations without hiding critical content
- All anchor navigation
- Leadership images
- Employee order and stable recipient selection
- Missing and broken employee-image fallback
- Public Jahangir phone and mail links
- Keyboard focus and Escape behavior in the modal

### Form

- Required field validation
- Invalid email and phone
- Minimum subject/message lengths
- Honeypot rejection
- Success state and form reset
- Error and timeout state
- Close/cancel behavior
- No duplicate submission while sending

### Attachments

- No attachment
- Valid PDF/Office/PNG/JPEG
- Unsupported extension
- MIME mismatch
- More than three files
- More than 5 MB per file
- More than 15 MB total
- Filename sanitization
- Delivered file downloads correctly from the received email

### Backend/security

- Each employee ID reaches the correct private destination
- Unknown or out-of-range IDs fail
- Missing recipient secret fails outside dry-run
- Cross-origin `POST` and `OPTIONS` fail
- Rate-limit response occurs after the configured threshold
- User-controlled HTML is escaped in the delivered message
- Resend error produces a safe generic frontend response

### Production

- GitHub workflow succeeds for the intended commit
- Custom domain serves that commit, not merely the Pages/Workers preview URL
- `/api/contact` is present on the custom domain
- Sender domain is verified
- Reply goes to visitor address
- `robots.txt` permits search
- `sitemap.xml` returns HTTP 200 and `application/xml`
- Canonical URL and social images use the custom domain

## 14. Common incidents

### `Cannot read properties of null (reading 'reset')`

Cause: using React's `event.currentTarget` after an awaited request. Fix: capture `const form = event.currentTarget` before `await` and call `form.reset()`.

### Resend 403: domain not verified

Cause: `EMAIL_FROM_ADDRESS` uses a domain that is not verified in the Resend account, or the verified subdomain does not exactly match. Verify `mail.faallconstructions.com` and use `website@mail.faallconstructions.com`.

### Attachment filename appears but no delivered attachment

Check the actual `attachments` array passed to the provider, provider size limits, and the delivered email details. Resend logs may omit large Base64 bodies. The current Function supplies `filename` and Base64 `content`.

### GitHub deployment fails at Wrangler

Confirm `CLOUDFLARE_API_TOKEN`, `CLOUDFLARE_ACCOUNT_ID`, Pages Edit permission, correct account scope, action v4, Wrangler 4, and Node 24.

### GitHub says success but custom domain shows old content

The workflow proves only the Pages upload. Check whether the custom domain is attached to the Git-connected Worker, browser/Cloudflare cache, both application dashboards, and live asset hashes. A cache-busting query can distinguish stale cache from wrong routing.

### Search Console rejects `sitemap.xml`

Submit the complete URL:

```text
https://faallconstructions.com/sitemap.xml
```

### Cloudflare Email Routing has no rule option

Finish domain onboarding and DNS verification first. Remove conflicting Namecheap root MX records only when intentionally migrating inbound forwarding to Cloudflare. Then verify the Gmail destination and create a routing rule.

## 15. Known limitations and technical debt

- Two Cloudflare deployment paths create ambiguity and should eventually be consolidated.
- The rate limiter is per-isolate and resets on cold starts.
- There is no automated test suite.
- Company content and translations are embedded in source files rather than a CMS.
- Arabic content is not a separate crawlable URL/page beyond a query parameter and client-side state.
- The general contact section routes visitors back to the employee directory rather than to a separate general-recipient form.
- `ADMIN_NOTIFICATION_EMAIL` is unused; there is no active fallback delivery.
- Some public company facts, especially the general telephone and postal details, should be periodically reconfirmed by the owner.
- The project contains historical `Prompt.md`; it is not authoritative for the current architecture.

## 16. Safe change workflow

1. Read `AGENTS.md` and this handbook.
2. Inspect `git status`; preserve unrelated work.
3. Identify whether the change affects public data, stable employee routing, runtime secrets, DNS, or deployment.
4. Make the smallest coherent change.
5. Run required checks and relevant manual tests.
6. Commit with a short imperative subject.
7. Push only when authorized.
8. Observe GitHub Actions.
9. Verify the custom domain independently of preview URLs.
10. Update this handbook if the system or operational truth changed.

