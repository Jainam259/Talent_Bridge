// // import React, { useEffect, useState, useRef } from "react";
// // import axios from "axios";
// // import { Link } from "react-router-dom";

// // const STATUS_CONFIG = {
// //   applied:     { label: "Applied",     color: "blue",   },
// //   interviewed: { label: "Interviewed", color: "amber",  },
// //   rejected:    { label: "Rejected",    color: "red",    },
// //   hired:       { label: "Hired",       color: "teal",   },
// // };

// // const getStatus = (s = "") =>
// //   STATUS_CONFIG[(s || "").toLowerCase()] || { label: s, color: "blue" };

// // const GRADIENTS = [
// //   "linear-gradient(135deg,#0fd4c0,#0b9e8e)",
// //   "linear-gradient(135deg,#f5a623,#c47d0a)",
// //   "linear-gradient(135deg,#818cf8,#4f46e5)",
// //   "linear-gradient(135deg,#f472b6,#db2777)",
// //   "linear-gradient(135deg,#34d399,#059669)",
// //   "linear-gradient(135deg,#60a5fa,#2563eb)",
// // ];

// // const getInitials = (s = "") =>
// //   s.split(" ").slice(0, 2).map(w => w[0]?.toUpperCase()).join("") || "J";

// // /* ═══════════════════════════
// //    APTITUDE TEST MODAL
// // ═══════════════════════════ */
// // const AptitudeTestModal = ({ job, onClose }) => {
// //   const [step, setStep]               = useState(1); // 1=schedule, 2=upload, 3=success
// //   const [scheduleDate, setScheduleDate] = useState("");
// //   const [scheduleTime, setScheduleTime] = useState("");
// //   const [examDuration, setExamDuration] = useState("");
// //   const [uploadType, setUploadType]   = useState(""); // "pdf" | "json"
// //   const [file, setFile]               = useState(null);
// //   const [jsonText, setJsonText]       = useState("");
// //   const [dragOver, setDragOver]       = useState(false);
// //   const [submitting, setSubmitting]   = useState(false);
// //   const [errors, setErrors]           = useState({});
// //   const fileRef = useRef();

// //   const validateStep1 = () => {
// //     const e = {};
// //     if (!scheduleDate) e.date = "Please select a date";
// //     if (!scheduleTime) e.time = "Please select a time";
// //     if (!examDuration || isNaN(examDuration) || +examDuration <= 0)
// //       e.duration = "Enter a valid duration in minutes";
// //     setErrors(e);
// //     return Object.keys(e).length === 0;
// //   };

// //   const validateStep2 = () => {
// //     const e = {};
// //     if (!uploadType) e.type = "Choose an upload format";
// //     if (uploadType === "pdf" && !file) e.file = "Please upload a PDF file";
// //     if (uploadType === "json" && !jsonText.trim()) e.json = "Please paste your JSON content";
// //     setErrors(e);
// //     return Object.keys(e).length === 0;
// //   };

// //   const handleDrop = (e) => {
// //     e.preventDefault();
// //     setDragOver(false);
// //     const dropped = e.dataTransfer.files[0];
// //     if (dropped?.type === "application/pdf") {
// //       setFile(dropped);
// //       setErrors(p => ({ ...p, file: undefined }));
// //     }
// //   };

// //   const handleFileChange = (e) => {
// //     const f = e.target.files[0];
// //     if (f) { setFile(f); setErrors(p => ({ ...p, file: undefined })); }
// //   };

// //   const handleNext = () => {
// //     if (step === 1 && validateStep1()) setStep(2);
// //   };

// //   const handleSubmit = async () => {
// //     if (!validateStep2()) return;
// //     setSubmitting(true);
// //     try {

// //       // Build form payload
// //       const fd = new FormData();
// //       fd.append("job_id", job.id);
// //       fd.append("schedule_date", scheduleDate);
// //       fd.append("schedule_time", scheduleTime);
// //       fd.append("exam_duration", examDuration);
// //       fd.append("upload_type", uploadType);
// //       fd.append("exam_json",jsonText);
// //       if (uploadType === "pdf" && file) fd.append("exam_file", file);
// //       if (uploadType === "json") fd.append("exam_json", jsonText);
// //       console.log(jsonText)
// //       await axios.post("http://127.0.0.1:8000/jobs/api/aptitude-test/create/", fd);
// //       setStep(3);
// //     } catch (err) {
// //       console.error(err);
// //     } finally {
// //       setSubmitting(false);
// //     }
// //   };

// //   const today = new Date().toISOString().split("T")[0];

// //   return (
// //     <>
// //       <div className="ap-backdrop" onClick={onClose} />
// //       <div className="ap-modal at-modal">
// //         {/* Top accent */}
// //         <div className="ap-modal-top at-modal-top" />

// //         {/* Header */}
// //         <div className="at-modal-header">
// //           <div className="at-modal-header-left">
// //             <div className="at-modal-icon">
// //               <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
// //                 <path d="M9 11l3 3L22 4"/><path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"/>
// //               </svg>
// //             </div>
// //             <div>
// //               <h2 className="at-modal-title">Schedule Aptitude Test</h2>
// //               <p className="at-modal-sub">{job?.title || "Job Role"}</p>
// //             </div>
// //           </div>
// //           {/* Step indicator */}
// //           <div className="at-steps">
// //             {[1,2].map(s => (
// //               <div key={s} className={`at-step${step >= s ? " done" : ""}${step === s && s < 3 ? " active" : ""}`}>
// //                 {step > s ? (
// //                   <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
// //                     <polyline points="20 6 9 17 4 12"/>
// //                   </svg>
// //                 ) : s}
// //               </div>
// //             ))}
// //             <div className="at-step-line" />
// //           </div>
// //           <button className="ap-modal-close" onClick={onClose}>
// //             <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
// //               <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
// //             </svg>
// //           </button>
// //         </div>

// //         {/* Body */}
// //         <div className="at-modal-body">

// //           {/* ── STEP 3: SUCCESS ── */}
// //           {step === 3 && (
// //             <div className="at-success">
// //               <div className="at-success-ring">
// //                 <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
// //                   <polyline points="20 6 9 17 4 12"/>
// //                 </svg>
// //               </div>
// //               <h3 className="at-success-title">Test Scheduled!</h3>
// //               <p className="at-success-sub">
// //                 Aptitude test for <strong>{job?.title}</strong> has been scheduled for{" "}
// //                 <strong>{scheduleDate}</strong> at <strong>{scheduleTime}</strong> with a{" "}
// //                 <strong>{examDuration}-minute</strong> time limit.
// //               </p>
// //               <div className="at-success-pills">
// //                 <span className="at-pill teal">
// //                   <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
// //                     <circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>
// //                   </svg>
// //                   {examDuration} min exam
// //                 </span>
// //                 <span className="at-pill amber">
// //                   <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
// //                     <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
// //                   </svg>
// //                   {uploadType?.toUpperCase()} format
// //                 </span>
// //               </div>
// //               <button className="at-close-btn" onClick={onClose}>Done</button>
// //             </div>
// //           )}

// //           {/* ── STEP 1: SCHEDULE ── */}
// //           {step === 1 && (
// //             <div className="at-step-body">
// //               <div className="at-section-label">
// //                 <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
// //                   <rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/>
// //                 </svg>
// //                 Exam Schedule
// //               </div>

// //               <div className="at-field-row">
// //                 <div className="at-field">
// //                   <label className="at-label">Date</label>
// //                   <div className={`at-input-wrap${errors.date ? " err" : ""}`}>
// //                     <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
// //                       <rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/>
// //                     </svg>
// //                     <input
// //                       type="date"
// //                       min={today}
// //                       value={scheduleDate}
// //                       onChange={e => { setScheduleDate(e.target.value); setErrors(p=>({...p,date:undefined})); }}
// //                       className="at-input"
// //                     />
// //                   </div>
// //                   {errors.date && <span className="at-error">{errors.date}</span>}
// //                 </div>

// //                 <div className="at-field">
// //                   <label className="at-label">Time</label>
// //                   <div className={`at-input-wrap${errors.time ? " err" : ""}`}>
// //                     <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
// //                       <circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>
// //                     </svg>
// //                     <input
// //                       type="time"
// //                       value={scheduleTime}
// //                       onChange={e => { setScheduleTime(e.target.value); setErrors(p=>({...p,time:undefined})); }}
// //                       className="at-input"
// //                     />
// //                   </div>
// //                   {errors.time && <span className="at-error">{errors.time}</span>}
// //                 </div>
// //               </div>

// //               <div className="at-section-label" style={{marginTop:20}}>
// //                 <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
// //                   <circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>
// //                 </svg>
// //                 Exam Duration
// //               </div>

// //               <div className="at-field">
// //                 <label className="at-label">Time limit (minutes)</label>
// //                 <div className={`at-input-wrap at-dur-wrap${errors.duration ? " err" : ""}`}>
// //                   <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
// //                     <circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>
// //                   </svg>
// //                   <input
// //                     type="number"
// //                     min="1"
// //                     max="300"
// //                     placeholder="e.g. 25"
// //                     value={examDuration}
// //                     onChange={e => { setExamDuration(e.target.value); setErrors(p=>({...p,duration:undefined})); }}
// //                     className="at-input"
// //                   />
// //                   <span className="at-input-suffix">min</span>
// //                 </div>
// //                 {errors.duration && <span className="at-error">{errors.duration}</span>}
// //                 {/* Quick picks */}
// //                 <div className="at-quick-picks">
// //                   {[15, 25, 30, 45, 60].map(m => (
// //                     <button
// //                       key={m}
// //                       className={`at-quick-btn${examDuration == m ? " active" : ""}`}
// //                       onClick={() => { setExamDuration(String(m)); setErrors(p=>({...p,duration:undefined})); }}
// //                     >{m}m</button>
// //                   ))}
// //                 </div>
// //               </div>
// //             </div>
// //           )}

// //           {/* ── STEP 2: UPLOAD EXAM ── */}
// //           {step === 2 && (
// //             <div className="at-step-body">
// //               <div className="at-section-label">
// //                 <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
// //                   <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
// //                   <polyline points="14 2 14 8 20 8"/>
// //                 </svg>
// //                 Upload MCQ Exam
// //               </div>

// //               {/* Format chooser */}
// //               <div className="at-format-row">
// //                 {[
// //                   { id: "pdf", icon: (
// //                     <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
// //                       <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
// //                       <polyline points="14 2 14 8 20 8"/>
// //                       <line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/>
// //                       <polyline points="10 9 9 9 8 9"/>
// //                     </svg>
// //                   ), label: "PDF File", desc: "Upload a formatted PDF" },
// //                   { id: "json", icon: (
// //                     <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
// //                       <polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/>
// //                     </svg>
// //                   ), label: "JSON Data", desc: "Structured MCQ questions" },
// //                 ].map(fmt => (
// //                   <div
// //                     key={fmt.id}
// //                     className={`at-format-card${uploadType === fmt.id ? " active" : ""}`}
// //                     onClick={() => { setUploadType(fmt.id); setErrors(p=>({...p,type:undefined})); }}
// //                   >
// //                     <div className="at-format-icon">{fmt.icon}</div>
// //                     <div className="at-format-label">{fmt.label}</div>
// //                     <div className="at-format-desc">{fmt.desc}</div>
// //                     <div className="at-format-check">
// //                       {uploadType === fmt.id && (
// //                         <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
// //                           <polyline points="20 6 9 17 4 12"/>
// //                         </svg>
// //                       )}
// //                     </div>
// //                   </div>
// //                 ))}
// //               </div>
// //               {errors.type && <span className="at-error" style={{marginTop:4,display:'block'}}>{errors.type}</span>}

// //               {/* PDF upload */}
// //               {uploadType === "pdf" && (
// //                 <div
// //                   className={`at-dropzone${dragOver ? " drag" : ""}${file ? " has-file" : ""}${errors.file ? " err" : ""}`}
// //                   onDragOver={e => { e.preventDefault(); setDragOver(true); }}
// //                   onDragLeave={() => setDragOver(false)}
// //                   onDrop={handleDrop}
// //                   onClick={() => fileRef.current?.click()}
// //                 >
// //                   <input ref={fileRef} type="file" accept=".pdf" hidden onChange={handleFileChange} />
// //                   {file ? (
// //                     <>
// //                       <div className="at-dz-file-icon">
// //                         <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
// //                           <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
// //                           <polyline points="14 2 14 8 20 8"/>
// //                         </svg>
// //                       </div>
// //                       <div className="at-dz-filename">{file.name}</div>
// //                       <div className="at-dz-filesize">{(file.size / 1024).toFixed(1)} KB · Click to replace</div>
// //                     </>
// //                   ) : (
// //                     <>
// //                       <div className="at-dz-icon">
// //                         <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
// //                           <polyline points="16 16 12 12 8 16"/><line x1="12" y1="12" x2="12" y2="21"/>
// //                           <path d="M20.39 18.39A5 5 0 0 0 18 9h-1.26A8 8 0 1 0 3 16.3"/>
// //                         </svg>
// //                       </div>
// //                       <div className="at-dz-title">Drop PDF here or <span>browse</span></div>
// //                       <div className="at-dz-sub">Only .pdf files · MCQ format recommended</div>
// //                     </>
// //                   )}
// //                 </div>
// //               )}
// //               {errors.file && <span className="at-error">{errors.file}</span>}

// //               {/* JSON upload */}
// //               {uploadType === "json" && (
// //                 <div className="at-json-wrap">
// //                   <div className="at-json-header">
// //                     <span>questions.json</span>
// //                     <button className="at-json-sample" onClick={() => setJsonText(JSON.stringify([
// //                       { id: 1, question: "What is the time complexity of binary search?", options: ["O(n)","O(log n)","O(n²)","O(1)"], answer: 1 },
// //                       { id: 2, question: "Which data structure uses LIFO?", options: ["Queue","Stack","Heap","Tree"], answer: 1 }
// //                     ], null, 2))}>Insert sample</button>
// //                   </div>
// //                   <textarea
// //                     className={`at-json-editor${errors.json ? " err" : ""}`}
// //                     placeholder={`[\n  {\n    "id": 1,\n    "question": "Your question here?",\n    "options": ["A","B","C","D"],\n    "answer": 0\n  }\n]`}
// //                     value={jsonText}
// //                     onChange={e => { setJsonText(e.target.value); setErrors(p=>({...p,json:undefined})); }}
// //                     spellCheck={false}
// //                   />
// //                   {errors.json && <span className="at-error">{errors.json}</span>}
// //                 </div>
// //               )}

// //               {/* Summary bar */}
// //               <div className="at-summary-bar">
// //                 <div className="at-sum-item">
// //                   <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
// //                     <rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/>
// //                     <line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/>
// //                   </svg>
// //                   {scheduleDate || "—"} at {scheduleTime || "—"}
// //                 </div>
// //                 <div className="at-sum-dot" />
// //                 <div className="at-sum-item">
// //                   <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
// //                     <circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>
// //                   </svg>
// //                   {examDuration} min
// //                 </div>
// //               </div>
// //             </div>
// //           )}
// //         </div>

// //         {/* Footer */}
// //         {step < 3 && (
// //           <div className="at-modal-footer">
// //             {step === 2 && (
// //               <button className="at-back-btn" onClick={() => setStep(1)}>
// //                 <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
// //                   <line x1="19" y1="12" x2="5" y2="12"/><polyline points="12 19 5 12 12 5"/>
// //                 </svg>
// //                 Back
// //               </button>
// //             )}
// //             <div style={{flex:1}} />
// //             {step === 1 && (
// //               <button className="ap-submit-btn at-next-btn" onClick={handleNext}>
// //                 Next — Upload Exam
// //                 <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
// //                   <line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/>
// //                 </svg>
// //               </button>
// //             )}
// //             {step === 2 && (
// //               <button className="ap-submit-btn at-next-btn" onClick={handleSubmit} disabled={submitting}>
// //                 {submitting ? <><span className="ap-spinner" /> Scheduling…</> : <>
// //                   Schedule Test
// //                   <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
// //                     <polyline points="20 6 9 17 4 12"/>
// //                   </svg>
// //                 </>}
// //               </button>
// //             )}
// //           </div>
// //         )}
// //       </div>
// //     </>
// //   );
// // };

// // /* ═══════════════════════════
// //    APPLICANT MODAL
// // ═══════════════════════════ */
// // const ApplicantModal = ({ applicant, onClose, onStatusUpdate }) => {
// //   const [status,    setStatus]    = useState("");
// //   const [submitting, setSubmit]   = useState(false);
// //   const [success,   setSuccess]   = useState(false);

// //   const handleSubmit = async () => {
// //     if (!status) return;
// //     setSubmit(true);
// //     try {
// //       await axios.patch(
// //         `http://127.0.0.1:8000/applications/api/update-status/${applicant.id}/`,
// //         { status }
// //       );
// //       setSuccess(true);
// //       setTimeout(() => { onStatusUpdate(); onClose(); }, 1200);
// //     } catch (err) {
// //       console.error(err);
// //     } finally {
// //       setSubmit(false);
// //     }
// //   };

// //   const initials = getInitials(applicant.name || "A");

// //   return (
// //     <>
// //       <div className="ap-backdrop" onClick={onClose} />
// //       <div className="ap-modal">
// //         <div className="ap-modal-top" />
// //         <div className="ap-modal-header">
// //           <div className="ap-modal-avatar">{initials}</div>
// //           <div className="ap-modal-info">
// //             <h2 className="ap-modal-name">{applicant.name || "Applicant"}</h2>
// //             <a href={`mailto:${applicant.email}`} className="ap-modal-email">
// //               <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
// //                 <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
// //                 <polyline points="22,6 12,13 2,6"/>
// //               </svg>
// //               {applicant.email}
// //             </a>
// //             {applicant.status && (
// //               <span className={`ap-modal-cur-status ap-status-${getStatus(applicant.status).color}`}>
// //                 {getStatus(applicant.status).label}
// //               </span>
// //             )}
// //           </div>
// //           <button className="ap-modal-close" onClick={onClose}>
// //             <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
// //               <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
// //             </svg>
// //           </button>
// //         </div>
// //         <div className="ap-modal-body">
// //           <div className="ap-resume-label">
// //             <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
// //               <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
// //               <polyline points="14 2 14 8 20 8"/>
// //             </svg>
// //             Resume / CV
// //           </div>
// //           <div className="ap-resume-frame">
// //             <iframe
// //               src={applicant.file || "/media/resumes/T2_-_UNIT_-_5.pdf"}
// //               title="Resume"
// //               className="ap-iframe"
// //             />
// //           </div>
// //         </div>
// //         <div className="ap-modal-footer">
// //           {success ? (
// //             <div className="ap-success-msg">
// //               <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
// //                 <polyline points="20 6 9 17 4 12"/>
// //               </svg>
// //               Status updated successfully!
// //             </div>
// //           ) : (
// //             <>
// //               <div className="ap-footer-label">Update applicant status</div>
// //               <div className="ap-footer-row">
// //                 <div className="ap-status-chips">
// //                   {["interviewed", "hired", "rejected"].map(s => {
// //                     const cfg = STATUS_CONFIG[s];
// //                     return (
// //                       <div
// //                         key={s}
// //                         className={`ap-chip ap-chip-${cfg.color}${status === s ? " active" : ""}`}
// //                         onClick={() => setStatus(s)}
// //                       >
// //                         {cfg.label}
// //                       </div>
// //                     );
// //                   })}
// //                 </div>
// //                 <button
// //                   className="ap-submit-btn"
// //                   onClick={handleSubmit}
// //                   disabled={!status || submitting}
// //                 >
// //                   {submitting ? (
// //                     <><span className="ap-spinner" /> Saving…</>
// //                   ) : (
// //                     <>
// //                       Update
// //                       <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
// //                         <polyline points="20 6 9 17 4 12"/>
// //                       </svg>
// //                     </>
// //                   )}
// //                 </button>
// //               </div>
// //             </>
// //           )}
// //         </div>
// //       </div>
// //     </>
// //   );
// // };

// // /* ═══════════════════════════
// //    JOB ROW
// // ═══════════════════════════ */
// // const JobRow = ({ job, index, onOpenApplicant, onOpenAptitude }) => {
// //   const [expanded,   setExpanded]   = useState(false);
// //   const [applicants, setApplicants] = useState([]);
// //   const [loading,    setLoading]    = useState(false);
// //   const [fetched,    setFetched]    = useState(false);

// //   const toggle = async () => {
// //     if (!expanded && !fetched) {
// //       setLoading(true);
// //       try {
// //         const res = await axios.get(
// //           `http://127.0.0.1:8000/applications/api/applied/${job.id}/`
// //         );
// //         setApplicants(res.data);
// //         setFetched(true);
// //       } catch (err) {
// //         console.error(err);
// //       } finally {
// //         setLoading(false);
// //       }
// //     }
// //     setExpanded(p => !p);
// //   };

// //   const gradient = GRADIENTS[index % GRADIENTS.length];
// //   const initials  = getInitials(job.title);

// //   return (
// //     <div className={`jr-row${expanded ? " open" : ""}`} style={{ animationDelay: `${index * 0.06}s` }}>
// //       {/* Job header */}
// //       <div className="jr-header" onClick={toggle}>
// //         <div className="jr-logo" style={{ background: gradient }}>{initials}</div>
// //         <div className="jr-info">
// //           <h3 className="jr-title">{job.title}</h3>
// //           <p className="jr-desc">{(job.description || "").substring(0, 90)}{job.description?.length > 90 ? "…" : ""}</p>
// //           <div className="jr-meta">
// //             {job.type && (
// //               <span className="jr-meta-pill">
// //                 <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
// //                   <circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>
// //                 </svg>
// //                 {job.type}
// //               </span>
// //             )}
// //             {job.location && (
// //               <span className="jr-meta-pill">
// //                 <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
// //                   <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/>
// //                 </svg>
// //                 {job.location}
// //               </span>
// //             )}
// //             {fetched && (
// //               <span className="jr-meta-pill jr-applicant-count">
// //                 <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
// //                   <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/>
// //                   <path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/>
// //                 </svg>
// //                 {applicants.length} applicant{applicants.length !== 1 ? "s" : ""}
// //               </span>
// //             )}
// //           </div>
// //         </div>

// //         {/* Actions */}
// //         <div className="jr-actions" onClick={e => e.stopPropagation()}>
// //           <button
// //             className="jr-aptitude-btn"
// //             onClick={() => onOpenAptitude(job)}
// //             title="Schedule Aptitude Test"
// //           >
// //             <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
// //               <path d="M9 11l3 3L22 4"/><path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"/>
// //             </svg>
// //             <span>Aptitude Test</span>
// //           </button>
// //           <div className="jr-toggle-btn">
// //             {loading ? (
// //               <span className="jr-spinner" />
// //             ) : (
// //               <>
// //                 <span className="jr-toggle-label">{expanded ? "Hide" : "View Applicants"}</span>
// //                 <div className={`jr-chevron${expanded ? " open" : ""}`}>
// //                   <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
// //                     <polyline points="6 9 12 15 18 9"/>
// //                   </svg>
// //                 </div>
// //               </>
// //             )}
// //           </div>
// //         </div>
// //       </div>

// //       {/* Applicants panel */}
// //       {expanded && (
// //         <div className="jr-applicants">
// //           {applicants.length === 0 ? (
// //             <div className="jr-no-apps">
// //               <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
// //                 <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/>
// //               </svg>
// //               No applicants yet for this role.
// //             </div>
// //           ) : (
// //             <div className="jr-app-grid">
// //               {applicants.map((applicant, i) => {
// //                 const st = getStatus(applicant.status);
// //                 const aInit = getInitials(applicant.name || "A");
// //                 const aGrad = GRADIENTS[(i + 3) % GRADIENTS.length];
// //                 return (
// //                   <div
// //                     key={applicant.id || i}
// //                     className="jr-app-card"
// //                     style={{ animationDelay: `${i * 0.05}s` }}
// //                   >
// //                     <div className="jr-app-avatar" style={{ background: aGrad }}>{aInit}</div>
// //                     <div className="jr-app-info">
// //                       <div className="jr-app-name">{applicant.name || "Applicant"}</div>
// //                       <div className="jr-app-email">{applicant.email}</div>
// //                     </div>
// //                     <span className={`jr-app-status ap-status-${st.color}`}>{st.label}</span>
// //                     <button
// //                       className="jr-view-btn"
// //                       onClick={() => onOpenApplicant(applicant)}
// //                     >
// //                       Review
// //                       <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
// //                         <line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/>
// //                       </svg>
// //                     </button>
// //                   </div>
// //                 );
// //               })}
// //             </div>
// //           )}
// //         </div>
// //       )}
// //     </div>
// //   );
// // };

// // /* ═══════════════════════════
// //    MAIN PAGE
// // ═══════════════════════════ */
// // const Applied = () => {
// //   const [jobs,              setJobs]             = useState([]);
// //   const [loading,           setLoading]          = useState(true);
// //   const [error,             setError]            = useState(null);
// //   const [selectedApplicant, setSelectedApplicant]= useState(null);
// //   const [aptitudeJob,       setAptitudeJob]      = useState(null);
// //   const [refreshKey,        setRefreshKey]       = useState(0);

// //   const user = JSON.parse(localStorage.getItem("user"));

// //   useEffect(() => {
// //     const fetchJobs = async () => {
// //       try {
// //         const res = await axios.get("http://127.0.0.1:8000/jobs/api/employer-jobs", {
// //           params: { username: user?.username },
// //         });
// //         setJobs(res.data);
// //       } catch (err) {
// //         setError(err.message);
// //       } finally {
// //         setLoading(false);
// //       }
// //     };
// //     fetchJobs();
// //   }, [refreshKey]);

// //   return (
// //     <>
// //       <style>{`
// //         @import url('https://fonts.googleapis.com/css2?family=Cabinet+Grotesk:wght@400;500;700;800&family=Instrument+Serif:ital@0;1&family=Geist:wght@300;400;500&display=swap');

// //         *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

// //         :root {
// //           --navy:       #0b1120;
// //           --navy-mid:   #111827;
// //           --navy-card:  #131e30;
// //           --teal:       #0fd4c0;
// //           --teal-dim:   rgba(15,212,192,0.1);
// //           --amber:      #f5a623;
// //           --amber-dim:  rgba(245,166,35,0.1);
// //           --red:        #ff5e5e;
// //           --red-dim:    rgba(255,94,94,0.1);
// //           --blue:       #60a5fa;
// //           --blue-dim:   rgba(96,165,250,0.12);
// //           --violet:     #818cf8;
// //           --violet-dim: rgba(129,140,248,0.1);
// //           --white:      #f0f4ff;
// //           --white-soft: #9aaabf;
// //           --white-dim:  rgba(240,244,255,0.05);
// //           --border:     rgba(240,244,255,0.07);
// //         }

// //         .ap-root {
// //           background: var(--navy);
// //           font-family: 'Geist', sans-serif;
// //           color: var(--white);
// //           min-height: 100vh;
// //         }

// //         /* ── HERO ── */
// //         .ap-hero {
// //           position: relative;
// //           padding: 130px 48px 60px;
// //           overflow: hidden;
// //         }
// //         .ap-hero::before {
// //           content: '';
// //           position: absolute; inset: 0;
// //           background: radial-gradient(ellipse 65% 55% at 50% 0%, rgba(15,212,192,0.07) 0%, transparent 65%);
// //           pointer-events: none;
// //         }
// //         .ap-hero::after {
// //           content: '';
// //           position: absolute; inset: 0;
// //           background-image: radial-gradient(rgba(240,244,255,0.045) 1px, transparent 1px);
// //           background-size: 36px 36px;
// //           pointer-events: none;
// //           mask-image: radial-gradient(ellipse 80% 80% at 50% 30%, black 20%, transparent 100%);
// //         }
// //         .ap-hero-inner {
// //           position: relative; z-index: 1;
// //           max-width: 1100px; margin: 0 auto;
// //           display: flex; align-items: flex-end;
// //           justify-content: space-between; gap: 24px; flex-wrap: wrap;
// //           opacity: 0;
// //           animation: apFade .65s cubic-bezier(.22,1,.36,1) .08s forwards;
// //         }
// //         @keyframes apFade {
// //           from { opacity:0; transform:translateY(16px); }
// //           to   { opacity:1; transform:translateY(0); }
// //         }
// //         .ap-badge {
// //           display: inline-flex; align-items: center; gap: 7px;
// //           padding: 5px 13px 5px 9px;
// //           background: rgba(15,212,192,0.07);
// //           border: 1px solid rgba(15,212,192,0.17);
// //           border-radius: 100px;
// //           font-size: 12px; font-weight: 500; color: var(--teal);
// //           margin-bottom: 14px;
// //         }
// //         .ap-badge-dot {
// //           width: 6px; height: 6px; border-radius: 50%;
// //           background: var(--teal); box-shadow: 0 0 6px var(--teal);
// //           animation: bdPulse 2s ease-in-out infinite;
// //         }
// //         @keyframes bdPulse { 0%,100%{opacity:1;transform:scale(1)} 50%{opacity:.4;transform:scale(.7)} }
// //         .ap-hero-title {
// //           font-family: 'Cabinet Grotesk', sans-serif;
// //           font-size: clamp(32px, 4vw, 50px);
// //           font-weight: 800; color: var(--white);
// //           letter-spacing: -1.5px; line-height: 1.1; margin-bottom: 10px;
// //         }
// //         .ap-hero-title em {
// //           font-family: 'Instrument Serif', serif;
// //           font-style: italic; font-weight: 400;
// //           color: var(--teal); letter-spacing: -1.5px;
// //         }
// //         .ap-hero-sub {
// //           font-size: 15px; color: var(--white-soft);
// //           font-weight: 300; line-height: 1.6;
// //         }
// //         .ap-post-btn {
// //           display: inline-flex; align-items: center; gap: 7px;
// //           padding: 12px 22px;
// //           background: var(--teal); color: var(--navy);
// //           font-family: 'Cabinet Grotesk', sans-serif;
// //           font-size: 13.5px; font-weight: 800;
// //           border-radius: 10px; text-decoration: none;
// //           box-shadow: 0 6px 20px rgba(15,212,192,0.28);
// //           transition: transform .15s, box-shadow .2s;
// //           flex-shrink: 0;
// //         }
// //         .ap-post-btn:hover {
// //           transform: translateY(-1px);
// //           box-shadow: 0 10px 28px rgba(15,212,192,0.38);
// //         }

// //         /* ── STATS ── */
// //         .ap-stats {
// //           max-width: 1100px; margin: 0 auto;
// //           padding: 0 48px 28px;
// //           display: flex; gap: 14px; flex-wrap: wrap;
// //         }
// //         .ap-stat-card {
// //           padding: 16px 20px;
// //           background: var(--navy-card);
// //           border: 1px solid var(--border);
// //           border-radius: 12px;
// //           display: flex; align-items: center; gap: 12px;
// //           transition: border-color .2s;
// //         }
// //         .ap-stat-card:hover { border-color: rgba(15,212,192,0.2); }
// //         .ap-stat-icon {
// //           width: 36px; height: 36px; border-radius: 9px;
// //           display: flex; align-items: center; justify-content: center;
// //           flex-shrink: 0;
// //         }
// //         .ap-stat-icon.teal  { background:var(--teal-dim);  border:1px solid rgba(15,212,192,0.15); color:var(--teal);  }
// //         .ap-stat-icon.amber { background:var(--amber-dim); border:1px solid rgba(245,166,35,0.15); color:var(--amber); }
// //         .ap-stat-val {
// //           font-family: 'Cabinet Grotesk', sans-serif;
// //           font-size: 22px; font-weight: 800; color: var(--white);
// //           line-height: 1; margin-bottom: 1px;
// //         }
// //         .ap-stat-lbl { font-size: 12px; color: var(--white-soft); }

// //         /* ── JOBS LIST ── */
// //         .ap-jobs-wrap {
// //           max-width: 1100px; margin: 0 auto;
// //           padding: 0 48px 80px;
// //         }

// //         /* ── JOB ROW ── */
// //         .jr-row {
// //           background: var(--navy-card);
// //           border: 1px solid var(--border);
// //           border-radius: 18px; margin-bottom: 16px;
// //           overflow: hidden;
// //           opacity: 0;
// //           animation: apFade .55s cubic-bezier(.22,1,.36,1) forwards;
// //           transition: border-color .22s;
// //         }
// //         .jr-row.open { border-color: rgba(15,212,192,0.2); }
// //         .jr-row:hover { border-color: rgba(15,212,192,0.15); }
// //         .jr-header {
// //           display: flex; align-items: center; gap: 18px;
// //           padding: 24px 28px; cursor: pointer;
// //           transition: background .15s;
// //         }
// //         .jr-header:hover { background: rgba(240,244,255,0.02); }
// //         .jr-logo {
// //           width: 52px; height: 52px; border-radius: 13px;
// //           display: flex; align-items: center; justify-content: center;
// //           font-family: 'Cabinet Grotesk', sans-serif;
// //           font-size: 15px; font-weight: 800; color: #0b1120;
// //           flex-shrink: 0;
// //           box-shadow: 0 4px 14px rgba(0,0,0,0.3);
// //         }
// //         .jr-info { flex: 1; min-width: 0; }
// //         .jr-title {
// //           font-family: 'Cabinet Grotesk', sans-serif;
// //           font-size: 17px; font-weight: 700;
// //           color: var(--white); letter-spacing: -0.3px; margin-bottom: 4px;
// //         }
// //         .jr-desc {
// //           font-size: 13.5px; color: var(--white-soft);
// //           font-weight: 300; margin-bottom: 10px; line-height: 1.5;
// //         }
// //         .jr-meta { display: flex; gap: 8px; flex-wrap: wrap; }
// //         .jr-meta-pill {
// //           display: inline-flex; align-items: center; gap: 5px;
// //           padding: 3px 10px;
// //           background: var(--white-dim); border: 1px solid var(--border);
// //           border-radius: 100px; font-size: 11.5px; color: var(--white-soft);
// //         }
// //         .jr-applicant-count { color: var(--teal); border-color: rgba(15,212,192,0.2); background: var(--teal-dim); }

// //         /* ── ACTIONS (new container) ── */
// //         .jr-actions {
// //           display: flex; align-items: center; gap: 10px; flex-shrink: 0;
// //         }

// //         /* ── APTITUDE TEST BUTTON ── */
// //         .jr-aptitude-btn {
// //           display: inline-flex; align-items: center; gap: 7px;
// //           padding: 9px 16px;
// //           background: var(--violet-dim);
// //           border: 1px solid rgba(129,140,248,0.25);
// //           border-radius: 10px;
// //           font-family: 'Cabinet Grotesk', sans-serif;
// //           font-size: 13px; font-weight: 700;
// //           color: var(--violet); cursor: pointer;
// //           flex-shrink: 0;
// //           transition: background .15s, border-color .15s, transform .15s, box-shadow .2s;
// //           white-space: nowrap;
// //         }
// //         .jr-aptitude-btn:hover {
// //           background: rgba(129,140,248,0.15);
// //           border-color: rgba(129,140,248,0.45);
// //           transform: translateY(-1px);
// //           box-shadow: 0 4px 16px rgba(129,140,248,0.2);
// //         }
// //         .jr-aptitude-btn span { display: none; }
// //         @media (min-width: 900px) {
// //           .jr-aptitude-btn span { display: inline; }
// //         }

// //         .jr-toggle-btn {
// //           display: flex; align-items: center; gap: 8px;
// //           padding: 9px 16px;
// //           border: 1px solid var(--border); border-radius: 10px;
// //           font-size: 13px; color: var(--white-soft);
// //           flex-shrink: 0;
// //           transition: border-color .15s, color .15s, background .15s;
// //         }
// //         .jr-row.open .jr-toggle-btn,
// //         .jr-header:hover .jr-toggle-btn {
// //           border-color: rgba(15,212,192,0.3);
// //           color: var(--teal); background: var(--teal-dim);
// //         }
// //         .jr-toggle-label { font-weight: 500; white-space: nowrap; }
// //         .jr-chevron { transition: transform .25s ease; color: var(--white-soft); }
// //         .jr-chevron.open { transform: rotate(180deg); }
// //         .jr-row.open .jr-chevron { color: var(--teal); }
// //         .jr-spinner {
// //           width: 14px; height: 14px;
// //           border: 2px solid var(--border);
// //           border-top-color: var(--teal);
// //           border-radius: 50%;
// //           animation: spin .65s linear infinite;
// //         }
// //         @keyframes spin { to { transform: rotate(360deg); } }

// //         /* Applicants panel */
// //         .jr-applicants {
// //           border-top: 1px solid var(--border);
// //           padding: 20px 28px 24px;
// //           background: rgba(240,244,255,0.02);
// //           animation: apFade .35s ease both;
// //         }
// //         .jr-no-apps {
// //           display: flex; align-items: center; gap: 10px;
// //           padding: 20px; text-align: center;
// //           justify-content: center;
// //           font-size: 14px; color: var(--white-soft);
// //           font-weight: 300;
// //         }
// //         .jr-app-grid {
// //           display: grid;
// //           grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
// //           gap: 12px;
// //         }
// //         .jr-app-card {
// //           background: var(--navy);
// //           border: 1px solid var(--border);
// //           border-radius: 13px; padding: 16px;
// //           display: flex; align-items: center; gap: 12px;
// //           opacity: 0;
// //           animation: apFade .4s cubic-bezier(.22,1,.36,1) forwards;
// //           transition: border-color .2s, transform .2s;
// //         }
// //         .jr-app-card:hover {
// //           border-color: rgba(15,212,192,0.2);
// //           transform: translateY(-1px);
// //         }
// //         .jr-app-avatar {
// //           width: 40px; height: 40px; border-radius: 10px;
// //           display: flex; align-items: center; justify-content: center;
// //           font-family: 'Cabinet Grotesk', sans-serif;
// //           font-size: 13px; font-weight: 800; color: #0b1120;
// //           flex-shrink: 0;
// //         }
// //         .jr-app-info { flex: 1; min-width: 0; }
// //         .jr-app-name {
// //           font-size: 14px; font-weight: 600;
// //           color: var(--white); margin-bottom: 2px;
// //           white-space: nowrap; overflow: hidden; text-overflow: ellipsis;
// //         }
// //         .jr-app-email {
// //           font-size: 12px; color: var(--white-soft);
// //           white-space: nowrap; overflow: hidden; text-overflow: ellipsis;
// //         }
// //         .jr-app-status {
// //           padding: 3px 9px; border-radius: 100px;
// //           font-size: 11px; font-weight: 600; flex-shrink: 0;
// //         }
// //         .jr-view-btn {
// //           display: inline-flex; align-items: center; gap: 5px;
// //           padding: 7px 14px;
// //           background: var(--teal-dim);
// //           border: 1px solid rgba(15,212,192,0.2);
// //           border-radius: 8px;
// //           font-family: 'Cabinet Grotesk', sans-serif;
// //           font-size: 12.5px; font-weight: 700;
// //           color: var(--teal); cursor: pointer;
// //           flex-shrink: 0;
// //           transition: background .15s, border-color .15s;
// //         }
// //         .jr-view-btn:hover {
// //           background: rgba(15,212,192,0.15);
// //           border-color: rgba(15,212,192,0.35);
// //         }

// //         /* ── STATUS BADGE COLORS ── */
// //         .ap-status-blue   { background:var(--blue-dim);  border:1px solid rgba(96,165,250,0.2);  color:var(--blue);  }
// //         .ap-status-amber  { background:var(--amber-dim); border:1px solid rgba(245,166,35,0.2);  color:var(--amber); }
// //         .ap-status-teal   { background:var(--teal-dim);  border:1px solid rgba(15,212,192,0.2);  color:var(--teal);  }
// //         .ap-status-red    { background:var(--red-dim);   border:1px solid rgba(255,94,94,0.2);   color:var(--red);   }

// //         /* ── APPLICANT MODAL ── */
// //         .ap-backdrop {
// //           position: fixed; inset: 0;
// //           background: rgba(5, 9, 18, 0.75);
// //           backdrop-filter: blur(6px);
// //           z-index: 400;
// //           animation: bdFade .25s ease both;
// //         }
// //         @keyframes bdFade { from{opacity:0} to{opacity:1} }
// //         .ap-modal {
// //           position: fixed;
// //           top: 50%; left: 50%;
// //           transform: translate(-50%, -50%);
// //           width: min(680px, 95vw);
// //           background: #16202f;
// //           border: 1px solid var(--border);
// //           border-radius: 22px;
// //           overflow: hidden;
// //           z-index: 401;
// //           display: flex; flex-direction: column;
// //           animation: modalIn .35s cubic-bezier(.22,1,.36,1) both;
// //         }
// //         @keyframes modalIn {
// //           from { opacity:0; transform:translate(-50%,-46%) scale(.96); }
// //           to   { opacity:1; transform:translate(-50%,-50%) scale(1); }
// //         }
// //         .ap-modal-top {
// //           height: 2px;
// //           background: linear-gradient(90deg, var(--teal), rgba(15,212,192,0.15));
// //         }
// //         .ap-modal-header {
// //           padding: 24px 28px 20px;
// //           display: flex; align-items: center; gap: 16px;
// //           border-bottom: 1px solid var(--border);
// //         }
// //         .ap-modal-avatar {
// //           width: 54px; height: 54px; border-radius: 14px;
// //           background: linear-gradient(135deg, #0fd4c0, #0b9e8e);
// //           display: flex; align-items: center; justify-content: center;
// //           font-family: 'Cabinet Grotesk', sans-serif;
// //           font-size: 18px; font-weight: 800; color: #0b1120;
// //           flex-shrink: 0;
// //         }
// //         .ap-modal-info { flex: 1; min-width: 0; }
// //         .ap-modal-name {
// //           font-family: 'Cabinet Grotesk', sans-serif;
// //           font-size: 20px; font-weight: 800;
// //           color: var(--white); letter-spacing: -0.4px; margin-bottom: 5px;
// //         }
// //         .ap-modal-email {
// //           display: flex; align-items: center; gap: 6px;
// //           font-size: 13px; color: var(--white-soft);
// //           text-decoration: none; font-weight: 300;
// //           transition: color .15s;
// //         }
// //         .ap-modal-email:hover { color: var(--teal); }
// //         .ap-modal-cur-status {
// //           display: inline-block;
// //           margin-top: 7px;
// //           padding: 3px 10px; border-radius: 100px;
// //           font-size: 11.5px; font-weight: 600;
// //         }
// //         .ap-modal-close {
// //           width: 34px; height: 34px; border-radius: 9px;
// //           background: var(--white-dim); border: 1px solid var(--border);
// //           display: flex; align-items: center; justify-content: center;
// //           color: var(--white-soft); cursor: pointer; flex-shrink: 0;
// //           transition: color .15s, background .15s, border-color .15s;
// //         }
// //         .ap-modal-close:hover {
// //           color: var(--red); background: var(--red-dim);
// //           border-color: rgba(255,94,94,0.2);
// //         }
// //         .ap-modal-body { padding: 20px 28px; flex: 1; }
// //         .ap-resume-label {
// //           font-size: 11.5px; font-weight: 600;
// //           letter-spacing: 0.8px; text-transform: uppercase;
// //           color: var(--white-soft); margin-bottom: 10px;
// //           display: flex; align-items: center; gap: 7px;
// //         }
// //         .ap-resume-frame {
// //           border: 1px solid var(--border);
// //           border-radius: 12px; overflow: hidden;
// //           height: 340px; background: rgba(240,244,255,0.02);
// //         }
// //         .ap-iframe { width: 100%; height: 100%; border: none; }
// //         .ap-modal-footer {
// //           padding: 18px 28px 22px;
// //           border-top: 1px solid var(--border);
// //           background: rgba(240,244,255,0.02);
// //         }
// //         .ap-footer-label {
// //           font-size: 11.5px; font-weight: 600;
// //           letter-spacing: 0.8px; text-transform: uppercase;
// //           color: var(--white-soft); margin-bottom: 12px;
// //         }
// //         .ap-footer-row {
// //           display: flex; align-items: center;
// //           gap: 10px; flex-wrap: wrap;
// //         }
// //         .ap-status-chips { display: flex; gap: 8px; flex-wrap: wrap; }
// //         .ap-chip {
// //           padding: 7px 14px; border-radius: 9px;
// //           font-size: 13px; font-weight: 600;
// //           cursor: pointer; border: 1px solid transparent;
// //           transition: all .15s; user-select: none;
// //           color: var(--white-soft); background: var(--white-dim);
// //           border-color: var(--border);
// //         }
// //         .ap-chip:hover { color: var(--white); border-color: rgba(240,244,255,0.18); }
// //         .ap-chip-amber.active  { background:var(--amber-dim); border-color:rgba(245,166,35,0.3);  color:var(--amber);  }
// //         .ap-chip-teal.active   { background:var(--teal-dim);  border-color:rgba(15,212,192,0.3);  color:var(--teal);   }
// //         .ap-chip-red.active    { background:var(--red-dim);   border-color:rgba(255,94,94,0.3);   color:var(--red);    }
// //         .ap-submit-btn {
// //           display: inline-flex; align-items: center; gap: 6px;
// //           padding: 9px 20px;
// //           background: var(--teal); color: var(--navy);
// //           font-family: 'Cabinet Grotesk', sans-serif;
// //           font-size: 13.5px; font-weight: 800;
// //           border: none; border-radius: 9px; cursor: pointer;
// //           box-shadow: 0 4px 16px rgba(15,212,192,0.25);
// //           transition: transform .15s, box-shadow .2s, opacity .15s;
// //           margin-left: auto;
// //         }
// //         .ap-submit-btn:hover:not(:disabled) {
// //           transform: translateY(-1px);
// //           box-shadow: 0 8px 22px rgba(15,212,192,0.38);
// //         }
// //         .ap-submit-btn:disabled { opacity: .45; cursor: not-allowed; }
// //         .ap-spinner {
// //           width: 13px; height: 13px;
// //           border: 2px solid rgba(11,17,32,.25);
// //           border-top-color: var(--navy);
// //           border-radius: 50%;
// //           animation: spin .65s linear infinite;
// //         }
// //         .ap-success-msg {
// //           display: flex; align-items: center; gap: 9px;
// //           padding: 13px 16px;
// //           background: var(--teal-dim);
// //           border: 1px solid rgba(15,212,192,0.25);
// //           border-radius: 10px;
// //           font-size: 14px; font-weight: 500; color: var(--teal);
// //           animation: apFade .35s ease both;
// //         }

// //         /* LOADING / ERROR */
// //         .ap-center {
// //           display: flex; align-items: center; justify-content: center;
// //           min-height: 60vh; flex-direction: column; gap: 14px;
// //         }
// //         .ap-center-icon {
// //           width: 56px; height: 56px; border-radius: 50%;
// //           background: var(--white-dim); border: 1px solid var(--border);
// //           display: flex; align-items: center; justify-content: center;
// //           color: var(--white-soft);
// //           animation: eaSkel 1.5s ease-in-out infinite;
// //         }
// //         @keyframes eaSkel { 0%,100%{opacity:.7} 50%{opacity:.3} }

// //         /* EMPTY */
// //         .ap-empty {
// //           text-align: center; padding: 80px 24px;
// //         }
// //         .ap-empty-icon {
// //           width: 72px; height: 72px; border-radius: 50%;
// //           background: var(--white-dim); border: 1px solid var(--border);
// //           display: flex; align-items: center; justify-content: center;
// //           margin: 0 auto 20px; color: var(--white-soft);
// //         }
// //         .ap-empty-title {
// //           font-family: 'Cabinet Grotesk', sans-serif;
// //           font-size: 20px; font-weight: 700; color: var(--white); margin-bottom: 8px;
// //         }
// //         .ap-empty-sub {
// //           font-size: 14px; color: var(--white-soft);
// //           font-weight: 300; margin-bottom: 28px;
// //         }

// //         /* ════════════════════════════
// //            APTITUDE TEST MODAL STYLES
// //         ════════════════════════════ */
// //         .at-modal {
// //           width: min(620px, 95vw) !important;
// //           max-height: 90vh;
// //           overflow-y: auto;
// //         }
// //         .at-modal-top {
// //           background: linear-gradient(90deg, var(--violet), rgba(129,140,248,0.15)) !important;
// //         }
// //         .at-modal-header {
// //           padding: 22px 28px 18px;
// //           display: flex; align-items: center; gap: 14px;
// //           border-bottom: 1px solid var(--border);
// //           flex-wrap: wrap;
// //         }
// //         .at-modal-header-left {
// //           display: flex; align-items: center; gap: 14px; flex: 1; min-width: 0;
// //         }
// //         .at-modal-icon {
// //           width: 46px; height: 46px; border-radius: 12px;
// //           background: var(--violet-dim);
// //           border: 1px solid rgba(129,140,248,0.2);
// //           display: flex; align-items: center; justify-content: center;
// //           color: var(--violet); flex-shrink: 0;
// //         }
// //         .at-modal-title {
// //           font-family: 'Cabinet Grotesk', sans-serif;
// //           font-size: 18px; font-weight: 800;
// //           color: var(--white); letter-spacing: -0.3px;
// //         }
// //         .at-modal-sub {
// //           font-size: 12.5px; color: var(--white-soft);
// //           font-weight: 300; margin-top: 2px;
// //         }

// //         /* Step indicator */
// //         .at-steps {
// //           display: flex; align-items: center; gap: 0;
// //           position: relative; flex-shrink: 0;
// //         }
// //         .at-step-line {
// //           position: absolute; top: 50%; left: 16px; right: 16px;
// //           height: 1px; background: var(--border); z-index: 0;
// //         }
// //         .at-step {
// //           width: 28px; height: 28px; border-radius: 50%;
// //           background: var(--white-dim); border: 1px solid var(--border);
// //           display: flex; align-items: center; justify-content: center;
// //           font-size: 11px; font-weight: 700; color: var(--white-soft);
// //           position: relative; z-index: 1; margin: 0 4px;
// //           transition: all .25s;
// //         }
// //         .at-step.active {
// //           background: var(--violet-dim);
// //           border-color: rgba(129,140,248,0.4);
// //           color: var(--violet);
// //           box-shadow: 0 0 0 3px rgba(129,140,248,0.12);
// //         }
// //         .at-step.done {
// //           background: var(--violet); border-color: var(--violet);
// //           color: #0b1120;
// //         }

// //         /* Body */
// //         .at-modal-body { padding: 24px 28px; }
// //         .at-step-body { display: flex; flex-direction: column; gap: 6px; }

// //         .at-section-label {
// //           display: flex; align-items: center; gap: 7px;
// //           font-size: 11px; font-weight: 700;
// //           letter-spacing: 1px; text-transform: uppercase;
// //           color: var(--white-soft); margin-bottom: 12px;
// //         }

// //         .at-field { display: flex; flex-direction: column; gap: 6px; margin-bottom: 4px; }
// //         .at-field-row { display: grid; grid-template-columns: 1fr 1fr; gap: 14px; }

// //         .at-label {
// //           font-size: 12px; font-weight: 600; color: var(--white-soft);
// //           letter-spacing: 0.3px;
// //         }

// //         .at-input-wrap {
// //           display: flex; align-items: center; gap: 10px;
// //           padding: 0 14px;
// //           height: 44px;
// //           background: var(--navy);
// //           border: 1px solid var(--border);
// //           border-radius: 10px;
// //           color: var(--white-soft);
// //           transition: border-color .15s, box-shadow .15s;
// //         }
// //         .at-input-wrap:focus-within {
// //           border-color: rgba(129,140,248,0.4);
// //           box-shadow: 0 0 0 3px rgba(129,140,248,0.08);
// //           color: var(--violet);
// //         }
// //         .at-input-wrap.err { border-color: rgba(255,94,94,0.4); }

// //         .at-input {
// //           flex: 1; background: none; border: none; outline: none;
// //           font-family: 'Geist', sans-serif;
// //           font-size: 14px; font-weight: 400; color: var(--white);
// //           min-width: 0;
// //         }
// //         .at-input::placeholder { color: rgba(154,170,191,0.5); }
// //         .at-input[type="date"]::-webkit-calendar-picker-indicator,
// //         .at-input[type="time"]::-webkit-calendar-picker-indicator {
// //           filter: invert(0.5); cursor: pointer;
// //         }
// //         .at-input-suffix {
// //           font-size: 12px; font-weight: 600; color: var(--white-soft);
// //           flex-shrink: 0;
// //         }
// //         .at-dur-wrap { position: relative; }

// //         .at-error { font-size: 11.5px; color: var(--red); font-weight: 500; }

// //         /* Quick picks */
// //         .at-quick-picks {
// //           display: flex; gap: 6px; flex-wrap: wrap; margin-top: 6px;
// //         }
// //         .at-quick-btn {
// //           padding: 5px 12px;
// //           background: var(--white-dim); border: 1px solid var(--border);
// //           border-radius: 7px; font-size: 12px; font-weight: 600;
// //           color: var(--white-soft); cursor: pointer;
// //           transition: all .15s;
// //         }
// //         .at-quick-btn:hover {
// //           color: var(--violet);
// //           border-color: rgba(129,140,248,0.3);
// //           background: var(--violet-dim);
// //         }
// //         .at-quick-btn.active {
// //           background: var(--violet-dim);
// //           border-color: rgba(129,140,248,0.4);
// //           color: var(--violet);
// //         }

// //         /* Format cards */
// //         .at-format-row {
// //           display: grid; grid-template-columns: 1fr 1fr; gap: 12px;
// //           margin-bottom: 18px;
// //         }
// //         .at-format-card {
// //           padding: 16px; border-radius: 13px;
// //           background: var(--navy);
// //           border: 1.5px solid var(--border);
// //           cursor: pointer; position: relative;
// //           transition: border-color .15s, background .15s, transform .15s;
// //         }
// //         .at-format-card:hover {
// //           border-color: rgba(129,140,248,0.3);
// //           transform: translateY(-1px);
// //         }
// //         .at-format-card.active {
// //           border-color: rgba(129,140,248,0.5);
// //           background: rgba(129,140,248,0.06);
// //         }
// //         .at-format-icon {
// //           width: 38px; height: 38px; border-radius: 10px;
// //           background: var(--white-dim); border: 1px solid var(--border);
// //           display: flex; align-items: center; justify-content: center;
// //           color: var(--white-soft); margin-bottom: 10px;
// //           transition: all .15s;
// //         }
// //         .at-format-card.active .at-format-icon {
// //           background: var(--violet-dim);
// //           border-color: rgba(129,140,248,0.25);
// //           color: var(--violet);
// //         }
// //         .at-format-label {
// //           font-family: 'Cabinet Grotesk', sans-serif;
// //           font-size: 14px; font-weight: 700; color: var(--white); margin-bottom: 3px;
// //         }
// //         .at-format-desc { font-size: 12px; color: var(--white-soft); font-weight: 300; }
// //         .at-format-check {
// //           position: absolute; top: 12px; right: 12px;
// //           width: 20px; height: 20px; border-radius: 50%;
// //           background: var(--violet); border: 1.5px solid var(--violet);
// //           display: flex; align-items: center; justify-content: center;
// //           color: #0b1120;
// //           opacity: 0; transition: opacity .15s;
// //         }
// //         .at-format-card.active .at-format-check { opacity: 1; }

// //         /* Dropzone */
// //         .at-dropzone {
// //           border: 1.5px dashed var(--border);
// //           border-radius: 13px; padding: 32px 20px;
// //           text-align: center; cursor: pointer;
// //           background: var(--navy);
// //           transition: border-color .15s, background .15s;
// //           margin-top: 4px;
// //         }
// //         .at-dropzone:hover, .at-dropzone.drag {
// //           border-color: rgba(129,140,248,0.4);
// //           background: rgba(129,140,248,0.04);
// //         }
// //         .at-dropzone.has-file {
// //           border-style: solid;
// //           border-color: rgba(129,140,248,0.35);
// //           background: rgba(129,140,248,0.05);
// //         }
// //         .at-dropzone.err { border-color: rgba(255,94,94,0.4); }
// //         .at-dz-icon {
// //           width: 48px; height: 48px; border-radius: 12px;
// //           background: var(--white-dim); border: 1px solid var(--border);
// //           display: flex; align-items: center; justify-content: center;
// //           color: var(--white-soft); margin: 0 auto 14px;
// //         }
// //         .at-dz-file-icon {
// //           width: 48px; height: 48px; border-radius: 12px;
// //           background: var(--violet-dim); border: 1px solid rgba(129,140,248,0.2);
// //           display: flex; align-items: center; justify-content: center;
// //           color: var(--violet); margin: 0 auto 12px;
// //         }
// //         .at-dz-title { font-size: 14px; font-weight: 500; color: var(--white); margin-bottom: 5px; }
// //         .at-dz-title span { color: var(--violet); text-decoration: underline; }
// //         .at-dz-sub { font-size: 12px; color: var(--white-soft); font-weight: 300; }
// //         .at-dz-filename { font-size: 14px; font-weight: 600; color: var(--violet); margin-bottom: 4px; }
// //         .at-dz-filesize { font-size: 12px; color: var(--white-soft); }

// //         /* JSON editor */
// //         .at-json-wrap { margin-top: 4px; }
// //         .at-json-header {
// //           display: flex; align-items: center; justify-content: space-between;
// //           padding: 8px 14px;
// //           background: rgba(129,140,248,0.07);
// //           border: 1px solid rgba(129,140,248,0.18);
// //           border-bottom: none;
// //           border-radius: 10px 10px 0 0;
// //           font-size: 12px; font-weight: 600; color: var(--violet);
// //           font-family: monospace;
// //         }
// //         .at-json-sample {
// //           font-family: 'Geist', sans-serif;
// //           font-size: 11px; font-weight: 600;
// //           color: var(--white-soft); background: var(--white-dim);
// //           border: 1px solid var(--border); border-radius: 5px;
// //           padding: 3px 9px; cursor: pointer;
// //           transition: color .15s, border-color .15s;
// //         }
// //         .at-json-sample:hover { color: var(--violet); border-color: rgba(129,140,248,0.3); }
// //         .at-json-editor {
// //           width: 100%; height: 160px;
// //           background: var(--navy);
// //           border: 1px solid rgba(129,140,248,0.18);
// //           border-radius: 0 0 10px 10px;
// //           padding: 12px 14px;
// //           font-family: 'Courier New', monospace;
// //           font-size: 12.5px; color: #a5b4fc;
// //           line-height: 1.6; resize: vertical; outline: none;
// //           transition: border-color .15s;
// //         }
// //         .at-json-editor:focus { border-color: rgba(129,140,248,0.45); }
// //         .at-json-editor.err { border-color: rgba(255,94,94,0.4); }
// //         .at-json-editor::placeholder { color: rgba(154,170,191,0.35); }

// //         /* Summary bar */
// //         .at-summary-bar {
// //           display: flex; align-items: center; gap: 10px;
// //           margin-top: 16px;
// //           padding: 10px 14px;
// //           background: var(--white-dim);
// //           border: 1px solid var(--border);
// //           border-radius: 9px;
// //           font-size: 12px; color: var(--white-soft); font-weight: 500;
// //         }
// //         .at-sum-item { display: flex; align-items: center; gap: 6px; }
// //         .at-sum-dot { width: 3px; height: 3px; border-radius: 50%; background: var(--border); }

// //         /* Footer */
// //         .at-modal-footer {
// //           display: flex; align-items: center; gap: 10px;
// //           padding: 16px 28px 22px;
// //           border-top: 1px solid var(--border);
// //         }
// //         .at-back-btn {
// //           display: inline-flex; align-items: center; gap: 6px;
// //           padding: 9px 18px;
// //           background: var(--white-dim); border: 1px solid var(--border);
// //           border-radius: 9px;
// //           font-family: 'Cabinet Grotesk', sans-serif;
// //           font-size: 13px; font-weight: 700;
// //           color: var(--white-soft); cursor: pointer;
// //           transition: color .15s, border-color .15s;
// //         }
// //         .at-back-btn:hover { color: var(--white); border-color: rgba(240,244,255,0.18); }
// //         .at-next-btn {
// //           background: var(--violet) !important;
// //           box-shadow: 0 4px 16px rgba(129,140,248,0.3) !important;
// //           color: #fff !important;
// //           margin-left: 0 !important;
// //         }
// //         .at-next-btn:hover:not(:disabled) {
// //           box-shadow: 0 8px 22px rgba(129,140,248,0.45) !important;
// //         }

// //         /* Success */
// //         .at-success {
// //           display: flex; flex-direction: column;
// //           align-items: center; text-align: center;
// //           padding: 32px 20px 20px;
// //           gap: 10px;
// //           animation: apFade .4s ease both;
// //         }
// //         .at-success-ring {
// //           width: 64px; height: 64px; border-radius: 50%;
// //           background: rgba(129,140,248,0.12);
// //           border: 2px solid rgba(129,140,248,0.4);
// //           display: flex; align-items: center; justify-content: center;
// //           color: var(--violet); margin-bottom: 8px;
// //           box-shadow: 0 0 0 6px rgba(129,140,248,0.06);
// //         }
// //         .at-success-title {
// //           font-family: 'Cabinet Grotesk', sans-serif;
// //           font-size: 22px; font-weight: 800;
// //           color: var(--white); letter-spacing: -0.4px;
// //         }
// //         .at-success-sub {
// //           font-size: 14px; color: var(--white-soft);
// //           font-weight: 300; line-height: 1.6; max-width: 340px;
// //         }
// //         .at-success-sub strong { color: var(--white); font-weight: 600; }
// //         .at-success-pills { display: flex; gap: 8px; margin-top: 6px; flex-wrap: wrap; justify-content: center; }
// //         .at-pill {
// //           display: inline-flex; align-items: center; gap: 6px;
// //           padding: 5px 12px; border-radius: 100px;
// //           font-size: 12px; font-weight: 600;
// //         }
// //         .at-pill.teal { background:var(--teal-dim); border:1px solid rgba(15,212,192,0.2); color:var(--teal); }
// //         .at-pill.amber { background:var(--amber-dim); border:1px solid rgba(245,166,35,0.2); color:var(--amber); }
// //         .at-close-btn {
// //           margin-top: 10px;
// //           padding: 10px 32px;
// //           background: var(--violet);
// //           border: none; border-radius: 10px;
// //           font-family: 'Cabinet Grotesk', sans-serif;
// //           font-size: 14px; font-weight: 800;
// //           color: #fff; cursor: pointer;
// //           box-shadow: 0 4px 16px rgba(129,140,248,0.3);
// //           transition: transform .15s, box-shadow .2s;
// //         }
// //         .at-close-btn:hover { transform: translateY(-1px); box-shadow: 0 8px 22px rgba(129,140,248,0.4); }

// //         /* RESPONSIVE */
// //         @media (max-width: 768px) {
// //           .ap-hero, .ap-stats, .ap-jobs-wrap { padding-left: 24px; padding-right: 24px; }
// //           .ap-hero { padding-top: 110px; }
// //           .jr-header { flex-wrap: wrap; gap: 12px; }
// //           .jr-actions { width: 100%; justify-content: flex-end; }
// //           .at-field-row { grid-template-columns: 1fr; }
// //           .at-format-row { grid-template-columns: 1fr; }
// //         }
// //       `}</style>

// //       <div className="ap-root">

// //         {/* ── HERO ── */}
// //         <section className="ap-hero">
// //           <div className="ap-hero-inner">
// //             <div>
// //               <div className="ap-badge">
// //                 <span className="ap-badge-dot" />
// //                 {user?.username ? `${user.username}'s dashboard` : "Employer dashboard"}
// //               </div>
// //               <h1 className="ap-hero-title">
// //                 Posted <em>Jobs</em> &amp;<br />Applicants
// //               </h1>
// //               <p className="ap-hero-sub">
// //                 Manage your listings and review every application in one place.
// //               </p>
// //             </div>
// //             <Link to="/post-job" className="ap-post-btn">
// //               <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
// //                 <line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/>
// //               </svg>
// //               Post a New Job
// //             </Link>
// //           </div>
// //         </section>

// //         {/* ── STATS ── */}
// //         {!loading && jobs.length > 0 && (
// //           <div className="ap-stats">
// //             <div className="ap-stat-card">
// //               <div className="ap-stat-icon teal">
// //                 <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
// //                   <rect x="2" y="7" width="20" height="14" rx="2"/><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/>
// //                 </svg>
// //               </div>
// //               <div>
// //                 <div className="ap-stat-val">{jobs.length}</div>
// //                 <div className="ap-stat-lbl">Active Listings</div>
// //               </div>
// //             </div>
// //             <div className="ap-stat-card">
// //               <div className="ap-stat-icon amber">
// //                 <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
// //                   <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/>
// //                 </svg>
// //               </div>
// //               <div>
// //                 <div className="ap-stat-val">—</div>
// //                 <div className="ap-stat-lbl">Total Applicants</div>
// //               </div>
// //             </div>
// //           </div>
// //         )}

// //         {/* ── JOBS LIST ── */}
// //         <div className="ap-jobs-wrap">
// //           {loading ? (
// //             <div className="ap-center">
// //               <div className="ap-center-icon">
// //                 <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
// //                   <rect x="2" y="7" width="20" height="14" rx="2"/>
// //                   <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/>
// //                 </svg>
// //               </div>
// //               <span style={{ color: "var(--white-soft)", fontSize: 14 }}>Loading your jobs…</span>
// //             </div>
// //           ) : error ? (
// //             <div className="ap-center">
// //               <div style={{ color: "var(--red)", fontSize: 14 }}>Error: {error}</div>
// //             </div>
// //           ) : jobs.length === 0 ? (
// //             <div className="ap-empty">
// //               <div className="ap-empty-icon">
// //                 <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
// //                   <rect x="2" y="7" width="20" height="14" rx="2"/>
// //                   <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/>
// //                 </svg>
// //               </div>
// //               <div className="ap-empty-title">No jobs posted yet</div>
// //               <p className="ap-empty-sub">Post your first job to start receiving applications.</p>
// //               <Link to="/post-job" className="ap-post-btn">
// //                 <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
// //                   <line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/>
// //                 </svg>
// //                 Post a Job
// //               </Link>
// //             </div>
// //           ) : (
// //             jobs.map((job, i) => (
// //               <JobRow
// //                 key={job.id}
// //                 job={job}
// //                 index={i}
// //                 onOpenApplicant={setSelectedApplicant}
// //                 onOpenAptitude={setAptitudeJob}
// //               />
// //             ))
// //           )}
// //         </div>

// //         {/* ── APPLICANT MODAL ── */}
// //         {selectedApplicant && (
// //           <ApplicantModal
// //             applicant={selectedApplicant}
// //             onClose={() => setSelectedApplicant(null)}
// //             onStatusUpdate={() => setRefreshKey(k => k + 1)}
// //           />
// //         )}

// //         {/* ── APTITUDE TEST MODAL ── */}
// //         {aptitudeJob && (
// //           <AptitudeTestModal
// //             job={aptitudeJob}
// //             onClose={() => setAptitudeJob(null)}
// //           />
// //         )}

// //       </div>
// //     </>
// //   );
// // };

// // export default Applied;




// import React, { useEffect, useState, useRef } from "react";
// import axios from "axios";
// import { Link } from "react-router-dom";

// const STATUS_CONFIG = {
//   applied:     { label: "Applied",     color: "blue"  },
//   interviewed: { label: "Interviewed", color: "amber" },
//   rejected:    { label: "Rejected",    color: "red"   },
//   hired:       { label: "Hired",       color: "teal"  },
// };
// const getStatus = (s = "") => STATUS_CONFIG[(s||"").toLowerCase()] || { label: s, color: "blue" };
// const GRADIENTS = [
//   "linear-gradient(135deg,#0fd4c0,#0b9e8e)",
//   "linear-gradient(135deg,#f5a623,#c47d0a)",
//   "linear-gradient(135deg,#818cf8,#4f46e5)",
//   "linear-gradient(135deg,#f472b6,#db2777)",
//   "linear-gradient(135deg,#34d399,#059669)",
//   "linear-gradient(135deg,#60a5fa,#2563eb)",
// ];
// const getInitials = (s="") => s.split(" ").slice(0,2).map(w=>w[0]?.toUpperCase()).join("")||"J";

// /* ═══════════════════════════════════
//    APTITUDE TEST PANEL
// ═══════════════════════════════════ */
// const AptitudePanel = ({ jobId, existingTest, onTestCreated }) => {
//   const [open,     setOpen]     = useState(false);
//   const [file,     setFile]     = useState(null);
//   const [duration, setDuration] = useState("");
//   const [startTime,setStartTime]= useState("");
//   const [dragOver, setDragOver] = useState(false);
//   const [status,   setStatus]   = useState(null);
//   const [errMsg,   setErrMsg]   = useState("");
//   const fileRef                 = useRef();

//   const handleDrop = (e) => {
//     e.preventDefault(); setDragOver(false);
//     const f = e.dataTransfer.files[0];
//     if (f) setFile(f);
//   };

//   const handleSubmit = async () => {
//     if (!file || !duration || !startTime) {
//       setErrMsg("Please fill all fields and upload a file."); setStatus("error"); return;
//     }
//     setStatus("saving"); setErrMsg("");
//     const fd = new FormData();
//     fd.append("mcq_file", file);
//     fd.append("duration_min", duration);
//     fd.append("start_time", startTime);
//     try {
//       const res = await axios.post(
//         `http://127.0.0.1:8000/jobs/api/jobs/${jobId}/aptitude-test/create/`, fd,
//         { headers: { "Content-Type": "multipart/form-data" } }
//       );
//       setStatus("success");
//       onTestCreated(res.data);
//       setTimeout(() => setOpen(false), 1600);
//     } catch (err) {
//       setErrMsg(err?.response?.data?.error || "Failed to create test.");
//       setStatus("error");
//     }
//   };

//   if (existingTest) {
//     return (
//       <div className="at-existing">
//         <div className="at-existing-icon">
//           <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
//             <path d="M9 11l3 3L22 4"/><path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"/>
//           </svg>
//         </div>
//         <div>
//           <div className="at-existing-title">Aptitude Test Active</div>
//           <div className="at-existing-meta">
//             {existingTest.duration_min} min · Starts {new Date(existingTest.start_time).toLocaleString()}
//           </div>
//         </div>
//         <span className="at-badge-active">Live</span>
//       </div>
//     );
//   }

//   return (
//     <div className="at-wrap">
//       {!open && (
//         <button className="at-create-btn" onClick={() => setOpen(true)}>
//           <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
//             <line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/>
//           </svg>
//           Create Aptitude Test
//         </button>
//       )}

//       {open && (
//         <div className="at-panel">
//           <div className="at-panel-header">
//             <div className="at-panel-title">
//               <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
//                 <rect x="2" y="3" width="20" height="14" rx="2"/><line x1="8" y1="21" x2="16" y2="21"/><line x1="12" y1="17" x2="12" y2="21"/>
//               </svg>
//               Aptitude Test Setup
//             </div>
//             <button className="at-close" onClick={() => { setOpen(false); setStatus(null); setFile(null); }}>
//               <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
//                 <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
//               </svg>
//             </button>
//           </div>

//           <div className="at-panel-body">
//             <div className="at-row">
//               <div className="at-field">
//                 <label className="at-label">Test Start Time</label>
//                 <div className="at-input-wrap">
//                   <svg className="at-icon" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
//                     <rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/>
//                   </svg>
//                   <input type="datetime-local" className="at-input" value={startTime} onChange={e => setStartTime(e.target.value)} />
//                 </div>
//               </div>
//               <div className="at-field">
//                 <label className="at-label">Duration (minutes)</label>
//                 <div className="at-input-wrap">
//                   <svg className="at-icon" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
//                     <circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>
//                   </svg>
//                   <input type="number" min="1" className="at-input" placeholder="e.g. 30" value={duration} onChange={e => setDuration(e.target.value)} />
//                 </div>
//               </div>
//             </div>

//             <div className="at-field" style={{marginBottom:0}}>
//               <label className="at-label">MCQ File <span className="at-label-hint">(JSON, PDF, DOCX, XLSX, CSV — any format accepted)</span></label>
//               <div
//                 className={`at-dropzone${dragOver?" drag":""}${file?" has-file":""}`}
//                 onClick={() => !file && fileRef.current?.click()}
//                 onDragOver={e=>{e.preventDefault();setDragOver(true)}}
//                 onDragLeave={()=>setDragOver(false)}
//                 onDrop={handleDrop}
//               >
//                 <input ref={fileRef} type="file" style={{display:"none"}}
//                   accept=".json,.pdf,.doc,.docx,.xlsx,.xls,.csv,.txt"
//                   onChange={e => setFile(e.target.files[0])} />
//                 {file ? (
//                   <div className="at-file-selected">
//                     <div className="at-file-icon">
//                       <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
//                         <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/>
//                       </svg>
//                     </div>
//                     <div>
//                       <div className="at-file-name">{file.name}</div>
//                       <div className="at-file-size">{(file.size/1024).toFixed(1)} KB</div>
//                     </div>
//                     <button className="at-file-remove" onClick={e=>{e.stopPropagation();setFile(null)}}>
//                       <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
//                         <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
//                       </svg>
//                     </button>
//                   </div>
//                 ) : (
//                   <div className="at-drop-placeholder">
//                     <div className="at-drop-icon">
//                       <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
//                         <polyline points="16 16 12 12 8 16"/><line x1="12" y1="12" x2="12" y2="21"/>
//                         <path d="M20.39 18.39A5 5 0 0 0 18 9h-1.26A8 8 0 1 0 3 16.3"/>
//                       </svg>
//                     </div>
//                     <div className="at-drop-text">Drop file here or <span>click to browse</span></div>
//                     <div className="at-drop-hint">JSON · PDF · DOCX · XLSX · CSV · TXT</div>
//                   </div>
//                 )}
//               </div>
//             </div>

//             {status === "error" && (
//               <div className="at-msg error">
//                 <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
//                   <circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/>
//                 </svg>
//                 {errMsg}
//               </div>
//             )}
//             {status === "success" && (
//               <div className="at-msg success">
//                 <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
//                   <polyline points="20 6 9 17 4 12"/>
//                 </svg>
//                 Aptitude test created successfully!
//               </div>
//             )}

//             <div className="at-actions">
//               <button className="at-cancel" onClick={()=>{setOpen(false);setStatus(null);setFile(null)}}>Cancel</button>
//               <button className="at-save" onClick={handleSubmit} disabled={status==="saving"||status==="success"}>
//                 {status==="saving"?<><span className="at-spinner"/>Saving…</>:<>
//                   <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
//                   Create Test
//                 </>}
//               </button>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// /* ═══════════════════════════════════
//    APPLICANT MODAL
// ═══════════════════════════════════ */
// const ApplicantModal = ({ applicant, onClose, onStatusUpdate }) => {
//   const [status,    setStatus]    = useState("");
//   const [submitting,setSubmitting]= useState(false);
//   const [success,   setSuccess]   = useState(false);

//   const handleSubmit = async () => {
//     if (!status) return;
//     setSubmitting(true);
//     try {
//       await axios.patch(`http://127.0.0.1:8000/applications/api/update-status/${applicant.id}/`,{ status });
//       setSuccess(true);
//       setTimeout(()=>{ onStatusUpdate(); onClose(); },1200);
//     } catch(err){ console.error(err); }
//     finally{ setSubmitting(false); }
//   };

//   // Build full media URL if the file path is relative
//   const fileUrl = applicant.file
//     ? (applicant.file.startsWith("http") ? applicant.file : `http://127.0.0.1:8000${applicant.file}`)
//     : null;

//   const appliedDate = applicant.appliedAt
//     ? new Date(applicant.appliedAt).toLocaleDateString("en-IN",{day:"numeric",month:"long",year:"numeric",hour:"2-digit",minute:"2-digit"})
//     : null;

//   const skillsList = applicant.skills
//     ? applicant.skills.split(",").map(s=>s.trim()).filter(Boolean)
//     : [];

//   return (
//     <>
//       <div className="ap-backdrop" onClick={onClose}/>
//       <div className="ap-modal">
//         <div className="ap-modal-top"/>

//         {/* Header */}
//         <div className="ap-modal-header">
//           <div className="ap-modal-avatar">{getInitials(applicant.name||"A")}</div>
//           <div className="ap-modal-info">
//             <h2 className="ap-modal-name">{applicant.name||"Applicant"}</h2>

//             {/* Email */}
//             <a href={`mailto:${applicant.email}`} className="ap-modal-email">
//               <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
//                 <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/>
//               </svg>
//               {applicant.email}
//             </a>

//             {/* Contact */}
//             {applicant.contact && (
//               <div className="ap-modal-meta-row">
//                 <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
//                   <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12 19.79 19.79 0 0 1 1.61 3.38 2 2 0 0 1 3.59 1h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 8.56a16 16 0 0 0 6 6l.92-.92a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/>
//                 </svg>
//                 {applicant.contact}
//               </div>
//             )}

//             {/* Applied date */}
//             {appliedDate && (
//               <div className="ap-modal-meta-row">
//                 <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
//                   <rect x="3" y="4" width="18" height="18" rx="2"/>
//                   <line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/>
//                   <line x1="3" y1="10" x2="21" y2="10"/>
//                 </svg>
//                 Applied on {appliedDate}
//               </div>
//             )}

//             {/* Skills */}
//             {skillsList.length > 0 && (
//               <div className="ap-modal-skills">
//                 {skillsList.map(s=>(
//                   <span key={s} className="ap-skill-tag">{s}</span>
//                 ))}
//               </div>
//             )}

//             {/* Current status badge */}
//             {applicant.status && (
//               <span className={`ap-modal-cur-status ap-status-${getStatus(applicant.status).color}`}>
//                 {getStatus(applicant.status).label}
//               </span>
//             )}
//           </div>
//           <button className="ap-modal-close" onClick={onClose}>
//             <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
//               <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
//             </svg>
//           </button>
//         </div>

//         {/* Resume */}
//         <div className="ap-modal-body">
//           <div className="ap-resume-label">
//             <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
//               <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/>
//             </svg>
//             Resume / CV
//           </div>
//           {fileUrl ? (
//             <div className="ap-resume-frame">
//               <iframe src={fileUrl} title="Resume" className="ap-iframe"/>
//             </div>
//           ) : (
//             <div className="ap-no-resume">
//               <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
//                 <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/>
//               </svg>
//               No resume uploaded
//             </div>
//           )}
//         </div>

//         {/* Footer — update status */}
//         <div className="ap-modal-footer">
//           {success ? (
//             <div className="ap-success-msg">
//               <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
//               Status updated successfully!
//             </div>
//           ) : (
//             <>
//               <div className="ap-footer-label">Update applicant status</div>
//               <div className="ap-footer-row">
//                 <div className="ap-status-chips">
//                   {["interviewed","hired","rejected"].map(s=>{
//                     const cfg=STATUS_CONFIG[s];
//                     return (
//                       <div key={s} className={`ap-chip ap-chip-${cfg.color}${status===s?" active":""}`} onClick={()=>setStatus(s)}>
//                         {cfg.label}
//                       </div>
//                     );
//                   })}
//                 </div>
//                 <button className="ap-submit-btn" onClick={handleSubmit} disabled={!status||submitting}>
//                   {submitting?<><span className="ap-spinner"/>Saving…</>:<>Update <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg></>}
//                 </button>
//               </div>
//             </>
//           )}
//         </div>
//       </div>
//     </>
//   );
// };

// /* ═══════════════════════════════════
//    JOB ROW
// ═══════════════════════════════════ */
// const JobRow = ({ job, index, onOpenApplicant }) => {
//   const [expanded,  setExpanded]  = useState(false);
//   const [applicants,setApplicants]= useState([]);
//   const [loading,   setLoading]   = useState(false);
//   const [fetched,   setFetched]   = useState(false);
//   const [testData,  setTestData]  = useState(job.has_test?{exists:true,duration_min:"?",start_time:new Date().toISOString()}:null);

//   const toggle = async () => {
//     if(!expanded && !fetched){
//       setLoading(true);
//       try{
//         const res=await axios.get(`http://127.0.0.1:8000/applications/api/applied/${job.id}/`);
//         setApplicants(res.data); setFetched(true);
//       }catch(err){console.error(err);}
//       finally{setLoading(false);}
//     }
//     setExpanded(p=>!p);
//   };

//   return (
//     <div className={`jr-row${expanded?" open":""}`} style={{animationDelay:`${index*0.06}s`}}>
//       <div className="jr-header" onClick={toggle}>
//         <div className="jr-logo" style={{background:GRADIENTS[index%GRADIENTS.length]}}>{getInitials(job.title)}</div>
//         <div className="jr-info">
//           <div className="jr-title-row">
//             <h3 className="jr-title">{job.title}</h3>
//             {job.has_test && (
//               <span className="jr-test-badge">
//                 <svg width="9" height="9" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
//                 Test Active
//               </span>
//             )}
//           </div>
//           <p className="jr-desc">{(job.description||"").substring(0,88)}{job.description?.length>88?"…":""}</p>
//           <div className="jr-meta">
//             {job.type&&<span className="jr-meta-pill">{job.type}</span>}
//             {job.location&&<span className="jr-meta-pill">{job.location}</span>}
//             {fetched&&<span className="jr-meta-pill jr-app-count">{applicants.length} applicant{applicants.length!==1?"s":""}</span>}
//           </div>
//         </div>
//         <div className="jr-toggle-btn">
//           {loading?<span className="jr-spinner"/>:<>
//             <span className="jr-toggle-label">{expanded?"Hide":"View Applicants"}</span>
//             <div className={`jr-chevron${expanded?" open":""}`}>
//               <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="6 9 12 15 18 9"/></svg>
//             </div>
//           </>}
//         </div>
//       </div>

//       {expanded && (
//         <div className="jr-panel">
//           <div className="jr-section-label">Aptitude Test</div>
//           <AptitudePanel jobId={job.id} existingTest={testData} onTestCreated={(d)=>setTestData({exists:true,...d})} />

//           <div className="jr-section-label" style={{marginTop:22}}>
//             Applicants {fetched&&<span className="jr-section-count">{applicants.length}</span>}
//           </div>
//           {applicants.length===0 ? (
//             <div className="jr-no-apps">
//               <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
//                 <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/>
//               </svg>
//               No applicants yet for this role.
//             </div>
//           ):(
//             <div className="jr-app-grid">
//               {applicants.map((ap,i)=>{
//                 const st=getStatus(ap.status);
//                 const appliedDate = ap.appliedAt
//                   ? new Date(ap.appliedAt).toLocaleDateString("en-IN",{day:"numeric",month:"short",year:"numeric"})
//                   : null;
//                 const skillsList = ap.skills
//                   ? ap.skills.split(",").map(s=>s.trim()).filter(Boolean)
//                   : [];
//                 return (
//                   <div key={ap.id||i} className="jr-app-card" style={{animationDelay:`${i*0.05}s`}}>
//                     {/* Avatar */}
//                     <div className="jr-app-avatar" style={{background:GRADIENTS[(i+3)%GRADIENTS.length]}}>
//                       {getInitials(ap.name||"A")}
//                     </div>

//                     {/* Info block */}
//                     <div className="jr-app-info">
//                       {/* Name + status badge on same row */}
//                       <div className="jr-app-top-row">
//                         <div className="jr-app-name">{ap.name||"Applicant"}</div>
//                         <span className={`jr-app-status ap-status-${st.color}`}>{st.label}</span>
//                       </div>

//                       {/* Email */}
//                       <div className="jr-app-meta-row">
//                         <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
//                           <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
//                           <polyline points="22,6 12,13 2,6"/>
//                         </svg>
//                         <span className="jr-app-email">{ap.email||"—"}</span>
//                       </div>

//                       {/* Contact number */}
//                       {ap.contact && (
//                         <div className="jr-app-meta-row">
//                           <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
//                             <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12 19.79 19.79 0 0 1 1.61 3.38 2 2 0 0 1 3.59 1h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 8.56a16 16 0 0 0 6 6l.92-.92a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/>
//                           </svg>
//                           <span className="jr-app-contact">{ap.contact}</span>
//                         </div>
//                       )}

//                       {/* Applied date */}
//                       {appliedDate && (
//                         <div className="jr-app-meta-row">
//                           <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
//                             <rect x="3" y="4" width="18" height="18" rx="2"/>
//                             <line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/>
//                             <line x1="3" y1="10" x2="21" y2="10"/>
//                           </svg>
//                           <span className="jr-app-date">Applied {appliedDate}</span>
//                         </div>
//                       )}

//                       {/* Skills */}
//                       {skillsList.length > 0 && (
//                         <div className="jr-app-skills">
//                           {skillsList.slice(0,3).map(sk=>(
//                             <span key={sk} className="jr-skill-chip">{sk}</span>
//                           ))}
//                           {skillsList.length > 3 && (
//                             <span className="jr-skill-chip jr-skill-more">+{skillsList.length-3}</span>
//                           )}
//                         </div>
//                       )}
//                     </div>

//                     {/* Review button — full width at bottom */}
//                     <button className="jr-view-btn jr-view-btn-block" onClick={()=>onOpenApplicant(ap)}>
//                       Review Applicant
//                       <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
//                         <line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/>
//                       </svg>
//                     </button>
//                   </div>
//                 );
//               })}
//             </div>
//           )}
//         </div>
//       )}
//     </div>
//   );
// };

// /* ═══════════════════════════════════
//    MAIN
// ═══════════════════════════════════ */
// const Applied = () => {
//   const [jobs,setJobs]=useState([]);
//   const [loading,setLoading]=useState(true);
//   const [error,setError]=useState(null);
//   const [selectedApplicant,setSelectedApplicant]=useState(null);
//   const [refreshKey,setRefreshKey]=useState(0);
//   const user=JSON.parse(localStorage.getItem("user"));

//   useEffect(()=>{
//     (async()=>{
//       try{
//         const res=await axios.get("http://127.0.0.1:8000/jobs/api/employer-jobs",{params:{username:user?.username}});
//         setJobs(res.data);
//       }catch(err){setError(err.message);}
//       finally{setLoading(false);}
//     })();
//   },[refreshKey]);

//   return (
//     <>
//       <style>{`
//         @import url('https://fonts.googleapis.com/css2?family=Cabinet+Grotesk:wght@400;500;700;800&family=Instrument+Serif:ital@0;1&family=Geist:wght@300;400;500&display=swap');
//         *,*::before,*::after{box-sizing:border-box;margin:0;padding:0}
//         :root{
//           --navy:#0b1120;--navy-mid:#111827;--navy-card:#131e30;
//           --teal:#0fd4c0;--teal-dim:rgba(15,212,192,0.1);
//           --amber:#f5a623;--amber-dim:rgba(245,166,35,0.1);
//           --red:#ff5e5e;--red-dim:rgba(255,94,94,0.1);
//           --blue:#60a5fa;--blue-dim:rgba(96,165,250,0.12);
//           --purple:#818cf8;--purple-dim:rgba(129,140,248,0.12);
//           --white:#f0f4ff;--white-soft:#9aaabf;
//           --white-dim:rgba(240,244,255,0.05);--border:rgba(240,244,255,0.07);
//         }
//         .ap-root{background:var(--navy);font-family:'Geist',sans-serif;color:var(--white);min-height:100vh}
//         .ap-hero{position:relative;padding:130px 48px 56px;overflow:hidden}
//         .ap-hero::before{content:'';position:absolute;inset:0;background:radial-gradient(ellipse 65% 55% at 50% 0%,rgba(15,212,192,0.07) 0%,transparent 65%);pointer-events:none}
//         .ap-hero::after{content:'';position:absolute;inset:0;background-image:radial-gradient(rgba(240,244,255,0.045) 1px,transparent 1px);background-size:36px 36px;pointer-events:none;mask-image:radial-gradient(ellipse 80% 80% at 50% 30%,black 20%,transparent 100%)}
//         .ap-hero-inner{position:relative;z-index:1;max-width:1100px;margin:0 auto;display:flex;align-items:flex-end;justify-content:space-between;gap:24px;flex-wrap:wrap;opacity:0;animation:apFade .65s cubic-bezier(.22,1,.36,1) .08s forwards}
//         @keyframes apFade{from{opacity:0;transform:translateY(16px)}to{opacity:1;transform:translateY(0)}}
//         .ap-badge{display:inline-flex;align-items:center;gap:7px;padding:5px 13px 5px 9px;background:rgba(15,212,192,0.07);border:1px solid rgba(15,212,192,0.17);border-radius:100px;font-size:12px;font-weight:500;color:var(--teal);margin-bottom:14px}
//         .ap-badge-dot{width:6px;height:6px;border-radius:50%;background:var(--teal);box-shadow:0 0 6px var(--teal);animation:bdPulse 2s ease-in-out infinite}
//         @keyframes bdPulse{0%,100%{opacity:1;transform:scale(1)}50%{opacity:.4;transform:scale(.7)}}
//         .ap-hero-title{font-family:'Cabinet Grotesk',sans-serif;font-size:clamp(32px,4vw,50px);font-weight:800;color:var(--white);letter-spacing:-1.5px;line-height:1.1;margin-bottom:10px}
//         .ap-hero-title em{font-family:'Instrument Serif',serif;font-style:italic;font-weight:400;color:var(--teal);letter-spacing:-1.5px}
//         .ap-hero-sub{font-size:15px;color:var(--white-soft);font-weight:300;line-height:1.6}
//         .ap-post-btn{display:inline-flex;align-items:center;gap:7px;padding:12px 22px;background:var(--teal);color:var(--navy);font-family:'Cabinet Grotesk',sans-serif;font-size:13.5px;font-weight:800;border-radius:10px;text-decoration:none;box-shadow:0 6px 20px rgba(15,212,192,0.28);transition:transform .15s,box-shadow .2s;flex-shrink:0}
//         .ap-post-btn:hover{transform:translateY(-1px);box-shadow:0 10px 28px rgba(15,212,192,0.38)}
//         .ap-jobs-wrap{max-width:1100px;margin:0 auto;padding:0 48px 80px}
//         .ap-center{display:flex;align-items:center;justify-content:center;min-height:50vh;flex-direction:column;gap:12px}
//         .ap-empty{text-align:center;padding:80px 24px}
//         .ap-empty-icon{width:68px;height:68px;border-radius:50%;background:var(--white-dim);border:1px solid var(--border);display:flex;align-items:center;justify-content:center;margin:0 auto 18px;color:var(--white-soft)}
//         .ap-empty-title{font-family:'Cabinet Grotesk',sans-serif;font-size:20px;font-weight:700;color:var(--white);margin-bottom:8px}
//         .ap-empty-sub{font-size:14px;color:var(--white-soft);font-weight:300;margin-bottom:26px}

//         /* JOB ROW */
//         .jr-row{background:var(--navy-card);border:1px solid var(--border);border-radius:18px;margin-bottom:14px;overflow:hidden;opacity:0;animation:apFade .55s cubic-bezier(.22,1,.36,1) forwards;transition:border-color .22s}
//         .jr-row.open{border-color:rgba(15,212,192,0.2)}
//         .jr-row:hover{border-color:rgba(15,212,192,0.14)}
//         .jr-header{display:flex;align-items:center;gap:18px;padding:22px 26px;cursor:pointer;transition:background .15s}
//         .jr-header:hover{background:rgba(240,244,255,0.02)}
//         .jr-logo{width:50px;height:50px;border-radius:13px;display:flex;align-items:center;justify-content:center;font-family:'Cabinet Grotesk',sans-serif;font-size:15px;font-weight:800;color:#0b1120;flex-shrink:0;box-shadow:0 4px 14px rgba(0,0,0,.3)}
//         .jr-info{flex:1;min-width:0}
//         .jr-title-row{display:flex;align-items:center;gap:8px;margin-bottom:4px;flex-wrap:wrap}
//         .jr-title{font-family:'Cabinet Grotesk',sans-serif;font-size:16px;font-weight:700;color:var(--white);letter-spacing:-.3px}
//         .jr-test-badge{display:inline-flex;align-items:center;gap:4px;padding:2px 9px;border-radius:100px;background:var(--teal-dim);border:1px solid rgba(15,212,192,0.25);font-size:10px;font-weight:600;color:var(--teal)}
//         .jr-desc{font-size:13px;color:var(--white-soft);font-weight:300;margin-bottom:8px;line-height:1.5}
//         .jr-meta{display:flex;gap:7px;flex-wrap:wrap}
//         .jr-meta-pill{display:inline-flex;align-items:center;gap:5px;padding:3px 9px;background:var(--white-dim);border:1px solid var(--border);border-radius:100px;font-size:11px;color:var(--white-soft)}
//         .jr-app-count{color:var(--teal);border-color:rgba(15,212,192,0.2);background:var(--teal-dim)}
//         .jr-toggle-btn{display:flex;align-items:center;gap:7px;padding:8px 14px;border:1px solid var(--border);border-radius:10px;font-size:12.5px;color:var(--white-soft);flex-shrink:0;transition:all .15s}
//         .jr-row.open .jr-toggle-btn,.jr-header:hover .jr-toggle-btn{border-color:rgba(15,212,192,0.3);color:var(--teal);background:var(--teal-dim)}
//         .jr-toggle-label{font-weight:500;white-space:nowrap}
//         .jr-chevron{transition:transform .25s ease}
//         .jr-chevron.open{transform:rotate(180deg)}
//         .jr-spinner{width:14px;height:14px;border:2px solid var(--border);border-top-color:var(--teal);border-radius:50%;animation:spin .65s linear infinite}
//         @keyframes spin{to{transform:rotate(360deg)}}
//         .jr-panel{border-top:1px solid var(--border);padding:22px 26px 26px;background:rgba(240,244,255,0.015);animation:apFade .3s ease both}
//         .jr-section-label{font-size:10.5px;font-weight:700;letter-spacing:1.5px;text-transform:uppercase;color:var(--white-soft);margin-bottom:12px;display:flex;align-items:center;gap:8px}
//         .jr-section-count{background:var(--teal-dim);border:1px solid rgba(15,212,192,0.2);color:var(--teal);padding:1px 8px;border-radius:100px;font-size:10px;letter-spacing:0;font-weight:600}
//         .jr-no-apps{display:flex;align-items:center;gap:10px;padding:16px;justify-content:center;font-size:13px;color:var(--white-soft);font-weight:300}
//         .jr-app-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(260px,1fr));gap:10px}
//         .jr-app-card{background:var(--navy);border:1px solid var(--border);border-radius:12px;padding:14px;display:flex;flex-direction:column;gap:10px;opacity:0;animation:apFade .4s cubic-bezier(.22,1,.36,1) forwards;transition:border-color .2s,transform .2s}
//         .jr-app-card:hover{border-color:rgba(15,212,192,0.2);transform:translateY(-1px)}
//         .jr-app-avatar{width:37px;height:37px;border-radius:9px;display:flex;align-items:center;justify-content:center;font-family:'Cabinet Grotesk',sans-serif;font-size:12px;font-weight:800;color:#0b1120;flex-shrink:0}
//         .jr-app-info{flex:1;min-width:0;display:flex;flex-direction:column;gap:4px}
//         .jr-app-top-row{display:flex;align-items:center;justify-content:space-between;gap:8px;margin-bottom:2px}
//         .jr-app-name{font-size:13.5px;font-weight:700;color:var(--white);white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
//         .jr-app-meta-row{display:flex;align-items:center;gap:6px;font-size:11.5px;color:var(--white-soft);font-weight:300}
//         .jr-app-email{white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
//         .jr-app-contact{color:var(--white-soft)}
//         .jr-app-date{color:rgba(154,170,191,0.7);font-size:11px}
//         .jr-app-status{padding:3px 9px;border-radius:100px;font-size:10.5px;font-weight:600;flex-shrink:0;white-space:nowrap}
//         .jr-app-skills{display:flex;gap:5px;flex-wrap:wrap;margin-top:2px}
//         .jr-skill-chip{padding:2px 8px;border-radius:6px;background:rgba(129,140,248,0.1);border:1px solid rgba(129,140,248,0.18);font-size:10.5px;color:#818cf8;font-weight:500}
//         .jr-skill-more{background:var(--white-dim);border-color:var(--border);color:var(--white-soft)}
//         .jr-view-btn{display:inline-flex;align-items:center;gap:4px;padding:6px 12px;background:var(--teal-dim);border:1px solid rgba(15,212,192,0.2);border-radius:7px;font-family:'Cabinet Grotesk',sans-serif;font-size:11.5px;font-weight:700;color:var(--teal);cursor:pointer;flex-shrink:0;transition:all .15s}
//         .jr-view-btn:hover{background:rgba(15,212,192,0.15);border-color:rgba(15,212,192,0.35)}
//         .jr-view-btn-block{width:100%;justify-content:center;margin-top:2px}

//         /* MODAL META */
//         .ap-modal-meta-row{display:flex;align-items:center;gap:7px;font-size:12px;color:var(--white-soft);font-weight:300;margin-top:4px}
//         .ap-no-resume{display:flex;align-items:center;justify-content:center;gap:10px;height:80px;border:1px dashed var(--border);border-radius:11px;font-size:13px;color:var(--white-soft);background:rgba(240,244,255,0.02)}

//         /* STATUS BADGES */
//         .ap-status-blue  {background:var(--blue-dim);  border:1px solid rgba(96,165,250,0.2);  color:var(--blue)  }
//         .ap-status-amber {background:var(--amber-dim); border:1px solid rgba(245,166,35,0.2);  color:var(--amber) }
//         .ap-status-teal  {background:var(--teal-dim);  border:1px solid rgba(15,212,192,0.2);  color:var(--teal)  }
//         .ap-status-red   {background:var(--red-dim);   border:1px solid rgba(255,94,94,0.2);   color:var(--red)   }

//         /* APTITUDE PANEL */
//         .at-wrap{margin-bottom:2px}
//         .at-create-btn{display:inline-flex;align-items:center;gap:7px;padding:9px 18px;background:rgba(245,166,35,0.08);border:1px solid rgba(245,166,35,0.2);border-radius:9px;font-family:'Cabinet Grotesk',sans-serif;font-size:13px;font-weight:700;color:var(--amber);cursor:pointer;transition:all .15s}
//         .at-create-btn:hover{background:rgba(245,166,35,0.14);border-color:rgba(245,166,35,0.35)}
//         .at-panel{background:rgba(240,244,255,0.03);border:1px solid var(--border);border-radius:14px;overflow:hidden;animation:apFade .3s ease both}
//         .at-panel-header{display:flex;align-items:center;justify-content:space-between;padding:13px 16px;border-bottom:1px solid var(--border);background:rgba(245,166,35,0.04)}
//         .at-panel-title{display:flex;align-items:center;gap:8px;font-family:'Cabinet Grotesk',sans-serif;font-size:13.5px;font-weight:700;color:var(--white)}
//         .at-close{width:27px;height:27px;border-radius:7px;background:var(--white-dim);border:1px solid var(--border);display:flex;align-items:center;justify-content:center;color:var(--white-soft);cursor:pointer;transition:all .15s}
//         .at-close:hover{color:var(--red);background:var(--red-dim);border-color:rgba(255,94,94,0.2)}
//         .at-panel-body{padding:16px}
//         .at-row{display:grid;grid-template-columns:1fr 1fr;gap:12px;margin-bottom:13px}
//         .at-field{margin-bottom:0}
//         .at-label{display:block;font-size:10.5px;font-weight:700;letter-spacing:.8px;text-transform:uppercase;color:var(--white-soft);margin-bottom:6px}
//         .at-label-hint{font-size:10px;color:rgba(154,170,191,0.4);letter-spacing:0;text-transform:none;font-weight:300}
//         .at-input-wrap{position:relative;display:flex;align-items:center}
//         .at-icon{position:absolute;left:11px;color:rgba(154,170,191,0.3);pointer-events:none}
//         .at-input{width:100%;padding:10px 11px 10px 34px;background:rgba(240,244,255,0.04);border:1.5px solid var(--border);border-radius:9px;font-family:'Geist',sans-serif;font-size:13.5px;color:var(--white);outline:none;transition:border-color .2s,box-shadow .2s;-webkit-appearance:none;color-scheme:dark}
//         .at-input::placeholder{color:rgba(154,170,191,0.28)}
//         .at-input:focus{border-color:var(--amber);box-shadow:0 0 0 3px rgba(245,166,35,0.1)}
//         .at-dropzone{border:1.5px dashed rgba(240,244,255,0.1);border-radius:11px;padding:18px;text-align:center;cursor:pointer;transition:border-color .2s,background .2s;margin-top:3px}
//         .at-dropzone:hover,.at-dropzone.drag{border-color:rgba(15,212,192,0.3);background:rgba(15,212,192,0.04)}
//         .at-dropzone.has-file{border-style:solid;border-color:rgba(15,212,192,0.25);background:rgba(15,212,192,0.04);cursor:default}
//         .at-drop-icon{width:38px;height:38px;border-radius:10px;background:var(--white-dim);border:1px solid var(--border);display:flex;align-items:center;justify-content:center;margin:0 auto 9px;color:var(--white-soft)}
//         .at-drop-text{font-size:13px;color:var(--white-soft)}
//         .at-drop-text span{color:var(--teal);font-weight:500}
//         .at-drop-hint{font-size:11px;color:rgba(154,170,191,0.35);margin-top:4px}
//         .at-file-selected{display:flex;align-items:center;gap:11px;text-align:left}
//         .at-file-icon{width:36px;height:36px;border-radius:9px;background:var(--teal-dim);border:1px solid rgba(15,212,192,0.2);display:flex;align-items:center;justify-content:center;color:var(--teal);flex-shrink:0}
//         .at-file-name{font-size:13px;font-weight:500;color:var(--white);margin-bottom:2px}
//         .at-file-size{font-size:11px;color:var(--white-soft)}
//         .at-file-remove{margin-left:auto;width:26px;height:26px;border-radius:6px;background:var(--red-dim);border:1px solid rgba(255,94,94,0.2);display:flex;align-items:center;justify-content:center;color:var(--red);cursor:pointer;flex-shrink:0;transition:all .15s}
//         .at-file-remove:hover{background:rgba(255,94,94,0.18)}
//         .at-msg{display:flex;align-items:center;gap:8px;padding:10px 13px;border-radius:9px;font-size:12.5px;font-weight:500;margin-top:11px;animation:apFade .3s ease both}
//         .at-msg.success{background:var(--teal-dim);border:1px solid rgba(15,212,192,0.22);color:var(--teal)}
//         .at-msg.error{background:var(--red-dim);border:1px solid rgba(255,94,94,0.2);color:#ff8f8f}
//         .at-actions{display:flex;justify-content:flex-end;gap:10px;margin-top:14px}
//         .at-cancel{padding:8px 16px;background:transparent;border:1px solid var(--border);border-radius:9px;font-family:'Geist',sans-serif;font-size:13px;color:var(--white-soft);cursor:pointer;transition:all .15s}
//         .at-cancel:hover{border-color:rgba(240,244,255,0.18);color:var(--white)}
//         .at-save{display:inline-flex;align-items:center;gap:6px;padding:9px 20px;background:var(--amber);color:#0b1120;font-family:'Cabinet Grotesk',sans-serif;font-size:13px;font-weight:800;border:none;border-radius:9px;cursor:pointer;box-shadow:0 4px 16px rgba(245,166,35,0.25);transition:transform .15s,box-shadow .2s,opacity .15s}
//         .at-save:hover:not(:disabled){transform:translateY(-1px);box-shadow:0 8px 22px rgba(245,166,35,0.35)}
//         .at-save:disabled{opacity:.45;cursor:not-allowed}
//         .at-spinner{width:12px;height:12px;border:2px solid rgba(0,0,0,.2);border-top-color:#0b1120;border-radius:50%;animation:spin .65s linear infinite}
//         .at-existing{display:flex;align-items:center;gap:13px;padding:13px 15px;background:var(--teal-dim);border:1px solid rgba(15,212,192,0.2);border-radius:12px}
//         .at-existing-icon{width:34px;height:34px;border-radius:9px;background:rgba(15,212,192,0.15);display:flex;align-items:center;justify-content:center;color:var(--teal);flex-shrink:0}
//         .at-existing-title{font-size:13px;font-weight:600;color:var(--white);margin-bottom:2px}
//         .at-existing-meta{font-size:11.5px;color:var(--white-soft);font-weight:300}
//         .at-badge-active{margin-left:auto;padding:3px 10px;border-radius:100px;background:rgba(34,197,94,0.1);border:1px solid rgba(34,197,94,0.2);font-size:10.5px;font-weight:600;color:#22c55e;flex-shrink:0}

//         /* MODAL */
//         .ap-backdrop{position:fixed;inset:0;background:rgba(5,9,18,.75);backdrop-filter:blur(6px);z-index:400;animation:bdFade .25s ease both}
//         @keyframes bdFade{from{opacity:0}to{opacity:1}}
//         .ap-modal{position:fixed;top:50%;left:50%;transform:translate(-50%,-50%);width:min(680px,95vw);background:#16202f;border:1px solid var(--border);border-radius:22px;overflow:hidden;z-index:401;display:flex;flex-direction:column;animation:modalIn .35s cubic-bezier(.22,1,.36,1) both}
//         @keyframes modalIn{from{opacity:0;transform:translate(-50%,-46%) scale(.96)}to{opacity:1;transform:translate(-50%,-50%) scale(1)}}
//         .ap-modal-top{height:2px;background:linear-gradient(90deg,var(--teal),rgba(15,212,192,0.15))}
//         .ap-modal-header{padding:22px 26px 18px;display:flex;align-items:center;gap:14px;border-bottom:1px solid var(--border)}
//         .ap-modal-avatar{width:50px;height:50px;border-radius:13px;background:linear-gradient(135deg,#0fd4c0,#0b9e8e);display:flex;align-items:center;justify-content:center;font-family:'Cabinet Grotesk',sans-serif;font-size:17px;font-weight:800;color:#0b1120;flex-shrink:0}
//         .ap-modal-info{flex:1;min-width:0}
//         .ap-modal-name{font-family:'Cabinet Grotesk',sans-serif;font-size:19px;font-weight:800;color:var(--white);letter-spacing:-.4px;margin-bottom:4px}
//         .ap-modal-email{display:flex;align-items:center;gap:6px;font-size:12.5px;color:var(--white-soft);text-decoration:none;font-weight:300;transition:color .15s}
//         .ap-modal-email:hover{color:var(--teal)}
//         .ap-modal-skills{display:flex;flex-wrap:wrap;gap:5px;margin-top:7px}
//         .ap-skill-tag{padding:2px 9px;border-radius:6px;background:var(--purple-dim);border:1px solid rgba(129,140,248,0.2);font-size:11px;color:#818cf8;font-weight:500}
//         .ap-modal-cur-status{display:inline-block;margin-top:6px;padding:3px 10px;border-radius:100px;font-size:11px;font-weight:600}
//         .ap-modal-close{width:32px;height:32px;border-radius:8px;background:var(--white-dim);border:1px solid var(--border);display:flex;align-items:center;justify-content:center;color:var(--white-soft);cursor:pointer;flex-shrink:0;transition:all .15s}
//         .ap-modal-close:hover{color:var(--red);background:var(--red-dim);border-color:rgba(255,94,94,0.2)}
//         .ap-modal-body{padding:18px 26px}
//         .ap-resume-label{font-size:11px;font-weight:600;letter-spacing:.8px;text-transform:uppercase;color:var(--white-soft);margin-bottom:9px;display:flex;align-items:center;gap:7px}
//         .ap-resume-frame{border:1px solid var(--border);border-radius:11px;overflow:hidden;height:320px;background:rgba(240,244,255,0.02)}
//         .ap-iframe{width:100%;height:100%;border:none}
//         .ap-modal-footer{padding:16px 26px 20px;border-top:1px solid var(--border);background:rgba(240,244,255,0.02)}
//         .ap-footer-label{font-size:11px;font-weight:600;letter-spacing:.8px;text-transform:uppercase;color:var(--white-soft);margin-bottom:11px}
//         .ap-footer-row{display:flex;align-items:center;gap:10px;flex-wrap:wrap}
//         .ap-status-chips{display:flex;gap:8px;flex-wrap:wrap}
//         .ap-chip{padding:7px 13px;border-radius:9px;font-size:13px;font-weight:600;cursor:pointer;border:1px solid var(--border);transition:all .15s;user-select:none;color:var(--white-soft);background:var(--white-dim)}
//         .ap-chip:hover{color:var(--white);border-color:rgba(240,244,255,0.18)}
//         .ap-chip-amber.active{background:var(--amber-dim);border-color:rgba(245,166,35,0.3);color:var(--amber)}
//         .ap-chip-teal.active{background:var(--teal-dim);border-color:rgba(15,212,192,0.3);color:var(--teal)}
//         .ap-chip-red.active{background:var(--red-dim);border-color:rgba(255,94,94,0.3);color:var(--red)}
//         .ap-submit-btn{display:inline-flex;align-items:center;gap:6px;padding:9px 20px;background:var(--teal);color:var(--navy);font-family:'Cabinet Grotesk',sans-serif;font-size:13.5px;font-weight:800;border:none;border-radius:9px;cursor:pointer;box-shadow:0 4px 16px rgba(15,212,192,0.25);transition:all .15s;margin-left:auto}
//         .ap-submit-btn:hover:not(:disabled){transform:translateY(-1px);box-shadow:0 8px 22px rgba(15,212,192,0.38)}
//         .ap-submit-btn:disabled{opacity:.45;cursor:not-allowed}
//         .ap-spinner{width:13px;height:13px;border:2px solid rgba(11,17,32,.25);border-top-color:var(--navy);border-radius:50%;animation:spin .65s linear infinite}
//         .ap-success-msg{display:flex;align-items:center;gap:9px;padding:12px 14px;background:var(--teal-dim);border:1px solid rgba(15,212,192,0.25);border-radius:10px;font-size:13.5px;font-weight:500;color:var(--teal);animation:apFade .35s ease both}

//         @media(max-width:768px){
//           .ap-hero,.ap-jobs-wrap{padding-left:24px;padding-right:24px}
//           .ap-hero{padding-top:110px}
//           .at-row{grid-template-columns:1fr}
//           .jr-header{flex-wrap:wrap}
//           .jr-toggle-btn{width:100%;justify-content:center}
//         }
//       `}</style>

//       <div className="ap-root">
//         <section className="ap-hero">
//           <div className="ap-hero-inner">
//             <div>
//               <div className="ap-badge"><span className="ap-badge-dot"/>{user?.username}'s Dashboard</div>
//               <h1 className="ap-hero-title">Posted <em>Jobs</em> &amp;<br/>Applicants</h1>
//               <p className="ap-hero-sub">Manage listings, aptitude tests &amp; applicants in one place.</p>
//             </div>
//             <Link to="/post-job" className="ap-post-btn">
//               <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
//                 <line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/>
//               </svg>
//               Post a New Job
//             </Link>
//           </div>
//         </section>

//         <div className="ap-jobs-wrap">
//           {loading ? (
//             <div className="ap-center"><span style={{color:"var(--white-soft)",fontSize:14}}>Loading your jobs…</span></div>
//           ) : error ? (
//             <div className="ap-center"><span style={{color:"var(--red)",fontSize:14}}>Error: {error}</span></div>
//           ) : jobs.length === 0 ? (
//             <div className="ap-empty">
//               <div className="ap-empty-icon">
//                 <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
//                   <rect x="2" y="7" width="20" height="14" rx="2"/><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/>
//                 </svg>
//               </div>
//               <div className="ap-empty-title">No jobs posted yet</div>
//               <p className="ap-empty-sub">Post your first job to start receiving applications.</p>
//               <Link to="/post-job" className="ap-post-btn">+ Post a Job</Link>
//             </div>
//           ) : (
//             jobs.map((job,i)=>(
//               <JobRow key={job.id} job={job} index={i} onOpenApplicant={setSelectedApplicant}/>
//             ))
//           )}
//         </div>

//         {selectedApplicant && (
//           <ApplicantModal
//             applicant={selectedApplicant}
//             onClose={()=>setSelectedApplicant(null)}
//             onStatusUpdate={()=>setRefreshKey(k=>k+1)}
//           />
//         )}
//       </div>
//     </>
//   );
// };

// export default Applied;















// import React, { useEffect, useState, useRef } from "react";
// import axios from "axios";
// import { Link } from "react-router-dom";

// const BASE = "http://127.0.0.1:8000";

// const STATUS_CFG = {
//   applied:     { label: "Applied",     color: "#60a5fa", bg: "rgba(96,165,250,0.1)",  border: "rgba(96,165,250,0.22)"  },
//   interviewed: { label: "Interviewed", color: "#f5a623", bg: "rgba(245,166,35,0.1)",  border: "rgba(245,166,35,0.22)"  },
//   hired:       { label: "Hired",       color: "#0fd4c0", bg: "rgba(15,212,192,0.1)",  border: "rgba(15,212,192,0.22)"  },
//   rejected:    { label: "Rejected",    color: "#f87171", bg: "rgba(248,113,113,0.1)", border: "rgba(248,113,113,0.22)" },
// };
// const getS  = (s="") => STATUS_CFG[(s||"").toLowerCase()] || STATUS_CFG.applied;
// const GRADS = [
//   ["#0fd4c0","#0891b2"],["#f5a623","#ea580c"],["#818cf8","#6d28d9"],
//   ["#f472b6","#db2777"],["#34d399","#059669"],["#60a5fa","#2563eb"],
// ];
// const grad     = (i) => `linear-gradient(135deg,${GRADS[i%GRADS.length][0]},${GRADS[i%GRADS.length][1]})`;
// const initials = (s="") => s.split(" ").slice(0,2).map(w=>w[0]?.toUpperCase()).join("")||"?";
// const fmt      = (d) => { try { return new Date(d).toLocaleDateString("en-IN",{day:"numeric",month:"short",year:"numeric"}); } catch { return d||"—"; }};

// /* ─────────────────────────────────────────
//    ATS SCORE BAR
// ───────────────────────────────────────── */
// const ScoreBar = ({score}) => {
//   const pct   = Math.min(100, Math.max(0, score || 0));
//   const color = pct >= 75 ? "#0fd4c0" : pct >= 50 ? "#f5a623" : "#f87171";
//   return (
//     <div className="ap-score-wrap">
//       <div className="ap-score-bar"><div className="ap-score-fill" style={{width:`${pct}%`, background:color}}/></div>
//       <span className="ap-score-num" style={{color}}>{pct}%</span>
//     </div>
//   );
// };

// /* ─────────────────────────────────────────
//    APPLICANT DETAIL MODAL
// ───────────────────────────────────────── */
// const ApplicantModal = ({ applicant, onClose, onStatusUpdate }) => {
//   const [status,     setStatus]    = useState("");
//   const [submitting, setSubmitting] = useState(false);
//   const [success,    setSuccess]   = useState(false);

//   const fileUrl = applicant.file
//     ? (applicant.file.startsWith("http") ? applicant.file : `${BASE}${applicant.file}`)
//     : null;
//   const appliedDate = applicant.appliedAt ? fmt(applicant.appliedAt) : "—";
//   const skillsList  = applicant.skills ? applicant.skills.split(",").map(s=>s.trim()).filter(Boolean) : [];

//   const handleUpdate = async () => {
//     if (!status) return;
//     setSubmitting(true);
//     try {
//       await axios.patch(`${BASE}/applications/api/update-status/${applicant.id}/`, { status });
//       setSuccess(true);
//       setTimeout(() => { onStatusUpdate(applicant.id, status); onClose(); }, 1200);
//     } catch(e) { console.error(e); }
//     finally { setSubmitting(false); }
//   };

//   return (<>
//     <div className="md-overlay" onClick={onClose}/>
//     <div className="md-shell">
//       <div className="md-accent"/>

//       {/* Header */}
//       <div className="md-head">
//         <div className="md-avatar">{initials(applicant.name||"A")}</div>
//         <div className="md-head-info">
//           <h2 className="md-name">{applicant.name||"Applicant"}</h2>
//           <a href={`mailto:${applicant.email}`} className="md-email">✉ {applicant.email}</a>
//           {applicant.contact && <div className="md-contact">📞 {applicant.contact}</div>}
//           <div className="md-date">Applied {appliedDate}</div>
//           {skillsList.length > 0 && (
//             <div className="md-skills">{skillsList.map(sk=><span key={sk} className="md-skill">{sk}</span>)}</div>
//           )}
//           {applicant["Final Score"] !== undefined && (
//             <div className="md-ats-row">
//               <span className="md-ats-lbl">ATS Score</span>
//               <ScoreBar score={applicant["Final Score"]}/>
//             </div>
//           )}
//           <div className="md-cur-status" style={{color:getS(applicant.status).color,background:getS(applicant.status).bg,border:`1px solid ${getS(applicant.status).border}`}}>
//             {getS(applicant.status).label}
//           </div>
//         </div>
//         <button className="md-close" onClick={onClose}>✕</button>
//       </div>

//       {/* Resume */}
//       <div className="md-body">
//         <div className="md-section-lbl">Resume / CV</div>
//         {fileUrl ? (
//           <div className="md-resume-frame">
//             <iframe src={fileUrl} title="Resume" style={{width:"100%",height:"100%",border:"none"}}/>
//           </div>
//         ) : (
//           <div className="md-no-resume">📄 No resume uploaded</div>
//         )}
//       </div>

//       {/* Status update footer */}
//       <div className="md-foot">
//         {success ? (
//           <div className="md-success">✓ Status updated successfully!</div>
//         ) : (<>
//           <div className="md-foot-lbl">Update Status</div>
//           <div className="md-foot-row">
//             <div className="md-chips">
//               {["interviewed","hired","rejected"].map(s => {
//                 const cfg = STATUS_CFG[s];
//                 return (
//                   <button key={s} className={`md-chip${status===s?" on":""}`}
//                     style={status===s?{color:cfg.color,background:cfg.bg,borderColor:cfg.border}:{}}
//                     onClick={()=>setStatus(s)}>
//                     {cfg.label}
//                   </button>
//                 );
//               })}
//             </div>
//             <button className="md-save" onClick={handleUpdate} disabled={!status||submitting}>
//               {submitting ? <><span className="spin"/>Saving…</> : <>Update ✓</>}
//             </button>
//           </div>
//         </>)}
//       </div>
//     </div>
//   </>);
// };

// /* ─────────────────────────────────────────
//    APTITUDE TEST PANEL (inline under job)
// ───────────────────────────────────────── */
// const AptitudePanel = ({ jobId, existingTest, onTestCreated }) => {
//   const [open,      setOpen]      = useState(false);
//   const [file,      setFile]      = useState(null);
//   const [duration,  setDuration]  = useState("");
//   const [startTime, setStartTime] = useState("");
//   const [dragOver,  setDragOver]  = useState(false);
//   const [status,    setStatus]    = useState(null);
//   const [errMsg,    setErrMsg]    = useState("");
//   const fileRef = useRef();

//   const handleSubmit = async () => {
//     if (!file || !duration || !startTime) { setErrMsg("Fill all fields and upload a file."); setStatus("error"); return; }
//     setStatus("saving"); setErrMsg("");
//     const fd = new FormData();
//     fd.append("mcq_file", file);
//     fd.append("duration_min", duration);
//     fd.append("start_time", startTime);
//     try {
//       const res = await axios.post(`${BASE}/jobs/api/jobs/${jobId}/aptitude-test/create/`, fd, { headers:{"Content-Type":"multipart/form-data"} });
//       setStatus("success");
//       onTestCreated(res.data);
//       setTimeout(()=>setOpen(false), 1600);
//     } catch(e) { setErrMsg(e?.response?.data?.error||"Failed."); setStatus("error"); }
//   };

//   if (existingTest) return (
//     <div className="at-existing">
//       <div className="at-ex-left">
//         <div className="at-ex-icon">✓</div>
//         <div>
//           <div className="at-ex-title">Aptitude Test Active</div>
//           <div className="at-ex-meta">
//             {existingTest.duration_min}min · {new Date(existingTest.start_time).toLocaleString("en-IN",{day:"numeric",month:"short",year:"numeric",hour:"2-digit",minute:"2-digit"})}
//           </div>
//         </div>
//       </div>
//       <span className="at-live-badge">● Live</span>
//     </div>
//   );

//   return (
//     <div>
//       {!open ? (
//         <button className="at-create-btn" onClick={()=>setOpen(true)}>
//           + Create Aptitude Test
//         </button>
//       ) : (
//         <div className="at-panel">
//           <div className="at-panel-hd">
//             <span>📋 Aptitude Test Setup</span>
//             <button className="at-panel-x" onClick={()=>{setOpen(false);setStatus(null);setFile(null);}}>✕</button>
//           </div>
//           <div className="at-panel-body">
//             <div className="at-row2">
//               <div className="at-field">
//                 <label className="at-lbl">Start Date & Time</label>
//                 <input type="datetime-local" className="at-input" value={startTime} onChange={e=>setStartTime(e.target.value)}/>
//               </div>
//               <div className="at-field">
//                 <label className="at-lbl">Duration (minutes)</label>
//                 <input type="number" min="1" className="at-input" placeholder="e.g. 30" value={duration} onChange={e=>setDuration(e.target.value)}/>
//               </div>
//             </div>
//             <label className="at-lbl">MCQ File <span style={{color:"rgba(107,127,163,.5)",fontWeight:300}}>(JSON, PDF, DOCX, CSV accepted)</span></label>
//             <div className={`at-drop${dragOver?" drag":""}${file?" has":""}` }
//               onClick={()=>!file&&fileRef.current?.click()}
//               onDragOver={e=>{e.preventDefault();setDragOver(true)}}
//               onDragLeave={()=>setDragOver(false)}
//               onDrop={e=>{e.preventDefault();setDragOver(false);const f=e.dataTransfer.files[0];if(f)setFile(f);}}>
//               <input ref={fileRef} type="file" hidden accept=".json,.pdf,.doc,.docx,.xlsx,.csv,.txt" onChange={e=>setFile(e.target.files[0])}/>
//               {file ? (
//                 <div className="at-file-row">
//                   <span className="at-file-ic">📄</span>
//                   <div><div className="at-file-name">{file.name}</div><div className="at-file-sz">{(file.size/1024).toFixed(1)} KB</div></div>
//                   <button className="at-file-rm" onClick={e=>{e.stopPropagation();setFile(null);}}>✕</button>
//                 </div>
//               ) : (
//                 <div style={{textAlign:"center"}}>
//                   <div style={{fontSize:24,marginBottom:6}}>⬆</div>
//                   <div className="at-drop-title">Drop file or <span style={{color:"var(--teal)"}}>browse</span></div>
//                   <div className="at-drop-hint">JSON · PDF · DOCX · CSV</div>
//                 </div>
//               )}
//             </div>
//             {status==="error"   && <div className="at-msg err">⚠ {errMsg}</div>}
//             {status==="success" && <div className="at-msg ok">✓ Aptitude test created!</div>}
//             <div className="at-actions">
//               <button className="at-cancel-btn" onClick={()=>{setOpen(false);setStatus(null);setFile(null);}}>Cancel</button>
//               <button className="at-save-btn" onClick={handleSubmit} disabled={status==="saving"||status==="success"}>
//                 {status==="saving"?<><span className="spin"/>Saving…</>:"✓ Create Test"}
//               </button>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// /* ─────────────────────────────────────────
//    JOB CARD (expandable)
// ───────────────────────────────────────── */
// const JobCard = ({ job, index, onOpenApplicant }) => {
//   const [expanded,   setExpanded]  = useState(false);
//   const [applicants, setApplicants]= useState([]);
//   const [loading,    setLoading]   = useState(false);
//   const [fetched,    setFetched]   = useState(false);
//   const [atsLoading, setAtsLoading]= useState(false);
//   const [testData,   setTestData]  = useState(job.has_test ? { exists:true, duration_min:"?", start_time:new Date().toISOString() } : null);

//   const toggle = async () => {
//     if (!expanded && !fetched) {
//       setLoading(true);
//       try {
//         const res = await axios.get(`${BASE}/applications/api/applied/${job.id}/`);
//         setApplicants(res.data);
//         setFetched(true);
//       } catch(e) { console.error(e); }
//       finally { setLoading(false); }
//     }
//     setExpanded(p=>!p);
//   };

//   const runATS = async (e) => {
//     e.stopPropagation();
//     if (!fetched || applicants.length === 0) { alert("Click 'View Applicants' first."); return; }
//     setAtsLoading(true);
//     try {
//       const res = await axios.post(`${BASE}/applications/api/ats-ranking/`, { job_id: job.id, applicants });
//       const ranked = res.data;
//       const merged = ranked.map(r => {
//         const orig = applicants.find(a => a.name===r.Candidate || (a.file||"").includes(r.Candidate));
//         return orig ? {...orig,...r} : r;
//       }).sort((a,b)=>b["Final Score"]-a["Final Score"]);
//       setApplicants(merged);
//     } catch(e) { alert("ATS failed: "+(e.response?.data?.error||e.message)); }
//     finally { setAtsLoading(false); }
//   };

//   const updateLocalStatus = (id, newStatus) => {
//     setApplicants(prev => prev.map(a => a.id===id ? {...a, status:newStatus} : a));
//   };

//   return (
//     <div className={`jc-card${expanded?" open":""}`} style={{animationDelay:`${index*0.06}s`}}>
//       {/* Header row */}
//       <div className="jc-header" onClick={toggle}>
//         <div className="jc-logo" style={{background:grad(index)}}>{initials(job.title||"J")}</div>
//         <div className="jc-info">
//           <div className="jc-title-row">
//             <h3 className="jc-title">{job.title}</h3>
//             {job.has_test && <span className="jc-test-badge">✓ Test Active</span>}
//           </div>
//           <p className="jc-desc">{(job.description||"").substring(0,90)}{(job.description||"").length>90?"…":""}</p>
//           <div className="jc-meta">
//             {job.type     && <span className="jc-pill">💼 {job.type}</span>}
//             {job.location && <span className="jc-pill">📍 {job.location}</span>}
//             {fetched      && <span className="jc-pill teal">{applicants.length} applicant{applicants.length!==1?"s":""}</span>}
//           </div>
//         </div>
//         <div className="jc-actions" onClick={e=>e.stopPropagation()}>
//           <button className="jc-ats-btn" onClick={runATS} disabled={atsLoading} title="Run ATS Ranking">
//             {atsLoading ? <><span className="spin"/>Running…</> : "⚡ ATS Rank"}
//           </button>
//         </div>
//         <div className="jc-toggle">
//           {loading ? <span className="spin-teal"/> : <>
//             <span>{expanded?"Hide":"View Applicants"}</span>
//             <svg className={`jc-chev${expanded?" open":""}`} width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="6 9 12 15 18 9"/></svg>
//           </>}
//         </div>
//       </div>

//       {/* Expanded panel */}
//       {expanded && (
//         <div className="jc-panel">
//           {/* Aptitude section */}
//           <div className="jc-sect-lbl">Aptitude Test</div>
//           <AptitudePanel jobId={job.id} existingTest={testData} onTestCreated={d=>setTestData({exists:true,...d})}/>

//           {/* Applicants section */}
//           <div className="jc-sect-lbl" style={{marginTop:22}}>
//             Applicants {fetched && <span className="jc-count">{applicants.length}</span>}
//           </div>

//           {applicants.length === 0 ? (
//             <div className="jc-empty">👤 No applicants yet for this role.</div>
//           ) : (
//             <div className="jc-app-grid">
//               {applicants.map((ap, i) => {
//                 const st = getS(ap.status);
//                 const skillsList = ap.skills ? ap.skills.split(",").map(s=>s.trim()).filter(Boolean) : [];
//                 return (
//                   <div key={ap.id||i} className="jc-app-card" style={{animationDelay:`${i*0.04}s`}}>
//                     {/* Top: avatar + name + status */}
//                     <div className="jc-app-top">
//                       <div className="jc-app-av" style={{background:grad(i+3)}}>{initials(ap.name||"A")}</div>
//                       <div className="jc-app-head">
//                         <div className="jc-app-name">{ap.name||"Applicant"}</div>
//                         <div className="jc-app-status" style={{color:st.color,background:st.bg,border:`1px solid ${st.border}`}}>{st.label}</div>
//                       </div>
//                     </div>

//                     {/* ATS score if available */}
//                     {ap["Final Score"]!==undefined && <ScoreBar score={ap["Final Score"]}/>}

//                     {/* Contact info */}
//                     <div className="jc-app-meta">
//                       <div className="jc-meta-row"><span>✉</span><span className="jc-meta-val">{ap.email||"—"}</span></div>
//                       {ap.contact && <div className="jc-meta-row"><span>📞</span><span className="jc-meta-val">{ap.contact}</span></div>}
//                       {ap.appliedAt && <div className="jc-meta-row"><span>📅</span><span className="jc-meta-val">Applied {fmt(ap.appliedAt)}</span></div>}
//                     </div>

//                     {/* Skills */}
//                     {skillsList.length > 0 && (
//                       <div className="jc-skills">
//                         {skillsList.slice(0,3).map(sk=><span key={sk} className="jc-skill">{sk}</span>)}
//                         {skillsList.length>3 && <span className="jc-skill more">+{skillsList.length-3}</span>}
//                       </div>
//                     )}

//                     {/* Review button */}
//                     <button className="jc-review-btn" onClick={()=>onOpenApplicant(ap, updateLocalStatus)}>
//                       Review Applicant →
//                     </button>
//                   </div>
//                 );
//               })}
//             </div>
//           )}
//         </div>
//       )}
//     </div>
//   );
// };

// /* ─────────────────────────────────────────
//    MAIN — Applied (Employer Dashboard)
// ───────────────────────────────────────── */
// const Applied = () => {
//   const [jobs,      setJobs]      = useState([]);
//   const [loading,   setLoading]   = useState(true);
//   const [error,     setError]     = useState(null);
//   const [selected,  setSelected]  = useState(null);
//   const [updateFn,  setUpdateFn]  = useState(null);

//   const user = JSON.parse(localStorage.getItem("user"));

//   useEffect(()=>{
//     (async()=>{
//       try {
//         const res = await axios.get(`${BASE}/jobs/api/employer-jobs`, { params:{ username:user?.username } });
//         setJobs(res.data);
//       } catch(e) { setError(e.message); }
//       finally { setLoading(false); }
//     })();
//   },[]);

//   const openApplicant = (ap, updateLocal) => {
//     setSelected(ap);
//     setUpdateFn(()=>updateLocal);
//   };

//   const totalJobs = jobs.length;

//   return (<>
//     <style>{`
//       @import url('https://fonts.googleapis.com/css2?family=Sora:wght@300;400;500;600;700;800&family=DM+Sans:ital,wght@0,300;0,400;0,500;1,400&display=swap');
//       *,*::before,*::after{box-sizing:border-box;margin:0;padding:0}
//       :root{
//         --bg:#080e1a; --surf:#0d1526; --card:#111e35; --card2:#162038;
//         --border:rgba(255,255,255,0.06); --border2:rgba(255,255,255,0.1);
//         --teal:#0fd4c0; --amber:#f5a623; --blue:#60a5fa;
//         --red:#f87171; --violet:#818cf8;
//         --white:#e8efff; --muted:#6b7fa3; --soft:#9aaabf;
//         --teal-d:rgba(15,212,192,0.1); --amber-d:rgba(245,166,35,0.1);
//         --blue-d:rgba(96,165,250,0.1); --red-d:rgba(248,113,113,0.1);
//         --violet-d:rgba(129,140,248,0.1);
//       }

//       /* ROOT */
//       .ap-root{background:var(--bg);font-family:'DM Sans',sans-serif;color:var(--white);min-height:100vh}

//       /* ── HERO ── */
//       .ap-hero{position:relative;overflow:hidden;padding:96px 56px 44px;border-bottom:1px solid var(--border)}
//       .ap-hero::before{content:'';position:absolute;inset:0;background:radial-gradient(ellipse 70% 60% at 50% -10%,rgba(15,212,192,0.07) 0%,transparent 65%);pointer-events:none}
//       .ap-hero::after{content:'';position:absolute;inset:0;background-image:radial-gradient(rgba(255,255,255,0.03) 1px,transparent 1px);background-size:28px 28px;pointer-events:none}
//       .ap-hero-inner{max-width:1180px;margin:0 auto;display:flex;align-items:flex-end;justify-content:space-between;gap:24px;flex-wrap:wrap;position:relative;z-index:1;opacity:0;animation:fadeUp .6s cubic-bezier(.22,1,.36,1) .08s forwards}
//       @keyframes fadeUp{from{opacity:0;transform:translateY(16px)}to{opacity:1;transform:translateY(0)}}
//       .ap-badge{display:inline-flex;align-items:center;gap:7px;font-size:11px;font-weight:700;letter-spacing:1.5px;text-transform:uppercase;color:var(--teal);margin-bottom:14px}
//       .ap-badge-dot{width:5px;height:5px;border-radius:50%;background:var(--teal);box-shadow:0 0 8px var(--teal);animation:pulse 2s ease-in-out infinite}
//       @keyframes pulse{0%,100%{opacity:1;transform:scale(1)}50%{opacity:.3;transform:scale(.6)}}
//       .ap-hero-h{font-family:'Sora',sans-serif;font-size:clamp(28px,4vw,46px);font-weight:800;line-height:1.1;letter-spacing:-1.5px;margin-bottom:10px}
//       .ap-hero-h em{font-style:italic;color:var(--teal)}
//       .ap-hero-sub{font-size:15px;color:var(--muted);font-weight:300;line-height:1.65;max-width:420px}
//       .ap-post-btn{display:inline-flex;align-items:center;gap:8px;padding:11px 22px;background:var(--teal);color:#080e1a;font-family:'Sora',sans-serif;font-size:13px;font-weight:700;border-radius:10px;text-decoration:none;box-shadow:0 4px 20px rgba(15,212,192,0.3);transition:all .18s;white-space:nowrap;flex-shrink:0}
//       .ap-post-btn:hover{transform:translateY(-2px);box-shadow:0 8px 28px rgba(15,212,192,0.4)}

//       /* ── STAT STRIP ── */
//       .ap-stats{max-width:1180px;margin:0 auto;padding:24px 56px;display:flex;gap:12px;flex-wrap:wrap}
//       .ap-stat{padding:16px 20px;background:var(--card);border:1px solid var(--border);border-radius:13px;display:flex;align-items:center;gap:12px;flex:1;min-width:150px;transition:border-color .2s}
//       .ap-stat:hover{border-color:var(--border2)}
//       .ap-stat-ic{font-size:20px}
//       .ap-stat-n{font-family:'Sora',sans-serif;font-size:24px;font-weight:800;line-height:1;margin-bottom:2px}
//       .ap-stat-l{font-size:11.5px;color:var(--muted)}

//       /* ── MAIN WRAP ── */
//       .ap-main{max-width:1180px;margin:0 auto;padding:4px 56px 80px}

//       /* ── JOB CARD ── */
//       .jc-card{background:var(--card);border:1px solid var(--border);border-radius:18px;margin-bottom:12px;overflow:hidden;opacity:0;animation:fadeUp .5s cubic-bezier(.22,1,.36,1) forwards;transition:border-color .2s}
//       .jc-card:hover{border-color:var(--border2)}
//       .jc-card.open{border-color:rgba(15,212,192,0.2)}
//       .jc-header{display:flex;align-items:center;gap:16px;padding:20px 24px;cursor:pointer;transition:background .15s}
//       .jc-header:hover{background:rgba(255,255,255,0.02)}
//       .jc-logo{width:48px;height:48px;border-radius:12px;display:flex;align-items:center;justify-content:center;font-family:'Sora',sans-serif;font-size:14px;font-weight:800;color:#fff;flex-shrink:0;box-shadow:0 4px 16px rgba(0,0,0,.4)}
//       .jc-info{flex:1;min-width:0}
//       .jc-title-row{display:flex;align-items:center;gap:8px;margin-bottom:4px;flex-wrap:wrap}
//       .jc-title{font-family:'Sora',sans-serif;font-size:16px;font-weight:700;color:var(--white);letter-spacing:-.3px}
//       .jc-test-badge{display:inline-flex;align-items:center;gap:4px;padding:2px 8px;border-radius:6px;background:var(--teal-d);border:1px solid rgba(15,212,192,0.2);font-size:10px;font-weight:700;color:var(--teal)}
//       .jc-desc{font-size:13px;color:var(--muted);font-weight:300;margin-bottom:8px;line-height:1.5}
//       .jc-meta{display:flex;gap:6px;flex-wrap:wrap}
//       .jc-pill{padding:3px 9px;background:rgba(255,255,255,0.04);border:1px solid var(--border);border-radius:6px;font-size:11px;color:var(--muted)}
//       .jc-pill.teal{background:var(--teal-d);border-color:rgba(15,212,192,0.2);color:var(--teal)}

//       /* actions area */
//       .jc-actions{display:flex;align-items:center;gap:8px;flex-shrink:0}
//       .jc-ats-btn{display:inline-flex;align-items:center;gap:6px;padding:8px 14px;background:var(--violet-d);border:1px solid rgba(129,140,248,0.22);border-radius:9px;font-family:'Sora',sans-serif;font-size:12.5px;font-weight:700;color:var(--violet);cursor:pointer;transition:all .15s;white-space:nowrap}
//       .jc-ats-btn:hover:not(:disabled){background:rgba(129,140,248,0.16);border-color:rgba(129,140,248,0.4);transform:translateY(-1px)}
//       .jc-ats-btn:disabled{opacity:.5;cursor:not-allowed}
//       .jc-toggle{display:flex;align-items:center;gap:7px;padding:8px 14px;border:1px solid var(--border);border-radius:9px;font-size:12.5px;font-weight:500;color:var(--muted);flex-shrink:0;cursor:pointer;transition:all .15s;user-select:none}
//       .jc-card.open .jc-toggle,.jc-header:hover .jc-toggle{border-color:rgba(15,212,192,0.3);color:var(--teal);background:var(--teal-d)}
//       .jc-chev{transition:transform .25s ease}
//       .jc-chev.open{transform:rotate(180deg)}

//       /* expanded panel */
//       .jc-panel{border-top:1px solid var(--border);padding:22px 24px 26px;background:rgba(255,255,255,0.015);animation:fadeUp .3s ease both}
//       .jc-sect-lbl{font-size:10px;font-weight:700;letter-spacing:1.5px;text-transform:uppercase;color:var(--muted);margin-bottom:12px;display:flex;align-items:center;gap:8px}
//       .jc-count{padding:1px 8px;border-radius:6px;background:var(--teal-d);border:1px solid rgba(15,212,192,0.18);color:var(--teal);font-size:10px;letter-spacing:0;font-weight:600}
//       .jc-empty{padding:20px;text-align:center;font-size:13.5px;color:var(--muted);border:1px dashed var(--border);border-radius:12px}

//       /* applicant grid */
//       .jc-app-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(270px,1fr));gap:10px}
//       .jc-app-card{background:var(--bg);border:1px solid var(--border);border-radius:14px;padding:16px;display:flex;flex-direction:column;gap:10px;opacity:0;animation:fadeUp .35s cubic-bezier(.22,1,.36,1) forwards;transition:border-color .2s,transform .2s}
//       .jc-app-card:hover{border-color:rgba(15,212,192,0.18);transform:translateY(-2px)}
//       .jc-app-top{display:flex;align-items:center;gap:10px}
//       .jc-app-av{width:40px;height:40px;border-radius:10px;display:flex;align-items:center;justify-content:center;font-family:'Sora',sans-serif;font-size:13px;font-weight:800;color:#fff;flex-shrink:0}
//       .jc-app-head{flex:1;min-width:0}
//       .jc-app-name{font-size:14px;font-weight:600;color:var(--white);white-space:nowrap;overflow:hidden;text-overflow:ellipsis;margin-bottom:4px}
//       .jc-app-status{display:inline-block;padding:2px 8px;border-radius:6px;font-size:10.5px;font-weight:700}
//       .jc-app-meta{display:flex;flex-direction:column;gap:5px}
//       .jc-meta-row{display:flex;align-items:center;gap:7px;font-size:12px;color:var(--muted)}
//       .jc-meta-val{white-space:nowrap;overflow:hidden;text-overflow:ellipsis;flex:1}
//       .jc-skills{display:flex;flex-wrap:wrap;gap:4px}
//       .jc-skill{padding:2px 8px;border-radius:6px;background:var(--violet-d);border:1px solid rgba(129,140,248,0.18);font-size:10.5px;color:var(--violet);font-weight:500}
//       .jc-skill.more{background:rgba(255,255,255,0.04);border-color:var(--border);color:var(--muted)}
//       .jc-review-btn{display:flex;align-items:center;justify-content:center;padding:8px;background:var(--teal-d);border:1px solid rgba(15,212,192,0.2);border-radius:9px;font-family:'Sora',sans-serif;font-size:12.5px;font-weight:700;color:var(--teal);cursor:pointer;transition:all .15s;margin-top:2px}
//       .jc-review-btn:hover{background:rgba(15,212,192,0.16);border-color:rgba(15,212,192,0.35)}

//       /* ── ATS SCORE ── */
//       .ap-score-wrap{display:flex;align-items:center;gap:8px}
//       .ap-score-bar{flex:1;height:4px;background:rgba(255,255,255,0.06);border-radius:100px;overflow:hidden}
//       .ap-score-fill{height:100%;border-radius:100px;transition:width .6s cubic-bezier(.22,1,.36,1)}
//       .ap-score-num{font-family:'Sora',sans-serif;font-size:12px;font-weight:700;flex-shrink:0}

//       /* ── APTITUDE PANEL ── */
//       .at-create-btn{display:inline-flex;align-items:center;gap:7px;padding:9px 16px;background:var(--amber-d);border:1px solid rgba(245,166,35,0.22);border-radius:9px;font-family:'Sora',sans-serif;font-size:13px;font-weight:700;color:var(--amber);cursor:pointer;transition:all .15s}
//       .at-create-btn:hover{background:rgba(245,166,35,0.16);border-color:rgba(245,166,35,0.4)}
//       .at-existing{display:flex;align-items:center;justify-content:space-between;padding:13px 16px;background:var(--teal-d);border:1px solid rgba(15,212,192,0.22);border-radius:12px}
//       .at-ex-left{display:flex;align-items:center;gap:12px}
//       .at-ex-icon{width:32px;height:32px;border-radius:8px;background:rgba(15,212,192,0.15);border:1px solid rgba(15,212,192,0.25);display:flex;align-items:center;justify-content:center;font-size:13px;color:var(--teal);font-weight:700}
//       .at-ex-title{font-size:13px;font-weight:600;color:var(--white);margin-bottom:2px}
//       .at-ex-meta{font-size:11.5px;color:var(--muted)}
//       .at-live-badge{padding:3px 10px;border-radius:100px;background:rgba(34,197,94,0.1);border:1px solid rgba(34,197,94,0.2);font-size:10.5px;font-weight:700;color:#22c55e}
//       .at-panel{background:rgba(255,255,255,0.03);border:1px solid var(--border);border-radius:14px;overflow:hidden;animation:fadeUp .3s ease both}
//       .at-panel-hd{display:flex;align-items:center;justify-content:space-between;padding:12px 16px;border-bottom:1px solid var(--border);background:rgba(245,166,35,0.04);font-family:'Sora',sans-serif;font-size:13px;font-weight:700;color:var(--white)}
//       .at-panel-x{background:none;border:none;color:var(--muted);cursor:pointer;font-size:15px;transition:color .15s}
//       .at-panel-x:hover{color:var(--red)}
//       .at-panel-body{padding:16px;display:flex;flex-direction:column;gap:12px}
//       .at-row2{display:grid;grid-template-columns:1fr 1fr;gap:12px}
//       .at-field{display:flex;flex-direction:column;gap:5px}
//       .at-lbl{font-size:10.5px;font-weight:700;letter-spacing:.8px;text-transform:uppercase;color:var(--muted)}
//       .at-input{padding:9px 12px;background:rgba(255,255,255,0.04);border:1.5px solid var(--border);border-radius:9px;font-family:'DM Sans',sans-serif;font-size:13.5px;color:var(--white);outline:none;transition:border-color .2s;color-scheme:dark}
//       .at-input:focus{border-color:rgba(245,166,35,0.5);box-shadow:0 0 0 3px rgba(245,166,35,0.08)}
//       .at-drop{border:1.5px dashed rgba(255,255,255,0.08);border-radius:11px;padding:20px;cursor:pointer;transition:border-color .2s,background .2s;background:rgba(255,255,255,0.02)}
//       .at-drop:hover,.at-drop.drag{border-color:rgba(15,212,192,0.3);background:rgba(15,212,192,0.04)}
//       .at-drop.has{border-style:solid;border-color:rgba(15,212,192,0.25);cursor:default}
//       .at-drop-title{font-size:13px;color:var(--muted);margin-bottom:4px}
//       .at-drop-hint{font-size:11px;color:rgba(107,127,163,0.4)}
//       .at-file-row{display:flex;align-items:center;gap:10px}
//       .at-file-ic{font-size:20px}
//       .at-file-name{font-size:13px;font-weight:500;color:var(--white);margin-bottom:2px}
//       .at-file-sz{font-size:11px;color:var(--muted)}
//       .at-file-rm{margin-left:auto;background:none;border:none;color:var(--red);font-size:14px;cursor:pointer;opacity:.7;transition:opacity .15s}
//       .at-file-rm:hover{opacity:1}
//       .at-msg{display:flex;align-items:center;gap:8px;padding:9px 12px;border-radius:9px;font-size:12.5px;font-weight:500}
//       .at-msg.ok{background:var(--teal-d);border:1px solid rgba(15,212,192,0.22);color:var(--teal)}
//       .at-msg.err{background:var(--red-d);border:1px solid rgba(248,113,113,0.2);color:var(--red)}
//       .at-actions{display:flex;justify-content:flex-end;gap:8px}
//       .at-cancel-btn{padding:8px 16px;background:transparent;border:1px solid var(--border);border-radius:9px;font-family:'DM Sans',sans-serif;font-size:13px;color:var(--muted);cursor:pointer;transition:all .15s}
//       .at-cancel-btn:hover{border-color:var(--border2);color:var(--white)}
//       .at-save-btn{display:inline-flex;align-items:center;gap:6px;padding:9px 20px;background:var(--amber);color:#080e1a;font-family:'Sora',sans-serif;font-size:13px;font-weight:700;border:none;border-radius:9px;cursor:pointer;box-shadow:0 4px 16px rgba(245,166,35,0.25);transition:all .15s}
//       .at-save-btn:hover:not(:disabled){transform:translateY(-1px);box-shadow:0 7px 22px rgba(245,166,35,0.38)}
//       .at-save-btn:disabled{opacity:.45;cursor:not-allowed}

//       /* ── APPLICANT MODAL ── */
//       .md-overlay{position:fixed;inset:0;background:rgba(4,8,18,.8);backdrop-filter:blur(8px);z-index:500;animation:bdFade .25s ease both}
//       @keyframes bdFade{from{opacity:0}to{opacity:1}}
//       .md-shell{position:fixed;top:50%;left:50%;transform:translate(-50%,-50%);width:min(660px,95vw);max-height:90vh;overflow-y:auto;background:#0e1a2e;border:1px solid rgba(255,255,255,0.08);border-radius:22px;z-index:501;display:flex;flex-direction:column;animation:mdIn .35s cubic-bezier(.22,1,.36,1) both;scrollbar-width:thin;scrollbar-color:rgba(255,255,255,.05) transparent}
//       @keyframes mdIn{from{opacity:0;transform:translate(-50%,-46%) scale(.95)}to{opacity:1;transform:translate(-50%,-50%) scale(1)}}
//       .md-accent{height:3px;background:linear-gradient(90deg,var(--teal),transparent);flex-shrink:0}
//       .md-head{display:flex;align-items:flex-start;gap:14px;padding:22px 24px 18px;border-bottom:1px solid var(--border)}
//       .md-avatar{width:52px;height:52px;border-radius:13px;background:linear-gradient(135deg,#0fd4c0,#0891b2);display:flex;align-items:center;justify-content:center;font-family:'Sora',sans-serif;font-size:17px;font-weight:800;color:#fff;flex-shrink:0}
//       .md-head-info{flex:1;min-width:0}
//       .md-name{font-family:'Sora',sans-serif;font-size:19px;font-weight:800;color:var(--white);letter-spacing:-.4px;margin-bottom:5px}
//       .md-email{display:block;font-size:12.5px;color:var(--muted);text-decoration:none;margin-bottom:4px;transition:color .15s}
//       .md-email:hover{color:var(--teal)}
//       .md-contact{font-size:12px;color:var(--muted);margin-bottom:4px}
//       .md-date{font-size:11.5px;color:rgba(107,127,163,.6);margin-bottom:8px}
//       .md-skills{display:flex;flex-wrap:wrap;gap:5px;margin-bottom:8px}
//       .md-skill{padding:2px 8px;border-radius:6px;background:var(--violet-d);border:1px solid rgba(129,140,248,.2);font-size:11px;color:var(--violet);font-weight:500}
//       .md-ats-row{display:flex;align-items:center;gap:10px;margin-bottom:8px}
//       .md-ats-lbl{font-size:11px;font-weight:600;letter-spacing:.5px;color:var(--muted);white-space:nowrap;text-transform:uppercase}
//       .md-cur-status{display:inline-block;padding:3px 10px;border-radius:7px;font-size:11px;font-weight:700}
//       .md-close{width:32px;height:32px;border-radius:9px;background:rgba(255,255,255,0.04);border:1px solid var(--border);color:var(--muted);cursor:pointer;display:flex;align-items:center;justify-content:center;flex-shrink:0;font-size:13px;transition:all .15s}
//       .md-close:hover{color:var(--red);background:var(--red-d)}
//       .md-body{padding:18px 24px}
//       .md-section-lbl{font-size:10px;font-weight:700;letter-spacing:1.5px;text-transform:uppercase;color:var(--muted);margin-bottom:10px}
//       .md-resume-frame{border:1px solid var(--border);border-radius:12px;overflow:hidden;height:340px;background:rgba(255,255,255,0.02)}
//       .md-no-resume{display:flex;align-items:center;justify-content:center;gap:8px;height:80px;border:1px dashed var(--border);border-radius:11px;font-size:13px;color:var(--muted)}
//       .md-foot{padding:16px 24px 22px;border-top:1px solid var(--border);background:rgba(255,255,255,0.02)}
//       .md-foot-lbl{font-size:10px;font-weight:700;letter-spacing:1.5px;text-transform:uppercase;color:var(--muted);margin-bottom:11px}
//       .md-foot-row{display:flex;align-items:center;gap:10px;flex-wrap:wrap}
//       .md-chips{display:flex;gap:7px;flex-wrap:wrap}
//       .md-chip{padding:7px 14px;border-radius:9px;font-size:13px;font-weight:600;cursor:pointer;border:1px solid var(--border);background:rgba(255,255,255,0.04);color:var(--muted);transition:all .15s;font-family:'DM Sans',sans-serif}
//       .md-chip:hover{color:var(--white);border-color:var(--border2)}
//       .md-save{display:inline-flex;align-items:center;gap:6px;padding:9px 20px;background:var(--teal);color:#080e1a;font-family:'Sora',sans-serif;font-size:13.5px;font-weight:800;border:none;border-radius:9px;cursor:pointer;box-shadow:0 4px 16px rgba(15,212,192,.25);transition:all .15s;margin-left:auto}
//       .md-save:hover:not(:disabled){transform:translateY(-1px);box-shadow:0 7px 22px rgba(15,212,192,.38)}
//       .md-save:disabled{opacity:.4;cursor:not-allowed}
//       .md-success{display:flex;align-items:center;gap:8px;padding:12px 14px;background:var(--teal-d);border:1px solid rgba(15,212,192,.22);border-radius:10px;font-size:14px;font-weight:500;color:var(--teal);animation:fadeUp .3s ease both}

//       /* ── SPINNERS ── */
//       .spin{display:inline-block;width:12px;height:12px;border:2px solid rgba(255,255,255,.15);border-top-color:currentColor;border-radius:50%;animation:rotate .65s linear infinite}
//       .spin-teal{display:inline-block;width:14px;height:14px;border:2px solid rgba(15,212,192,.2);border-top-color:var(--teal);border-radius:50%;animation:rotate .65s linear infinite}
//       @keyframes rotate{to{transform:rotate(360deg)}}

//       /* ── CENTER / EMPTY ── */
//       .ap-center{display:flex;align-items:center;justify-content:center;min-height:60vh;flex-direction:column;gap:12px}
//       .ap-empty{text-align:center;padding:80px 24px}
//       .ap-empty-ic{font-size:48px;margin-bottom:16px}
//       .ap-empty-h{font-family:'Sora',sans-serif;font-size:20px;font-weight:700;margin-bottom:8px}
//       .ap-empty-p{font-size:14px;color:var(--muted);margin-bottom:26px}

//       @media(max-width:900px){
//         .ap-hero,.ap-stats,.ap-main{padding-left:20px;padding-right:20px}
//         .ap-hero{padding-top:90px}
//         .jc-actions{display:none}
//         .at-row2{grid-template-columns:1fr}
//       }
//       @media(max-width:600px){
//         .jc-app-grid{grid-template-columns:1fr}
//         .md-head{flex-wrap:wrap}
//         .md-foot-row{flex-direction:column;align-items:stretch}
//         .md-save{margin-left:0}
//       }
//     `}</style>

//     <div className="ap-root">

//       {/* ── HERO ── */}
//       <section className="ap-hero">
//         <div className="ap-hero-inner">
//           <div>
//             <div className="ap-badge"><span className="ap-badge-dot"/> {user?.username ? `${user.username}'s` : "Employer"} Dashboard</div>
//             <h1 className="ap-hero-h">Posted <em>Jobs</em> &amp;<br/>Applicants</h1>
//             <p className="ap-hero-sub">Manage listings, schedule aptitude tests &amp; review every applicant in one place.</p>
//           </div>
//           <Link to="/post-job" className="ap-post-btn">
//             <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
//             Post a New Job
//           </Link>
//         </div>
//       </section>

//       {/* ── STATS ── */}
//       {!loading && jobs.length > 0 && (
//         <div className="ap-stats">
//           {[
//             {ic:"💼",n:totalJobs,l:"Active Listings",c:"#60a5fa"},
//             {ic:"👥",n:"—",l:"Total Applicants",c:"#f5a623"},
//           ].map((s,i)=>(
//             <div className="ap-stat" key={i}>
//               <span className="ap-stat-ic">{s.ic}</span>
//               <div><div className="ap-stat-n" style={{color:s.c}}>{s.n}</div><div className="ap-stat-l">{s.l}</div></div>
//             </div>
//           ))}
//         </div>
//       )}

//       {/* ── JOBS LIST ── */}
//       <div className="ap-main">
//         {loading ? (
//           <div className="ap-center">
//             <span className="spin-teal"/>
//             <span style={{color:"var(--muted)",fontSize:14}}>Loading your jobs…</span>
//           </div>
//         ) : error ? (
//           <div className="ap-center"><span style={{color:"var(--red)",fontSize:14}}>Error: {error}</span></div>
//         ) : jobs.length === 0 ? (
//           <div className="ap-empty">
//             <div className="ap-empty-ic">📋</div>
//             <div className="ap-empty-h">No jobs posted yet</div>
//             <p className="ap-empty-p">Post your first job to start receiving applications.</p>
//             <Link to="/post-job" className="ap-post-btn">+ Post a Job</Link>
//           </div>
//         ) : (
//           jobs.map((job, i) => (
//             <JobCard key={job.id} job={job} index={i} onOpenApplicant={openApplicant}/>
//           ))
//         )}
//       </div>

//     </div>

//     {/* ── APPLICANT MODAL ── */}
//     {selected && (
//       <ApplicantModal
//         applicant={selected}
//         onClose={()=>setSelected(null)}
//         onStatusUpdate={(id, newStatus) => { updateFn && updateFn(id, newStatus); setSelected(null); }}
//       />
//     )}
//   </>);
// };

// export default Applied;












// import React, { useEffect, useState, useRef } from "react";
// import axios from "axios";
// import { Link } from "react-router-dom";

// const BASE = "http://127.0.0.1:8000";

// const STATUS_CFG = {
//   applied:     { label: "Applied",     color: "#60a5fa", bg: "rgba(96,165,250,0.1)",  border: "rgba(96,165,250,0.22)"  },
//   interviewed: { label: "Interviewed", color: "#f5a623", bg: "rgba(245,166,35,0.1)",  border: "rgba(245,166,35,0.22)"  },
//   hired:       { label: "Hired",       color: "#0fd4c0", bg: "rgba(15,212,192,0.1)",  border: "rgba(15,212,192,0.22)"  },
//   rejected:    { label: "Rejected",    color: "#f87171", bg: "rgba(248,113,113,0.1)", border: "rgba(248,113,113,0.22)" },
// };
// const getS  = (s="") => STATUS_CFG[(s||"").toLowerCase()] || STATUS_CFG.applied;
// const GRADS = [
//   ["#0fd4c0","#0891b2"],["#f5a623","#ea580c"],["#818cf8","#6d28d9"],
//   ["#f472b6","#db2777"],["#34d399","#059669"],["#60a5fa","#2563eb"],
// ];
// const grad     = (i) => `linear-gradient(135deg,${GRADS[i%GRADS.length][0]},${GRADS[i%GRADS.length][1]})`;
// const initials = (s="") => s.split(" ").slice(0,2).map(w=>w[0]?.toUpperCase()).join("")||"?";
// const fmt      = (d) => { try { return new Date(d).toLocaleDateString("en-IN",{day:"numeric",month:"short",year:"numeric"}); } catch { return d||"—"; }};

// /* ─────────────────────────────────────────
//    ATS SCORE BAR
// ───────────────────────────────────────── */
// const ScoreBar = ({score}) => {
//   const pct   = Math.min(100, Math.max(0, score || 0));
//   const color = pct >= 75 ? "#0fd4c0" : pct >= 50 ? "#f5a623" : "#f87171";
//   return (
//     <div className="ap-score-wrap">
//       <div className="ap-score-bar"><div className="ap-score-fill" style={{width:`${pct}%`, background:color}}/></div>
//       <span className="ap-score-num" style={{color}}>{pct}%</span>
//     </div>
//   );
// };

// /* ─────────────────────────────────────────
//    APPLICANT DETAIL MODAL
// ───────────────────────────────────────── */
// const ApplicantModal = ({ applicant, onClose, onStatusUpdate }) => {
//   const [status,     setStatus]    = useState("");
//   const [submitting, setSubmitting] = useState(false);
//   const [success,    setSuccess]   = useState(false);

//   const fileUrl = applicant.file
//     ? (applicant.file.startsWith("http") ? applicant.file : `${BASE}${applicant.file}`)
//     : applicant.resume_url
//     ? (applicant.resume_url.startsWith("http") ? applicant.resume_url : `${BASE}${applicant.resume_url}`)
//     : null;
//   const appliedDate = applicant.appliedAt ? fmt(applicant.appliedAt) : "—";
//   const skillsList  = applicant.skills ? applicant.skills.split(",").map(s=>s.trim()).filter(Boolean) : [];

//   const handleUpdate = async () => {
//     if (!status) return;
//     setSubmitting(true);
//     try {
//       await axios.patch(`${BASE}/applications/api/update-status/${applicant.id}/`, { status });
//       setSuccess(true);
//       setTimeout(() => { onStatusUpdate(applicant.id, status); onClose(); }, 1200);
//     } catch(e) { console.error(e); }
//     finally { setSubmitting(false); }
//   };

//   return (<>
//     <div className="md-overlay" onClick={onClose}/>
//     <div className="md-shell">
//       <div className="md-accent"/>

//       {/* Header */}
//       <div className="md-head">
//         <div className="md-avatar">{initials(applicant.name||"A")}</div>
//         <div className="md-head-info">
//           <h2 className="md-name">{applicant.name||"Applicant"}</h2>
//           <a href={`mailto:${applicant.email}`} className="md-email">✉ {applicant.email}</a>
//           {applicant.contact && <div className="md-contact">📞 {applicant.contact}</div>}
//           <div className="md-date">Applied {appliedDate}</div>
//           {skillsList.length > 0 && (
//             <div className="md-skills">{skillsList.map(sk=><span key={sk} className="md-skill">{sk}</span>)}</div>
//           )}
//           {applicant["Final Score"] !== undefined && (
//             <div className="md-ats-row">
//               <span className="md-ats-lbl">ATS Score</span>
//               <ScoreBar score={applicant["Final Score"]}/>
//             </div>
//           )}
//           <div className="md-cur-status" style={{color:getS(applicant.status).color,background:getS(applicant.status).bg,border:`1px solid ${getS(applicant.status).border}`}}>
//             {getS(applicant.status).label}
//           </div>
//         </div>
//         <button className="md-close" onClick={onClose}>✕</button>
//       </div>

//       {/* Resume */}
//       <div className="md-body">
//         <div className="md-section-lbl">Resume / CV</div>
//         {fileUrl ? (
//           <div className="md-resume-frame">
//             <iframe src={fileUrl} title="Resume" style={{width:"100%",height:"100%",border:"none"}}/>
//           </div>
//         ) : (
//           <div className="md-no-resume">📄 No resume uploaded</div>
//         )}
//       </div>

//       {/* Status update footer */}
//       <div className="md-foot">
//         {success ? (
//           <div className="md-success">✓ Status updated successfully!</div>
//         ) : (<>
//           <div className="md-foot-lbl">Update Status</div>
//           <div className="md-foot-row">
//             <div className="md-chips">
//               {["interviewed","hired","rejected"].map(s => {
//                 const cfg = STATUS_CFG[s];
//                 return (
//                   <button key={s} className={`md-chip${status===s?" on":""}`}
//                     style={status===s?{color:cfg.color,background:cfg.bg,borderColor:cfg.border}:{}}
//                     onClick={()=>setStatus(s)}>
//                     {cfg.label}
//                   </button>
//                 );
//               })}
//             </div>
//             <button className="md-save" onClick={handleUpdate} disabled={!status||submitting}>
//               {submitting ? <><span className="spin"/>Saving…</> : <>Update ✓</>}
//             </button>
//           </div>
//         </>)}
//       </div>
//     </div>
//   </>);
// };

// /* ─────────────────────────────────────────
//    APTITUDE TEST PANEL (inline under job)
// ───────────────────────────────────────── */
// const AptitudePanel = ({ jobId, existingTest, onTestCreated }) => {
//   const [open,      setOpen]      = useState(false);
//   const [file,      setFile]      = useState(null);
//   const [duration,  setDuration]  = useState("");
//   const [startTime, setStartTime] = useState("");
//   const [dragOver,  setDragOver]  = useState(false);
//   const [status,    setStatus]    = useState(null);
//   const [errMsg,    setErrMsg]    = useState("");
//   const fileRef = useRef();

//   const handleSubmit = async () => {
//     if (!file || !duration || !startTime) { setErrMsg("Fill all fields and upload a file."); setStatus("error"); return; }
//     setStatus("saving"); setErrMsg("");
//     const fd = new FormData();
//     fd.append("mcq_file", file);
//     fd.append("duration_min", duration);
//     fd.append("start_time", startTime);
//     try {
//       const res = await axios.post(`${BASE}/jobs/api/jobs/${jobId}/aptitude-test/create/`, fd, { headers:{"Content-Type":"multipart/form-data"} });
//       setStatus("success");
//       onTestCreated(res.data);
//       setTimeout(()=>setOpen(false), 1600);
//     } catch(e) { setErrMsg(e?.response?.data?.error||"Failed."); setStatus("error"); }
//   };

//   if (existingTest) return (
//     <div className="at-existing">
//       <div className="at-ex-left">
//         <div className="at-ex-icon">✓</div>
//         <div>
//           <div className="at-ex-title">Aptitude Test Active</div>
//           <div className="at-ex-meta">
//             {existingTest.duration_min}min · {new Date(existingTest.start_time).toLocaleString("en-IN",{day:"numeric",month:"short",year:"numeric",hour:"2-digit",minute:"2-digit"})}
//           </div>
//         </div>
//       </div>
//       <span className="at-live-badge">● Live</span>
//     </div>
//   );

//   return (
//     <div>
//       {!open ? (
//         <button className="at-create-btn" onClick={()=>setOpen(true)}>
//           + Create Aptitude Test
//         </button>
//       ) : (
//         <div className="at-panel">
//           <div className="at-panel-hd">
//             <span>📋 Aptitude Test Setup</span>
//             <button className="at-panel-x" onClick={()=>{setOpen(false);setStatus(null);setFile(null);}}>✕</button>
//           </div>
//           <div className="at-panel-body">
//             <div className="at-row2">
//               <div className="at-field">
//                 <label className="at-lbl">Start Date & Time</label>
//                 <input type="datetime-local" className="at-input" value={startTime} onChange={e=>setStartTime(e.target.value)}/>
//               </div>
//               <div className="at-field">
//                 <label className="at-lbl">Duration (minutes)</label>
//                 <input type="number" min="1" className="at-input" placeholder="e.g. 30" value={duration} onChange={e=>setDuration(e.target.value)}/>
//               </div>
//             </div>
//             <label className="at-lbl">MCQ File <span style={{color:"rgba(107,127,163,.5)",fontWeight:300}}>(JSON, PDF, DOCX, CSV accepted)</span></label>
//             <div className={`at-drop${dragOver?" drag":""}${file?" has":""}` }
//               onClick={()=>!file&&fileRef.current?.click()}
//               onDragOver={e=>{e.preventDefault();setDragOver(true)}}
//               onDragLeave={()=>setDragOver(false)}
//               onDrop={e=>{e.preventDefault();setDragOver(false);const f=e.dataTransfer.files[0];if(f)setFile(f);}}>
//               <input ref={fileRef} type="file" hidden accept=".json,.pdf,.doc,.docx,.xlsx,.csv,.txt" onChange={e=>setFile(e.target.files[0])}/>
//               {file ? (
//                 <div className="at-file-row">
//                   <span className="at-file-ic">📄</span>
//                   <div><div className="at-file-name">{file.name}</div><div className="at-file-sz">{(file.size/1024).toFixed(1)} KB</div></div>
//                   <button className="at-file-rm" onClick={e=>{e.stopPropagation();setFile(null);}}>✕</button>
//                 </div>
//               ) : (
//                 <div style={{textAlign:"center"}}>
//                   <div style={{fontSize:24,marginBottom:6}}>⬆</div>
//                   <div className="at-drop-title">Drop file or <span style={{color:"var(--teal)"}}>browse</span></div>
//                   <div className="at-drop-hint">JSON · PDF · DOCX · CSV</div>
//                 </div>
//               )}
//             </div>
//             {status==="error"   && <div className="at-msg err">⚠ {errMsg}</div>}
//             {status==="success" && <div className="at-msg ok">✓ Aptitude test created!</div>}
//             <div className="at-actions">
//               <button className="at-cancel-btn" onClick={()=>{setOpen(false);setStatus(null);setFile(null);}}>Cancel</button>
//               <button className="at-save-btn" onClick={handleSubmit} disabled={status==="saving"||status==="success"}>
//                 {status==="saving"?<><span className="spin"/>Saving…</>:"✓ Create Test"}
//               </button>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// /* ─────────────────────────────────────────
//    JOB CARD (expandable)
// ───────────────────────────────────────── */
// const JobCard = ({ job, index, onOpenApplicant }) => {
//   const [expanded,   setExpanded]  = useState(false);
//   const [applicants, setApplicants]= useState([]);
//   const [loading,    setLoading]   = useState(false);
//   const [fetched,    setFetched]   = useState(false);
//   const [atsLoading, setAtsLoading]= useState(false);
//   const [countCache, setCountCache]= useState(job.applicant_count ?? null);
//   const [testData,   setTestData]  = useState(job.has_test ? { exists:true, duration_min:"?", start_time:new Date().toISOString() } : null);

//   const toggle = async () => {
//     if (!expanded && !fetched) {
//       setLoading(true);
//       try {
//         const res = await axios.get(`${BASE}/applications/api/applied/${job.id}/`);
//         setApplicants(res.data);
//         setCountCache(res.data.length);
//         setFetched(true);
//       } catch(e) { console.error(e); }
//       finally { setLoading(false); }
//     }
//     setExpanded(p=>!p);
//   };

//   const runATS = async (e) => {
//     e.stopPropagation();
//     if (!fetched || applicants.length === 0) { alert("Click 'View Applicants' first."); return; }
//     setAtsLoading(true);
//     try {
//       const res = await axios.post(`${BASE}/applications/api/ats-ranking/`, { job_id: job.id, applicants });
//       const ranked = res.data;
//       const merged = ranked.map(r => {
//         const orig = applicants.find(a => a.name===r.Candidate || (a.file||"").includes(r.Candidate));
//         return orig ? {...orig,...r} : r;
//       }).sort((a,b)=>b["Final Score"]-a["Final Score"]);
//       setApplicants(merged);
//     } catch(e) { alert("ATS failed: "+(e.response?.data?.error||e.message)); }
//     finally { setAtsLoading(false); }
//   };

//   const updateLocalStatus = (id, newStatus) => {
//     setApplicants(prev => prev.map(a => a.id===id ? {...a, status:newStatus} : a));
//   };

//   return (
//     <div className={`jc-card${expanded?" open":""}`} style={{animationDelay:`${index*0.06}s`}}>
//       {/* Header row */}
//       <div className="jc-header" onClick={toggle}>
//         <div className="jc-logo" style={{background:grad(index)}}>{initials(job.title||"J")}</div>
//         <div className="jc-info">
//           <div className="jc-title-row">
//             <h3 className="jc-title">{job.title}</h3>
//             {job.has_test && <span className="jc-test-badge">✓ Test Active</span>}
//           </div>
//           <p className="jc-desc">{(job.description||"").substring(0,90)}{(job.description||"").length>90?"…":""}</p>
//           <div className="jc-meta">
//             {job.type     && <span className="jc-pill">💼 {job.type}</span>}
//             {job.location && <span className="jc-pill">📍 {job.location}</span>}
//             {countCache !== null && <span className="jc-pill teal">{fetched ? applicants.length : countCache} applicant{(fetched ? applicants.length : countCache) !== 1 ? "s" : ""}</span>}
//           </div>
//         </div>
//         <div className="jc-actions" onClick={e=>e.stopPropagation()}>
//           <button className="jc-ats-btn" onClick={runATS} disabled={atsLoading} title="Run ATS Ranking">
//             {atsLoading ? <><span className="spin"/>Running…</> : "⚡ ATS Rank"}
//           </button>
//         </div>
//         <div className="jc-toggle">
//           {loading ? <span className="spin-teal"/> : <>
//             <span>{expanded?"Hide":"View Applicants"}</span>
//             <svg className={`jc-chev${expanded?" open":""}`} width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="6 9 12 15 18 9"/></svg>
//           </>}
//         </div>
//       </div>

//       {/* Expanded panel */}
//       {expanded && (
//         <div className="jc-panel">
//           {/* Aptitude section */}
//           <div className="jc-sect-lbl">Aptitude Test</div>
//           <AptitudePanel jobId={job.id} existingTest={testData} onTestCreated={d=>setTestData({exists:true,...d})}/>

//           {/* Applicants section */}
//           <div className="jc-sect-lbl" style={{marginTop:22}}>
//             Applicants {fetched && <span className="jc-count">{applicants.length}</span>}
//           </div>

//           {applicants.length === 0 ? (
//             <div className="jc-empty">👤 No applicants yet for this role.</div>
//           ) : (
//             <div className="jc-app-grid">
//               {applicants.map((ap, i) => {
//                 const st = getS(ap.status);
//                 const skillsList = ap.skills ? ap.skills.split(",").map(s=>s.trim()).filter(Boolean) : [];
//                 return (
//                   <div key={ap.id||i} className="jc-app-card" style={{animationDelay:`${i*0.04}s`}}>
//                     {/* Top: avatar + name + status */}
//                     <div className="jc-app-top">
//                       <div className="jc-app-av" style={{background:grad(i+3)}}>{initials(ap.name||"A")}</div>
//                       <div className="jc-app-head">
//                         <div className="jc-app-name">{ap.name||"Applicant"}</div>
//                         <div className="jc-app-status" style={{color:st.color,background:st.bg,border:`1px solid ${st.border}`}}>{st.label}</div>
//                       </div>
//                     </div>

//                     {/* ATS score if available */}
//                     {ap["Final Score"]!==undefined && <ScoreBar score={ap["Final Score"]}/>}

//                     {/* Contact info */}
//                     <div className="jc-app-meta">
//                       <div className="jc-meta-row"><span>✉</span><span className="jc-meta-val">{ap.email||"—"}</span></div>
//                       {ap.contact && <div className="jc-meta-row"><span>📞</span><span className="jc-meta-val">{ap.contact}</span></div>}
//                       {ap.appliedAt && <div className="jc-meta-row"><span>📅</span><span className="jc-meta-val">Applied {fmt(ap.appliedAt)}</span></div>}
//                     </div>

//                     {/* Skills */}
//                     {skillsList.length > 0 && (
//                       <div className="jc-skills">
//                         {skillsList.slice(0,3).map(sk=><span key={sk} className="jc-skill">{sk}</span>)}
//                         {skillsList.length>3 && <span className="jc-skill more">+{skillsList.length-3}</span>}
//                       </div>
//                     )}

//                     {/* Review button */}
//                     <button className="jc-review-btn" onClick={()=>onOpenApplicant(ap, updateLocalStatus)}>
//                       Review Applicant →
//                     </button>
//                   </div>
//                 );
//               })}
//             </div>
//           )}
//         </div>
//       )}
//     </div>
//   );
// };

// /* ─────────────────────────────────────────
//    MAIN — Applied (Employer Dashboard)
// ───────────────────────────────────────── */
// const Applied = () => {
//   const [jobs,      setJobs]      = useState([]);
//   const [loading,   setLoading]   = useState(true);
//   const [error,     setError]     = useState(null);
//   const [selected,  setSelected]  = useState(null);
//   const [updateFn,  setUpdateFn]  = useState(null);

//   const user = JSON.parse(localStorage.getItem("user"));

//   useEffect(()=>{
//     (async()=>{
//       try {
//         const res = await axios.get(`${BASE}/jobs/api/employer-jobs`, { params:{ username:user?.username } });
//         setJobs(res.data);
//       } catch(e) { setError(e.message); }
//       finally { setLoading(false); }
//     })();
//   },[]);

//   const openApplicant = (ap, updateLocal) => {
//     setSelected(ap);
//     setUpdateFn(()=>updateLocal);
//   };

//   const totalJobs = jobs.length;

//   return (<>
//     <style>{`
//       @import url('https://fonts.googleapis.com/css2?family=Sora:wght@300;400;500;600;700;800&family=DM+Sans:ital,wght@0,300;0,400;0,500;1,400&display=swap');
//       *,*::before,*::after{box-sizing:border-box;margin:0;padding:0}
//       :root{
//         --bg:#080e1a; --surf:#0d1526; --card:#111e35; --card2:#162038;
//         --border:rgba(255,255,255,0.06); --border2:rgba(255,255,255,0.1);
//         --teal:#0fd4c0; --amber:#f5a623; --blue:#60a5fa;
//         --red:#f87171; --violet:#818cf8;
//         --white:#e8efff; --muted:#6b7fa3; --soft:#9aaabf;
//         --teal-d:rgba(15,212,192,0.1); --amber-d:rgba(245,166,35,0.1);
//         --blue-d:rgba(96,165,250,0.1); --red-d:rgba(248,113,113,0.1);
//         --violet-d:rgba(129,140,248,0.1);
//       }

//       /* ROOT */
//       .ap-root{background:var(--bg);font-family:'DM Sans',sans-serif;color:var(--white);min-height:100vh}

//       /* ── HERO ── */
//       .ap-hero{position:relative;overflow:hidden;padding:96px 56px 44px;border-bottom:1px solid var(--border)}
//       .ap-hero::before{content:'';position:absolute;inset:0;background:radial-gradient(ellipse 70% 60% at 50% -10%,rgba(15,212,192,0.07) 0%,transparent 65%);pointer-events:none}
//       .ap-hero::after{content:'';position:absolute;inset:0;background-image:radial-gradient(rgba(255,255,255,0.03) 1px,transparent 1px);background-size:28px 28px;pointer-events:none}
//       .ap-hero-inner{max-width:1180px;margin:0 auto;display:flex;align-items:flex-end;justify-content:space-between;gap:24px;flex-wrap:wrap;position:relative;z-index:1;opacity:0;animation:fadeUp .6s cubic-bezier(.22,1,.36,1) .08s forwards}
//       @keyframes fadeUp{from{opacity:0;transform:translateY(16px)}to{opacity:1;transform:translateY(0)}}
//       .ap-badge{display:inline-flex;align-items:center;gap:7px;font-size:11px;font-weight:700;letter-spacing:1.5px;text-transform:uppercase;color:var(--teal);margin-bottom:14px}
//       .ap-badge-dot{width:5px;height:5px;border-radius:50%;background:var(--teal);box-shadow:0 0 8px var(--teal);animation:pulse 2s ease-in-out infinite}
//       @keyframes pulse{0%,100%{opacity:1;transform:scale(1)}50%{opacity:.3;transform:scale(.6)}}
//       .ap-hero-h{font-family:'Sora',sans-serif;font-size:clamp(28px,4vw,46px);font-weight:800;line-height:1.1;letter-spacing:-1.5px;margin-bottom:10px}
//       .ap-hero-h em{font-style:italic;color:var(--teal)}
//       .ap-hero-sub{font-size:15px;color:var(--muted);font-weight:300;line-height:1.65;max-width:420px}
//       .ap-post-btn{display:inline-flex;align-items:center;gap:8px;padding:11px 22px;background:var(--teal);color:#080e1a;font-family:'Sora',sans-serif;font-size:13px;font-weight:700;border-radius:10px;text-decoration:none;box-shadow:0 4px 20px rgba(15,212,192,0.3);transition:all .18s;white-space:nowrap;flex-shrink:0}
//       .ap-post-btn:hover{transform:translateY(-2px);box-shadow:0 8px 28px rgba(15,212,192,0.4)}

//       /* ── STAT STRIP ── */
//       .ap-stats{max-width:1180px;margin:0 auto;padding:24px 56px;display:flex;gap:12px;flex-wrap:wrap}
//       .ap-stat{padding:16px 20px;background:var(--card);border:1px solid var(--border);border-radius:13px;display:flex;align-items:center;gap:12px;flex:1;min-width:150px;transition:border-color .2s}
//       .ap-stat:hover{border-color:var(--border2)}
//       .ap-stat-ic{font-size:20px}
//       .ap-stat-n{font-family:'Sora',sans-serif;font-size:24px;font-weight:800;line-height:1;margin-bottom:2px}
//       .ap-stat-l{font-size:11.5px;color:var(--muted)}

//       /* ── MAIN WRAP ── */
//       .ap-main{max-width:1180px;margin:0 auto;padding:4px 56px 80px}

//       /* ── JOB CARD ── */
//       .jc-card{background:var(--card);border:1px solid var(--border);border-radius:18px;margin-bottom:12px;overflow:hidden;opacity:0;animation:fadeUp .5s cubic-bezier(.22,1,.36,1) forwards;transition:border-color .2s}
//       .jc-card:hover{border-color:var(--border2)}
//       .jc-card.open{border-color:rgba(15,212,192,0.2)}
//       .jc-header{display:flex;align-items:center;gap:16px;padding:20px 24px;cursor:pointer;transition:background .15s}
//       .jc-header:hover{background:rgba(255,255,255,0.02)}
//       .jc-logo{width:48px;height:48px;border-radius:12px;display:flex;align-items:center;justify-content:center;font-family:'Sora',sans-serif;font-size:14px;font-weight:800;color:#fff;flex-shrink:0;box-shadow:0 4px 16px rgba(0,0,0,.4)}
//       .jc-info{flex:1;min-width:0}
//       .jc-title-row{display:flex;align-items:center;gap:8px;margin-bottom:4px;flex-wrap:wrap}
//       .jc-title{font-family:'Sora',sans-serif;font-size:16px;font-weight:700;color:var(--white);letter-spacing:-.3px}
//       .jc-test-badge{display:inline-flex;align-items:center;gap:4px;padding:2px 8px;border-radius:6px;background:var(--teal-d);border:1px solid rgba(15,212,192,0.2);font-size:10px;font-weight:700;color:var(--teal)}
//       .jc-desc{font-size:13px;color:var(--muted);font-weight:300;margin-bottom:8px;line-height:1.5}
//       .jc-meta{display:flex;gap:6px;flex-wrap:wrap}
//       .jc-pill{padding:3px 9px;background:rgba(255,255,255,0.04);border:1px solid var(--border);border-radius:6px;font-size:11px;color:var(--muted)}
//       .jc-pill.teal{background:var(--teal-d);border-color:rgba(15,212,192,0.2);color:var(--teal)}

//       /* actions area */
//       .jc-actions{display:flex;align-items:center;gap:8px;flex-shrink:0}
//       .jc-ats-btn{display:inline-flex;align-items:center;gap:6px;padding:8px 14px;background:var(--violet-d);border:1px solid rgba(129,140,248,0.22);border-radius:9px;font-family:'Sora',sans-serif;font-size:12.5px;font-weight:700;color:var(--violet);cursor:pointer;transition:all .15s;white-space:nowrap}
//       .jc-ats-btn:hover:not(:disabled){background:rgba(129,140,248,0.16);border-color:rgba(129,140,248,0.4);transform:translateY(-1px)}
//       .jc-ats-btn:disabled{opacity:.5;cursor:not-allowed}
//       .jc-toggle{display:flex;align-items:center;gap:7px;padding:8px 14px;border:1px solid var(--border);border-radius:9px;font-size:12.5px;font-weight:500;color:var(--muted);flex-shrink:0;cursor:pointer;transition:all .15s;user-select:none}
//       .jc-card.open .jc-toggle,.jc-header:hover .jc-toggle{border-color:rgba(15,212,192,0.3);color:var(--teal);background:var(--teal-d)}
//       .jc-chev{transition:transform .25s ease}
//       .jc-chev.open{transform:rotate(180deg)}

//       /* expanded panel */
//       .jc-panel{border-top:1px solid var(--border);padding:22px 24px 26px;background:rgba(255,255,255,0.015);animation:fadeUp .3s ease both}
//       .jc-sect-lbl{font-size:10px;font-weight:700;letter-spacing:1.5px;text-transform:uppercase;color:var(--muted);margin-bottom:12px;display:flex;align-items:center;gap:8px}
//       .jc-count{padding:1px 8px;border-radius:6px;background:var(--teal-d);border:1px solid rgba(15,212,192,0.18);color:var(--teal);font-size:10px;letter-spacing:0;font-weight:600}
//       .jc-empty{padding:20px;text-align:center;font-size:13.5px;color:var(--muted);border:1px dashed var(--border);border-radius:12px}

//       /* applicant grid */
//       .jc-app-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(270px,1fr));gap:10px}
//       .jc-app-card{background:var(--bg);border:1px solid var(--border);border-radius:14px;padding:16px;display:flex;flex-direction:column;gap:10px;opacity:0;animation:fadeUp .35s cubic-bezier(.22,1,.36,1) forwards;transition:border-color .2s,transform .2s}
//       .jc-app-card:hover{border-color:rgba(15,212,192,0.18);transform:translateY(-2px)}
//       .jc-app-top{display:flex;align-items:center;gap:10px}
//       .jc-app-av{width:40px;height:40px;border-radius:10px;display:flex;align-items:center;justify-content:center;font-family:'Sora',sans-serif;font-size:13px;font-weight:800;color:#fff;flex-shrink:0}
//       .jc-app-head{flex:1;min-width:0}
//       .jc-app-name{font-size:14px;font-weight:600;color:var(--white);white-space:nowrap;overflow:hidden;text-overflow:ellipsis;margin-bottom:4px}
//       .jc-app-status{display:inline-block;padding:2px 8px;border-radius:6px;font-size:10.5px;font-weight:700}
//       .jc-app-meta{display:flex;flex-direction:column;gap:5px}
//       .jc-meta-row{display:flex;align-items:center;gap:7px;font-size:12px;color:var(--muted)}
//       .jc-meta-val{white-space:nowrap;overflow:hidden;text-overflow:ellipsis;flex:1}
//       .jc-skills{display:flex;flex-wrap:wrap;gap:4px}
//       .jc-skill{padding:2px 8px;border-radius:6px;background:var(--violet-d);border:1px solid rgba(129,140,248,0.18);font-size:10.5px;color:var(--violet);font-weight:500}
//       .jc-skill.more{background:rgba(255,255,255,0.04);border-color:var(--border);color:var(--muted)}
//       .jc-review-btn{display:flex;align-items:center;justify-content:center;padding:8px;background:var(--teal-d);border:1px solid rgba(15,212,192,0.2);border-radius:9px;font-family:'Sora',sans-serif;font-size:12.5px;font-weight:700;color:var(--teal);cursor:pointer;transition:all .15s;margin-top:2px}
//       .jc-review-btn:hover{background:rgba(15,212,192,0.16);border-color:rgba(15,212,192,0.35)}

//       /* ── ATS SCORE ── */
//       .ap-score-wrap{display:flex;align-items:center;gap:8px}
//       .ap-score-bar{flex:1;height:4px;background:rgba(255,255,255,0.06);border-radius:100px;overflow:hidden}
//       .ap-score-fill{height:100%;border-radius:100px;transition:width .6s cubic-bezier(.22,1,.36,1)}
//       .ap-score-num{font-family:'Sora',sans-serif;font-size:12px;font-weight:700;flex-shrink:0}

//       /* ── APTITUDE PANEL ── */
//       .at-create-btn{display:inline-flex;align-items:center;gap:7px;padding:9px 16px;background:var(--amber-d);border:1px solid rgba(245,166,35,0.22);border-radius:9px;font-family:'Sora',sans-serif;font-size:13px;font-weight:700;color:var(--amber);cursor:pointer;transition:all .15s}
//       .at-create-btn:hover{background:rgba(245,166,35,0.16);border-color:rgba(245,166,35,0.4)}
//       .at-existing{display:flex;align-items:center;justify-content:space-between;padding:13px 16px;background:var(--teal-d);border:1px solid rgba(15,212,192,0.22);border-radius:12px}
//       .at-ex-left{display:flex;align-items:center;gap:12px}
//       .at-ex-icon{width:32px;height:32px;border-radius:8px;background:rgba(15,212,192,0.15);border:1px solid rgba(15,212,192,0.25);display:flex;align-items:center;justify-content:center;font-size:13px;color:var(--teal);font-weight:700}
//       .at-ex-title{font-size:13px;font-weight:600;color:var(--white);margin-bottom:2px}
//       .at-ex-meta{font-size:11.5px;color:var(--muted)}
//       .at-live-badge{padding:3px 10px;border-radius:100px;background:rgba(34,197,94,0.1);border:1px solid rgba(34,197,94,0.2);font-size:10.5px;font-weight:700;color:#22c55e}
//       .at-panel{background:rgba(255,255,255,0.03);border:1px solid var(--border);border-radius:14px;overflow:hidden;animation:fadeUp .3s ease both}
//       .at-panel-hd{display:flex;align-items:center;justify-content:space-between;padding:12px 16px;border-bottom:1px solid var(--border);background:rgba(245,166,35,0.04);font-family:'Sora',sans-serif;font-size:13px;font-weight:700;color:var(--white)}
//       .at-panel-x{background:none;border:none;color:var(--muted);cursor:pointer;font-size:15px;transition:color .15s}
//       .at-panel-x:hover{color:var(--red)}
//       .at-panel-body{padding:16px;display:flex;flex-direction:column;gap:12px}
//       .at-row2{display:grid;grid-template-columns:1fr 1fr;gap:12px}
//       .at-field{display:flex;flex-direction:column;gap:5px}
//       .at-lbl{font-size:10.5px;font-weight:700;letter-spacing:.8px;text-transform:uppercase;color:var(--muted)}
//       .at-input{padding:9px 12px;background:rgba(255,255,255,0.04);border:1.5px solid var(--border);border-radius:9px;font-family:'DM Sans',sans-serif;font-size:13.5px;color:var(--white);outline:none;transition:border-color .2s;color-scheme:dark}
//       .at-input:focus{border-color:rgba(245,166,35,0.5);box-shadow:0 0 0 3px rgba(245,166,35,0.08)}
//       .at-drop{border:1.5px dashed rgba(255,255,255,0.08);border-radius:11px;padding:20px;cursor:pointer;transition:border-color .2s,background .2s;background:rgba(255,255,255,0.02)}
//       .at-drop:hover,.at-drop.drag{border-color:rgba(15,212,192,0.3);background:rgba(15,212,192,0.04)}
//       .at-drop.has{border-style:solid;border-color:rgba(15,212,192,0.25);cursor:default}
//       .at-drop-title{font-size:13px;color:var(--muted);margin-bottom:4px}
//       .at-drop-hint{font-size:11px;color:rgba(107,127,163,0.4)}
//       .at-file-row{display:flex;align-items:center;gap:10px}
//       .at-file-ic{font-size:20px}
//       .at-file-name{font-size:13px;font-weight:500;color:var(--white);margin-bottom:2px}
//       .at-file-sz{font-size:11px;color:var(--muted)}
//       .at-file-rm{margin-left:auto;background:none;border:none;color:var(--red);font-size:14px;cursor:pointer;opacity:.7;transition:opacity .15s}
//       .at-file-rm:hover{opacity:1}
//       .at-msg{display:flex;align-items:center;gap:8px;padding:9px 12px;border-radius:9px;font-size:12.5px;font-weight:500}
//       .at-msg.ok{background:var(--teal-d);border:1px solid rgba(15,212,192,0.22);color:var(--teal)}
//       .at-msg.err{background:var(--red-d);border:1px solid rgba(248,113,113,0.2);color:var(--red)}
//       .at-actions{display:flex;justify-content:flex-end;gap:8px}
//       .at-cancel-btn{padding:8px 16px;background:transparent;border:1px solid var(--border);border-radius:9px;font-family:'DM Sans',sans-serif;font-size:13px;color:var(--muted);cursor:pointer;transition:all .15s}
//       .at-cancel-btn:hover{border-color:var(--border2);color:var(--white)}
//       .at-save-btn{display:inline-flex;align-items:center;gap:6px;padding:9px 20px;background:var(--amber);color:#080e1a;font-family:'Sora',sans-serif;font-size:13px;font-weight:700;border:none;border-radius:9px;cursor:pointer;box-shadow:0 4px 16px rgba(245,166,35,0.25);transition:all .15s}
//       .at-save-btn:hover:not(:disabled){transform:translateY(-1px);box-shadow:0 7px 22px rgba(245,166,35,0.38)}
//       .at-save-btn:disabled{opacity:.45;cursor:not-allowed}

//       /* ── APPLICANT MODAL ── */
//       .md-overlay{position:fixed;inset:0;background:rgba(4,8,18,.8);backdrop-filter:blur(8px);z-index:500;animation:bdFade .25s ease both}
//       @keyframes bdFade{from{opacity:0}to{opacity:1}}
//       .md-shell{position:fixed;top:50%;left:50%;transform:translate(-50%,-50%);width:min(660px,95vw);max-height:90vh;overflow-y:auto;background:#0e1a2e;border:1px solid rgba(255,255,255,0.08);border-radius:22px;z-index:501;display:flex;flex-direction:column;animation:mdIn .35s cubic-bezier(.22,1,.36,1) both;scrollbar-width:thin;scrollbar-color:rgba(255,255,255,.05) transparent}
//       @keyframes mdIn{from{opacity:0;transform:translate(-50%,-46%) scale(.95)}to{opacity:1;transform:translate(-50%,-50%) scale(1)}}
//       .md-accent{height:3px;background:linear-gradient(90deg,var(--teal),transparent);flex-shrink:0}
//       .md-head{display:flex;align-items:flex-start;gap:14px;padding:22px 24px 18px;border-bottom:1px solid var(--border)}
//       .md-avatar{width:52px;height:52px;border-radius:13px;background:linear-gradient(135deg,#0fd4c0,#0891b2);display:flex;align-items:center;justify-content:center;font-family:'Sora',sans-serif;font-size:17px;font-weight:800;color:#fff;flex-shrink:0}
//       .md-head-info{flex:1;min-width:0}
//       .md-name{font-family:'Sora',sans-serif;font-size:19px;font-weight:800;color:var(--white);letter-spacing:-.4px;margin-bottom:5px}
//       .md-email{display:block;font-size:12.5px;color:var(--muted);text-decoration:none;margin-bottom:4px;transition:color .15s}
//       .md-email:hover{color:var(--teal)}
//       .md-contact{font-size:12px;color:var(--muted);margin-bottom:4px}
//       .md-date{font-size:11.5px;color:rgba(107,127,163,.6);margin-bottom:8px}
//       .md-skills{display:flex;flex-wrap:wrap;gap:5px;margin-bottom:8px}
//       .md-skill{padding:2px 8px;border-radius:6px;background:var(--violet-d);border:1px solid rgba(129,140,248,.2);font-size:11px;color:var(--violet);font-weight:500}
//       .md-ats-row{display:flex;align-items:center;gap:10px;margin-bottom:8px}
//       .md-ats-lbl{font-size:11px;font-weight:600;letter-spacing:.5px;color:var(--muted);white-space:nowrap;text-transform:uppercase}
//       .md-cur-status{display:inline-block;padding:3px 10px;border-radius:7px;font-size:11px;font-weight:700}
//       .md-close{width:32px;height:32px;border-radius:9px;background:rgba(255,255,255,0.04);border:1px solid var(--border);color:var(--muted);cursor:pointer;display:flex;align-items:center;justify-content:center;flex-shrink:0;font-size:13px;transition:all .15s}
//       .md-close:hover{color:var(--red);background:var(--red-d)}
//       .md-body{padding:18px 24px}
//       .md-section-lbl{font-size:10px;font-weight:700;letter-spacing:1.5px;text-transform:uppercase;color:var(--muted);margin-bottom:10px}
//       .md-resume-frame{border:1px solid var(--border);border-radius:12px;overflow:hidden;height:340px;background:rgba(255,255,255,0.02)}
//       .md-no-resume{display:flex;align-items:center;justify-content:center;gap:8px;height:80px;border:1px dashed var(--border);border-radius:11px;font-size:13px;color:var(--muted)}
//       .md-foot{padding:16px 24px 22px;border-top:1px solid var(--border);background:rgba(255,255,255,0.02)}
//       .md-foot-lbl{font-size:10px;font-weight:700;letter-spacing:1.5px;text-transform:uppercase;color:var(--muted);margin-bottom:11px}
//       .md-foot-row{display:flex;align-items:center;gap:10px;flex-wrap:wrap}
//       .md-chips{display:flex;gap:7px;flex-wrap:wrap}
//       .md-chip{padding:7px 14px;border-radius:9px;font-size:13px;font-weight:600;cursor:pointer;border:1px solid var(--border);background:rgba(255,255,255,0.04);color:var(--muted);transition:all .15s;font-family:'DM Sans',sans-serif}
//       .md-chip:hover{color:var(--white);border-color:var(--border2)}
//       .md-save{display:inline-flex;align-items:center;gap:6px;padding:9px 20px;background:var(--teal);color:#080e1a;font-family:'Sora',sans-serif;font-size:13.5px;font-weight:800;border:none;border-radius:9px;cursor:pointer;box-shadow:0 4px 16px rgba(15,212,192,.25);transition:all .15s;margin-left:auto}
//       .md-save:hover:not(:disabled){transform:translateY(-1px);box-shadow:0 7px 22px rgba(15,212,192,.38)}
//       .md-save:disabled{opacity:.4;cursor:not-allowed}
//       .md-success{display:flex;align-items:center;gap:8px;padding:12px 14px;background:var(--teal-d);border:1px solid rgba(15,212,192,.22);border-radius:10px;font-size:14px;font-weight:500;color:var(--teal);animation:fadeUp .3s ease both}

//       /* ── SPINNERS ── */
//       .spin{display:inline-block;width:12px;height:12px;border:2px solid rgba(255,255,255,.15);border-top-color:currentColor;border-radius:50%;animation:rotate .65s linear infinite}
//       .spin-teal{display:inline-block;width:14px;height:14px;border:2px solid rgba(15,212,192,.2);border-top-color:var(--teal);border-radius:50%;animation:rotate .65s linear infinite}
//       @keyframes rotate{to{transform:rotate(360deg)}}

//       /* ── CENTER / EMPTY ── */
//       .ap-center{display:flex;align-items:center;justify-content:center;min-height:60vh;flex-direction:column;gap:12px}
//       .ap-empty{text-align:center;padding:80px 24px}
//       .ap-empty-ic{font-size:48px;margin-bottom:16px}
//       .ap-empty-h{font-family:'Sora',sans-serif;font-size:20px;font-weight:700;margin-bottom:8px}
//       .ap-empty-p{font-size:14px;color:var(--muted);margin-bottom:26px}

//       @media(max-width:900px){
//         .ap-hero,.ap-stats,.ap-main{padding-left:20px;padding-right:20px}
//         .ap-hero{padding-top:90px}
//         .jc-actions{display:none}
//         .at-row2{grid-template-columns:1fr}
//       }
//       @media(max-width:600px){
//         .jc-app-grid{grid-template-columns:1fr}
//         .md-head{flex-wrap:wrap}
//         .md-foot-row{flex-direction:column;align-items:stretch}
//         .md-save{margin-left:0}
//       }
//     `}</style>

//     <div className="ap-root">

//       {/* ── HERO ── */}
//       <section className="ap-hero">
//         <div className="ap-hero-inner">
//           <div>
//             <div className="ap-badge"><span className="ap-badge-dot"/> {user?.username ? `${user.username}'s` : "Employer"} Dashboard</div>
//             <h1 className="ap-hero-h">Posted <em>Jobs</em> &amp;<br/>Applicants</h1>
//             <p className="ap-hero-sub">Manage listings, schedule aptitude tests &amp; review every applicant in one place.</p>
//           </div>
//           <Link to="/post-job" className="ap-post-btn">
//             <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
//             Post a New Job
//           </Link>
//         </div>
//       </section>

//       {/* ── STATS ── */}
//       {!loading && jobs.length > 0 && (
//         <div className="ap-stats">
//           {[
//             {ic:"💼",n:totalJobs,l:"Active Listings",c:"#60a5fa"},
//             {ic:"👥",n:jobs.reduce((s,j)=>s+(j.applicant_count||0),0),l:"Total Applicants",c:"#f5a623"},
//           ].map((s,i)=>(
//             <div className="ap-stat" key={i}>
//               <span className="ap-stat-ic">{s.ic}</span>
//               <div><div className="ap-stat-n" style={{color:s.c}}>{s.n}</div><div className="ap-stat-l">{s.l}</div></div>
//             </div>
//           ))}
//         </div>
//       )}

//       {/* ── JOBS LIST ── */}
//       <div className="ap-main">
//         {loading ? (
//           <div className="ap-center">
//             <span className="spin-teal"/>
//             <span style={{color:"var(--muted)",fontSize:14}}>Loading your jobs…</span>
//           </div>
//         ) : error ? (
//           <div className="ap-center"><span style={{color:"var(--red)",fontSize:14}}>Error: {error}</span></div>
//         ) : jobs.length === 0 ? (
//           <div className="ap-empty">
//             <div className="ap-empty-ic">📋</div>
//             <div className="ap-empty-h">No jobs posted yet</div>
//             <p className="ap-empty-p">Post your first job to start receiving applications.</p>
//             <Link to="/post-job" className="ap-post-btn">+ Post a Job</Link>
//           </div>
//         ) : (
//           jobs.map((job, i) => (
//             <JobCard key={job.id} job={job} index={i} onOpenApplicant={openApplicant}/>
//           ))
//         )}
//       </div>

//     </div>

//     {/* ── APPLICANT MODAL ── */}
//     {selected && (
//       <ApplicantModal
//         applicant={selected}
//         onClose={()=>setSelected(null)}
//         onStatusUpdate={(id, newStatus) => { updateFn && updateFn(id, newStatus); setSelected(null); }}
//       />
//     )}
//   </>);
// };

// export default Applied;








import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const BASE = "http://127.0.0.1:8000";

const STATUS_CFG = {
  applied:     { label: "Applied",     color: "#60a5fa", bg: "rgba(96,165,250,0.1)",  border: "rgba(96,165,250,0.22)"  },
  interviewed: { label: "Interviewed", color: "#f5a623", bg: "rgba(245,166,35,0.1)",  border: "rgba(245,166,35,0.22)"  },
  hired:       { label: "Hired",       color: "#0fd4c0", bg: "rgba(15,212,192,0.1)",  border: "rgba(15,212,192,0.22)"  },
  rejected:    { label: "Rejected",    color: "#f87171", bg: "rgba(248,113,113,0.1)", border: "rgba(248,113,113,0.22)" },
};
const getS  = (s="") => STATUS_CFG[(s||"").toLowerCase()] || STATUS_CFG.applied;
const GRADS = [
  ["#0fd4c0","#0891b2"],["#f5a623","#ea580c"],["#818cf8","#6d28d9"],
  ["#f472b6","#db2777"],["#34d399","#059669"],["#60a5fa","#2563eb"],
];
const grad     = (i) => `linear-gradient(135deg,${GRADS[i%GRADS.length][0]},${GRADS[i%GRADS.length][1]})`;
const initials = (s="") => s.split(" ").slice(0,2).map(w=>w[0]?.toUpperCase()).join("")||"?";
const fmt      = (d) => { try { return new Date(d).toLocaleDateString("en-IN",{day:"numeric",month:"short",year:"numeric"}); } catch { return d||"—"; }};

/* ─────────────────────────────────────────
   ATS SCORE BAR
───────────────────────────────────────── */
const ScoreBar = ({score}) => {
  const pct   = Math.min(100, Math.max(0, score || 0));
  const color = pct >= 75 ? "#0fd4c0" : pct >= 50 ? "#f5a623" : "#f87171";
  return (
    <div className="ap-score-wrap">
      <div className="ap-score-bar"><div className="ap-score-fill" style={{width:`${pct}%`, background:color}}/></div>
      <span className="ap-score-num" style={{color}}>{pct}%</span>
    </div>
  );
};

/* ─────────────────────────────────────────
   APPLICANT DETAIL MODAL
───────────────────────────────────────── */
const ApplicantModal = ({ applicant, onClose, onStatusUpdate }) => {
  const [status,     setStatus]    = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [success,    setSuccess]   = useState(false);

 const fileUrl = applicant.resume
    ? (applicant.resume.startsWith("http") ? applicant.resume : `${BASE}${applicant.resume}`)
    : applicant.file
    ? (applicant.file.startsWith("http") ? applicant.file : `${BASE}${applicant.file}`)
    : applicant.resume_url
    ? (applicant.resume_url.startsWith("http") ? applicant.resume_url : `${BASE}${applicant.resume_url}`)
    : null;
  const appliedDate = applicant.appliedAt ? fmt(applicant.appliedAt) : "—";
  const skillsList  = applicant.skills ? applicant.skills.split(",").map(s=>s.trim()).filter(Boolean) : [];

  const handleUpdate = async () => {
    if (!status) return;
    setSubmitting(true);
    try {
      await axios.patch(`${BASE}/applications/api/update-status/${applicant.id}/`, { status });
      setSuccess(true);
      setTimeout(() => { onStatusUpdate(applicant.id, status); onClose(); }, 1200);
    } catch(e) { console.error(e); }
    finally { setSubmitting(false); }
  };

  return (<>
    <div className="md-overlay" onClick={onClose}/>
    <div className="md-shell">
      <div className="md-accent"/>

      {/* Header */}
      <div className="md-head">
        <div className="md-avatar">{initials(applicant.name||"A")}</div>
        <div className="md-head-info">
          <h2 className="md-name">{applicant.name||"Applicant"}</h2>
          <a href={`mailto:${applicant.email}`} className="md-email">✉ {applicant.email}</a>
          {applicant.contact && <div className="md-contact">📞 {applicant.contact}</div>}
          <div className="md-date">Applied {appliedDate}</div>
          {skillsList.length > 0 && (
            <div className="md-skills">{skillsList.map(sk=><span key={sk} className="md-skill">{sk}</span>)}</div>
          )}
          {applicant["Final Score"] !== undefined && (
            <div className="md-ats-row">
              <span className="md-ats-lbl">ATS Score</span>
              <ScoreBar score={applicant["Final Score"]}/>
            </div>
          )}
          <div className="md-cur-status" style={{color:getS(applicant.status).color,background:getS(applicant.status).bg,border:`1px solid ${getS(applicant.status).border}`}}>
            {getS(applicant.status).label}
          </div>
        </div>
        <button className="md-close" onClick={onClose}>✕</button>
      </div>

      {/* Resume */}
      <div className="md-body">
        <div className="md-section-lbl">Resume / CV</div>
       {fileUrl ? (
          <div>
            <a
              href={fileUrl}
              target="_blank"
              rel="noreferrer"
              style={{
                display:"inline-flex",alignItems:"center",gap:6,
                marginBottom:10,padding:"7px 16px",
                background:"var(--teal)",color:"#080e1a",
                borderRadius:9,fontSize:13,fontWeight:700,
                textDecoration:"none"
              }}
            >
              📄 Open Resume in New Tab
            </a>
            
          </div>
        ) : (
          <div className="md-no-resume">📄 No resume uploaded</div>
        )}
      </div>

      {/* Status update footer */}
      <div className="md-foot">
        {success ? (
          <div className="md-success">✓ Status updated successfully!</div>
        ) : (<>
          <div className="md-foot-lbl">Update Status</div>
          <div className="md-foot-row">
            <div className="md-chips">
              {["interviewed","hired","rejected"].map(s => {
                const cfg = STATUS_CFG[s];
                return (
                  <button key={s} className={`md-chip${status===s?" on":""}`}
                    style={status===s?{color:cfg.color,background:cfg.bg,borderColor:cfg.border}:{}}
                    onClick={()=>setStatus(s)}>
                    {cfg.label}
                  </button>
                );
              })}
            </div>
            <button className="md-save" onClick={handleUpdate} disabled={!status||submitting}>
              {submitting ? <><span className="spin"/>Saving…</> : <>Update ✓</>}
            </button>
          </div>
        </>)}
      </div>
    </div>
  </>);
};

/* ─────────────────────────────────────────
   APTITUDE TEST PANEL (inline under job)
───────────────────────────────────────── */
const AptitudePanel = ({ jobId, existingTest, onTestCreated }) => {
  const [open,      setOpen]      = useState(false);
  const [file,      setFile]      = useState(null);
  const [duration,  setDuration]  = useState("");
  const [startTime, setStartTime] = useState("");
  const [dragOver,  setDragOver]  = useState(false);
  const [status,    setStatus]    = useState(null);
  const [errMsg,    setErrMsg]    = useState("");
  const fileRef = useRef();

  const handleSubmit = async () => {
    if (!file || !duration || !startTime) { setErrMsg("Fill all fields and upload a file."); setStatus("error"); return; }
    setStatus("saving"); setErrMsg("");
    const fd = new FormData();
    fd.append("mcq_file", file);
    fd.append("duration_min", duration);
    fd.append("start_time", startTime);
    try {
      const res = await axios.post(`${BASE}/jobs/api/jobs/${jobId}/aptitude-test/create/`, fd, { headers:{"Content-Type":"multipart/form-data"} });
      setStatus("success");
      onTestCreated(res.data);
      setTimeout(()=>setOpen(false), 1600);
    } catch(e) { setErrMsg(e?.response?.data?.error||"Failed."); setStatus("error"); }
  };

  if (existingTest) return (
    <div className="at-existing">
      <div className="at-ex-left">
        <div className="at-ex-icon">✓</div>
        <div>
          <div className="at-ex-title">Aptitude Test Active</div>
          <div className="at-ex-meta">
            {existingTest.duration_min}min · {new Date(existingTest.start_time).toLocaleString("en-IN",{day:"numeric",month:"short",year:"numeric",hour:"2-digit",minute:"2-digit"})}
          </div>
        </div>
      </div>
      <span className="at-live-badge">● Live</span>
    </div>
  );

  return (
    <div>
      {!open ? (
        <button className="at-create-btn" onClick={()=>setOpen(true)}>
          + Create Aptitude Test
        </button>
      ) : (
        <div className="at-panel">
          <div className="at-panel-hd">
            <span>📋 Aptitude Test Setup</span>
            <button className="at-panel-x" onClick={()=>{setOpen(false);setStatus(null);setFile(null);}}>✕</button>
          </div>
          <div className="at-panel-body">
            <div className="at-row2">
              <div className="at-field">
                <label className="at-lbl">Start Date & Time</label>
                <input type="datetime-local" className="at-input" value={startTime} onChange={e=>setStartTime(e.target.value)}/>
              </div>
              <div className="at-field">
                <label className="at-lbl">Duration (minutes)</label>
                <input type="number" min="1" className="at-input" placeholder="e.g. 30" value={duration} onChange={e=>setDuration(e.target.value)}/>
              </div>
            </div>
            <label className="at-lbl">MCQ File <span style={{color:"rgba(107,127,163,.5)",fontWeight:300}}>(JSON, PDF, DOCX, CSV accepted)</span></label>
            <div className={`at-drop${dragOver?" drag":""}${file?" has":""}` }
              onClick={()=>!file&&fileRef.current?.click()}
              onDragOver={e=>{e.preventDefault();setDragOver(true)}}
              onDragLeave={()=>setDragOver(false)}
              onDrop={e=>{e.preventDefault();setDragOver(false);const f=e.dataTransfer.files[0];if(f)setFile(f);}}>
              <input ref={fileRef} type="file" hidden accept=".json,.pdf,.doc,.docx,.xlsx,.csv,.txt" onChange={e=>setFile(e.target.files[0])}/>
              {file ? (
                <div className="at-file-row">
                  <span className="at-file-ic">📄</span>
                  <div><div className="at-file-name">{file.name}</div><div className="at-file-sz">{(file.size/1024).toFixed(1)} KB</div></div>
                  <button className="at-file-rm" onClick={e=>{e.stopPropagation();setFile(null);}}>✕</button>
                </div>
              ) : (
                <div style={{textAlign:"center"}}>
                  <div style={{fontSize:24,marginBottom:6}}>⬆</div>
                  <div className="at-drop-title">Drop file or <span style={{color:"var(--teal)"}}>browse</span></div>
                  <div className="at-drop-hint">JSON · PDF · DOCX · CSV</div>
                </div>
              )}
            </div>
            {status==="error"   && <div className="at-msg err">⚠ {errMsg}</div>}
            {status==="success" && <div className="at-msg ok">✓ Aptitude test created!</div>}
            <div className="at-actions">
              <button className="at-cancel-btn" onClick={()=>{setOpen(false);setStatus(null);setFile(null);}}>Cancel</button>
              <button className="at-save-btn" onClick={handleSubmit} disabled={status==="saving"||status==="success"}>
                {status==="saving"?<><span className="spin"/>Saving…</>:"✓ Create Test"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

/* ─────────────────────────────────────────
   JOB CARD (expandable)
───────────────────────────────────────── */
const JobCard = ({ job, index, onOpenApplicant }) => {
  const [expanded,   setExpanded]  = useState(false);
  const [applicants, setApplicants]= useState([]);
  const [loading,    setLoading]   = useState(false);
  const [fetched,    setFetched]   = useState(false);
  const [atsLoading, setAtsLoading]= useState(false);
  const [countCache, setCountCache]= useState(job.applicant_count ?? null);
  const [testData,   setTestData]  = useState(job.has_test ? { exists:true, duration_min:"?", start_time:new Date().toISOString() } : null);

  const toggle = async () => {
    if (!expanded && !fetched) {
      setLoading(true);
      try {
        const res = await axios.get(`${BASE}/applications/api/applied/${job.id}/`);
        setApplicants(res.data);
        setCountCache(res.data.length);
        setFetched(true);
      } catch(e) { console.error(e); }
      finally { setLoading(false); }
    }
    setExpanded(p=>!p);
  };

  const runATS = async (e) => {
    e.stopPropagation();
    if (!fetched || applicants.length === 0) { alert("Click 'View Applicants' first."); return; }
    setAtsLoading(true);
    try {
      const res = await axios.post(`${BASE}/applications/api/ats-ranking/`, { job_id: job.id, applicants });
      const ranked = res.data;
      const merged = ranked.map(r => {
       const orig = applicants.find(a =>
  a.name === r.Candidate ||
  (a.resume || a.file || "").includes(r.Candidate)
);
 return orig ? {...orig,...r} : r;
      }).sort((a,b)=>b["Final Score"]-a["Final Score"]);
      setApplicants(merged);
    } catch(e) { alert("ATS failed: "+(e.response?.data?.error||e.message)); }
    finally { setAtsLoading(false); }
  };

  const updateLocalStatus = (id, newStatus) => {
    setApplicants(prev => prev.map(a => a.id===id ? {...a, status:newStatus} : a));
  };

  return (
    <div className={`jc-card${expanded?" open":""}`} style={{animationDelay:`${index*0.06}s`}}>
      {/* Header row */}
      <div className="jc-header" onClick={toggle}>
        <div className="jc-logo" style={{background:grad(index)}}>{initials(job.title||"J")}</div>
        <div className="jc-info">
          <div className="jc-title-row">
            <h3 className="jc-title">{job.title}</h3>
            {job.has_test && <span className="jc-test-badge">✓ Test Active</span>}
          </div>
          <p className="jc-desc">{(job.description||"").substring(0,90)}{(job.description||"").length>90?"…":""}</p>
          <div className="jc-meta">
            {job.type     && <span className="jc-pill">💼 {job.type}</span>}
            {job.location && <span className="jc-pill">📍 {job.location}</span>}
            {countCache !== null && <span className="jc-pill teal">{fetched ? applicants.length : countCache} applicant{(fetched ? applicants.length : countCache) !== 1 ? "s" : ""}</span>}
          </div>
        </div>
        <div className="jc-actions" onClick={e=>e.stopPropagation()}>
          <button className="jc-ats-btn" onClick={runATS} disabled={atsLoading} title="Run ATS Ranking">
            {atsLoading ? <><span className="spin"/>Running…</> : "⚡ ATS Rank"}
          </button>
        </div>
        <div className="jc-toggle">
          {loading ? <span className="spin-teal"/> : <>
            <span>{expanded?"Hide":"View Applicants"}</span>
            <svg className={`jc-chev${expanded?" open":""}`} width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="6 9 12 15 18 9"/></svg>
          </>}
        </div>
      </div>

      {/* Expanded panel */}
      {expanded && (
        <div className="jc-panel">
          {/* Aptitude section */}
          <div className="jc-sect-lbl">Aptitude Test</div>
          <AptitudePanel jobId={job.id} existingTest={testData} onTestCreated={d=>setTestData({exists:true,...d})}/>

          {/* Applicants section */}
          <div className="jc-sect-lbl" style={{marginTop:22}}>
            Applicants {fetched && <span className="jc-count">{applicants.length}</span>}
          </div>

          {applicants.length === 0 ? (
            <div className="jc-empty">👤 No applicants yet for this role.</div>
          ) : (
            <div className="jc-app-grid">
              {applicants.map((ap, i) => {
                const st = getS(ap.status);
                const skillsList = ap.skills ? ap.skills.split(",").map(s=>s.trim()).filter(Boolean) : [];
                return (
                  <div key={ap.id||i} className="jc-app-card" style={{animationDelay:`${i*0.04}s`}}>
                    {/* Top: avatar + name + status */}
                    <div className="jc-app-top">
                      <div className="jc-app-av" style={{background:grad(i+3)}}>{initials(ap.name||"A")}</div>
                      <div className="jc-app-head">
                        <div className="jc-app-name">{ap.name||"Applicant"}</div>
                        <div className="jc-app-status" style={{color:st.color,background:st.bg,border:`1px solid ${st.border}`}}>{st.label}</div>
                      </div>
                    </div>

                    {/* ATS score if available */}
                    {ap["Final Score"]!==undefined && <ScoreBar score={ap["Final Score"]}/>}

                    {/* Contact info */}
                    <div className="jc-app-meta">
                      <div className="jc-meta-row"><span>✉</span><span className="jc-meta-val">{ap.email||"—"}</span></div>
                      {ap.contact && <div className="jc-meta-row"><span>📞</span><span className="jc-meta-val">{ap.contact}</span></div>}
                      {ap.appliedAt && <div className="jc-meta-row"><span>📅</span><span className="jc-meta-val">Applied {fmt(ap.appliedAt)}</span></div>}
                    </div>

                    {/* Skills */}
                    {skillsList.length > 0 && (
                      <div className="jc-skills">
                        {skillsList.slice(0,3).map(sk=><span key={sk} className="jc-skill">{sk}</span>)}
                        {skillsList.length>3 && <span className="jc-skill more">+{skillsList.length-3}</span>}
                      </div>
                    )}

                    {/* Review button */}
                    <button className="jc-review-btn" onClick={()=>onOpenApplicant(ap, updateLocalStatus)}>
                      Review Applicant →
                    </button>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

/* ─────────────────────────────────────────
   MAIN — Applied (Employer Dashboard)
───────────────────────────────────────── */
const Applied = () => {
  const [jobs,      setJobs]      = useState([]);
  const [loading,   setLoading]   = useState(true);
  const [error,     setError]     = useState(null);
  const [selected,  setSelected]  = useState(null);
  const [updateFn,  setUpdateFn]  = useState(null);

  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(()=>{
    (async()=>{
      try {
        const res = await axios.get(`${BASE}/jobs/api/employer-jobs`, { params:{ username:user?.username } });
        setJobs(res.data);
      } catch(e) { setError(e.message); }
      finally { setLoading(false); }
    })();
  },[]);

  const openApplicant = (ap, updateLocal) => {
    setSelected(ap);
    setUpdateFn(()=>updateLocal);
  };

  const totalJobs = jobs.length;

  return (<>
    <style>{`
      @import url('https://fonts.googleapis.com/css2?family=Sora:wght@300;400;500;600;700;800&family=DM+Sans:ital,wght@0,300;0,400;0,500;1,400&display=swap');
      *,*::before,*::after{box-sizing:border-box;margin:0;padding:0}
      :root{
        --bg:#080e1a; --surf:#0d1526; --card:#111e35; --card2:#162038;
        --border:rgba(255,255,255,0.06); --border2:rgba(255,255,255,0.1);
        --teal:#0fd4c0; --amber:#f5a623; --blue:#60a5fa;
        --red:#f87171; --violet:#818cf8;
        --white:#e8efff; --muted:#6b7fa3; --soft:#9aaabf;
        --teal-d:rgba(15,212,192,0.1); --amber-d:rgba(245,166,35,0.1);
        --blue-d:rgba(96,165,250,0.1); --red-d:rgba(248,113,113,0.1);
        --violet-d:rgba(129,140,248,0.1);
      }

      /* ROOT */
      .ap-root{background:var(--bg);font-family:'DM Sans',sans-serif;color:var(--white);min-height:100vh}

      /* ── HERO ── */
      .ap-hero{position:relative;overflow:hidden;padding:96px 56px 44px;border-bottom:1px solid var(--border)}
      .ap-hero::before{content:'';position:absolute;inset:0;background:radial-gradient(ellipse 70% 60% at 50% -10%,rgba(15,212,192,0.07) 0%,transparent 65%);pointer-events:none}
      .ap-hero::after{content:'';position:absolute;inset:0;background-image:radial-gradient(rgba(255,255,255,0.03) 1px,transparent 1px);background-size:28px 28px;pointer-events:none}
      .ap-hero-inner{max-width:1180px;margin:0 auto;display:flex;align-items:flex-end;justify-content:space-between;gap:24px;flex-wrap:wrap;position:relative;z-index:1;opacity:0;animation:fadeUp .6s cubic-bezier(.22,1,.36,1) .08s forwards}
      @keyframes fadeUp{from{opacity:0;transform:translateY(16px)}to{opacity:1;transform:translateY(0)}}
      .ap-badge{display:inline-flex;align-items:center;gap:7px;font-size:11px;font-weight:700;letter-spacing:1.5px;text-transform:uppercase;color:var(--teal);margin-bottom:14px}
      .ap-badge-dot{width:5px;height:5px;border-radius:50%;background:var(--teal);box-shadow:0 0 8px var(--teal);animation:pulse 2s ease-in-out infinite}
      @keyframes pulse{0%,100%{opacity:1;transform:scale(1)}50%{opacity:.3;transform:scale(.6)}}
      .ap-hero-h{font-family:'Sora',sans-serif;font-size:clamp(28px,4vw,46px);font-weight:800;line-height:1.1;letter-spacing:-1.5px;margin-bottom:10px}
      .ap-hero-h em{font-style:italic;color:var(--teal)}
      .ap-hero-sub{font-size:15px;color:var(--muted);font-weight:300;line-height:1.65;max-width:420px}
      .ap-post-btn{display:inline-flex;align-items:center;gap:8px;padding:11px 22px;background:var(--teal);color:#080e1a;font-family:'Sora',sans-serif;font-size:13px;font-weight:700;border-radius:10px;text-decoration:none;box-shadow:0 4px 20px rgba(15,212,192,0.3);transition:all .18s;white-space:nowrap;flex-shrink:0}
      .ap-post-btn:hover{transform:translateY(-2px);box-shadow:0 8px 28px rgba(15,212,192,0.4)}

      /* ── STAT STRIP ── */
      .ap-stats{max-width:1180px;margin:0 auto;padding:24px 56px;display:flex;gap:12px;flex-wrap:wrap}
      .ap-stat{padding:16px 20px;background:var(--card);border:1px solid var(--border);border-radius:13px;display:flex;align-items:center;gap:12px;flex:1;min-width:150px;transition:border-color .2s}
      .ap-stat:hover{border-color:var(--border2)}
      .ap-stat-ic{font-size:20px}
      .ap-stat-n{font-family:'Sora',sans-serif;font-size:24px;font-weight:800;line-height:1;margin-bottom:2px}
      .ap-stat-l{font-size:11.5px;color:var(--muted)}

      /* ── MAIN WRAP ── */
      .ap-main{max-width:1180px;margin:0 auto;padding:4px 56px 80px}

      /* ── JOB CARD ── */
      .jc-card{background:var(--card);border:1px solid var(--border);border-radius:18px;margin-bottom:12px;overflow:hidden;opacity:0;animation:fadeUp .5s cubic-bezier(.22,1,.36,1) forwards;transition:border-color .2s}
      .jc-card:hover{border-color:var(--border2)}
      .jc-card.open{border-color:rgba(15,212,192,0.2)}
      .jc-header{display:flex;align-items:center;gap:16px;padding:20px 24px;cursor:pointer;transition:background .15s}
      .jc-header:hover{background:rgba(255,255,255,0.02)}
      .jc-logo{width:48px;height:48px;border-radius:12px;display:flex;align-items:center;justify-content:center;font-family:'Sora',sans-serif;font-size:14px;font-weight:800;color:#fff;flex-shrink:0;box-shadow:0 4px 16px rgba(0,0,0,.4)}
      .jc-info{flex:1;min-width:0}
      .jc-title-row{display:flex;align-items:center;gap:8px;margin-bottom:4px;flex-wrap:wrap}
      .jc-title{font-family:'Sora',sans-serif;font-size:16px;font-weight:700;color:var(--white);letter-spacing:-.3px}
      .jc-test-badge{display:inline-flex;align-items:center;gap:4px;padding:2px 8px;border-radius:6px;background:var(--teal-d);border:1px solid rgba(15,212,192,0.2);font-size:10px;font-weight:700;color:var(--teal)}
      .jc-desc{font-size:13px;color:var(--muted);font-weight:300;margin-bottom:8px;line-height:1.5}
      .jc-meta{display:flex;gap:6px;flex-wrap:wrap}
      .jc-pill{padding:3px 9px;background:rgba(255,255,255,0.04);border:1px solid var(--border);border-radius:6px;font-size:11px;color:var(--muted)}
      .jc-pill.teal{background:var(--teal-d);border-color:rgba(15,212,192,0.2);color:var(--teal)}

      /* actions area */
      .jc-actions{display:flex;align-items:center;gap:8px;flex-shrink:0}
      .jc-ats-btn{display:inline-flex;align-items:center;gap:6px;padding:8px 14px;background:var(--violet-d);border:1px solid rgba(129,140,248,0.22);border-radius:9px;font-family:'Sora',sans-serif;font-size:12.5px;font-weight:700;color:var(--violet);cursor:pointer;transition:all .15s;white-space:nowrap}
      .jc-ats-btn:hover:not(:disabled){background:rgba(129,140,248,0.16);border-color:rgba(129,140,248,0.4);transform:translateY(-1px)}
      .jc-ats-btn:disabled{opacity:.5;cursor:not-allowed}
      .jc-toggle{display:flex;align-items:center;gap:7px;padding:8px 14px;border:1px solid var(--border);border-radius:9px;font-size:12.5px;font-weight:500;color:var(--muted);flex-shrink:0;cursor:pointer;transition:all .15s;user-select:none}
      .jc-card.open .jc-toggle,.jc-header:hover .jc-toggle{border-color:rgba(15,212,192,0.3);color:var(--teal);background:var(--teal-d)}
      .jc-chev{transition:transform .25s ease}
      .jc-chev.open{transform:rotate(180deg)}

      /* expanded panel */
      .jc-panel{border-top:1px solid var(--border);padding:22px 24px 26px;background:rgba(255,255,255,0.015);animation:fadeUp .3s ease both}
      .jc-sect-lbl{font-size:10px;font-weight:700;letter-spacing:1.5px;text-transform:uppercase;color:var(--muted);margin-bottom:12px;display:flex;align-items:center;gap:8px}
      .jc-count{padding:1px 8px;border-radius:6px;background:var(--teal-d);border:1px solid rgba(15,212,192,0.18);color:var(--teal);font-size:10px;letter-spacing:0;font-weight:600}
      .jc-empty{padding:20px;text-align:center;font-size:13.5px;color:var(--muted);border:1px dashed var(--border);border-radius:12px}

      /* applicant grid */
      .jc-app-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(270px,1fr));gap:10px}
      .jc-app-card{background:var(--bg);border:1px solid var(--border);border-radius:14px;padding:16px;display:flex;flex-direction:column;gap:10px;opacity:0;animation:fadeUp .35s cubic-bezier(.22,1,.36,1) forwards;transition:border-color .2s,transform .2s}
      .jc-app-card:hover{border-color:rgba(15,212,192,0.18);transform:translateY(-2px)}
      .jc-app-top{display:flex;align-items:center;gap:10px}
      .jc-app-av{width:40px;height:40px;border-radius:10px;display:flex;align-items:center;justify-content:center;font-family:'Sora',sans-serif;font-size:13px;font-weight:800;color:#fff;flex-shrink:0}
      .jc-app-head{flex:1;min-width:0}
      .jc-app-name{font-size:14px;font-weight:600;color:var(--white);white-space:nowrap;overflow:hidden;text-overflow:ellipsis;margin-bottom:4px}
      .jc-app-status{display:inline-block;padding:2px 8px;border-radius:6px;font-size:10.5px;font-weight:700}
      .jc-app-meta{display:flex;flex-direction:column;gap:5px}
      .jc-meta-row{display:flex;align-items:center;gap:7px;font-size:12px;color:var(--muted)}
      .jc-meta-val{white-space:nowrap;overflow:hidden;text-overflow:ellipsis;flex:1}
      .jc-skills{display:flex;flex-wrap:wrap;gap:4px}
      .jc-skill{padding:2px 8px;border-radius:6px;background:var(--violet-d);border:1px solid rgba(129,140,248,0.18);font-size:10.5px;color:var(--violet);font-weight:500}
      .jc-skill.more{background:rgba(255,255,255,0.04);border-color:var(--border);color:var(--muted)}
      .jc-review-btn{display:flex;align-items:center;justify-content:center;padding:8px;background:var(--teal-d);border:1px solid rgba(15,212,192,0.2);border-radius:9px;font-family:'Sora',sans-serif;font-size:12.5px;font-weight:700;color:var(--teal);cursor:pointer;transition:all .15s;margin-top:2px}
      .jc-review-btn:hover{background:rgba(15,212,192,0.16);border-color:rgba(15,212,192,0.35)}

      /* ── ATS SCORE ── */
      .ap-score-wrap{display:flex;align-items:center;gap:8px}
      .ap-score-bar{flex:1;height:4px;background:rgba(255,255,255,0.06);border-radius:100px;overflow:hidden}
      .ap-score-fill{height:100%;border-radius:100px;transition:width .6s cubic-bezier(.22,1,.36,1)}
      .ap-score-num{font-family:'Sora',sans-serif;font-size:12px;font-weight:700;flex-shrink:0}

      /* ── APTITUDE PANEL ── */
      .at-create-btn{display:inline-flex;align-items:center;gap:7px;padding:9px 16px;background:var(--amber-d);border:1px solid rgba(245,166,35,0.22);border-radius:9px;font-family:'Sora',sans-serif;font-size:13px;font-weight:700;color:var(--amber);cursor:pointer;transition:all .15s}
      .at-create-btn:hover{background:rgba(245,166,35,0.16);border-color:rgba(245,166,35,0.4)}
      .at-existing{display:flex;align-items:center;justify-content:space-between;padding:13px 16px;background:var(--teal-d);border:1px solid rgba(15,212,192,0.22);border-radius:12px}
      .at-ex-left{display:flex;align-items:center;gap:12px}
      .at-ex-icon{width:32px;height:32px;border-radius:8px;background:rgba(15,212,192,0.15);border:1px solid rgba(15,212,192,0.25);display:flex;align-items:center;justify-content:center;font-size:13px;color:var(--teal);font-weight:700}
      .at-ex-title{font-size:13px;font-weight:600;color:var(--white);margin-bottom:2px}
      .at-ex-meta{font-size:11.5px;color:var(--muted)}
      .at-live-badge{padding:3px 10px;border-radius:100px;background:rgba(34,197,94,0.1);border:1px solid rgba(34,197,94,0.2);font-size:10.5px;font-weight:700;color:#22c55e}
      .at-panel{background:rgba(255,255,255,0.03);border:1px solid var(--border);border-radius:14px;overflow:hidden;animation:fadeUp .3s ease both}
      .at-panel-hd{display:flex;align-items:center;justify-content:space-between;padding:12px 16px;border-bottom:1px solid var(--border);background:rgba(245,166,35,0.04);font-family:'Sora',sans-serif;font-size:13px;font-weight:700;color:var(--white)}
      .at-panel-x{background:none;border:none;color:var(--muted);cursor:pointer;font-size:15px;transition:color .15s}
      .at-panel-x:hover{color:var(--red)}
      .at-panel-body{padding:16px;display:flex;flex-direction:column;gap:12px}
      .at-row2{display:grid;grid-template-columns:1fr 1fr;gap:12px}
      .at-field{display:flex;flex-direction:column;gap:5px}
      .at-lbl{font-size:10.5px;font-weight:700;letter-spacing:.8px;text-transform:uppercase;color:var(--muted)}
      .at-input{padding:9px 12px;background:rgba(255,255,255,0.04);border:1.5px solid var(--border);border-radius:9px;font-family:'DM Sans',sans-serif;font-size:13.5px;color:var(--white);outline:none;transition:border-color .2s;color-scheme:dark}
      .at-input:focus{border-color:rgba(245,166,35,0.5);box-shadow:0 0 0 3px rgba(245,166,35,0.08)}
      .at-drop{border:1.5px dashed rgba(255,255,255,0.08);border-radius:11px;padding:20px;cursor:pointer;transition:border-color .2s,background .2s;background:rgba(255,255,255,0.02)}
      .at-drop:hover,.at-drop.drag{border-color:rgba(15,212,192,0.3);background:rgba(15,212,192,0.04)}
      .at-drop.has{border-style:solid;border-color:rgba(15,212,192,0.25);cursor:default}
      .at-drop-title{font-size:13px;color:var(--muted);margin-bottom:4px}
      .at-drop-hint{font-size:11px;color:rgba(107,127,163,0.4)}
      .at-file-row{display:flex;align-items:center;gap:10px}
      .at-file-ic{font-size:20px}
      .at-file-name{font-size:13px;font-weight:500;color:var(--white);margin-bottom:2px}
      .at-file-sz{font-size:11px;color:var(--muted)}
      .at-file-rm{margin-left:auto;background:none;border:none;color:var(--red);font-size:14px;cursor:pointer;opacity:.7;transition:opacity .15s}
      .at-file-rm:hover{opacity:1}
      .at-msg{display:flex;align-items:center;gap:8px;padding:9px 12px;border-radius:9px;font-size:12.5px;font-weight:500}
      .at-msg.ok{background:var(--teal-d);border:1px solid rgba(15,212,192,0.22);color:var(--teal)}
      .at-msg.err{background:var(--red-d);border:1px solid rgba(248,113,113,0.2);color:var(--red)}
      .at-actions{display:flex;justify-content:flex-end;gap:8px}
      .at-cancel-btn{padding:8px 16px;background:transparent;border:1px solid var(--border);border-radius:9px;font-family:'DM Sans',sans-serif;font-size:13px;color:var(--muted);cursor:pointer;transition:all .15s}
      .at-cancel-btn:hover{border-color:var(--border2);color:var(--white)}
      .at-save-btn{display:inline-flex;align-items:center;gap:6px;padding:9px 20px;background:var(--amber);color:#080e1a;font-family:'Sora',sans-serif;font-size:13px;font-weight:700;border:none;border-radius:9px;cursor:pointer;box-shadow:0 4px 16px rgba(245,166,35,0.25);transition:all .15s}
      .at-save-btn:hover:not(:disabled){transform:translateY(-1px);box-shadow:0 7px 22px rgba(245,166,35,0.38)}
      .at-save-btn:disabled{opacity:.45;cursor:not-allowed}

      /* ── APPLICANT MODAL ── */
      .md-overlay{position:fixed;inset:0;background:rgba(4,8,18,.8);backdrop-filter:blur(8px);z-index:500;animation:bdFade .25s ease both}
      @keyframes bdFade{from{opacity:0}to{opacity:1}}
      .md-shell{position:fixed;top:50%;left:50%;transform:translate(-50%,-50%);width:min(660px,95vw);max-height:90vh;overflow-y:auto;background:#0e1a2e;border:1px solid rgba(255,255,255,0.08);border-radius:22px;z-index:501;display:flex;flex-direction:column;animation:mdIn .35s cubic-bezier(.22,1,.36,1) both;scrollbar-width:thin;scrollbar-color:rgba(255,255,255,.05) transparent}
      @keyframes mdIn{from{opacity:0;transform:translate(-50%,-46%) scale(.95)}to{opacity:1;transform:translate(-50%,-50%) scale(1)}}
      .md-accent{height:3px;background:linear-gradient(90deg,var(--teal),transparent);flex-shrink:0}
      .md-head{display:flex;align-items:flex-start;gap:14px;padding:22px 24px 18px;border-bottom:1px solid var(--border)}
      .md-avatar{width:52px;height:52px;border-radius:13px;background:linear-gradient(135deg,#0fd4c0,#0891b2);display:flex;align-items:center;justify-content:center;font-family:'Sora',sans-serif;font-size:17px;font-weight:800;color:#fff;flex-shrink:0}
      .md-head-info{flex:1;min-width:0}
      .md-name{font-family:'Sora',sans-serif;font-size:19px;font-weight:800;color:var(--white);letter-spacing:-.4px;margin-bottom:5px}
      .md-email{display:block;font-size:12.5px;color:var(--muted);text-decoration:none;margin-bottom:4px;transition:color .15s}
      .md-email:hover{color:var(--teal)}
      .md-contact{font-size:12px;color:var(--muted);margin-bottom:4px}
      .md-date{font-size:11.5px;color:rgba(107,127,163,.6);margin-bottom:8px}
      .md-skills{display:flex;flex-wrap:wrap;gap:5px;margin-bottom:8px}
      .md-skill{padding:2px 8px;border-radius:6px;background:var(--violet-d);border:1px solid rgba(129,140,248,.2);font-size:11px;color:var(--violet);font-weight:500}
      .md-ats-row{display:flex;align-items:center;gap:10px;margin-bottom:8px}
      .md-ats-lbl{font-size:11px;font-weight:600;letter-spacing:.5px;color:var(--muted);white-space:nowrap;text-transform:uppercase}
      .md-cur-status{display:inline-block;padding:3px 10px;border-radius:7px;font-size:11px;font-weight:700}
      .md-close{width:32px;height:32px;border-radius:9px;background:rgba(255,255,255,0.04);border:1px solid var(--border);color:var(--muted);cursor:pointer;display:flex;align-items:center;justify-content:center;flex-shrink:0;font-size:13px;transition:all .15s}
      .md-close:hover{color:var(--red);background:var(--red-d)}
      .md-body{padding:18px 24px}
      .md-section-lbl{font-size:10px;font-weight:700;letter-spacing:1.5px;text-transform:uppercase;color:var(--muted);margin-bottom:10px}
      .md-resume-frame{border:1px solid var(--border);border-radius:12px;overflow:hidden;height:340px;background:rgba(255,255,255,0.02)}
      .md-no-resume{display:flex;align-items:center;justify-content:center;gap:8px;height:80px;border:1px dashed var(--border);border-radius:11px;font-size:13px;color:var(--muted)}
      .md-foot{padding:16px 24px 22px;border-top:1px solid var(--border);background:rgba(255,255,255,0.02)}
      .md-foot-lbl{font-size:10px;font-weight:700;letter-spacing:1.5px;text-transform:uppercase;color:var(--muted);margin-bottom:11px}
      .md-foot-row{display:flex;align-items:center;gap:10px;flex-wrap:wrap}
      .md-chips{display:flex;gap:7px;flex-wrap:wrap}
      .md-chip{padding:7px 14px;border-radius:9px;font-size:13px;font-weight:600;cursor:pointer;border:1px solid var(--border);background:rgba(255,255,255,0.04);color:var(--muted);transition:all .15s;font-family:'DM Sans',sans-serif}
      .md-chip:hover{color:var(--white);border-color:var(--border2)}
      .md-save{display:inline-flex;align-items:center;gap:6px;padding:9px 20px;background:var(--teal);color:#080e1a;font-family:'Sora',sans-serif;font-size:13.5px;font-weight:800;border:none;border-radius:9px;cursor:pointer;box-shadow:0 4px 16px rgba(15,212,192,.25);transition:all .15s;margin-left:auto}
      .md-save:hover:not(:disabled){transform:translateY(-1px);box-shadow:0 7px 22px rgba(15,212,192,.38)}
      .md-save:disabled{opacity:.4;cursor:not-allowed}
      .md-success{display:flex;align-items:center;gap:8px;padding:12px 14px;background:var(--teal-d);border:1px solid rgba(15,212,192,.22);border-radius:10px;font-size:14px;font-weight:500;color:var(--teal);animation:fadeUp .3s ease both}

      /* ── SPINNERS ── */
      .spin{display:inline-block;width:12px;height:12px;border:2px solid rgba(255,255,255,.15);border-top-color:currentColor;border-radius:50%;animation:rotate .65s linear infinite}
      .spin-teal{display:inline-block;width:14px;height:14px;border:2px solid rgba(15,212,192,.2);border-top-color:var(--teal);border-radius:50%;animation:rotate .65s linear infinite}
      @keyframes rotate{to{transform:rotate(360deg)}}

      /* ── CENTER / EMPTY ── */
      .ap-center{display:flex;align-items:center;justify-content:center;min-height:60vh;flex-direction:column;gap:12px}
      .ap-empty{text-align:center;padding:80px 24px}
      .ap-empty-ic{font-size:48px;margin-bottom:16px}
      .ap-empty-h{font-family:'Sora',sans-serif;font-size:20px;font-weight:700;margin-bottom:8px}
      .ap-empty-p{font-size:14px;color:var(--muted);margin-bottom:26px}

      @media(max-width:900px){
        .ap-hero,.ap-stats,.ap-main{padding-left:20px;padding-right:20px}
        .ap-hero{padding-top:90px}
        .jc-actions{display:none}
        .at-row2{grid-template-columns:1fr}
      }
      @media(max-width:600px){
        .jc-app-grid{grid-template-columns:1fr}
        .md-head{flex-wrap:wrap}
        .md-foot-row{flex-direction:column;align-items:stretch}
        .md-save{margin-left:0}
      }
    `}</style>

    <div className="ap-root">

      {/* ── HERO ── */}
      <section className="ap-hero">
        <div className="ap-hero-inner">
          <div>
            <div className="ap-badge"><span className="ap-badge-dot"/> {user?.username ? `${user.username}'s` : "Employer"} Dashboard</div>
            <h1 className="ap-hero-h">Posted <em>Jobs</em> &amp;<br/>Applicants</h1>
            <p className="ap-hero-sub">Manage listings, schedule aptitude tests &amp; review every applicant in one place.</p>
          </div>
          <Link to="/post-job" className="ap-post-btn">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
            Post a New Job
          </Link>
        </div>
      </section>

      {/* ── STATS ── */}
      {!loading && jobs.length > 0 && (
        <div className="ap-stats">
          {[
            {ic:"💼",n:totalJobs,l:"Active Listings",c:"#60a5fa"},
            {ic:"👥",n:jobs.reduce((s,j)=>s+(j.applicant_count||0),0),l:"Total Applicants",c:"#f5a623"},
          ].map((s,i)=>(
            <div className="ap-stat" key={i}>
              <span className="ap-stat-ic">{s.ic}</span>
              <div><div className="ap-stat-n" style={{color:s.c}}>{s.n}</div><div className="ap-stat-l">{s.l}</div></div>
            </div>
          ))}
        </div>
      )}

      {/* ── JOBS LIST ── */}
      <div className="ap-main">
        {loading ? (
          <div className="ap-center">
            <span className="spin-teal"/>
            <span style={{color:"var(--muted)",fontSize:14}}>Loading your jobs…</span>
          </div>
        ) : error ? (
          <div className="ap-center"><span style={{color:"var(--red)",fontSize:14}}>Error: {error}</span></div>
        ) : jobs.length === 0 ? (
          <div className="ap-empty">
            <div className="ap-empty-ic">📋</div>
            <div className="ap-empty-h">No jobs posted yet</div>
            <p className="ap-empty-p">Post your first job to start receiving applications.</p>
            <Link to="/post-job" className="ap-post-btn">+ Post a Job</Link>
          </div>
        ) : (
          jobs.map((job, i) => (
            <JobCard key={job.id} job={job} index={i} onOpenApplicant={openApplicant}/>
          ))
        )}
      </div>

    </div>

    {/* ── APPLICANT MODAL ── */}
    {selected && (
      <ApplicantModal
        applicant={selected}
        onClose={()=>setSelected(null)}
        onStatusUpdate={(id, newStatus) => { updateFn && updateFn(id, newStatus); setSelected(null); }}
      />
    )}
  </>);
};

export default Applied;
