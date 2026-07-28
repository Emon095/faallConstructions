Create a premium, business-focused construction company website with a secure employee contact and email-sending system.

## Project Objective

Build a professional construction company website that introduces the business, showcases its capabilities, establishes trust, and allows visitors to contact specific employees directly from the website.

Visitors must only see employee names, job titles, departments, and professional information. Actual employee email addresses must never be displayed, included in frontend source code, exposed through browser developer tools, stored in public JSON files, or returned through API responses.

This project is initially a functional client demo using test email accounts. Structure the system so that real company email accounts, production security, and a preferred email provider can be added later without rebuilding the frontend.

## Project Assets

The project folder will contain company assets provided by the client or project owner.

Before building the website, inspect the project folder for:

* Company logos
* Company name
* Arabic and English company names, where available
* Employee names
* Employee photos
* Project photos
* Construction site images
* Equipment images
* Certificates
* Company profile documents
* Brand colors
* Fonts
* Icons
* Existing contact information
* Other branding assets

Use the provided files wherever appropriate instead of inventing replacements.

Do not rename, alter, recolor, crop, or redesign the official logo unless necessary for responsive presentation.

If several logo versions exist, select the most suitable version for each location:

* Main navigation
* Footer
* Mobile header
* Dark background
* Light background
* Browser favicon

Create a clean asset-management structure and reference files using relative project paths.

If an expected asset is missing, use a clearly labeled temporary placeholder that can easily be replaced later.

## Construction Industry Design Direction

The visual identity must clearly match a professional construction, contracting, engineering, infrastructure, or property-development company.

The website should feel:

* Strong
* Reliable
* Established
* Industrial
* Precise
* Safe
* Premium
* Corporate
* Modern
* Capable

Use a construction-inspired aesthetic with:

* Strong architectural grid layouts
* Bold headings
* Structured spacing
* Industrial visual details
* Clean geometric elements
* Subtle blueprint-inspired lines or patterns
* Professional construction photography
* Large project imagery
* High-contrast content sections
* Refined cards
* Strong calls to action
* Subtle motion and transitions
* Professional iconography

Suitable accent colors may include:

* Construction yellow
* Safety orange
* Deep navy
* Charcoal
* Steel grey
* Concrete grey
* White
* Sand or warm neutral tones

Base the final palette on the provided company logo and brand assets.

Do not force yellow or orange if those colors conflict with the official branding.

Avoid:

* Playful startup styling
* Cartoon construction graphics
* Excessive gradients
* Neon colors
* Overly rounded layouts
* Excessive glassmorphism
* Decorative animations that distract from the company
* Generic software-company visuals
* Residential handyman styling unless supported by the company’s actual services

The final result should look suitable for a major contractor, civil engineering firm, construction group, infrastructure company, commercial builder, or industrial construction company.

## Recommended Technology

Use:

* React
* Vite
* Tailwind CSS
* Modern JavaScript or TypeScript
* Reusable components
* Accessible semantic HTML
* A serverless backend endpoint for email delivery

Host the frontend on GitHub Pages.

Use a separate serverless backend compatible with Vercel, Netlify, Cloudflare Workers, or a similar provider.

For this demo, choose the simplest reliable serverless option that supports:

* Form submissions
* Hidden recipient mapping
* File attachments
* Environment variables
* CORS restrictions
* Basic rate limiting

Clearly separate the frontend from the email backend.

## Website Structure

Create a complete landing page with the following sections.

### 1. Navigation Header

Include:

* Official company logo
* Company name where appropriate
* Home
* About
* Services
* Projects
* Team or Contact Directory
* Contact
* Primary call-to-action button

Suggested calls to action:

* Request a Consultation
* Discuss a Project
* Contact Our Team
* Send an Inquiry

Use a sticky or fixed navigation header with a polished transition while scrolling.

The mobile navigation must be accessible and easy to use.

### 2. Hero Section

Create a powerful construction-focused hero section.

Include:

* Strong company headline
* Short company introduction
* Supporting text
* Primary call-to-action
* Secondary call-to-action
* Construction, engineering, infrastructure, or completed-project imagery

Example headline direction:

“Building With Strength, Precision and Trust”

Do not use this exact text if a real company slogan or headline is available in the project folder.

Possible supporting themes:

* Quality construction
* Reliable project delivery
* Safety
* Engineering expertise
* Commercial development
* Infrastructure
* Long-term client relationships
* Timely project completion

Use provided company or project images where available.

### 3. Company Introduction

Create an About the Company section that explains:

* Who the company is
* What it builds
* Industries served
* Geographic coverage
* Construction experience
* Quality commitment
* Safety standards
* Client-focused approach

Use actual company information found in the project folder.

If company information is incomplete, write professional placeholder copy that is clearly marked for replacement.

### 4. Services Section

Create visually strong service cards.

Possible service categories include:

* General Contracting
* Civil Construction
* Commercial Construction
* Industrial Construction
* Infrastructure Development
* Road and Utility Works
* Structural Works
* Building Construction
* Renovation and Fit-Out
* Project Management
* Engineering Services
* Design and Build
* Maintenance Services
* MEP Works
* Procurement
* Construction Consultancy

Only include services supported by the provided company information.

Each service card may include:

* Service name
* Relevant icon
* Short description
* Link or call to action

### 5. Featured Projects

Create a construction project showcase.

Each project may display:

* Project image
* Project name
* Project category
* Location
* Completion year
* Project status
* Short description
* Scope of work

Use real project images and information from the project folder where available.

Provide responsive project cards or a structured portfolio grid.

Avoid fake project statistics presented as factual information.

Clearly mark placeholder content when real details are unavailable.

### 6. Company Strengths

Create a section explaining why clients choose the company.

Possible strengths include:

* Experienced Team
* Quality Workmanship
* Safety First
* On-Time Delivery
* Transparent Communication
* Modern Equipment
* Technical Expertise
* Cost Control
* Reliable Project Management
* Compliance With Standards

Present these through strong typography, icons, and concise descriptions.

### 7. Statistics or Achievements

Create a premium metrics section for information such as:

* Years of Experience
* Completed Projects
* Active Projects
* Skilled Professionals
* Satisfied Clients
* Safe Working Hours
* Locations Served

Use real numbers only when they are present in the supplied project assets or company information.

Otherwise, use neutral placeholders such as:

* “XX+ Completed Projects”
* “XX Years of Experience”

Make placeholders easy to locate and replace.

### 8. Safety and Quality Section

Construction clients often evaluate companies based on safety, quality, and compliance.

Include a dedicated section covering:

* Health and safety commitment
* Quality assurance
* Site supervision
* Regulatory compliance
* Environmental responsibility
* Risk management

Use certificate images or badges from the project folder where available.

Do not claim certifications the company has not provided.

### 9. Employee Contact Directory

Create a polished employee directory or contact-team section.

Each employee card should display only:

* Employee name
* Job title
* Department
* Professional photo or initials
* Short role description
* “Send Message” button

Possible departments include:

* Management
* Business Development
* Estimation
* Projects
* Engineering
* Procurement
* Human Resources
* Finance
* Health and Safety
* Quality Control
* Customer Relations
* Administration

Use employee names, job titles, departments, and photos found in the project folder.

Do not invent employee names when real names are supplied.

Do not display employee email addresses.

Assign each employee a safe public identifier, such as:

* employee-001
* employee-002
* employee-003

The frontend may use the identifier, but the recipient email mapping must exist only on the backend.

## Employee Message Form

When a visitor clicks an employee’s name or “Send Message,” open a polished modal, drawer, or dedicated message panel.

The form should include:

* Selected employee’s name
* Selected employee’s job title
* Sender’s full name
* Sender’s email address
* Sender’s phone number
* Optional company name
* Inquiry type
* Subject
* Message
* File attachment field
* Send button
* Cancel or close button

Suggested inquiry types:

* General Inquiry
* Project Consultation
* Request for Quotation
* Tender Invitation
* Supplier Inquiry
* Employment Inquiry
* Partnership Opportunity
* Existing Project Support
* Other

The recipient employee must be selected only through the approved employee identifier.

The user must never be able to manually type or modify the hidden recipient email address.

## Attachment Support

Allow attachments for construction-related documents such as:

* PDF
* DOC
* DOCX
* XLS
* XLSX
* PNG
* JPG
* JPEG
* ZIP, only if securely supported

Attachments may include:

* Project briefs
* Drawings
* Tender documents
* Bills of quantities
* Company profiles
* Site images
* Specifications
* Requests for quotation

For the demo:

* Allow one or more attachments only if the selected backend supports them safely.
* Use a maximum size of approximately 5 MB per file.
* Display allowed file types.
* Show uploaded file names.
* Allow removal before submission.
* Reject unsupported or oversized files.
* Do not rely only on frontend file validation.
* Revalidate all attachments on the backend.

Do not attempt to preview unsafe file formats.

## Email Sending Behaviour

When the visitor submits the form:

1. Validate all required fields.
2. Validate the sender’s email address.
3. Validate the phone number where provided.
4. Validate the inquiry type.
5. Validate the subject and message length.
6. Validate attachment type and size.
7. Submit the safe employee identifier and form data to the backend.
8. Let the backend determine the real recipient email address.
9. Send the email to the selected employee.
10. Set the visitor’s email as the reply-to address where supported.
11. Attach approved files to the email.
12. Return only a success or generic error response.
13. Never return the employee’s real email address.
14. Prevent duplicate form submissions.

The email body should contain:

* Selected employee name
* Selected employee department
* Sender name
* Sender email
* Sender phone number
* Sender company
* Inquiry type
* Subject
* Message
* Attachment details
* Date and time of submission
* Website source

Use a professional HTML email template styled for a construction company.

## User Feedback

Show polished interface states for:

* Form ready
* Sending
* Message sent successfully
* Validation error
* Attachment too large
* Unsupported file
* Server error
* Rate limit reached
* Network failure

Disable the send button while the message is being processed.

After success:

* Show a clear confirmation message.
* Reset the form.
* Keep the selected employee visible in the confirmation.
* Do not reveal the employee’s email address.

Suggested confirmation wording:

“Your message has been sent to our team successfully. A representative will respond using the contact details you provided.”

## Security Requirements

Even though this is a demo, implement secure development practices.

### Frontend Security

* Do not include employee emails in frontend files.
* Do not include employee emails in employee data objects.
* Do not include email credentials in Vite environment variables.
* Do not include private API keys in JavaScript bundles.
* Do not expose backend configuration.
* Do not send the recipient email from the browser.
* Do not store sensitive form information in local storage.
* Escape rendered content.
* Use safe form validation.

Remember that variables prefixed with `VITE_` are visible to the browser and must never contain secrets.

### Backend Security

* Store employee email mappings only on the server.
* Store email-provider credentials in secure environment variables.
* Reject unknown employee identifiers.
* Validate and sanitize every input.
* Validate MIME type, file extension, and size.
* Limit subject and message lengths.
* Restrict accepted origins using CORS.
* Add rate limiting by IP or request fingerprint.
* Add a hidden honeypot field.
* Create a CAPTCHA integration point.
* Return generic error messages.
* Avoid logging attachment contents.
* Avoid logging sensitive personal data unnecessarily.
* Prevent email-header injection.
* Prevent arbitrary recipient injection.
* Prevent file-path manipulation.
* Enforce HTTP method restrictions.
* Use secure transport.
* Add request timeouts.
* Add server-side spam protection.

## Hidden Employee Mapping

The frontend employee object should resemble:

```js
{
  id: "employee-001",
  name: "Employee Name",
  title: "Project Manager",
  department: "Projects",
  image: "/assets/team/employee-name.jpg"
}
```

It must not contain:

```js
email: "employee@company.com"
```

The backend should maintain the protected mapping.

Example structure:

```js
const employeeEmailMap = {
  "employee-001": process.env.EMPLOYEE_001_EMAIL,
  "employee-002": process.env.EMPLOYEE_002_EMAIL,
  "employee-003": process.env.EMPLOYEE_003_EMAIL
};
```

Never expose this mapping through an API endpoint.

Create placeholder environment variables in `.env.example`, such as:

```env
EMAIL_PROVIDER_API_KEY=
EMAIL_FROM_ADDRESS=
EMPLOYEE_001_EMAIL=
EMPLOYEE_002_EMAIL=
EMPLOYEE_003_EMAIL=
ALLOWED_ORIGIN=
```

Do not place actual credentials or email addresses in `.env.example`.

## Contact Section

Create a general company contact section containing only information supplied in the project folder.

It may include:

* Company office location
* Public company phone number
* General public email, only if approved for display
* Business hours
* Map placeholder
* Contact call-to-action

Do not expose private employee contact details.

## Footer

Create a strong construction-company footer with:

* Logo
* Short company description
* Navigation links
* Services links
* Public contact information
* Social links
* Privacy Policy
* Terms and Conditions
* Copyright notice

Use the actual company name discovered in the project folder.

## Responsive Requirements

The website must work properly on:

* Large desktop monitors
* Standard desktops
* Laptops
* Tablets
* Mobile phones

Pay special attention to:

* Navigation
* Hero image cropping
* Project galleries
* Employee cards
* Message modal
* Attachment controls
* Long employee names
* Arabic and English text
* Form button spacing
* Mobile keyboard behaviour

## Bilingual Support

If both Arabic and English company assets or content are present, structure the website so bilingual support can be added easily.

Prefer one of these approaches:

* English and Arabic language switcher
* Translation-ready content objects
* Separate locale JSON files

Support:

* Left-to-right English layouts
* Right-to-left Arabic layouts
* Mirrored navigation where appropriate
* Correct Arabic text alignment
* Fonts that properly support Arabic

Do not translate official company names unless a supplied translation exists.

## Accessibility

Include:

* Semantic HTML
* Correct heading hierarchy
* Descriptive image alternative text
* Accessible form labels
* Keyboard navigation
* Visible focus states
* Accessible modal controls
* Escape-key modal closing
* Focus trapping
* Screen-reader-friendly form errors
* Sufficient color contrast
* Proper button labels
* Reduced-motion support

## Performance

Optimize the website for a professional client demonstration.

Include:

* Compressed images
* Responsive image sizes
* Lazy loading below the fold
* Optimized project photos
* Minimal dependencies
* Code splitting where useful
* Fast initial rendering
* No unnecessary video backgrounds
* No large unoptimized assets
* Proper caching
* SEO metadata
* Open Graph metadata
* Favicon support

## SEO Metadata

Add professional metadata based on the supplied company name and services.

Include:

* Page title
* Meta description
* Open Graph title
* Open Graph description
* Open Graph image
* Social sharing metadata
* Organization structured data
* Local business or contractor structured data where appropriate
* Descriptive page headings
* Clean URLs where supported

Do not add inaccurate addresses, service areas, certifications, or business claims.

## Content Rules

Use real information found in the project folder whenever possible.

Do not invent:

* Certifications
* Government approvals
* Awards
* Client names
* Partner names
* Revenue figures
* Safety records
* Project values
* Completion dates
* Office locations
* Years of experience
* Employee qualifications

When real information is unavailable, use clearly marked placeholders that can easily be replaced.

Maintain a professional construction-industry writing style.

The tone should be:

* Confident
* Direct
* Trustworthy
* Technical without being difficult to understand
* Focused on quality, safety, reliability, and delivery

## Suggested Folder Structure

Use a clean structure similar to:

```text
project-root/
├── frontend/
│   ├── public/
│   │   ├── assets/
│   │   │   ├── logos/
│   │   │   ├── projects/
│   │   │   ├── team/
│   │   │   ├── certificates/
│   │   │   └── icons/
│   ├── src/
│   │   ├── components/
│   │   ├── sections/
│   │   ├── data/
│   │   ├── hooks/
│   │   ├── services/
│   │   ├── utils/
│   │   └── styles/
│   ├── index.html
│   └── package.json
├── backend/
│   ├── api/
│   ├── utils/
│   ├── templates/
│   ├── package.json
│   └── .env.example
├── README.md
└── .gitignore
```

Adapt the structure when required by the chosen deployment platform.

## GitHub Pages Deployment

Configure the frontend for GitHub Pages.

Include:

* Correct Vite base path
* GitHub Actions deployment workflow
* Production build command
* Public asset handling
* Environment-specific API URL
* SPA routing handling if needed
* Deployment instructions in the README

The serverless email endpoint must be deployed separately because GitHub Pages cannot securely execute backend email logic.

## Demo Configuration

For the demo:

* Use test employee email accounts.
* Store test recipient emails only in backend environment variables.
* Use a test email provider or approved SMTP account.
* Clearly explain how to replace the demo provider later.
* Provide setup instructions without committing credentials.
* Include a safe fallback mode where form submissions can be logged locally during development without exposing private data.

Do not simulate successful email delivery when the backend request fails.

## Required Deliverables

Generate the complete project, including:

* Premium construction company landing page
* Responsive navigation
* Hero section
* Company introduction
* Services section
* Projects section
* Safety and quality section
* Company strengths
* Statistics section
* Employee directory
* Employee contact modal
* Attachment upload interface
* Form validation
* Hidden recipient mapping
* Serverless email endpoint
* Professional HTML email template
* Success and error states
* GitHub Pages deployment workflow
* Serverless deployment instructions
* `.env.example`
* `.gitignore`
* README
* Accessible components
* SEO metadata
* Reusable React components
* Clean project structure

## Final Review Checklist

Before completing the project, verify all of the following:

* The design clearly represents a construction company.
* The official logo is used correctly.
* Company and employee names are loaded from supplied project assets where available.
* No employee email is present in frontend code.
* No email credential is committed to GitHub.
* No private key is included in Vite variables.
* Unknown employee identifiers are rejected.
* Attachments are validated on both frontend and backend.
* The message form works on mobile.
* The modal is keyboard accessible.
* Success is shown only after confirmed backend delivery.
* Error messages do not reveal server details.
* Project images are optimized.
* Placeholders are clearly marked.
* The GitHub Pages build works.
* The serverless backend deployment is documented.
* The final result looks polished enough for presentation to a construction company client.

## Desktop and Mobile Usability — Mandatory Requirement

The website must provide a smooth, fast, accessible, and fully functional experience on both desktop and mobile devices. Mobile support must not be treated as a simplified afterthought.

Build using a mobile-first responsive approach and ensure that every section, interaction, form, image, and navigation element adapts correctly to different screen sizes.

### Supported Screen Sizes

Test and optimize the website for:

* Small mobile phones from approximately 320px wide
* Standard mobile phones
* Large mobile phones
* Tablets in portrait and landscape mode
* Small laptops
* Standard desktop screens
* Large desktop monitors

Do not allow horizontal scrolling at any supported screen size.

### Responsive Layout

Ensure that:

* Content remains readable without zooming.
* Sections resize naturally without appearing crowded.
* Text does not overlap images or buttons.
* Long company and employee names wrap correctly.
* Cards change from multi-column desktop layouts to single-column or compact mobile layouts.
* Project galleries remain easy to browse on touchscreens.
* Images use responsive sizing and appropriate cropping.
* Decorative elements never cover important content.
* Spacing remains balanced on both small and large screens.
* Buttons remain visible and easy to press.
* Tables, where unavoidable, become scrollable or convert into mobile-friendly cards.
* The website respects device safe areas, including phones with notches.

### Mobile Navigation

Create a reliable mobile navigation menu with:

* A clearly visible menu button
* Smooth opening and closing
* Keyboard accessibility
* Screen-reader labels
* Escape-key support where relevant
* Automatic closing after selecting a navigation link
* Background scroll locking while the menu is open
* Large touch-friendly navigation links
* No hidden or unreachable menu items

The desktop navigation should transition cleanly into the mobile menu at the appropriate breakpoint.

### Touch Interaction

All interactive elements must work smoothly with touch input.

Requirements:

* Use touch targets of at least approximately 44 × 44 pixels.
* Maintain sufficient spacing between buttons and links.
* Do not depend only on hover effects.
* Provide visible pressed, active, focus, and selected states.
* Avoid interactions that require precise tapping.
* Ensure sliders, menus, file uploads, and modal controls work on mobile browsers.
* Prevent accidental double submission of forms.
* Avoid delayed or unresponsive button feedback.

### Employee Message Modal

The employee contact form must adapt specifically for mobile devices.

On desktop:

* Display it as a centered, professionally sized modal or side panel.
* Keep the selected employee clearly visible.
* Avoid excessive unused space.

On mobile:

* Display it as a full-screen or nearly full-screen panel.
* Keep the close button permanently accessible.
* Make all inputs full width.
* Use suitable mobile input types such as `email`, `tel`, and file input.
* Ensure the form remains usable when the on-screen keyboard is open.
* Prevent the keyboard from hiding the active field or send button.
* Allow the form content to scroll without scrolling the background page.
* Keep validation messages close to the relevant fields.
* Ensure attachment controls do not overflow the screen.
* Preserve entered form information when device orientation changes.
* Restore focus correctly after the modal closes.

### Mobile Form Experience

Optimize the message form for quick completion on a phone.

Include:

* Proper input autocomplete attributes
* Correct mobile keyboard types
* Clear labels above inputs
* Readable validation messages
* Sufficient spacing between fields
* A large send button
* Loading feedback immediately after submission
* Protection against repeated taps
* Clear attachment size and format information
* Visible uploaded file names
* Easy file removal
* Form values that remain intact after a validation error

Do not use placeholder text as the only form label.

### Accessibility

Target WCAG 2.2 Level AA practices where reasonably possible.

Include:

* Semantic HTML
* Logical heading order
* Keyboard-accessible navigation
* Visible keyboard focus indicators
* Screen-reader-compatible labels
* Accessible validation messages
* Sufficient text and interface contrast
* Alternative text for meaningful images
* Empty alternative text for decorative images
* Proper dialog roles and accessible modal names
* Focus trapping inside open dialogs
* Focus restoration when dialogs close
* Escape-key support
* Reduced-motion support
* No information communicated by color alone
* No autoplaying audio or distracting animation
* Text that remains usable when enlarged to 200%
* Layouts that remain functional during browser zoom

### Performance on Mobile Networks

Optimize the website for users with slower mobile connections.

Requirements:

* Compress all construction and project images.
* Use responsive image formats such as WebP or AVIF with suitable fallbacks.
* Use `srcset` and `sizes` where appropriate.
* Lazy-load images below the initial viewport.
* Prioritize the main logo and hero content.
* Avoid loading unnecessary JavaScript.
* Avoid oversized animation libraries.
* Minimize layout shifts.
* Reserve image dimensions before loading.
* Display loading feedback during network requests.
* Handle slow or interrupted email submissions gracefully.
* Do not lose the user’s message when a recoverable network error occurs.

### Smooth Visual Behaviour

Animations should be subtle and efficient.

* Prefer CSS transitions and GPU-friendly properties.
* Avoid animations that cause layout movement or mobile lag.
* Respect the user’s `prefers-reduced-motion` setting.
* Disable or simplify heavy animations on small or low-performance devices.
* Ensure scrolling remains smooth.
* Avoid scroll hijacking.
* Avoid excessive parallax effects.
* Prevent sticky headers from covering section headings.
* Use smooth anchor scrolling only when reduced motion is not requested.

### Browser Compatibility

Test the website on current versions of:

* Google Chrome
* Microsoft Edge
* Mozilla Firefox
* Safari
* Chrome for Android
* Safari on iPhone and iPad

The core experience must remain functional even when optional visual effects are unsupported.

### Required Responsive Testing

Before considering the project complete, test:

* Navigation opening and closing
* Every navigation link
* Employee card selection
* Message modal opening and closing
* Form completion
* Validation errors
* File attachment selection
* Attachment removal
* Email submission
* Success and error messages
* Keyboard navigation
* Screen-reader labels
* Screen orientation changes
* Browser zoom
* Slow network behaviour
* Long employee names
* Long messages
* Small-screen scrolling
* Desktop resizing
* Touch input
* Physical keyboard input

Use browser responsive testing tools and, where possible, test on at least one real mobile device.

### Completion Standard

The project is not complete if:

* Any content overflows on mobile.
* Horizontal scrolling appears.
* The message form is difficult to use with a mobile keyboard.
* Buttons are too small to tap comfortably.
* Desktop-only hover interactions block mobile users.
* The navigation becomes inaccessible at any screen size.
* The employee modal extends beyond the visible screen without usable scrolling.
* The send button becomes hidden or unreachable.
* Text becomes unreadable or overlaps other content.
* Images significantly slow down mobile loading.
* Keyboard users cannot access all important functions.
* Focus becomes trapped incorrectly.
* The website looks polished on desktop but unfinished on mobile.

The final experience must feel intentionally designed for both desktop and mobile rather than merely resized to fit smaller screens.

Build the project as a realistic, functional, premium client demo rather than a simple design mockup.
