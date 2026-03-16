import React, { useState, useEffect } from "react";
import axios from "axios";
import Footer from "./Footer";
import { useNavigate } from "react-router-dom";

const Erreg = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    company_name: "",
    company_website: "",
    company_description: "",
    contact_person_name: "",
    contact_person_phone: "",
  });

  const [showPass, setShowPass]   = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError]         = useState("");
  const [mounted, setMounted]     = useState(false);
  const [step, setStep]           = useState(1);

  const navigate = useNavigate();

  useEffect(() => {
    const t = setTimeout(() => setMounted(true), 80);
    return () => clearTimeout(t);
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleNext = (e) => {
    e.preventDefault();
    setStep(2);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");
    try {
      const response = await axios.post(
        "http://127.0.0.1:8000/users/api/register-employer/",
        formData
      );
      console.log("Registration successful:", response.data);
      navigate("/login");
    } catch (err) {
      if (err.response) {
        setError(err.response.data?.error || "Registration failed. Please try again.");
      } else {
        setError("Network error. Please try again.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cabinet+Grotesk:wght@400;500;700;800&family=Instrument+Serif:ital@0;1&family=Geist:wght@300;400;500&display=swap');

        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

        :root {
          --navy:       #0b1120;
          --navy-mid:   #111827;
          --teal:       #0fd4c0;
          --teal-dim:   rgba(15,212,192,0.12);
          --amber:      #f5a623;
          --white:      #f0f4ff;
          --white-soft: #9aaabf;
          --white-dim:  rgba(240,244,255,0.06);
          --border:     rgba(240,244,255,0.08);
          --error:      #ff5e5e;
        }

        .er-page {
          min-height: 100vh;
          background: var(--navy);
          font-family: 'Geist', sans-serif;
          color: var(--white);
          display: flex;
          flex-direction: column;
          overflow-x: hidden;
        }

        /* ── NAV ── */
        .er-nav {
          position: fixed;
          top: 0; left: 0; right: 0;
          z-index: 100;
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 0 48px;
          height: 64px;
          background: rgba(11,17,32,0.85);
          backdrop-filter: blur(16px);
          border-bottom: 1px solid var(--border);
        }

        .er-logo {
          font-family: 'Cabinet Grotesk', sans-serif;
          font-weight: 800;
          font-size: 20px;
          color: var(--white);
          letter-spacing: -0.4px;
          text-decoration: none;
          display: flex;
          align-items: center;
          gap: 9px;
        }

        .er-logo-dot {
          width: 8px; height: 8px;
          border-radius: 50%;
          background: var(--teal);
          box-shadow: 0 0 10px var(--teal);
        }

        .er-nav-links {
          display: flex;
          align-items: center;
          gap: 4px;
          list-style: none;
        }

        .er-nav-links a {
          padding: 7px 14px;
          border-radius: 8px;
          font-size: 13.5px;
          color: var(--white-soft);
          text-decoration: none;
          transition: color .18s, background .18s;
        }

        .er-nav-links a:hover { color: var(--white); background: var(--white-dim); }

        .er-nav-actions { display: flex; align-items: center; gap: 10px; }

        .er-btn-ghost {
          padding: 8px 18px;
          border: 1px solid var(--border);
          border-radius: 9px;
          background: transparent;
          color: var(--white-soft);
          font-family: 'Geist', sans-serif;
          font-size: 13.5px;
          font-weight: 500;
          cursor: pointer;
          text-decoration: none;
          display: inline-flex;
          align-items: center;
          transition: border-color .18s, color .18s;
        }

        .er-btn-ghost:hover { border-color: rgba(240,244,255,0.2); color: var(--white); }

        .er-btn-teal {
          padding: 8px 20px;
          border-radius: 9px;
          background: var(--teal);
          color: var(--navy);
          font-family: 'Cabinet Grotesk', sans-serif;
          font-size: 13.5px;
          font-weight: 700;
          border: none;
          cursor: pointer;
          text-decoration: none;
          display: inline-flex;
          align-items: center;
          box-shadow: 0 4px 16px rgba(15,212,192,0.25);
          transition: opacity .18s, transform .15s;
        }

        .er-btn-teal:hover { opacity: .9; transform: translateY(-1px); }

        /* ── MAIN GRID ── */
        .er-main {
          flex: 1;
          display: grid;
          grid-template-columns: 1fr 520px;
          /* KEY: full viewport height so sticky centering works */
          height: 100vh;
        }

        /* ── LEFT HERO ── */
        .er-hero {
          position: relative;
          display: flex;
          flex-direction: column;
          justify-content: center;
          padding: calc(64px + 60px) 72px 80px 80px;
          overflow: hidden;
        }

        .er-hero::before {
          content: '';
          position: absolute; inset: 0;
          background:
            radial-gradient(ellipse 55% 45% at 15% 65%, rgba(15,212,192,0.08) 0%, transparent 70%),
            radial-gradient(ellipse 45% 35% at 75% 25%, rgba(245,166,35,0.05) 0%, transparent 70%);
          pointer-events: none;
        }

        .er-hero::after {
          content: '';
          position: absolute; inset: 0;
          background-image: radial-gradient(rgba(240,244,255,0.055) 1px, transparent 1px);
          background-size: 32px 32px;
          pointer-events: none;
          mask-image: radial-gradient(ellipse 70% 70% at 50% 50%, black 30%, transparent 100%);
        }

        .er-hero-inner { position: relative; z-index: 1; max-width: 520px; }

        .er-pill {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 6px 14px 6px 8px;
          background: rgba(15,212,192,0.08);
          border: 1px solid rgba(15,212,192,0.2);
          border-radius: 100px;
          font-size: 12px;
          font-weight: 500;
          color: var(--teal);
          margin-bottom: 28px;
          width: fit-content;
          animation: fadeUp .6s cubic-bezier(.22,1,.36,1) both;
        }

        .er-pill-dot {
          width: 20px; height: 20px;
          border-radius: 50%;
          background: var(--teal);
          display: flex; align-items: center; justify-content: center;
        }

        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(12px); }
          to   { opacity: 1; transform: translateY(0); }
        }

        .er-h1 {
          font-family: 'Cabinet Grotesk', sans-serif;
          font-size: clamp(34px, 3.8vw, 52px);
          font-weight: 800;
          line-height: 1.1;
          letter-spacing: -1.4px;
          margin-bottom: 8px;
          animation: fadeUp .7s cubic-bezier(.22,1,.36,1) .1s both;
        }

        .er-h1 span {
          font-family: 'Instrument Serif', serif;
          font-style: italic;
          font-weight: 400;
          color: var(--teal);
          letter-spacing: -1px;
        }

        .er-sub {
          font-size: 15.5px;
          line-height: 1.68;
          color: var(--white-soft);
          font-weight: 300;
          max-width: 400px;
          margin-bottom: 48px;
          animation: fadeUp .7s cubic-bezier(.22,1,.36,1) .2s both;
        }

        .er-benefits {
          display: flex;
          flex-direction: column;
          gap: 14px;
          margin-bottom: 44px;
          animation: fadeUp .7s cubic-bezier(.22,1,.36,1) .3s both;
        }

        .er-benefit { display: flex; align-items: center; gap: 14px; }

        .er-benefit-icon {
          width: 36px; height: 36px;
          border-radius: 10px;
          background: rgba(15,212,192,0.08);
          border: 1px solid rgba(15,212,192,0.15);
          display: flex; align-items: center; justify-content: center;
          flex-shrink: 0;
          color: var(--teal);
        }

        .er-benefit-txt {
          font-size: 14px;
          color: var(--white-soft);
          font-weight: 300;
          line-height: 1.4;
        }

        .er-benefit-txt strong { color: var(--white); font-weight: 500; }

        .er-stats {
          display: flex;
          gap: 40px;
          padding-top: 32px;
          border-top: 1px solid var(--border);
          animation: fadeUp .7s cubic-bezier(.22,1,.36,1) .4s both;
        }

        .er-stat-n {
          font-family: 'Cabinet Grotesk', sans-serif;
          font-size: 22px;
          font-weight: 800;
          color: var(--white);
          margin-bottom: 4px;
        }

        .er-stat-n span { color: var(--teal); }
        .er-stat-l { font-size: 12px; color: var(--white-soft); font-weight: 300; }

        /* ── RIGHT FORM PANEL — KEY CENTERING FIX ── */
        .er-panel {
          background: var(--navy-mid);
          border-left: 1px solid var(--border);
          /* sticky + height: 100vh makes it lock to viewport */
          position: sticky;
          top: 0;
          height: 100vh;
          /* flex centers content both vertically AND horizontally */
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 32px 48px;
          overflow-y: auto;
          overflow-x: hidden;
        }

        .er-panel::before {
          content: '';
          position: absolute;
          bottom: -80px; right: -80px;
          width: 280px; height: 280px;
          border-radius: 50%;
          background: radial-gradient(circle, rgba(15,212,192,0.06), transparent 70%);
          pointer-events: none;
        }

        .er-form-inner {
          position: relative;
          z-index: 1;
          width: 100%;
          max-width: 380px;
        }

        /* ── STEP INDICATOR ── */
        .er-steps {
          display: flex;
          align-items: center;
          gap: 8px;
          margin-bottom: 20px;
        }

        .er-step {
          display: flex;
          align-items: center;
          gap: 8px;
          font-size: 12px;
          font-weight: 500;
          color: var(--white-soft);
        }

        .er-step-num {
          width: 24px; height: 24px;
          border-radius: 50%;
          display: flex; align-items: center; justify-content: center;
          font-size: 11px;
          font-weight: 700;
          border: 1.5px solid var(--border);
          color: var(--white-soft);
          transition: all .3s ease;
        }

        .er-step.active .er-step-num {
          background: var(--teal);
          border-color: var(--teal);
          color: var(--navy);
        }

        .er-step.done .er-step-num {
          background: rgba(15,212,192,0.15);
          border-color: rgba(15,212,192,0.4);
          color: var(--teal);
        }

        .er-step.active { color: var(--white); }
        .er-step.done   { color: var(--teal); }

        .er-step-line {
          flex: 1;
          height: 1px;
          background: var(--border);
          transition: background .4s ease;
        }

        .er-step-line.done { background: rgba(15,212,192,0.35); }

        .er-progress {
          height: 3px;
          background: var(--border);
          border-radius: 2px;
          margin-bottom: 22px;
          overflow: hidden;
        }

        .er-progress-fill {
          height: 100%;
          background: linear-gradient(90deg, var(--teal), rgba(15,212,192,0.55));
          border-radius: 2px;
          transition: width .5s cubic-bezier(.22,1,.36,1);
        }

        /* ── FORM HEADER ── */
        .er-eyebrow {
          font-size: 11px;
          font-weight: 600;
          letter-spacing: 2px;
          text-transform: uppercase;
          color: var(--teal);
          margin-bottom: 7px;
        }

        .er-title {
          font-family: 'Cabinet Grotesk', sans-serif;
          font-size: 26px;
          font-weight: 800;
          color: var(--white);
          letter-spacing: -0.6px;
          line-height: 1.18;
          margin-bottom: 4px;
        }

        .er-title-sub {
          font-size: 13.5px;
          color: var(--white-soft);
          font-weight: 300;
          margin-bottom: 22px;
        }

        /* ── INPUTS ── */
        .er-field { margin-bottom: 13px; }

        .er-label {
          display: block;
          font-size: 11px;
          font-weight: 600;
          letter-spacing: 0.9px;
          text-transform: uppercase;
          color: var(--white-soft);
          margin-bottom: 7px;
        }

        .er-input-wrap { position: relative; display: flex; align-items: center; }

        .er-input-icon {
          position: absolute;
          left: 13px;
          color: rgba(154,170,191,0.35);
          pointer-events: none;
          transition: color .2s;
          /* for textarea, align to top */
        }

        .er-input-icon.top { top: 14px; align-self: flex-start; }

        .er-input {
          width: 100%;
          padding: 12px 14px 12px 40px;
          background: rgba(240,244,255,0.04);
          border: 1.5px solid var(--border);
          border-radius: 10px;
          font-family: 'Geist', sans-serif;
          font-size: 14px;
          color: var(--white);
          outline: none;
          transition: border-color .2s, background .2s, box-shadow .2s;
          -webkit-appearance: none;
        }

        .er-input::placeholder { color: rgba(154,170,191,0.28); }

        .er-input:focus {
          border-color: var(--teal);
          background: rgba(15,212,192,0.04);
          box-shadow: 0 0 0 3px rgba(15,212,192,0.1);
        }

        .er-input-wrap:focus-within .er-input-icon { color: var(--teal); }

        textarea.er-input {
          resize: vertical;
          min-height: 90px;
          padding-top: 13px;
          line-height: 1.55;
        }

        .er-eye-btn {
          position: absolute;
          right: 12px;
          background: none;
          border: none;
          cursor: pointer;
          color: rgba(154,170,191,0.35);
          display: flex;
          padding: 4px;
          transition: color .18s;
        }

        .er-eye-btn:hover { color: var(--white-soft); }

        .er-hint {
          font-size: 11px;
          color: rgba(154,170,191,0.38);
          margin-top: 4px;
          padding-left: 2px;
        }

        /* Two-col row */
        .er-row {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 12px;
          margin-bottom: 13px;
        }

        .er-row .er-field { margin-bottom: 0; }

        /* ── ERROR ── */
        .er-error {
          display: flex;
          align-items: flex-start;
          gap: 10px;
          padding: 11px 14px;
          background: rgba(255,94,94,0.07);
          border: 1px solid rgba(255,94,94,0.2);
          border-left: 3px solid var(--error);
          border-radius: 9px;
          margin-bottom: 16px;
          animation: errIn .3s ease both;
        }

        @keyframes errIn {
          from { opacity: 0; transform: translateY(-5px); }
          to   { opacity: 1; transform: translateY(0); }
        }

        .er-error p { font-size: 12.5px; color: #ffaaaa; line-height: 1.5; }

        /* ── BUTTONS ── */
        .er-btn-row {
          display: flex;
          gap: 10px;
          margin-top: 6px;
        }

        .er-back-btn {
          padding: 13px 18px;
          background: var(--white-dim);
          border: 1px solid var(--border);
          border-radius: 10px;
          font-family: 'Geist', sans-serif;
          font-size: 13.5px;
          font-weight: 500;
          color: var(--white-soft);
          cursor: pointer;
          transition: background .18s, color .18s;
          display: flex;
          align-items: center;
          gap: 6px;
          white-space: nowrap;
        }

        .er-back-btn:hover { background: rgba(240,244,255,0.09); color: var(--white); }

        .er-next-btn, .er-submit-btn {
          flex: 1;
          padding: 13px;
          background: var(--teal);
          color: var(--navy);
          font-family: 'Cabinet Grotesk', sans-serif;
          font-size: 14.5px;
          font-weight: 800;
          border: none;
          border-radius: 10px;
          cursor: pointer;
          position: relative;
          overflow: hidden;
          transition: transform .15s, box-shadow .2s, opacity .15s;
          box-shadow: 0 6px 24px rgba(15,212,192,0.28);
          width: 100%;
        }

        .er-next-btn::after, .er-submit-btn::after {
          content: '';
          position: absolute;
          top: 0; left: -100%;
          width: 50%; height: 100%;
          background: linear-gradient(90deg, transparent, rgba(255,255,255,0.22), transparent);
          transform: skewX(-15deg);
        }

        .er-next-btn:hover::after, .er-submit-btn:hover:not(:disabled)::after {
          animation: shine .55s ease forwards;
        }

        @keyframes shine { from { left: -60%; } to { left: 160%; } }

        .er-next-btn:hover, .er-submit-btn:hover:not(:disabled) {
          transform: translateY(-1px);
          box-shadow: 0 10px 32px rgba(15,212,192,0.38);
        }

        .er-submit-btn:disabled { opacity: 0.5; cursor: not-allowed; }

        .er-spinner {
          width: 15px; height: 15px;
          border: 2.5px solid rgba(11,17,32,0.25);
          border-top-color: var(--navy);
          border-radius: 50%;
          display: inline-block;
          animation: spin .65s linear infinite;
          vertical-align: middle;
          margin-right: 8px;
        }

        @keyframes spin { to { transform: rotate(360deg); } }

        .er-login-txt {
          text-align: center;
          font-size: 13px;
          color: var(--white-soft);
          margin-top: 18px;
        }

        .er-login-txt a {
          color: var(--teal);
          font-weight: 500;
          text-decoration: none;
          border-bottom: 1px solid rgba(15,212,192,0.3);
          padding-bottom: 1px;
          transition: border-color .15s;
        }

        .er-login-txt a:hover { border-color: var(--teal); }

        /* Reveal animation */
        .er-reveal {
          opacity: 0;
          transform: translateY(14px);
          transition: opacity .45s ease, transform .45s ease;
        }

        .er-reveal.show { opacity: 1; transform: translateY(0); }

        @keyframes slideIn {
          from { opacity: 0; transform: translateX(24px); }
          to   { opacity: 1; transform: translateX(0); }
        }

        .step-in { animation: slideIn .35s cubic-bezier(.22,1,.36,1) both; }

        @keyframes slideBack {
          from { opacity: 0; transform: translateX(-24px); }
          to   { opacity: 1; transform: translateX(0); }
        }

        .step-back { animation: slideBack .35s cubic-bezier(.22,1,.36,1) both; }

        /* Responsive */
        @media (max-width: 960px) {
          .er-main  { grid-template-columns: 1fr; height: auto; }
          .er-hero  { display: none; }
          .er-panel { position: relative; height: 100vh; border-left: none; padding: 80px 28px 48px; }
          .er-nav   { padding: 0 24px; }
          .er-nav-links { display: none; }
        }
      `}</style>

      <div className="er-page">
        <div className="er-main">

          {/* ── LEFT HERO ── */}
          <div className="er-hero">
            <div className="er-hero-inner">
              <div className="er-pill">
                <span className="er-pill-dot">
                  <svg width="10" height="10" viewBox="0 0 10 10"><circle cx="5" cy="5" r="3" fill="#0b1120"/></svg>
                </span>
                Hire top talent today
              </div>

              <h1 className="er-h1">
                Post roles,<br />
                find the <span>right</span><br />
                people.
              </h1>

              <p className="er-sub">
                Join 48,000+ companies using TalentBridge to source, screen, and hire qualified professionals — faster than ever before.
              </p>

              <div className="er-benefits">
                {[
                  {
                    icon: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>,
                    title: "2.1M+ job seekers",
                    desc: "Access a massive pool of active, qualified candidates"
                  },
                  {
                    icon: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>,
                    title: "Hire in days, not months",
                    desc: "AI matching surfaces the best candidates instantly"
                  },
                  {
                    icon: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="7" width="20" height="14" rx="2"/><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/></svg>,
                    title: "Free to post",
                    desc: "No subscription required — pay only when you hire"
                  },
                ].map((b, i) => (
                  <div className="er-benefit" key={i}>
                    <div className="er-benefit-icon">{b.icon}</div>
                    <div className="er-benefit-txt">
                      <strong>{b.title}</strong> — {b.desc}
                    </div>
                  </div>
                ))}
              </div>

              <div className="er-stats">
                <div>
                  <div className="er-stat-n">48k<span>+</span></div>
                  <div className="er-stat-l">Companies</div>
                </div>
                <div>
                  <div className="er-stat-n">2.1M<span>+</span></div>
                  <div className="er-stat-l">Candidates</div>
                </div>
                <div>
                  <div className="er-stat-n">4.9<span>★</span></div>
                  <div className="er-stat-l">Employer Rating</div>
                </div>
              </div>
            </div>
          </div>

          {/* ── RIGHT FORM PANEL — perfectly centered ── */}
          <div className="er-panel">
            <div className="er-form-inner">

              {/* Step indicator */}
              <div className={`er-reveal ${mounted ? 'show' : ''}`} style={{ transitionDelay:'0s' }}>
                <div className="er-steps">
                  <div className={`er-step ${step === 1 ? 'active' : 'done'}`}>
                    <div className="er-step-num">
                      {step > 1
                        ? <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
                        : "1"
                      }
                    </div>
                    Account
                  </div>
                  <div className={`er-step-line ${step > 1 ? 'done' : ''}`} />
                  <div className={`er-step ${step === 2 ? 'active' : ''}`}>
                    <div className="er-step-num">2</div>
                    Company
                  </div>
                </div>

                <div className="er-progress">
                  <div className="er-progress-fill" style={{ width: step === 1 ? '50%' : '100%' }} />
                </div>
              </div>

              {/* ── STEP 1: Account Details ── */}
              {step === 1 && (
                <form onSubmit={handleNext} className="step-in">

                  <div className={`er-reveal ${mounted ? 'show' : ''}`} style={{ transitionDelay:'0.08s' }}>
                    <p className="er-eyebrow">Step 1 of 2</p>
                    <h2 className="er-title">Employer account</h2>
                    <p className="er-title-sub">Set up your login credentials.</p>
                  </div>

                  <div className={`er-reveal ${mounted ? 'show' : ''}`} style={{ transitionDelay:'0.14s' }}>
                    <div className="er-field">
                      <label className="er-label">Username</label>
                      <div className="er-input-wrap">
                        <svg className="er-input-icon" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/>
                        </svg>
                        <input type="text" name="username" className="er-input"
                          placeholder="your_username" required minLength="3" maxLength="30"
                          value={formData.username} onChange={handleChange} autoComplete="username"/>
                      </div>
                      <p className="er-hint">3–30 characters</p>
                    </div>
                  </div>

                  <div className={`er-reveal ${mounted ? 'show' : ''}`} style={{ transitionDelay:'0.20s' }}>
                    <div className="er-field">
                      <label className="er-label">Work Email</label>
                      <div className="er-input-wrap">
                        <svg className="er-input-icon" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/>
                        </svg>
                        <input type="email" name="email" className="er-input"
                          placeholder="you@company.com" required
                          value={formData.email} onChange={handleChange} autoComplete="email"/>
                      </div>
                    </div>
                  </div>

                  <div className={`er-reveal ${mounted ? 'show' : ''}`} style={{ transitionDelay:'0.26s' }}>
                    <div className="er-field">
                      <label className="er-label">Password</label>
                      <div className="er-input-wrap">
                        <svg className="er-input-icon" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                          <rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/>
                        </svg>
                        <input type={showPass ? "text" : "password"} name="password" className="er-input"
                          placeholder="Min. 6 characters" required minLength="6"
                          value={formData.password} onChange={handleChange} autoComplete="new-password"/>
                        <button type="button" className="er-eye-btn" onClick={() => setShowPass(!showPass)} tabIndex={-1}>
                          {showPass
                            ? <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94"/><path d="M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19"/><line x1="1" y1="1" x2="23" y2="23"/></svg>
                            : <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>
                          }
                        </button>
                      </div>
                      <p className="er-hint">At least 6 characters</p>
                    </div>
                  </div>

                  <div className={`er-reveal ${mounted ? 'show' : ''}`} style={{ transitionDelay:'0.32s' }}>
                    <button type="submit" className="er-next-btn">Continue →</button>
                  </div>

                  <div className={`er-reveal ${mounted ? 'show' : ''}`} style={{ transitionDelay:'0.38s' }}>
                    <p className="er-login-txt">Already have an account? <a href="/login">Sign in</a></p>
                  </div>
                </form>
              )}

              {/* ── STEP 2: Company Info ── */}
              {step === 2 && (
                <form onSubmit={handleSubmit} className="step-in">
                  <p className="er-eyebrow">Step 2 of 2</p>
                  <h2 className="er-title">Company details</h2>
                  <p className="er-title-sub">Tell candidates about your company.</p>

                  {error && (
                    <div className="er-error">
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#ff5e5e" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink:0, marginTop:1 }}>
                        <circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/>
                      </svg>
                      <p>{error}</p>
                    </div>
                  )}

                  {/* Company name + website row */}
                  <div className="er-row">
                    <div className="er-field">
                      <label className="er-label">Company Name</label>
                      <div className="er-input-wrap">
                        <svg className="er-input-icon" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                          <rect x="2" y="7" width="20" height="14" rx="2"/><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/>
                        </svg>
                        <input type="text" name="company_name" className="er-input"
                          placeholder="Acme Corp" required minLength="2" maxLength="100"
                          value={formData.company_name} onChange={handleChange}/>
                      </div>
                    </div>
                    <div className="er-field">
                      <label className="er-label">Website</label>
                      <div className="er-input-wrap">
                        <svg className="er-input-icon" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                          <circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>
                        </svg>
                        <input type="url" name="company_website" className="er-input"
                          placeholder="https://…" required
                          value={formData.company_website} onChange={handleChange}/>
                      </div>
                    </div>
                  </div>

                  <div className="er-field">
                    <label className="er-label">Company Description</label>
                    <div className="er-input-wrap">
                      <svg className="er-input-icon top" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                        <line x1="17" y1="10" x2="3" y2="10"/><line x1="21" y1="6" x2="3" y2="6"/><line x1="21" y1="14" x2="3" y2="14"/><line x1="17" y1="18" x2="3" y2="18"/>
                      </svg>
                      <textarea name="company_description" className="er-input"
                        placeholder="Tell candidates what makes your company great…"
                        required minLength="10" maxLength="500"
                        value={formData.company_description} onChange={handleChange}/>
                    </div>
                    <p className="er-hint">10–500 characters</p>
                  </div>

                  {/* Contact person row */}
                  <div className="er-row">
                    <div className="er-field">
                      <label className="er-label">Contact Name</label>
                      <div className="er-input-wrap">
                        <svg className="er-input-icon" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/>
                        </svg>
                        <input type="text" name="contact_person_name" className="er-input"
                          placeholder="Jane Smith" required
                          value={formData.contact_person_name} onChange={handleChange}/>
                      </div>
                    </div>
                    <div className="er-field">
                      <label className="er-label">Contact Phone</label>
                      <div className="er-input-wrap">
                        <svg className="er-input-icon" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 13a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.6 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/>
                        </svg>
                        <input type="tel" name="contact_person_phone" className="er-input"
                          placeholder="10-digit" required pattern="[0-9]{10}"
                          value={formData.contact_person_phone} onChange={handleChange}/>
                      </div>
                    </div>
                  </div>

                  <div className="er-btn-row">
                    <button type="button" className="er-back-btn" onClick={() => setStep(1)}>
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <line x1="19" y1="12" x2="5" y2="12"/><polyline points="12 19 5 12 12 5"/>
                      </svg>
                      Back
                    </button>
                    <button type="submit" className="er-submit-btn" disabled={isLoading}>
                      {isLoading ? <><span className="er-spinner"/>Registering…</> : "Register →"}
                    </button>
                  </div>

                  <p className="er-login-txt" style={{ marginTop: 16 }}>
                    Already have an account? <a href="/login">Sign in</a>
                  </p>
                </form>
              )}

            </div>
          </div>

        </div>

        <Footer />
      </div>
    </>
  );
};

export default Erreg;