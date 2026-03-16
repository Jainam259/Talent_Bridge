import React, { useState, useEffect } from "react";
import Footer from "./Footer";

const Contact = () => {
  const [form, setForm]       = useState({ name: "", email: "", subject: "", message: "" });
  const [focused, setFocused] = useState(null);
  const [status, setStatus]   = useState(null); // null | "sending" | "sent" | "error"
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setMounted(true), 80);
    return () => clearTimeout(t);
  }, []);

  const handleChange = (e) =>
    setForm((p) => ({ ...p, [e.target.name]: e.target.value }));

  const handleSubmit = (e) => {
    e.preventDefault();
    setStatus("sending");
    // Simulate API call
    setTimeout(() => setStatus("sent"), 1800);
  };

  const channels = [
    {
      icon: (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
          <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
          <polyline points="22,6 12,13 2,6"/>
        </svg>
      ),
      label: "Email Us",
      value: "support@talentbridge.io",
      sub:   "We reply within 24 hours",
      color: "teal",
    },
    {
      icon: (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
          <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 13a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.6 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/>
        </svg>
      ),
      label: "Call Us",
      value: "+91 98765 43210",
      sub:   "Mon–Fri, 9am–6pm IST",
      color: "amber",
    },
    {
      icon: (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
          <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
          <circle cx="12" cy="10" r="3"/>
        </svg>
      ),
      label: "Visit Us",
      value: "Ahmedabad, Gujarat",
      sub:   "India — 380015",
      color: "teal",
    },
    {
      icon: (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="10"/>
          <polyline points="12 6 12 12 16 14"/>
        </svg>
      ),
      label: "Live Chat",
      value: "Available on platform",
      sub:   "Avg. response < 5 min",
      color: "amber",
    },
  ];

  const faqs = [
    { q: "How do I reset my password?",         a: "Go to the login page and click 'Forgot password'. We'll email you a reset link within seconds." },
    { q: "How does job matching work?",          a: "Our AI analyses your skills, experience, and preferences to surface roles where you're most likely to succeed." },
    { q: "Is TalentBridge free for job seekers?", a: "Yes — completely free. Employers pay only when they hire. Job seekers never pay anything." },
    { q: "How do I post a job as an employer?",  a: "Register as an employer, complete your company profile, and click 'Post a Job' from your dashboard." },
  ];

  const [openFaq, setOpenFaq] = useState(null);

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
          --error:      #ff5e5e;
        }

        .ct-root {
          background: var(--navy);
          font-family: 'Geist', sans-serif;
          color: var(--white);
          overflow-x: hidden;
        }

        /* ── HERO ── */
        .ct-hero {
          position: relative;
          padding: 160px 48px 80px;
          text-align: center;
          overflow: hidden;
        }

        .ct-hero::before {
          content: '';
          position: absolute; inset: 0;
          background:
            radial-gradient(ellipse 65% 55% at 50% 0%, rgba(15,212,192,0.08) 0%, transparent 65%),
            radial-gradient(ellipse 40% 35% at 80% 80%, rgba(245,166,35,0.04) 0%, transparent 60%);
          pointer-events: none;
        }

        .ct-hero::after {
          content: '';
          position: absolute; inset: 0;
          background-image: radial-gradient(rgba(240,244,255,0.05) 1px, transparent 1px);
          background-size: 36px 36px;
          pointer-events: none;
          mask-image: radial-gradient(ellipse 80% 80% at 50% 50%, black 20%, transparent 100%);
        }

        .ct-hero-inner {
          position: relative;
          z-index: 1;
          max-width: 640px;
          margin: 0 auto;
        }

        .ct-badge {
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
          animation: fadeUp .65s cubic-bezier(.22,1,.36,1) .08s forwards;
        }

        .ct-badge-dot {
          width: 6px; height: 6px;
          border-radius: 50%;
          background: var(--teal);
          box-shadow: 0 0 6px var(--teal);
          animation: pulse 2s ease-in-out infinite;
        }

        @keyframes pulse {
          0%,100% { opacity:1; transform:scale(1); }
          50%      { opacity:.4; transform:scale(.7); }
        }

        @keyframes fadeUp {
          from { opacity:0; transform:translateY(18px); }
          to   { opacity:1; transform:translateY(0); }
        }

        .ct-h1 {
          font-family: 'Cabinet Grotesk', sans-serif;
          font-size: clamp(38px, 5.5vw, 66px);
          font-weight: 800;
          line-height: 1.07;
          letter-spacing: -2.2px;
          color: var(--white);
          margin-bottom: 18px;
          opacity: 0;
          animation: fadeUp .7s cubic-bezier(.22,1,.36,1) .18s forwards;
        }

        .ct-h1 em {
          font-family: 'Instrument Serif', serif;
          font-style: italic;
          font-weight: 400;
          color: var(--teal);
          letter-spacing: -2px;
        }

        .ct-sub {
          font-size: clamp(14px, 1.8vw, 17px);
          line-height: 1.7;
          color: var(--white-soft);
          font-weight: 300;
          max-width: 480px;
          margin: 0 auto;
          opacity: 0;
          animation: fadeUp .7s cubic-bezier(.22,1,.36,1) .28s forwards;
        }

        /* ── CHANNELS ── */
        .ct-channels-bg {
          background: var(--navy-mid);
          border-top: 1px solid var(--border);
          border-bottom: 1px solid var(--border);
        }

        .ct-channels {
          max-width: 1100px;
          margin: 0 auto;
          padding: 52px 48px;
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 16px;
        }

        .ct-channel {
          padding: 24px 20px;
          background: var(--navy);
          border: 1px solid var(--border);
          border-radius: 14px;
          display: flex;
          align-items: flex-start;
          gap: 14px;
          transition: border-color .2s, transform .2s;
        }

        .ct-channel:hover {
          border-color: rgba(15,212,192,0.22);
          transform: translateY(-2px);
        }

        .ct-ch-icon {
          width: 40px; height: 40px;
          border-radius: 10px;
          display: flex; align-items: center; justify-content: center;
          flex-shrink: 0;
        }

        .ct-ch-icon.teal {
          background: var(--teal-dim);
          border: 1px solid rgba(15,212,192,0.15);
          color: var(--teal);
        }

        .ct-ch-icon.amber {
          background: var(--amber-dim);
          border: 1px solid rgba(245,166,35,0.15);
          color: var(--amber);
        }

        .ct-ch-label {
          font-size: 11px;
          font-weight: 600;
          letter-spacing: 0.8px;
          text-transform: uppercase;
          color: var(--white-soft);
          margin-bottom: 4px;
        }

        .ct-ch-value {
          font-family: 'Cabinet Grotesk', sans-serif;
          font-size: 14.5px;
          font-weight: 700;
          color: var(--white);
          margin-bottom: 3px;
        }

        .ct-ch-sub { font-size: 12px; color: var(--white-soft); font-weight: 300; }

        /* ── MAIN CONTENT ── */
        .ct-body {
          max-width: 1100px;
          margin: 0 auto;
          padding: 80px 48px;
          display: grid;
          grid-template-columns: 1fr 440px;
          gap: 64px;
          align-items: start;
        }

        /* ── FORM ── */
        .ct-form-panel {
          background: var(--navy-card);
          border: 1px solid var(--border);
          border-radius: 20px;
          padding: 40px 40px 36px;
          position: relative;
          overflow: hidden;
        }

        .ct-form-panel::before {
          content: '';
          position: absolute;
          top: 0; left: 0; right: 0;
          height: 2px;
          background: linear-gradient(90deg, var(--teal), rgba(15,212,192,0.15));
        }

        .ct-form-eyebrow {
          font-size: 11px;
          font-weight: 600;
          letter-spacing: 2px;
          text-transform: uppercase;
          color: var(--teal);
          margin-bottom: 10px;
          display: flex;
          align-items: center;
          gap: 8px;
        }

        .ct-form-eyebrow::before {
          content: '';
          width: 18px; height: 2px;
          background: var(--teal);
          border-radius: 2px;
        }

        .ct-form-title {
          font-family: 'Cabinet Grotesk', sans-serif;
          font-size: 26px;
          font-weight: 800;
          color: var(--white);
          letter-spacing: -0.6px;
          margin-bottom: 6px;
        }

        .ct-form-sub {
          font-size: 13.5px;
          color: var(--white-soft);
          font-weight: 300;
          margin-bottom: 30px;
        }

        /* Row */
        .ct-row {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 14px;
          margin-bottom: 14px;
        }

        /* Field */
        .ct-field { margin-bottom: 14px; }
        .ct-field:last-of-type { margin-bottom: 0; }

        .ct-label {
          display: block;
          font-size: 11px;
          font-weight: 600;
          letter-spacing: 0.9px;
          text-transform: uppercase;
          color: var(--white-soft);
          margin-bottom: 7px;
          transition: color .2s;
        }

        .ct-field.focused .ct-label { color: var(--teal); }

        .ct-input-wrap { position: relative; display: flex; align-items: center; }

        .ct-input-icon {
          position: absolute;
          left: 14px;
          color: rgba(154,170,191,0.35);
          pointer-events: none;
          transition: color .2s;
        }

        .ct-input-icon.top { top: 14px; align-self: flex-start; }

        .ct-field.focused .ct-input-icon { color: var(--teal); }

        .ct-input {
          width: 100%;
          padding: 13px 14px 13px 42px;
          background: rgba(240,244,255,0.04);
          border: 1.5px solid var(--border);
          border-radius: 11px;
          font-family: 'Geist', sans-serif;
          font-size: 14px;
          color: var(--white);
          outline: none;
          transition: border-color .2s, background .2s, box-shadow .2s;
          -webkit-appearance: none;
        }

        .ct-input::placeholder { color: rgba(154,170,191,0.28); }

        .ct-input:focus {
          border-color: var(--teal);
          background: rgba(15,212,192,0.04);
          box-shadow: 0 0 0 3px rgba(15,212,192,0.1);
        }

        textarea.ct-input {
          resize: vertical;
          min-height: 120px;
          padding-top: 13px;
          line-height: 1.55;
        }

        /* Subject chips */
        .ct-subjects {
          display: flex;
          flex-wrap: wrap;
          gap: 8px;
          margin-bottom: 14px;
        }

        .ct-subj-label {
          font-size: 11px;
          font-weight: 600;
          letter-spacing: 0.9px;
          text-transform: uppercase;
          color: var(--white-soft);
          margin-bottom: 9px;
          display: block;
        }

        .ct-chip {
          padding: 6px 14px;
          border-radius: 100px;
          font-size: 12.5px;
          font-weight: 500;
          border: 1px solid var(--border);
          background: var(--white-dim);
          color: var(--white-soft);
          cursor: pointer;
          transition: border-color .15s, color .15s, background .15s;
          user-select: none;
        }

        .ct-chip.active,
        .ct-chip:hover {
          border-color: rgba(15,212,192,0.35);
          color: var(--teal);
          background: rgba(15,212,192,0.07);
        }

        /* Submit */
        .ct-submit {
          width: 100%;
          padding: 14px;
          margin-top: 20px;
          background: var(--teal);
          color: var(--navy);
          font-family: 'Cabinet Grotesk', sans-serif;
          font-size: 15px;
          font-weight: 800;
          border: none;
          border-radius: 11px;
          cursor: pointer;
          position: relative;
          overflow: hidden;
          transition: transform .15s, box-shadow .2s, opacity .15s;
          box-shadow: 0 6px 24px rgba(15,212,192,0.28);
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
        }

        .ct-submit::after {
          content: '';
          position: absolute;
          top: 0; left: -100%;
          width: 50%; height: 100%;
          background: linear-gradient(90deg, transparent, rgba(255,255,255,0.22), transparent);
          transform: skewX(-15deg);
        }

        .ct-submit:hover:not(:disabled)::after { animation: shine .55s ease forwards; }
        @keyframes shine { from { left:-60%; } to { left:160%; } }

        .ct-submit:hover:not(:disabled) {
          transform: translateY(-1px);
          box-shadow: 0 10px 32px rgba(15,212,192,0.38);
        }

        .ct-submit:disabled { opacity: .55; cursor: not-allowed; }

        .ct-spinner {
          width: 16px; height: 16px;
          border: 2.5px solid rgba(11,17,32,0.25);
          border-top-color: var(--navy);
          border-radius: 50%;
          animation: spin .65s linear infinite;
        }

        @keyframes spin { to { transform: rotate(360deg); } }

        /* Success state */
        .ct-success {
          text-align: center;
          padding: 48px 20px;
        }

        .ct-success-icon {
          width: 64px; height: 64px;
          border-radius: 50%;
          background: rgba(15,212,192,0.1);
          border: 1px solid rgba(15,212,192,0.25);
          display: flex; align-items: center; justify-content: center;
          margin: 0 auto 20px;
          color: var(--teal);
          animation: popIn .5s cubic-bezier(.22,1,.36,1) both;
        }

        @keyframes popIn {
          from { opacity: 0; transform: scale(.5); }
          to   { opacity: 1; transform: scale(1); }
        }

        .ct-success-title {
          font-family: 'Cabinet Grotesk', sans-serif;
          font-size: 22px;
          font-weight: 800;
          color: var(--white);
          margin-bottom: 10px;
        }

        .ct-success-sub {
          font-size: 14px;
          color: var(--white-soft);
          font-weight: 300;
          line-height: 1.6;
          max-width: 300px;
          margin: 0 auto;
        }

        /* ── RIGHT SIDE INFO ── */
        .ct-info {}

        .ct-info-title {
          font-family: 'Cabinet Grotesk', sans-serif;
          font-size: clamp(24px, 3vw, 34px);
          font-weight: 800;
          color: var(--white);
          letter-spacing: -0.8px;
          line-height: 1.15;
          margin-bottom: 14px;
        }

        .ct-info-title em {
          font-family: 'Instrument Serif', serif;
          font-style: italic;
          font-weight: 400;
          color: var(--teal);
        }

        .ct-info-body {
          font-size: 14.5px;
          line-height: 1.7;
          color: var(--white-soft);
          font-weight: 300;
          margin-bottom: 40px;
        }

        /* Response time card */
        .ct-rt-card {
          padding: 20px 22px;
          background: var(--navy-card);
          border: 1px solid var(--border);
          border-radius: 14px;
          display: flex;
          align-items: center;
          gap: 16px;
          margin-bottom: 36px;
        }

        .ct-rt-icon {
          width: 40px; height: 40px;
          border-radius: 10px;
          background: var(--teal-dim);
          border: 1px solid rgba(15,212,192,0.15);
          display: flex; align-items: center; justify-content: center;
          color: var(--teal);
          flex-shrink: 0;
        }

        .ct-rt-label {
          font-size: 12px;
          color: var(--white-soft);
          font-weight: 300;
          margin-bottom: 2px;
        }

        .ct-rt-val {
          font-family: 'Cabinet Grotesk', sans-serif;
          font-size: 16px;
          font-weight: 700;
          color: var(--white);
        }

        /* FAQ */
        .ct-faq-title {
          font-family: 'Cabinet Grotesk', sans-serif;
          font-size: 16px;
          font-weight: 700;
          color: var(--white);
          margin-bottom: 14px;
          display: flex;
          align-items: center;
          gap: 8px;
        }

        .ct-faq-title::before {
          content: '';
          width: 14px; height: 2px;
          background: var(--teal);
          border-radius: 2px;
        }

        .ct-faq-list {
          display: flex;
          flex-direction: column;
          gap: 8px;
        }

        .ct-faq-item {
          border: 1px solid var(--border);
          border-radius: 11px;
          overflow: hidden;
          transition: border-color .2s;
        }

        .ct-faq-item.open { border-color: rgba(15,212,192,0.22); }

        .ct-faq-q {
          width: 100%;
          padding: 14px 16px;
          background: var(--navy-card);
          border: none;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 12px;
          font-family: 'Geist', sans-serif;
          font-size: 13.5px;
          font-weight: 500;
          color: var(--white);
          cursor: pointer;
          text-align: left;
          transition: background .15s;
        }

        .ct-faq-q:hover { background: rgba(240,244,255,0.03); }

        .ct-faq-chevron {
          flex-shrink: 0;
          color: var(--white-soft);
          transition: transform .25s ease;
        }

        .ct-faq-item.open .ct-faq-chevron { transform: rotate(180deg); color: var(--teal); }

        .ct-faq-a {
          padding: 0 16px;
          max-height: 0;
          overflow: hidden;
          font-size: 13px;
          line-height: 1.65;
          color: var(--white-soft);
          font-weight: 300;
          background: var(--navy-card);
          transition: max-height .3s ease, padding .3s ease;
        }

        .ct-faq-item.open .ct-faq-a {
          max-height: 120px;
          padding: 0 16px 14px;
        }

        /* RESPONSIVE */
        @media (max-width: 960px) {
          .ct-hero { padding: 130px 28px 64px; }
          .ct-channels { grid-template-columns: repeat(2, 1fr); padding: 40px 28px; }
          .ct-body { grid-template-columns: 1fr; gap: 40px; padding: 60px 28px; }
          .ct-form-panel { padding: 28px 24px; }
        }

        @media (max-width: 560px) {
          .ct-row { grid-template-columns: 1fr; }
          .ct-channels { grid-template-columns: 1fr 1fr; }
        }
      `}</style>

      <div className="ct-root">

        {/* ── HERO ── */}
        <section className="ct-hero">
          <div className="ct-hero-inner">
            <div className="ct-badge">
              <span className="ct-badge-dot" />
              We're here to help
            </div>
            <h1 className="ct-h1">
              Get in <em>touch</em><br />with us.
            </h1>
            <p className="ct-sub">
              Whether you have a question, a problem to solve, or just want to say hello — our team responds fast.
            </p>
          </div>
        </section>

        {/* ── CONTACT CHANNELS ── */}
        <div className="ct-channels-bg">
          <div className="ct-channels">
            {channels.map((c, i) => (
              <div className="ct-channel" key={i}>
                <div className={`ct-ch-icon ${c.color}`}>{c.icon}</div>
                <div>
                  <div className="ct-ch-label">{c.label}</div>
                  <div className="ct-ch-value">{c.value}</div>
                  <div className="ct-ch-sub">{c.sub}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ── BODY: FORM + INFO ── */}
        <div className="ct-body">

          {/* Form */}
          <div
            style={{
              opacity: mounted ? 1 : 0,
              transform: mounted ? "translateY(0)" : "translateY(20px)",
              transition: "opacity .6s ease .1s, transform .6s ease .1s",
            }}
          >
            <div className="ct-form-panel">
              {status === "sent" ? (
                <div className="ct-success">
                  <div className="ct-success-icon">
                    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="20 6 9 17 4 12"/>
                    </svg>
                  </div>
                  <div className="ct-success-title">Message sent! 🎉</div>
                  <p className="ct-success-sub">
                    Thanks for reaching out. We'll get back to you within 24 hours.
                  </p>
                </div>
              ) : (
                <>
                  <p className="ct-form-eyebrow">Send a Message</p>
                  <h2 className="ct-form-title">Let's talk</h2>
                  <p className="ct-form-sub">Fill in the form — we'll get back to you within 24 hours.</p>

                  <form onSubmit={handleSubmit}>
                    {/* Name + Email row */}
                    <div className="ct-row">
                      <div className={`ct-field${focused === "name" ? " focused" : ""}`}>
                        <label className="ct-label">Your Name</label>
                        <div className="ct-input-wrap">
                          <svg className="ct-input-icon" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/>
                          </svg>
                          <input
                            type="text" name="name" className="ct-input"
                            placeholder="Jane Smith" required
                            value={form.name} onChange={handleChange}
                            onFocus={() => setFocused("name")} onBlur={() => setFocused(null)}
                          />
                        </div>
                      </div>
                      <div className={`ct-field${focused === "email" ? " focused" : ""}`}>
                        <label className="ct-label">Email Address</label>
                        <div className="ct-input-wrap">
                          <svg className="ct-input-icon" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/>
                          </svg>
                          <input
                            type="email" name="email" className="ct-input"
                            placeholder="you@example.com" required
                            value={form.email} onChange={handleChange}
                            onFocus={() => setFocused("email")} onBlur={() => setFocused(null)}
                          />
                        </div>
                      </div>
                    </div>

                    {/* Subject chips */}
                    <div style={{ marginBottom: 14 }}>
                      <span className="ct-subj-label">Topic</span>
                      <div className="ct-subjects">
                        {["General Inquiry","Job Posting","Technical Issue","Partnership","Other"].map(s => (
                          <div
                            key={s}
                            className={`ct-chip${form.subject === s ? " active" : ""}`}
                            onClick={() => setForm(p => ({ ...p, subject: s }))}
                          >
                            {s}
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Message */}
                    <div className={`ct-field${focused === "message" ? " focused" : ""}`}>
                      <label className="ct-label">Message</label>
                      <div className="ct-input-wrap">
                        <svg className="ct-input-icon top" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                          <line x1="17" y1="10" x2="3" y2="10"/><line x1="21" y1="6" x2="3" y2="6"/><line x1="21" y1="14" x2="3" y2="14"/><line x1="17" y1="18" x2="3" y2="18"/>
                        </svg>
                        <textarea
                          name="message" className="ct-input"
                          placeholder="Tell us what's on your mind…" required
                          value={form.message} onChange={handleChange}
                          onFocus={() => setFocused("message")} onBlur={() => setFocused(null)}
                        />
                      </div>
                    </div>

                    <button type="submit" className="ct-submit" disabled={status === "sending"}>
                      {status === "sending" ? (
                        <><span className="ct-spinner" /> Sending…</>
                      ) : (
                        <>
                          Send Message
                          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                            <line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/>
                          </svg>
                        </>
                      )}
                    </button>
                  </form>
                </>
              )}
            </div>
          </div>

          {/* Right info + FAQ */}
          <div
            className="ct-info"
            style={{
              opacity: mounted ? 1 : 0,
              transform: mounted ? "translateY(0)" : "translateY(20px)",
              transition: "opacity .6s ease .22s, transform .6s ease .22s",
            }}
          >
            <h2 className="ct-info-title">
              We'd love to<br />hear from <em>you.</em>
            </h2>
            <p className="ct-info-body">
              Our support team is a real group of humans who genuinely care about helping you. Whether you're a job seeker stuck on an application or an employer looking for guidance — we've got you.
            </p>

            {/* Response time */}
            <div className="ct-rt-card">
              <div className="ct-rt-icon">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>
                </svg>
              </div>
              <div>
                <div className="ct-rt-label">Average response time</div>
                <div className="ct-rt-val">Under 24 hours</div>
              </div>
            </div>

            {/* FAQ */}
            <div className="ct-faq-title">Frequently Asked</div>
            <div className="ct-faq-list">
              {faqs.map((f, i) => (
                <div
                  key={i}
                  className={`ct-faq-item${openFaq === i ? " open" : ""}`}
                >
                  <button
                    type="button"
                    className="ct-faq-q"
                    onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  >
                    {f.q}
                    <svg className="ct-faq-chevron" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="6 9 12 15 18 9"/>
                    </svg>
                  </button>
                  <div className="ct-faq-a">{f.a}</div>
                </div>
              ))}
            </div>
          </div>

        </div>

        <Footer />
      </div>
    </>
  );
};

export default Contact;