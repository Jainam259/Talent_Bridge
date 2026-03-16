import React, { useState, useEffect } from "react";
import axios from "axios";
import Footer from "./Footer";
import { useNavigate, Link } from "react-router-dom";

const EMPLOYMENT_TYPES = [
  { value: "full-time",  label: "Full Time",  icon: "💼", desc: "Standard full-time role"       },
  { value: "part-time",  label: "Part Time",  icon: "⏰", desc: "Flexible part-time hours"      },
  { value: "contract",   label: "Contract",   icon: "📋", desc: "Fixed-term contract position"  },
  { value: "internship", label: "Internship", icon: "🎓", desc: "Internship / training role"    },
];

const JobPost = () => {
  const navigate = useNavigate();
  const user     = JSON.parse(localStorage.getItem("user"));

  const [formData, setFormData] = useState({
    job_title:        "",
    job_description:  "",
    job_location:     "",
    salary_range:     "",
    employment_type:  "",
    username:         user?.username || "",
  });

  const [focused,  setFocused]  = useState(null);
  const [status,   setStatus]   = useState(null); // null | "loading" | "success" | "error"
  const [errMsg,   setErrMsg]   = useState("");
  const [mounted,  setMounted]  = useState(false);
  const [charCount, setCharCount] = useState(0);

  useEffect(() => {
    const t = setTimeout(() => setMounted(true), 80);
    return () => clearTimeout(t);
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(p => ({ ...p, [name]: value }));
    if (name === "job_description") setCharCount(value.length);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("loading");
    setErrMsg("");
    try {
      await axios.post(
        "http://127.0.0.1:8000/jobs/api/jobs/create/",
        formData,
        { headers: { "Content-Type": "multipart/form-data" } }
      );
      setStatus("success");
      setTimeout(() => navigate("/applied"), 1800);
    } catch (error) {
      setStatus("error");
      setErrMsg(
        error?.response?.data
          ? Object.values(error.response.data).flat().join(" ")
          : "Something went wrong. Please try again."
      );
    }
  };

  const isComplete = formData.job_title && formData.job_description &&
    formData.job_location && formData.salary_range && formData.employment_type;

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

        .jp-root {
          background: var(--navy);
          font-family: 'Geist', sans-serif;
          color: var(--white);
          min-height: 100vh;
        }

        /* ── PAGE LAYOUT ── */
        .jp-page {
          position: relative;
          min-height: 100vh;
          overflow: hidden;
        }

        .jp-page::before {
          content: '';
          position: absolute; inset: 0;
          background:
            radial-gradient(ellipse 55% 50% at 50% 0%, rgba(15,212,192,0.07) 0%, transparent 60%),
            radial-gradient(ellipse 40% 40% at 90% 85%, rgba(245,166,35,0.04) 0%, transparent 60%);
          pointer-events: none; z-index: 0;
        }

        .jp-page::after {
          content: '';
          position: absolute; inset: 0;
          background-image: radial-gradient(rgba(240,244,255,0.04) 1px, transparent 1px);
          background-size: 36px 36px;
          pointer-events: none; z-index: 0;
          mask-image: radial-gradient(ellipse 80% 80% at 50% 30%, black 20%, transparent 100%);
        }

        .jp-inner {
          position: relative; z-index: 1;
          max-width: 1100px; margin: 0 auto;
          padding: 100px 48px 80px;
          display: grid;
          grid-template-columns: 1fr 480px;
          gap: 56px;
          align-items: start;
        }

        /* ── LEFT INFO PANEL ── */
        .jp-info {
          padding-top: 8px;
          opacity: 0;
          animation: jpFade .65s cubic-bezier(.22,1,.36,1) .1s forwards;
        }

        @keyframes jpFade {
          from { opacity:0; transform:translateY(18px); }
          to   { opacity:1; transform:translateY(0); }
        }

        .jp-badge {
          display: inline-flex; align-items: center; gap: 7px;
          padding: 5px 14px 5px 9px;
          background: rgba(15,212,192,0.07);
          border: 1px solid rgba(15,212,192,0.18);
          border-radius: 100px;
          font-size: 12px; font-weight: 500; color: var(--teal);
          margin-bottom: 24px;
        }

        .jp-badge-dot {
          width: 6px; height: 6px; border-radius: 50%;
          background: var(--teal); box-shadow: 0 0 6px var(--teal);
          animation: bdPulse 2s ease-in-out infinite;
        }

        @keyframes bdPulse { 0%,100%{opacity:1;transform:scale(1)} 50%{opacity:.4;transform:scale(.7)} }

        .jp-info-title {
          font-family: 'Cabinet Grotesk', sans-serif;
          font-size: clamp(30px, 3.5vw, 44px);
          font-weight: 800; color: var(--white);
          letter-spacing: -1.2px; line-height: 1.1;
          margin-bottom: 16px;
        }

        .jp-info-title em {
          font-family: 'Instrument Serif', serif;
          font-style: italic; font-weight: 400;
          color: var(--teal); letter-spacing: -1.2px;
        }

        .jp-info-sub {
          font-size: 15px; line-height: 1.7;
          color: var(--white-soft); font-weight: 300;
          margin-bottom: 40px; max-width: 400px;
        }

        /* Tips cards */
        .jp-tips { display: flex; flex-direction: column; gap: 12px; }

        .jp-tip {
          display: flex; align-items: flex-start; gap: 14px;
          padding: 18px 20px;
          background: var(--navy-card);
          border: 1px solid var(--border);
          border-radius: 14px;
          transition: border-color .2s, transform .2s;
        }

        .jp-tip:hover {
          border-color: rgba(15,212,192,0.18);
          transform: translateX(3px);
        }

        .jp-tip-icon {
          width: 36px; height: 36px; border-radius: 9px;
          background: var(--teal-dim);
          border: 1px solid rgba(15,212,192,0.15);
          display: flex; align-items: center; justify-content: center;
          color: var(--teal); flex-shrink: 0;
        }

        .jp-tip-title {
          font-size: 13.5px; font-weight: 600;
          color: var(--white); margin-bottom: 3px;
        }

        .jp-tip-desc {
          font-size: 12.5px; color: var(--white-soft);
          font-weight: 300; line-height: 1.5;
        }

        /* ── FORM CARD ── */
        .jp-form-card {
          background: var(--navy-card);
          border: 1px solid var(--border);
          border-radius: 22px; overflow: hidden;
          opacity: 0;
          animation: jpFade .65s cubic-bezier(.22,1,.36,1) .22s forwards;
        }

        .jp-form-top {
          height: 2px;
          background: linear-gradient(90deg, var(--teal), rgba(15,212,192,0.1));
        }

        .jp-form-body { padding: 36px 36px 32px; }

        .jp-form-eyebrow {
          font-size: 11px; font-weight: 600;
          letter-spacing: 2px; text-transform: uppercase;
          color: var(--teal); margin-bottom: 8px;
          display: flex; align-items: center; gap: 8px;
        }

        .jp-form-eyebrow::before {
          content: '';
          width: 16px; height: 2px;
          background: var(--teal); border-radius: 2px;
        }

        .jp-form-title {
          font-family: 'Cabinet Grotesk', sans-serif;
          font-size: 22px; font-weight: 800;
          color: var(--white); letter-spacing: -0.5px;
          margin-bottom: 5px;
        }

        .jp-form-sub {
          font-size: 13px; color: var(--white-soft);
          font-weight: 300; margin-bottom: 28px;
        }

        /* Progress bar */
        .jp-progress-wrap {
          margin-bottom: 28px;
        }

        .jp-progress-label {
          display: flex; justify-content: space-between;
          font-size: 11.5px; color: var(--white-soft);
          margin-bottom: 7px;
        }

        .jp-progress-label span:last-child { color: var(--teal); font-weight: 500; }

        .jp-progress-track {
          height: 4px; background: var(--white-dim);
          border-radius: 4px; overflow: hidden;
        }

        .jp-progress-fill {
          height: 100%; border-radius: 4px;
          background: linear-gradient(90deg, var(--teal), #0b9e8e);
          transition: width .4s ease;
          box-shadow: 0 0 8px rgba(15,212,192,0.4);
        }

        /* Field */
        .jp-field { margin-bottom: 16px; }

        .jp-label {
          display: block;
          font-size: 11px; font-weight: 600;
          letter-spacing: 0.9px; text-transform: uppercase;
          color: var(--white-soft); margin-bottom: 7px;
          transition: color .2s;
        }

        .jp-field.focused .jp-label { color: var(--teal); }

        .jp-input-wrap { position: relative; display: flex; align-items: center; }

        .jp-input-icon {
          position: absolute; left: 14px;
          color: rgba(154,170,191,0.3); pointer-events: none;
          transition: color .2s;
        }

        .jp-input-icon.top { top: 14px; align-self: flex-start; }

        .jp-field.focused .jp-input-icon { color: var(--teal); }

        .jp-input {
          width: 100%;
          padding: 13px 14px 13px 42px;
          background: rgba(240,244,255,0.04);
          border: 1.5px solid var(--border);
          border-radius: 11px;
          font-family: 'Geist', sans-serif;
          font-size: 14px; color: var(--white);
          outline: none;
          transition: border-color .2s, background .2s, box-shadow .2s;
          -webkit-appearance: none;
        }

        .jp-input::placeholder { color: rgba(154,170,191,0.28); }

        .jp-input:focus {
          border-color: var(--teal);
          background: rgba(15,212,192,0.04);
          box-shadow: 0 0 0 3px rgba(15,212,192,0.1);
        }

        textarea.jp-input {
          resize: vertical; min-height: 110px;
          padding-top: 13px; line-height: 1.55;
        }

        .jp-char-count {
          font-size: 11px; color: var(--white-soft);
          text-align: right; margin-top: 5px;
        }

        .jp-row {
          display: grid; grid-template-columns: 1fr 1fr;
          gap: 14px; margin-bottom: 0;
        }

        /* Employment type cards */
        .jp-type-label {
          font-size: 11px; font-weight: 600;
          letter-spacing: 0.9px; text-transform: uppercase;
          color: var(--white-soft); margin-bottom: 10px; display: block;
        }

        .jp-type-grid {
          display: grid; grid-template-columns: 1fr 1fr;
          gap: 10px; margin-bottom: 16px;
        }

        .jp-type-card {
          padding: 14px 14px;
          background: rgba(240,244,255,0.03);
          border: 1.5px solid var(--border);
          border-radius: 12px;
          cursor: pointer;
          display: flex; align-items: center; gap: 11px;
          transition: border-color .18s, background .18s;
          user-select: none;
        }

        .jp-type-card:hover {
          border-color: rgba(240,244,255,0.18);
          background: rgba(240,244,255,0.04);
        }

        .jp-type-card.selected {
          border-color: var(--teal);
          background: var(--teal-dim);
          box-shadow: 0 0 0 3px rgba(15,212,192,0.1);
        }

        .jp-type-emoji { font-size: 18px; flex-shrink: 0; line-height: 1; }

        .jp-type-name {
          font-size: 13.5px; font-weight: 600;
          color: var(--white); margin-bottom: 1px;
        }

        .jp-type-desc {
          font-size: 11px; color: var(--white-soft); font-weight: 300;
        }

        .jp-type-check {
          margin-left: auto; flex-shrink: 0;
          width: 18px; height: 18px; border-radius: 50%;
          background: var(--teal);
          display: flex; align-items: center; justify-content: center;
          color: var(--navy);
          opacity: 0; transform: scale(.5);
          transition: opacity .2s, transform .2s;
        }

        .jp-type-card.selected .jp-type-check {
          opacity: 1; transform: scale(1);
        }

        /* Status messages */
        .jp-status-box {
          padding: 13px 16px; border-radius: 11px;
          font-size: 13.5px; font-weight: 500;
          margin-bottom: 16px;
          display: flex; align-items: center; gap: 10px;
          animation: statusIn .35s ease both;
        }

        @keyframes statusIn { from{opacity:0;transform:translateY(6px)} to{opacity:1;transform:translateY(0)} }

        .jp-status-box.success {
          background: var(--teal-dim);
          border: 1px solid rgba(15,212,192,0.25);
          color: var(--teal);
        }

        .jp-status-box.error {
          background: rgba(255,94,94,0.07);
          border: 1px solid rgba(255,94,94,0.2);
          color: #ff8f8f;
        }

        /* Submit */
        .jp-submit {
          width: 100%; padding: 15px;
          background: var(--teal); color: var(--navy);
          font-family: 'Cabinet Grotesk', sans-serif;
          font-size: 15px; font-weight: 800;
          border: none; border-radius: 12px; cursor: pointer;
          position: relative; overflow: hidden;
          box-shadow: 0 6px 24px rgba(15,212,192,0.28);
          transition: transform .15s, box-shadow .2s, opacity .15s;
          display: flex; align-items: center; justify-content: center; gap: 8px;
          margin-top: 4px;
        }

        .jp-submit::after {
          content: '';
          position: absolute; top:0; left:-100%;
          width:50%; height:100%;
          background: linear-gradient(90deg,transparent,rgba(255,255,255,0.22),transparent);
          transform: skewX(-15deg);
        }

        .jp-submit:hover:not(:disabled)::after { animation: shine .55s ease forwards; }
        @keyframes shine { from{left:-60%} to{left:160%} }

        .jp-submit:hover:not(:disabled) {
          transform: translateY(-1px);
          box-shadow: 0 10px 32px rgba(15,212,192,0.38);
        }

        .jp-submit:disabled { opacity:.45; cursor:not-allowed; }

        .jp-spinner {
          width: 16px; height: 16px;
          border: 2.5px solid rgba(11,17,32,.25);
          border-top-color: var(--navy);
          border-radius: 50%;
          animation: spin .65s linear infinite;
        }

        @keyframes spin { to { transform: rotate(360deg); } }

        .jp-back {
          display: inline-flex; align-items: center; gap: 6px;
          font-size: 13px; color: var(--white-soft);
          text-decoration: none; margin-bottom: 20px;
          transition: color .15s;
        }

        .jp-back:hover { color: var(--teal); }

        /* RESPONSIVE */
        @media (max-width: 960px) {
          .jp-inner { grid-template-columns: 1fr; gap: 32px; padding: 80px 24px 64px; }
          .jp-info { order: 2; padding-top: 0; }
          .jp-form-card { order: 1; }
          .jp-form-body { padding: 28px 24px; }
        }

        @media (max-width: 560px) {
          .jp-row { grid-template-columns: 1fr; }
          .jp-type-grid { grid-template-columns: 1fr 1fr; }
        }
      `}</style>

      <div className="jp-root">
        <div className="jp-page">
          <div className="jp-inner">

            {/* ── LEFT INFO ── */}
            <div className="jp-info">
              <div className="jp-badge">
                <span className="jp-badge-dot" />
                Employer Tools
              </div>
              <h1 className="jp-info-title">
                Post a role,<br />find the <em>right</em><br />person.
              </h1>
              <p className="jp-info-sub">
                Reach 2.1 million verified professionals. Your listing goes live instantly — and starts matching candidates automatically.
              </p>

              <div className="jp-tips">
                {[
                  {
                    icon: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>,
                    title: "Smart Matching",
                    desc:  "We match your listing to candidates whose skills and experience genuinely fit.",
                  },
                  {
                    icon: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>,
                    title: "Instant Publishing",
                    desc:  "Jobs go live the moment you submit — no waiting for approval.",
                  },
                  {
                    icon: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>,
                    title: "Manage Applicants",
                    desc:  "Track, review, and update applicant statuses from your dashboard.",
                  },
                ].map((t, i) => (
                  <div className="jp-tip" key={i}>
                    <div className="jp-tip-icon">{t.icon}</div>
                    <div>
                      <div className="jp-tip-title">{t.title}</div>
                      <div className="jp-tip-desc">{t.desc}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* ── FORM ── */}
            <div>
              <Link to="/applied" className="jp-back">
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="19" y1="12" x2="5" y2="12"/><polyline points="12 19 5 12 12 5"/>
                </svg>
                Back to Dashboard
              </Link>

              <div className="jp-form-card">
                <div className="jp-form-top" />
                <div className="jp-form-body">
                  <p className="jp-form-eyebrow">New Listing</p>
                  <h2 className="jp-form-title">Job Details</h2>
                  <p className="jp-form-sub">Fill in the details below to publish your role.</p>

                  {/* Progress */}
                  {(() => {
                    const fields = [formData.job_title, formData.job_description, formData.job_location, formData.salary_range, formData.employment_type];
                    const filled = fields.filter(Boolean).length;
                    const pct    = Math.round((filled / fields.length) * 100);
                    return (
                      <div className="jp-progress-wrap">
                        <div className="jp-progress-label">
                          <span>Form completion</span>
                          <span>{pct}%</span>
                        </div>
                        <div className="jp-progress-track">
                          <div className="jp-progress-fill" style={{ width: `${pct}%` }} />
                        </div>
                      </div>
                    );
                  })()}

                  {/* Status messages */}
                  {status === "success" && (
                    <div className="jp-status-box success">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="20 6 9 17 4 12"/>
                      </svg>
                      Job posted successfully! Redirecting…
                    </div>
                  )}

                  {status === "error" && (
                    <div className="jp-status-box error">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/>
                      </svg>
                      {errMsg || "Something went wrong. Please try again."}
                    </div>
                  )}

                  <form onSubmit={handleSubmit}>
                    {/* Job title */}
                    <div className={`jp-field${focused === "job_title" ? " focused" : ""}`}>
                      <label className="jp-label">Job Title</label>
                      <div className="jp-input-wrap">
                        <svg className="jp-input-icon" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                          <rect x="2" y="7" width="20" height="14" rx="2"/><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/>
                        </svg>
                        <input
                          type="text" name="job_title" className="jp-input"
                          placeholder="e.g. Senior React Developer"
                          required value={formData.job_title}
                          onChange={handleChange}
                          onFocus={() => setFocused("job_title")}
                          onBlur={() => setFocused(null)}
                        />
                      </div>
                    </div>

                    {/* Description */}
                    <div className={`jp-field${focused === "job_description" ? " focused" : ""}`}>
                      <label className="jp-label">Job Description</label>
                      <div className="jp-input-wrap">
                        <svg className="jp-input-icon top" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                          <line x1="17" y1="10" x2="3" y2="10"/><line x1="21" y1="6" x2="3" y2="6"/><line x1="21" y1="14" x2="3" y2="14"/><line x1="17" y1="18" x2="3" y2="18"/>
                        </svg>
                        <textarea
                          name="job_description" className="jp-input"
                          placeholder="Describe the role, responsibilities, and what makes it great…"
                          required value={formData.job_description}
                          onChange={handleChange}
                          onFocus={() => setFocused("job_description")}
                          onBlur={() => setFocused(null)}
                        />
                      </div>
                      <div className="jp-char-count">{charCount} characters</div>
                    </div>

                    {/* Location + Salary row */}
                    <div className="jp-row">
                      <div className={`jp-field${focused === "job_location" ? " focused" : ""}`}>
                        <label className="jp-label">Location</label>
                        <div className="jp-input-wrap">
                          <svg className="jp-input-icon" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/>
                          </svg>
                          <input
                            type="text" name="job_location" className="jp-input"
                            placeholder="e.g. Bengaluru, India"
                            required value={formData.job_location}
                            onChange={handleChange}
                            onFocus={() => setFocused("job_location")}
                            onBlur={() => setFocused(null)}
                          />
                        </div>
                      </div>

                      <div className={`jp-field${focused === "salary_range" ? " focused" : ""}`}>
                        <label className="jp-label">Salary Range</label>
                        <div className="jp-input-wrap">
                          <svg className="jp-input-icon" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                            <line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/>
                          </svg>
                          <input
                            type="text" name="salary_range" className="jp-input"
                            placeholder="e.g. 80000–90000"
                            required value={formData.salary_range}
                            onChange={handleChange}
                            onFocus={() => setFocused("salary_range")}
                            onBlur={() => setFocused(null)}
                          />
                        </div>
                      </div>
                    </div>

                    {/* Employment type */}
                    <span className="jp-type-label">Employment Type</span>
                    <div className="jp-type-grid">
                      {EMPLOYMENT_TYPES.map(t => (
                        <div
                          key={t.value}
                          className={`jp-type-card${formData.employment_type === t.value ? " selected" : ""}`}
                          onClick={() => setFormData(p => ({ ...p, employment_type: t.value }))}
                        >
                          <span className="jp-type-emoji">{t.icon}</span>
                          <div>
                            <div className="jp-type-name">{t.label}</div>
                            <div className="jp-type-desc">{t.desc}</div>
                          </div>
                          <div className="jp-type-check">
                            <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                              <polyline points="20 6 9 17 4 12"/>
                            </svg>
                          </div>
                        </div>
                      ))}
                    </div>

                    <button
                      type="submit"
                      className="jp-submit"
                      disabled={!isComplete || status === "loading" || status === "success"}
                    >
                      {status === "loading" ? (
                        <><span className="jp-spinner" /> Publishing…</>
                      ) : status === "success" ? (
                        <>
                          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                            <polyline points="20 6 9 17 4 12"/>
                          </svg>
                          Published!
                        </>
                      ) : (
                        <>
                          Publish Job
                          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                            <line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/>
                          </svg>
                        </>
                      )}
                    </button>
                  </form>
                </div>
              </div>
            </div>

          </div>
        </div>
        <Footer />
      </div>
    </>
  );
};

export default JobPost;