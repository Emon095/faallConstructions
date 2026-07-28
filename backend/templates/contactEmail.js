const esc = (value = "") => String(value).replace(/[&<>"']/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]);

export function contactEmail(data) {
  const row = (label, value) => value ? `<tr><td style="padding:9px 0;color:#768287;width:150px">${label}</td><td style="padding:9px 0;color:#132226;font-weight:600">${esc(value)}</td></tr>` : "";
  return `<!doctype html><html><body style="margin:0;background:#eef0ed;font-family:Arial,sans-serif;color:#132226">
  <div style="max-width:680px;margin:32px auto;background:#fff;border-top:6px solid #e55c2b">
    <div style="padding:32px;background:#132226;color:#fff"><div style="font-size:12px;letter-spacing:2px;color:#e55c2b">FAALL CONTRACTING</div><h1 style="margin:12px 0 0;font-size:27px">New website enquiry</h1></div>
    <div style="padding:32px"><table style="border-collapse:collapse;width:100%">
      ${row("Recipient", data.employeeName)}${row("Department", data.department)}${row("Sender", data.name)}
      ${row("Email", data.email)}${row("Phone", data.phone)}${row("Company", data.company)}
      ${row("Inquiry type", data.inquiryType)}${row("Subject", data.subject)}${row("Submitted", data.submittedAt)}
      ${row("Website source", data.source)}${row("Attachments", data.attachmentNames)}
    </table><div style="margin-top:24px;padding:22px;background:#f4f3ef;border-left:4px solid #e55c2b;line-height:1.65;white-space:pre-wrap">${esc(data.message)}</div></div>
    <div style="padding:18px 32px;color:#788286;font-size:12px;border-top:1px solid #e2e5e2">Reply directly to this email to respond to the sender.</div>
  </div></body></html>`;
}
