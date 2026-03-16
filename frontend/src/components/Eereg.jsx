import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Footer from "./Footer";

const Eereg = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    firstName: "",
    lastName: "",
    skills: "",
    contactNumber: "",
  });

  const [showPass, setShowPass] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [mounted, setMounted] = useState(false);
  const [step, setStep] = useState(1); // 2-step form

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
        "http://127.0.0.1:8000/users/api/register-jobseeker/",
        formData,
        { headers: { "Content-Type": "multipart/form-data" } }
      );
      console.log("Registration successful:", response.data);
      navigate("/login");
    } catch (err) {
      setError(err.response?.data?.error || "Registration failed. Please try again.");
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

        .rg-page {
          min-height: 100vh;
          background: var(--navy);
          font-family: 'Geist', sans-serif;
          color: var(--white);
          display: flex;
          flex-direction: column;
          overflow-x: hidden;
        }

        /* ── NAV ── */
        .rg-nav {
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

        .rg-logo {
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

        .rg-logo-dot {
          width: 8px; height: 8px;
          border-radius: 50%;
          background: var(--teal);
          box-shadow: 0 0 10px var(--teal);
        }

        .rg-nav-links {
          display: flex;
          align-items: center;
          gap: 4px;
          list-style: none;
        }

        .rg-nav-links a {
          padding: 7px 14px;
          border-radius: 8px;
          font-size: 13.5px;
          color: var(--white-soft);
          text-decoration: none;
          transition: color .18s, background .18s;
        }

        .rg-nav-links a:hover {
          color: var(--white);
          background: var(--white-dim);
        }

        .rg-nav-actions { display: flex; align-items: center; gap: 10px; }

        .rg-btn-ghost {
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

        .rg-btn-ghost:hover { border-color: rgba(240,244,255,0.2); color: var(--white); }

        .rg-btn-teal {
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

        .rg-btn-teal:hover { opacity: .9; transform: translateY(-1px); }

        /* ── MAIN GRID ── */
        .rg-main {
          flex: 1;
          display: grid;
          grid-template-columns: 1fr 520px;
          height: 100vh;
        }

        /* ── LEFT HERO ── */
        .rg-hero {
          position: relative;
          display: flex;
          flex-direction: column;
          justify-content: center;
          padding: calc(64px + 60px) 72px 80px 80px;
          overflow: hidden;
        }

        .rg-hero::before {
          content: '';
          position: absolute; inset: 0;
          background:
            radial-gradient(ellipse 55% 45% at 15% 65%, rgba(15,212,192,0.08) 0%, transparent 70%),
            radial-gradient(ellipse 45% 35% at 75% 25%, rgba(245,166,35,0.05) 0%, transparent 70%);
          pointer-events: none;
        }

        .rg-hero::after {
          content: '';
          position: absolute; inset: 0;
          background-image: radial-gradient(rgba(240,244,255,0.055) 1px, transparent 1px);
          background-size: 32px 32px;
          pointer-events: none;
          mask-image: radial-gradient(ellipse 70% 70% at 50% 50%, black 30%, transparent 100%);
        }

        .rg-hero-inner { position: relative; z-index: 1; max-width: 520px; }

        /* Pill */
        .rg-pill {
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

        .rg-pill-dot {
          width: 20px; height: 20px;
          border-radius: 50%;
          background: var(--teal);
          display: flex; align-items: center; justify-content: center;
        }

        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(12px); }
          to   { opacity: 1; transform: translateY(0); }
        }

        .rg-h1 {
          font-family: 'Cabinet Grotesk', sans-serif;
          font-size: clamp(34px, 3.8vw, 52px);
          font-weight: 800;
          line-height: 1.1;
          letter-spacing: -1.4px;
          margin-bottom: 8px;
          animation: fadeUp .7s cubic-bezier(.22,1,.36,1) .1s both;
        }

        .rg-h1 span {
          font-family: 'Instrument Serif', serif;
          font-style: italic;
          font-weight: 400;
          color: var(--teal);
          letter-spacing: -1px;
        }

        .rg-sub {
          font-size: 15.5px;
          line-height: 1.68;
          color: var(--white-soft);
          font-weight: 300;
          max-width: 400px;
          margin-bottom: 48px;
          animation: fadeUp .7s cubic-bezier(.22,1,.36,1) .2s both;
        }

        /* Benefit list */
        .rg-benefits {
          display: flex;
          flex-direction: column;
          gap: 14px;
          animation: fadeUp .7s cubic-bezier(.22,1,.36,1) .3s both;
          margin-bottom: 44px;
        }

        .rg-benefit {
          display: flex;
          align-items: center;
          gap: 14px;
        }

        .rg-benefit-icon {
          width: 36px; height: 36px;
          border-radius: 10px;
          background: rgba(15,212,192,0.08);
          border: 1px solid rgba(15,212,192,0.15);
          display: flex; align-items: center; justify-content: center;
          flex-shrink: 0;
          color: var(--teal);
        }

        .rg-benefit-txt {
          font-size: 14px;
          color: var(--white-soft);
          font-weight: 300;
          line-height: 1.4;
        }

        .rg-benefit-txt strong {
          color: var(--white);
          font-weight: 500;
        }

        /* Stats */
        .rg-stats {
          display: flex;
          gap: 40px;
          padding-top: 32px;
          border-top: 1px solid var(--border);
          animation: fadeUp .7s cubic-bezier(.22,1,.36,1) .4s both;
        }

        .rg-stat-n {
          font-family: 'Cabinet Grotesk', sans-serif;
          font-size: 22px;
          font-weight: 800;
          color: var(--white);
          margin-bottom: 4px;
        }

        .rg-stat-n span { color: var(--teal); }
        .rg-stat-l { font-size: 12px; color: var(--white-soft); font-weight: 300; }

        /* ── RIGHT FORM PANEL ── */
        .rg-panel {
          background: var(--navy-mid);
          border-left: 1px solid var(--border);
          position: sticky;
          top: 0;
          height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 32px 48px;
          overflow-y: auto;
          overflow-x: hidden;
        }

        .rg-panel::before {
          content: '';
          position: absolute;
          bottom: -80px; right: -80px;
          width: 280px; height: 280px;
          border-radius: 50%;
          background: radial-gradient(circle, rgba(15,212,192,0.06), transparent 70%);
          pointer-events: none;
        }

        .rg-form-inner {
          position: relative;
          z-index: 1;
          width: 100%;
          max-width: 380px;
        }

        /* Step indicator */
        .rg-steps {
          display: flex;
          align-items: center;
          gap: 8px;
          margin-bottom: 28px;
        }

        .rg-step {
          display: flex;
          align-items: center;
          gap: 8px;
          font-size: 12px;
          font-weight: 500;
          color: var(--white-soft);
        }

        .rg-step-num {
          width: 24px; height: 24px;
          border-radius: 50%;
          display: flex; align-items: center; justify-content: center;
          font-size: 11px;
          font-weight: 700;
          border: 1.5px solid var(--border);
          color: var(--white-soft);
          transition: all .3s ease;
        }

        .rg-step.active .rg-step-num {
          background: var(--teal);
          border-color: var(--teal);
          color: var(--navy);
        }

        .rg-step.done .rg-step-num {
          background: rgba(15,212,192,0.15);
          border-color: rgba(15,212,192,0.4);
          color: var(--teal);
        }

        .rg-step.active { color: var(--white); }
        .rg-step.done   { color: var(--teal); }

        .rg-step-line {
          flex: 1;
          height: 1px;
          background: var(--border);
          transition: background .4s ease;
        }

        .rg-step-line.done { background: rgba(15,212,192,0.35); }

        /* Eyebrow + title */
        .rg-eyebrow {
          font-size: 11px;
          font-weight: 600;
          letter-spacing: 2px;
          text-transform: uppercase;
          color: var(--teal);
          margin-bottom: 8px;
        }

        .rg-title {
          font-family: 'Cabinet Grotesk', sans-serif;
          font-size: 26px;
          font-weight: 800;
          color: var(--white);
          letter-spacing: -0.6px;
          line-height: 1.18;
          margin-bottom: 6px;
        }

        .rg-title-sub {
          font-size: 14px;
          color: var(--white-soft);
          font-weight: 300;
          margin-bottom: 28px;
        }

        /* Two-col row */
        .rg-row {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 12px;
        }

        /* Field */
        .rg-field { margin-bottom: 14px; }

        .rg-label {
          display: block;
          font-size: 11px;
          font-weight: 600;
          letter-spacing: 0.9px;
          text-transform: uppercase;
          color: var(--white-soft);
          margin-bottom: 7px;
        }

        .rg-input-wrap { position: relative; display: flex; align-items: center; }

        .rg-input-icon {
          position: absolute;
          left: 13px;
          color: rgba(154,170,191,0.35);
          pointer-events: none;
          transition: color .2s;
        }

        .rg-input {
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

        .rg-input::placeholder { color: rgba(154,170,191,0.28); }

        .rg-input:focus {
          border-color: var(--teal);
          background: rgba(15,212,192,0.04);
          box-shadow: 0 0 0 3px rgba(15,212,192,0.1);
        }

        .rg-input-wrap:focus-within .rg-input-icon { color: var(--teal); }

        .rg-eye-btn {
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

        .rg-eye-btn:hover { color: var(--white-soft); }

        /* Hint text */
        .rg-hint {
          font-size: 11px;
          color: rgba(154,170,191,0.4);
          margin-top: 5px;
          padding-left: 2px;
        }

        /* Error */
        .rg-error {
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

        .rg-error p { font-size: 12.5px; color: #ffaaaa; line-height: 1.5; }

        /* Buttons */
        .rg-btn-row {
          display: flex;
          gap: 10px;
          margin-top: 6px;
        }

        .rg-back-btn {
          padding: 14px 20px;
          background: var(--white-dim);
          border: 1px solid var(--border);
          border-radius: 10px;
          font-family: 'Geist', sans-serif;
          font-size: 14px;
          font-weight: 500;
          color: var(--white-soft);
          cursor: pointer;
          transition: background .18s, color .18s;
          display: flex;
          align-items: center;
          gap: 6px;
          white-space: nowrap;
        }

        .rg-back-btn:hover { background: rgba(240,244,255,0.09); color: var(--white); }

        .rg-submit-btn {
          flex: 1;
          padding: 14px;
          background: var(--teal);
          color: var(--navy);
          font-family: 'Cabinet Grotesk', sans-serif;
          font-size: 14.5px;
          font-weight: 800;
          letter-spacing: 0.2px;
          border: none;
          border-radius: 10px;
          cursor: pointer;
          position: relative;
          overflow: hidden;
          transition: transform .15s, box-shadow .2s, opacity .15s;
          box-shadow: 0 6px 24px rgba(15,212,192,0.28);
        }

        .rg-submit-btn::after {
          content: '';
          position: absolute;
          top: 0; left: -100%;
          width: 50%; height: 100%;
          background: linear-gradient(90deg, transparent, rgba(255,255,255,0.22), transparent);
          transform: skewX(-15deg);
        }

        .rg-submit-btn:hover:not(:disabled)::after { animation: shine .55s ease forwards; }

        @keyframes shine { from { left: -60%; } to { left: 160%; } }

        .rg-submit-btn:hover:not(:disabled) {
          transform: translateY(-1px);
          box-shadow: 0 10px 32px rgba(15,212,192,0.38);
        }

        .rg-submit-btn:disabled { opacity: 0.5; cursor: not-allowed; }

        .rg-next-btn {
          width: 100%;
          padding: 14px;
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
          transition: transform .15s, box-shadow .2s;
          box-shadow: 0 6px 24px rgba(15,212,192,0.28);
          margin-top: 6px;
        }

        .rg-next-btn:hover {
          transform: translateY(-1px);
          box-shadow: 0 10px 32px rgba(15,212,192,0.38);
        }

        .rg-spinner {
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

        .rg-login-txt {
          text-align: center;
          font-size: 13px;
          color: var(--white-soft);
          margin-top: 20px;
        }

        .rg-login-txt a {
          color: var(--teal);
          font-weight: 500;
          text-decoration: none;
          border-bottom: 1px solid rgba(15,212,192,0.3);
          padding-bottom: 1px;
          transition: border-color .15s;
        }

        .rg-login-txt a:hover { border-color: var(--teal); }

        /* Stagger reveal */
        .rg-reveal {
          opacity: 0;
          transform: translateY(14px);
          transition: opacity .45s ease, transform .45s ease;
        }

        .rg-reveal.show { opacity: 1; transform: translateY(0); }

        /* Step slide transitions */
        .step-slide-enter {
          animation: slideIn .35s cubic-bezier(.22,1,.36,1) both;
        }

        @keyframes slideIn {
          from { opacity: 0; transform: translateX(24px); }
          to   { opacity: 1; transform: translateX(0); }
        }

        .step-back-enter {
          animation: slideBack .35s cubic-bezier(.22,1,.36,1) both;
        }

        @keyframes slideBack {
          from { opacity: 0; transform: translateX(-24px); }
          to   { opacity: 1; transform: translateX(0); }
        }

        /* Progress bar */
        .rg-progress {
          height: 3px;
          background: var(--border);
          border-radius: 2px;
          margin-bottom: 24px;
          overflow: hidden;
        }

        .rg-progress-fill {
          height: 100%;
          background: linear-gradient(90deg, var(--teal), rgba(15,212,192,0.6));
          border-radius: 2px;
          transition: width .5s cubic-bezier(.22,1,.36,1);
        }

        @media (max-width: 960px) {
          .rg-main { grid-template-columns: 1fr; height: auto; }
          .rg-hero  { display: none; }
          .rg-panel { position: relative; height: 100vh; border-left: none; padding: 80px 28px 48px; }
          .rg-nav   { padding: 0 24px; }
          .rg-nav-links { display: none; }
        }
      `}</style>

      <div className="rg-page">

        <div className="rg-main">

          {/* LEFT HERO */}
          <div className="rg-hero">
            <div className="rg-hero-inner">
              <div className="rg-pill">
                <span className="rg-pill-dot">
                  <svg width="10" height="10" viewBox="0 0 10 10"><circle cx="5" cy="5" r="3" fill="#0b1120"/></svg>
                </span>
                Free to join — always
              </div>

              <h1 className="rg-h1">
                Launch your<br />
                <span>career</span> with<br />
                confidence.
              </h1>

              <p className="rg-sub">
                Create your profile in under 2 minutes and get matched with roles that fit who you actually are — not just your keywords.
              </p>

              <div className="rg-benefits">
                {[
                  {
                    icon: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>,
                    title: "Smart job matching",
                    desc: "AI-powered recommendations based on your skills"
                  },
                  {
                    icon: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>,
                    title: "48,000+ companies",
                    desc: "From funded startups to global enterprises"
                  },
                  {
                    icon: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="3" width="20" height="14" rx="2"/><line x1="8" y1="21" x2="16" y2="21"/><line x1="12" y1="17" x2="12" y2="21"/></svg>,
                    title: "One-click apply",
                    desc: "Apply to multiple roles without re-entering your info"
                  },
                ].map((b, i) => (
                  <div className="rg-benefit" key={i}>
                    <div className="rg-benefit-icon">{b.icon}</div>
                    <div className="rg-benefit-txt">
                      <strong>{b.title}</strong> — {b.desc}
                    </div>
                  </div>
                ))}
              </div>

              <div className="rg-stats">
                <div>
                  <div className="rg-stat-n">48k<span>+</span></div>
                  <div className="rg-stat-l">Active Jobs</div>
                </div>
                <div>
                  <div className="rg-stat-n">2.1M<span>+</span></div>
                  <div className="rg-stat-l">Professionals</div>
                </div>
                <div>
                  <div className="rg-stat-n">98<span>%</span></div>
                  <div className="rg-stat-l">Satisfaction</div>
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT FORM PANEL */}
          <div className="rg-panel">
            <div className="rg-form-inner">

              {/* Step indicator */}
              <div className={`rg-reveal ${mounted ? 'show' : ''}`} style={{ transitionDelay:'0s' }}>
                <div className="rg-steps">
                  <div className={`rg-step ${step === 1 ? 'active' : 'done'}`}>
                    <div className="rg-step-num">
                      {step > 1
                        ? <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
                        : "1"
                      }
                    </div>
                    Account
                  </div>
                  <div className={`rg-step-line ${step > 1 ? 'done' : ''}`} />
                  <div className={`rg-step ${step === 2 ? 'active' : step > 2 ? 'done' : ''}`}>
                    <div className="rg-step-num">2</div>
                    Profile
                  </div>
                </div>

                {/* Progress bar */}
                <div className="rg-progress">
                  <div className="rg-progress-fill" style={{ width: step === 1 ? '50%' : '100%' }} />
                </div>
              </div>

              {/* STEP 1 — Account */}
              {step === 1 && (
                <form onSubmit={handleNext} className="step-slide-enter">
                  <div className={`rg-reveal ${mounted ? 'show' : ''}`} style={{ transitionDelay:'0.08s' }}>
                    <p className="rg-eyebrow">Step 1 of 2</p>
                    <h2 className="rg-title">Create your<br />account</h2>
                    <p className="rg-title-sub">Start with your login credentials.</p>
                  </div>

                  <div className={`rg-reveal ${mounted ? 'show' : ''}`} style={{ transitionDelay:'0.16s' }}>
                    <div className="rg-field">
                      <label className="rg-label">Username</label>
                      <div className="rg-input-wrap">
                        <svg className="rg-input-icon" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/>
                        </svg>
                        <input type="text" name="username" className="rg-input" placeholder="your_username"
                          required minLength="3" maxLength="30"
                          value={formData.username} onChange={handleChange} autoComplete="username"/>
                      </div>
                      <p className="rg-hint">3–30 characters</p>
                    </div>
                  </div>

                  <div className={`rg-reveal ${mounted ? 'show' : ''}`} style={{ transitionDelay:'0.22s' }}>
                    <div className="rg-field">
                      <label className="rg-label">Email</label>
                      <div className="rg-input-wrap">
                        <svg className="rg-input-icon" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/>
                        </svg>
                        <input type="email" name="email" className="rg-input" placeholder="you@example.com"
                          required value={formData.email} onChange={handleChange} autoComplete="email"/>
                      </div>
                    </div>
                  </div>

                  <div className={`rg-reveal ${mounted ? 'show' : ''}`} style={{ transitionDelay:'0.28s' }}>
                    <div className="rg-field">
                      <label className="rg-label">Password</label>
                      <div className="rg-input-wrap">
                        <svg className="rg-input-icon" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                          <rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/>
                        </svg>
                        <input type={showPass ? "text" : "password"} name="password" className="rg-input"
                          placeholder="Min. 6 characters" required minLength="6"
                          value={formData.password} onChange={handleChange} autoComplete="new-password"/>
                        <button type="button" className="rg-eye-btn" onClick={() => setShowPass(!showPass)} tabIndex={-1}>
                          {showPass
                            ? <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94"/><path d="M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19"/><line x1="1" y1="1" x2="23" y2="23"/></svg>
                            : <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>
                          }
                        </button>
                      </div>
                      <p className="rg-hint">At least 6 characters</p>
                    </div>
                  </div>

                  <div className={`rg-reveal ${mounted ? 'show' : ''}`} style={{ transitionDelay:'0.34s' }}>
                    <button type="submit" className="rg-next-btn">
                      Continue →
                    </button>
                  </div>

                  <div className={`rg-reveal ${mounted ? 'show' : ''}`} style={{ transitionDelay:'0.4s' }}>
                    <p className="rg-login-txt">
                      Already have an account? <a href="/login">Sign in</a>
                    </p>
                  </div>
                </form>
              )}

              {/* STEP 2 — Profile */}
              {step === 2 && (
                <form onSubmit={handleSubmit} className="step-slide-enter">
                  <p className="rg-eyebrow">Step 2 of 2</p>
                  <h2 className="rg-title">Your profile</h2>
                  <p className="rg-title-sub">Help employers find the right you.</p>

                  {error && (
                    <div className="rg-error">
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#ff5e5e" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink:0, marginTop:1 }}>
                        <circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/>
                      </svg>
                      <p>{error}</p>
                    </div>
                  )}

                  {/* First + Last name row */}
                  <div className="rg-row" style={{ marginBottom: 14 }}>
                    <div className="rg-field" style={{ marginBottom: 0 }}>
                      <label className="rg-label">First Name</label>
                      <div className="rg-input-wrap">
                        <svg className="rg-input-icon" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/>
                        </svg>
                        <input type="text" name="firstName" className="rg-input" placeholder="Jane"
                          required minLength="2" maxLength="30"
                          value={formData.firstName} onChange={handleChange}/>
                      </div>
                    </div>
                    <div className="rg-field" style={{ marginBottom: 0 }}>
                      <label className="rg-label">Last Name</label>
                      <div className="rg-input-wrap">
                        <svg className="rg-input-icon" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/>
                        </svg>
                        <input type="text" name="lastName" className="rg-input" placeholder="Doe"
                          required minLength="2" maxLength="30"
                          value={formData.lastName} onChange={handleChange}/>
                      </div>
                    </div>
                  </div>

                  <div className="rg-field">
                    <label className="rg-label">Skills</label>
                    <div className="rg-input-wrap">
                      <svg className="rg-input-icon" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
                      </svg>
                      <input type="text" name="skills" className="rg-input" placeholder="React, Node.js, Python…"
                        required value={formData.skills} onChange={handleChange}/>
                    </div>
                    <p className="rg-hint">Separate with commas</p>
                  </div>

                  <div className="rg-field">
                    <label className="rg-label">Contact Number</label>
                    <div className="rg-input-wrap">
                      <svg className="rg-input-icon" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 13a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.6 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/>
                      </svg>
                      <input type="tel" name="contactNumber" className="rg-input" placeholder="10-digit number"
                        required pattern="[0-9]{10}"
                        value={formData.contactNumber} onChange={handleChange}/>
                    </div>
                    <p className="rg-hint">10 digits, no spaces</p>
                  </div>

                  <div className="rg-btn-row">
                    <button type="button" className="rg-back-btn" onClick={() => setStep(1)}>
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <line x1="19" y1="12" x2="5" y2="12"/><polyline points="12 19 5 12 12 5"/>
                      </svg>
                      Back
                    </button>
                    <button type="submit" className="rg-submit-btn" disabled={isLoading}>
                      {isLoading ? <><span className="rg-spinner"/>Creating…</> : "Create Account →"}
                    </button>
                  </div>

                  <p className="rg-login-txt" style={{ marginTop: 18 }}>
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

export default Eereg;