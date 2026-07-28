import formidable from "formidable";
import { readFile } from "node:fs/promises";
import { Resend } from "resend";
import { contactEmail } from "../templates/contactEmail.js";

const departments = [
  "Management","Management","Operations","Projects","Projects","Projects","Projects","Projects",
  "Project Controls","Project Controls","Commercial","Commercial","Business Development",
  "Business Development","Engineering","Engineering","Engineering","Engineering","Engineering",
  "Procurement","Procurement","Contracts","Health & Safety","Health & Safety","Quality","Quality",
  "Finance","Human Resources","Administration","Administration"
];
const employeeMap = Object.fromEntries(departments.map((department, index) => {
  const number = String(index + 1).padStart(3, "0");
  return [`employee-${number}`, {
    email: process.env[`EMPLOYEE_${number}_EMAIL`],
    name: `Employee ${String(index + 1).padStart(2, "0")}`,
    department
  }];
}));
const inquiryTypes = new Set(["General Inquiry","Project Consultation","Request for Quotation","Tender Invitation","Supplier Inquiry","Employment Inquiry","Partnership Opportunity","Existing Project Support","Other"]);
const allowedExt = new Set(["pdf","doc","docx","xls","xlsx","png","jpg","jpeg"]);
const allowedMime = new Set(["application/pdf","application/msword","application/vnd.openxmlformats-officedocument.wordprocessingml.document","application/vnd.ms-excel","application/vnd.openxmlformats-officedocument.spreadsheetml.sheet","image/png","image/jpeg"]);
const hits = new Map();
const value = x => Array.isArray(x) ? String(x[0] || "").trim() : String(x || "").trim();
const headerSafe = x => !/[\r\n]/.test(x);

function rateLimited(ip) {
  const now = Date.now(), recent = (hits.get(ip) || []).filter(t => now - t < 15 * 60_000);
  recent.push(now); hits.set(ip, recent);
  if (hits.size > 5000) hits.clear();
  return recent.length > 5;
}

async function parse(req) {
  const form = formidable({
    multiples: true, maxFiles: 3, maxFileSize: 5 * 1024 * 1024,
    maxTotalFileSize: 15 * 1024 * 1024, allowEmptyFiles: false
  });
  return new Promise((resolve, reject) => form.parse(req, (err, fields, files) => err ? reject(err) : resolve({ fields, files })));
}

export default async function handler(req, res) {
  const origin = req.headers.origin;
  const allowedOrigin = process.env.ALLOWED_ORIGIN;
  if (allowedOrigin && origin === allowedOrigin) {
    res.setHeader("Access-Control-Allow-Origin", allowedOrigin);
    res.setHeader("Vary", "Origin");
  }
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  if (req.method === "OPTIONS") return origin === allowedOrigin ? res.status(204).end() : res.status(403).end();
  if (req.method !== "POST") return res.status(405).json({ error: "Request not accepted." });
  if (!allowedOrigin || origin !== allowedOrigin) return res.status(403).json({ error: "Request not accepted." });
  const ip = value(req.headers["x-forwarded-for"]).split(",")[0] || req.socket?.remoteAddress || "unknown";
  if (rateLimited(ip)) return res.status(429).json({ error: "Please wait before trying again." });

  try {
    const { fields, files } = await parse(req);
    if (value(fields.website)) return res.status(400).json({ error: "Unable to process request." });
    const employeeId = value(fields.employeeId);
    const employee = employeeMap[employeeId];
    const data = {
      name: value(fields.name), email: value(fields.email).toLowerCase(), phone: value(fields.phone),
      company: value(fields.company), inquiryType: value(fields.inquiryType),
      subject: value(fields.subject), message: value(fields.message)
    };
    const dryRun = process.env.CONTACT_DRY_RUN === "true";
    if (!employee || (!dryRun && !employee.email) || !data.name || !data.subject || !data.message || !inquiryTypes.has(data.inquiryType)) throw new Error("invalid");
    if (data.name.length > 100 || data.company.length > 120 || data.subject.length < 3 || data.subject.length > 150 || data.message.length < 20 || data.message.length > 5000) throw new Error("invalid");
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email) || data.email.length > 150 || !headerSafe(data.email) || !headerSafe(data.subject)) throw new Error("invalid");
    if (data.phone && !/^[+0-9() .-]{7,30}$/.test(data.phone)) throw new Error("invalid");

    // CAPTCHA integration point: verify fields.captchaToken against CAPTCHA_SECRET here before production launch.
    const uploaded = files.attachments ? (Array.isArray(files.attachments) ? files.attachments : [files.attachments]) : [];
    const attachments = [];
    for (const file of uploaded) {
      const ext = value(file.originalFilename).split(".").pop().toLowerCase();
      if (!allowedExt.has(ext) || !allowedMime.has(value(file.mimetype)) || file.size > 5 * 1024 * 1024) throw new Error("invalid attachment");
      attachments.push({ filename: value(file.originalFilename).replace(/[^\w .()-]/g, "_"), content: (await readFile(file.filepath)).toString("base64") });
    }
    const emailData = {
      ...data, employeeName: employee.name, department: employee.department,
      submittedAt: new Date().toISOString(), source: "Faall Contracting website",
      attachmentNames: attachments.map(x => x.filename).join(", ") || "None"
    };
    if (dryRun) {
      console.info("Contact dry run accepted", { employeeId, inquiryType: data.inquiryType, attachmentCount: attachments.length });
      return res.status(200).json({ ok: true });
    }
    if (!process.env.RESEND_API_KEY || !process.env.EMAIL_FROM_ADDRESS) throw new Error("not configured");
    const resend = new Resend(process.env.RESEND_API_KEY);
    const result = await resend.emails.send({
      from: process.env.EMAIL_FROM_ADDRESS, to: employee.email,
      replyTo: data.email, subject: `[Website] ${data.subject}`,
      html: contactEmail(emailData), attachments
    });
    if (result.error) throw new Error("delivery failed");
    return res.status(200).json({ ok: true });
  } catch {
    return res.status(400).json({ error: "We could not process your message. Please check the form and try again." });
  }
}
