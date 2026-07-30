Adding a new employee
Optionally place their photo in:
public/images/employees/
Example:
public/images/employees/noura.webp
Add a row to directory in [employees.js](/home/kathos/faallConstructions/src/data/employees.js):
["Noura", "نورة", "/images/employees/noura.webp"]
For the default avatar, leave the image empty:
["Noura", "نورة", ""]
The ID is generated automatically according to array position. The fourth employee becomes emp_04.
Add the same name to employeeNames in [contact.js](/home/kathos/faallConstructions/functions/api/contact.js):
const employeeNames = ["Fahad", "Bader", "Ali", "Noura"];
Add an empty placeholder to [.env.example](/home/kathos/faallConstructions/.env.example):
EMPLOYEE_004_EMAIL=
Store the real email directly as an encrypted Cloudflare secret:
npx wrangler pages secret put EMPLOYEE_004_EMAIL \
  --project-name faall-constructions
Wrangler will securely prompt for the email. Do not put it in a repository file.
Build and deploy:
npm run build
npm run check:functions
npx wrangler pages deploy dist \
  --project-name faall-constructions \
  --branch main
The directory count updates automatically.