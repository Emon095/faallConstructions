import { useEffect, useState } from "react";
import {
  ArrowRight, ArrowUpRight, ChevronDown, Menu, Quote, X
} from "lucide-react";
import { team } from "./data/content";
import ContactModal from "./components/ContactModal";

const Logo = () => <img src="./assets/logos/faall-primary-logo-trimmed.png" alt="Faall Business For Contracting Est." />;
const translations = {
  en: {
    home:"Home",about:"About",contact:"Contact",contactPerson:"Contact a person",directory:"Direct company directory",
    heroA:"Find the right person.",heroB:"Start the conversation.",heroText:"Reach Faall’s management, projects, engineering, commercial and support teams through one secure contact directory.",
    browse:"Browse 30 contacts",general:"General enquiry",industry:"CONSTRUCTION · ENGINEERING · DELIVERY",demo:"Demo image — replace with company project photography",
    company:"01 / COMPANY",foundation:"A FOUNDATION FOR DELIVERY",aboutA:"Strong structures begin with",aboutB:"strong thinking.",
    aboutText:"Faall Contracting brings planning, technical coordination and hands-on delivery together under one accountable team.",
    plan:"Plan",planText:"Define the route before work begins.",coordinate:"Coordinate",coordinateText:"Keep people, information and decisions aligned.",
    deliver:"Deliver",deliverText:"Turn clear thinking into controlled execution.",placeholder:"Company history, markets and geographic coverage pending approved profile content.",
    framework:"FAALL / DELIVERY FRAMEWORK",frameworkSteps:"PLAN — COORDINATE — BUILD",confidence:"Confidence is built into every stage—from the first review to final handover.",
    approval:"POSITIONING STATEMENT · CLIENT APPROVAL REQUIRED",directoryLabel:"30-PERSON DIRECTORY",speakA:"Speak to the",speakB:"right person.",
    directoryText:"Thirty role-based profiles are ready for approved names, photos and backend-only email addresses. No recipient email is exposed to visitors.",
    rolePending:"Name, profile and protected recipient email pending client approval.",send:"Send message",contactFaall:"CONTACT FAALL",
    unsure:"Not sure who you need?",startDirectory:"Start with our directory.",contactText:"Choose the closest role and your message will be routed securely once approved employee emails are configured.",
    find:"Find a contact",footerText:"Construction shaped by discipline, clarity and lasting value.",navigate:"Navigate",contactDirectory:"Contact directory",
    generalContact:"General contact",information:"Information",privacy:"Privacy",terms:"Terms",publicPending:"Public contact details pending",
    rights:"All rights reserved.",demoApproval:"Demo website · Business content pending approval",switchLabel:"العربية"
  },
  ar: {
    home:"الرئيسية",about:"من نحن",contact:"اتصل بنا",contactPerson:"تواصل مع موظف",directory:"دليل التواصل المباشر",
    heroA:"اعثر على الشخص المناسب.",heroB:"وابدأ المحادثة.",heroText:"تواصل مع فرق الإدارة والمشاريع والهندسة والشؤون التجارية والدعم في مؤسسة فال عبر دليل اتصال آمن واحد.",
    browse:"تصفح 30 جهة اتصال",general:"استفسار عام",industry:"الإنشاءات · الهندسة · التنفيذ",demo:"صورة تجريبية — تُستبدل بصور مشاريع الشركة",
    company:"01 / الشركة",foundation:"أساسٌ راسخ للتنفيذ",aboutA:"المنشآت القوية تبدأ بـ",aboutB:"تفكير قوي.",
    aboutText:"تجمع مؤسسة فال للمقاولات بين التخطيط والتنسيق الفني والتنفيذ الميداني ضمن فريق واحد مسؤول.",
    plan:"التخطيط",planText:"تحديد المسار قبل بدء العمل.",coordinate:"التنسيق",coordinateText:"مواءمة الأشخاص والمعلومات والقرارات.",
    deliver:"التنفيذ",deliverText:"تحويل التفكير الواضح إلى تنفيذ منضبط.",placeholder:"تاريخ الشركة والأسواق ونطاق العمل الجغرافي بانتظار المحتوى المعتمد.",
    framework:"فال / إطار التنفيذ",frameworkSteps:"خطط — نسّق — ابنِ",confidence:"نبني الثقة في كل مرحلة، من المراجعة الأولى حتى التسليم النهائي.",
    approval:"عبارة تعريفية · تتطلب اعتماد العميل",directoryLabel:"دليل يضم 30 موظفاً",speakA:"تحدث إلى",speakB:"الشخص المناسب.",
    directoryText:"ثلاثون ملفاً وظيفياً جاهزاً لإضافة الأسماء والصور وعناوين البريد المحمية بعد اعتمادها. لا يظهر بريد المستلم للزوار.",
    rolePending:"الاسم والملف المهني وبريد المستلم المحمي بانتظار اعتماد العميل.",send:"إرسال رسالة",contactFaall:"تواصل مع فال",
    unsure:"لست متأكداً بمن تتواصل؟",startDirectory:"ابدأ من دليلنا.",contactText:"اختر الدور الأقرب إلى احتياجك وسيتم توجيه رسالتك بأمان بعد إعداد عناوين البريد المعتمدة.",
    find:"اعثر على جهة اتصال",footerText:"إنشاءات تقوم على الانضباط والوضوح والقيمة المستدامة.",navigate:"التنقل",contactDirectory:"دليل التواصل",
    generalContact:"التواصل العام",information:"المعلومات",privacy:"الخصوصية",terms:"الشروط",publicPending:"بيانات التواصل العامة قيد الإضافة",
    rights:"جميع الحقوق محفوظة.",demoApproval:"موقع تجريبي · المحتوى التجاري بانتظار الاعتماد",switchLabel:"English"
  }
};

export default function App() {
  const [menu, setMenu] = useState(false);
  const [selected, setSelected] = useState(null);
  const [scrolled, setScrolled] = useState(false);
  const [lang, setLang] = useState(() => new URLSearchParams(window.location.search).get("lang") === "ar" ? "ar" : "en");
  const t = translations[lang];
  const isAr = lang === "ar";
  useEffect(() => {
    document.documentElement.lang = lang;
    document.documentElement.dir = isAr ? "rtl" : "ltr";
    const url = new URL(window.location.href);
    if (isAr) url.searchParams.set("lang", "ar"); else url.searchParams.delete("lang");
    window.history.replaceState({}, "", url);
  }, [lang, isAr]);
  useEffect(() => {
    const fn = () => setScrolled(scrollY > 24);
    addEventListener("scroll", fn, { passive: true }); fn();
    return () => removeEventListener("scroll", fn);
  }, []);
  useEffect(() => {
    const elements = document.querySelectorAll("[data-reveal]");
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => entry.isIntersecting && entry.target.classList.add("is-visible"));
    }, { threshold: 0.14 });
    elements.forEach(element => observer.observe(element));
    return () => observer.disconnect();
  }, []);
  const go = () => setMenu(false);

  return (
    <>
      <header className={`site-header ${scrolled ? "scrolled" : ""}`}>
        <a className="brand" href="#home" aria-label="Faall home"><Logo /></a>
        <nav className={menu ? "open" : ""} aria-label="Main navigation">
          <a onClick={go} href="#home">{t.home}</a><a onClick={go} href="#about">{t.about}</a><a onClick={go} href="#contact">{t.contact}</a>
          <a onClick={go} className="nav-cta" href="#contact-directory">{t.contactPerson} <ArrowUpRight /></a>
          <button className="language-switch" onClick={() => { setLang(isAr ? "en" : "ar"); setMenu(false); }} aria-label={isAr ? "Switch to English" : "التبديل إلى العربية"}><span>{isAr ? "EN" : "ع"}</span>{t.switchLabel}</button>
        </nav>
        <button className="menu-btn" onClick={() => setMenu(!menu)} aria-expanded={menu} aria-label="Toggle navigation">{menu ? <X /> : <Menu />}</button>
      </header>

      <main>
        <section id="home" className="hero" style={{ backgroundImage: `linear-gradient(${isAr ? "270deg" : "90deg"},#0d1a20ec 0%,#0d1a20b3 40%,#0d1a2022 76%), url('${import.meta.env.BASE_URL}assets/images/construction-hero-demo.webp')` }}>
          <div className="hero-grid" aria-hidden="true" />
          <div className="hero-content">
            <span className="eyebrow light"><i /> {t.directory}</span>
            <h1>{t.heroA}<br/><em>{t.heroB}</em></h1>
            <p>{t.heroText}</p>
            <div className="hero-actions"><a className="btn btn-accent" href="#contact-directory">{t.browse} <ArrowRight /></a><a className="text-link" href="#contact">{t.general} <ChevronDown /></a></div>
          </div>
          <div className="hero-foot"><span>{t.industry}</span><span>{t.demo}</span></div>
        </section>

        <section id="about" className="section about about-modern">
          <div className="about-orb orb-one" aria-hidden="true" />
          <div className="about-orb orb-two" aria-hidden="true" />
          <div className="section-index" data-reveal>{t.company}</div>
          <div className="about-copy" data-reveal>
            <span className="eyebrow">{t.foundation}</span>
            <h2>{t.aboutA} <em>{t.aboutB}</em></h2>
            <p className="lead">{t.aboutText}</p>
            <div className="about-principles">
              <div><b>01</b><span><strong>{t.plan}</strong>{t.planText}</span></div>
              <div><b>02</b><span><strong>{t.coordinate}</strong>{t.coordinateText}</span></div>
              <div><b>03</b><span><strong>{t.deliver}</strong>{t.deliverText}</span></div>
            </div>
            <p className="placeholder">{t.placeholder}</p>
          </div>
          <div className="about-visual" data-reveal aria-label="Faall delivery approach">
            <div className="blueprint-grid" aria-hidden="true" />
            <div className="structure-lines" aria-hidden="true"><i/><i/><i/><i/><i/></div>
            <div className="visual-label"><span>{t.framework}</span><b>{t.frameworkSteps}</b></div>
            <div className="visual-center"><span>F</span><i /></div>
            <div className="about-note"><Quote /><p>{t.confidence}</p><span>{t.approval}</span></div>
          </div>
        </section>

        <section id="contact-directory" className="section team">
          <div className="section-heading"><div><span className="eyebrow">{t.directoryLabel}</span><h2>{t.speakA} <em>{t.speakB}</em></h2></div><p>{t.directoryText}</p></div>
          <div className="team-grid">{team.map(person => <article key={person.id} data-reveal><div className="avatar">{person.initials}</div><span>{isAr ? person.departmentAr : person.department}</span><h3>{isAr ? person.nameAr : person.name}</h3><b>{isAr ? person.titleAr : person.title}</b><p>{t.rolePending}</p><button onClick={() => setSelected(person)}>{t.send} <ArrowUpRight /></button></article>)}</div>
        </section>

        <section id="contact" className="contact">
          <span className="eyebrow light">{t.contactFaall}</span><h2>{t.unsure}<br/><em>{t.startDirectory}</em></h2><p>{t.contactText}</p><a href="#contact-directory" className="btn btn-accent">{t.find} <ArrowRight /></a>
        </section>
      </main>

      <footer><div className="footer-brand"><Logo/><p>{t.footerText}</p></div><div><b>{t.navigate}</b><a href="#about">{t.about}</a><a href="#contact-directory">{t.contactDirectory}</a><a href="#contact">{t.generalContact}</a></div><div><b>{t.information}</b><a href="#privacy">{t.privacy}</a><a href="#terms">{t.terms}</a><span>{t.publicPending}</span></div><div className="copyright">© {new Date().getFullYear()} Faall Contracting. {t.rights}<span>{t.demoApproval}</span></div></footer>
      {selected && <ContactModal employee={selected} lang={lang} onClose={() => setSelected(null)} />}
    </>
  );
}
