import { useEffect, useRef, useState } from "react";
import { X, Paperclip, Trash2, CheckCircle2, AlertCircle } from "lucide-react";

const accepted = [".pdf", ".doc", ".docx", ".xls", ".xlsx", ".png", ".jpg", ".jpeg"];
const maxSize = 5 * 1024 * 1024;
const modalCopy = {
  en:{secure:"SECURE CONTACT FORM",received:"Message received.",send:"Send a message",intro:"Complete the form below and we’ll route your enquiry securely.",success:"Your message has been sent to our team successfully. A representative will respond using the contact details you provided.",done:"Done",to:"YOUR MESSAGE WILL BE SENT TO",details:"Your details",detailsHelp:"So our team can respond to you",fullName:"Full name",email:"Email address",phone:"Phone number",company:"Company",optional:"Optional",namePh:"Enter your full name",companyPh:"Company name",messageSection:"Your message",messageHelp:"Tell us how we can help",subject:"Subject",subjectPh:"What would you like to discuss?",message:"Message",messagePh:"Share the key details of your enquiry…",attach:"Attach documents",attachHelp:"PDF, Office, PNG or JPG · up to 5 MB each · max 3",choose:"Choose files",cancel:"Cancel",sending:"Sending your message…",sendButton:"Send message",privacy:"Recipient details remain protected. Your information is used only to respond to this enquiry.",close:"Close message form"},
  ar:{secure:"نموذج تواصل آمن",received:"تم استلام الرسالة.",send:"إرسال رسالة",intro:"أكمل النموذج وسنوجّه استفسارك بأمان إلى الشخص المناسب.",success:"تم إرسال رسالتك إلى فريقنا بنجاح. سيتواصل معك أحد ممثلينا عبر البيانات التي قدمتها.",done:"تم",to:"سيتم إرسال رسالتك إلى",details:"بياناتك",detailsHelp:"حتى يتمكن فريقنا من الرد عليك",fullName:"الاسم الكامل",email:"البريد الإلكتروني",phone:"رقم الهاتف",company:"الشركة",optional:"اختياري",namePh:"أدخل اسمك الكامل",companyPh:"اسم الشركة",messageSection:"رسالتك",messageHelp:"أخبرنا كيف يمكننا مساعدتك",subject:"الموضوع",subjectPh:"ما الموضوع الذي ترغب في مناقشته؟",message:"الرسالة",messagePh:"شارك التفاصيل الأساسية لاستفسارك…",attach:"إرفاق مستندات",attachHelp:"PDF أو Office أو PNG أو JPG · بحد أقصى 5 ميجابايت للملف · 3 ملفات",choose:"اختر الملفات",cancel:"إلغاء",sending:"جارٍ إرسال رسالتك…",sendButton:"إرسال الرسالة",privacy:"تبقى بيانات المستلم محمية. تُستخدم معلوماتك فقط للرد على هذا الاستفسار.",close:"إغلاق نموذج الرسالة"}
};

export default function ContactModal({ employee, lang = "en", onClose }) {
  const c = modalCopy[lang];
  const isAr = lang === "ar";
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
    const form = event.currentTarget;
    const data = new FormData(form);
    data.set("employeeId", employee.id);
    files.forEach(file => data.append("attachments", file));
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 20000);
    try {
      const res = await fetch("/api/contact", {
        method: "POST", body: data, signal: controller.signal
      });
      if (!res.ok) {
        if (res.status === 429) throw new Error("Too many requests. Please wait and try again.");
        throw new Error("We could not send your message. Please try again.");
      }
      form.reset();
      setFiles([]);
      setStatus("sent");
    } catch (e) {
      setStatus("error");
      setError(e.name === "AbortError" ? "The request timed out. Please try again." : e.message);
    } finally {
      clearTimeout(timeout);
    }
  };

  return (
    <div className="modal-backdrop" role="presentation" onMouseDown={e => e.target === e.currentTarget && onClose()}>
      <section ref={dialog} className="modal" role="dialog" aria-modal="true" aria-labelledby="message-title">
        <button ref={first} className="modal-close" onClick={onClose} aria-label={c.close}><X /></button>
        <div className="modal-head">
          <span className="eyebrow">{c.secure}</span>
          <h2 id="message-title">{status === "sent" ? c.received : c.send}</h2>
          {status !== "sent" && <p>{c.intro}</p>}
        </div>
        {status === "sent" ? (
          <div className="success-state">
            <CheckCircle2 />
            <p>{c.success}</p>
            <button className="btn btn-dark" onClick={onClose}>{c.done}</button>
          </div>
        ) : (
          <form onSubmit={submit}>
            <input name="website" className="honeypot" tabIndex="-1" autoComplete="off" aria-hidden="true" />
            <div className="recipient-summary">
              <div className="recipient-avatar">{employee.name.split(/\s+/).slice(0, 2).map(word => word[0]).join("")}</div>
              <div><small>{c.to}</small><strong>{isAr ? employee.nameAr : employee.name}</strong></div>
              <CheckCircle2 aria-label="Recipient selected" />
            </div>
            <div className="form-section-title"><span>1</span><div><strong>{c.details}</strong><small>{c.detailsHelp}</small></div></div>
            <div className="form-grid">
              <label>{c.fullName} <b>*</b><input name="name" required minLength="2" maxLength="100" autoComplete="name" placeholder={c.namePh} /></label>
              <label>{c.email} <b>*</b><input name="email" type="email" required maxLength="150" autoComplete="email" placeholder="you@company.com" /></label>
              <label>{c.phone} <em>{c.optional}</em><input name="phone" type="tel" pattern="[+0-9() .-]{7,30}" autoComplete="tel" placeholder="+000 000 0000" /></label>
              <label>{c.company} <em>{c.optional}</em><input name="company" maxLength="120" autoComplete="organization" placeholder={c.companyPh} /></label>
            </div>
            <div className="form-section-title"><span>2</span><div><strong>{c.messageSection}</strong><small>{c.messageHelp}</small></div></div>
            <div className="form-grid">
              <label className="span-2">{c.subject} <b>*</b><input name="subject" required minLength="3" maxLength="150" placeholder={c.subjectPh} /></label>
              <label className="span-2">{c.message} <b>*</b><textarea name="message" required minLength="20" maxLength="5000" rows="5" placeholder={c.messagePh} /></label>
            </div>
            <label className="file-picker">
              <Paperclip /> <span><b>{c.attach}</b><small>{c.attachHelp}</small></span>
              <strong>{c.choose}</strong>
              <input type="file" multiple accept={accepted.join(",")} onChange={chooseFiles} />
            </label>
            {files.map((f, i) => <div className="file-row" key={`${f.name}-${i}`}><span>{f.name} · {(f.size / 1048576).toFixed(1)} MB</span><button type="button" onClick={() => setFiles(files.filter((_, x) => x !== i))} aria-label={`Remove ${f.name}`}><Trash2 /></button></div>)}
            {error && <p className="form-error" role="alert"><AlertCircle />{error}</p>}
            <div className="form-actions"><button type="button" className="btn btn-ghost" onClick={onClose}>{c.cancel}</button><button className="btn btn-accent send-button" disabled={status === "sending"}>{status === "sending" ? c.sending : <>{c.sendButton} <span>→</span></>}</button></div>
            <p className="privacy-note"><CheckCircle2 /> {c.privacy}</p>
          </form>
        )}
      </section>
    </div>
  );
}
