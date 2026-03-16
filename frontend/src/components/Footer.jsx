import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  const year = new Date().getFullYear();

  const columns = [
    {
      title: "Browse Jobs",
      links: [
        { label: "Web Design",      to: "/job-listings-e" },
        { label: "Graphic Design",  to: "/job-listings-e" },
        { label: "Web Development", to: "/job-listings-e" },
        { label: "Python",          to: "/job-listings-e" },
        { label: "HTML5 / CSS3",    to: "/job-listings-e" },
        { label: "Data Science",    to: "/job-listings-e" },
      ],
    },
    {
      title: "Job Seekers",
      links: [
        { label: "Find Jobs",       to: "/job-listings-e", badge: "New" },
        { label: "Create Profile",  to: "/Eereg" },
        { label: "My Applications", to: "/EmployeeApplication" },
        { label: "Sign In",         to: "/login" },
      ],
    },
    {
      title: "Employers",
      links: [
        { label: "Register Company", to: "/Erreg"    },
        { label: "Post a Job",       to: "/post-job" },
        { label: "Posted Jobs",      to: "/applied"  },
        { label: "Employer Login",   to: "/login"    },
      ],
    },
    {
      title: "Company",
      links: [
        { label: "About Us",  to: "/about"   },
        { label: "Contact",   to: "/contact" },
        { label: "Blog",      href: "#"      },
        { label: "Resources", href: "#"      },
        { label: "Privacy",   href: "#"      },
        { label: "Terms",     href: "#"      },
      ],
    },
  ];

  const socials = [
    {
      label: "Twitter / X", href: "#",
      icon: <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.746l7.73-8.835L1.254 2.25H8.08l4.253 5.622 5.91-5.622zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>,
    },
    {
      label: "LinkedIn", href: "#",
      icon: <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6zM2 9h4v12H2z"/><circle cx="4" cy="4" r="2"/></svg>,
    },
    {
      label: "GitHub", href: "#",
      icon: <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z"/></svg>,
    },
    {
      label: "Instagram", href: "#",
      icon: <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/></svg>,
    },
  ];

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cabinet+Grotesk:wght@500;700;800&family=Geist:wght@300;400;500&display=swap');

        .ft-root {
          background: #080e1a;
          border-top: 1px solid rgba(240,244,255,0.06);
          font-family: 'Geist', sans-serif;
          color: #9aaabf;
          position: relative;
        }

        /* ── CTA STRIP ── */
        .ft-strip {
          background: linear-gradient(90deg,
            rgba(15,212,192,0.06) 0%,
            rgba(15,212,192,0.025) 60%,
            transparent 100%
          );
          border-bottom: 1px solid rgba(240,244,255,0.05);
          padding: 26px 48px;
        }

        .ft-strip-inner {
          max-width: 1200px; margin: 0 auto;
          display: flex; align-items: center;
          justify-content: space-between; gap: 20px; flex-wrap: wrap;
        }

        .ft-strip-headline {
          font-family: 'Cabinet Grotesk', sans-serif;
          font-size: 16px; font-weight: 700;
          color: #f0f4ff; letter-spacing: -0.3px;
        }

        .ft-strip-headline span { color: #0fd4c0; }

        .ft-strip-sub {
          font-size: 12.5px; color: rgba(154,170,191,0.55);
          font-weight: 300; margin-top: 2px;
        }

        .ft-strip-btns { display: flex; gap: 10px; flex-shrink: 0; flex-wrap: wrap; }

        .ft-btn-primary {
          padding: 9px 20px;
          background: #0fd4c0; color: #0b1120;
          font-family: 'Cabinet Grotesk', sans-serif;
          font-size: 13px; font-weight: 800;
          border-radius: 9px; text-decoration: none;
          display: inline-flex; align-items: center; gap: 6px;
          box-shadow: 0 4px 16px rgba(15,212,192,0.25);
          transition: transform .15s, box-shadow .2s;
          white-space: nowrap;
        }

        .ft-btn-primary:hover {
          transform: translateY(-1px);
          box-shadow: 0 7px 22px rgba(15,212,192,0.36);
        }

        .ft-btn-ghost {
          padding: 9px 18px;
          background: transparent; color: rgba(154,170,191,0.7);
          font-family: 'Geist', sans-serif;
          font-size: 13px; font-weight: 500;
          border-radius: 9px; border: 1px solid rgba(240,244,255,0.08);
          text-decoration: none;
          display: inline-flex; align-items: center; gap: 6px;
          transition: border-color .15s, color .15s, background .15s;
          white-space: nowrap;
        }

        .ft-btn-ghost:hover {
          border-color: rgba(240,244,255,0.18);
          color: #f0f4ff; background: rgba(240,244,255,0.04);
        }

        /* ── MAIN GRID ── */
        .ft-grid {
          max-width: 1200px; margin: 0 auto;
          padding: 52px 48px 40px;
          display: grid;
          grid-template-columns: 260px repeat(4, 1fr);
          gap: 44px;
        }

        /* ── BRAND COL ── */
        .ft-logo {
          font-family: 'Cabinet Grotesk', sans-serif;
          font-weight: 800; font-size: 18px;
          color: #f0f4ff; text-decoration: none;
          display: flex; align-items: center; gap: 8px;
          margin-bottom: 13px; letter-spacing: -0.4px;
        }

        .ft-logo-dot {
          width: 7px; height: 7px; border-radius: 50%;
          background: #0fd4c0; box-shadow: 0 0 8px #0fd4c0;
        }

        .ft-tagline {
          font-size: 13px; line-height: 1.65;
          color: rgba(154,170,191,0.6);
          font-weight: 300; margin-bottom: 22px; max-width: 200px;
        }

        /* Newsletter */
        .ft-nl { display: flex; gap: 6px; margin-bottom: 22px; }

        .ft-nl-input {
          flex: 1; min-width: 0;
          padding: 9px 12px;
          background: rgba(240,244,255,0.04);
          border: 1px solid rgba(240,244,255,0.08);
          border-radius: 8px;
          font-family: 'Geist', sans-serif;
          font-size: 12.5px; color: #f0f4ff;
          outline: none;
          transition: border-color .2s;
        }

        .ft-nl-input::placeholder { color: rgba(154,170,191,0.3); }
        .ft-nl-input:focus { border-color: rgba(15,212,192,0.35); }

        .ft-nl-btn {
          padding: 9px 13px;
          background: #0fd4c0; color: #0b1120;
          font-family: 'Cabinet Grotesk', sans-serif;
          font-size: 12px; font-weight: 800;
          border: none; border-radius: 8px; cursor: pointer;
          flex-shrink: 0;
          transition: opacity .15s;
        }

        .ft-nl-btn:hover { opacity: .88; }

        /* Socials */
        .ft-socials { display: flex; gap: 8px; }

        .ft-social {
          width: 34px; height: 34px; border-radius: 9px;
          background: rgba(240,244,255,0.05);
          border: 1px solid rgba(240,244,255,0.07);
          display: flex; align-items: center; justify-content: center;
          color: #9aaabf; text-decoration: none;
          transition: all .18s;
        }

        .ft-social:hover {
          background: rgba(15,212,192,0.08);
          border-color: rgba(15,212,192,0.2);
          color: #0fd4c0; transform: translateY(-2px);
        }

        /* ── LINK COLUMNS ── */
        .ft-col-title {
          font-family: 'Cabinet Grotesk', sans-serif;
          font-size: 11.5px; font-weight: 700;
          letter-spacing: 1.2px; text-transform: uppercase;
          color: #f0f4ff; margin-bottom: 16px;
        }

        .ft-col-links {
          display: flex; flex-direction: column;
          gap: 10px; list-style: none;
        }

        .ft-col-links a {
          font-size: 13.5px; color: rgba(154,170,191,0.6);
          text-decoration: none; font-weight: 300;
          display: inline-flex; align-items: center; gap: 6px;
          transition: color .15s;
        }

        .ft-col-links a:hover { color: #f0f4ff; }

        .ft-new-badge {
          padding: 1px 7px; border-radius: 4px;
          background: rgba(15,212,192,0.1);
          border: 1px solid rgba(15,212,192,0.22);
          font-size: 9.5px; font-weight: 700;
          color: #0fd4c0; letter-spacing: 0.3px;
        }

        /* ── DIVIDER ── */
        .ft-divider {
          max-width: 1200px; margin: 0 auto;
          height: 1px; background: rgba(240,244,255,0.05);
          margin-left: 48px; margin-right: 48px;
        }

        /* ── BOTTOM BAR ── */
        .ft-bottom {
          max-width: 1200px; margin: 0 auto;
          padding: 18px 48px;
          display: flex; align-items: center;
          justify-content: space-between; gap: 16px; flex-wrap: wrap;
        }

        .ft-copy {
          font-size: 12.5px; color: rgba(154,170,191,0.38);
          font-weight: 300;
        }

        .ft-copy a { color: #0fd4c0; text-decoration: none; font-weight: 500; }
        .ft-copy a:hover { opacity: .8; }

        .ft-status {
          display: flex; align-items: center; gap: 7px;
          font-size: 12px; color: rgba(154,170,191,0.38);
        }

        .ft-status-dot {
          width: 6px; height: 6px; border-radius: 50%;
          background: #22c55e; box-shadow: 0 0 6px rgba(34,197,94,0.55);
          animation: stPulse 3s ease-in-out infinite;
        }

        @keyframes stPulse { 0%,100%{opacity:1} 50%{opacity:.35} }

        .ft-legal { display: flex; gap: 18px; flex-wrap: wrap; }

        .ft-legal a {
          font-size: 12px; color: rgba(154,170,191,0.35);
          text-decoration: none; transition: color .15s;
        }

        .ft-legal a:hover { color: rgba(154,170,191,0.75); }

        /* Scroll to top FAB */
        .ft-fab {
          position: fixed; bottom: 26px; right: 26px;
          width: 40px; height: 40px; border-radius: 50%;
          background: rgba(15,212,192,0.1);
          border: 1px solid rgba(15,212,192,0.22);
          display: flex; align-items: center; justify-content: center;
          color: #0fd4c0; text-decoration: none;
          transition: background .18s, transform .15s, box-shadow .18s;
          z-index: 100;
          box-shadow: 0 4px 16px rgba(0,0,0,0.2);
        }

        .ft-fab:hover {
          background: rgba(15,212,192,0.18);
          transform: translateY(-3px);
          box-shadow: 0 8px 20px rgba(15,212,192,0.22);
        }

        /* RESPONSIVE */
        @media (max-width: 1100px) {
          .ft-strip { padding: 22px 28px; }
          .ft-grid  { grid-template-columns: 1fr 1fr 1fr; padding: 40px 28px 32px; gap: 28px; }
          .ft-brand { grid-column: 1 / -1; }
          .ft-divider, .ft-bottom { margin-left: 28px; margin-right: 28px; padding-left: 0; padding-right: 0; }
        }

        @media (max-width: 680px) {
          .ft-grid { grid-template-columns: 1fr 1fr; }
          .ft-bottom { flex-direction: column; align-items: flex-start; gap: 10px; }
        }

        @media (max-width: 400px) {
          .ft-grid { grid-template-columns: 1fr; }
        }
      `}</style>

      <footer className="ft-root" id="top">

        {/* ── CTA STRIP ── */}
        <div className="ft-strip">
          <div className="ft-strip-inner">
            <div>
              <div className="ft-strip-headline">
                Ready to find your <span>next opportunity?</span>
              </div>
              <div className="ft-strip-sub">
                Join 2.1 million professionals — free, always.
              </div>
            </div>
            <div className="ft-strip-btns">
              <Link to="/Eereg" className="ft-btn-primary">
                Find Jobs
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/>
                </svg>
              </Link>
              <Link to="/Erreg" className="ft-btn-ghost">Post a Job →</Link>
            </div>
          </div>
        </div>

        {/* ── MAIN GRID ── */}
        <div className="ft-grid">

          {/* Brand */}
          <div className="ft-brand">
            <Link to="/" className="ft-logo">
              <span className="ft-logo-dot" />
              TalentBridge
            </Link>
            <p className="ft-tagline">
              Connecting ambitious professionals with companies that actually value what they bring.
            </p>

            {/* Newsletter */}
            <div className="ft-nl">
              <input type="email" placeholder="Your email…" className="ft-nl-input" />
              <button className="ft-nl-btn">Subscribe</button>
            </div>

            {/* Socials */}
            <div className="ft-socials">
              {socials.map(s => (
                <a key={s.label} href={s.href} className="ft-social" aria-label={s.label}>
                  {s.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Link columns */}
          {columns.map(col => (
            <div key={col.title}>
              <p className="ft-col-title">{col.title}</p>
              <ul className="ft-col-links">
                {col.links.map(l => (
                  <li key={l.label}>
                    {l.to ? (
                      <Link to={l.to}>
                        {l.label}
                        {l.badge && <span className="ft-new-badge">{l.badge}</span>}
                      </Link>
                    ) : (
                      <a href={l.href || "#"}>{l.label}</a>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="ft-divider" />

        {/* ── BOTTOM BAR ── */}
        <div className="ft-bottom">
          <p className="ft-copy">
            © {year} <Link to="/">TalentBridge</Link>. All rights reserved.
          </p>

          <div className="ft-status">
            <span className="ft-status-dot" />
            All systems operational
          </div>

          <div className="ft-legal">
            <a href="#">Privacy Policy</a>
            <a href="#">Terms of Service</a>
            <a href="#">Cookie Policy</a>
            <a href="#">Support</a>
          </div>
        </div>

        {/* Scroll to top */}
        <a href="#top" className="ft-fab" aria-label="Back to top">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <line x1="12" y1="19" x2="12" y2="5"/><polyline points="5 12 12 5 19 12"/>
          </svg>
        </a>

      </footer>
    </>
  );
};

export default Footer;