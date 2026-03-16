import React, { useState, useEffect } from "react";
import axios from "axios";
import Footer from "./Footer";
import { useNavigate } from "react-router-dom";

const Login = ({ onUserUpdate }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showPass, setShowPass] = useState(false);
  const [mounted, setMounted] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    const t = setTimeout(() => setMounted(true), 80);
    return () => clearTimeout(t);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setErrorMessage("");
    try {
      const response = await axios.post("http://127.0.0.1:8000/users/api/login/", {
        username,
        password,
      });
      localStorage.setItem("access", response.data.access);
      localStorage.setItem("refresh", response.data.refresh);
      localStorage.setItem("user", JSON.stringify(response.data.user));
      onUserUpdate(response.data.user);
      navigate("/");
    } catch (error) {
      setErrorMessage(error.response?.data?.error || "Invalid credentials. Please try again.");
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
          --navy:      #0b1120;
          --navy-mid:  #111827;
          --navy-soft: #1e2d45;
          --teal:      #0fd4c0;
          --teal-dim:  rgba(15,212,192,0.12);
          --teal-glow: rgba(15,212,192,0.25);
          --amber:     #f5a623;
          --white:     #f0f4ff;
          --white-soft:#9aaabf;
          --white-dim: rgba(240,244,255,0.06);
          --border:    rgba(240,244,255,0.08);
          --error:     #ff5e5e;
        }

        /* ─── FULL PAGE ─── */
        .tb-page {
          min-height: 100vh;
          background: var(--navy);
          font-family: 'Geist', 'DM Sans', sans-serif;
          color: var(--white);
          display: flex;
          flex-direction: column;
          overflow-x: hidden;
        }

        /* ─── NAV ─── */
        .tb-nav {
          position: fixed;
          top: 0; left: 0; right: 0;
          z-index: 100;
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 0 48px;
          height: 64px;
          background: rgba(11,17,32,0.8);
          backdrop-filter: blur(16px);
          border-bottom: 1px solid var(--border);
        }

        .tb-logo {
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

        .tb-logo-dot {
          width: 8px; height: 8px;
          border-radius: 50%;
          background: var(--teal);
          box-shadow: 0 0 10px var(--teal);
        }

        .tb-nav-links {
          display: flex;
          align-items: center;
          gap: 4px;
          list-style: none;
        }

        .tb-nav-links a {
          padding: 7px 14px;
          border-radius: 8px;
          font-size: 13.5px;
          font-weight: 400;
          color: var(--white-soft);
          text-decoration: none;
          transition: color .18s, background .18s;
        }

        .tb-nav-links a:hover {
          color: var(--white);
          background: var(--white-dim);
        }

        .tb-nav-actions {
          display: flex;
          align-items: center;
          gap: 10px;
        }

        .tb-btn-ghost {
          padding: 8px 18px;
          border: 1px solid var(--border);
          border-radius: 9px;
          background: transparent;
          color: var(--white-soft);
          font-family: 'Geist', sans-serif;
          font-size: 13.5px;
          font-weight: 500;
          cursor: pointer;
          transition: border-color .18s, color .18s;
          text-decoration: none;
          display: inline-flex;
          align-items: center;
        }

        .tb-btn-ghost:hover {
          border-color: rgba(240,244,255,0.2);
          color: var(--white);
        }

        .tb-btn-primary {
          padding: 8px 20px;
          border-radius: 9px;
          background: var(--teal);
          color: var(--navy);
          font-family: 'Cabinet Grotesk', sans-serif;
          font-size: 13.5px;
          font-weight: 700;
          cursor: pointer;
          border: none;
          transition: opacity .18s, transform .15s, box-shadow .18s;
          text-decoration: none;
          display: inline-flex;
          align-items: center;
          box-shadow: 0 4px 16px rgba(15,212,192,0.25);
        }

        .tb-btn-primary:hover {
          opacity: 0.9;
          transform: translateY(-1px);
          box-shadow: 0 8px 24px rgba(15,212,192,0.35);
        }

        /* ─── MAIN CONTENT ─── */
        .tb-main {
          flex: 1;
          display: grid;
          grid-template-columns: 1fr 480px;
          min-height: 100vh;
          padding-top: 64px;
        }

        /* ─── LEFT HERO ─── */
        .tb-hero {
          position: relative;
          display: flex;
          flex-direction: column;
          justify-content: center;
          padding: 80px 72px 80px 80px;
          overflow: hidden;
        }

        /* Mesh background */
        .tb-hero::before {
          content: '';
          position: absolute;
          inset: 0;
          background:
            radial-gradient(ellipse 60% 50% at 20% 60%, rgba(15,212,192,0.07) 0%, transparent 70%),
            radial-gradient(ellipse 50% 40% at 70% 20%, rgba(245,166,35,0.05) 0%, transparent 70%);
          pointer-events: none;
        }

        /* Subtle dot grid */
        .tb-hero::after {
          content: '';
          position: absolute;
          inset: 0;
          background-image: radial-gradient(rgba(240,244,255,0.06) 1px, transparent 1px);
          background-size: 32px 32px;
          pointer-events: none;
          mask-image: radial-gradient(ellipse 70% 70% at 50% 50%, black 40%, transparent 100%);
        }

        .tb-hero-inner { position: relative; z-index: 1; max-width: 560px; }

        /* Pill badge */
        .tb-pill {
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
          animation: pillIn .6s cubic-bezier(.22,1,.36,1) both;
        }

        .tb-pill-icon {
          width: 20px; height: 20px;
          border-radius: 50%;
          background: var(--teal);
          display: flex; align-items: center; justify-content: center;
        }

        @keyframes pillIn {
          from { opacity: 0; transform: translateY(10px); }
          to   { opacity: 1; transform: translateY(0); }
        }

        .tb-h1 {
          font-family: 'Cabinet Grotesk', sans-serif;
          font-size: clamp(36px, 4vw, 56px);
          font-weight: 800;
          color: var(--white);
          line-height: 1.1;
          letter-spacing: -1.5px;
          margin-bottom: 6px;
          animation: heroIn .7s cubic-bezier(.22,1,.36,1) .1s both;
        }

        .tb-h1 span {
          font-family: 'Instrument Serif', Georgia, serif;
          font-style: italic;
          font-weight: 400;
          color: var(--teal);
          letter-spacing: -1px;
        }

        @keyframes heroIn {
          from { opacity: 0; transform: translateY(20px); }
          to   { opacity: 1; transform: translateY(0); }
        }

        .tb-h1sub {
          font-size: 16px;
          line-height: 1.65;
          color: var(--white-soft);
          font-weight: 300;
          max-width: 440px;
          margin-bottom: 52px;
          animation: heroIn .7s cubic-bezier(.22,1,.36,1) .2s both;
        }

        /* Floating job cards */
        .tb-cards {
          display: flex;
          flex-direction: column;
          gap: 12px;
          animation: heroIn .7s cubic-bezier(.22,1,.36,1) .3s both;
        }

        .tb-job-card {
          display: flex;
          align-items: center;
          gap: 16px;
          padding: 16px 20px;
          background: rgba(240,244,255,0.04);
          border: 1px solid var(--border);
          border-radius: 14px;
          backdrop-filter: blur(8px);
          transition: border-color .2s, background .2s, transform .2s;
          cursor: default;
        }

        .tb-job-card:hover {
          border-color: rgba(15,212,192,0.25);
          background: rgba(15,212,192,0.04);
          transform: translateX(4px);
        }

        .tb-job-logo {
          width: 42px; height: 42px;
          border-radius: 10px;
          display: flex; align-items: center; justify-content: center;
          font-size: 18px;
          flex-shrink: 0;
        }

        .tb-job-info { flex: 1; min-width: 0; }

        .tb-job-title {
          font-size: 14px;
          font-weight: 600;
          color: var(--white);
          margin-bottom: 3px;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }

        .tb-job-meta {
          font-size: 12px;
          color: var(--white-soft);
        }

        .tb-job-badge {
          padding: 4px 10px;
          border-radius: 6px;
          font-size: 11px;
          font-weight: 600;
          background: rgba(15,212,192,0.1);
          color: var(--teal);
          white-space: nowrap;
        }

        .tb-job-badge.amber {
          background: rgba(245,166,35,0.1);
          color: var(--amber);
        }

        /* Stat strip */
        .tb-stats {
          display: flex;
          gap: 40px;
          margin-top: 40px;
          padding-top: 32px;
          border-top: 1px solid var(--border);
          animation: heroIn .7s cubic-bezier(.22,1,.36,1) .4s both;
        }

        .tb-stat-n {
          font-family: 'Cabinet Grotesk', sans-serif;
          font-size: 22px;
          font-weight: 800;
          color: var(--white);
          line-height: 1;
          margin-bottom: 4px;
        }

        .tb-stat-n span { color: var(--teal); }

        .tb-stat-l {
          font-size: 12px;
          color: var(--white-soft);
          font-weight: 300;
        }

        /* ─── RIGHT: FORM PANEL ─── */
        .tb-form-panel {
          background: var(--navy-mid);
          border-left: 1px solid var(--border);
          position: sticky;
          top: 0;
          height: 100vh;

          display: flex;
          align-items: flex-start;   /* move content to top */
          justify-content: center;   /* keep horizontally centered */

          padding: 120px 52px 48px 52px; /* top spacing under navbar */
          overflow-y: auto;
        }

        .tb-form-panel::before {
          content: '';
          position: absolute;
          bottom: -100px; right: -100px;
          width: 300px; height: 300px;
          border-radius: 50%;
          background: radial-gradient(circle, rgba(15,212,192,0.06), transparent 70%);
          pointer-events: none;
        }

        .tb-form-inner { position: relative; z-index: 1; }

        .tb-form-eyebrow {
          font-size: 11px;
          font-weight: 600;
          letter-spacing: 2px;
          text-transform: uppercase;
          color: var(--teal);
          margin-bottom: 10px;
        }

        .tb-form-title {
          font-family: 'Cabinet Grotesk', sans-serif;
          font-size: 30px;
          font-weight: 800;
          color: var(--white);
          letter-spacing: -0.8px;
          line-height: 1.15;
          margin-bottom: 6px;
        }

        .tb-form-sub {
          font-size: 14px;
          color: var(--white-soft);
          font-weight: 300;
          margin-bottom: 36px;
        }

        /* Social buttons */
        .tb-socials {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 10px;
          margin-bottom: 28px;
        }

        .tb-social-btn {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          padding: 11px 14px;
          background: var(--white-dim);
          border: 1px solid var(--border);
          border-radius: 10px;
          font-family: 'Geist', sans-serif;
          font-size: 13px;
          font-weight: 500;
          color: var(--white-soft);
          cursor: pointer;
          transition: background .18s, border-color .18s, color .18s, transform .15s;
        }

        .tb-social-btn:hover {
          background: rgba(240,244,255,0.09);
          border-color: rgba(240,244,255,0.15);
          color: var(--white);
          transform: translateY(-1px);
        }

        /* Divider */
        .tb-divider {
          display: flex;
          align-items: center;
          gap: 12px;
          margin-bottom: 26px;
        }

        .tb-div-line { flex: 1; height: 1px; background: var(--border); }

        .tb-div-txt {
          font-size: 11px;
          letter-spacing: 0.8px;
          text-transform: uppercase;
          color: rgba(154,170,191,0.5);
        }

        /* Field */
        .tb-field { margin-bottom: 18px; }

        .tb-label {
          display: flex;
          align-items: center;
          justify-content: space-between;
          font-size: 11.5px;
          font-weight: 600;
          letter-spacing: 0.8px;
          text-transform: uppercase;
          color: var(--white-soft);
          margin-bottom: 8px;
        }

        .tb-label a {
          text-transform: none;
          letter-spacing: 0;
          font-size: 12.5px;
          font-weight: 400;
          color: var(--teal);
          text-decoration: none;
          opacity: 0.8;
          transition: opacity .15s;
        }

        .tb-label a:hover { opacity: 1; }

        .tb-input-wrap { position: relative; display: flex; align-items: center; }

        .tb-input-icon {
          position: absolute;
          left: 15px;
          color: rgba(154,170,191,0.4);
          pointer-events: none;
          transition: color .2s;
        }

        .tb-input {
          width: 100%;
          padding: 13px 46px;
          background: rgba(240,244,255,0.04);
          border: 1.5px solid var(--border);
          border-radius: 11px;
          font-family: 'Geist', sans-serif;
          font-size: 14.5px;
          color: var(--white);
          outline: none;
          transition: border-color .2s, background .2s, box-shadow .2s;
          -webkit-appearance: none;
        }

        .tb-input::placeholder { color: rgba(154,170,191,0.3); }

        .tb-input:focus {
          border-color: var(--teal);
          background: rgba(15,212,192,0.04);
          box-shadow: 0 0 0 3px rgba(15,212,192,0.1);
        }

        .tb-input:focus ~ .tb-input-icon,
        .tb-input-wrap:focus-within .tb-input-icon { color: var(--teal); }

        .tb-eye-btn {
          position: absolute;
          right: 13px;
          background: none;
          border: none;
          cursor: pointer;
          color: rgba(154,170,191,0.4);
          display: flex;
          padding: 4px;
          transition: color .18s;
        }

        .tb-eye-btn:hover { color: var(--white-soft); }

        /* Error */
        .tb-error {
          display: flex;
          align-items: flex-start;
          gap: 10px;
          padding: 12px 16px;
          background: rgba(255,94,94,0.07);
          border: 1px solid rgba(255,94,94,0.2);
          border-left: 3px solid var(--error);
          border-radius: 10px;
          margin-bottom: 20px;
          animation: errIn .3s ease both;
        }

        @keyframes errIn {
          from { opacity: 0; transform: translateY(-6px); }
          to   { opacity: 1; transform: translateY(0); }
        }

        .tb-error p { font-size: 13px; color: #ffaaaa; line-height: 1.5; }

        /* Submit */
        .tb-submit {
          width: 100%;
          padding: 15px;
          margin-top: 6px;
          background: var(--teal);
          color: var(--navy);
          font-family: 'Cabinet Grotesk', sans-serif;
          font-size: 15px;
          font-weight: 800;
          letter-spacing: 0.2px;
          border: none;
          border-radius: 11px;
          cursor: pointer;
          position: relative;
          overflow: hidden;
          transition: transform .15s, box-shadow .2s, opacity .15s;
          box-shadow: 0 6px 24px rgba(15,212,192,0.3);
        }

        .tb-submit::after {
          content: '';
          position: absolute;
          top: 0; left: -100%;
          width: 50%;
          height: 100%;
          background: linear-gradient(90deg, transparent, rgba(255,255,255,0.25), transparent);
          transform: skewX(-15deg);
          transition: none;
        }

        .tb-submit:hover:not(:disabled)::after {
          animation: shine .55s ease forwards;
        }

        @keyframes shine {
          from { left: -60%; }
          to   { left: 160%; }
        }

        .tb-submit:hover:not(:disabled) {
          transform: translateY(-1px);
          box-shadow: 0 10px 32px rgba(15,212,192,0.4);
        }

        .tb-submit:active:not(:disabled) { transform: none; }
        .tb-submit:disabled { opacity: 0.5; cursor: not-allowed; }

        .tb-spinner {
          width: 16px; height: 16px;
          border: 2.5px solid rgba(11,17,32,0.3);
          border-top-color: var(--navy);
          border-radius: 50%;
          display: inline-block;
          animation: spin .65s linear infinite;
          vertical-align: middle;
          margin-right: 8px;
        }

        @keyframes spin { to { transform: rotate(360deg); } }

        .tb-signup-txt {
          text-align: center;
          font-size: 13.5px;
          color: var(--white-soft);
          margin-top: 24px;
        }

        .tb-signup-txt a {
          color: var(--teal);
          font-weight: 500;
          text-decoration: none;
          border-bottom: 1px solid rgba(15,212,192,0.3);
          padding-bottom: 1px;
          transition: border-color .15s;
        }

        .tb-signup-txt a:hover { border-color: var(--teal); }

        /* Stagger reveal */
        .tb-reveal {
          opacity: 0;
          transform: translateY(16px);
          transition: opacity .5s ease, transform .5s ease;
        }

        .tb-reveal.show {
          opacity: 1;
          transform: translateY(0);
        }

        /* Responsive */
        @media (max-width: 960px) {
          .tb-main { grid-template-columns: 1fr; }
          .tb-hero  { display: none; }
          .tb-form-panel { border-left: none; padding: 80px 28px 48px; }
          .tb-nav { padding: 0 24px; }
          .tb-nav-links { display: none; }
        }
      `}</style>

      <div className="tb-page">

        {/* ── MAIN ── */}
        <div className="tb-main">

          {/* LEFT HERO */}
          <div className="tb-hero">
            <div className="tb-hero-inner">
              <div className="tb-pill">
                <span className="tb-pill-icon">
                  <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                    <circle cx="5" cy="5" r="3" fill="#0b1120"/>
                  </svg>
                </span>
                12,400+ live jobs today
              </div>

              <h1 className="tb-h1">
                Find your<br />
                <span>next role</span><br />
                faster.
              </h1>

              <p className="tb-h1sub">
                TalentBridge connects ambitious professionals with companies that actually value what they bring. No noise — just the right fit.
              </p>

              <div className="tb-cards">
                {[
                  { emoji:"🏢", title:"Senior Product Designer", company:"Stripe · Remote", badge:"$140k–$170k", type:"" },
                  { emoji:"⚡", title:"Full Stack Engineer", company:"Vercel · San Francisco", badge:"New Today", type:"amber" },
                  { emoji:"🎯", title:"Growth Lead", company:"Linear · New York", badge:"$120k–$150k", type:"" },
                ].map((job, i) => (
                  <div className="tb-job-card" key={i}>
                    <div className="tb-job-logo" style={{ background: i===1 ? 'rgba(245,166,35,0.08)' : 'var(--teal-dim)' }}>
                      {job.emoji}
                    </div>
                    <div className="tb-job-info">
                      <div className="tb-job-title">{job.title}</div>
                      <div className="tb-job-meta">{job.company}</div>
                    </div>
                    <span className={`tb-job-badge ${job.type}`}>{job.badge}</span>
                  </div>
                ))}
              </div>

              <div className="tb-stats">
                <div>
                  <div className="tb-stat-n">48k<span>+</span></div>
                  <div className="tb-stat-l">Active Jobs</div>
                </div>
                <div>
                  <div className="tb-stat-n">2.1M<span>+</span></div>
                  <div className="tb-stat-l">Professionals</div>
                </div>
                <div>
                  <div className="tb-stat-n">98<span>%</span></div>
                  <div className="tb-stat-l">Satisfaction</div>
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT FORM */}
          <div className="tb-form-panel">
            <div className="tb-form-inner">

              <div className={`tb-reveal ${mounted ? 'show' : ''}`} style={{ transitionDelay:'0s' }}>
                <p className="tb-form-eyebrow">Welcome Back</p>
                <h2 className="tb-form-title">Sign in to<br />your account</h2>
                <p className="tb-form-sub">Your next opportunity is waiting.</p>
              </div>


              <div className={`tb-divider tb-reveal ${mounted ? 'show' : ''}`} style={{ transitionDelay:'0.18s' }}>
                <div className="tb-div-line" />
                <div className="tb-div-line" />
              </div>

              {errorMessage && (
                <div className="tb-error">
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#ff5e5e" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink:0, marginTop:1 }}>
                    <circle cx="12" cy="12" r="10"/>
                    <line x1="12" y1="8" x2="12" y2="12"/>
                    <line x1="12" y1="16" x2="12.01" y2="16"/>
                  </svg>
                  <p>{errorMessage}</p>
                </div>
              )}

              <form onSubmit={handleSubmit}>
                <div className={`tb-field tb-reveal ${mounted ? 'show' : ''}`} style={{ transitionDelay:'0.26s' }}>
                  <div className="tb-label">Username</div>
                  <div className="tb-input-wrap">
                    <svg className="tb-input-icon" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
                      <circle cx="12" cy="7" r="4"/>
                    </svg>
                    <input
                      type="text"
                      className="tb-input"
                      placeholder="Enter your username"
                      required
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      autoComplete="username"
                    />
                  </div>
                </div>

                <div className={`tb-field tb-reveal ${mounted ? 'show' : ''}`} style={{ transitionDelay:'0.34s' }}>
                  <div className="tb-label">
                    Password
                  </div>
                  <div className="tb-input-wrap">
                    <svg className="tb-input-icon" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                      <rect x="3" y="11" width="18" height="11" rx="2"/>
                      <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
                    </svg>
                    <input
                      type={showPass ? "text" : "password"}
                      className="tb-input"
                      placeholder="••••••••••"
                      required
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      autoComplete="current-password"
                    />
                    <button type="button" className="tb-eye-btn" onClick={() => setShowPass(!showPass)} tabIndex={-1}>
                      {showPass ? (
                        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94"/>
                          <path d="M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19"/>
                          <line x1="1" y1="1" x2="23" y2="23"/>
                        </svg>
                      ) : (
                        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
                          <circle cx="12" cy="12" r="3"/>
                        </svg>
                      )}
                    </button>
                  </div>
                </div>

                <div className={`tb-reveal ${mounted ? 'show' : ''}`} style={{ transitionDelay:'0.42s' }}>
                  <button type="submit" className="tb-submit" disabled={isLoading}>
                    {isLoading ? <><span className="tb-spinner" />Signing in…</> : "Sign In →"}
                  </button>
                </div>
              </form>

              <div className={`tb-reveal ${mounted ? 'show' : ''}`} style={{ transitionDelay:'0.5s' }}>
                <p className="tb-signup-txt">
                  New to TalentBridge? <a href="/register">Create a free account</a>
                </p>
              </div>

            </div>
          </div>
        </div>

        <Footer />
      </div>
    </>
  );
};

export default Login;