const allowedExtensions = new Set(["pdf", "doc", "docx", "xls", "xlsx", "png", "jpg", "jpeg"]);
const allowedMimeTypes = new Set([
  "application/pdf", "application/msword",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  "application/vnd.ms-excel", "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
  "image/png", "image/jpeg"
]);
const employeeNames = ["Fahad", "Bader", "Ali", "Jahangir Alam"];
const departments = employeeNames.map(() => "Faall Employee");
const hits = new Map();
const value = input => String(input || "").trim();
const headerSafe = input => !/[\r\n]/.test(input);
const escapeHtml = (input = "") => String(input).replace(
  /[&<>"']/g,
  character => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[character]
);

function corsHeaders(request) {
  const origin = request.headers.get("Origin");
  const requestOrigin = new URL(request.url).origin;
  const headers = {
    "Access-Control-Allow-Methods": "POST, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type",
    "Vary": "Origin"
  };
  if (origin === requestOrigin) headers["Access-Control-Allow-Origin"] = origin;
  return headers;
}

function json(request, body, status = 200) {
  return Response.json(body, { status, headers: corsHeaders(request) });
}

function employeeNumber(identifier) {
  const match = value(identifier).match(/^(?:emp[_-]?|employee[_-]?)(\d{1,3})$/i);
  if (!match) return "";
  const number = Number(match[1]);
  return number >= 1 && number <= departments.length ? String(number).padStart(3, "0") : "";
}

function rateLimited(request) {
  const ip = request.headers.get("CF-Connecting-IP") || request.headers.get("X-Forwarded-For")?.split(",")[0] || "unknown";
  const now = Date.now();
  const recent = (hits.get(ip) || []).filter(timestamp => now - timestamp < 15 * 60_000);
  recent.push(now);
  hits.set(ip, recent);
  if (hits.size > 5000) hits.clear();
  return recent.length > 5;
}

function toBase64(buffer) {
  const bytes = new Uint8Array(buffer);
  let binary = "";
  for (let offset = 0; offset < bytes.length; offset += 0x8000) {
    binary += String.fromCharCode(...bytes.subarray(offset, offset + 0x8000));
  }
  return btoa(binary);
}

function emailHtml(data) {
  const row = (label, rowValue) => rowValue
    ? `<tr><td style="padding:9px 0;color:#768287;width:150px">${label}</td><td style="padding:9px 0;color:#132226;font-weight:600">${escapeHtml(rowValue)}</td></tr>`
    : "";
  return `<!doctype html><html><body style="margin:0;background:#eef0ed;font-family:Arial,sans-serif;color:#132226">
  <div style="max-width:680px;margin:32px auto;background:#fff;border-top:6px solid #e55c2b">
    <div style="padding:32px;background:#132226;color:#fff"><div style="font-size:12px;letter-spacing:2px;color:#e55c2b">FAALL CONTRACTING</div><h1 style="margin:12px 0 0;font-size:27px">New website enquiry</h1></div>
    <div style="padding:32px"><table style="border-collapse:collapse;width:100%">
      ${row("Recipient", data.employeeName)}${row("Department", data.department)}${row("Sender", data.name)}
      ${row("Email", data.email)}${row("Phone", data.phone)}${row("Company", data.company)}
      ${row("Subject", data.subject)}${row("Submitted", data.submittedAt)}
      ${row("Website source", data.source)}${row("Attachments", data.attachmentNames)}
    </table><div style="margin-top:24px;padding:22px;background:#f4f3ef;border-left:4px solid #e55c2b;line-height:1.65;white-space:pre-wrap">${escapeHtml(data.message)}</div></div>
    <div style="padding:18px 32px;color:#788286;font-size:12px;border-top:1px solid #e2e5e2">Reply directly to this email to respond to the sender.</div>
  </div></body></html>`;
}

export async function onRequestOptions(context) {
  const origin = context.request.headers.get("Origin");
  if (origin && origin !== new URL(context.request.url).origin) {
    return json(context.request, { error: "Request not accepted." }, 403);
  }
  return new Response(null, { status: 204, headers: corsHeaders(context.request) });
}

export async function onRequestPost(context) {
  const { request, env } = context;
  const origin = request.headers.get("Origin");
  if (origin && origin !== new URL(request.url).origin) return json(request, { error: "Request not accepted." }, 403);
  if (rateLimited(request)) return json(request, { error: "Please wait before trying again." }, 429);

  try {
    const form = await request.formData();
    if (value(form.get("website"))) return json(request, { error: "Unable to process request." }, 400);

    const number = employeeNumber(form.get("employeeId"));
    const recipient = number ? env[`EMPLOYEE_${number}_EMAIL`] : "";
    const dryRun = env.CONTACT_DRY_RUN === "true";
    const data = {
      name: value(form.get("name")),
      email: value(form.get("email")).toLowerCase(),
      phone: value(form.get("phone")),
      company: value(form.get("company")),
      subject: value(form.get("subject")),
      message: value(form.get("message"))
    };

    if (!number || (!dryRun && !recipient) || !data.name || !data.subject || !data.message) {
      return json(request, { error: "Please check the form and try again." }, 400);
    }
    if (data.name.length > 100 || data.company.length > 120 || data.subject.length < 3 || data.subject.length > 150 || data.message.length < 20 || data.message.length > 5000) {
      return json(request, { error: "Please check the form and try again." }, 400);
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email) || data.email.length > 150 || !headerSafe(data.email) || !headerSafe(data.subject)) {
      return json(request, { error: "Please check the form and try again." }, 400);
    }
    if (data.phone && !/^[+0-9() .-]{7,30}$/.test(data.phone)) {
      return json(request, { error: "Please check the form and try again." }, 400);
    }

    const files = form.getAll("attachments").filter(entry => typeof entry !== "string" && entry.size > 0);
    if (files.length > 3) return json(request, { error: "A maximum of three attachments is allowed." }, 400);
    if (files.reduce((total, file) => total + file.size, 0) > 15 * 1024 * 1024) {
      return json(request, { error: "Attachments exceed the total size limit." }, 400);
    }

    const attachments = [];
    for (const file of files) {
      const extension = value(file.name).split(".").pop().toLowerCase();
      if (!allowedExtensions.has(extension) || !allowedMimeTypes.has(file.type) || file.size > 5 * 1024 * 1024) {
        return json(request, { error: "One or more attachments are not accepted." }, 400);
      }
      attachments.push({
        filename: value(file.name).replace(/[^\w .()-]/g, "_"),
        content: toBase64(await file.arrayBuffer())
      });
    }

    const emailData = {
      ...data,
      employeeName: employeeNames[Number(number) - 1],
      department: departments[Number(number) - 1],
      submittedAt: new Date().toISOString(),
      source: "Faall Contracting website",
      attachmentNames: attachments.map(attachment => attachment.filename).join(", ") || "None"
    };

    if (dryRun) {
      console.info("Contact dry run accepted", {
        employeeId: `EMPLOYEE_${number}`,
        attachmentCount: attachments.length
      });
      return json(request, { ok: true });
    }
    if (!env.RESEND_API_KEY || !env.EMAIL_FROM_ADDRESS) {
      console.error("Contact delivery is not configured.");
      return json(request, { error: "Message delivery is temporarily unavailable." }, 503);
    }

    const resend = new Resend(env.RESEND_API_KEY);
    const result = await resend.emails.send({
      from: env.EMAIL_FROM_ADDRESS,
      to: recipient,
      replyTo: data.email,
      subject: `[Website] ${data.subject}`,
      html: emailHtml(emailData),
      attachments
    });
    if (result.error) {
      console.error("Resend rejected contact delivery.", { name: result.error.name });
      return json(request, { error: "We could not send your message. Please try again." }, 502);
    }
    return json(request, { ok: true });
  } catch (error) {
    console.error("Contact request failed.", { message: error instanceof Error ? error.message : "Unknown error" });
    return json(request, { error: "We could not process your message. Please check the form and try again." }, 400);
  }
}
import { Resend } from "resend";
