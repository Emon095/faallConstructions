import { useEffect, useState } from "react";
import {
  ArrowRight, ArrowUpRight, ChevronDown, Menu, Quote, X
} from "lucide-react";
import { team } from "./data/content";
import ContactModal from "./components/ContactModal";

const Logo = () => <img src="./assets/logos/faall-primary-logo-trimmed.png" alt="Faall Business For Contracting Est." />;

export default function App() {
  const [menu, setMenu] = useState(false);
  const [selected, setSelected] = useState(null);
  const [scrolled, setScrolled] = useState(false);
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
          {["Home","About","Contact"].map(x => <a onClick={go} key={x} href={`#${x.toLowerCase()}`}>{x}</a>)}
          <a onClick={go} className="nav-cta" href="#contact-directory">Contact a person <ArrowUpRight /></a>
        </nav>
        <button className="menu-btn" onClick={() => setMenu(!menu)} aria-expanded={menu} aria-label="Toggle navigation">{menu ? <X /> : <Menu />}</button>
      </header>

      <main>
        <section id="home" className="hero" style={{ backgroundImage: `linear-gradient(90deg,#0d1a20ec 0%,#0d1a20b3 40%,#0d1a2022 76%), url('${import.meta.env.BASE_URL}assets/images/construction-hero-demo.webp')` }}>
          <div className="hero-grid" aria-hidden="true" />
          <div className="hero-content">
            <span className="eyebrow light"><i /> DIRECT COMPANY DIRECTORY</span>
            <h1>Find the right person.<br/><em>Start the conversation.</em></h1>
            <p>Reach Faall’s management, projects, engineering, commercial and support teams through one secure contact directory.</p>
            <div className="hero-actions"><a className="btn btn-accent" href="#contact-directory">Browse 30 contacts <ArrowRight /></a><a className="text-link" href="#contact">General enquiry <ChevronDown /></a></div>
          </div>
          <div className="hero-foot"><span>CONSTRUCTION · ENGINEERING · DELIVERY</span><span>Demo image — replace with company project photography</span></div>
        </section>

        <section id="about" className="section about about-modern">
          <div className="about-orb orb-one" aria-hidden="true" />
          <div className="about-orb orb-two" aria-hidden="true" />
          <div className="section-index" data-reveal>01 / COMPANY</div>
          <div className="about-copy" data-reveal>
            <span className="eyebrow">A FOUNDATION FOR DELIVERY</span>
            <h2>Strong structures begin with <em>strong thinking.</em></h2>
            <p className="lead">Faall Contracting brings planning, technical coordination and hands-on delivery together under one accountable team.</p>
            <div className="about-principles">
              <div><b>01</b><span><strong>Plan</strong>Define the route before work begins.</span></div>
              <div><b>02</b><span><strong>Coordinate</strong>Keep people, information and decisions aligned.</span></div>
              <div><b>03</b><span><strong>Deliver</strong>Turn clear thinking into controlled execution.</span></div>
            </div>
            <p className="placeholder">Company history, markets and geographic coverage pending approved profile content.</p>
          </div>
          <div className="about-visual" data-reveal aria-label="Faall delivery approach">
            <div className="blueprint-grid" aria-hidden="true" />
            <div className="structure-lines" aria-hidden="true"><i/><i/><i/><i/><i/></div>
            <div className="visual-label"><span>FAALL / DELIVERY FRAMEWORK</span><b>PLAN — COORDINATE — BUILD</b></div>
            <div className="visual-center"><span>F</span><i /></div>
            <div className="about-note"><Quote /><p>Confidence is built into every stage—from the first review to final handover.</p><span>POSITIONING STATEMENT · CLIENT APPROVAL REQUIRED</span></div>
          </div>
        </section>

        <section id="contact-directory" className="section team">
          <div className="section-heading"><div><span className="eyebrow">30-PERSON DIRECTORY</span><h2>Speak to the <em>right person.</em></h2></div><p>Thirty role-based profiles are ready for approved names, photos and backend-only email addresses. No recipient email is exposed to visitors.</p></div>
          <div className="team-grid">{team.map(person => <article key={person.id} data-reveal><div className="avatar">{person.initials}</div><span>{person.department}</span><h3>{person.name}</h3><b>{person.title}</b><p>{person.role}</p><button onClick={() => setSelected(person)}>Send message <ArrowUpRight /></button></article>)}</div>
        </section>

        <section id="contact" className="contact">
          <span className="eyebrow light">CONTACT FAALL</span><h2>Not sure who you need?<br/><em>Start with our directory.</em></h2><p>Choose the closest role and your message will be routed securely once approved employee emails are configured.</p><a href="#contact-directory" className="btn btn-accent">Find a contact <ArrowRight /></a>
        </section>
      </main>

      <footer><div className="footer-brand"><Logo light/><p>Construction shaped by discipline, clarity and lasting value.</p></div><div><b>Navigate</b><a href="#about">About</a><a href="#contact-directory">Contact directory</a><a href="#contact">General contact</a></div><div><b>Information</b><a href="#privacy">Privacy</a><a href="#terms">Terms</a><span>Public contact details pending</span></div><div className="copyright">© {new Date().getFullYear()} Faall Contracting. All rights reserved.<span>Demo website · Business content pending approval</span></div></footer>
      {selected && <ContactModal employee={selected} onClose={() => setSelected(null)} />}
    </>
  );
}
