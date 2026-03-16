import React, { useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";
import Footer from "./Footer";

/* ─── tiny hook: animate number up ─── */
const useCountUp = (target, duration = 1800, start = false) => {
  const [val, setVal] = useState(0);
  useEffect(() => {
    if (!start) return;
    let s = null;
    const step = (ts) => {
      if (!s) s = ts;
      const p = Math.min((ts - s) / duration, 1);
      setVal(Math.floor(p * target));
      if (p < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [start, target, duration]);
  return val;
};

/* ─── Intersection observer hook ─── */
const useInView = (threshold = 0.15) => {
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

/* ─── Stat counter ─── */
const Stat = ({ n, suffix, label, inView }) => {
  const val = useCountUp(n, 1600, inView);
  return (
    <div className="hm-stat">
      <div className="hm-stat-n">{val.toLocaleString()}<span>{suffix}</span></div>
      <div className="hm-stat-l">{label}</div>
    </div>
  );
};

const Home = () => {
  const [statsRef, statsInView] = useInView(0.2);
  const [mounted, setMounted]   = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setMounted(true), 80);
    return () => clearTimeout(t);
  }, []);

  const categories = [
    { icon: "💻", label: "Technology",     count: "4,210 jobs" },
    { icon: "🎨", label: "Design",          count: "1,830 jobs" },
    { icon: "📊", label: "Finance",         count: "2,540 jobs" },
    { icon: "🏥", label: "Healthcare",      count: "3,120 jobs" },
    { icon: "📣", label: "Marketing",       count: "1,690 jobs" },
    { icon: "⚖️", label: "Legal",           count: "980 jobs"   },
    { icon: "🎓", label: "Education",       count: "1,450 jobs" },
    { icon: "🏗️", label: "Engineering",    count: "2,870 jobs" },
  ];

  const features = [
    {
      icon: (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
        </svg>
      ),
      title:  "Smart Job Matching",
      desc:   "Our AI reads beyond your keywords — it maps your skills, pace, and ambitions to roles where you'll actually thrive.",
      color:  "teal",
    },
    {
      icon: (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
          <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/>
        </svg>
      ),
      title:  "One-Click Apply",
      desc:   "Your profile does the heavy lifting. Apply to multiple roles in seconds without re-typing the same info.",
      color:  "amber",
    },
    {
      icon: (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
          <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/>
          <path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/>
        </svg>
      ),
      title:  "2.1M+ Professionals",
      desc:   "Employers get instant access to a massive, quality-first talent pool spanning every industry and seniority level.",
      color:  "teal",
    },
    {
      icon: (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
          <rect x="2" y="3" width="20" height="14" rx="2"/><line x1="8" y1="21" x2="16" y2="21"/><line x1="12" y1="17" x2="12" y2="21"/>
        </svg>
      ),
      title:  "Real-Time Dashboard",
      desc:   "Track applications, view employer activity, and get notified the moment something moves — all in one clean view.",
      color:  "amber",
    },
  ];

  const testimonials = [
    {
      quote:  "I landed a senior engineering role at a Series B startup within 3 weeks. The matching is genuinely different.",
      name:   "Arjun Mehta",
      role:   "Senior Engineer · Bangalore",
      init:   "A",
    },
    {
      quote:  "We've hired 6 people through TalentBridge this quarter. The candidate quality is miles ahead of any other platform.",
      name:   "Sarah Collins",
      role:   "Head of Talent · FinEdge",
      init:   "S",
    },
    {
      quote:  "Finally a platform that doesn't feel like a spreadsheet. Applied to 4 jobs in under 10 minutes.",
      name:   "Priya Desai",
      role:   "Product Designer · Mumbai",
      init:   "P",
    },
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

        .hm-root {
          background: var(--navy);
          font-family: 'Geist', sans-serif;
          color: var(--white);
          overflow-x: hidden;
        }

        /* ════════════════════════════════
           HERO
        ════════════════════════════════ */
        .hm-hero {
          position: relative;
          min-height: 100vh;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          text-align: center;
          padding: 120px 24px 80px;
          overflow: hidden;
        }

        /* Animated mesh gradient background */
        .hm-hero-bg {
          position: absolute;
          inset: 0;
          background:
            radial-gradient(ellipse 70% 60% at 50% 0%,   rgba(15,212,192,0.09) 0%, transparent 65%),
            radial-gradient(ellipse 50% 40% at 20% 80%,  rgba(15,212,192,0.06) 0%, transparent 60%),
            radial-gradient(ellipse 40% 50% at 80% 30%,  rgba(245,166,35,0.05) 0%, transparent 60%);
          pointer-events: none;
        }

        /* Dot grid */
        .hm-hero-grid {
          position: absolute;
          inset: 0;
          background-image: radial-gradient(rgba(240,244,255,0.055) 1px, transparent 1px);
          background-size: 36px 36px;
          pointer-events: none;
          mask-image: radial-gradient(ellipse 80% 80% at 50% 50%, black 30%, transparent 100%);
        }

        /* Floating orbs */
        .hm-orb {
          position: absolute;
          border-radius: 50%;
          filter: blur(80px);
          pointer-events: none;
        }

        .hm-orb-1 {
          width: 500px; height: 500px;
          top: -100px; left: -100px;
          background: rgba(15,212,192,0.06);
          animation: orbDrift1 12s ease-in-out infinite alternate;
        }

        .hm-orb-2 {
          width: 400px; height: 400px;
          bottom: -80px; right: -80px;
          background: rgba(245,166,35,0.05);
          animation: orbDrift2 14s ease-in-out infinite alternate;
        }

        @keyframes orbDrift1 { from { transform: translate(0,0); } to { transform: translate(60px,40px); } }
        @keyframes orbDrift2 { from { transform: translate(0,0); } to { transform: translate(-40px,-50px); } }

        .hm-hero-inner {
          position: relative;
          z-index: 1;
          max-width: 820px;
          margin: 0 auto;
        }

        /* Live badge */
        .hm-live-badge {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 6px 16px 6px 10px;
          background: rgba(15,212,192,0.07);
          border: 1px solid rgba(15,212,192,0.2);
          border-radius: 100px;
          font-size: 12.5px;
          font-weight: 500;
          color: var(--teal);
          margin-bottom: 32px;
          opacity: 0;
          animation: fadeUp .7s cubic-bezier(.22,1,.36,1) .1s forwards;
        }

        .hm-live-dot {
          width: 7px; height: 7px;
          border-radius: 50%;
          background: var(--teal);
          box-shadow: 0 0 8px var(--teal);
          animation: livePulse 2s ease-in-out infinite;
        }

        @keyframes livePulse {
          0%, 100% { opacity: 1; transform: scale(1); }
          50%       { opacity: 0.5; transform: scale(0.75); }
        }

        .hm-hero-h1 {
          font-family: 'Cabinet Grotesk', sans-serif;
          font-size: clamp(42px, 6vw, 80px);
          font-weight: 800;
          line-height: 1.06;
          letter-spacing: -2.5px;
          color: var(--white);
          margin-bottom: 10px;
          opacity: 0;
          animation: fadeUp .75s cubic-bezier(.22,1,.36,1) .22s forwards;
        }

        .hm-hero-h1 em {
          font-family: 'Instrument Serif', serif;
          font-style: italic;
          font-weight: 400;
          color: var(--teal);
          letter-spacing: -2px;
        }

        .hm-hero-sub {
          font-size: clamp(15px, 2vw, 18px);
          line-height: 1.7;
          color: var(--white-soft);
          font-weight: 300;
          max-width: 560px;
          margin: 0 auto 44px;
          opacity: 0;
          animation: fadeUp .75s cubic-bezier(.22,1,.36,1) .34s forwards;
        }

        /* CTA buttons */
        .hm-cta-row {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 14px;
          flex-wrap: wrap;
          margin-bottom: 64px;
          opacity: 0;
          animation: fadeUp .75s cubic-bezier(.22,1,.36,1) .46s forwards;
        }

        .hm-cta-primary {
          padding: 14px 32px;
          background: var(--teal);
          color: var(--navy);
          font-family: 'Cabinet Grotesk', sans-serif;
          font-size: 15px;
          font-weight: 800;
          border-radius: 12px;
          text-decoration: none;
          display: inline-flex;
          align-items: center;
          gap: 8px;
          box-shadow: 0 8px 28px rgba(15,212,192,0.32);
          transition: transform .15s, box-shadow .2s, opacity .15s;
          position: relative;
          overflow: hidden;
        }

        .hm-cta-primary::after {
          content: '';
          position: absolute;
          top: 0; left: -100%;
          width: 50%; height: 100%;
          background: linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent);
          transform: skewX(-15deg);
        }

        .hm-cta-primary:hover::after { animation: shine .55s ease forwards; }
        @keyframes shine { from { left: -60%; } to { left: 160%; } }

        .hm-cta-primary:hover {
          transform: translateY(-2px);
          box-shadow: 0 14px 36px rgba(15,212,192,0.42);
        }

        .hm-cta-ghost {
          padding: 14px 28px;
          background: transparent;
          color: var(--white-soft);
          font-family: 'Geist', sans-serif;
          font-size: 15px;
          font-weight: 500;
          border-radius: 12px;
          border: 1px solid var(--border);
          text-decoration: none;
          display: inline-flex;
          align-items: center;
          gap: 8px;
          transition: border-color .18s, color .18s, background .18s;
        }

        .hm-cta-ghost:hover {
          border-color: rgba(240,244,255,0.2);
          color: var(--white);
          background: var(--white-dim);
        }

        /* Search bar */
        .hm-search-wrap {
          width: 100%;
          max-width: 620px;
          margin: 0 auto;
          opacity: 0;
          animation: fadeUp .75s cubic-bezier(.22,1,.36,1) .56s forwards;
        }

        .hm-search {
          display: flex;
          align-items: center;
          background: rgba(255,255,255,0.05);
          border: 1px solid rgba(240,244,255,0.1);
          border-radius: 14px;
          padding: 6px 6px 6px 20px;
          backdrop-filter: blur(12px);
          gap: 10px;
          transition: border-color .2s, box-shadow .2s;
        }

        .hm-search:focus-within {
          border-color: rgba(15,212,192,0.35);
          box-shadow: 0 0 0 3px rgba(15,212,192,0.1);
        }

        .hm-search svg { color: var(--white-soft); flex-shrink: 0; }

        .hm-search input {
          flex: 1;
          background: none;
          border: none;
          outline: none;
          font-family: 'Geist', sans-serif;
          font-size: 14.5px;
          color: var(--white);
          padding: 8px 0;
        }

        .hm-search input::placeholder { color: rgba(154,170,191,0.5); }

        .hm-search-btn {
          padding: 11px 22px;
          background: var(--teal);
          color: var(--navy);
          font-family: 'Cabinet Grotesk', sans-serif;
          font-size: 14px;
          font-weight: 700;
          border: none;
          border-radius: 10px;
          cursor: pointer;
          flex-shrink: 0;
          transition: opacity .15s, transform .15s;
        }

        .hm-search-btn:hover { opacity: .88; transform: translateY(-1px); }

        /* Popular tags */
        .hm-tags {
          display: flex;
          align-items: center;
          gap: 8px;
          margin-top: 14px;
          flex-wrap: wrap;
          justify-content: center;
        }

        .hm-tag-label { font-size: 12px; color: rgba(154,170,191,0.5); }

        .hm-tag {
          padding: 4px 12px;
          background: var(--white-dim);
          border: 1px solid var(--border);
          border-radius: 100px;
          font-size: 12px;
          color: var(--white-soft);
          cursor: pointer;
          text-decoration: none;
          transition: border-color .15s, color .15s;
        }

        .hm-tag:hover { border-color: rgba(15,212,192,0.3); color: var(--teal); }

        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(20px); }
          to   { opacity: 1; transform: translateY(0); }
        }

        /* ════════════════════════════════
           SECTION WRAPPER
        ════════════════════════════════ */
        .hm-section {
          max-width: 1200px;
          margin: 0 auto;
          padding: 80px 48px;
        }

        .hm-section-eyebrow {
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

        .hm-section-eyebrow::before {
          content: '';
          width: 24px; height: 2px;
          background: var(--teal);
          border-radius: 2px;
        }

        .hm-section-title {
          font-family: 'Cabinet Grotesk', sans-serif;
          font-size: clamp(28px, 3.5vw, 42px);
          font-weight: 800;
          color: var(--white);
          letter-spacing: -1px;
          line-height: 1.12;
          margin-bottom: 10px;
        }

        .hm-section-title em {
          font-family: 'Instrument Serif', serif;
          font-style: italic;
          font-weight: 400;
          color: var(--teal);
        }

        .hm-section-sub {
          font-size: 15px;
          color: var(--white-soft);
          font-weight: 300;
          max-width: 520px;
          line-height: 1.65;
          margin-bottom: 52px;
        }

        /* ════════════════════════════════
           STATS BAR
        ════════════════════════════════ */
        .hm-stats-bar {
          background: var(--navy-mid);
          border-top: 1px solid var(--border);
          border-bottom: 1px solid var(--border);
        }

        .hm-stats-inner {
          max-width: 1200px;
          margin: 0 auto;
          padding: 40px 48px;
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 24px;
        }

        .hm-stat {
          text-align: center;
          padding: 24px 16px;
          border-radius: 14px;
          background: var(--white-dim);
          border: 1px solid var(--border);
          transition: border-color .2s, background .2s, transform .2s;
        }

        .hm-stat:hover {
          border-color: rgba(15,212,192,0.2);
          background: rgba(15,212,192,0.04);
          transform: translateY(-2px);
        }

        .hm-stat-n {
          font-family: 'Cabinet Grotesk', sans-serif;
          font-size: 36px;
          font-weight: 800;
          color: var(--white);
          line-height: 1;
          margin-bottom: 8px;
        }

        .hm-stat-n span { color: var(--teal); }

        .hm-stat-l {
          font-size: 13px;
          color: var(--white-soft);
          font-weight: 300;
          letter-spacing: 0.3px;
        }

        /* ════════════════════════════════
           FEATURES
        ════════════════════════════════ */
        .hm-features {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 20px;
        }

        .hm-feature-card {
          padding: 32px;
          background: var(--navy-card);
          border: 1px solid var(--border);
          border-radius: 18px;
          transition: border-color .22s, transform .22s, box-shadow .22s;
          position: relative;
          overflow: hidden;
        }

        .hm-feature-card::before {
          content: '';
          position: absolute;
          top: 0; left: 0; right: 0;
          height: 1px;
          background: linear-gradient(90deg, transparent, rgba(15,212,192,0.25), transparent);
          opacity: 0;
          transition: opacity .3s;
        }

        .hm-feature-card:hover {
          border-color: rgba(15,212,192,0.2);
          transform: translateY(-3px);
          box-shadow: 0 16px 40px rgba(0,0,0,0.3);
        }

        .hm-feature-card:hover::before { opacity: 1; }

        .hm-feature-icon {
          width: 48px; height: 48px;
          border-radius: 12px;
          display: flex; align-items: center; justify-content: center;
          margin-bottom: 20px;
          flex-shrink: 0;
        }

        .hm-feature-icon.teal {
          background: var(--teal-dim);
          border: 1px solid rgba(15,212,192,0.15);
          color: var(--teal);
        }

        .hm-feature-icon.amber {
          background: var(--amber-dim);
          border: 1px solid rgba(245,166,35,0.15);
          color: var(--amber);
        }

        .hm-feature-title {
          font-family: 'Cabinet Grotesk', sans-serif;
          font-size: 18px;
          font-weight: 700;
          color: var(--white);
          margin-bottom: 10px;
          letter-spacing: -0.3px;
        }

        .hm-feature-desc {
          font-size: 14px;
          line-height: 1.65;
          color: var(--white-soft);
          font-weight: 300;
        }

        /* ════════════════════════════════
           CATEGORIES
        ════════════════════════════════ */
        .hm-categories {
          background: var(--navy-mid);
          border-top: 1px solid var(--border);
          border-bottom: 1px solid var(--border);
        }

        .hm-cat-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 14px;
        }

        .hm-cat-card {
          padding: 24px 20px;
          background: var(--navy);
          border: 1px solid var(--border);
          border-radius: 14px;
          text-decoration: none;
          display: flex;
          align-items: center;
          gap: 14px;
          transition: border-color .2s, background .2s, transform .2s;
          cursor: pointer;
        }

        .hm-cat-card:hover {
          border-color: rgba(15,212,192,0.25);
          background: rgba(15,212,192,0.03);
          transform: translateY(-2px);
        }

        .hm-cat-emoji { font-size: 26px; flex-shrink: 0; line-height: 1; }

        .hm-cat-name {
          font-family: 'Cabinet Grotesk', sans-serif;
          font-size: 14.5px;
          font-weight: 700;
          color: var(--white);
          margin-bottom: 2px;
        }

        .hm-cat-count { font-size: 12px; color: var(--white-soft); }

        /* ════════════════════════════════
           HOW IT WORKS
        ════════════════════════════════ */
        .hm-steps {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 28px;
          position: relative;
        }

        /* Connecting line */
        .hm-steps::before {
          content: '';
          position: absolute;
          top: 36px; left: calc(16.66% + 20px); right: calc(16.66% + 20px);
          height: 1px;
          background: linear-gradient(90deg, transparent, rgba(15,212,192,0.3), rgba(15,212,192,0.3), transparent);
        }

        .hm-step-card {
          text-align: center;
          padding: 36px 24px;
          background: var(--navy-card);
          border: 1px solid var(--border);
          border-radius: 18px;
          transition: border-color .2s, transform .2s;
        }

        .hm-step-card:hover {
          border-color: rgba(15,212,192,0.2);
          transform: translateY(-3px);
        }

        .hm-step-num {
          width: 48px; height: 48px;
          border-radius: 50%;
          background: var(--teal-dim);
          border: 1px solid rgba(15,212,192,0.25);
          display: flex; align-items: center; justify-content: center;
          font-family: 'Cabinet Grotesk', sans-serif;
          font-size: 18px;
          font-weight: 800;
          color: var(--teal);
          margin: 0 auto 20px;
        }

        .hm-step-title {
          font-family: 'Cabinet Grotesk', sans-serif;
          font-size: 17px;
          font-weight: 700;
          color: var(--white);
          margin-bottom: 10px;
        }

        .hm-step-desc {
          font-size: 13.5px;
          line-height: 1.65;
          color: var(--white-soft);
          font-weight: 300;
        }

        /* ════════════════════════════════
           TESTIMONIALS
        ════════════════════════════════ */
        .hm-testimonials {
          background: var(--navy-mid);
          border-top: 1px solid var(--border);
          border-bottom: 1px solid var(--border);
        }

        .hm-testi-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 20px;
        }

        .hm-testi-card {
          padding: 28px;
          background: var(--navy);
          border: 1px solid var(--border);
          border-radius: 16px;
          position: relative;
          transition: border-color .2s, transform .2s;
        }

        .hm-testi-card:hover {
          border-color: rgba(15,212,192,0.2);
          transform: translateY(-2px);
        }

        .hm-testi-quote {
          font-size: 32px;
          line-height: 1;
          color: var(--teal);
          opacity: 0.4;
          margin-bottom: 14px;
          font-family: Georgia, serif;
        }

        .hm-testi-text {
          font-size: 14px;
          line-height: 1.7;
          color: var(--white-soft);
          font-weight: 300;
          margin-bottom: 24px;
          font-style: italic;
        }

        .hm-testi-author {
          display: flex;
          align-items: center;
          gap: 12px;
        }

        .hm-testi-avatar {
          width: 38px; height: 38px;
          border-radius: 50%;
          background: linear-gradient(135deg, var(--teal), #0b9e8e);
          display: flex; align-items: center; justify-content: center;
          font-family: 'Cabinet Grotesk', sans-serif;
          font-size: 13px;
          font-weight: 700;
          color: var(--navy);
          flex-shrink: 0;
        }

        .hm-testi-name {
          font-size: 13.5px;
          font-weight: 600;
          color: var(--white);
          margin-bottom: 2px;
        }

        .hm-testi-role { font-size: 12px; color: var(--white-soft); }

        /* Stars */
        .hm-stars {
          display: flex;
          gap: 2px;
          margin-bottom: 14px;
        }

        .hm-star { color: var(--amber); font-size: 13px; }

        /* ════════════════════════════════
           FINAL CTA
        ════════════════════════════════ */
        .hm-cta-section {
          position: relative;
          overflow: hidden;
          text-align: center;
          padding: 100px 48px;
          background: var(--navy);
        }

        .hm-cta-section::before {
          content: '';
          position: absolute;
          inset: 0;
          background:
            radial-gradient(ellipse 60% 70% at 50% 50%, rgba(15,212,192,0.07) 0%, transparent 70%);
          pointer-events: none;
        }

        .hm-cta-inner {
          position: relative;
          z-index: 1;
          max-width: 620px;
          margin: 0 auto;
        }

        .hm-cta-title {
          font-family: 'Cabinet Grotesk', sans-serif;
          font-size: clamp(32px, 4vw, 52px);
          font-weight: 800;
          color: var(--white);
          letter-spacing: -1.2px;
          line-height: 1.1;
          margin-bottom: 16px;
        }

        .hm-cta-title em {
          font-family: 'Instrument Serif', serif;
          font-style: italic;
          color: var(--teal);
          font-weight: 400;
        }

        .hm-cta-body {
          font-size: 16px;
          line-height: 1.65;
          color: var(--white-soft);
          font-weight: 300;
          margin-bottom: 40px;
        }

        .hm-cta-btns {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 14px;
          flex-wrap: wrap;
        }

        /* ════════════════════════════════
           RESPONSIVE
        ════════════════════════════════ */
        @media (max-width: 960px) {
          .hm-section { padding: 60px 28px; }
          .hm-stats-inner { grid-template-columns: repeat(2, 1fr); padding: 32px 28px; }
          .hm-features { grid-template-columns: 1fr; }
          .hm-cat-grid { grid-template-columns: repeat(2, 1fr); }
          .hm-steps { grid-template-columns: 1fr; }
          .hm-steps::before { display: none; }
          .hm-testi-grid { grid-template-columns: 1fr; }
          .hm-cta-section { padding: 64px 28px; }
        }

        @media (max-width: 560px) {
          .hm-stats-inner { grid-template-columns: 1fr 1fr; }
          .hm-cat-grid { grid-template-columns: 1fr 1fr; }
        }
      `}</style>

      <div className="hm-root">

        {/* ══ HERO ══ */}
        <section className="hm-hero">
          <div className="hm-hero-bg" />
          <div className="hm-hero-grid" />
          <div className="hm-orb hm-orb-1" />
          <div className="hm-orb hm-orb-2" />

          <div className="hm-hero-inner">
            <div className="hm-live-badge">
              <span className="hm-live-dot" />
              12,400+ jobs posted this week
            </div>

            <h1 className="hm-hero-h1">
              Your <em>career</em><br />starts here.
            </h1>

            <p className="hm-hero-sub">
              TalentBridge connects ambitious professionals with companies that actually value what they bring. No noise — just the right fit, faster.
            </p>

            <div className="hm-cta-row">
              <Link to="/Eereg" className="hm-cta-primary">
                Find Jobs
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/>
                </svg>
              </Link>
              <Link to="/Erreg" className="hm-cta-ghost">
                Hire Talent
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/>
                  <path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/>
                </svg>
              </Link>
            </div>

            {/* Search bar */}
            <div className="hm-search-wrap">
              <div className="hm-search">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
                </svg>
                <input
                  type="text"
                  placeholder="Job title, skill, or company…"
                  onKeyDown={(e) => e.key === "Enter" && (window.location.href = "/job-listings-e")}
                />
                <button className="hm-search-btn" onClick={() => window.location.href = "/job-listings-e"}>
                  Search
                </button>
              </div>
              <div className="hm-tags">
                <span className="hm-tag-label">Popular:</span>
                {["React", "Python", "Product Manager", "UI/UX", "Data Science"].map(t => (
                  <Link key={t} to="/job-listings-e" className="hm-tag">{t}</Link>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ══ STATS ══ */}
        <div className="hm-stats-bar">
          <div className="hm-stats-inner" ref={statsRef}>
            <Stat n={48000}  suffix="+"  label="Active Jobs"       inView={statsInView} />
            <Stat n={2100000} suffix="+" label="Professionals"     inView={statsInView} />
            <Stat n={48000}  suffix="+"  label="Companies Hiring"  inView={statsInView} />
            <Stat n={98}     suffix="%"  label="Satisfaction Rate" inView={statsInView} />
          </div>
        </div>

        {/* ══ FEATURES ══ */}
        <section className="hm-section">
          <p className="hm-section-eyebrow">Why TalentBridge</p>
          <h2 className="hm-section-title">Built for how people<br /><em>actually</em> hire.</h2>
          <p className="hm-section-sub">
            We rethought every step of the job search and hiring process — so you spend less time hunting and more time doing.
          </p>
          <div className="hm-features">
            {features.map((f, i) => (
              <div className="hm-feature-card" key={i}>
                <div className={`hm-feature-icon ${f.color}`}>{f.icon}</div>
                <div className="hm-feature-title">{f.title}</div>
                <div className="hm-feature-desc">{f.desc}</div>
              </div>
            ))}
          </div>
        </section>

        {/* ══ CATEGORIES ══ */}
        <div className="hm-categories">
          <div className="hm-section">
            <p className="hm-section-eyebrow">Browse by Industry</p>
            <h2 className="hm-section-title">Find work in your <em>field.</em></h2>
            <p className="hm-section-sub">
              Explore thousands of openings across every major industry — filtered, ranked, and matched to your profile.
            </p>
            <div className="hm-cat-grid">
              {categories.map((c, i) => (
                <Link to="/job-listings-e" className="hm-cat-card" key={i}>
                  <span className="hm-cat-emoji">{c.icon}</span>
                  <div>
                    <div className="hm-cat-name">{c.label}</div>
                    <div className="hm-cat-count">{c.count}</div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>

        {/* ══ HOW IT WORKS ══ */}
        <section className="hm-section">
          <p className="hm-section-eyebrow">How It Works</p>
          <h2 className="hm-section-title">Hired in <em>3 steps.</em></h2>
          <p className="hm-section-sub">
            The simplest path from where you are to where you want to be.
          </p>
          <div className="hm-steps">
            {[
              { n:"1", title:"Create Your Profile", desc:"Sign up in under 2 minutes. Add your skills, experience, and what you're looking for — that's it." },
              { n:"2", title:"Get Matched",          desc:"Our AI surfaces roles matched to your profile. No sifting through hundreds of irrelevant listings." },
              { n:"3", title:"Apply & Get Hired",    desc:"One-click apply to matched roles. Track every application in your personal dashboard." },
            ].map((s, i) => (
              <div className="hm-step-card" key={i}>
                <div className="hm-step-num">{s.n}</div>
                <div className="hm-step-title">{s.title}</div>
                <div className="hm-step-desc">{s.desc}</div>
              </div>
            ))}
          </div>
        </section>

        {/* ══ TESTIMONIALS ══ */}
        <div className="hm-testimonials">
          <div className="hm-section">
            <p className="hm-section-eyebrow">Testimonials</p>
            <h2 className="hm-section-title">Real people,<br /><em>real results.</em></h2>
            <p className="hm-section-sub">
              Don't take our word for it — here's what job seekers and employers are saying.
            </p>
            <div className="hm-testi-grid">
              {testimonials.map((t, i) => (
                <div className="hm-testi-card" key={i}>
                  <div className="hm-stars">
                    {[...Array(5)].map((_, j) => <span key={j} className="hm-star">★</span>)}
                  </div>
                  <div className="hm-testi-quote">"</div>
                  <p className="hm-testi-text">{t.quote}</p>
                  <div className="hm-testi-author">
                    <div className="hm-testi-avatar">{t.init}</div>
                    <div>
                      <div className="hm-testi-name">{t.name}</div>
                      <div className="hm-testi-role">{t.role}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ══ FINAL CTA ══ */}
        <section className="hm-cta-section">
          <div className="hm-cta-inner">
            <h2 className="hm-cta-title">
              Ready to find your<br /><em>next opportunity?</em>
            </h2>
            <p className="hm-cta-body">
              Join 2.1 million professionals already using TalentBridge to accelerate their careers. Free to join — always.
            </p>
            <div className="hm-cta-btns">
              <Link to="/Eereg" className="hm-cta-primary" style={{ padding:'15px 36px', fontSize:'15px' }}>
                Get Started Free
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/>
                </svg>
              </Link>
              <Link to="/Erreg" className="hm-cta-ghost" style={{ padding:'15px 28px', fontSize:'15px' }}>
                Post a Job →
              </Link>
            </div>
          </div>
        </section>

        <Footer />
      </div>
    </>
  );
};

export default Home;