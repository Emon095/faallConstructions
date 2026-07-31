import { useEffect, useState } from "react";
import {
  ArrowRight, ArrowUpRight, ChevronDown, Menu, X
} from "lucide-react";
import { leadership, projects, standards } from "./data/content";
import { employees } from "./data/employees";
import ContactModal from "./components/ContactModal";
import EmployeeList from "./components/EmployeeList";

const Logo = () => <img src="./assets/logos/faall-primary-logo-trimmed.png" alt="Faall Business For Contracting Est." />;
const translations = {
  en: {
    home:"Home",about:"About",contact:"Contact",contactPerson:"Contact a person",directory:"Direct company directory",
    heroA:"Find the right person.",heroB:"Start the conversation.",heroText:"Reach Faall’s management, projects, engineering, commercial and support teams through one secure contact directory.",
    browse:count => `Browse ${count} contacts`,general:"General enquiry",industry:"CONSTRUCTION · ENGINEERING · DELIVERY",demo:"Demo image — replace with company project photography",
    company:"01 / COMPANY",foundation:"A FOUNDATION FOR DELIVERY",aboutA:"Strong structures begin with",aboutB:"strong thinking.",
    aboutText:"Faall carefully plans and organizes its construction and technical services to secure successful projects, collaborating with clients and subcontractors to deliver on time and within the construction budget. Headquartered in Riyadh, it provides civil, architectural and construction technical support across Saudi Arabia.",
    plan:"Plan",planText:"Define the route before work begins.",coordinate:"Coordinate",coordinateText:"Keep people, information and decisions aligned.",
    deliver:"Deliver",deliverText:"Bring projects in on time and within the construction budget.",
    framework:"FAALL / DELIVERY FRAMEWORK",frameworkSteps:"PLAN — COORDINATE — BUILD",confidence:"Confidence is built into every stage—from the first review to final handover.",
    approval:"COMPANY PROFILE · OUR VISION",directoryLabel:count => `${count}-PERSON DIRECTORY`,speakA:"Speak to the",speakB:"right person.",
    contactEmployee:"Contact",employeeLabel:"Faall Employee",contactFaall:"CONTACT FAALL",
    unsure:"Not sure who you need?",startDirectory:"Start with our directory.",contactText:"Choose the closest role and your message will be routed securely once approved employee emails are configured.",
    find:"Find a contact",footerText:"Construction shaped by discipline, clarity and lasting value.",navigate:"Navigate",contactDirectory:"Contact directory",
    generalContact:"General contact",information:"Information",privacy:"Privacy",terms:"Terms",publicPending:"Public contact details pending",
    rights:"All rights reserved.",demoApproval:"C.R. 1010323326 · Branch C.R. 4030254404",switchLabel:"العربية",
    servicesLabel:"COMPANY PROFILE",servicesA:"Our",servicesB:"divisions.",servicesText:"Civil, electro-mechanical and technical resources for construction delivery.",details:"Capabilities",
    managementLabel:"MANAGEMENT & COMPLIANCE",managementA:"Experienced.",managementB:"Technically capable.",managementText:"The company is managed by experienced administrators, engineers and specialists across industrial engineering and technical disciplines. Its teams provide prompt solutions to customer requirements wherever needed and verify compliance with manufacturers’ practices, industry codes, standards and specifications.",standards:"Referenced industry standards",
    projectsLabel:"ONGOING PROJECTS",projectsA:"Current",projectsB:"portfolio.",owner:"Project owner",projectType:"Project type",location:"Location",
    address:"P.O. Box 22133, Riyadh 11311, Kingdom of Saudi Arabia",telephone:"Tel: 011 402 4028",leadership:"COMPANY LEADERSHIP"
  },
  ar: {
    home:"الرئيسية",about:"من نحن",contact:"اتصل بنا",contactPerson:"تواصل مع موظف",directory:"دليل التواصل المباشر",
    heroA:"اعثر على الشخص المناسب.",heroB:"وابدأ المحادثة.",heroText:"تواصل مع فرق الإدارة والمشاريع والهندسة والشؤون التجارية والدعم في مؤسسة فال عبر دليل اتصال آمن واحد.",
    browse:count => `تصفح ${count} جهات اتصال`,general:"استفسار عام",industry:"الإنشاءات · الهندسة · التنفيذ",demo:"صورة تجريبية — تُستبدل بصور مشاريع الشركة",
    company:"01 / الشركة",foundation:"أساسٌ راسخ للتنفيذ",aboutA:"المنشآت القوية تبدأ بـ",aboutB:"تفكير قوي.",
    aboutText:"تجمع مؤسسة فال للمقاولات بين التخطيط والتنسيق الفني والتنفيذ الميداني ضمن فريق واحد مسؤول.",
    plan:"التخطيط",planText:"تحديد المسار قبل بدء العمل.",coordinate:"التنسيق",coordinateText:"مواءمة الأشخاص والمعلومات والقرارات.",
    deliver:"التنفيذ",deliverText:"تحويل التفكير الواضح إلى تنفيذ منضبط.",
    framework:"فال / إطار التنفيذ",frameworkSteps:"خطط — نسّق — ابنِ",confidence:"نبني الثقة في كل مرحلة، من المراجعة الأولى حتى التسليم النهائي.",
    approval:"عبارة تعريفية · تتطلب اعتماد العميل",directoryLabel:count => `دليل يضم ${count} موظفين`,speakA:"تحدث إلى",speakB:"الشخص المناسب.",
    contactEmployee:"تواصل مع",employeeLabel:"موظف فال",contactFaall:"تواصل مع فال",
    unsure:"لست متأكداً بمن تتواصل؟",startDirectory:"ابدأ من دليلنا.",contactText:"اختر الدور الأقرب إلى احتياجك وسيتم توجيه رسالتك بأمان بعد إعداد عناوين البريد المعتمدة.",
    find:"اعثر على جهة اتصال",footerText:"إنشاءات تقوم على الانضباط والوضوح والقيمة المستدامة.",navigate:"التنقل",contactDirectory:"دليل التواصل",
    generalContact:"التواصل العام",information:"المعلومات",privacy:"الخصوصية",terms:"الشروط",publicPending:"بيانات التواصل العامة قيد الإضافة",
    rights:"جميع الحقوق محفوظة.",demoApproval:"السجل الرئيسي 1010323326 · السجل الفرعي 4030254404",switchLabel:"English",
    servicesLabel:"ملف الشركة",servicesA:"أقسام",servicesB:"الشركة.",servicesText:"موارد مدنية وكهروميكانيكية وفنية لتنفيذ أعمال الإنشاء.",details:"القدرات",
    managementLabel:"الإدارة والامتثال",managementA:"خبرة.",managementB:"وقدرة فنية.",managementText:"تدار الشركة بواسطة إداريين ومهندسين ومتخصصين ذوي خبرة في مجالات الهندسة الصناعية والتخصصات الفنية، وتقدم فرقها حلولاً سريعة لمتطلبات العملاء حيثما دعت الحاجة.",standards:"المعايير الصناعية المرجعية",
    projectsLabel:"المشاريع الجارية",projectsA:"محفظة",projectsB:"المشاريع الحالية.",owner:"مالك المشروع",projectType:"نوع المشروع",location:"الموقع",
    address:"ص.ب. 22133، الرياض 11311، المملكة العربية السعودية",telephone:"هاتف: 011 402 4028",leadership:"قيادة الشركة"
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
            <div className="hero-actions"><a className="btn btn-accent" href="#contact-directory">{t.browse(employees.length)} <ArrowRight /></a><a className="text-link" href="#contact">{t.general} <ChevronDown /></a></div>
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
          </div>
          <div className="about-leadership" data-reveal>
            <div className="leadership-heading"><span className="eyebrow">{t.leadership}</span><p>{t.confidence}</p></div>
            <div className="leadership-list">
              {leadership.map(person => <article key={person.name}><img src={person.photo} alt={isAr ? person.nameAr : person.name} /><div><span>{isAr ? person.titleAr : person.title}</span><h3>{isAr ? person.nameAr : person.name}</h3>{person.contact && <a href={person.contactHref}>{person.contact}</a>}</div></article>)}
            </div>
          </div>
        </section>

        <section className="section management-profile">
          <div className="section-heading"><div><span className="eyebrow">{t.managementLabel}</span><h2>{t.managementA} <em>{t.managementB}</em></h2></div><p>{t.managementText}</p></div>
          <h3>{t.standards}</h3>
          <div className="standards-grid">{standards.map((standard, index) => <div key={standard} data-reveal><span>{String(index + 1).padStart(2, "0")}</span>{standard}</div>)}</div>
        </section>

        <section className="section project-profile">
          <div className="section-heading"><div><span className="eyebrow">{t.projectsLabel}</span><h2>{t.projectsA} <em>{t.projectsB}</em></h2></div></div>
          <div className="project-table-wrap"><table><thead><tr><th>#</th><th>{t.owner}</th><th>{t.projectType}</th><th>{t.location}</th></tr></thead><tbody>{projects.map((project, index) => <tr key={`${project[0]}-${index}`}><td>{index + 1}</td><td>{project[0]}</td><td>{project[1]}</td><td>{project[2]}</td></tr>)}</tbody></table></div>
        </section>

        <section id="contact-directory" className="section team">
          <div className="section-heading"><div><span className="eyebrow">{t.directoryLabel(employees.length)}</span><h2>{t.speakA} <em>{t.speakB}</em></h2></div></div>
          <EmployeeList employees={employees} lang={lang} contactLabel={t.contactEmployee} employeeLabel={t.employeeLabel} onContact={setSelected} />
        </section>

        <section id="contact" className="contact">
          <span className="eyebrow light">{t.contactFaall}</span><h2>{t.unsure}<br/><em>{t.startDirectory}</em></h2><p>{t.contactText}</p><a href="#contact-directory" className="btn btn-accent">{t.find} <ArrowRight /></a>
        </section>
      </main>

      <footer><div className="footer-brand"><Logo/><p>{t.footerText}</p></div><div><b>{t.navigate}</b><a href="#about">{t.about}</a><a href="#contact-directory">{t.contactDirectory}</a><a href="#contact">{t.generalContact}</a></div><div><b>{t.information}</b><span>{t.address}</span><a href="tel:+966114024028">{t.telephone}</a></div><div className="copyright">© {new Date().getFullYear()} Faall Contracting. {t.rights}<span>{t.demoApproval}</span></div></footer>
      {selected && <ContactModal employee={selected} lang={lang} onClose={() => setSelected(null)} />}
    </>
  );
}
