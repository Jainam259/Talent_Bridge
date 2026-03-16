import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import Footer from "./Footer";

/* ── Intersection observer hook ── */
const useInView = (threshold = 0.12) => {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setInView(true); obs.disconnect(); } },
      { threshold }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [threshold]);
  return [ref, inView];
};

const Reveal = ({ children, delay = 0, style = {} }) => {
  const [ref, inView] = useInView();
  return (
    <div
      ref={ref}
      style={{
        opacity: inView ? 1 : 0,
        transform: inView ? "translateY(0)" : "translateY(24px)",
        transition: `opacity .6s ease ${delay}s, transform .6s ease ${delay}s`,
        ...style,
      }}
    >
      {children}
    </div>
  );
};

const About = () => {
  const [mounted, setMounted] = useState(false);
  useEffect(() => { const t = setTimeout(() => setMounted(true), 80); return () => clearTimeout(t); }, []);

  const values = [
    {
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
          <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/>
        </svg>
      ),
      title: "Transparency",
      desc:  "Salary ranges, company reviews, and clear job requirements — no hidden surprises.",
      color: "teal",
    },
    {
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
          <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/>
          <path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/>
        </svg>
      ),
      title: "Inclusivity",
      desc:  "Every professional deserves access to great opportunities, regardless of background.",
      color: "amber",
    },
    {
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
          <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
        </svg>
      ),
      title: "Excellence",
      desc:  "We obsess over product quality so every interaction feels effortless and precise.",
      color: "teal",
    },
    {
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/>
        </svg>
      ),
      title: "Trust",
      desc:  "Your data is yours. We never sell it, never misuse it, and always protect it.",
      color: "amber",
    },
  ];

  const team = [
    { name: "Riya Shah",      role: "Co-founder & CEO",      init: "R", bg: "linear-gradient(135deg,#0fd4c0,#0b9e8e)" },
    { name: "Arjun Mehta",    role: "Co-founder & CTO",      init: "A", bg: "linear-gradient(135deg,#f5a623,#c47d0a)" },
    { name: "Priya Desai",    role: "Head of Product",       init: "P", bg: "linear-gradient(135deg,#818cf8,#4f46e5)" },
    { name: "Karan Patel",    role: "Head of Engineering",   init: "K", bg: "linear-gradient(135deg,#0fd4c0,#0b9e8e)" },
  ];

  const milestones = [
    { year: "2021", event: "TalentBridge founded with a mission to fix broken hiring." },
    { year: "2022", event: "Reached 100,000 registered professionals in the first year." },
    { year: "2023", event: "Launched AI-powered job matching — 3× faster placements." },
    { year: "2024", event: "Crossed 2 million users and 48,000 hiring companies." },
    { year: "2025", event: "Expanding globally — now available in 18 countries." },
  ];

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cabinet+Grotesk:wght@400;500;700;800&family=Instrument+Serif:ital@0;1&family=Geist:wght@300;400;500&display=swap');

        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

        :root {
          --navy:       #0b1120;
          --navy-mid:   #111827;
          --navy-card:  #131e30;
          --teal:       #0fd4c0;
          --teal-dim:   rgba(15,212,192,0.1);
          --amber:      #f5a623;
          --amber-dim:  rgba(245,166,35,0.1);
          --white:      #f0f4ff;
          --white-soft: #9aaabf;
          --white-dim:  rgba(240,244,255,0.05);
          --border:     rgba(240,244,255,0.07);
        }

        .ab-root {
          background: var(--navy);
          font-family: 'Geist', sans-serif;
          color: var(--white);
          overflow-x: hidden;
        }

        /* ── HERO ── */
        .ab-hero {
          position: relative;
          padding: 160px 48px 100px;
          text-align: center;
          overflow: hidden;
        }

        .ab-hero::before {
          content: '';
          position: absolute; inset: 0;
          background:
            radial-gradient(ellipse 70% 60% at 50% 0%, rgba(15,212,192,0.08) 0%, transparent 65%),
            radial-gradient(ellipse 40% 40% at 20% 80%, rgba(245,166,35,0.04) 0%, transparent 60%);
          pointer-events: none;
        }

        .ab-hero::after {
          content: '';
          position: absolute; inset: 0;
          background-image: radial-gradient(rgba(240,244,255,0.05) 1px, transparent 1px);
          background-size: 36px 36px;
          pointer-events: none;
          mask-image: radial-gradient(ellipse 80% 80% at 50% 50%, black 20%, transparent 100%);
        }

        .ab-hero-inner {
          position: relative;
          z-index: 1;
          max-width: 720px;
          margin: 0 auto;
        }

        .ab-eyebrow {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 6px 16px 6px 10px;
          background: rgba(15,212,192,0.07);
          border: 1px solid rgba(15,212,192,0.18);
          border-radius: 100px;
          font-size: 12px;
          font-weight: 500;
          color: var(--teal);
          margin-bottom: 28px;
          opacity: 0;
          animation: fadeUp .7s cubic-bezier(.22,1,.36,1) .1s forwards;
        }

        .ab-eyebrow-dot {
          width: 6px; height: 6px;
          border-radius: 50%;
          background: var(--teal);
        }

        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(18px); }
          to   { opacity: 1; transform: translateY(0); }
        }

        .ab-hero-h1 {
          font-family: 'Cabinet Grotesk', sans-serif;
          font-size: clamp(40px, 6vw, 72px);
          font-weight: 800;
          line-height: 1.07;
          letter-spacing: -2.5px;
          color: var(--white);
          margin-bottom: 20px;
          opacity: 0;
          animation: fadeUp .75s cubic-bezier(.22,1,.36,1) .2s forwards;
        }

        .ab-hero-h1 em {
          font-family: 'Instrument Serif', serif;
          font-style: italic;
          font-weight: 400;
          color: var(--teal);
          letter-spacing: -2px;
        }

        .ab-hero-sub {
          font-size: clamp(15px, 2vw, 18px);
          line-height: 1.7;
          color: var(--white-soft);
          font-weight: 300;
          max-width: 560px;
          margin: 0 auto;
          opacity: 0;
          animation: fadeUp .75s cubic-bezier(.22,1,.36,1) .32s forwards;
        }

        /* ── SECTION WRAPPER ── */
        .ab-section {
          max-width: 1100px;
          margin: 0 auto;
          padding: 80px 48px;
        }

        .ab-sec-eyebrow {
          font-size: 11px;
          font-weight: 600;
          letter-spacing: 2px;
          text-transform: uppercase;
          color: var(--teal);
          margin-bottom: 10px;
          display: flex;
          align-items: center;
          gap: 10px;
        }

        .ab-sec-eyebrow::before {
          content: '';
          width: 22px; height: 2px;
          background: var(--teal);
          border-radius: 2px;
        }

        .ab-sec-title {
          font-family: 'Cabinet Grotesk', sans-serif;
          font-size: clamp(26px, 3.2vw, 40px);
          font-weight: 800;
          color: var(--white);
          letter-spacing: -1px;
          line-height: 1.12;
          margin-bottom: 12px;
        }

        .ab-sec-title em {
          font-family: 'Instrument Serif', serif;
          font-style: italic;
          font-weight: 400;
          color: var(--teal);
        }

        .ab-sec-sub {
          font-size: 15px;
          color: var(--white-soft);
          font-weight: 300;
          max-width: 520px;
          line-height: 1.65;
          margin-bottom: 52px;
        }

        /* ── MISSION SPLIT ── */
        .ab-mission {
          background: var(--navy-mid);
          border-top: 1px solid var(--border);
          border-bottom: 1px solid var(--border);
        }

        .ab-mission-inner {
          max-width: 1100px;
          margin: 0 auto;
          padding: 80px 48px;
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 80px;
          align-items: center;
        }

        .ab-mission-text {}

        .ab-mission-h {
          font-family: 'Cabinet Grotesk', sans-serif;
          font-size: clamp(28px, 3.5vw, 44px);
          font-weight: 800;
          color: var(--white);
          letter-spacing: -1.2px;
          line-height: 1.12;
          margin-bottom: 20px;
        }

        .ab-mission-h em {
          font-family: 'Instrument Serif', serif;
          font-style: italic;
          font-weight: 400;
          color: var(--teal);
        }

        .ab-mission-p {
          font-size: 15px;
          line-height: 1.75;
          color: var(--white-soft);
          font-weight: 300;
          margin-bottom: 16px;
        }

        /* Mission visual */
        .ab-mission-visual {
          position: relative;
        }

        .ab-mission-card {
          background: var(--navy-card);
          border: 1px solid var(--border);
          border-radius: 20px;
          padding: 36px;
          position: relative;
          overflow: hidden;
        }

        .ab-mission-card::before {
          content: '';
          position: absolute;
          top: 0; left: 0; right: 0;
          height: 2px;
          background: linear-gradient(90deg, var(--teal), rgba(15,212,192,0.1));
        }

        .ab-mission-metric {
          display: flex;
          flex-direction: column;
          gap: 24px;
        }

        .ab-metric-row {
          display: flex;
          align-items: center;
          gap: 16px;
        }

        .ab-metric-icon {
          width: 44px; height: 44px;
          border-radius: 11px;
          background: var(--teal-dim);
          border: 1px solid rgba(15,212,192,0.15);
          display: flex; align-items: center; justify-content: center;
          color: var(--teal);
          flex-shrink: 0;
        }

        .ab-metric-icon.amber {
          background: var(--amber-dim);
          border-color: rgba(245,166,35,0.15);
          color: var(--amber);
        }

        .ab-metric-val {
          font-family: 'Cabinet Grotesk', sans-serif;
          font-size: 22px;
          font-weight: 800;
          color: var(--white);
          line-height: 1;
          margin-bottom: 2px;
        }

        .ab-metric-val span { color: var(--teal); }

        .ab-metric-lbl { font-size: 12px; color: var(--white-soft); }

        /* ── VALUES ── */
        .ab-values-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 18px;
        }

        .ab-value-card {
          padding: 28px;
          background: var(--navy-card);
          border: 1px solid var(--border);
          border-radius: 16px;
          display: flex;
          gap: 18px;
          align-items: flex-start;
          transition: border-color .22s, transform .22s;
        }

        .ab-value-card:hover {
          border-color: rgba(15,212,192,0.22);
          transform: translateY(-2px);
        }

        .ab-val-icon {
          width: 44px; height: 44px;
          border-radius: 11px;
          display: flex; align-items: center; justify-content: center;
          flex-shrink: 0;
        }

        .ab-val-icon.teal {
          background: var(--teal-dim);
          border: 1px solid rgba(15,212,192,0.15);
          color: var(--teal);
        }

        .ab-val-icon.amber {
          background: var(--amber-dim);
          border: 1px solid rgba(245,166,35,0.15);
          color: var(--amber);
        }

        .ab-val-title {
          font-family: 'Cabinet Grotesk', sans-serif;
          font-size: 16px;
          font-weight: 700;
          color: var(--white);
          margin-bottom: 8px;
        }

        .ab-val-desc {
          font-size: 13.5px;
          line-height: 1.65;
          color: var(--white-soft);
          font-weight: 300;
        }

        /* ── TIMELINE ── */
        .ab-timeline-bg {
          background: var(--navy-mid);
          border-top: 1px solid var(--border);
          border-bottom: 1px solid var(--border);
        }

        .ab-timeline {
          display: flex;
          flex-direction: column;
          gap: 0;
          position: relative;
          padding-left: 48px;
        }

        .ab-timeline::before {
          content: '';
          position: absolute;
          left: 16px; top: 12px; bottom: 12px;
          width: 2px;
          background: linear-gradient(to bottom, var(--teal), rgba(15,212,192,0.1));
          border-radius: 2px;
        }

        .ab-tl-item {
          position: relative;
          padding: 0 0 36px 28px;
        }

        .ab-tl-item:last-child { padding-bottom: 0; }

        .ab-tl-dot {
          position: absolute;
          left: -40px;
          top: 4px;
          width: 14px; height: 14px;
          border-radius: 50%;
          background: var(--navy-mid);
          border: 2px solid var(--teal);
          box-shadow: 0 0 12px rgba(15,212,192,0.3);
        }

        .ab-tl-year {
          font-family: 'Cabinet Grotesk', sans-serif;
          font-size: 12px;
          font-weight: 700;
          letter-spacing: 1px;
          color: var(--teal);
          margin-bottom: 6px;
        }

        .ab-tl-event {
          font-size: 15px;
          color: var(--white-soft);
          font-weight: 300;
          line-height: 1.55;
        }

        /* ── TEAM ── */
        .ab-team-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 18px;
        }

        .ab-team-card {
          padding: 28px 20px;
          background: var(--navy-card);
          border: 1px solid var(--border);
          border-radius: 16px;
          text-align: center;
          transition: border-color .2s, transform .2s;
        }

        .ab-team-card:hover {
          border-color: rgba(15,212,192,0.2);
          transform: translateY(-3px);
        }

        .ab-team-avatar {
          width: 64px; height: 64px;
          border-radius: 50%;
          display: flex; align-items: center; justify-content: center;
          font-family: 'Cabinet Grotesk', sans-serif;
          font-size: 22px;
          font-weight: 800;
          color: var(--navy);
          margin: 0 auto 16px;
          box-shadow: 0 8px 24px rgba(0,0,0,0.3);
        }

        .ab-team-name {
          font-family: 'Cabinet Grotesk', sans-serif;
          font-size: 15px;
          font-weight: 700;
          color: var(--white);
          margin-bottom: 4px;
        }

        .ab-team-role {
          font-size: 12.5px;
          color: var(--white-soft);
          font-weight: 300;
        }

        /* ── FINAL CTA ── */
        .ab-cta {
          position: relative;
          text-align: center;
          padding: 100px 48px;
          overflow: hidden;
        }

        .ab-cta::before {
          content: '';
          position: absolute; inset: 0;
          background: radial-gradient(ellipse 60% 70% at 50% 50%, rgba(15,212,192,0.07), transparent 70%);
          pointer-events: none;
        }

        .ab-cta-inner { position: relative; z-index: 1; max-width: 580px; margin: 0 auto; }

        .ab-cta-title {
          font-family: 'Cabinet Grotesk', sans-serif;
          font-size: clamp(28px, 3.8vw, 48px);
          font-weight: 800;
          color: var(--white);
          letter-spacing: -1.2px;
          line-height: 1.1;
          margin-bottom: 14px;
        }

        .ab-cta-title em {
          font-family: 'Instrument Serif', serif;
          font-style: italic;
          color: var(--teal);
          font-weight: 400;
        }

        .ab-cta-sub {
          font-size: 15px;
          color: var(--white-soft);
          font-weight: 300;
          line-height: 1.65;
          margin-bottom: 36px;
        }

        .ab-cta-btns {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 12px;
          flex-wrap: wrap;
        }

        .ab-btn-primary {
          padding: 14px 32px;
          background: var(--teal);
          color: var(--navy);
          font-family: 'Cabinet Grotesk', sans-serif;
          font-size: 15px;
          font-weight: 800;
          border-radius: 11px;
          text-decoration: none;
          display: inline-flex;
          align-items: center;
          gap: 7px;
          box-shadow: 0 8px 28px rgba(15,212,192,0.3);
          transition: transform .15s, box-shadow .2s;
        }

        .ab-btn-primary:hover {
          transform: translateY(-2px);
          box-shadow: 0 12px 36px rgba(15,212,192,0.42);
        }

        .ab-btn-ghost {
          padding: 14px 26px;
          background: transparent;
          color: var(--white-soft);
          font-family: 'Geist', sans-serif;
          font-size: 15px;
          font-weight: 500;
          border-radius: 11px;
          border: 1px solid var(--border);
          text-decoration: none;
          display: inline-flex;
          align-items: center;
          gap: 7px;
          transition: border-color .18s, color .18s, background .18s;
        }

        .ab-btn-ghost:hover {
          border-color: rgba(240,244,255,0.2);
          color: var(--white);
          background: var(--white-dim);
        }

        /* RESPONSIVE */
        @media (max-width: 960px) {
          .ab-hero { padding: 130px 28px 72px; }
          .ab-section { padding: 60px 28px; }
          .ab-mission-inner { grid-template-columns: 1fr; gap: 40px; padding: 60px 28px; }
          .ab-values-grid { grid-template-columns: 1fr; }
          .ab-team-grid { grid-template-columns: repeat(2, 1fr); }
          .ab-cta { padding: 64px 28px; }
        }

        @media (max-width: 560px) {
          .ab-team-grid { grid-template-columns: 1fr 1fr; }
          .ab-timeline { padding-left: 36px; }
        }
      `}</style>

      <div className="ab-root">

        {/* ── HERO ── */}
        <section className="ab-hero">
          <div className="ab-hero-inner">
            <div className="ab-eyebrow">
              <span className="ab-eyebrow-dot" />
              Our Story
            </div>
            <h1 className="ab-hero-h1">
              We're on a mission<br />to fix <em>broken</em> hiring.
            </h1>
            <p className="ab-hero-sub">
              TalentBridge was built because job searching felt broken — slow, opaque, and dehumanising. We set out to change that, for both candidates and companies.
            </p>
          </div>
        </section>

        {/* ── MISSION SPLIT ── */}
        <div className="ab-mission">
          <div className="ab-mission-inner">
            <Reveal>
              <div className="ab-mission-text">
                <p className="ab-sec-eyebrow">Our Mission</p>
                <h2 className="ab-mission-h">
                  Connecting the right<br />people with the <em>right</em><br />opportunities.
                </h2>
                <p className="ab-mission-p">
                  We believe finding a job should feel empowering, not exhausting. Our platform uses smart matching, honest data, and a clean experience to remove every unnecessary friction point from the process.
                </p>
                <p className="ab-mission-p">
                  For employers, we surface pre-matched candidates — not just resumes — so every hire decision starts from a position of confidence. For job seekers, we make applying as simple as a single click.
                </p>
              </div>
            </Reveal>

            <Reveal delay={0.15}>
              <div className="ab-mission-visual">
                <div className="ab-mission-card">
                  <div className="ab-mission-metric">
                    {[
                      { icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>,
                        val: "2.1M+", lbl: "Professionals trust us", cls: "" },
                      { icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="7" width="20" height="14" rx="2"/><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/></svg>,
                        val: "48k+", lbl: "Companies hiring right now", cls: "amber" },
                      { icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/></svg>,
                        val: "98%", lbl: "Satisfaction rate", cls: "" },
                      { icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>,
                        val: "< 3 weeks", lbl: "Average time-to-hire", cls: "amber" },
                    ].map((m, i) => (
                      <div className="ab-metric-row" key={i}>
                        <div className={`ab-metric-icon ${m.cls}`}>{m.icon}</div>
                        <div>
                          <div className="ab-metric-val">{m.val}</div>
                          <div className="ab-metric-lbl">{m.lbl}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </Reveal>
          </div>
        </div>

        {/* ── VALUES ── */}
        <section className="ab-section">
          <Reveal>
            <p className="ab-sec-eyebrow">What We Stand For</p>
            <h2 className="ab-sec-title">Our <em>values</em></h2>
            <p className="ab-sec-sub">
              These aren't just words on a wall — they're how we make every product decision and every hire.
            </p>
          </Reveal>
          <div className="ab-values-grid">
            {values.map((v, i) => (
              <Reveal key={i} delay={i * 0.08}>
                <div className="ab-value-card">
                  <div className={`ab-val-icon ${v.color}`}>{v.icon}</div>
                  <div>
                    <div className="ab-val-title">{v.title}</div>
                    <div className="ab-val-desc">{v.desc}</div>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </section>

        {/* ── TIMELINE ── */}
        <div className="ab-timeline-bg">
          <div className="ab-section">
            <Reveal>
              <p className="ab-sec-eyebrow">Our Journey</p>
              <h2 className="ab-sec-title">Built milestone<br />by <em>milestone.</em></h2>
              <p className="ab-sec-sub">From a small idea to a platform serving millions — here's how we got here.</p>
            </Reveal>
            <div className="ab-timeline">
              {milestones.map((m, i) => (
                <Reveal key={i} delay={i * 0.1}>
                  <div className="ab-tl-item">
                    <div className="ab-tl-dot" />
                    <div className="ab-tl-year">{m.year}</div>
                    <div className="ab-tl-event">{m.event}</div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </div>

        {/* ── TEAM ── */}
        <section className="ab-section">
          <Reveal>
            <p className="ab-sec-eyebrow">The Team</p>
            <h2 className="ab-sec-title">The people<br />behind <em>TalentBridge.</em></h2>
            <p className="ab-sec-sub">A small, focused team with one shared obsession: making hiring better.</p>
          </Reveal>
          <div className="ab-team-grid">
            {team.map((t, i) => (
              <Reveal key={i} delay={i * 0.09}>
                <div className="ab-team-card">
                  <div className="ab-team-avatar" style={{ background: t.bg }}>{t.init}</div>
                  <div className="ab-team-name">{t.name}</div>
                  <div className="ab-team-role">{t.role}</div>
                </div>
              </Reveal>
            ))}
          </div>
        </section>

        {/* ── FINAL CTA ── */}
        <section className="ab-cta">
          <Reveal>
            <div className="ab-cta-inner">
              <h2 className="ab-cta-title">
                Ready to join the<br /><em>community?</em>
              </h2>
              <p className="ab-cta-sub">
                Whether you're looking for your next role or your next great hire — TalentBridge is the place to start.
              </p>
              <div className="ab-cta-btns">
                <Link to="/Eereg" className="ab-btn-primary">
                  Find Jobs
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/>
                  </svg>
                </Link>
                <Link to="/Erreg" className="ab-btn-ghost">
                  Post a Job →
                </Link>
                <Link to="/contact" className="ab-btn-ghost">
                  Contact Us →
                </Link>
              </div>
            </div>
          </Reveal>
        </section>

        <Footer />
      </div>
    </>
  );
};

export default About;