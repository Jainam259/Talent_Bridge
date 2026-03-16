import React, { useEffect, useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";

const Header = ({ user, setUser }) => {
  const navigate  = useNavigate();
  const location  = useLocation();
  const [userType, setUserType]     = useState(null);
  const [scrolled, setScrolled]     = useState(false);
  const [menuOpen, setMenuOpen]     = useState(false);
  const [regOpen,  setRegOpen]      = useState(false);

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (storedUser) setUserType(storedUser.type);
  }, [user]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close register dropdown on outside click
  useEffect(() => {
    const close = (e) => {
      if (!e.target.closest(".reg-dropdown")) setRegOpen(false);
    };
    document.addEventListener("mousedown", close);
    return () => document.removeEventListener("mousedown", close);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("access");
    localStorage.removeItem("refresh");
    localStorage.removeItem("user");
    setUser(null);
    navigate("/login");
  };

  const isActive = (path) => location.pathname === path;

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cabinet+Grotesk:wght@500;700;800&family=Geist:wght@300;400;500&display=swap');

        :root {
          --navy:       #0b1120;
          --navy-mid:   #111827;
          --teal:       #0fd4c0;
          --teal-dim:   rgba(15,212,192,0.12);
          --white:      #f0f4ff;
          --white-soft: #9aaabf;
          --white-dim:  rgba(240,244,255,0.06);
          --border:     rgba(240,244,255,0.08);
          --amber:      #f5a623;
        }

        /* ── HEADER ── */
        .tb-header {
          position: fixed;
          top: 0; left: 0; right: 0;
          z-index: 200;
          height: 64px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 0 48px;
          font-family: 'Geist', sans-serif;
          transition: background .3s ease, box-shadow .3s ease, border-color .3s ease;
          background: ${`rgba(11,17,32,0.75)`};
          backdrop-filter: blur(18px);
          border-bottom: 1px solid var(--border);
        }

        .tb-header.scrolled {
          background: rgba(11,17,32,0.97);
          box-shadow: 0 4px 32px rgba(0,0,0,0.35);
        }

        /* Logo */
        .tb-hd-logo {
          font-family: 'Cabinet Grotesk', sans-serif;
          font-weight: 800;
          font-size: 20px;
          color: var(--white);
          text-decoration: none;
          display: flex;
          align-items: center;
          gap: 9px;
          letter-spacing: -0.4px;
          flex-shrink: 0;
        }

        .tb-hd-logo-dot {
          width: 8px; height: 8px;
          border-radius: 50%;
          background: var(--teal);
          box-shadow: 0 0 10px var(--teal);
          flex-shrink: 0;
        }

        /* Nav links */
        .tb-hd-nav {
          display: flex;
          align-items: center;
          gap: 2px;
          list-style: none;
        }

        .tb-hd-nav a {
          padding: 7px 14px;
          border-radius: 8px;
          font-size: 13.5px;
          font-weight: 400;
          color: var(--white-soft);
          text-decoration: none;
          transition: color .18s, background .18s;
          position: relative;
        }

        .tb-hd-nav a:hover {
          color: var(--white);
          background: var(--white-dim);
        }

        .tb-hd-nav a.active {
          color: var(--white);
          background: var(--white-dim);
        }

        .tb-hd-nav a.active::after {
          content: '';
          position: absolute;
          bottom: 2px; left: 50%;
          transform: translateX(-50%);
          width: 16px; height: 2px;
          border-radius: 2px;
          background: var(--teal);
        }

        /* Right actions */
        .tb-hd-actions {
          display: flex;
          align-items: center;
          gap: 10px;
          flex-shrink: 0;
        }

        /* Ghost button */
        .tb-hd-ghost {
          padding: 8px 16px;
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
          gap: 6px;
          transition: border-color .18s, color .18s, background .18s;
          white-space: nowrap;
        }

        .tb-hd-ghost:hover {
          border-color: rgba(240,244,255,0.2);
          color: var(--white);
          background: var(--white-dim);
        }

        /* Teal primary button */
        .tb-hd-primary {
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
          gap: 6px;
          box-shadow: 0 4px 16px rgba(15,212,192,0.25);
          transition: opacity .18s, transform .15s, box-shadow .18s;
          white-space: nowrap;
        }

        .tb-hd-primary:hover {
          opacity: 0.9;
          transform: translateY(-1px);
          box-shadow: 0 8px 24px rgba(15,212,192,0.38);
        }

        /* Danger / logout */
        .tb-hd-logout {
          padding: 8px 16px;
          border: 1px solid rgba(255,94,94,0.2);
          border-radius: 9px;
          background: transparent;
          color: rgba(255,150,150,0.8);
          font-family: 'Geist', sans-serif;
          font-size: 13.5px;
          font-weight: 500;
          cursor: pointer;
          display: inline-flex;
          align-items: center;
          gap: 6px;
          transition: border-color .18s, color .18s, background .18s;
          white-space: nowrap;
        }

        .tb-hd-logout:hover {
          border-color: rgba(255,94,94,0.45);
          color: #ff9696;
          background: rgba(255,94,94,0.06);
        }

        /* User pill (logged in) */
        .tb-hd-userpill {
          display: flex;
          align-items: center;
          gap: 8px;
          padding: 5px 12px 5px 6px;
          background: var(--white-dim);
          border: 1px solid var(--border);
          border-radius: 100px;
          font-size: 13px;
          color: var(--white-soft);
        }

        .tb-hd-avatar {
          width: 28px; height: 28px;
          border-radius: 50%;
          background: linear-gradient(135deg, var(--teal), #0b9e8e);
          display: flex; align-items: center; justify-content: center;
          font-family: 'Cabinet Grotesk', sans-serif;
          font-size: 11px;
          font-weight: 700;
          color: var(--navy);
          flex-shrink: 0;
        }

        /* Register dropdown */
        .reg-dropdown {
          position: relative;
        }

        .reg-trigger {
          padding: 8px 16px;
          border: 1px solid var(--border);
          border-radius: 9px;
          background: transparent;
          color: var(--white-soft);
          font-family: 'Geist', sans-serif;
          font-size: 13.5px;
          font-weight: 500;
          cursor: pointer;
          display: inline-flex;
          align-items: center;
          gap: 7px;
          transition: border-color .18s, color .18s, background .18s;
          white-space: nowrap;
        }

        .reg-trigger:hover, .reg-trigger.open {
          border-color: rgba(240,244,255,0.2);
          color: var(--white);
          background: var(--white-dim);
        }

        .reg-trigger svg {
          transition: transform .2s ease;
        }

        .reg-trigger.open svg { transform: rotate(180deg); }

        .reg-menu {
          position: absolute;
          top: calc(100% + 8px);
          right: 0;
          min-width: 200px;
          background: #16202f;
          border: 1px solid var(--border);
          border-radius: 12px;
          padding: 6px;
          box-shadow: 0 16px 40px rgba(0,0,0,0.5);
          animation: dropIn .2s cubic-bezier(.22,1,.36,1) both;
          z-index: 300;
        }

        @keyframes dropIn {
          from { opacity: 0; transform: translateY(-8px) scale(0.97); }
          to   { opacity: 1; transform: translateY(0) scale(1); }
        }

        .reg-menu-item {
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 10px 14px;
          border-radius: 8px;
          text-decoration: none;
          transition: background .15s;
          cursor: pointer;
        }

        .reg-menu-item:hover { background: var(--white-dim); }

        .reg-menu-icon {
          width: 32px; height: 32px;
          border-radius: 8px;
          background: var(--teal-dim);
          border: 1px solid rgba(15,212,192,0.15);
          display: flex; align-items: center; justify-content: center;
          color: var(--teal);
          flex-shrink: 0;
        }

        .reg-menu-label {
          font-size: 13.5px;
          font-weight: 500;
          color: var(--white);
          margin-bottom: 1px;
        }

        .reg-menu-desc {
          font-size: 11px;
          color: var(--white-soft);
        }

        .reg-menu-divider {
          height: 1px;
          background: var(--border);
          margin: 4px 0;
        }

        /* Publish job badge */
        .tb-hd-publish {
          padding: 8px 16px;
          border: 1px solid rgba(15,212,192,0.25);
          border-radius: 9px;
          background: rgba(15,212,192,0.06);
          color: var(--teal);
          font-family: 'Geist', sans-serif;
          font-size: 13.5px;
          font-weight: 500;
          cursor: pointer;
          text-decoration: none;
          display: inline-flex;
          align-items: center;
          gap: 6px;
          transition: border-color .18s, background .18s;
          white-space: nowrap;
        }

        .tb-hd-publish:hover {
          border-color: rgba(15,212,192,0.5);
          background: rgba(15,212,192,0.1);
        }

        /* Mobile hamburger */
        .tb-hd-hamburger {
          display: none;
          background: none;
          border: none;
          cursor: pointer;
          color: var(--white-soft);
          padding: 4px;
        }

        /* Mobile menu */
        .tb-mobile-menu {
          display: none;
          position: fixed;
          top: 64px; left: 0; right: 0;
          background: #0e1829;
          border-bottom: 1px solid var(--border);
          padding: 16px 24px 24px;
          flex-direction: column;
          gap: 4px;
          z-index: 199;
          animation: slideDown .25s ease both;
        }

        @keyframes slideDown {
          from { opacity: 0; transform: translateY(-10px); }
          to   { opacity: 1; transform: translateY(0); }
        }

        .tb-mobile-menu.open { display: flex; }

        .tb-mobile-link {
          padding: 11px 14px;
          border-radius: 8px;
          font-size: 14px;
          color: var(--white-soft);
          text-decoration: none;
          transition: color .15s, background .15s;
          display: flex;
          align-items: center;
          gap: 8px;
        }

        .tb-mobile-link:hover, .tb-mobile-link.active {
          color: var(--white);
          background: var(--white-dim);
        }

        .tb-mobile-divider {
          height: 1px;
          background: var(--border);
          margin: 8px 0;
        }

        @media (max-width: 860px) {
          .tb-header { padding: 0 24px; }
          .tb-hd-nav { display: none; }
          .tb-hd-actions { display: none; }
          .tb-hd-hamburger { display: flex; }
        }
      `}</style>

      {/* ── HEADER ── */}
      <header className={`tb-header${scrolled ? ' scrolled' : ''}`}>

        {/* Logo */}
        <Link to="/" className="tb-hd-logo">
          <span className="tb-hd-logo-dot" />
          TalentBridge
        </Link>

        {/* Centre Nav */}
        <ul className="tb-hd-nav">
          <li><Link to="/"       className={isActive('/')        ? 'active' : ''}>Home</Link></li>
          <li><Link to="/about"  className={isActive('/about')   ? 'active' : ''}>About</Link></li>
          <li><Link to="/contact"className={isActive('/contact') ? 'active' : ''}>Contact</Link></li>

          {userType === "jobseeker" && <>
            <li><Link to="/job-listings-e"      className={isActive('/job-listings-e')      ? 'active' : ''}>Search Jobs</Link></li>
            <li><Link to="/EmployeeApplication" className={isActive('/EmployeeApplication') ? 'active' : ''}>Applied</Link></li>
          </>}

          {userType === "employer" && <>
            <li><Link to="/applied" className={isActive('/applied') ? 'active' : ''}>Posted Jobs</Link></li>
          </>}
        </ul>

        {/* Right actions */}
        <div className="tb-hd-actions">

          {/* ── LOGGED IN: Employer ── */}
          {user && userType === "employer" && <>
            <div className="tb-hd-userpill">
              <span className="tb-hd-avatar">
                {(user.username || user.email || "E")[0].toUpperCase()}
              </span>
              {user.username || user.email}
            </div>
            <Link to="/post-job" className="tb-hd-publish">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/>
              </svg>
              Post a Job
            </Link>
            <button onClick={handleLogout} className="tb-hd-logout">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/>
              </svg>
              Logout
            </button>
          </>}

          {/* ── LOGGED IN: Job Seeker ── */}
          {user && userType === "jobseeker" && <>
            <div className="tb-hd-userpill">
              <span className="tb-hd-avatar">
                {(user.username || user.email || "U")[0].toUpperCase()}
              </span>
              {user.username || user.email}
            </div>
            <button onClick={handleLogout} className="tb-hd-logout">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/>
              </svg>
              Logout
            </button>
          </>}

          {/* ── NOT LOGGED IN ── */}
          {!user && <>
            {/* Register dropdown */}
            <div className="reg-dropdown">
              <button
                className={`reg-trigger${regOpen ? ' open' : ''}`}
                onClick={() => setRegOpen(!regOpen)}
              >
                Register
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="6 9 12 15 18 9"/>
                </svg>
              </button>

              {regOpen && (
                <div className="reg-menu">
                  <Link
                    to="/Eereg"
                    className="reg-menu-item"
                    onClick={() => setRegOpen(false)}
                  >
                    <div className="reg-menu-icon">
                      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/>
                      </svg>
                    </div>
                    <div>
                      <div className="reg-menu-label">Job Seeker</div>
                      <div className="reg-menu-desc">Find & apply to jobs</div>
                    </div>
                  </Link>

                  <div className="reg-menu-divider" />

                  <Link
                    to="/Erreg"
                    className="reg-menu-item"
                    onClick={() => setRegOpen(false)}
                  >
                    <div className="reg-menu-icon">
                      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                        <rect x="2" y="7" width="20" height="14" rx="2"/><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/>
                      </svg>
                    </div>
                    <div>
                      <div className="reg-menu-label">Employer</div>
                      <div className="reg-menu-desc">Post jobs & hire talent</div>
                    </div>
                  </Link>
                </div>
              )}
            </div>

            <Link to="/login" className="tb-hd-primary">
              Log In
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/>
              </svg>
            </Link>
          </>}
        </div>

        {/* Mobile hamburger */}
        <button className="tb-hd-hamburger" onClick={() => setMenuOpen(!menuOpen)}>
          {menuOpen
            ? <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
            : <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="18" x2="21" y2="18"/></svg>
          }
        </button>
      </header>

      {/* Mobile Menu */}
      <div className={`tb-mobile-menu${menuOpen ? ' open' : ''}`}>
        <Link to="/"        className={`tb-mobile-link${isActive('/')        ? ' active' : ''}`} onClick={() => setMenuOpen(false)}>Home</Link>
        <Link to="/about"   className={`tb-mobile-link${isActive('/about')   ? ' active' : ''}`} onClick={() => setMenuOpen(false)}>About</Link>
        <Link to="/contact" className={`tb-mobile-link${isActive('/contact') ? ' active' : ''}`} onClick={() => setMenuOpen(false)}>Contact</Link>

        {userType === "jobseeker" && <>
          <Link to="/job-listings-e"      className="tb-mobile-link" onClick={() => setMenuOpen(false)}>Search Jobs</Link>
          <Link to="/EmployeeApplication" className="tb-mobile-link" onClick={() => setMenuOpen(false)}>Applied</Link>
        </>}

        {userType === "employer" && <>
          <Link to="/applied"  className="tb-mobile-link" onClick={() => setMenuOpen(false)}>Posted Jobs</Link>
          <Link to="/post-job" className="tb-mobile-link" onClick={() => setMenuOpen(false)}>+ Post a Job</Link>
        </>}

        <div className="tb-mobile-divider" />

        {user
          ? <button onClick={() => { handleLogout(); setMenuOpen(false); }} className="tb-mobile-link" style={{ border:'none', background:'none', cursor:'pointer', color:'rgba(255,150,150,0.8)', textAlign:'left' }}>Logout</button>
          : <>
              <Link to="/Eereg"  className="tb-mobile-link" onClick={() => setMenuOpen(false)}>Register as Job Seeker</Link>
              <Link to="/Erreg"  className="tb-mobile-link" onClick={() => setMenuOpen(false)}>Register as Employer</Link>
              <Link to="/login"  className="tb-mobile-link" onClick={() => setMenuOpen(false)} style={{ color:'var(--teal)', fontWeight:500 }}>Log In →</Link>
            </>
        }
      </div>
    </>
  );
};

export default Header;