import React, { useState, useEffect } from "react";
import axios from "axios";
import Footer from "./Footer";
import { Link } from "react-router-dom";

/* ── Job type config ── */
const TYPE_CONFIG = {
  "full-time":  { label: "Full Time",  color: "teal"   },
  "part-time":  { label: "Part Time",  color: "amber"  },
  "internship": { label: "Internship", color: "purple" },
  "contract":   { label: "Contract",   color: "blue"   },
};

const getTypeConfig = (type = "") => {
  const key = type.toLowerCase().replace(" ", "-");
  return TYPE_CONFIG[key] || { label: type, color: "teal" };
};

/* ── Initials from title ── */
const getInitials = (title = "") =>
  title.split(" ").slice(0, 2).map(w => w[0]?.toUpperCase()).join("");

/* ── Company logo placeholder colors ── */
const LOGO_GRADIENTS = [
  "linear-gradient(135deg,#0fd4c0,#0b9e8e)",
  "linear-gradient(135deg,#f5a623,#c47d0a)",
  "linear-gradient(135deg,#818cf8,#4f46e5)",
  "linear-gradient(135deg,#f472b6,#db2777)",
  "linear-gradient(135deg,#34d399,#059669)",
  "linear-gradient(135deg,#60a5fa,#2563eb)",
];

/* ═══════════════════════════════
   JOB CARD
═══════════════════════════════ */
const JobCard = ({ id, title, type, location, description, company, index }) => {
  const cfg      = getTypeConfig(type);
  const initials = getInitials(title);
  const gradient = LOGO_GRADIENTS[index % LOGO_GRADIENTS.length];

  return (
    <Link
      to={`/job-details/${id}`}
      className="jl-card"
      style={{ animationDelay: `${index * 0.06}s` }}
    >
      {/* Top accent line */}
      <div className="jl-card-accent" />

      {/* Header */}
      <div className="jl-card-header">
        <div className="jl-card-logo" style={{ background: gradient }}>
          {initials}
        </div>
        <div className="jl-card-meta">
          <span className={`jl-type-badge jl-type-${cfg.color}`}>{cfg.label}</span>
        </div>
      </div>

      {/* Body */}
      <div className="jl-card-body">
        <h3 className="jl-card-title">{title}</h3>
        {company && <p className="jl-card-company">{company}</p>}

        <div className="jl-card-location">
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/>
          </svg>
          {location}
        </div>

        <p className="jl-card-desc">
          {(description || "").substring(0, 110)}{description?.length > 110 ? "…" : ""}
        </p>
      </div>

      {/* Footer */}
      <div className="jl-card-footer">
        <span className="jl-apply-btn">
          View & Apply
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/>
          </svg>
        </span>
      </div>
    </Link>
  );
};

/* ═══════════════════════════════
   MAIN PAGE
═══════════════════════════════ */
const JobListingee = () => {
  const [jobData, setJobData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search,  setSearch]  = useState("");
  const [filters, setFilters] = useState({ type: "", location: "" });
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setMounted(true), 80);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const res = await axios.get("http://127.0.0.1:8000/jobs/api/jobs/");
        setJobData(res.data);
      } catch (err) {
        console.error("Error fetching job data:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchJobs();
  }, []);

  const handleFilter = (key, val) =>
    setFilters(p => ({ ...p, [key]: val }));

  const filteredJobs = jobData.filter(job => {
    const matchSearch = search === "" ||
      (job.title || "").toLowerCase().includes(search.toLowerCase()) ||
      (job.description || "").toLowerCase().includes(search.toLowerCase());
    const matchType = filters.type === "" ||
      (job.type || "").toLowerCase().replace(" ", "-") === filters.type;
    const matchLoc = filters.location === "" ||
      job.location === filters.location;
    return matchSearch && matchType && matchLoc;
  });

  const uniqueLocations = [...new Set(jobData.map(j => j.location).filter(Boolean))];

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
          --purple:     #818cf8;
          --purple-dim: rgba(129,140,248,0.12);
          --blue:       #60a5fa;
          --blue-dim:   rgba(96,165,250,0.12);
          --white:      #f0f4ff;
          --white-soft: #9aaabf;
          --white-dim:  rgba(240,244,255,0.05);
          --border:     rgba(240,244,255,0.07);
        }

        .jl-root {
          background: var(--navy);
          font-family: 'Geist', sans-serif;
          color: var(--white);
          min-height: 100vh;
        }

        /* ── HERO ── */
        .jl-hero {
          position: relative;
          padding: 130px 48px 64px;
          text-align: center;
          overflow: hidden;
        }

        .jl-hero::before {
          content: '';
          position: absolute; inset: 0;
          background:
            radial-gradient(ellipse 65% 55% at 50% 0%, rgba(15,212,192,0.08) 0%, transparent 65%),
            radial-gradient(ellipse 40% 35% at 85% 85%, rgba(245,166,35,0.04) 0%, transparent 60%);
          pointer-events: none;
        }

        .jl-hero::after {
          content: '';
          position: absolute; inset: 0;
          background-image: radial-gradient(rgba(240,244,255,0.045) 1px, transparent 1px);
          background-size: 36px 36px;
          pointer-events: none;
          mask-image: radial-gradient(ellipse 75% 80% at 50% 50%, black 20%, transparent 100%);
        }

        .jl-hero-inner {
          position: relative; z-index: 1;
          max-width: 680px; margin: 0 auto;
          opacity: 0;
          animation: jlFadeUp .7s cubic-bezier(.22,1,.36,1) .08s forwards;
        }

        @keyframes jlFadeUp {
          from { opacity:0; transform:translateY(18px); }
          to   { opacity:1; transform:translateY(0); }
        }

        .jl-badge {
          display: inline-flex;
          align-items: center; gap: 8px;
          padding: 5px 14px 5px 9px;
          background: rgba(15,212,192,0.07);
          border: 1px solid rgba(15,212,192,0.18);
          border-radius: 100px;
          font-size: 12px; font-weight: 500;
          color: var(--teal);
          margin-bottom: 22px;
        }

        .jl-badge-dot {
          width: 6px; height: 6px; border-radius: 50%;
          background: var(--teal); box-shadow: 0 0 6px var(--teal);
          animation: badgePulse 2s ease-in-out infinite;
        }

        @keyframes badgePulse {
          0%,100% { opacity:1; transform:scale(1); }
          50%      { opacity:.4; transform:scale(.7); }
        }

        .jl-hero-h1 {
          font-family: 'Cabinet Grotesk', sans-serif;
          font-size: clamp(36px, 5vw, 60px);
          font-weight: 800;
          line-height: 1.07;
          letter-spacing: -2px;
          color: var(--white);
          margin-bottom: 14px;
        }

        .jl-hero-h1 em {
          font-family: 'Instrument Serif', serif;
          font-style: italic; font-weight: 400;
          color: var(--teal); letter-spacing: -2px;
        }

        .jl-hero-sub {
          font-size: 16px;
          line-height: 1.65;
          color: var(--white-soft);
          font-weight: 300;
          margin-bottom: 36px;
        }

        /* ── SEARCH BAR ── */
        .jl-search-wrap {
          max-width: 560px; margin: 0 auto;
        }

        .jl-search {
          display: flex; align-items: center;
          background: rgba(255,255,255,0.05);
          border: 1px solid rgba(240,244,255,0.1);
          border-radius: 14px;
          padding: 6px 6px 6px 18px;
          backdrop-filter: blur(10px);
          gap: 10px;
          transition: border-color .2s, box-shadow .2s;
        }

        .jl-search:focus-within {
          border-color: rgba(15,212,192,0.35);
          box-shadow: 0 0 0 3px rgba(15,212,192,0.1);
        }

        .jl-search svg { color: var(--white-soft); flex-shrink: 0; }

        .jl-search input {
          flex: 1; background: none; border: none; outline: none;
          font-family: 'Geist', sans-serif;
          font-size: 14.5px; color: var(--white);
          padding: 8px 0;
        }

        .jl-search input::placeholder { color: rgba(154,170,191,0.4); }

        .jl-search-btn {
          padding: 10px 20px;
          background: var(--teal); color: var(--navy);
          font-family: 'Cabinet Grotesk', sans-serif;
          font-size: 13.5px; font-weight: 700;
          border: none; border-radius: 10px; cursor: pointer;
          flex-shrink: 0;
          transition: opacity .15s, transform .15s;
        }

        .jl-search-btn:hover { opacity: .88; transform: translateY(-1px); }

        /* ── FILTERS + BODY ── */
        .jl-body {
          max-width: 1280px;
          margin: 0 auto;
          padding: 0 48px 80px;
          display: grid;
          grid-template-columns: 240px 1fr;
          gap: 36px;
          align-items: start;
        }

        /* ── SIDEBAR FILTERS ── */
        .jl-sidebar {
          position: sticky; top: 84px;
        }

        .jl-sidebar-card {
          background: var(--navy-card);
          border: 1px solid var(--border);
          border-radius: 16px;
          padding: 24px;
          margin-bottom: 16px;
        }

        .jl-sidebar-title {
          font-family: 'Cabinet Grotesk', sans-serif;
          font-size: 13px; font-weight: 700;
          color: var(--white);
          letter-spacing: 0.5px;
          margin-bottom: 16px;
          display: flex; align-items: center; gap: 8px;
        }

        .jl-sidebar-title::before {
          content: '';
          width: 14px; height: 2px;
          background: var(--teal); border-radius: 2px;
        }

        /* Filter group */
        .jl-filter-group { margin-bottom: 20px; }
        .jl-filter-group:last-child { margin-bottom: 0; }

        .jl-filter-label {
          font-size: 11px; font-weight: 600;
          letter-spacing: 1px; text-transform: uppercase;
          color: var(--white-soft); margin-bottom: 10px; display: block;
        }

        /* Radio-style type filters */
        .jl-type-options {
          display: flex; flex-direction: column; gap: 6px;
        }

        .jl-type-opt {
          display: flex; align-items: center; gap: 10px;
          padding: 9px 12px;
          border-radius: 9px;
          cursor: pointer;
          transition: background .15s;
          font-size: 13.5px; color: var(--white-soft);
          border: 1px solid transparent;
          user-select: none;
        }

        .jl-type-opt:hover { background: var(--white-dim); }

        .jl-type-opt.active {
          background: var(--teal-dim);
          border-color: rgba(15,212,192,0.2);
          color: var(--white);
        }

        .jl-type-radio {
          width: 14px; height: 14px;
          border-radius: 50%;
          border: 2px solid var(--border);
          flex-shrink: 0;
          transition: border-color .15s, background .15s;
          display: flex; align-items: center; justify-content: center;
        }

        .jl-type-opt.active .jl-type-radio {
          border-color: var(--teal);
          background: var(--teal);
        }

        .jl-type-radio-dot {
          width: 5px; height: 5px;
          border-radius: 50%; background: var(--navy);
          opacity: 0; transition: opacity .15s;
        }

        .jl-type-opt.active .jl-type-radio-dot { opacity: 1; }

        /* Location select */
        .jl-select {
          width: 100%;
          padding: 10px 14px;
          background: rgba(240,244,255,0.04);
          border: 1px solid var(--border);
          border-radius: 9px;
          font-family: 'Geist', sans-serif;
          font-size: 13.5px; color: var(--white);
          outline: none; cursor: pointer;
          transition: border-color .2s;
          -webkit-appearance: none;
        }

        .jl-select:focus { border-color: rgba(15,212,192,0.35); }

        .jl-select option { background: #1a2536; color: var(--white); }

        /* Clear btn */
        .jl-clear-btn {
          width: 100%; padding: 9px;
          background: transparent;
          border: 1px solid var(--border);
          border-radius: 9px;
          font-family: 'Geist', sans-serif;
          font-size: 13px; color: var(--white-soft);
          cursor: pointer; margin-top: 4px;
          transition: border-color .15s, color .15s;
        }

        .jl-clear-btn:hover {
          border-color: rgba(240,244,255,0.2); color: var(--white);
        }

        /* Results count */
        .jl-results-bar {
          display: flex; align-items: center;
          justify-content: space-between;
          margin-bottom: 20px;
          padding-bottom: 16px;
          border-bottom: 1px solid var(--border);
        }

        .jl-results-count {
          font-family: 'Cabinet Grotesk', sans-serif;
          font-size: 16px; font-weight: 700;
          color: var(--white);
        }

        .jl-results-count span { color: var(--teal); }

        .jl-results-sub { font-size: 12.5px; color: var(--white-soft); }

        /* ── JOB GRID ── */
        .jl-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 18px;
        }

        /* ── JOB CARD ── */
        .jl-card {
          background: var(--navy-card);
          border: 1px solid var(--border);
          border-radius: 16px;
          padding: 0;
          text-decoration: none;
          display: flex; flex-direction: column;
          position: relative; overflow: hidden;
          transition: border-color .22s, transform .22s, box-shadow .22s;
          opacity: 0;
          animation: cardIn .5s cubic-bezier(.22,1,.36,1) forwards;
        }

        @keyframes cardIn {
          from { opacity:0; transform:translateY(16px); }
          to   { opacity:1; transform:translateY(0); }
        }

        .jl-card:hover {
          border-color: rgba(15,212,192,0.25);
          transform: translateY(-4px);
          box-shadow: 0 16px 40px rgba(0,0,0,0.35);
        }

        .jl-card-accent {
          height: 2px;
          background: linear-gradient(90deg, var(--teal), rgba(15,212,192,0.15));
          opacity: 0;
          transition: opacity .25s;
        }

        .jl-card:hover .jl-card-accent { opacity: 1; }

        .jl-card-header {
          padding: 22px 22px 0;
          display: flex; align-items: flex-start;
          justify-content: space-between;
          gap: 12px;
        }

        .jl-card-logo {
          width: 48px; height: 48px;
          border-radius: 12px;
          display: flex; align-items: center; justify-content: center;
          font-family: 'Cabinet Grotesk', sans-serif;
          font-size: 14px; font-weight: 800;
          color: #0b1120;
          flex-shrink: 0;
          box-shadow: 0 4px 14px rgba(0,0,0,0.3);
        }

        /* Type badges */
        .jl-type-badge {
          padding: 4px 11px;
          border-radius: 100px;
          font-size: 11px; font-weight: 600;
          letter-spacing: 0.3px;
          white-space: nowrap;
        }

        .jl-type-teal   { background: var(--teal-dim);   border: 1px solid rgba(15,212,192,0.2);  color: var(--teal);   }
        .jl-type-amber  { background: var(--amber-dim);  border: 1px solid rgba(245,166,35,0.2);  color: var(--amber);  }
        .jl-type-purple { background: var(--purple-dim); border: 1px solid rgba(129,140,248,0.2); color: var(--purple); }
        .jl-type-blue   { background: var(--blue-dim);   border: 1px solid rgba(96,165,250,0.2);  color: var(--blue);   }

        .jl-card-body {
          padding: 16px 22px 18px;
          flex: 1;
        }

        .jl-card-title {
          font-family: 'Cabinet Grotesk', sans-serif;
          font-size: 16px; font-weight: 700;
          color: var(--white);
          letter-spacing: -0.3px;
          margin-bottom: 4px;
          line-height: 1.3;
        }

        .jl-card-company {
          font-size: 12.5px; color: var(--teal);
          font-weight: 500; margin-bottom: 8px;
        }

        .jl-card-location {
          display: inline-flex; align-items: center; gap: 5px;
          font-size: 12px; color: var(--white-soft);
          margin-bottom: 12px;
          padding: 3px 10px 3px 7px;
          background: var(--white-dim);
          border: 1px solid var(--border);
          border-radius: 100px;
        }

        .jl-card-desc {
          font-size: 13px; line-height: 1.6;
          color: rgba(154,170,191,0.7);
          font-weight: 300;
        }

        .jl-card-footer {
          padding: 14px 22px 20px;
          border-top: 1px solid var(--border);
          display: flex; align-items: center; justify-content: flex-end;
        }

        .jl-apply-btn {
          display: inline-flex; align-items: center; gap: 6px;
          font-family: 'Cabinet Grotesk', sans-serif;
          font-size: 13px; font-weight: 700;
          color: var(--teal);
          transition: gap .2s;
        }

        .jl-card:hover .jl-apply-btn { gap: 9px; }

        /* ── EMPTY STATE ── */
        .jl-empty {
          grid-column: 1 / -1;
          text-align: center; padding: 64px 24px;
        }

        .jl-empty-icon {
          width: 64px; height: 64px;
          border-radius: 50%;
          background: var(--white-dim);
          border: 1px solid var(--border);
          display: flex; align-items: center; justify-content: center;
          margin: 0 auto 18px; color: var(--white-soft);
        }

        .jl-empty-title {
          font-family: 'Cabinet Grotesk', sans-serif;
          font-size: 18px; font-weight: 700;
          color: var(--white); margin-bottom: 8px;
        }

        .jl-empty-sub { font-size: 14px; color: var(--white-soft); font-weight: 300; }

        /* ── SKELETON LOADER ── */
        .jl-skeleton-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 18px;
        }

        .jl-skel {
          background: var(--navy-card);
          border: 1px solid var(--border);
          border-radius: 16px; padding: 22px;
          animation: shimmer 1.6s ease-in-out infinite;
        }

        @keyframes shimmer {
          0%,100% { opacity: .7; }
          50%      { opacity: .4; }
        }

        .jl-skel-logo  { width:48px; height:48px; border-radius:12px; background:var(--white-dim); margin-bottom:14px; }
        .jl-skel-line  { height:10px; border-radius:6px; background:var(--white-dim); margin-bottom:10px; }
        .jl-skel-line.w70 { width:70%; }
        .jl-skel-line.w50 { width:50%; }
        .jl-skel-line.w85 { width:85%; }

        /* RESPONSIVE */
        @media (max-width: 1100px) {
          .jl-grid { grid-template-columns: repeat(2, 1fr); }
        }

        @media (max-width: 860px) {
          .jl-body { grid-template-columns: 1fr; padding: 0 24px 64px; }
          .jl-sidebar { position: static; }
          .jl-sidebar-card { display: none; } /* Use search on mobile */
          .jl-hero { padding: 110px 24px 48px; }
          .jl-grid, .jl-skeleton-grid { grid-template-columns: 1fr; }
        }

        @media (max-width: 560px) {
          .jl-grid { grid-template-columns: 1fr; }
        }
      `}</style>

      <div className="jl-root">

        {/* ── HERO ── */}
        <section className="jl-hero">
          <div className="jl-hero-inner">
            <div className="jl-badge">
              <span className="jl-badge-dot" />
              {loading ? "Loading jobs…" : `${jobData.length.toLocaleString()} jobs available`}
            </div>
            <h1 className="jl-hero-h1">
              Find your <em>perfect</em><br />role today.
            </h1>
            <p className="jl-hero-sub">
              Browse thousands of verified openings across every industry — filtered and matched to your skills.
            </p>

            {/* Search */}
            <div className="jl-search-wrap">
              <div className="jl-search">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
                </svg>
                <input
                  type="text"
                  placeholder="Job title, skill, keyword…"
                  value={search}
                  onChange={e => setSearch(e.target.value)}
                />
                <button className="jl-search-btn">Search</button>
              </div>
            </div>
          </div>
        </section>

        {/* ── BODY ── */}
        <div className="jl-body">

          {/* Sidebar */}
          <div className="jl-sidebar">
            <div className="jl-sidebar-card">
              <div className="jl-sidebar-title">Filters</div>

              {/* Job Type */}
              <div className="jl-filter-group">
                <span className="jl-filter-label">Job Type</span>
                <div className="jl-type-options">
                  {[
                    { val: "",           label: "All Types" },
                    { val: "full-time",  label: "Full Time"  },
                    { val: "part-time",  label: "Part Time"  },
                    { val: "internship", label: "Internship" },
                    { val: "contract",   label: "Contract"   },
                  ].map(o => (
                    <div
                      key={o.val}
                      className={`jl-type-opt${filters.type === o.val ? " active" : ""}`}
                      onClick={() => handleFilter("type", o.val)}
                    >
                      <div className="jl-type-radio">
                        <div className="jl-type-radio-dot" />
                      </div>
                      {o.label}
                    </div>
                  ))}
                </div>
              </div>

              {/* Location */}
              <div className="jl-filter-group">
                <span className="jl-filter-label">Location</span>
                <select
                  className="jl-select"
                  value={filters.location}
                  onChange={e => handleFilter("location", e.target.value)}
                >
                  <option value="">All Locations</option>
                  {uniqueLocations.map((loc, i) => (
                    <option key={i} value={loc}>{loc}</option>
                  ))}
                </select>
              </div>

              <button
                className="jl-clear-btn"
                onClick={() => { setFilters({ type: "", location: "" }); setSearch(""); }}
              >
                Clear all filters
              </button>
            </div>
          </div>

          {/* Listings */}
          <div>
            <div className="jl-results-bar">
              <div>
                <div className="jl-results-count">
                  <span>{filteredJobs.length}</span> {filteredJobs.length === 1 ? "role" : "roles"} found
                </div>
                {(search || filters.type || filters.location) && (
                  <div className="jl-results-sub">Filtered from {jobData.length} total jobs</div>
                )}
              </div>
            </div>

            {loading ? (
              <div className="jl-skeleton-grid">
                {[...Array(6)].map((_, i) => (
                  <div className="jl-skel" key={i}>
                    <div className="jl-skel-logo" />
                    <div className="jl-skel-line w70" />
                    <div className="jl-skel-line w50" />
                    <div className="jl-skel-line w85" />
                    <div className="jl-skel-line w70" />
                  </div>
                ))}
              </div>
            ) : (
              <div className="jl-grid">
                {filteredJobs.length > 0 ? filteredJobs.map((job, i) => (
                  <JobCard
                    key={job.id || i}
                    index={i}
                    id={job.id}
                    title={job.title}
                    type={job.type}
                    location={job.location}
                    description={job.description}
                    company={job.company}
                  />
                )) : (
                  <div className="jl-empty">
                    <div className="jl-empty-icon">
                      <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                        <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
                      </svg>
                    </div>
                    <div className="jl-empty-title">No jobs found</div>
                    <p className="jl-empty-sub">Try adjusting your search or clearing the filters.</p>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>

        <Footer />
      </div>
    </>
  );
};

export default JobListingee;