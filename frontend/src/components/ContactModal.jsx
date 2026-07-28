import { useEffect, useRef, useState } from "react";
import { X, Paperclip, Trash2, CheckCircle2, AlertCircle } from "lucide-react";
import { inquiryTypes } from "../data/content";

const accepted = [".pdf", ".doc", ".docx", ".xls", ".xlsx", ".png", ".jpg", ".jpeg"];
const maxSize = 5 * 1024 * 1024;

export default function ContactModal({ employee, onClose }) {
  const dialog = useRef(null);
  const first = useRef(null);
  const [files, setFiles] = useState([]);
  const [status, setStatus] = useState("ready");
  const [error, setError] = useState("");

  useEffect(() => {
    first.current?.focus();
    const key = (e) => {
      if (e.key === "Escape") onClose();
      if (e.key === "Tab") {
        const nodes = [...dialog.current.querySelectorAll("button,input,select,textarea")].filter(n => !n.disabled);
        if (!nodes.length) return;
        if (e.shiftKey && document.activeElement === nodes[0]) { e.preventDefault(); nodes.at(-1).focus(); }
        if (!e.shiftKey && document.activeElement === nodes.at(-1)) { e.preventDefault(); nodes[0].focus(); }
      }
    };
    document.addEventListener("keydown", key);
    document.body.style.overflow = "hidden";
    return () => { document.removeEventListener("keydown", key); document.body.style.overflow = ""; };
  }, [onClose]);

  const chooseFiles = (event) => {
    setError("");
    const next = [...event.target.files];
    for (const file of next) {
      const ext = `.${file.name.split(".").pop().toLowerCase()}`;
      if (!accepted.includes(ext)) return setError(`${file.name}: unsupported file type.`);
      if (file.size > maxSize) return setError(`${file.name}: file exceeds 5 MB.`);
    }
    setFiles(next.slice(0, 3));
  };

  const submit = async (event) => {
    event.preventDefault();
    if (status === "sending") return;
    setStatus("sending"); setError("");
    const data = new FormData(event.currentTarget);
    data.set("employeeId", employee.id);
    files.forEach(file => data.append("attachments", file));
    try {
      const controller = new AbortController();
      const timeout = setTimeout(() => controller.abort(), 20000);
      const res = await fetch(import.meta.env.VITE_CONTACT_API_URL || "http://localhost:3001/api/contact", {
        method: "POST", body: data, signal: controller.signal
      });
      clearTimeout(timeout);
      if (!res.ok) {
        if (res.status === 429) throw new Error("Too many requests. Please wait and try again.");
        throw new Error("We could not send your message. Please try again.");
      }
      setStatus("sent"); event.currentTarget.reset(); setFiles([]);
    } catch (e) {
      setStatus("error");
      setError(e.name === "AbortError" ? "The request timed out. Please try again." : e.message);
    }
  };

  return (
    <div className="modal-backdrop" role="presentation" onMouseDown={e => e.target === e.currentTarget && onClose()}>
      <section ref={dialog} className="modal" role="dialog" aria-modal="true" aria-labelledby="message-title">
        <button ref={first} className="modal-close" onClick={onClose} aria-label="Close message form"><X /></button>
        <div className="modal-head">
          <span className="eyebrow">SECURE CONTACT FORM</span>
          <h2 id="message-title">{status === "sent" ? "Message received." : "Send a message"}</h2>
          {status !== "sent" && <p>Complete the form below and we’ll route your enquiry securely.</p>}
        </div>
        {status === "sent" ? (
          <div className="success-state">
            <CheckCircle2 />
            <p>Your message has been sent to our team successfully. A representative will respond using the contact details you provided.</p>
            <button className="btn btn-dark" onClick={onClose}>Done</button>
          </div>
        ) : (
          <form onSubmit={submit}>
            <input name="website" className="honeypot" tabIndex="-1" autoComplete="off" aria-hidden="true" />
            <div className="recipient-summary">
              <div className="recipient-avatar">{employee.initials}</div>
              <div><small>YOUR MESSAGE WILL BE SENT TO</small><strong>{employee.name}</strong><span>{employee.title} · {employee.department}</span></div>
              <CheckCircle2 aria-label="Recipient selected" />
            </div>
            <div className="form-section-title"><span>1</span><div><strong>Your details</strong><small>So our team can respond to you</small></div></div>
            <div className="form-grid">
              <label>Full name <b>*</b><input name="name" required minLength="2" maxLength="100" autoComplete="name" placeholder="Enter your full name" /></label>
              <label>Email address <b>*</b><input name="email" type="email" required maxLength="150" autoComplete="email" placeholder="you@company.com" /></label>
              <label>Phone number <em>Optional</em><input name="phone" type="tel" pattern="[+0-9() .-]{7,30}" autoComplete="tel" placeholder="+000 000 0000" /></label>
              <label>Company <em>Optional</em><input name="company" maxLength="120" autoComplete="organization" placeholder="Company name" /></label>
            </div>
            <div className="form-section-title"><span>2</span><div><strong>Your message</strong><small>Tell us how we can help</small></div></div>
            <div className="form-grid">
              <label className="span-2">Inquiry type *
                <select name="inquiryType" required defaultValue=""><option value="" disabled>Select inquiry type</option>{inquiryTypes.map(x => <option key={x}>{x}</option>)}</select>
              </label>
              <label className="span-2">Subject <b>*</b><input name="subject" required minLength="3" maxLength="150" placeholder="What would you like to discuss?" /></label>
              <label className="span-2">Message <b>*</b><textarea name="message" required minLength="20" maxLength="5000" rows="5" placeholder="Share the key details of your enquiry…" /></label>
            </div>
            <label className="file-picker">
              <Paperclip /> <span><b>Attach documents</b><small>PDF, Office, PNG or JPG · up to 5 MB each · max 3</small></span>
              <strong>Choose files</strong>
              <input type="file" multiple accept={accepted.join(",")} onChange={chooseFiles} />
            </label>
            {files.map((f, i) => <div className="file-row" key={`${f.name}-${i}`}><span>{f.name} · {(f.size / 1048576).toFixed(1)} MB</span><button type="button" onClick={() => setFiles(files.filter((_, x) => x !== i))} aria-label={`Remove ${f.name}`}><Trash2 /></button></div>)}
            {error && <p className="form-error" role="alert"><AlertCircle />{error}</p>}
            <div className="form-actions"><button type="button" className="btn btn-ghost" onClick={onClose}>Cancel</button><button className="btn btn-accent send-button" disabled={status === "sending"}>{status === "sending" ? "Sending your message…" : <>Send message <span>→</span></>}</button></div>
            <p className="privacy-note"><CheckCircle2 /> Recipient details remain protected. Your information is used only to respond to this enquiry.</p>
          </form>
        )}
      </section>
    </div>
  );
}
