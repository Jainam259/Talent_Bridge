// import axios from "axios";
// import React, { useEffect, useRef, useState } from "react";
// import { Link, useNavigate, useParams } from "react-router-dom";

// const TYPE_CONFIG = {
//   "full-time":  { label: "Full Time",  color: "teal"   },
//   "part-time":  { label: "Part Time",  color: "amber"  },
//   "internship": { label: "Internship", color: "purple" },
//   "contract":   { label: "Contract",   color: "blue"   },
// };

// const getTypeConfig = (type = "") => {
//   const key = (type || "").toLowerCase().replace(" ", "-");
//   return TYPE_CONFIG[key] || { label: type, color: "teal" };
// };

// const LOGO_GRADIENTS = [
//   "linear-gradient(135deg,#0fd4c0,#0b9e8e)",
//   "linear-gradient(135deg,#f5a623,#c47d0a)",
//   "linear-gradient(135deg,#818cf8,#4f46e5)",
//   "linear-gradient(135deg,#f472b6,#db2777)",
// ];

// const getInitials = (str = "") =>
//   str.split(" ").slice(0, 2).map(w => w[0]?.toUpperCase()).join("") || "J";

// const Jobdetails = () => {
//   const { id }       = useParams();
//   const navigate     = useNavigate();
//   const fileInputRef = useRef(null);

//   const [job,       setJob]       = useState(null);
//   const [loading,   setLoading]   = useState(true);
//   const [file,      setFile]      = useState(null);
//   const [status,    setStatus]    = useState(null); // null | "submitting" | "success" | "error"
//   const [dragOver,  setDragOver]  = useState(false);
//   const [mounted,   setMounted]   = useState(false);

//   const storedUser = JSON.parse(localStorage.getItem("user"));

//   useEffect(() => {
//     const t = setTimeout(() => setMounted(true), 80);
//     return () => clearTimeout(t);
//   }, []);

//   useEffect(() => {
//     const fetchJobDetails = async () => {
//       try {
//         const res = await axios.get(`http://127.0.0.1:8000/jobs/api/jobs/${id}`);
//         setJob(res.data);
//       } catch (err) {
//         console.error(err);
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchJobDetails();
//   }, [id]);

//   const validateAndSetFile = (f) => {
//     if (!f) return;
//     if (f.type === "application/pdf") {
//       setFile(f);
//     } else {
//       alert("Please upload a valid PDF file.");
//     }
//   };

//   const handleFileChange = (e) => validateAndSetFile(e.target.files[0]);

//   const handleDrop = (e) => {
//     e.preventDefault();
//     setDragOver(false);
//     validateAndSetFile(e.dataTransfer.files[0]);
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (!file) return;
//     setStatus("submitting");

//     const data = new FormData();
//     data.append("file", file);
//     data.append("user", storedUser?.username || "");

//     try {
//       await axios.post(`http://127.0.0.1:8000/applications/api/apply/${id}/`, data, {
//         headers: { "Content-Type": "multipart/form-data" },
//       });
//       setStatus("success");
//       setTimeout(() => navigate("/job-listings-e"), 2200);
//     } catch (error) {
//       console.error("Error uploading file:", error);
//       setStatus("error");
//     }
//   };

//   const cfg      = getTypeConfig(job?.employment_type || job?.type);
//   const initials = getInitials(job?.company_name || job?.job_title);
//   const gradient = LOGO_GRADIENTS[(parseInt(id) || 0) % LOGO_GRADIENTS.length];

//   return (
//     <>
//       <style>{`
//         @import url('https://fonts.googleapis.com/css2?family=Cabinet+Grotesk:wght@400;500;700;800&family=Instrument+Serif:ital@0;1&family=Geist:wght@300;400;500&display=swap');

//         *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

//         :root {
//           --navy:       #0b1120;
//           --navy-mid:   #111827;
//           --navy-card:  #131e30;
//           --teal:       #0fd4c0;
//           --teal-dim:   rgba(15,212,192,0.1);
//           --amber:      #f5a623;
//           --amber-dim:  rgba(245,166,35,0.1);
//           --purple:     #818cf8;
//           --purple-dim: rgba(129,140,248,0.12);
//           --blue:       #60a5fa;
//           --blue-dim:   rgba(96,165,250,0.12);
//           --white:      #f0f4ff;
//           --white-soft: #9aaabf;
//           --white-dim:  rgba(240,244,255,0.05);
//           --border:     rgba(240,244,255,0.07);
//           --error:      #ff5e5e;
//         }

//         .jd-root {
//           background: var(--navy);
//           font-family: 'Geist', sans-serif;
//           color: var(--white);
//           min-height: 100vh;
//           padding-top: 64px;
//         }

//         /* ── PAGE BG ── */
//         .jd-bg {
//           position: fixed; inset: 0;
//           background:
//             radial-gradient(ellipse 60% 50% at 50% 0%, rgba(15,212,192,0.06) 0%, transparent 60%),
//             radial-gradient(ellipse 40% 40% at 90% 90%, rgba(245,166,35,0.04) 0%, transparent 60%);
//           pointer-events: none; z-index: 0;
//         }

//         .jd-grid-bg {
//           position: fixed; inset: 0;
//           background-image: radial-gradient(rgba(240,244,255,0.04) 1px, transparent 1px);
//           background-size: 36px 36px;
//           pointer-events: none; z-index: 0;
//           mask-image: radial-gradient(ellipse 90% 90% at 50% 30%, black 20%, transparent 100%);
//         }

//         /* ── LAYOUT ── */
//         .jd-content {
//           position: relative; z-index: 1;
//           max-width: 1100px;
//           margin: 0 auto;
//           padding: 52px 48px 80px;
//           display: grid;
//           grid-template-columns: 1fr 360px;
//           gap: 32px;
//           align-items: start;
//         }

//         /* ── BACK LINK ── */
//         .jd-back {
//           display: inline-flex; align-items: center; gap: 7px;
//           font-size: 13px; color: var(--white-soft);
//           text-decoration: none; margin-bottom: 28px;
//           transition: color .15s;
//         }
//         .jd-back:hover { color: var(--teal); }

//         /* ── MAIN CARD ── */
//         .jd-main-card {
//           background: var(--navy-card);
//           border: 1px solid var(--border);
//           border-radius: 20px;
//           overflow: hidden;
//           opacity: 0;
//           animation: jdIn .65s cubic-bezier(.22,1,.36,1) .1s forwards;
//         }

//         @keyframes jdIn {
//           from { opacity:0; transform:translateY(20px); }
//           to   { opacity:1; transform:translateY(0); }
//         }

//         /* Top accent */
//         .jd-card-top {
//           height: 3px;
//           background: linear-gradient(90deg, var(--teal), rgba(15,212,192,0.15));
//         }

//         /* Header */
//         .jd-header {
//           padding: 32px 36px 28px;
//           border-bottom: 1px solid var(--border);
//         }

//         .jd-header-row {
//           display: flex; align-items: flex-start; gap: 20px;
//         }

//         .jd-company-logo {
//           width: 64px; height: 64px;
//           border-radius: 16px;
//           display: flex; align-items: center; justify-content: center;
//           font-family: 'Cabinet Grotesk', sans-serif;
//           font-size: 18px; font-weight: 800;
//           color: #0b1120;
//           flex-shrink: 0;
//           box-shadow: 0 8px 24px rgba(0,0,0,0.3);
//         }

//         .jd-header-info { flex: 1; }

//         .jd-job-title {
//           font-family: 'Cabinet Grotesk', sans-serif;
//           font-size: clamp(22px, 3vw, 30px);
//           font-weight: 800;
//           color: var(--white);
//           letter-spacing: -0.8px;
//           line-height: 1.15;
//           margin-bottom: 6px;
//         }

//         .jd-company-name {
//           font-size: 15px; font-weight: 500;
//           color: var(--teal); margin-bottom: 14px;
//           display: flex; align-items: center; gap: 6px;
//         }

//         .jd-company-name svg { opacity: .6; }

//         /* Meta pills */
//         .jd-meta-row {
//           display: flex; align-items: center;
//           flex-wrap: wrap; gap: 8px;
//         }

//         .jd-meta-pill {
//           display: inline-flex; align-items: center; gap: 5px;
//           padding: 5px 12px;
//           background: var(--white-dim);
//           border: 1px solid var(--border);
//           border-radius: 100px;
//           font-size: 12.5px; color: var(--white-soft);
//         }

//         .jd-meta-pill svg { opacity: .6; }

//         .jd-type-badge {
//           padding: 5px 12px;
//           border-radius: 100px;
//           font-size: 12px; font-weight: 600;
//           letter-spacing: 0.3px;
//         }

//         .jd-type-teal   { background: var(--teal-dim);   border: 1px solid rgba(15,212,192,0.2);  color: var(--teal);   }
//         .jd-type-amber  { background: var(--amber-dim);  border: 1px solid rgba(245,166,35,0.2);  color: var(--amber);  }
//         .jd-type-purple { background: var(--purple-dim); border: 1px solid rgba(129,140,248,0.2); color: var(--purple); }
//         .jd-type-blue   { background: var(--blue-dim);   border: 1px solid rgba(96,165,250,0.2);  color: var(--blue);   }

//         /* Salary highlight */
//         .jd-salary-badge {
//           padding: 5px 12px;
//           background: rgba(245,166,35,0.07);
//           border: 1px solid rgba(245,166,35,0.18);
//           border-radius: 100px;
//           font-size: 12.5px; font-weight: 600;
//           color: var(--amber);
//           display: inline-flex; align-items: center; gap: 5px;
//         }

//         /* Body */
//         .jd-body { padding: 32px 36px; }

//         .jd-section { margin-bottom: 32px; }
//         .jd-section:last-child { margin-bottom: 0; }

//         .jd-section-title {
//           font-family: 'Cabinet Grotesk', sans-serif;
//           font-size: 15px; font-weight: 700;
//           color: var(--white);
//           margin-bottom: 14px;
//           display: flex; align-items: center; gap: 9px;
//         }

//         .jd-section-title::before {
//           content: '';
//           width: 16px; height: 2px;
//           background: var(--teal); border-radius: 2px;
//         }

//         .jd-desc-text {
//           font-size: 14.5px; line-height: 1.8;
//           color: var(--white-soft); font-weight: 300;
//           white-space: pre-wrap;
//         }

//         /* ── STICKY RIGHT PANEL ── */
//         .jd-right {
//           position: sticky; top: 84px;
//           opacity: 0;
//           animation: jdIn .65s cubic-bezier(.22,1,.36,1) .22s forwards;
//         }

//         .jd-apply-card {
//           background: var(--navy-card);
//           border: 1px solid var(--border);
//           border-radius: 20px;
//           overflow: hidden;
//           margin-bottom: 16px;
//         }

//         .jd-apply-top {
//           height: 3px;
//           background: linear-gradient(90deg, var(--teal), rgba(15,212,192,0.12));
//         }

//         .jd-apply-body { padding: 28px 28px 24px; }

//         .jd-apply-title {
//           font-family: 'Cabinet Grotesk', sans-serif;
//           font-size: 17px; font-weight: 800;
//           color: var(--white); margin-bottom: 4px;
//           letter-spacing: -0.3px;
//         }

//         .jd-apply-sub {
//           font-size: 13px; color: var(--white-soft);
//           font-weight: 300; margin-bottom: 22px;
//         }

//         /* File drop zone */
//         .jd-dropzone {
//           border: 2px dashed var(--border);
//           border-radius: 12px;
//           padding: 28px 16px;
//           text-align: center;
//           cursor: pointer;
//           transition: border-color .2s, background .2s;
//           margin-bottom: 16px;
//           position: relative;
//         }

//         .jd-dropzone:hover,
//         .jd-dropzone.drag { 
//           border-color: rgba(15,212,192,0.4);
//           background: rgba(15,212,192,0.04);
//         }

//         .jd-dropzone.has-file {
//           border-color: rgba(15,212,192,0.35);
//           background: rgba(15,212,192,0.04);
//         }

//         .jd-dz-icon {
//           width: 44px; height: 44px;
//           border-radius: 11px;
//           background: var(--teal-dim);
//           border: 1px solid rgba(15,212,192,0.15);
//           display: flex; align-items: center; justify-content: center;
//           color: var(--teal); margin: 0 auto 12px;
//         }

//         .jd-dz-title {
//           font-size: 13.5px; font-weight: 600;
//           color: var(--white); margin-bottom: 4px;
//         }

//         .jd-dz-sub {
//           font-size: 12px; color: var(--white-soft);
//           font-weight: 300;
//         }

//         .jd-dz-sub span {
//           color: var(--teal); font-weight: 500; cursor: pointer;
//         }

//         .jd-file-selected {
//           display: flex; align-items: center; gap: 10px;
//           padding: 10px 14px;
//           background: rgba(15,212,192,0.06);
//           border: 1px solid rgba(15,212,192,0.2);
//           border-radius: 10px;
//           margin-bottom: 16px;
//         }

//         .jd-file-icon {
//           width: 34px; height: 34px;
//           border-radius: 8px;
//           background: var(--teal-dim);
//           border: 1px solid rgba(15,212,192,0.15);
//           display: flex; align-items: center; justify-content: center;
//           color: var(--teal); flex-shrink: 0;
//         }

//         .jd-file-name {
//           font-size: 13px; font-weight: 500;
//           color: var(--white);
//           white-space: nowrap; overflow: hidden;
//           text-overflow: ellipsis; flex: 1;
//         }

//         .jd-file-remove {
//           background: none; border: none; cursor: pointer;
//           color: var(--white-soft); padding: 2px;
//           border-radius: 4px; flex-shrink: 0;
//           transition: color .15s;
//         }

//         .jd-file-remove:hover { color: var(--error); }

//         /* Submit button */
//         .jd-submit {
//           width: 100%; padding: 14px;
//           background: var(--teal); color: var(--navy);
//           font-family: 'Cabinet Grotesk', sans-serif;
//           font-size: 15px; font-weight: 800;
//           border: none; border-radius: 11px; cursor: pointer;
//           position: relative; overflow: hidden;
//           box-shadow: 0 6px 24px rgba(15,212,192,0.28);
//           transition: transform .15s, box-shadow .2s, opacity .15s;
//           display: flex; align-items: center; justify-content: center; gap: 8px;
//         }

//         .jd-submit::after {
//           content: '';
//           position: absolute; top:0; left:-100%;
//           width:50%; height:100%;
//           background: linear-gradient(90deg,transparent,rgba(255,255,255,0.22),transparent);
//           transform: skewX(-15deg);
//         }

//         .jd-submit:hover:not(:disabled)::after { animation: shine .55s ease forwards; }
//         @keyframes shine { from{left:-60%} to{left:160%} }

//         .jd-submit:hover:not(:disabled) {
//           transform: translateY(-1px);
//           box-shadow: 0 10px 32px rgba(15,212,192,0.38);
//         }

//         .jd-submit:disabled { opacity:.5; cursor:not-allowed; }

//         .jd-spinner {
//           width: 16px; height: 16px;
//           border: 2.5px solid rgba(11,17,32,.25);
//           border-top-color: var(--navy);
//           border-radius: 50%;
//           animation: spin .65s linear infinite;
//         }

//         @keyframes spin { to { transform: rotate(360deg); } }

//         /* Status messages */
//         .jd-status-box {
//           padding: 14px 16px;
//           border-radius: 11px;
//           font-size: 13.5px; font-weight: 500;
//           margin-bottom: 14px;
//           display: flex; align-items: center; gap: 10px;
//           animation: fadeIn .35s ease both;
//         }

//         @keyframes fadeIn { from{opacity:0;transform:translateY(6px)} to{opacity:1;transform:translateY(0)} }

//         .jd-status-box.success {
//           background: rgba(15,212,192,0.08);
//           border: 1px solid rgba(15,212,192,0.25);
//           color: var(--teal);
//         }

//         .jd-status-box.error {
//           background: rgba(255,94,94,0.07);
//           border: 1px solid rgba(255,94,94,0.2);
//           color: #ff8f8f;
//         }

//         /* Quick info card */
//         .jd-info-card {
//           background: var(--navy-card);
//           border: 1px solid var(--border);
//           border-radius: 16px;
//           padding: 20px 22px;
//         }

//         .jd-info-row {
//           display: flex; align-items: center; gap: 12px;
//           padding: 10px 0;
//           border-bottom: 1px solid var(--border);
//         }

//         .jd-info-row:last-child { border-bottom: none; padding-bottom: 0; }
//         .jd-info-row:first-child { padding-top: 0; }

//         .jd-info-icon {
//           width: 32px; height: 32px;
//           border-radius: 8px;
//           display: flex; align-items: center; justify-content: center;
//           flex-shrink: 0;
//         }

//         .jd-info-icon.teal {
//           background: var(--teal-dim);
//           border: 1px solid rgba(15,212,192,0.15);
//           color: var(--teal);
//         }

//         .jd-info-icon.amber {
//           background: var(--amber-dim);
//           border: 1px solid rgba(245,166,35,0.15);
//           color: var(--amber);
//         }

//         .jd-info-label { font-size: 11px; color: var(--white-soft); margin-bottom:1px; }
//         .jd-info-val   { font-size: 13.5px; font-weight: 600; color: var(--white); }

//         /* Loading skeleton */
//         .jd-skel-line {
//           height: 14px; border-radius: 7px;
//           background: var(--white-dim);
//           margin-bottom: 12px;
//           animation: shimmer 1.5s ease-in-out infinite;
//         }

//         @keyframes shimmer {
//           0%,100%{opacity:.7} 50%{opacity:.3}
//         }

//         /* RESPONSIVE */
//         @media (max-width:900px) {
//           .jd-content { grid-template-columns:1fr; padding:32px 24px 64px; }
//           .jd-right { position:static; }
//           .jd-header, .jd-body { padding:24px 24px; }
//           .jd-apply-body { padding:22px 22px 20px; }
//         }
//       `}</style>

//       <div className="jd-root">
//         <div className="jd-bg" />
//         <div className="jd-grid-bg" />

//         <div className="jd-content">

//           {/* ── LEFT: JOB DETAILS ── */}
//           <div>
//             <Link to="/job-listings-e" className="jd-back">
//               <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
//                 <line x1="19" y1="12" x2="5" y2="12"/><polyline points="12 19 5 12 12 5"/>
//               </svg>
//               Back to listings
//             </Link>

//             <div className="jd-main-card">
//               <div className="jd-card-top" />

//               {loading ? (
//                 <div style={{ padding: "36px" }}>
//                   <div className="jd-skel-line" style={{ width: "60%", height: 28 }} />
//                   <div className="jd-skel-line" style={{ width: "35%", height: 16 }} />
//                   <div className="jd-skel-line" style={{ width: "80%", height: 14, marginTop: 24 }} />
//                   <div className="jd-skel-line" style={{ width: "90%", height: 14 }} />
//                   <div className="jd-skel-line" style={{ width: "70%", height: 14 }} />
//                 </div>
//               ) : job ? (
//                 <>
//                   {/* Header */}
//                   <div className="jd-header">
//                     <div className="jd-header-row">
//                       <div className="jd-company-logo" style={{ background: gradient }}>
//                         {initials}
//                       </div>
//                       <div className="jd-header-info">
//                         <h1 className="jd-job-title">{job.job_title || job.title}</h1>
//                         <div className="jd-company-name">
//                           <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
//                             <rect x="2" y="7" width="20" height="14" rx="2"/><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/>
//                           </svg>
//                           {job.company_name || "Company"}
//                         </div>
//                         <div className="jd-meta-row">
//                           <span className={`jd-type-badge jd-type-${cfg.color}`}>{cfg.label}</span>

//                           {(job.job_location || job.location) && (
//                             <span className="jd-meta-pill">
//                               <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
//                                 <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/>
//                               </svg>
//                               {job.job_location || job.location}
//                             </span>
//                           )}

//                           {(job.salary_range || job.salary) && (
//                             <span className="jd-salary-badge">
//                               <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
//                                 <line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/>
//                               </svg>
//                               {job.salary_range || job.salary}
//                             </span>
//                           )}
//                         </div>
//                       </div>
//                     </div>
//                   </div>

//                   {/* Body */}
//                   <div className="jd-body">
//                     <div className="jd-section">
//                       <div className="jd-section-title">Job Description</div>
//                       <p className="jd-desc-text">
//                         {job.job_description || job.description || "No description provided."}
//                       </p>
//                     </div>

//                     {job.requirements && (
//                       <div className="jd-section">
//                         <div className="jd-section-title">Requirements</div>
//                         <p className="jd-desc-text">{job.requirements}</p>
//                       </div>
//                     )}

//                     {job.benefits && (
//                       <div className="jd-section">
//                         <div className="jd-section-title">Benefits</div>
//                         <p className="jd-desc-text">{job.benefits}</p>
//                       </div>
//                     )}
//                   </div>
//                 </>
//               ) : (
//                 <div style={{ padding: "48px", textAlign: "center", color: "var(--white-soft)" }}>
//                   Job not found.
//                 </div>
//               )}
//             </div>
//           </div>

//           {/* ── RIGHT: APPLY + INFO ── */}
//           <div className="jd-right">

//             {/* Apply card */}
//             <div className="jd-apply-card">
//               <div className="jd-apply-top" />
//               <div className="jd-apply-body">
//                 <div className="jd-apply-title">Apply for this role</div>
//                 <div className="jd-apply-sub">Upload your CV as a PDF to submit your application.</div>

//                 {/* Status messages */}
//                 {status === "success" && (
//                   <div className="jd-status-box success">
//                     <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
//                       <polyline points="20 6 9 17 4 12"/>
//                     </svg>
//                     Application submitted! Redirecting…
//                   </div>
//                 )}

//                 {status === "error" && (
//                   <div className="jd-status-box error">
//                     <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
//                       <circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/>
//                     </svg>
//                     Something went wrong. Please try again.
//                   </div>
//                 )}

//                 <form onSubmit={handleSubmit} encType="multipart/form-data">
//                   {/* Drop zone */}
//                   {!file ? (
//                     <div
//                       className={`jd-dropzone${dragOver ? " drag" : ""}`}
//                       onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
//                       onDragLeave={() => setDragOver(false)}
//                       onDrop={handleDrop}
//                       onClick={() => fileInputRef.current?.click()}
//                     >
//                       <div className="jd-dz-icon">
//                         <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
//                           <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
//                           <polyline points="17 8 12 3 7 8"/>
//                           <line x1="12" y1="3" x2="12" y2="15"/>
//                         </svg>
//                       </div>
//                       <div className="jd-dz-title">Drop your CV here</div>
//                       <div className="jd-dz-sub">
//                         or <span>browse files</span> · PDF only
//                       </div>
//                       <input
//                         ref={fileInputRef}
//                         type="file"
//                         accept="application/pdf"
//                         onChange={handleFileChange}
//                         style={{ display: "none" }}
//                       />
//                     </div>
//                   ) : (
//                     <div className="jd-file-selected">
//                       <div className="jd-file-icon">
//                         <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
//                           <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
//                           <polyline points="14 2 14 8 20 8"/>
//                         </svg>
//                       </div>
//                       <span className="jd-file-name">{file.name}</span>
//                       <button type="button" className="jd-file-remove" onClick={() => setFile(null)}>
//                         <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
//                           <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
//                         </svg>
//                       </button>
//                     </div>
//                   )}

//                   <button
//                     type="submit"
//                     className="jd-submit"
//                     disabled={!file || status === "submitting" || status === "success"}
//                   >
//                     {status === "submitting" ? (
//                       <><span className="jd-spinner" /> Submitting…</>
//                     ) : status === "success" ? (
//                       <>
//                         <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
//                           <polyline points="20 6 9 17 4 12"/>
//                         </svg>
//                         Applied!
//                       </>
//                     ) : (
//                       <>
//                         Apply Now
//                         <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
//                           <line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/>
//                         </svg>
//                       </>
//                     )}
//                   </button>
//                 </form>
//               </div>
//             </div>

//             {/* Quick info card */}
//             {job && (
//               <div className="jd-info-card">
//                 {[
//                   job.employment_type && {
//                     icon: <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="7" width="20" height="14" rx="2"/><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/></svg>,
//                     label: "Type", val: cfg.label, cls: "teal"
//                   },
//                   (job.job_location || job.location) && {
//                     icon: <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>,
//                     label: "Location", val: job.job_location || job.location, cls: "teal"
//                   },
//                   (job.salary_range || job.salary) && {
//                     icon: <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>,
//                     label: "Salary", val: job.salary_range || job.salary, cls: "amber"
//                   },
//                   job.company_name && {
//                     icon: <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>,
//                     label: "Company", val: job.company_name, cls: "amber"
//                   },
//                 ].filter(Boolean).map((item, i) => (
//                   <div className="jd-info-row" key={i}>
//                     <div className={`jd-info-icon ${item.cls}`}>{item.icon}</div>
//                     <div>
//                       <div className="jd-info-label">{item.label}</div>
//                       <div className="jd-info-val">{item.val}</div>
//                     </div>
//                   </div>
//                 ))}
//               </div>
//             )}
//           </div>

//         </div>
//       </div>
//     </>
//   );
// };

// export default Jobdetails;


import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

const TYPE_CONFIG = {
  "full-time":  { label: "Full Time",  color: "teal"   },
  "part-time":  { label: "Part Time",  color: "amber"  },
  "internship": { label: "Internship", color: "purple" },
  "contract":   { label: "Contract",   color: "blue"   },
};

const getTypeConfig = (type = "") => {
  const key = (type || "").toLowerCase().replace(" ", "-");
  return TYPE_CONFIG[key] || { label: type, color: "teal" };
};

const LOGO_GRADIENTS = [
  "linear-gradient(135deg,#0fd4c0,#0b9e8e)",
  "linear-gradient(135deg,#f5a623,#c47d0a)",
  "linear-gradient(135deg,#818cf8,#4f46e5)",
  "linear-gradient(135deg,#f472b6,#db2777)",
];

const getInitials = (str = "") =>
  str.split(" ").slice(0, 2).map(w => w[0]?.toUpperCase()).join("") || "J";

const Jobdetails = () => {
  const { id }       = useParams();
  const navigate     = useNavigate();
  const fileInputRef = useRef(null);

  const [job,       setJob]       = useState(null);
  const [loading,   setLoading]   = useState(true);
  const [file,      setFile]      = useState(null);
  const [status,    setStatus]    = useState(null); // null | "submitting" | "success" | "error"
  const [errorMsg,  setErrorMsg]  = useState("Something went wrong. Please try again.");
  const [dragOver,  setDragOver]  = useState(false);
  const [mounted,   setMounted]   = useState(false);

  const storedUser = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    const t = setTimeout(() => setMounted(true), 80);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    const fetchJobDetails = async () => {
      try {
        const res = await axios.get(`http://127.0.0.1:8000/jobs/api/jobs/${id}`);
        setJob(res.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchJobDetails();
  }, [id]);

  const validateAndSetFile = (f) => {
    if (!f) return;
    if (f.type === "application/pdf") {
      setFile(f);
    } else {
      alert("Please upload a valid PDF file.");
    }
  };

  const handleFileChange = (e) => validateAndSetFile(e.target.files[0]);

  const handleDrop = (e) => {
    e.preventDefault();
    setDragOver(false);
    validateAndSetFile(e.dataTransfer.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const username = storedUser?.username;
    if (!file) return;
    if (!username) { alert("You must be logged in to apply."); return; }
    setStatus("submitting");
    const data = new FormData();
    data.append("resume_url", file);
    data.append("user", username);
    try {
      await axios.post(`http://127.0.0.1:8000/applications/api/apply/${id}/`, data);
      setStatus("success");
      setTimeout(() => navigate("/job-listings-e"), 2200);
    } catch (error) {
      const msg = error?.response?.data?.error || "Something went wrong. Please try again.";
      console.error("Apply error:", msg);
      setErrorMsg(msg);
      setStatus("error");
    }
  };

  const cfg      = getTypeConfig(job?.employment_type || job?.type);
  const initials = getInitials(job?.company_name || job?.job_title);
  const gradient = LOGO_GRADIENTS[(parseInt(id) || 0) % LOGO_GRADIENTS.length];

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
          --error:      #ff5e5e;
        }

        .jd-root {
          background: var(--navy);
          font-family: 'Geist', sans-serif;
          color: var(--white);
          min-height: 100vh;
          padding-top: 64px;
        }

        /* ── PAGE BG ── */
        .jd-bg {
          position: fixed; inset: 0;
          background:
            radial-gradient(ellipse 60% 50% at 50% 0%, rgba(15,212,192,0.06) 0%, transparent 60%),
            radial-gradient(ellipse 40% 40% at 90% 90%, rgba(245,166,35,0.04) 0%, transparent 60%);
          pointer-events: none; z-index: 0;
        }

        .jd-grid-bg {
          position: fixed; inset: 0;
          background-image: radial-gradient(rgba(240,244,255,0.04) 1px, transparent 1px);
          background-size: 36px 36px;
          pointer-events: none; z-index: 0;
          mask-image: radial-gradient(ellipse 90% 90% at 50% 30%, black 20%, transparent 100%);
        }

        /* ── LAYOUT ── */
        .jd-content {
          position: relative; z-index: 1;
          max-width: 1100px;
          margin: 0 auto;
          padding: 52px 48px 80px;
          display: grid;
          grid-template-columns: 1fr 360px;
          gap: 32px;
          align-items: start;
        }

        /* ── BACK LINK ── */
        .jd-back {
          display: inline-flex; align-items: center; gap: 7px;
          font-size: 13px; color: var(--white-soft);
          text-decoration: none; margin-bottom: 28px;
          transition: color .15s;
        }
        .jd-back:hover { color: var(--teal); }

        /* ── MAIN CARD ── */
        .jd-main-card {
          background: var(--navy-card);
          border: 1px solid var(--border);
          border-radius: 20px;
          overflow: hidden;
          opacity: 0;
          animation: jdIn .65s cubic-bezier(.22,1,.36,1) .1s forwards;
        }

        @keyframes jdIn {
          from { opacity:0; transform:translateY(20px); }
          to   { opacity:1; transform:translateY(0); }
        }

        /* Top accent */
        .jd-card-top {
          height: 3px;
          background: linear-gradient(90deg, var(--teal), rgba(15,212,192,0.15));
        }

        /* Header */
        .jd-header {
          padding: 32px 36px 28px;
          border-bottom: 1px solid var(--border);
        }

        .jd-header-row {
          display: flex; align-items: flex-start; gap: 20px;
        }

        .jd-company-logo {
          width: 64px; height: 64px;
          border-radius: 16px;
          display: flex; align-items: center; justify-content: center;
          font-family: 'Cabinet Grotesk', sans-serif;
          font-size: 18px; font-weight: 800;
          color: #0b1120;
          flex-shrink: 0;
          box-shadow: 0 8px 24px rgba(0,0,0,0.3);
        }

        .jd-header-info { flex: 1; }

        .jd-job-title {
          font-family: 'Cabinet Grotesk', sans-serif;
          font-size: clamp(22px, 3vw, 30px);
          font-weight: 800;
          color: var(--white);
          letter-spacing: -0.8px;
          line-height: 1.15;
          margin-bottom: 6px;
        }

        .jd-company-name {
          font-size: 15px; font-weight: 500;
          color: var(--teal); margin-bottom: 14px;
          display: flex; align-items: center; gap: 6px;
        }

        .jd-company-name svg { opacity: .6; }

        /* Meta pills */
        .jd-meta-row {
          display: flex; align-items: center;
          flex-wrap: wrap; gap: 8px;
        }

        .jd-meta-pill {
          display: inline-flex; align-items: center; gap: 5px;
          padding: 5px 12px;
          background: var(--white-dim);
          border: 1px solid var(--border);
          border-radius: 100px;
          font-size: 12.5px; color: var(--white-soft);
        }

        .jd-meta-pill svg { opacity: .6; }

        .jd-type-badge {
          padding: 5px 12px;
          border-radius: 100px;
          font-size: 12px; font-weight: 600;
          letter-spacing: 0.3px;
        }

        .jd-type-teal   { background: var(--teal-dim);   border: 1px solid rgba(15,212,192,0.2);  color: var(--teal);   }
        .jd-type-amber  { background: var(--amber-dim);  border: 1px solid rgba(245,166,35,0.2);  color: var(--amber);  }
        .jd-type-purple { background: var(--purple-dim); border: 1px solid rgba(129,140,248,0.2); color: var(--purple); }
        .jd-type-blue   { background: var(--blue-dim);   border: 1px solid rgba(96,165,250,0.2);  color: var(--blue);   }

        /* Salary highlight */
        .jd-salary-badge {
          padding: 5px 12px;
          background: rgba(245,166,35,0.07);
          border: 1px solid rgba(245,166,35,0.18);
          border-radius: 100px;
          font-size: 12.5px; font-weight: 600;
          color: var(--amber);
          display: inline-flex; align-items: center; gap: 5px;
        }

        /* Body */
        .jd-body { padding: 32px 36px; }

        .jd-section { margin-bottom: 32px; }
        .jd-section:last-child { margin-bottom: 0; }

        .jd-section-title {
          font-family: 'Cabinet Grotesk', sans-serif;
          font-size: 15px; font-weight: 700;
          color: var(--white);
          margin-bottom: 14px;
          display: flex; align-items: center; gap: 9px;
        }

        .jd-section-title::before {
          content: '';
          width: 16px; height: 2px;
          background: var(--teal); border-radius: 2px;
        }

        .jd-desc-text {
          font-size: 14.5px; line-height: 1.8;
          color: var(--white-soft); font-weight: 300;
          white-space: pre-wrap;
        }

        /* ── STICKY RIGHT PANEL ── */
        .jd-right {
          position: sticky; top: 84px;
          opacity: 0;
          animation: jdIn .65s cubic-bezier(.22,1,.36,1) .22s forwards;
        }

        .jd-apply-card {
          background: var(--navy-card);
          border: 1px solid var(--border);
          border-radius: 20px;
          overflow: hidden;
          margin-bottom: 16px;
        }

        .jd-apply-top {
          height: 3px;
          background: linear-gradient(90deg, var(--teal), rgba(15,212,192,0.12));
        }

        .jd-apply-body { padding: 28px 28px 24px; }

        .jd-apply-title {
          font-family: 'Cabinet Grotesk', sans-serif;
          font-size: 17px; font-weight: 800;
          color: var(--white); margin-bottom: 4px;
          letter-spacing: -0.3px;
        }

        .jd-apply-sub {
          font-size: 13px; color: var(--white-soft);
          font-weight: 300; margin-bottom: 22px;
        }

        /* File drop zone */
        .jd-dropzone {
          border: 2px dashed var(--border);
          border-radius: 12px;
          padding: 28px 16px;
          text-align: center;
          cursor: pointer;
          transition: border-color .2s, background .2s;
          margin-bottom: 16px;
          position: relative;
        }

        .jd-dropzone:hover,
        .jd-dropzone.drag { 
          border-color: rgba(15,212,192,0.4);
          background: rgba(15,212,192,0.04);
        }

        .jd-dropzone.has-file {
          border-color: rgba(15,212,192,0.35);
          background: rgba(15,212,192,0.04);
        }

        .jd-dz-icon {
          width: 44px; height: 44px;
          border-radius: 11px;
          background: var(--teal-dim);
          border: 1px solid rgba(15,212,192,0.15);
          display: flex; align-items: center; justify-content: center;
          color: var(--teal); margin: 0 auto 12px;
        }

        .jd-dz-title {
          font-size: 13.5px; font-weight: 600;
          color: var(--white); margin-bottom: 4px;
        }

        .jd-dz-sub {
          font-size: 12px; color: var(--white-soft);
          font-weight: 300;
        }

        .jd-dz-sub span {
          color: var(--teal); font-weight: 500; cursor: pointer;
        }

        .jd-file-selected {
          display: flex; align-items: center; gap: 10px;
          padding: 10px 14px;
          background: rgba(15,212,192,0.06);
          border: 1px solid rgba(15,212,192,0.2);
          border-radius: 10px;
          margin-bottom: 16px;
        }

        .jd-file-icon {
          width: 34px; height: 34px;
          border-radius: 8px;
          background: var(--teal-dim);
          border: 1px solid rgba(15,212,192,0.15);
          display: flex; align-items: center; justify-content: center;
          color: var(--teal); flex-shrink: 0;
        }

        .jd-file-name {
          font-size: 13px; font-weight: 500;
          color: var(--white);
          white-space: nowrap; overflow: hidden;
          text-overflow: ellipsis; flex: 1;
        }

        .jd-file-remove {
          background: none; border: none; cursor: pointer;
          color: var(--white-soft); padding: 2px;
          border-radius: 4px; flex-shrink: 0;
          transition: color .15s;
        }

        .jd-file-remove:hover { color: var(--error); }

        /* Submit button */
        .jd-submit {
          width: 100%; padding: 14px;
          background: var(--teal); color: var(--navy);
          font-family: 'Cabinet Grotesk', sans-serif;
          font-size: 15px; font-weight: 800;
          border: none; border-radius: 11px; cursor: pointer;
          position: relative; overflow: hidden;
          box-shadow: 0 6px 24px rgba(15,212,192,0.28);
          transition: transform .15s, box-shadow .2s, opacity .15s;
          display: flex; align-items: center; justify-content: center; gap: 8px;
        }

        .jd-submit::after {
          content: '';
          position: absolute; top:0; left:-100%;
          width:50%; height:100%;
          background: linear-gradient(90deg,transparent,rgba(255,255,255,0.22),transparent);
          transform: skewX(-15deg);
        }

        .jd-submit:hover:not(:disabled)::after { animation: shine .55s ease forwards; }
        @keyframes shine { from{left:-60%} to{left:160%} }

        .jd-submit:hover:not(:disabled) {
          transform: translateY(-1px);
          box-shadow: 0 10px 32px rgba(15,212,192,0.38);
        }

        .jd-submit:disabled { opacity:.5; cursor:not-allowed; }

        .jd-spinner {
          width: 16px; height: 16px;
          border: 2.5px solid rgba(11,17,32,.25);
          border-top-color: var(--navy);
          border-radius: 50%;
          animation: spin .65s linear infinite;
        }

        @keyframes spin { to { transform: rotate(360deg); } }

        /* Status messages */
        .jd-status-box {
          padding: 14px 16px;
          border-radius: 11px;
          font-size: 13.5px; font-weight: 500;
          margin-bottom: 14px;
          display: flex; align-items: center; gap: 10px;
          animation: fadeIn .35s ease both;
        }

        @keyframes fadeIn { from{opacity:0;transform:translateY(6px)} to{opacity:1;transform:translateY(0)} }

        .jd-status-box.success {
          background: rgba(15,212,192,0.08);
          border: 1px solid rgba(15,212,192,0.25);
          color: var(--teal);
        }

        .jd-status-box.error {
          background: rgba(255,94,94,0.07);
          border: 1px solid rgba(255,94,94,0.2);
          color: #ff8f8f;
        }

        /* Quick info card */
        .jd-info-card {
          background: var(--navy-card);
          border: 1px solid var(--border);
          border-radius: 16px;
          padding: 20px 22px;
        }

        .jd-info-row {
          display: flex; align-items: center; gap: 12px;
          padding: 10px 0;
          border-bottom: 1px solid var(--border);
        }

        .jd-info-row:last-child { border-bottom: none; padding-bottom: 0; }
        .jd-info-row:first-child { padding-top: 0; }

        .jd-info-icon {
          width: 32px; height: 32px;
          border-radius: 8px;
          display: flex; align-items: center; justify-content: center;
          flex-shrink: 0;
        }

        .jd-info-icon.teal {
          background: var(--teal-dim);
          border: 1px solid rgba(15,212,192,0.15);
          color: var(--teal);
        }

        .jd-info-icon.amber {
          background: var(--amber-dim);
          border: 1px solid rgba(245,166,35,0.15);
          color: var(--amber);
        }

        .jd-info-label { font-size: 11px; color: var(--white-soft); margin-bottom:1px; }
        .jd-info-val   { font-size: 13.5px; font-weight: 600; color: var(--white); }

        /* Loading skeleton */
        .jd-skel-line {
          height: 14px; border-radius: 7px;
          background: var(--white-dim);
          margin-bottom: 12px;
          animation: shimmer 1.5s ease-in-out infinite;
        }

        @keyframes shimmer {
          0%,100%{opacity:.7} 50%{opacity:.3}
        }

        /* RESPONSIVE */
        @media (max-width:900px) {
          .jd-content { grid-template-columns:1fr; padding:32px 24px 64px; }
          .jd-right { position:static; }
          .jd-header, .jd-body { padding:24px 24px; }
          .jd-apply-body { padding:22px 22px 20px; }
        }
      `}</style>

      <div className="jd-root">
        <div className="jd-bg" />
        <div className="jd-grid-bg" />

        <div className="jd-content">

          {/* ── LEFT: JOB DETAILS ── */}
          <div>
            <Link to="/job-listings-e" className="jd-back">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <line x1="19" y1="12" x2="5" y2="12"/><polyline points="12 19 5 12 12 5"/>
              </svg>
              Back to listings
            </Link>

            <div className="jd-main-card">
              <div className="jd-card-top" />

              {loading ? (
                <div style={{ padding: "36px" }}>
                  <div className="jd-skel-line" style={{ width: "60%", height: 28 }} />
                  <div className="jd-skel-line" style={{ width: "35%", height: 16 }} />
                  <div className="jd-skel-line" style={{ width: "80%", height: 14, marginTop: 24 }} />
                  <div className="jd-skel-line" style={{ width: "90%", height: 14 }} />
                  <div className="jd-skel-line" style={{ width: "70%", height: 14 }} />
                </div>
              ) : job ? (
                <>
                  {/* Header */}
                  <div className="jd-header">
                    <div className="jd-header-row">
                      <div className="jd-company-logo" style={{ background: gradient }}>
                        {initials}
                      </div>
                      <div className="jd-header-info">
                        <h1 className="jd-job-title">{job.job_title || job.title}</h1>
                        <div className="jd-company-name">
                          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <rect x="2" y="7" width="20" height="14" rx="2"/><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/>
                          </svg>
                          {job.company_name || "Company"}
                        </div>
                        <div className="jd-meta-row">
                          <span className={`jd-type-badge jd-type-${cfg.color}`}>{cfg.label}</span>

                          {(job.job_location || job.location) && (
                            <span className="jd-meta-pill">
                              <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/>
                              </svg>
                              {job.job_location || job.location}
                            </span>
                          )}

                          {(job.salary_range || job.salary) && (
                            <span className="jd-salary-badge">
                              <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/>
                              </svg>
                              {job.salary_range || job.salary}
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Body */}
                  <div className="jd-body">
                    <div className="jd-section">
                      <div className="jd-section-title">Job Description</div>
                      <p className="jd-desc-text">
                        {job.job_description || job.description || "No description provided."}
                      </p>
                    </div>

                    {job.requirements && (
                      <div className="jd-section">
                        <div className="jd-section-title">Requirements</div>
                        <p className="jd-desc-text">{job.requirements}</p>
                      </div>
                    )}

                    {job.benefits && (
                      <div className="jd-section">
                        <div className="jd-section-title">Benefits</div>
                        <p className="jd-desc-text">{job.benefits}</p>
                      </div>
                    )}
                  </div>
                </>
              ) : (
                <div style={{ padding: "48px", textAlign: "center", color: "var(--white-soft)" }}>
                  Job not found.
                </div>
              )}
            </div>
          </div>

          {/* ── RIGHT: APPLY + INFO ── */}
          <div className="jd-right">

            {/* Apply card */}
            <div className="jd-apply-card">
              <div className="jd-apply-top" />
              <div className="jd-apply-body">
                <div className="jd-apply-title">Apply for this role</div>
                <div className="jd-apply-sub">Upload your CV as a PDF to submit your application.</div>

                {/* Status messages */}
                {status === "success" && (
                  <div className="jd-status-box success">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="20 6 9 17 4 12"/>
                    </svg>
                    Application submitted! Redirecting…
                  </div>
                )}

                {status === "error" && (
                  <div className="jd-status-box error">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/>
                    </svg>
                    {errorMsg}
                  </div>
                )}

                <form onSubmit={handleSubmit} encType="multipart/form-data">
                  {/* Drop zone */}
                  {!file ? (
                    <div
                      className={`jd-dropzone${dragOver ? " drag" : ""}`}
                      onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
                      onDragLeave={() => setDragOver(false)}
                      onDrop={handleDrop}
                      onClick={() => fileInputRef.current?.click()}
                    >
                      <div className="jd-dz-icon">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
                          <polyline points="17 8 12 3 7 8"/>
                          <line x1="12" y1="3" x2="12" y2="15"/>
                        </svg>
                      </div>
                      <div className="jd-dz-title">Drop your CV here</div>
                      <div className="jd-dz-sub">
                        or <span>browse files</span> · PDF only
                      </div>
                      <input
                        ref={fileInputRef}
                        type="file"
                        accept="application/pdf"
                        onChange={handleFileChange}
                        style={{ display: "none" }}
                      />
                    </div>
                  ) : (
                    <div className="jd-file-selected">
                      <div className="jd-file-icon">
                        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
                          <polyline points="14 2 14 8 20 8"/>
                        </svg>
                      </div>
                      <span className="jd-file-name">{file.name}</span>
                      <button type="button" className="jd-file-remove" onClick={() => setFile(null)}>
                        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                          <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
                        </svg>
                      </button>
                    </div>
                  )}

                  <button
                    type="submit"
                    className="jd-submit"
                    disabled={!file || status === "submitting" || status === "success"}
                  >
                    {status === "submitting" ? (
                      <><span className="jd-spinner" /> Submitting…</>
                    ) : status === "success" ? (
                      <>
                        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                          <polyline points="20 6 9 17 4 12"/>
                        </svg>
                        Applied!
                      </>
                    ) : (
                      <>
                        Apply Now
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                          <line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/>
                        </svg>
                      </>
                    )}
                  </button>
                </form>
              </div>
            </div>

            {/* Quick info card */}
            {job && (
              <div className="jd-info-card">
                {[
                  job.employment_type && {
                    icon: <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="7" width="20" height="14" rx="2"/><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/></svg>,
                    label: "Type", val: cfg.label, cls: "teal"
                  },
                  (job.job_location || job.location) && {
                    icon: <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>,
                    label: "Location", val: job.job_location || job.location, cls: "teal"
                  },
                  (job.salary_range || job.salary) && {
                    icon: <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>,
                    label: "Salary", val: job.salary_range || job.salary, cls: "amber"
                  },
                  job.company_name && {
                    icon: <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>,
                    label: "Company", val: job.company_name, cls: "amber"
                  },
                ].filter(Boolean).map((item, i) => (
                  <div className="jd-info-row" key={i}>
                    <div className={`jd-info-icon ${item.cls}`}>{item.icon}</div>
                    <div>
                      <div className="jd-info-label">{item.label}</div>
                      <div className="jd-info-val">{item.val}</div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

        </div>
      </div>
    </>
  );
};

export default Jobdetails;
