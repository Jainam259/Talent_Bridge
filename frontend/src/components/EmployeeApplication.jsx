// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import { Link } from "react-router-dom";

// const STATUS_CONFIG = {
//   applied:     { label: "Applied",     color: "blue",   icon: "📨" },
//   interviewed: { label: "Interviewed", color: "amber",  icon: "💬" },
//   rejected:    { label: "Rejected",    color: "red",    icon: "✕"  },
//   hired:       { label: "Hired 🎉",    color: "teal",   icon: "✓"  },
// };

// const getStatus = (s = "") => STATUS_CONFIG[(s || "").toLowerCase()] || { label: s, color: "blue", icon: "•" };

// const GRADIENTS = [
//   "linear-gradient(135deg,#0fd4c0,#0b9e8e)",
//   "linear-gradient(135deg,#f5a623,#c47d0a)",
//   "linear-gradient(135deg,#818cf8,#4f46e5)",
//   "linear-gradient(135deg,#f472b6,#db2777)",
//   "linear-gradient(135deg,#34d399,#059669)",
//   "linear-gradient(135deg,#60a5fa,#2563eb)",
// ];

// const getInitials = (str = "") =>
//   str.split(" ").slice(0, 2).map(w => w[0]?.toUpperCase()).join("") || "J";

// const formatDate = (dateStr) => {
//   if (!dateStr) return "—";
//   try {
//     return new Date(dateStr).toLocaleDateString("en-IN", {
//       day: "numeric", month: "short", year: "numeric",
//     });
//   } catch { return dateStr; }
// };

// /* ── Status timeline steps ── */
// const STEPS = ["applied", "interviewed", "hired"];

// const StatusTimeline = ({ current }) => {
//   const cur = (current || "").toLowerCase();
//   const isRejected = cur === "rejected";
//   const activeIdx  = STEPS.indexOf(cur);

//   return (
//     <div className="ea-timeline">
//       {STEPS.map((step, i) => {
//         const done   = !isRejected && i <= activeIdx;
//         const active = !isRejected && i === activeIdx;
//         return (
//           <React.Fragment key={step}>
//             <div className={`ea-tl-step${done ? " done" : ""}${active ? " active" : ""}`}>
//               <div className="ea-tl-dot">
//                 {done && <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>}
//               </div>
//               <span className="ea-tl-label">{STATUS_CONFIG[step]?.label || step}</span>
//             </div>
//             {i < STEPS.length - 1 && (
//               <div className={`ea-tl-line${!isRejected && i < activeIdx ? " done" : ""}`} />
//             )}
//           </React.Fragment>
//         );
//       })}
//       {isRejected && (
//         <div className="ea-tl-rejected">
//           <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
//             <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
//           </svg>
//           Not moved forward
//         </div>
//       )}
//     </div>
//   );
// };

// /* ═══════════════════════════════════════════════════
//    ▼▼▼  APTITUDE ADDITIONS — nothing above changed  ▼▼▼
// ═══════════════════════════════════════════════════ */

// /* helpers */
// const isTodayExam = (dateStr) => {
//   if (!dateStr) return false;
//   return dateStr === new Date().toISOString().split("T")[0];
// };
// const daysUntil = (dateStr) => {
//   if (!dateStr) return null;
//   const t = new Date(); t.setHours(0,0,0,0);
//   const e = new Date(dateStr); e.setHours(0,0,0,0);
//   return Math.round((e - t) / 86400000);
// };
// const fmtTime = (s) =>
//   `${Math.floor(s/60).toString().padStart(2,"0")}:${(s%60).toString().padStart(2,"0")}`;

// /* countdown hook */
// const useCountdown = (totalSec, running) => {
//   const [t, setT] = useState(totalSec);
//   useEffect(() => {
//     if (!running || t <= 0) return;
//     const id = setInterval(() => setT(p => p - 1), 1000);
//     return () => clearInterval(id);
//   }, [running, t]);
//   return t;
// };

// /* ── Intro screen ── */
// const TestIntro = ({ test, onStart, onClose }) => {
//   const qs = test.questions || [];
//   return (
//     <div className="at-intro">
//       <button className="at-close-x" onClick={onClose}>✕</button>
//       <div className="at-intro-glow" />
//       <div className="at-intro-icon">
//         <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
//           <path d="M9 11l3 3L22 4"/><path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"/>
//         </svg>
//       </div>
//       <h2 className="at-intro-title">Aptitude Test</h2>
//       <p className="at-intro-job">{test.job_title}</p>

//       <div className="at-intro-grid">
//         {[
//           { icon:"⏱", val:`${test.exam_duration} min`, lbl:"Duration",    cls:"teal"   },
//           { icon:"📝", val:`${qs.length}`,              lbl:"Questions",   cls:"violet" },
//           { icon:"⭐", val:`${qs.length}`,              lbl:"Total Marks", cls:"amber"  },
//           { icon:"📅", val:test.schedule_date,          lbl:"Exam Date",   cls:"blue"   },
//         ].map((d,i) => (
//           <div className="at-info-card" key={i}>
//             <div className={`at-info-icon at-ic-${d.cls}`}>{d.icon}</div>
//             <div className="at-info-val">{d.val}</div>
//             <div className="at-info-lbl">{d.lbl}</div>
//           </div>
//         ))}
//       </div>

//       <div className="at-time-note">
//         🕐 Scheduled at <strong>{test.schedule_time}</strong> &nbsp;·&nbsp;
//         1 mark / correct answer &nbsp;·&nbsp; No negative marking
//       </div>

//       <div className="at-rules-box">
//         <div className="at-rules-title">INSTRUCTIONS</div>
//         {[
//           "Each question has exactly one correct answer",
//           "You cannot go back to a previous question",
//           "Test auto-submits when time expires",
//           "Ensure stable internet before starting",
//         ].map((r,i) => (
//           <div className="at-rule-row" key={i}>
//             <span className="at-rule-num">{i+1}</span>{r}
//           </div>
//         ))}
//       </div>

//       <button className="at-start-btn" onClick={onStart}>▶ Start Test Now</button>
//     </div>
//   );
// };

// /* ── Exam screen ── */
// const ExamScreen = ({ questions, duration, onSubmit }) => {
//   const [cur,  setCur]  = useState(0);
//   const [ans,  setAns]  = useState({});
//   const [run,  setRun]  = useState(true);
//   const [aKey, setAKey] = useState(0);
//   const timeLeft = useCountdown(duration * 60, run);
//   const isLow    = timeLeft <= 60;

//   useEffect(() => {
//     if (timeLeft === 0) { setRun(false); onSubmit(ans, questions); }
//   }, [timeLeft]);

//   const pick   = (i) => setAns(p => ({ ...p, [cur]: i }));
//   const goNext = ()  => { setAKey(k => k+1); setCur(c => c+1); };
//   const submit = ()  => { setRun(false); onSubmit(ans, questions); };

//   const q   = questions[cur];
//   const pct = Math.round(((cur+1) / questions.length) * 100);
//   const tPct= Math.round((timeLeft / (duration*60)) * 100);
//   const C   = 2 * Math.PI * 13;

//   return (
//     <div className="at-exam">
//       {/* top bar */}
//       <div className="at-exam-top">
//         <div className="at-prog-wrap">
//           <div className="at-prog"><div className="at-prog-fill" style={{width:`${pct}%`}}/></div>
//           <span className="at-qcount">{cur+1}<em>/{questions.length}</em></span>
//         </div>
//         <div className={`at-timer${isLow?" at-timer-low":""}`}>
//           <svg width="34" height="34" viewBox="0 0 34 34" className="at-timer-svg">
//             <circle cx="17" cy="17" r="13" fill="none" stroke="rgba(240,244,255,0.07)" strokeWidth="2.5"/>
//             <circle cx="17" cy="17" r="13" fill="none"
//               stroke={isLow?"#ff5e5e":"#818cf8"} strokeWidth="2.5"
//               strokeDasharray={C} strokeDashoffset={C*(1-tPct/100)}
//               strokeLinecap="round"
//               style={{transform:"rotate(-90deg)",transformOrigin:"50% 50%",transition:"stroke-dashoffset 1s linear"}}
//             />
//           </svg>
//           <span>{fmtTime(timeLeft)}</span>
//         </div>
//       </div>

//       {/* dot nav */}
//       <div className="at-dots">
//         {questions.map((_,i) => (
//           <div key={i} className={`at-dot${i===cur?" at-dot-cur":""}${ans[i]!==undefined?" at-dot-done":""}`}/>
//         ))}
//       </div>

//       {/* question card */}
//       <div className="at-qcard" key={aKey}>
//         <div className="at-qnum">Question {cur+1} <span>of {questions.length}</span></div>
//         <div className="at-qtext">{q.question}</div>
//         <div className="at-opts">
//           {q.options.map((opt,i) => {
//             const sel = ans[cur] === i;
//             return (
//               <button key={i} className={`at-opt${sel?" at-opt-sel":""}`} onClick={() => pick(i)}>
//                 <span className="at-opt-letter">{String.fromCharCode(65+i)}</span>
//                 <span className="at-opt-txt">{opt}</span>
//                 {sel && <span className="at-opt-check">✓</span>}
//               </button>
//             );
//           })}
//         </div>
//       </div>

//       {/* footer */}
//       <div className="at-exam-foot">
//         <div className="at-answered">
//           <div className="at-ans-bar"><div className="at-ans-fill" style={{width:`${Math.round(Object.keys(ans).length/questions.length*100)}%`}}/></div>
//           <span>{Object.keys(ans).length}/{questions.length} answered</span>
//         </div>
//         {cur < questions.length-1
//           ? <button className="at-btn-next" onClick={goNext} disabled={ans[cur]===undefined}>Next →</button>
//           : <button className="at-btn-submit" onClick={submit}>Submit ✓</button>
//         }
//       </div>
//     </div>
//   );
// };

// /* ── Result screen ── */
// const ResultScreen = ({ answers, questions, onClose }) => {
//   const score  = questions.reduce((a,q,i) => a + (answers[i]===q.answer?1:0), 0);
//   const total  = questions.length;
//   const pct    = Math.round(score/total*100);
//   const wrong  = questions.reduce((a,_,i)=>a+(answers[i]!==undefined&&answers[i]!==questions[i].answer?1:0),0);
//   const skip   = questions.reduce((a,_,i)=>a+(answers[i]===undefined?1:0),0);
//   const grade  = pct>=80?"Excellent":pct>=60?"Good":pct>=40?"Average":"Needs Work";
//   const gcls   = pct>=80?"teal":pct>=60?"amber":pct>=40?"blue":"red";
//   const C      = 2*Math.PI*54;

//   return (
//     <div className="at-result">
//       <div className="at-result-ring">
//         <svg width="130" height="130" viewBox="0 0 130 130">
//           <circle cx="65" cy="65" r="54" fill="none" stroke="rgba(240,244,255,0.06)" strokeWidth="9"/>
//           <circle cx="65" cy="65" r="54" fill="none"
//             stroke={pct>=80?"#0fd4c0":pct>=60?"#f5a623":pct>=40?"#60a5fa":"#ff5e5e"}
//             strokeWidth="9" strokeLinecap="round"
//             strokeDasharray={C} strokeDashoffset={C*(1-pct/100)}
//             style={{transform:"rotate(-90deg)",transformOrigin:"50% 50%",transition:"stroke-dashoffset 1.3s cubic-bezier(.22,1,.36,1)"}}
//           />
//         </svg>
//         <div className="at-result-center">
//           <div className="at-result-score">{score}<span>/{total}</span></div>
//           <div className="at-result-pct">{pct}%</div>
//         </div>
//       </div>

//       <div className={`at-grade at-grade-${gcls}`}>{grade}</div>
//       <h2 className="at-result-title">Test Complete!</h2>
//       <p className="at-result-sub">{score} correct · {wrong} wrong · {skip} skipped</p>

//       <div className="at-score-strip">
//         {[
//           {val:score, lbl:"Correct",   cls:"teal"  },
//           {val:wrong, lbl:"Wrong",     cls:"red"   },
//           {val:skip,  lbl:"Skipped",   cls:"soft"  },
//           {val:`${score}/${total}`, lbl:"Marks", cls:"violet"},
//         ].map((s,i,arr) => (
//           <React.Fragment key={i}>
//             <div className="at-ss-item">
//               <div className={`at-ss-val at-ss-${s.cls}`}>{s.val}</div>
//               <div className="at-ss-lbl">{s.lbl}</div>
//             </div>
//             {i<arr.length-1 && <div className="at-ss-div"/>}
//           </React.Fragment>
//         ))}
//       </div>

//       <div className="at-review">
//         <div className="at-review-hdr">Answer Review</div>
//         {questions.map((q,i) => {
//           const ua=answers[i], ca=q.answer, ok=ua===ca;
//           return (
//             <div key={i} className={`at-rev-row${ok?" at-rev-ok":" at-rev-bad"}`}>
//               <div className="at-rev-icon">{ok?"✓":"✕"}</div>
//               <div className="at-rev-body">
//                 <div className="at-rev-q">Q{i+1}: {q.question}</div>
//                 <div className="at-rev-ans">
//                   {ua===undefined && <span className="at-rev-skip">Skipped</span>}
//                   {ua!==undefined && !ok && <span className="at-rev-wrong">{q.options[ua]}</span>}
//                   {!ok && <span className="at-rev-right">✓ {q.options[ca]}</span>}
//                   {ok  && <span className="at-rev-right">✓ Correct</span>}
//                 </div>
//               </div>
//             </div>
//           );
//         })}
//       </div>

//       <button className="at-done-btn" onClick={onClose}>Close</button>
//     </div>
//   );
// };

// /* ── Modal shell ── */
// const AptitudeModal = ({ test, onClose }) => {
//   const [phase, setPhase] = useState("intro");
//   const [final, setFinal] = useState(null);
//   const qs = test.questions || [];

//   return (
//     <>
//       <div className="at-overlay" onClick={phase==="intro"?onClose:undefined}/>
//       <div className={`at-shell${phase==="exam"?" at-shell-wide":""}`}>
//         {phase==="intro"  && <TestIntro   test={test} onStart={()=>setPhase("exam")} onClose={onClose}/>}
//         {phase==="exam"   && <ExamScreen  questions={qs} duration={test.exam_duration||25} onSubmit={(a,q)=>{setFinal({a,q});setPhase("result");}}/>}
//         {phase==="result" && <ResultScreen answers={final.a} questions={final.q} onClose={onClose}/>}
//       </div>
//     </>
//   );
// };

// /* ── Aptitude banner on card ── */
// const AptitudeBanner = ({ test, onTake }) => {
//   const isToday = isTodayExam(test.schedule_date);
//   const days    = daysUntil(test.schedule_date);
//   const isPast  = days !== null && days < 0;
//   const qs      = test.questions || [];

//   return (
//     <div className={`ea-at-banner${isToday?" ea-at-today":isPast?" ea-at-past":""}`}>
//       <div className="ea-at-top">
//         <div className="ea-at-left">
//           <div className={`ea-at-icon${isToday?" ea-at-icon-today":""}`}>
//             <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
//               <path d="M9 11l3 3L22 4"/><path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"/>
//             </svg>
//             {isToday && <span className="ea-at-live"/>}
//           </div>
//           <div>
//             <div className="ea-at-label">
//               Aptitude Test
//               {isToday && <span className="ea-at-chip ea-chip-today">Today</span>}
//               {!isToday && !isPast && days!==null && <span className="ea-at-chip ea-chip-soon">{days}d away</span>}
//               {isPast   && <span className="ea-at-chip ea-chip-past">Expired</span>}
//             </div>
//             <div className="ea-at-date">
//               📅 {formatDate(test.schedule_date)} &nbsp;·&nbsp; 🕐 {test.schedule_time}
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Stats row */}
//       <div className="ea-at-stats">
//         <div className="ea-at-stat"><span className="ea-at-stat-val">{test.exam_duration}</span><span className="ea-at-stat-lbl">Minutes</span></div>
//         <div className="ea-at-sdiv"/>
//         <div className="ea-at-stat"><span className="ea-at-stat-val">{qs.length}</span><span className="ea-at-stat-lbl">Questions</span></div>
//         <div className="ea-at-sdiv"/>
//         <div className="ea-at-stat"><span className="ea-at-stat-val">{qs.length}</span><span className="ea-at-stat-lbl">Total Marks</span></div>
//         <div className="ea-at-sdiv"/>
//         <div className="ea-at-stat"><span className="ea-at-stat-val">1</span><span className="ea-at-stat-lbl">Mark/Q</span></div>
//       </div>

//       {/* CTA */}
//       <div className="ea-at-cta">
//         {isToday
//           ? <button className="ea-at-btn-active" onClick={() => onTake(test)}>▶ Start Exam Now</button>
//           : isPast
//             ? <div className="ea-at-locked ea-at-locked-past">🚫 Exam window has passed</div>
//             : <div className="ea-at-locked">🔒 Available on {formatDate(test.schedule_date)}</div>
//         }
//       </div>
//     </div>
//   );
// };

// /* ▲▲▲  END APTITUDE ADDITIONS  ▲▲▲ */

// /* ═══════════════════════════
//    APPLICATION CARD
// ═══════════════════════════ */
// const AppCard = ({ application, index, onTakeTest }) => {
//   const st       = getStatus(application.status);
//   const initials = getInitials(application.companyName || application.jobTitle);
//   const gradient = GRADIENTS[index % GRADIENTS.length];

//   return (
//     <div className="ea-card" style={{ animationDelay: `${index * 0.07}s` }}>
//       <div className="ea-card-accent" />

//       {/* Header */}
//       <div className="ea-card-header">
//         <div className="ea-card-logo" style={{ background: gradient }}>{initials}</div>
//         <div className="ea-card-header-info">
//           <h3 className="ea-card-title">{application.jobTitle || "Job Title"}</h3>
//           <div className="ea-card-company">
//             <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
//               <rect x="2" y="7" width="20" height="14" rx="2"/><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/>
//             </svg>
//             {application.companyName || "Company"}
//           </div>
//         </div>
//         <span className={`ea-status-badge ea-status-${st.color}`}>{st.label}</span>
//       </div>

//       {/* Meta row */}
//       <div className="ea-meta-row">
//         <span className="ea-meta-pill">
//           <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
//             <rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/>
//           </svg>
//           Applied {formatDate(application.applicationDate)}
//         </span>
//         {application.jobType && (
//           <span className="ea-meta-pill">
//             <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
//               <circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>
//             </svg>
//             {application.jobType}
//           </span>
//         )}
//       </div>

//       {/* Timeline */}
//       <StatusTimeline current={application.status} />

//       {/* Aptitude banner — only added here, nothing else changed */}
//       {application.aptitude_test && (
//         <AptitudeBanner test={application.aptitude_test} onTake={onTakeTest} />
//       )}
//     </div>
//   );
// };

// /* ═══════════════════════════
//    MAIN PAGE
// ═══════════════════════════ */
// const EmployeeApplication = () => {
//   const [applications, setApplications] = useState([]);
//   const [loading,      setLoading]      = useState(true);
//   const [filter,       setFilter]       = useState("all");
//   const [mounted,      setMounted]      = useState(false);
//   const [activeTest,   setActiveTest]   = useState(null); // ← added for modal

//   const user = JSON.parse(localStorage.getItem("user"));

//   useEffect(() => {
//     const t = setTimeout(() => setMounted(true), 80);
//     return () => clearTimeout(t);
//   }, []);

//   useEffect(() => {
//     const fetchApplications = async () => {
//       if (!user?.username) { setLoading(false); return; }
//       try {
//         const res = await axios.get(
//           `http://127.0.0.1:8000/applications/api/applied/?user=${user.username}`
//         );
//         setApplications(res.data);
//       } catch (err) {
//         console.error("Error fetching applications:", err);
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchApplications();
//   }, []);

//   const statusCounts = applications.reduce((acc, a) => {
//     const k = (a.status || "").toLowerCase();
//     acc[k] = (acc[k] || 0) + 1;
//     return acc;
//   }, {});

//   const filtered = filter === "all"
//     ? applications
//     : applications.filter(a => (a.status || "").toLowerCase() === filter);

//   const filterTabs = [
//     { key: "all",         label: "All",         count: applications.length },
//     { key: "applied",     label: "Applied",      count: statusCounts.applied     || 0 },
//     { key: "interviewed", label: "Interviewed",  count: statusCounts.interviewed || 0 },
//     { key: "hired",       label: "Hired",        count: statusCounts.hired       || 0 },
//     { key: "rejected",    label: "Rejected",     count: statusCounts.rejected    || 0 },
//   ];

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
//           --red:        #ff5e5e;
//           --red-dim:    rgba(255,94,94,0.1);
//           --blue:       #60a5fa;
//           --blue-dim:   rgba(96,165,250,0.12);
//           --violet:     #818cf8;
//           --violet-dim: rgba(129,140,248,0.12);
//           --white:      #f0f4ff;
//           --white-soft: #9aaabf;
//           --white-dim:  rgba(240,244,255,0.05);
//           --border:     rgba(240,244,255,0.07);
//         }

//         .ea-root {
//           background: var(--navy);
//           font-family: 'Geist', sans-serif;
//           color: var(--white);
//           min-height: 100vh;
//         }

//         /* ── HERO ── */
//         .ea-hero {
//           position: relative;
//           padding: 130px 48px 60px;
//           overflow: hidden;
//         }

//         .ea-hero::before {
//           content: '';
//           position: absolute; inset: 0;
//           background:
//             radial-gradient(ellipse 60% 55% at 50% 0%, rgba(15,212,192,0.07) 0%, transparent 65%);
//           pointer-events: none;
//         }

//         .ea-hero::after {
//           content: '';
//           position: absolute; inset: 0;
//           background-image: radial-gradient(rgba(240,244,255,0.045) 1px, transparent 1px);
//           background-size: 36px 36px;
//           pointer-events: none;
//           mask-image: radial-gradient(ellipse 80% 80% at 50% 30%, black 20%, transparent 100%);
//         }

//         .ea-hero-inner {
//           position: relative; z-index: 1;
//           max-width: 1200px; margin: 0 auto;
//           display: flex; align-items: flex-end;
//           justify-content: space-between; gap: 24px;
//           flex-wrap: wrap;
//           opacity: 0;
//           animation: eaFadeUp .65s cubic-bezier(.22,1,.36,1) .08s forwards;
//         }

//         @keyframes eaFadeUp {
//           from { opacity:0; transform:translateY(16px); }
//           to   { opacity:1; transform:translateY(0); }
//         }

//         .ea-badge {
//           display: inline-flex; align-items: center; gap: 7px;
//           padding: 5px 13px 5px 9px;
//           background: rgba(15,212,192,0.07);
//           border: 1px solid rgba(15,212,192,0.17);
//           border-radius: 100px;
//           font-size: 12px; font-weight: 500;
//           color: var(--teal); margin-bottom: 16px;
//         }

//         .ea-badge-dot {
//           width: 6px; height: 6px; border-radius: 50%;
//           background: var(--teal); box-shadow: 0 0 6px var(--teal);
//           animation: bdPulse 2s ease-in-out infinite;
//         }

//         @keyframes bdPulse { 0%,100%{opacity:1;transform:scale(1)} 50%{opacity:.4;transform:scale(.7)} }

//         .ea-hero-title {
//           font-family: 'Cabinet Grotesk', sans-serif;
//           font-size: clamp(32px, 4.5vw, 52px);
//           font-weight: 800;
//           color: var(--white);
//           letter-spacing: -1.5px;
//           line-height: 1.1;
//           margin-bottom: 10px;
//         }

//         .ea-hero-title em {
//           font-family: 'Instrument Serif', serif;
//           font-style: italic; font-weight: 400;
//           color: var(--teal); letter-spacing: -1.5px;
//         }

//         .ea-hero-sub {
//           font-size: 15px; line-height: 1.65;
//           color: var(--white-soft); font-weight: 300;
//         }

//         .ea-hero-cta {
//           display: inline-flex; align-items: center; gap: 7px;
//           padding: 12px 22px;
//           background: var(--teal); color: var(--navy);
//           font-family: 'Cabinet Grotesk', sans-serif;
//           font-size: 13.5px; font-weight: 800;
//           border-radius: 10px; text-decoration: none;
//           box-shadow: 0 6px 20px rgba(15,212,192,0.28);
//           transition: transform .15s, box-shadow .2s;
//           white-space: nowrap; flex-shrink: 0;
//         }

//         .ea-hero-cta:hover {
//           transform: translateY(-1px);
//           box-shadow: 0 10px 28px rgba(15,212,192,0.38);
//         }

//         /* ── STATS STRIP ── */
//         .ea-stats {
//           max-width: 1200px; margin: 0 auto;
//           padding: 0 48px 32px;
//           display: flex; gap: 14px; flex-wrap: wrap;
//         }

//         .ea-stat-pill {
//           display: flex; align-items: center; gap: 10px;
//           padding: 12px 18px;
//           background: var(--navy-card);
//           border: 1px solid var(--border);
//           border-radius: 12px;
//           transition: border-color .2s;
//         }

//         .ea-stat-pill:hover { border-color: rgba(15,212,192,0.2); }

//         .ea-stat-icon {
//           width: 32px; height: 32px; border-radius: 8px;
//           display: flex; align-items: center; justify-content: center;
//           flex-shrink: 0;
//         }

//         .ea-stat-icon.teal  { background: var(--teal-dim);  border:1px solid rgba(15,212,192,0.15); color:var(--teal);  }
//         .ea-stat-icon.amber { background: var(--amber-dim); border:1px solid rgba(245,166,35,0.15); color:var(--amber); }
//         .ea-stat-icon.blue  { background: var(--blue-dim);  border:1px solid rgba(96,165,250,0.15); color:var(--blue);  }
//         .ea-stat-icon.red   { background: var(--red-dim);   border:1px solid rgba(255,94,94,0.15);  color:var(--red);   }

//         .ea-stat-val {
//           font-family: 'Cabinet Grotesk', sans-serif;
//           font-size: 20px; font-weight: 800;
//           color: var(--white); line-height: 1;
//           margin-bottom: 1px;
//         }

//         .ea-stat-lbl { font-size: 11.5px; color: var(--white-soft); }

//         /* ── FILTER TABS ── */
//         .ea-tabs-wrap {
//           max-width: 1200px; margin: 0 auto;
//           padding: 0 48px 24px;
//         }

//         .ea-tabs {
//           display: flex; gap: 6px; flex-wrap: wrap;
//         }

//         .ea-tab {
//           display: inline-flex; align-items: center; gap: 7px;
//           padding: 8px 16px;
//           border-radius: 9px;
//           font-size: 13.5px; font-weight: 500;
//           cursor: pointer; border: 1px solid var(--border);
//           background: transparent; color: var(--white-soft);
//           transition: border-color .15s, color .15s, background .15s;
//           user-select: none;
//         }

//         .ea-tab:hover { border-color: rgba(240,244,255,0.18); color: var(--white); }

//         .ea-tab.active {
//           background: var(--teal-dim);
//           border-color: rgba(15,212,192,0.25);
//           color: var(--white);
//         }

//         .ea-tab-count {
//           padding: 2px 7px;
//           border-radius: 100px;
//           font-size: 11px; font-weight: 600;
//           background: var(--white-dim);
//           color: var(--white-soft);
//         }

//         .ea-tab.active .ea-tab-count {
//           background: rgba(15,212,192,0.15);
//           color: var(--teal);
//         }

//         /* ── GRID ── */
//         .ea-grid-wrap {
//           max-width: 1200px; margin: 0 auto;
//           padding: 0 48px 80px;
//         }

//         .ea-grid {
//           display: grid;
//           grid-template-columns: repeat(3, 1fr);
//           gap: 18px;
//         }

//         /* ── APP CARD ── */
//         .ea-card {
//           background: var(--navy-card);
//           border: 1px solid var(--border);
//           border-radius: 18px;
//           overflow: hidden;
//           display: flex; flex-direction: column;
//           opacity: 0;
//           animation: eaCardIn .5s cubic-bezier(.22,1,.36,1) forwards;
//           transition: border-color .22s, transform .22s, box-shadow .22s;
//         }

//         @keyframes eaCardIn {
//           from { opacity:0; transform:translateY(14px); }
//           to   { opacity:1; transform:translateY(0); }
//         }

//         .ea-card:hover {
//           border-color: rgba(15,212,192,0.22);
//           transform: translateY(-3px);
//           box-shadow: 0 14px 36px rgba(0,0,0,0.3);
//         }

//         .ea-card-accent {
//           height: 2px;
//           background: linear-gradient(90deg, var(--teal), rgba(15,212,192,0.1));
//           opacity: 0; transition: opacity .25s;
//         }

//         .ea-card:hover .ea-card-accent { opacity: 1; }

//         .ea-card-header {
//           padding: 22px 22px 16px;
//           display: flex; align-items: flex-start; gap: 14px;
//         }

//         .ea-card-logo {
//           width: 48px; height: 48px; border-radius: 12px;
//           display: flex; align-items: center; justify-content: center;
//           font-family: 'Cabinet Grotesk', sans-serif;
//           font-size: 14px; font-weight: 800; color: #0b1120;
//           flex-shrink: 0;
//           box-shadow: 0 4px 14px rgba(0,0,0,0.3);
//         }

//         .ea-card-header-info { flex: 1; min-width: 0; }

//         .ea-card-title {
//           font-family: 'Cabinet Grotesk', sans-serif;
//           font-size: 16px; font-weight: 700;
//           color: var(--white); letter-spacing: -0.3px;
//           line-height: 1.3; margin-bottom: 5px;
//           white-space: nowrap; overflow: hidden; text-overflow: ellipsis;
//         }

//         .ea-card-company {
//           display: flex; align-items: center; gap: 5px;
//           font-size: 12.5px; color: var(--teal); font-weight: 500;
//         }

//         /* Status badges */
//         .ea-status-badge {
//           padding: 4px 11px; border-radius: 100px;
//           font-size: 11.5px; font-weight: 600;
//           white-space: nowrap; flex-shrink: 0;
//         }

//         .ea-status-blue   { background:var(--blue-dim);  border:1px solid rgba(96,165,250,0.2);  color:var(--blue);  }
//         .ea-status-amber  { background:var(--amber-dim); border:1px solid rgba(245,166,35,0.2);  color:var(--amber); }
//         .ea-status-teal   { background:var(--teal-dim);  border:1px solid rgba(15,212,192,0.2);  color:var(--teal);  }
//         .ea-status-red    { background:var(--red-dim);   border:1px solid rgba(255,94,94,0.2);   color:var(--red);   }

//         .ea-meta-row {
//           padding: 0 22px 16px;
//           display: flex; gap: 8px; flex-wrap: wrap;
//         }

//         .ea-meta-pill {
//           display: inline-flex; align-items: center; gap: 5px;
//           padding: 4px 10px;
//           background: var(--white-dim); border: 1px solid var(--border);
//           border-radius: 100px; font-size: 12px; color: var(--white-soft);
//         }

//         /* ── TIMELINE ── */
//         .ea-timeline {
//           margin: 0 22px 22px;
//           display: flex; align-items: center; gap: 0;
//           padding: 14px 16px;
//           background: rgba(240,244,255,0.03);
//           border: 1px solid var(--border);
//           border-radius: 11px;
//           position: relative;
//         }

//         .ea-tl-step {
//           display: flex; flex-direction: column; align-items: center;
//           gap: 5px; flex-shrink: 0;
//         }

//         .ea-tl-dot {
//           width: 22px; height: 22px; border-radius: 50%;
//           background: var(--navy-mid);
//           border: 2px solid var(--border);
//           display: flex; align-items: center; justify-content: center;
//           color: transparent;
//           transition: border-color .25s, background .25s, color .25s;
//         }

//         .ea-tl-step.done .ea-tl-dot {
//           background: var(--teal-dim);
//           border-color: var(--teal);
//           color: var(--teal);
//         }

//         .ea-tl-step.active .ea-tl-dot {
//           background: var(--teal);
//           border-color: var(--teal);
//           box-shadow: 0 0 10px rgba(15,212,192,0.4);
//           color: var(--navy);
//         }

//         .ea-tl-label {
//           font-size: 10px; font-weight: 500;
//           color: var(--white-soft);
//           white-space: nowrap;
//         }

//         .ea-tl-step.done .ea-tl-label,
//         .ea-tl-step.active .ea-tl-label { color: var(--teal); }

//         .ea-tl-line {
//           flex: 1; height: 2px;
//           background: var(--border);
//           margin: 0 4px;
//           margin-bottom: 16px;
//           border-radius: 2px;
//           transition: background .25s;
//         }

//         .ea-tl-line.done { background: rgba(15,212,192,0.35); }

//         .ea-tl-rejected {
//           display: flex; align-items: center; gap: 6px;
//           font-size: 12px; color: var(--red);
//           font-weight: 500;
//         }

//         /* ── EMPTY STATE ── */
//         .ea-empty {
//           grid-column: 1 / -1;
//           text-align: center; padding: 80px 24px;
//         }

//         .ea-empty-icon {
//           width: 72px; height: 72px; border-radius: 50%;
//           background: var(--white-dim); border: 1px solid var(--border);
//           display: flex; align-items: center; justify-content: center;
//           margin: 0 auto 20px; color: var(--white-soft);
//         }

//         .ea-empty-title {
//           font-family: 'Cabinet Grotesk', sans-serif;
//           font-size: 20px; font-weight: 700;
//           color: var(--white); margin-bottom: 8px;
//         }

//         .ea-empty-sub {
//           font-size: 14px; color: var(--white-soft);
//           font-weight: 300; margin-bottom: 28px;
//         }

//         .ea-empty-cta {
//           display: inline-flex; align-items: center; gap: 7px;
//           padding: 12px 24px;
//           background: var(--teal); color: var(--navy);
//           font-family: 'Cabinet Grotesk', sans-serif;
//           font-size: 14px; font-weight: 800;
//           border-radius: 10px; text-decoration: none;
//           box-shadow: 0 6px 20px rgba(15,212,192,0.28);
//           transition: transform .15s, box-shadow .2s;
//         }

//         .ea-empty-cta:hover { transform: translateY(-1px); box-shadow: 0 10px 28px rgba(15,212,192,0.38); }

//         /* ── SKELETON ── */
//         .ea-skel {
//           background: var(--navy-card);
//           border: 1px solid var(--border);
//           border-radius: 18px; padding: 22px;
//           animation: eaSkel 1.5s ease-in-out infinite;
//         }

//         @keyframes eaSkel { 0%,100%{opacity:.7} 50%{opacity:.35} }

//         .ea-skel-row { display:flex; gap:12px; margin-bottom:14px; align-items:center; }
//         .ea-skel-logo { width:48px; height:48px; border-radius:12px; background:var(--white-dim); flex-shrink:0; }
//         .ea-skel-line { height:10px; border-radius:6px; background:var(--white-dim); }

//         /* ══════════════════════════════════════════
//            APTITUDE BANNER  (new styles only)
//         ══════════════════════════════════════════ */
//         .ea-at-banner {
//           margin: 0 16px 18px;
//           border-radius: 14px;
//           border: 1px solid rgba(129,140,248,0.2);
//           background: linear-gradient(135deg, rgba(129,140,248,0.06) 0%, rgba(11,17,32,0.6) 100%);
//           overflow: hidden;
//         }
//         .ea-at-today {
//           border-color: rgba(15,212,192,0.35);
//           background: linear-gradient(135deg, rgba(15,212,192,0.07) 0%, rgba(11,17,32,0.6) 100%);
//           box-shadow: 0 0 0 3px rgba(15,212,192,0.06);
//         }
//         .ea-at-past {
//           border-color: rgba(255,94,94,0.15);
//           background: linear-gradient(135deg, rgba(255,94,94,0.04) 0%, rgba(11,17,32,0.6) 100%);
//           opacity: .72;
//         }

//         .ea-at-top {
//           display: flex; align-items: center; justify-content: space-between;
//           padding: 13px 14px 9px;
//           gap: 10px;
//         }
//         .ea-at-left { display: flex; align-items: center; gap: 10px; }

//         .ea-at-icon {
//           position: relative; flex-shrink: 0;
//           width: 34px; height: 34px; border-radius: 9px;
//           background: var(--violet-dim);
//           border: 1px solid rgba(129,140,248,0.2);
//           display: flex; align-items: center; justify-content: center;
//           color: var(--violet);
//         }
//         .ea-at-icon-today {
//           background: var(--teal-dim);
//           border-color: rgba(15,212,192,0.25);
//           color: var(--teal);
//         }
//         .ea-at-live {
//           position: absolute; top: -3px; right: -3px;
//           width: 9px; height: 9px; border-radius: 50%;
//           background: var(--teal); box-shadow: 0 0 6px var(--teal);
//           animation: livePulse 1.5s ease-in-out infinite;
//         }
//         @keyframes livePulse { 0%,100%{transform:scale(1);opacity:1} 50%{transform:scale(1.4);opacity:.5} }

//         .ea-at-label {
//           font-size: 13px; font-weight: 700; color: var(--white);
//           display: flex; align-items: center; gap: 6px; margin-bottom: 3px;
//         }
//         .ea-at-date {
//           font-size: 11.5px; color: var(--white-soft); letter-spacing: .1px;
//         }

//         .ea-at-chip {
//           padding: 2px 8px; border-radius: 100px;
//           font-size: 10px; font-weight: 700; letter-spacing: .3px;
//         }
//         .ea-chip-today  { background: var(--teal-dim);   border:1px solid rgba(15,212,192,0.25);  color:var(--teal);   animation: livePulse 2s ease-in-out infinite; }
//         .ea-chip-soon   { background: var(--violet-dim); border:1px solid rgba(129,140,248,0.2);  color:var(--violet); }
//         .ea-chip-past   { background: var(--red-dim);    border:1px solid rgba(255,94,94,0.18);   color:var(--red);    }

//         /* stats */
//         .ea-at-stats {
//           display: flex; align-items: center;
//           padding: 0 14px 11px; gap: 6px;
//         }
//         .ea-at-stat { display:flex; flex-direction:column; align-items:center; flex:1; }
//         .ea-at-stat-val {
//           font-family:'Cabinet Grotesk',sans-serif;
//           font-size: 17px; font-weight: 800; color: var(--white); line-height:1;
//         }
//         .ea-at-stat-lbl { font-size: 10px; color: var(--white-soft); margin-top: 2px; }
//         .ea-at-sdiv { width:1px; height:30px; background:var(--border); }

//         /* cta */
//         .ea-at-cta { padding: 0 14px 14px; }

//         .ea-at-btn-active {
//           width: 100%; padding: 10px;
//           background: var(--teal); color: var(--navy);
//           font-family:'Cabinet Grotesk',sans-serif;
//           font-size: 13px; font-weight: 800;
//           border: none; border-radius: 9px; cursor: pointer;
//           box-shadow: 0 4px 16px rgba(15,212,192,0.3);
//           transition: transform .15s, box-shadow .2s;
//         }
//         .ea-at-btn-active:hover { transform:translateY(-1px); box-shadow:0 8px 22px rgba(15,212,192,0.4); }

//         .ea-at-locked {
//           display: flex; align-items: center; justify-content: center; gap: 7px;
//           padding: 9px 14px; width:100%;
//           background: var(--white-dim); border: 1px solid var(--border);
//           border-radius: 9px; font-size: 12.5px; font-weight: 600; color: var(--white-soft);
//         }
//         .ea-at-locked-past { background:var(--red-dim); border-color:rgba(255,94,94,0.15); color:var(--red); }

//         /* ══════════════════════════════════════════
//            APTITUDE TEST MODAL
//         ══════════════════════════════════════════ */
//         .at-overlay {
//           position:fixed; inset:0; z-index:500;
//           background: rgba(5,9,18,0.85);
//           backdrop-filter: blur(8px);
//           animation: atFade .25s ease both;
//         }
//         @keyframes atFade { from{opacity:0} to{opacity:1} }

//         .at-shell {
//           position:fixed; top:50%; left:50%;
//           transform: translate(-50%,-50%);
//           width: min(530px, 95vw); max-height: 90vh;
//           overflow-y: auto;
//           background: #13192a;
//           border: 1px solid rgba(240,244,255,0.08);
//           border-radius: 22px; z-index: 501;
//           animation: atIn .35s cubic-bezier(.22,1,.36,1) both;
//           scrollbar-width:thin; scrollbar-color:rgba(240,244,255,0.08) transparent;
//         }
//         .at-shell-wide { width: min(660px, 95vw); }
//         @keyframes atIn { from{opacity:0;transform:translate(-50%,-47%) scale(.95)} to{opacity:1;transform:translate(-50%,-50%) scale(1)} }

//         /* INTRO */
//         .at-intro {
//           padding: 34px 30px 30px;
//           display: flex; flex-direction: column; align-items: center;
//           text-align: center; position: relative;
//         }
//         .at-intro-glow {
//           position:absolute; top:0; left:50%; transform:translateX(-50%);
//           width:280px; height:180px;
//           background:radial-gradient(ellipse at 50% 0%,rgba(129,140,248,0.13),transparent 70%);
//           pointer-events:none;
//         }
//         .at-close-x {
//           position:absolute; top:14px; right:14px;
//           width:28px; height:28px; border-radius:8px;
//           background:var(--white-dim); border:1px solid var(--border);
//           color:var(--white-soft); cursor:pointer; font-size:13px;
//           display:flex; align-items:center; justify-content:center;
//           transition:color .15s,background .15s;
//         }
//         .at-close-x:hover { color:var(--red); background:var(--red-dim); }

//         .at-intro-icon {
//           width:64px; height:64px; border-radius:18px;
//           background:var(--violet-dim); border:1px solid rgba(129,140,248,0.2);
//           display:flex; align-items:center; justify-content:center;
//           color:var(--violet); margin-bottom:16px; position:relative; z-index:1;
//           box-shadow:0 0 40px rgba(129,140,248,0.1);
//         }
//         .at-intro-title {
//           font-family:'Cabinet Grotesk',sans-serif;
//           font-size:22px; font-weight:800; color:var(--white);
//           letter-spacing:-.5px; margin-bottom:4px; position:relative; z-index:1;
//         }
//         .at-intro-job {
//           font-size:13px; color:var(--violet); font-weight:500;
//           margin-bottom:22px; position:relative; z-index:1;
//         }

//         .at-intro-grid {
//           display:grid; grid-template-columns:repeat(4,1fr);
//           gap:9px; width:100%; margin-bottom:16px;
//         }
//         .at-info-card {
//           background:var(--navy); border:1px solid var(--border);
//           border-radius:11px; padding:13px 8px;
//           display:flex; flex-direction:column; align-items:center; gap:5px;
//         }
//         .at-info-icon { font-size:18px; }
//         .at-info-val {
//           font-family:'Cabinet Grotesk',sans-serif;
//           font-size:14px; font-weight:800; color:var(--white);
//         }
//         .at-info-lbl { font-size:10px; color:var(--white-soft); }

//         .at-time-note {
//           font-size:12px; color:var(--white-soft);
//           padding:8px 14px; background:var(--white-dim);
//           border:1px solid var(--border); border-radius:8px;
//           margin-bottom:18px; width:100%; text-align:center;
//         }
//         .at-time-note strong { color:var(--white); }

//         .at-rules-box {
//           width:100%; background:rgba(240,244,255,0.025);
//           border:1px solid var(--border); border-radius:12px;
//           padding:14px 16px; margin-bottom:22px; text-align:left;
//         }
//         .at-rules-title {
//           font-size:10px; font-weight:700; letter-spacing:1px;
//           color:var(--white-soft); margin-bottom:10px;
//         }
//         .at-rule-row {
//           display:flex; align-items:center; gap:9px;
//           font-size:12.5px; color:var(--white-soft); font-weight:300; margin-bottom:8px;
//         }
//         .at-rule-row:last-child { margin-bottom:0; }
//         .at-rule-num {
//           width:19px; height:19px; border-radius:6px;
//           background:var(--violet-dim); border:1px solid rgba(129,140,248,0.2);
//           display:flex; align-items:center; justify-content:center;
//           font-size:10px; font-weight:700; color:var(--violet); flex-shrink:0;
//         }
//         .at-start-btn {
//           padding:13px 36px; background:var(--violet); border:none;
//           border-radius:11px; font-family:'Cabinet Grotesk',sans-serif;
//           font-size:14px; font-weight:800; color:#fff; cursor:pointer;
//           box-shadow:0 6px 22px rgba(129,140,248,0.35);
//           transition:transform .15s,box-shadow .2s;
//         }
//         .at-start-btn:hover { transform:translateY(-2px); box-shadow:0 10px 28px rgba(129,140,248,0.45); }

//         /* EXAM */
//         .at-exam { display:flex; flex-direction:column; min-height:500px; }
//         .at-exam-top {
//           display:flex; align-items:center; gap:14px;
//           padding:16px 22px 12px;
//           border-bottom:1px solid var(--border);
//           background:rgba(240,244,255,0.02);
//         }
//         .at-prog-wrap { flex:1; display:flex; align-items:center; gap:10px; }
//         .at-prog { flex:1; height:5px; background:var(--white-dim); border-radius:100px; overflow:hidden; }
//         .at-prog-fill { height:100%; background:linear-gradient(90deg,var(--violet),#a78bfa); border-radius:100px; transition:width .4s cubic-bezier(.22,1,.36,1); }
//         .at-qcount { font-size:12px; font-weight:600; color:var(--white-soft); white-space:nowrap; }
//         .at-qcount em { font-style:normal; color:rgba(154,170,191,0.4); }

//         .at-timer {
//           display:flex; align-items:center; gap:6px; position:relative;
//           font-family:'Cabinet Grotesk',sans-serif; font-size:17px; font-weight:800; color:var(--white);
//         }
//         .at-timer-low { color:var(--red); animation:tPulse .8s ease-in-out infinite; }
//         @keyframes tPulse { 0%,100%{opacity:1} 50%{opacity:.5} }
//         .at-timer-svg { position:absolute; right:-38px; top:50%; transform:translateY(-50%); }
//         .at-timer span { padding-right:44px; }

//         .at-dots { display:flex; gap:5px; flex-wrap:wrap; padding:11px 22px 0; }
//         .at-dot { width:8px; height:8px; border-radius:50%; background:var(--white-dim); border:1.5px solid var(--border); transition:all .2s; }
//         .at-dot-done { background:rgba(129,140,248,0.3); border-color:rgba(129,140,248,0.5); }
//         .at-dot-cur  { background:var(--violet); border-color:var(--violet); box-shadow:0 0 6px rgba(129,140,248,0.5); transform:scale(1.35); }

//         .at-qcard {
//           padding:22px 22px 16px; flex:1;
//           animation:atQIn .3s cubic-bezier(.22,1,.36,1) both;
//         }
//         @keyframes atQIn { from{opacity:0;transform:translateX(12px)} to{opacity:1;transform:translateX(0)} }
//         .at-qnum { font-size:11px; font-weight:700; letter-spacing:1px; text-transform:uppercase; color:var(--violet); margin-bottom:7px; }
//         .at-qnum span { color:rgba(129,140,248,0.35); }
//         .at-qtext { font-family:'Cabinet Grotesk',sans-serif; font-size:16px; font-weight:700; color:var(--white); line-height:1.5; letter-spacing:-.2px; margin-bottom:20px; }

//         .at-opts { display:flex; flex-direction:column; gap:8px; }
//         .at-opt {
//           display:flex; align-items:center; gap:11px;
//           padding:12px 13px; background:var(--navy);
//           border:1.5px solid var(--border); border-radius:11px;
//           cursor:pointer; text-align:left; width:100%;
//           transition:border-color .15s,background .15s,transform .1s;
//         }
//         .at-opt:hover { border-color:rgba(129,140,248,0.3); transform:translateX(2px); }
//         .at-opt-sel   { border-color:var(--violet); background:rgba(129,140,248,0.07); }
//         .at-opt-letter {
//           width:28px; height:28px; border-radius:7px;
//           background:var(--white-dim); border:1px solid var(--border);
//           display:flex; align-items:center; justify-content:center;
//           font-family:'Cabinet Grotesk',sans-serif; font-size:11px; font-weight:800;
//           color:var(--white-soft); flex-shrink:0; transition:all .15s;
//         }
//         .at-opt-sel .at-opt-letter { background:var(--violet); border-color:var(--violet); color:#fff; }
//         .at-opt-txt { flex:1; font-size:13px; color:var(--white-soft); transition:color .15s; }
//         .at-opt-sel .at-opt-txt { color:var(--white); font-weight:500; }
//         .at-opt-check { color:var(--teal); font-size:13px; font-weight:700; }

//         .at-exam-foot {
//           padding:12px 22px 20px; border-top:1px solid var(--border);
//           display:flex; align-items:center; gap:12px;
//           background:rgba(240,244,255,0.02);
//         }
//         .at-answered { display:flex; align-items:center; gap:8px; flex:1; font-size:12px; color:var(--white-soft); }
//         .at-ans-bar  { width:60px; height:4px; background:var(--white-dim); border-radius:100px; overflow:hidden; }
//         .at-ans-fill { height:100%; background:var(--teal); border-radius:100px; transition:width .4s ease; }

//         .at-btn-next, .at-btn-submit {
//           padding:10px 22px; border-radius:10px;
//           font-family:'Cabinet Grotesk',sans-serif; font-size:13.5px; font-weight:800;
//           cursor:pointer; border:none; transition:transform .15s,box-shadow .2s,opacity .15s;
//         }
//         .at-btn-next:disabled { opacity:.4; cursor:not-allowed; }
//         .at-btn-next   { background:var(--violet); color:#fff; box-shadow:0 4px 14px rgba(129,140,248,0.3); }
//         .at-btn-next:hover:not(:disabled)   { transform:translateY(-1px); box-shadow:0 8px 20px rgba(129,140,248,0.4); }
//         .at-btn-submit { background:var(--teal);   color:var(--navy); box-shadow:0 4px 14px rgba(15,212,192,0.3); }
//         .at-btn-submit:hover { transform:translateY(-1px); box-shadow:0 8px 20px rgba(15,212,192,0.4); }

//         /* RESULT */
//         .at-result {
//           padding:30px 26px 26px;
//           display:flex; flex-direction:column; align-items:center; text-align:center;
//         }
//         .at-result-ring { position:relative; width:130px; height:130px; margin-bottom:16px; }
//         .at-result-center {
//           position:absolute; inset:0;
//           display:flex; flex-direction:column; align-items:center; justify-content:center;
//         }
//         .at-result-score { font-family:'Cabinet Grotesk',sans-serif; font-size:26px; font-weight:800; color:var(--white); line-height:1; }
//         .at-result-score span { font-size:13px; color:var(--white-soft); }
//         .at-result-pct { font-size:12px; color:var(--white-soft); margin-top:2px; }
//         .at-grade { padding:4px 13px; border-radius:100px; font-size:11.5px; font-weight:700; letter-spacing:.3px; margin-bottom:9px; }
//         .at-grade-teal  { background:var(--teal-dim);   border:1px solid rgba(15,212,192,0.2);  color:var(--teal);   }
//         .at-grade-amber { background:var(--amber-dim);  border:1px solid rgba(245,166,35,0.2);  color:var(--amber);  }
//         .at-grade-blue  { background:var(--blue-dim);   border:1px solid rgba(96,165,250,0.2);  color:var(--blue);   }
//         .at-grade-red   { background:var(--red-dim);    border:1px solid rgba(255,94,94,0.2);   color:var(--red);    }
//         .at-result-title { font-family:'Cabinet Grotesk',sans-serif; font-size:20px; font-weight:800; color:var(--white); margin-bottom:5px; }
//         .at-result-sub { font-size:13px; color:var(--white-soft); font-weight:300; margin-bottom:20px; }

//         .at-score-strip {
//           display:flex; align-items:center; width:100%;
//           background:var(--navy); border:1px solid var(--border);
//           border-radius:12px; padding:13px 8px; margin-bottom:20px; gap:4px;
//         }
//         .at-ss-item { flex:1; text-align:center; }
//         .at-ss-val { font-family:'Cabinet Grotesk',sans-serif; font-size:19px; font-weight:800; color:var(--white); }
//         .at-ss-lbl { font-size:10.5px; color:var(--white-soft); margin-top:1px; }
//         .at-ss-teal   { color:var(--teal);   }
//         .at-ss-red    { color:var(--red);    }
//         .at-ss-violet { color:var(--violet); }
//         .at-ss-soft   { color:var(--white-soft); }
//         .at-ss-div { width:1px; height:34px; background:var(--border); flex-shrink:0; }

//         .at-review {
//           width:100%; text-align:left;
//           max-height:250px; overflow-y:auto; margin-bottom:22px;
//           display:flex; flex-direction:column; gap:6px;
//           scrollbar-width:thin; scrollbar-color:rgba(240,244,255,0.07) transparent;
//         }
//         .at-review-hdr { font-size:10px; font-weight:700; letter-spacing:1px; text-transform:uppercase; color:var(--white-soft); margin-bottom:4px; }
//         .at-rev-row { display:flex; align-items:flex-start; gap:8px; padding:10px 12px; border-radius:9px; border:1px solid var(--border); background:rgba(240,244,255,0.02); }
//         .at-rev-ok  { border-color:rgba(15,212,192,0.12);  background:rgba(15,212,192,0.025); }
//         .at-rev-bad { border-color:rgba(255,94,94,0.12);   background:rgba(255,94,94,0.025);  }
//         .at-rev-icon { width:20px; height:20px; border-radius:50%; display:flex; align-items:center; justify-content:center; font-size:10px; font-weight:700; flex-shrink:0; margin-top:1px; }
//         .at-rev-ok  .at-rev-icon { background:var(--teal-dim); color:var(--teal); }
//         .at-rev-bad .at-rev-icon { background:var(--red-dim);  color:var(--red);  }
//         .at-rev-q { font-size:12px; color:var(--white); font-weight:500; margin-bottom:4px; line-height:1.4; }
//         .at-rev-ans { display:flex; gap:5px; flex-wrap:wrap; }
//         .at-rev-right { font-size:11px; color:var(--teal);       background:var(--teal-dim);   padding:2px 7px; border-radius:5px; font-weight:600; }
//         .at-rev-wrong { font-size:11px; color:var(--red);        background:var(--red-dim);    padding:2px 7px; border-radius:5px; text-decoration:line-through; }
//         .at-rev-skip  { font-size:11px; color:var(--white-soft); background:var(--white-dim);  padding:2px 7px; border-radius:5px; font-style:italic; }

//         .at-done-btn {
//           padding:11px 38px; background:var(--violet); border:none; border-radius:11px;
//           font-family:'Cabinet Grotesk',sans-serif; font-size:14px; font-weight:800; color:#fff;
//           cursor:pointer; box-shadow:0 5px 18px rgba(129,140,248,0.35);
//           transition:transform .15s,box-shadow .2s;
//         }
//         .at-done-btn:hover { transform:translateY(-2px); box-shadow:0 10px 26px rgba(129,140,248,0.45); }

//         /* RESPONSIVE */
//         @media (max-width: 1100px) {
//           .ea-grid { grid-template-columns: repeat(2, 1fr); }
//         }

//         @media (max-width: 760px) {
//           .ea-hero, .ea-stats, .ea-tabs-wrap, .ea-grid-wrap { padding-left: 24px; padding-right: 24px; }
//           .ea-grid { grid-template-columns: 1fr; }
//           .ea-hero { padding-top: 110px; }
//           .at-intro-grid { grid-template-columns: repeat(2,1fr); }
//           .at-shell { width: 95vw; }
//         }
//       `}</style>

//       <div className="ea-root">

//         {/* ── HERO ── */}
//         <section className="ea-hero">
//           <div className="ea-hero-inner">
//             <div>
//               <div className="ea-badge">
//                 <span className="ea-badge-dot" />
//                 {user?.username ? `Logged in as ${user.username}` : "Your dashboard"}
//               </div>
//               <h1 className="ea-hero-title">
//                 Your <em>applications</em>
//               </h1>
//               <p className="ea-hero-sub">
//                 Track every role you've applied to — all in one place.
//               </p>
//             </div>
//             <Link to="/job-listings-e" className="ea-hero-cta">
//               Browse More Jobs
//               <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
//                 <line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/>
//               </svg>
//             </Link>
//           </div>
//         </section>

//         {/* ── STATS STRIP ── */}
//         {!loading && applications.length > 0 && (
//           <div className="ea-stats">
//             {[
//               { key:"all",         label:"Total Applied",  color:"blue",  icon:<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/></svg> },
//               { key:"interviewed", label:"Interviews",     color:"amber", icon:<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg> },
//               { key:"hired",       label:"Hired",          color:"teal",  icon:<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg> },
//               { key:"rejected",    label:"Not Progressed", color:"red",   icon:<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg> },
//             ].map(s => (
//               <div className="ea-stat-pill" key={s.key}>
//                 <div className={`ea-stat-icon ${s.color}`}>{s.icon}</div>
//                 <div>
//                   <div className="ea-stat-val">
//                     {s.key === "all" ? applications.length : (statusCounts[s.key] || 0)}
//                   </div>
//                   <div className="ea-stat-lbl">{s.label}</div>
//                 </div>
//               </div>
//             ))}
//           </div>
//         )}

//         {/* ── FILTER TABS ── */}
//         {!loading && applications.length > 0 && (
//           <div className="ea-tabs-wrap">
//             <div className="ea-tabs">
//               {filterTabs.map(t => (
//                 <button
//                   key={t.key}
//                   className={`ea-tab${filter === t.key ? " active" : ""}`}
//                   onClick={() => setFilter(t.key)}
//                 >
//                   {t.label}
//                   <span className="ea-tab-count">{t.count}</span>
//                 </button>
//               ))}
//             </div>
//           </div>
//         )}

//         {/* ── GRID ── */}
//         <div className="ea-grid-wrap">
//           <div className="ea-grid">
//             {loading ? (
//               [...Array(6)].map((_, i) => (
//                 <div className="ea-skel" key={i}>
//                   <div className="ea-skel-row">
//                     <div className="ea-skel-logo" />
//                     <div style={{ flex: 1 }}>
//                       <div className="ea-skel-line" style={{ width: "65%", marginBottom: 8 }} />
//                       <div className="ea-skel-line" style={{ width: "40%" }} />
//                     </div>
//                   </div>
//                   <div className="ea-skel-line" style={{ width: "50%", marginBottom: 8 }} />
//                   <div className="ea-skel-line" style={{ width: "100%", height: 48, borderRadius: 11 }} />
//                 </div>
//               ))
//             ) : filtered.length > 0 ? (
//               filtered.map((app, i) => (
//                 <AppCard key={app.id || i} application={app} index={i} onTakeTest={setActiveTest} />
//               ))
//             ) : (
//               <div className="ea-empty">
//                 <div className="ea-empty-icon">
//                   <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
//                     <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
//                     <polyline points="14 2 14 8 20 8"/>
//                     <line x1="16" y1="13" x2="8" y2="13"/>
//                     <line x1="16" y1="17" x2="8" y2="17"/>
//                   </svg>
//                 </div>
//                 <div className="ea-empty-title">
//                   {applications.length === 0 ? "No applications yet" : `No ${filter} applications`}
//                 </div>
//                 <p className="ea-empty-sub">
//                   {applications.length === 0
//                     ? "Start applying to jobs and track your progress here."
//                     : "Try a different filter to see your other applications."}
//                 </p>
//                 {applications.length === 0 && (
//                   <Link to="/job-listings-e" className="ea-empty-cta">
//                     Browse Jobs
//                     <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
//                       <line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/>
//                     </svg>
//                   </Link>
//                 )}
//               </div>
//             )}
//           </div>
//         </div>

//       </div>

//       {/* ── Aptitude Test Modal ── */}
//       {activeTest && <AptitudeModal test={activeTest} onClose={() => setActiveTest(null)} />}
//     </>
//   );
// };

// export default EmployeeApplication;










import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const STATUS_CONFIG = {
  applied:     { label: "Applied",     color: "blue",   icon: "📨" },
  interviewed: { label: "Interviewed", color: "amber",  icon: "💬" },
  rejected:    { label: "Rejected",    color: "red",    icon: "✕"  },
  hired:       { label: "Hired 🎉",    color: "teal",   icon: "✓"  },
};

const getStatus = (s = "") => STATUS_CONFIG[(s || "").toLowerCase()] || { label: s, color: "blue", icon: "•" };

const GRADIENTS = [
  "linear-gradient(135deg,#0fd4c0,#0b9e8e)",
  "linear-gradient(135deg,#f5a623,#c47d0a)",
  "linear-gradient(135deg,#818cf8,#4f46e5)",
  "linear-gradient(135deg,#f472b6,#db2777)",
  "linear-gradient(135deg,#34d399,#059669)",
  "linear-gradient(135deg,#60a5fa,#2563eb)",
];

const getInitials = (str = "") =>
  str.split(" ").slice(0, 2).map(w => w[0]?.toUpperCase()).join("") || "J";

const formatDate = (dateStr) => {
  if (!dateStr) return "—";
  try {
    return new Date(dateStr).toLocaleDateString("en-IN", {
      day: "numeric", month: "short", year: "numeric",
    });
  } catch { return dateStr; }
};

const STEPS = ["applied", "interviewed", "hired"];

const StatusTimeline = ({ current }) => {
  const cur = (current || "").toLowerCase();
  const isRejected = cur === "rejected";
  const activeIdx  = STEPS.indexOf(cur);

  return (
    <div className="ea-timeline">
      {STEPS.map((step, i) => {
        const done   = !isRejected && i <= activeIdx;
        const active = !isRejected && i === activeIdx;
        return (
          <React.Fragment key={step}>
            <div className={`ea-tl-step${done ? " done" : ""}${active ? " active" : ""}`}>
              <div className="ea-tl-dot">
                {done && <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>}
              </div>
              <span className="ea-tl-label">{STATUS_CONFIG[step]?.label || step}</span>
            </div>
            {i < STEPS.length - 1 && (
              <div className={`ea-tl-line${!isRejected && i < activeIdx ? " done" : ""}`} />
            )}
          </React.Fragment>
        );
      })}
      {isRejected && (
        <div className="ea-tl-rejected">
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
          </svg>
          Not moved forward
        </div>
      )}
    </div>
  );
};

/* ═══════════════════════════════════════════════════
   APTITUDE HELPERS & COMPONENTS
═══════════════════════════════════════════════════ */

const isTodayExam = (dateStr) => {
  if (!dateStr) return false;
  return dateStr === new Date().toISOString().split("T")[0];
};
const daysUntil = (dateStr) => {
  if (!dateStr) return null;
  const t = new Date(); t.setHours(0,0,0,0);
  const e = new Date(dateStr); e.setHours(0,0,0,0);
  return Math.round((e - t) / 86400000);
};
const fmtTime = (s) =>
  `${Math.floor(s/60).toString().padStart(2,"0")}:${(s%60).toString().padStart(2,"0")}`;

const useCountdown = (totalSec, running) => {
  const [t, setT] = useState(totalSec);
  useEffect(() => {
    if (!running || t <= 0) return;
    const id = setInterval(() => setT(p => p - 1), 1000);
    return () => clearInterval(id);
  }, [running, t]);
  return t;
};

/* ── Intro screen ── */
const TestIntro = ({ test, onStart, onClose }) => {
  const qs = test.questions || [];
  return (
    <div className="at-intro">
      <button className="at-close-x" onClick={onClose}>✕</button>
      <div className="at-intro-glow" />
      <div className="at-intro-icon">
        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
          <path d="M9 11l3 3L22 4"/><path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"/>
        </svg>
      </div>
      <h2 className="at-intro-title">Aptitude Test</h2>
      <p className="at-intro-job">{test.job_title}</p>

      <div className="at-intro-grid">
        {[
          { icon:"⏱", val:`${test.exam_duration || test.duration_min} min`, lbl:"Duration",    cls:"teal"   },
          { icon:"📝", val:`${qs.length}`,                                   lbl:"Questions",   cls:"violet" },
          { icon:"⭐", val:`${qs.length}`,                                   lbl:"Total Marks", cls:"amber"  },
          { icon:"📅", val: test.schedule_date,                              lbl:"Exam Date",   cls:"blue"   },
        ].map((d, i) => (
          <div className="at-info-card" key={i}>
            <div className="at-info-icon">{d.icon}</div>
            <div className="at-info-val">{d.val}</div>
            <div className="at-info-lbl">{d.lbl}</div>
          </div>
        ))}
      </div>

      <div className="at-time-note">
        🕐 Scheduled at <strong>{test.schedule_time}</strong> &nbsp;·&nbsp;
        1 mark / correct answer &nbsp;·&nbsp; No negative marking
      </div>

      <div className="at-rules-box">
        <div className="at-rules-title">INSTRUCTIONS</div>
        {[
          "Each question has exactly one correct answer",
          "You cannot go back to a previous question",
          "Test auto-submits when time expires",
          "Ensure stable internet before starting",
        ].map((r, i) => (
          <div className="at-rule-row" key={i}>
            <span className="at-rule-num">{i+1}</span>{r}
          </div>
        ))}
      </div>

      <button className="at-start-btn" onClick={onStart}>▶ Start Test Now</button>
    </div>
  );
};

/* ── Exam screen ── */
const ExamScreen = ({ questions, duration, onSubmit }) => {
  const [cur,  setCur]  = useState(0);
  const [ans,  setAns]  = useState({});
  const [run,  setRun]  = useState(true);
  const [aKey, setAKey] = useState(0);
  const timeLeft = useCountdown(duration * 60, run);
  const isLow    = timeLeft <= 60;

  useEffect(() => {
    if (timeLeft === 0) { setRun(false); onSubmit(ans, questions); }
  }, [timeLeft]);

  const pick   = (i) => setAns(p => ({ ...p, [cur]: i }));
  const goNext = ()  => { setAKey(k => k+1); setCur(c => c+1); };
  const submit = ()  => { setRun(false); onSubmit(ans, questions); };

  const q    = questions[cur];
  const pct  = Math.round(((cur+1) / questions.length) * 100);
  const tPct = Math.round((timeLeft / (duration*60)) * 100);
  const C    = 2 * Math.PI * 13;

  return (
    <div className="at-exam">
      <div className="at-exam-top">
        <div className="at-prog-wrap">
          <div className="at-prog"><div className="at-prog-fill" style={{width:`${pct}%`}}/></div>
          <span className="at-qcount">{cur+1}<em>/{questions.length}</em></span>
        </div>
        <div className={`at-timer${isLow?" at-timer-low":""}`}>
          <svg width="34" height="34" viewBox="0 0 34 34" className="at-timer-svg">
            <circle cx="17" cy="17" r="13" fill="none" stroke="rgba(240,244,255,0.07)" strokeWidth="2.5"/>
            <circle cx="17" cy="17" r="13" fill="none"
              stroke={isLow?"#ff5e5e":"#818cf8"} strokeWidth="2.5"
              strokeDasharray={C} strokeDashoffset={C*(1-tPct/100)}
              strokeLinecap="round"
              style={{transform:"rotate(-90deg)",transformOrigin:"50% 50%",transition:"stroke-dashoffset 1s linear"}}
            />
          </svg>
          <span>{fmtTime(timeLeft)}</span>
        </div>
      </div>

      <div className="at-dots">
        {questions.map((_, i) => (
          <div key={i} className={`at-dot${i===cur?" at-dot-cur":""}${ans[i]!==undefined?" at-dot-done":""}`}/>
        ))}
      </div>

      <div className="at-qcard" key={aKey}>
        <div className="at-qnum">Question {cur+1} <span>of {questions.length}</span></div>
        <div className="at-qtext">{q.question}</div>
        <div className="at-opts">
          {q.options.map((opt, i) => {
            const sel = ans[cur] === i;
            return (
              <button key={i} className={`at-opt${sel?" at-opt-sel":""}`} onClick={() => pick(i)}>
                <span className="at-opt-letter">{String.fromCharCode(65+i)}</span>
                <span className="at-opt-txt">{opt}</span>
                {sel && <span className="at-opt-check">✓</span>}
              </button>
            );
          })}
        </div>
      </div>

      <div className="at-exam-foot">
        <div className="at-answered">
          <div className="at-ans-bar"><div className="at-ans-fill" style={{width:`${Math.round(Object.keys(ans).length/questions.length*100)}%`}}/></div>
          <span>{Object.keys(ans).length}/{questions.length} answered</span>
        </div>
        {cur < questions.length-1
          ? <button className="at-btn-next" onClick={goNext} disabled={ans[cur]===undefined}>Next →</button>
          : <button className="at-btn-submit" onClick={submit}>Submit ✓</button>
        }
      </div>
    </div>
  );
};

/* ── Result screen ── */
const ResultScreen = ({ answers, questions, onClose }) => {
  const score = questions.reduce((a, q, i) => a + (answers[i]===q.answer ? 1 : 0), 0);
  const total = questions.length;
  const pct   = Math.round(score/total*100);
  const wrong = questions.reduce((a,_,i)=>a+(answers[i]!==undefined&&answers[i]!==questions[i].answer?1:0),0);
  const skip  = questions.reduce((a,_,i)=>a+(answers[i]===undefined?1:0),0);
  const grade = pct>=80?"Excellent":pct>=60?"Good":pct>=40?"Average":"Needs Work";
  const gcls  = pct>=80?"teal":pct>=60?"amber":pct>=40?"blue":"red";
  const C     = 2*Math.PI*54;

  return (
    <div className="at-result">
      <div className="at-result-ring">
        <svg width="130" height="130" viewBox="0 0 130 130">
          <circle cx="65" cy="65" r="54" fill="none" stroke="rgba(240,244,255,0.06)" strokeWidth="9"/>
          <circle cx="65" cy="65" r="54" fill="none"
            stroke={pct>=80?"#0fd4c0":pct>=60?"#f5a623":pct>=40?"#60a5fa":"#ff5e5e"}
            strokeWidth="9" strokeLinecap="round"
            strokeDasharray={C} strokeDashoffset={C*(1-pct/100)}
            style={{transform:"rotate(-90deg)",transformOrigin:"50% 50%",transition:"stroke-dashoffset 1.3s cubic-bezier(.22,1,.36,1)"}}
          />
        </svg>
        <div className="at-result-center">
          <div className="at-result-score">{score}<span>/{total}</span></div>
          <div className="at-result-pct">{pct}%</div>
        </div>
      </div>

      <div className={`at-grade at-grade-${gcls}`}>{grade}</div>
      <h2 className="at-result-title">Test Complete!</h2>
      <p className="at-result-sub">{score} correct · {wrong} wrong · {skip} skipped</p>

      <div className="at-score-strip">
        {[
          {val:score,           lbl:"Correct",    cls:"teal"  },
          {val:wrong,           lbl:"Wrong",      cls:"red"   },
          {val:skip,            lbl:"Skipped",    cls:"soft"  },
          {val:`${score}/${total}`, lbl:"Marks",  cls:"violet"},
        ].map((s, i, arr) => (
          <React.Fragment key={i}>
            <div className="at-ss-item">
              <div className={`at-ss-val at-ss-${s.cls}`}>{s.val}</div>
              <div className="at-ss-lbl">{s.lbl}</div>
            </div>
            {i<arr.length-1 && <div className="at-ss-div"/>}
          </React.Fragment>
        ))}
      </div>

      <div className="at-review">
        <div className="at-review-hdr">Answer Review</div>
        {questions.map((q, i) => {
          const ua=answers[i], ca=q.answer, ok=ua===ca;
          return (
            <div key={i} className={`at-rev-row${ok?" at-rev-ok":" at-rev-bad"}`}>
              <div className="at-rev-icon">{ok?"✓":"✕"}</div>
              <div className="at-rev-body">
                <div className="at-rev-q">Q{i+1}: {q.question}</div>
                <div className="at-rev-ans">
                  {ua===undefined && <span className="at-rev-skip">Skipped</span>}
                  {ua!==undefined && !ok && <span className="at-rev-wrong">{q.options[ua]}</span>}
                  {!ok && <span className="at-rev-right">✓ {q.options[ca]}</span>}
                  {ok  && <span className="at-rev-right">✓ Correct</span>}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <button className="at-done-btn" onClick={onClose}>Close</button>
    </div>
  );
};

/* ── Modal shell ── */
const AptitudeModal = ({ test, onClose }) => {
  const [phase, setPhase] = useState("intro");
  const [final, setFinal] = useState(null);
  const qs = test.questions || [];

  return (
    <>
      <div className="at-overlay" onClick={phase==="intro" ? onClose : undefined}/>
      <div className={`at-shell${phase==="exam" ? " at-shell-wide" : ""}`}>
        {phase==="intro"  && <TestIntro  test={test} onStart={()=>setPhase("exam")} onClose={onClose}/>}
        {phase==="exam"   && <ExamScreen questions={qs} duration={test.exam_duration||test.duration_min||25} onSubmit={(a,q)=>{setFinal({a,q});setPhase("result");}}/>}
        {phase==="result" && <ResultScreen answers={final.a} questions={final.q} onClose={onClose}/>}
      </div>
    </>
  );
};

/* ── Aptitude banner on card ── */
const AptitudeBanner = ({ test, onTake, loading }) => {
  const isToday = isTodayExam(test.schedule_date);
  const days    = daysUntil(test.schedule_date);
  const isPast  = days !== null && days < 0;
  const qCount  = test.question_count || 0;
  const dur     = test.exam_duration || test.duration_min || 0;

  return (
    <div className={`ea-at-banner${isToday?" ea-at-today":isPast?" ea-at-past":""}`}>
      <div className="ea-at-top">
        <div className="ea-at-left">
          <div className={`ea-at-icon${isToday?" ea-at-icon-today":""}`}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M9 11l3 3L22 4"/><path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"/>
            </svg>
            {isToday && <span className="ea-at-live"/>}
          </div>
          <div>
            <div className="ea-at-label">
              Aptitude Test
              {isToday && <span className="ea-at-chip ea-chip-today">Today</span>}
              {!isToday && !isPast && days!==null && <span className="ea-at-chip ea-chip-soon">{days}d away</span>}
              {isPast   && <span className="ea-at-chip ea-chip-past">Expired</span>}
            </div>
            <div className="ea-at-date">📅 {formatDate(test.schedule_date)} &nbsp;·&nbsp; 🕐 {test.schedule_time}</div>
          </div>
        </div>
      </div>

      <div className="ea-at-stats">
        <div className="ea-at-stat"><span className="ea-at-stat-val">{dur}</span><span className="ea-at-stat-lbl">Minutes</span></div>
        <div className="ea-at-sdiv"/>
        <div className="ea-at-stat"><span className="ea-at-stat-val">{qCount}</span><span className="ea-at-stat-lbl">Questions</span></div>
        <div className="ea-at-sdiv"/>
        <div className="ea-at-stat"><span className="ea-at-stat-val">{qCount}</span><span className="ea-at-stat-lbl">Total Marks</span></div>
        <div className="ea-at-sdiv"/>
        <div className="ea-at-stat"><span className="ea-at-stat-val">1</span><span className="ea-at-stat-lbl">Mark/Q</span></div>
      </div>

      <div className="ea-at-cta">
        {isToday ? (
          <button className="ea-at-btn-active" onClick={() => onTake(test)} disabled={loading}>
            {loading
              ? <><span className="ea-at-spinner"/> Loading questions…</>
              : "▶ Start Exam Now"
            }
          </button>
        ) : isPast ? (
          <div className="ea-at-locked ea-at-locked-past">🚫 Exam window has passed</div>
        ) : (
          <div className="ea-at-locked">🔒 Available on {formatDate(test.schedule_date)}</div>
        )}
      </div>
    </div>
  );
};

/* ═══════════════════════════
   APPLICATION CARD
═══════════════════════════ */
const AppCard = ({ application, index, onTakeTest, fetchingJobId }) => {
  const st       = getStatus(application.status);
  const initials = getInitials(application.companyName || application.jobTitle);
  const gradient = GRADIENTS[index % GRADIENTS.length];

  return (
    <div className="ea-card" style={{ animationDelay: `${index * 0.07}s` }}>
      <div className="ea-card-accent" />

      <div className="ea-card-header">
        <div className="ea-card-logo" style={{ background: gradient }}>{initials}</div>
        <div className="ea-card-header-info">
          <h3 className="ea-card-title">{application.jobTitle || "Job Title"}</h3>
          <div className="ea-card-company">
            <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <rect x="2" y="7" width="20" height="14" rx="2"/><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/>
            </svg>
            {application.companyName || "Company"}
          </div>
        </div>
        <span className={`ea-status-badge ea-status-${st.color}`}>{st.label}</span>
      </div>

      <div className="ea-meta-row">
        <span className="ea-meta-pill">
          <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/>
          </svg>
          Applied {formatDate(application.applicationDate)}
        </span>
        {application.jobType && (
          <span className="ea-meta-pill">
            <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>
            </svg>
            {application.jobType}
          </span>
        )}
      </div>

      <StatusTimeline current={application.status} />

      {/* Aptitude banner — only shows if employer set a test for this job */}
      {application.aptitude_test && (
        <AptitudeBanner
          test={application.aptitude_test}
          onTake={onTakeTest}
          loading={fetchingJobId === application.job_id}
        />
      )}
    </div>
  );
};

/* ═══════════════════════════
   MAIN PAGE
═══════════════════════════ */
const EmployeeApplication = () => {
  const [applications, setApplications] = useState([]);
  const [loading,      setLoading]      = useState(true);
  const [filter,       setFilter]       = useState("all");
  const [activeTest,   setActiveTest]   = useState(null);
  const [fetchingJobId,setFetchingJobId]= useState(null); // which job's questions are loading
  const [fetchError,   setFetchError]   = useState(null);

  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    const fetchApplications = async () => {
      if (!user?.username) { setLoading(false); return; }
      try {
        const res = await axios.get(
          `http://127.0.0.1:8000/applications/api/applied/?user=${user.username}`
        );
        setApplications(res.data);
      } catch (err) {
        console.error("Error fetching applications:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchApplications();
  }, []);

  /* ── Fetch questions on demand when "Start Exam Now" is clicked ── */
  const handleTakeTest = async (testMeta) => {
    const jobId = testMeta.job_id;
    setFetchError(null);
    setFetchingJobId(jobId);
    try {
      const res = await axios.get(
        `http://127.0.0.1:8000/jobs/api/jobs/aptitude-test/${jobId}/`
      );
      const data = res.data;

      if (!data.questions || data.questions.length === 0) {
        setFetchError("No questions found for this test. Please contact the employer.");
        setFetchingJobId(null);
        return;
      }

      // Merge fetched questions + metadata into a single test object
      setActiveTest({
        ...testMeta,
        questions:     data.questions,
        question_count:data.question_count || data.questions.length,
        exam_duration: testMeta.exam_duration || data.duration_min,
        duration_min:  data.duration_min,
        job_title:     data.job_title || testMeta.job_title,
        schedule_date: testMeta.schedule_date,
        schedule_time: testMeta.schedule_time,
      });
    } catch (err) {
      console.error("Failed to fetch aptitude test:", err);
      setFetchError("Failed to load test. Please try again.");
    } finally {
      setFetchingJobId(null);
    }
  };

  const statusCounts = applications.reduce((acc, a) => {
    const k = (a.status || "").toLowerCase();
    acc[k] = (acc[k] || 0) + 1;
    return acc;
  }, {});

  const filtered = filter === "all"
    ? applications
    : applications.filter(a => (a.status || "").toLowerCase() === filter);

  const filterTabs = [
    { key: "all",         label: "All",         count: applications.length },
    { key: "applied",     label: "Applied",      count: statusCounts.applied     || 0 },
    { key: "interviewed", label: "Interviewed",  count: statusCounts.interviewed || 0 },
    { key: "hired",       label: "Hired",        count: statusCounts.hired       || 0 },
    { key: "rejected",    label: "Rejected",     count: statusCounts.rejected    || 0 },
  ];

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cabinet+Grotesk:wght@400;500;700;800&family=Instrument+Serif:ital@0;1&family=Geist:wght@300;400;500&display=swap');
        *,*::before,*::after{box-sizing:border-box;margin:0;padding:0}
        :root{
          --navy:#0b1120;--navy-mid:#111827;--navy-card:#131e30;
          --teal:#0fd4c0;--teal-dim:rgba(15,212,192,0.1);
          --amber:#f5a623;--amber-dim:rgba(245,166,35,0.1);
          --red:#ff5e5e;--red-dim:rgba(255,94,94,0.1);
          --blue:#60a5fa;--blue-dim:rgba(96,165,250,0.12);
          --violet:#818cf8;--violet-dim:rgba(129,140,248,0.12);
          --white:#f0f4ff;--white-soft:#9aaabf;
          --white-dim:rgba(240,244,255,0.05);--border:rgba(240,244,255,0.07);
        }
        .ea-root{background:var(--navy);font-family:'Geist',sans-serif;color:var(--white);min-height:100vh}

        /* HERO */
        .ea-hero{position:relative;padding:130px 48px 60px;overflow:hidden}
        .ea-hero::before{content:'';position:absolute;inset:0;background:radial-gradient(ellipse 60% 55% at 50% 0%,rgba(15,212,192,0.07) 0%,transparent 65%);pointer-events:none}
        .ea-hero::after{content:'';position:absolute;inset:0;background-image:radial-gradient(rgba(240,244,255,0.045) 1px,transparent 1px);background-size:36px 36px;pointer-events:none;mask-image:radial-gradient(ellipse 80% 80% at 50% 30%,black 20%,transparent 100%)}
        .ea-hero-inner{position:relative;z-index:1;max-width:1200px;margin:0 auto;display:flex;align-items:flex-end;justify-content:space-between;gap:24px;flex-wrap:wrap;opacity:0;animation:eaFadeUp .65s cubic-bezier(.22,1,.36,1) .08s forwards}
        @keyframes eaFadeUp{from{opacity:0;transform:translateY(16px)}to{opacity:1;transform:translateY(0)}}
        .ea-badge{display:inline-flex;align-items:center;gap:7px;padding:5px 13px 5px 9px;background:rgba(15,212,192,0.07);border:1px solid rgba(15,212,192,0.17);border-radius:100px;font-size:12px;font-weight:500;color:var(--teal);margin-bottom:16px}
        .ea-badge-dot{width:6px;height:6px;border-radius:50%;background:var(--teal);box-shadow:0 0 6px var(--teal);animation:bdPulse 2s ease-in-out infinite}
        @keyframes bdPulse{0%,100%{opacity:1;transform:scale(1)}50%{opacity:.4;transform:scale(.7)}}
        .ea-hero-title{font-family:'Cabinet Grotesk',sans-serif;font-size:clamp(32px,4.5vw,52px);font-weight:800;color:var(--white);letter-spacing:-1.5px;line-height:1.1;margin-bottom:10px}
        .ea-hero-title em{font-family:'Instrument Serif',serif;font-style:italic;font-weight:400;color:var(--teal);letter-spacing:-1.5px}
        .ea-hero-sub{font-size:15px;line-height:1.65;color:var(--white-soft);font-weight:300}
        .ea-hero-cta{display:inline-flex;align-items:center;gap:7px;padding:12px 22px;background:var(--teal);color:var(--navy);font-family:'Cabinet Grotesk',sans-serif;font-size:13.5px;font-weight:800;border-radius:10px;text-decoration:none;box-shadow:0 6px 20px rgba(15,212,192,0.28);transition:transform .15s,box-shadow .2s;white-space:nowrap;flex-shrink:0}
        .ea-hero-cta:hover{transform:translateY(-1px);box-shadow:0 10px 28px rgba(15,212,192,0.38)}

        /* STATS */
        .ea-stats{max-width:1200px;margin:0 auto;padding:0 48px 32px;display:flex;gap:14px;flex-wrap:wrap}
        .ea-stat-pill{display:flex;align-items:center;gap:10px;padding:12px 18px;background:var(--navy-card);border:1px solid var(--border);border-radius:12px;transition:border-color .2s}
        .ea-stat-pill:hover{border-color:rgba(15,212,192,0.2)}
        .ea-stat-icon{width:32px;height:32px;border-radius:8px;display:flex;align-items:center;justify-content:center;flex-shrink:0}
        .ea-stat-icon.teal {background:var(--teal-dim); border:1px solid rgba(15,212,192,0.15);color:var(--teal) }
        .ea-stat-icon.amber{background:var(--amber-dim);border:1px solid rgba(245,166,35,0.15);color:var(--amber)}
        .ea-stat-icon.blue {background:var(--blue-dim); border:1px solid rgba(96,165,250,0.15); color:var(--blue) }
        .ea-stat-icon.red  {background:var(--red-dim);  border:1px solid rgba(255,94,94,0.15);  color:var(--red)  }
        .ea-stat-val{font-family:'Cabinet Grotesk',sans-serif;font-size:20px;font-weight:800;color:var(--white);line-height:1;margin-bottom:1px}
        .ea-stat-lbl{font-size:11.5px;color:var(--white-soft)}

        /* TABS */
        .ea-tabs-wrap{max-width:1200px;margin:0 auto;padding:0 48px 24px}
        .ea-tabs{display:flex;gap:6px;flex-wrap:wrap}
        .ea-tab{display:inline-flex;align-items:center;gap:7px;padding:8px 16px;border-radius:9px;font-size:13.5px;font-weight:500;cursor:pointer;border:1px solid var(--border);background:transparent;color:var(--white-soft);transition:all .15s;user-select:none}
        .ea-tab:hover{border-color:rgba(240,244,255,0.18);color:var(--white)}
        .ea-tab.active{background:var(--teal-dim);border-color:rgba(15,212,192,0.25);color:var(--white)}
        .ea-tab-count{padding:2px 7px;border-radius:100px;font-size:11px;font-weight:600;background:var(--white-dim);color:var(--white-soft)}
        .ea-tab.active .ea-tab-count{background:rgba(15,212,192,0.15);color:var(--teal)}

        /* GRID */
        .ea-grid-wrap{max-width:1200px;margin:0 auto;padding:0 48px 80px}
        .ea-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:18px}

        /* CARD */
        .ea-card{background:var(--navy-card);border:1px solid var(--border);border-radius:18px;overflow:hidden;display:flex;flex-direction:column;opacity:0;animation:eaCardIn .5s cubic-bezier(.22,1,.36,1) forwards;transition:border-color .22s,transform .22s,box-shadow .22s}
        @keyframes eaCardIn{from{opacity:0;transform:translateY(14px)}to{opacity:1;transform:translateY(0)}}
        .ea-card:hover{border-color:rgba(15,212,192,0.22);transform:translateY(-3px);box-shadow:0 14px 36px rgba(0,0,0,.3)}
        .ea-card-accent{height:2px;background:linear-gradient(90deg,var(--teal),rgba(15,212,192,0.1));opacity:0;transition:opacity .25s}
        .ea-card:hover .ea-card-accent{opacity:1}
        .ea-card-header{padding:22px 22px 16px;display:flex;align-items:flex-start;gap:14px}
        .ea-card-logo{width:48px;height:48px;border-radius:12px;display:flex;align-items:center;justify-content:center;font-family:'Cabinet Grotesk',sans-serif;font-size:14px;font-weight:800;color:#0b1120;flex-shrink:0;box-shadow:0 4px 14px rgba(0,0,0,.3)}
        .ea-card-header-info{flex:1;min-width:0}
        .ea-card-title{font-family:'Cabinet Grotesk',sans-serif;font-size:16px;font-weight:700;color:var(--white);letter-spacing:-.3px;line-height:1.3;margin-bottom:5px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
        .ea-card-company{display:flex;align-items:center;gap:5px;font-size:12.5px;color:var(--teal);font-weight:500}
        .ea-status-badge{padding:4px 11px;border-radius:100px;font-size:11.5px;font-weight:600;white-space:nowrap;flex-shrink:0}
        .ea-status-blue  {background:var(--blue-dim);  border:1px solid rgba(96,165,250,0.2);  color:var(--blue)  }
        .ea-status-amber {background:var(--amber-dim); border:1px solid rgba(245,166,35,0.2);  color:var(--amber) }
        .ea-status-teal  {background:var(--teal-dim);  border:1px solid rgba(15,212,192,0.2);  color:var(--teal)  }
        .ea-status-red   {background:var(--red-dim);   border:1px solid rgba(255,94,94,0.2);   color:var(--red)   }
        .ea-meta-row{padding:0 22px 16px;display:flex;gap:8px;flex-wrap:wrap}
        .ea-meta-pill{display:inline-flex;align-items:center;gap:5px;padding:4px 10px;background:var(--white-dim);border:1px solid var(--border);border-radius:100px;font-size:12px;color:var(--white-soft)}

        /* TIMELINE */
        .ea-timeline{margin:0 22px 22px;display:flex;align-items:center;padding:14px 16px;background:rgba(240,244,255,0.03);border:1px solid var(--border);border-radius:11px}
        .ea-tl-step{display:flex;flex-direction:column;align-items:center;gap:5px;flex-shrink:0}
        .ea-tl-dot{width:22px;height:22px;border-radius:50%;background:var(--navy-mid);border:2px solid var(--border);display:flex;align-items:center;justify-content:center;color:transparent;transition:all .25s}
        .ea-tl-step.done .ea-tl-dot{background:var(--teal-dim);border-color:var(--teal);color:var(--teal)}
        .ea-tl-step.active .ea-tl-dot{background:var(--teal);border-color:var(--teal);box-shadow:0 0 10px rgba(15,212,192,.4);color:var(--navy)}
        .ea-tl-label{font-size:10px;font-weight:500;color:var(--white-soft);white-space:nowrap}
        .ea-tl-step.done .ea-tl-label,.ea-tl-step.active .ea-tl-label{color:var(--teal)}
        .ea-tl-line{flex:1;height:2px;background:var(--border);margin:0 4px 16px;border-radius:2px;transition:background .25s}
        .ea-tl-line.done{background:rgba(15,212,192,.35)}
        .ea-tl-rejected{display:flex;align-items:center;gap:6px;font-size:12px;color:var(--red);font-weight:500}

        /* SKELETON */
        .ea-skel{background:var(--navy-card);border:1px solid var(--border);border-radius:18px;padding:22px;animation:eaSkel 1.5s ease-in-out infinite}
        @keyframes eaSkel{0%,100%{opacity:.7}50%{opacity:.35}}
        .ea-skel-row{display:flex;gap:12px;margin-bottom:14px;align-items:center}
        .ea-skel-logo{width:48px;height:48px;border-radius:12px;background:var(--white-dim);flex-shrink:0}
        .ea-skel-line{height:10px;border-radius:6px;background:var(--white-dim)}

        /* EMPTY */
        .ea-empty{grid-column:1/-1;text-align:center;padding:80px 24px}
        .ea-empty-icon{width:72px;height:72px;border-radius:50%;background:var(--white-dim);border:1px solid var(--border);display:flex;align-items:center;justify-content:center;margin:0 auto 20px;color:var(--white-soft)}
        .ea-empty-title{font-family:'Cabinet Grotesk',sans-serif;font-size:20px;font-weight:700;color:var(--white);margin-bottom:8px}
        .ea-empty-sub{font-size:14px;color:var(--white-soft);font-weight:300;margin-bottom:28px}
        .ea-empty-cta{display:inline-flex;align-items:center;gap:7px;padding:12px 24px;background:var(--teal);color:var(--navy);font-family:'Cabinet Grotesk',sans-serif;font-size:14px;font-weight:800;border-radius:10px;text-decoration:none;box-shadow:0 6px 20px rgba(15,212,192,.28);transition:transform .15s,box-shadow .2s}
        .ea-empty-cta:hover{transform:translateY(-1px);box-shadow:0 10px 28px rgba(15,212,192,.38)}

        /* ERROR TOAST */
        .ea-toast{position:fixed;bottom:28px;left:50%;transform:translateX(-50%);z-index:600;padding:12px 20px;background:#1e1030;border:1px solid rgba(255,94,94,0.3);border-radius:12px;display:flex;align-items:center;gap:10px;font-size:13px;color:var(--red);box-shadow:0 8px 28px rgba(0,0,0,.4);animation:eaFadeUp .3s ease both}

        /* ── APTITUDE BANNER ── */
        .ea-at-banner{margin:0 16px 18px;border-radius:14px;border:1px solid rgba(129,140,248,0.2);background:linear-gradient(135deg,rgba(129,140,248,0.06) 0%,rgba(11,17,32,0.6) 100%);overflow:hidden}
        .ea-at-today{border-color:rgba(15,212,192,0.35);background:linear-gradient(135deg,rgba(15,212,192,0.07) 0%,rgba(11,17,32,0.6) 100%);box-shadow:0 0 0 3px rgba(15,212,192,0.06)}
        .ea-at-past{border-color:rgba(255,94,94,0.15);background:linear-gradient(135deg,rgba(255,94,94,0.04) 0%,rgba(11,17,32,0.6) 100%);opacity:.72}
        .ea-at-top{display:flex;align-items:center;justify-content:space-between;padding:13px 14px 9px;gap:10px}
        .ea-at-left{display:flex;align-items:center;gap:10px}
        .ea-at-icon{position:relative;flex-shrink:0;width:34px;height:34px;border-radius:9px;background:var(--violet-dim);border:1px solid rgba(129,140,248,0.2);display:flex;align-items:center;justify-content:center;color:var(--violet)}
        .ea-at-icon-today{background:var(--teal-dim);border-color:rgba(15,212,192,0.25);color:var(--teal)}
        .ea-at-live{position:absolute;top:-3px;right:-3px;width:9px;height:9px;border-radius:50%;background:var(--teal);box-shadow:0 0 6px var(--teal);animation:livePulse 1.5s ease-in-out infinite}
        @keyframes livePulse{0%,100%{transform:scale(1);opacity:1}50%{transform:scale(1.4);opacity:.5}}
        .ea-at-label{font-size:13px;font-weight:700;color:var(--white);display:flex;align-items:center;gap:6px;margin-bottom:3px}
        .ea-at-date{font-size:11.5px;color:var(--white-soft)}
        .ea-at-chip{padding:2px 8px;border-radius:100px;font-size:10px;font-weight:700;letter-spacing:.3px}
        .ea-chip-today{background:var(--teal-dim);border:1px solid rgba(15,212,192,0.25);color:var(--teal);animation:livePulse 2s ease-in-out infinite}
        .ea-chip-soon{background:var(--violet-dim);border:1px solid rgba(129,140,248,0.2);color:var(--violet)}
        .ea-chip-past{background:var(--red-dim);border:1px solid rgba(255,94,94,0.18);color:var(--red)}
        .ea-at-stats{display:flex;align-items:center;padding:0 14px 11px;gap:6px}
        .ea-at-stat{display:flex;flex-direction:column;align-items:center;flex:1}
        .ea-at-stat-val{font-family:'Cabinet Grotesk',sans-serif;font-size:17px;font-weight:800;color:var(--white);line-height:1}
        .ea-at-stat-lbl{font-size:10px;color:var(--white-soft);margin-top:2px}
        .ea-at-sdiv{width:1px;height:30px;background:var(--border)}
        .ea-at-cta{padding:0 14px 14px}
        .ea-at-btn-active{width:100%;padding:10px;background:var(--teal);color:var(--navy);font-family:'Cabinet Grotesk',sans-serif;font-size:13px;font-weight:800;border:none;border-radius:9px;cursor:pointer;box-shadow:0 4px 16px rgba(15,212,192,.3);transition:transform .15s,box-shadow .2s;display:flex;align-items:center;justify-content:center;gap:7px}
        .ea-at-btn-active:hover:not(:disabled){transform:translateY(-1px);box-shadow:0 8px 22px rgba(15,212,192,.4)}
        .ea-at-btn-active:disabled{opacity:.65;cursor:not-allowed}
        .ea-at-spinner{width:13px;height:13px;border:2px solid rgba(11,17,32,.2);border-top-color:var(--navy);border-radius:50%;animation:spin .65s linear infinite;flex-shrink:0}
        @keyframes spin{to{transform:rotate(360deg)}}
        .ea-at-locked{display:flex;align-items:center;justify-content:center;gap:7px;padding:9px 14px;width:100%;background:var(--white-dim);border:1px solid var(--border);border-radius:9px;font-size:12.5px;font-weight:600;color:var(--white-soft)}
        .ea-at-locked-past{background:var(--red-dim);border-color:rgba(255,94,94,0.15);color:var(--red)}

        /* ── APTITUDE TEST MODAL ── */
        .at-overlay{position:fixed;inset:0;z-index:500;background:rgba(5,9,18,0.88);backdrop-filter:blur(10px);animation:atFade .25s ease both}
        @keyframes atFade{from{opacity:0}to{opacity:1}}
        .at-shell{position:fixed;top:50%;left:50%;transform:translate(-50%,-50%);width:min(530px,95vw);max-height:90vh;overflow-y:auto;background:#13192a;border:1px solid rgba(240,244,255,0.08);border-radius:22px;z-index:501;animation:atIn .35s cubic-bezier(.22,1,.36,1) both;scrollbar-width:thin;scrollbar-color:rgba(240,244,255,0.08) transparent}
        .at-shell-wide{width:min(660px,95vw)}
        @keyframes atIn{from{opacity:0;transform:translate(-50%,-47%) scale(.95)}to{opacity:1;transform:translate(-50%,-50%) scale(1)}}

        /* INTRO */
        .at-intro{padding:34px 30px 30px;display:flex;flex-direction:column;align-items:center;text-align:center;position:relative}
        .at-intro-glow{position:absolute;top:0;left:50%;transform:translateX(-50%);width:280px;height:180px;background:radial-gradient(ellipse at 50% 0%,rgba(129,140,248,0.13),transparent 70%);pointer-events:none}
        .at-close-x{position:absolute;top:14px;right:14px;width:28px;height:28px;border-radius:8px;background:var(--white-dim);border:1px solid var(--border);color:var(--white-soft);cursor:pointer;font-size:13px;display:flex;align-items:center;justify-content:center;transition:color .15s,background .15s}
        .at-close-x:hover{color:var(--red);background:var(--red-dim)}
        .at-intro-icon{width:64px;height:64px;border-radius:18px;background:var(--violet-dim);border:1px solid rgba(129,140,248,0.2);display:flex;align-items:center;justify-content:center;color:var(--violet);margin-bottom:16px;position:relative;z-index:1;box-shadow:0 0 40px rgba(129,140,248,0.1)}
        .at-intro-title{font-family:'Cabinet Grotesk',sans-serif;font-size:22px;font-weight:800;color:var(--white);letter-spacing:-.5px;margin-bottom:4px;position:relative;z-index:1}
        .at-intro-job{font-size:13px;color:var(--violet);font-weight:500;margin-bottom:22px;position:relative;z-index:1}
        .at-intro-grid{display:grid;grid-template-columns:repeat(4,1fr);gap:9px;width:100%;margin-bottom:16px}
        .at-info-card{background:var(--navy);border:1px solid var(--border);border-radius:11px;padding:13px 8px;display:flex;flex-direction:column;align-items:center;gap:5px}
        .at-info-icon{font-size:18px}
        .at-info-val{font-family:'Cabinet Grotesk',sans-serif;font-size:14px;font-weight:800;color:var(--white)}
        .at-info-lbl{font-size:10px;color:var(--white-soft)}
        .at-time-note{font-size:12px;color:var(--white-soft);padding:8px 14px;background:var(--white-dim);border:1px solid var(--border);border-radius:8px;margin-bottom:18px;width:100%;text-align:center}
        .at-time-note strong{color:var(--white)}
        .at-rules-box{width:100%;background:rgba(240,244,255,0.025);border:1px solid var(--border);border-radius:12px;padding:14px 16px;margin-bottom:22px;text-align:left}
        .at-rules-title{font-size:10px;font-weight:700;letter-spacing:1px;color:var(--white-soft);margin-bottom:10px}
        .at-rule-row{display:flex;align-items:center;gap:9px;font-size:12.5px;color:var(--white-soft);font-weight:300;margin-bottom:8px}
        .at-rule-row:last-child{margin-bottom:0}
        .at-rule-num{width:19px;height:19px;border-radius:6px;background:var(--violet-dim);border:1px solid rgba(129,140,248,0.2);display:flex;align-items:center;justify-content:center;font-size:10px;font-weight:700;color:var(--violet);flex-shrink:0}
        .at-start-btn{padding:13px 36px;background:var(--violet);border:none;border-radius:11px;font-family:'Cabinet Grotesk',sans-serif;font-size:14px;font-weight:800;color:#fff;cursor:pointer;box-shadow:0 6px 22px rgba(129,140,248,0.35);transition:transform .15s,box-shadow .2s}
        .at-start-btn:hover{transform:translateY(-2px);box-shadow:0 10px 28px rgba(129,140,248,0.45)}

        /* EXAM */
        .at-exam{display:flex;flex-direction:column;min-height:500px}
        .at-exam-top{display:flex;align-items:center;gap:14px;padding:16px 22px 12px;border-bottom:1px solid var(--border);background:rgba(240,244,255,0.02)}
        .at-prog-wrap{flex:1;display:flex;align-items:center;gap:10px}
        .at-prog{flex:1;height:5px;background:var(--white-dim);border-radius:100px;overflow:hidden}
        .at-prog-fill{height:100%;background:linear-gradient(90deg,var(--violet),#a78bfa);border-radius:100px;transition:width .4s cubic-bezier(.22,1,.36,1)}
        .at-qcount{font-size:12px;font-weight:600;color:var(--white-soft);white-space:nowrap}
        .at-qcount em{font-style:normal;color:rgba(154,170,191,0.4)}
        .at-timer{display:flex;align-items:center;gap:6px;position:relative;font-family:'Cabinet Grotesk',sans-serif;font-size:17px;font-weight:800;color:var(--white)}
        .at-timer-low{color:var(--red);animation:tPulse .8s ease-in-out infinite}
        @keyframes tPulse{0%,100%{opacity:1}50%{opacity:.5}}
        .at-timer-svg{position:absolute;right:-38px;top:50%;transform:translateY(-50%)}
        .at-timer span{padding-right:44px}
        .at-dots{display:flex;gap:5px;flex-wrap:wrap;padding:11px 22px 0}
        .at-dot{width:8px;height:8px;border-radius:50%;background:var(--white-dim);border:1.5px solid var(--border);transition:all .2s}
        .at-dot-done{background:rgba(129,140,248,0.3);border-color:rgba(129,140,248,0.5)}
        .at-dot-cur{background:var(--violet);border-color:var(--violet);box-shadow:0 0 6px rgba(129,140,248,0.5);transform:scale(1.35)}
        .at-qcard{padding:22px 22px 16px;flex:1;animation:atQIn .3s cubic-bezier(.22,1,.36,1) both}
        @keyframes atQIn{from{opacity:0;transform:translateX(12px)}to{opacity:1;transform:translateX(0)}}
        .at-qnum{font-size:11px;font-weight:700;letter-spacing:1px;text-transform:uppercase;color:var(--violet);margin-bottom:7px}
        .at-qnum span{color:rgba(129,140,248,0.35)}
        .at-qtext{font-family:'Cabinet Grotesk',sans-serif;font-size:16px;font-weight:700;color:var(--white);line-height:1.5;letter-spacing:-.2px;margin-bottom:20px}
        .at-opts{display:flex;flex-direction:column;gap:8px}
        .at-opt{display:flex;align-items:center;gap:11px;padding:12px 13px;background:var(--navy);border:1.5px solid var(--border);border-radius:11px;cursor:pointer;text-align:left;width:100%;transition:border-color .15s,background .15s,transform .1s}
        .at-opt:hover{border-color:rgba(129,140,248,0.3);transform:translateX(2px)}
        .at-opt-sel{border-color:var(--violet);background:rgba(129,140,248,0.07)}
        .at-opt-letter{width:28px;height:28px;border-radius:7px;background:var(--white-dim);border:1px solid var(--border);display:flex;align-items:center;justify-content:center;font-family:'Cabinet Grotesk',sans-serif;font-size:11px;font-weight:800;color:var(--white-soft);flex-shrink:0;transition:all .15s}
        .at-opt-sel .at-opt-letter{background:var(--violet);border-color:var(--violet);color:#fff}
        .at-opt-txt{flex:1;font-size:13px;color:var(--white-soft);transition:color .15s}
        .at-opt-sel .at-opt-txt{color:var(--white);font-weight:500}
        .at-opt-check{color:var(--teal);font-size:13px;font-weight:700}
        .at-exam-foot{padding:12px 22px 20px;border-top:1px solid var(--border);display:flex;align-items:center;gap:12px;background:rgba(240,244,255,0.02)}
        .at-answered{display:flex;align-items:center;gap:8px;flex:1;font-size:12px;color:var(--white-soft)}
        .at-ans-bar{width:60px;height:4px;background:var(--white-dim);border-radius:100px;overflow:hidden}
        .at-ans-fill{height:100%;background:var(--teal);border-radius:100px;transition:width .4s ease}
        .at-btn-next,.at-btn-submit{padding:10px 22px;border-radius:10px;font-family:'Cabinet Grotesk',sans-serif;font-size:13.5px;font-weight:800;cursor:pointer;border:none;transition:transform .15s,box-shadow .2s,opacity .15s}
        .at-btn-next:disabled{opacity:.4;cursor:not-allowed}
        .at-btn-next{background:var(--violet);color:#fff;box-shadow:0 4px 14px rgba(129,140,248,0.3)}
        .at-btn-next:hover:not(:disabled){transform:translateY(-1px);box-shadow:0 8px 20px rgba(129,140,248,0.4)}
        .at-btn-submit{background:var(--teal);color:var(--navy);box-shadow:0 4px 14px rgba(15,212,192,0.3)}
        .at-btn-submit:hover{transform:translateY(-1px);box-shadow:0 8px 20px rgba(15,212,192,0.4)}

        /* RESULT */
        .at-result{padding:30px 26px 26px;display:flex;flex-direction:column;align-items:center;text-align:center}
        .at-result-ring{position:relative;width:130px;height:130px;margin-bottom:16px}
        .at-result-center{position:absolute;inset:0;display:flex;flex-direction:column;align-items:center;justify-content:center}
        .at-result-score{font-family:'Cabinet Grotesk',sans-serif;font-size:26px;font-weight:800;color:var(--white);line-height:1}
        .at-result-score span{font-size:13px;color:var(--white-soft)}
        .at-result-pct{font-size:12px;color:var(--white-soft);margin-top:2px}
        .at-grade{padding:4px 13px;border-radius:100px;font-size:11.5px;font-weight:700;letter-spacing:.3px;margin-bottom:9px}
        .at-grade-teal {background:var(--teal-dim);  border:1px solid rgba(15,212,192,0.2); color:var(--teal)  }
        .at-grade-amber{background:var(--amber-dim); border:1px solid rgba(245,166,35,0.2); color:var(--amber) }
        .at-grade-blue {background:var(--blue-dim);  border:1px solid rgba(96,165,250,0.2); color:var(--blue)  }
        .at-grade-red  {background:var(--red-dim);   border:1px solid rgba(255,94,94,0.2);  color:var(--red)   }
        .at-result-title{font-family:'Cabinet Grotesk',sans-serif;font-size:20px;font-weight:800;color:var(--white);margin-bottom:5px}
        .at-result-sub{font-size:13px;color:var(--white-soft);font-weight:300;margin-bottom:20px}
        .at-score-strip{display:flex;align-items:center;width:100%;background:var(--navy);border:1px solid var(--border);border-radius:12px;padding:13px 8px;margin-bottom:20px;gap:4px}
        .at-ss-item{flex:1;text-align:center}
        .at-ss-val{font-family:'Cabinet Grotesk',sans-serif;font-size:19px;font-weight:800;color:var(--white)}
        .at-ss-lbl{font-size:10.5px;color:var(--white-soft);margin-top:1px}
        .at-ss-teal  {color:var(--teal)  }
        .at-ss-red   {color:var(--red)   }
        .at-ss-violet{color:var(--violet)}
        .at-ss-soft  {color:var(--white-soft)}
        .at-ss-div{width:1px;height:34px;background:var(--border);flex-shrink:0}
        .at-review{width:100%;text-align:left;max-height:250px;overflow-y:auto;margin-bottom:22px;display:flex;flex-direction:column;gap:6px;scrollbar-width:thin;scrollbar-color:rgba(240,244,255,0.07) transparent}
        .at-review-hdr{font-size:10px;font-weight:700;letter-spacing:1px;text-transform:uppercase;color:var(--white-soft);margin-bottom:4px}
        .at-rev-row{display:flex;align-items:flex-start;gap:8px;padding:10px 12px;border-radius:9px;border:1px solid var(--border);background:rgba(240,244,255,0.02)}
        .at-rev-ok {border-color:rgba(15,212,192,0.12);background:rgba(15,212,192,0.025)}
        .at-rev-bad{border-color:rgba(255,94,94,0.12); background:rgba(255,94,94,0.025) }
        .at-rev-icon{width:20px;height:20px;border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:10px;font-weight:700;flex-shrink:0;margin-top:1px}
        .at-rev-ok  .at-rev-icon{background:var(--teal-dim);color:var(--teal)}
        .at-rev-bad .at-rev-icon{background:var(--red-dim); color:var(--red) }
        .at-rev-body{flex:1;min-width:0}
        .at-rev-q{font-size:12px;color:var(--white);font-weight:500;margin-bottom:4px;line-height:1.4}
        .at-rev-ans{display:flex;gap:5px;flex-wrap:wrap}
        .at-rev-right{font-size:11px;color:var(--teal);      background:var(--teal-dim); padding:2px 7px;border-radius:5px;font-weight:600}
        .at-rev-wrong{font-size:11px;color:var(--red);       background:var(--red-dim);  padding:2px 7px;border-radius:5px;text-decoration:line-through}
        .at-rev-skip {font-size:11px;color:var(--white-soft);background:var(--white-dim);padding:2px 7px;border-radius:5px;font-style:italic}
        .at-done-btn{padding:11px 38px;background:var(--violet);border:none;border-radius:11px;font-family:'Cabinet Grotesk',sans-serif;font-size:14px;font-weight:800;color:#fff;cursor:pointer;box-shadow:0 5px 18px rgba(129,140,248,0.35);transition:transform .15s,box-shadow .2s}
        .at-done-btn:hover{transform:translateY(-2px);box-shadow:0 10px 26px rgba(129,140,248,0.45)}

        /* RESPONSIVE */
        @media(max-width:1100px){.ea-grid{grid-template-columns:repeat(2,1fr)}}
        @media(max-width:760px){
          .ea-hero,.ea-stats,.ea-tabs-wrap,.ea-grid-wrap{padding-left:24px;padding-right:24px}
          .ea-grid{grid-template-columns:1fr}
          .ea-hero{padding-top:110px}
          .at-intro-grid{grid-template-columns:repeat(2,1fr)}
          .at-shell{width:95vw}
        }
      `}</style>

      <div className="ea-root">

        {/* HERO */}
        <section className="ea-hero">
          <div className="ea-hero-inner">
            <div>
              <div className="ea-badge">
                <span className="ea-badge-dot" />
                {user?.username ? `Logged in as ${user.username}` : "Your dashboard"}
              </div>
              <h1 className="ea-hero-title">Your <em>applications</em></h1>
              <p className="ea-hero-sub">Track every role you've applied to — all in one place.</p>
            </div>
            <Link to="/job-listings-e" className="ea-hero-cta">
              Browse More Jobs
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/>
              </svg>
            </Link>
          </div>
        </section>

        {/* STATS */}
        {!loading && applications.length > 0 && (
          <div className="ea-stats">
            {[
              {key:"all",         label:"Total Applied",  color:"blue",  icon:<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/></svg>},
              {key:"interviewed", label:"Interviews",     color:"amber", icon:<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>},
              {key:"hired",       label:"Hired",          color:"teal",  icon:<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>},
              {key:"rejected",    label:"Not Progressed", color:"red",   icon:<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>},
            ].map(s => (
              <div className="ea-stat-pill" key={s.key}>
                <div className={`ea-stat-icon ${s.color}`}>{s.icon}</div>
                <div>
                  <div className="ea-stat-val">{s.key==="all"?applications.length:(statusCounts[s.key]||0)}</div>
                  <div className="ea-stat-lbl">{s.label}</div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* TABS */}
        {!loading && applications.length > 0 && (
          <div className="ea-tabs-wrap">
            <div className="ea-tabs">
              {filterTabs.map(t => (
                <button key={t.key} className={`ea-tab${filter===t.key?" active":""}`} onClick={()=>setFilter(t.key)}>
                  {t.label}<span className="ea-tab-count">{t.count}</span>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* GRID */}
        <div className="ea-grid-wrap">
          <div className="ea-grid">
            {loading ? (
              [...Array(6)].map((_,i) => (
                <div className="ea-skel" key={i}>
                  <div className="ea-skel-row">
                    <div className="ea-skel-logo"/>
                    <div style={{flex:1}}>
                      <div className="ea-skel-line" style={{width:"65%",marginBottom:8}}/>
                      <div className="ea-skel-line" style={{width:"40%"}}/>
                    </div>
                  </div>
                  <div className="ea-skel-line" style={{width:"50%",marginBottom:8}}/>
                  <div className="ea-skel-line" style={{width:"100%",height:48,borderRadius:11}}/>
                </div>
              ))
            ) : filtered.length > 0 ? (
              filtered.map((app, i) => (
                <AppCard
                  key={app.id || i}
                  application={app}
                  index={i}
                  onTakeTest={handleTakeTest}
                  fetchingJobId={fetchingJobId}
                />
              ))
            ) : (
              <div className="ea-empty">
                <div className="ea-empty-icon">
                  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
                    <polyline points="14 2 14 8 20 8"/>
                    <line x1="16" y1="13" x2="8" y2="13"/>
                    <line x1="16" y1="17" x2="8" y2="17"/>
                  </svg>
                </div>
                <div className="ea-empty-title">{applications.length===0?"No applications yet":`No ${filter} applications`}</div>
                <p className="ea-empty-sub">
                  {applications.length===0
                    ?"Start applying to jobs and track your progress here."
                    :"Try a different filter to see your other applications."}
                </p>
                {applications.length===0 && (
                  <Link to="/job-listings-e" className="ea-empty-cta">
                    Browse Jobs
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/>
                    </svg>
                  </Link>
                )}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Error toast */}
      {fetchError && (
        <div className="ea-toast">
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/>
          </svg>
          {fetchError}
          <button onClick={()=>setFetchError(null)} style={{marginLeft:8,background:"none",border:"none",color:"inherit",cursor:"pointer",fontSize:14}}>✕</button>
        </div>
      )}

      {/* Aptitude Test Modal — questions already loaded */}
      {activeTest && <AptitudeModal test={activeTest} onClose={() => setActiveTest(null)} />}
    </>
  );
};

export default EmployeeApplication;
