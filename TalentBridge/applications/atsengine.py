# """
# HR ATS Resume Ranking System — v11
# Weighted Skill Scoring | ats_weighted_v2.csv

# CSV FORMAT — skill:weight|skill:weight pipe-separated:
#   must_have_weighted      → "Python:10|Django:9|SQL:8|Git:7"
#   good_to_have_weighted   → "DRF:8|PostgreSQL:7|ORM:6"
#   nice_to_have_weighted   → "Celery:5|Redis:5|Docker:5"
#   core_concepts_weighted  → "Django MVT:9|REST Architecture:8"
#   ats_keywords            → "python, django, drf, rest api, sql" (comma, lowercase)
#   key_responsibilities    → pipe-separated sentences
#   education_requirements  → comma-separated degrees

# HOW WEIGHTED SCORING WORKS:
#   Each skill has a weight (1-10). When matched, it contributes proportionally.
#   Score = sum(matched_weights) / sum(all_weights) * 100

#   Example: must_have = "Python:10|Django:9|SQL:8" → total=27
#     Resume has Python+Django → matched=19 → score = 19/27 * 100 = 70.4%
#   This means high-weight skills matter MORE than low-weight ones.

# TIER WEIGHTS (how much each tier contributes to final score):
#   Fresher:
#     must_have      50%  | good_to_have  20% | ats_keywords  15%
#     core_concepts   8%  | responsibilities  4% | nice_to_have   3%
#   Experienced:
#     must_have      35%  | good_to_have  20% | ats_keywords  15%
#     nice_to_have   12%  | core_concepts  8% | responsibilities 5% | education 5%

# USAGE:
#   python sec_v11.py                            # interactive menu
#   python sec_v11.py --role "Django Developer"
#   python sec_v11.py --role-id 4
#   python sec_v11.py --list
#   python sec_v11.py --fresher
#   python sec_v11.py --experienced
# """

# import os, re, argparse
# from typing import List, Dict, Tuple

# import nltk
# import PyPDF2
# import pandas as pd

# nltk.download('punkt',                      quiet=True)
# nltk.download('stopwords',                  quiet=True)
# nltk.download('wordnet',                    quiet=True)
# nltk.download('averaged_perceptron_tagger', quiet=True)
# nltk.download('punkt_tab',                  quiet=True)

# from nltk.corpus import stopwords
# from nltk.stem   import WordNetLemmatizer, PorterStemmer

# # ── Noise words ──────────────────────────────────────────────────────────────
# NOISE = {
#     'the','a','an','in','of','and','or','to','for','with','is','are','be','by',
#     'on','at','as','we','our','you','your','their','will','must','can','have',
#     'has','had','this','that','these','such','all','any','more','than','very',
#     'join','looking','help','make','ensure','work','using','use','also','able',
#     'following','include','including','across','within','both','each','other',
#     'developer','development','team','company','role','position','candidate',
#     'strong','good','excellent','great','highly','well','effectively',
#     'required','preferred','responsibilities','qualifications','bonus','skills',
#     'experience','knowledge','familiarity','ability','understanding','proficiency',
#     'minimum','plus','years','year','related','field','degree','equivalent',
#     'provide','build','design','implement','maintain','develop','create','manage',
#     'collaborate','communicate','support','ensure','analyze','deliver','drive',
# }

# DEGREE_KEYWORDS = {
#     'phd':       ['phd', 'ph.d', 'doctorate', 'doctoral'],
#     'masters':   ['master', 'm.tech', 'm.s', 'msc', 'mba', 'mca', 'm.com', 'postgraduate'],
#     'bachelors': ['bachelor', 'b.tech', 'b.e', 'bsc', 'bba', 'bca', 'b.com',
#                   'b.s', 'llb', 'undergraduate', 'b.a'],
#     'diploma':   ['diploma', 'associate', 'certificate course'],
# }

# WORK_EXP_SIGNALS = [
#     'internship', 'intern at', 'full-time', 'part-time', 'freelance',
#     'consultant', 'contract', 'worked at', 'working at', 'employment',
#     'employed', 'job title', 'position held',
# ]

# FRESHER_INDICATORS = ['fresher', '0-2', '0-1', 'entry', 'junior', 'graduate']

# # ── Skill aliases ────────────────────────────────────────────────────────────
# SKILL_ALIASES = {
#     'django rest framework': ['drf', 'django rest', 'djangorestframework'],
#     'javascript':            ['js', 'es6', 'es6+', 'ecmascript'],
#     'typescript':            ['ts'],
#     'postgresql':            ['postgres', 'psql'],
#     'node.js':               ['nodejs', 'node js'],
#     'react.js':              ['reactjs', 'react js', 'react'],
#     'express.js':            ['expressjs', 'express js', 'express'],
#     'python':                ['py'],
#     'rest apis':             ['rest api', 'restful', 'restful api', 'rest'],
#     'oop':                   ['object oriented', 'object-oriented', 'oops'],
#     'ci/cd':                 ['continuous integration', 'cicd', 'jenkins', 'github actions'],
#     'git':                   ['github', 'gitlab', 'version control', 'vcs'],
#     'machine learning':      ['ml'],
#     'unit testing':          ['unittest', 'unit test', 'pytest', 'jest', 'junit'],
#     'sql':                   ['mysql', 'postgresql', 'sqlite', 'sqlite3'],
#     'linux':                 ['ubuntu', 'debian', 'centos', 'unix', 'bash'],
#     'problem solving':       ['problem-solving', 'analytical', 'debugging'],
#     'algorithms':            ['algorithm', 'dsa', 'data structures and algorithms'],
#     'data structures':       ['dsa', 'data structure'],
#     'mvc':                   ['mvt', 'model view', 'model-view'],
#     'authentication':        ['auth', 'jwt', 'oauth', 'login', 'session'],
#     'docker':                ['containerization', 'container'],
#     'spring boot':           ['springboot', 'spring-boot'],
#     'next.js':               ['nextjs', 'next js'],
#     'vue.js':                ['vuejs', 'vue js', 'vue'],
#     'mongodb':               ['mongo'],
#     'kubernetes':            ['k8s'],
#     'redux':                 ['redux toolkit', 'react-redux'],
#     'tailwind css':          ['tailwind', 'tailwindcss'],
#     'orm':                   ['sqlalchemy', 'hibernate', 'activerecord', 'eloquent', 'mongoose', 'typeorm'],
#     'state management':      ['redux', 'vuex', 'ngrx', 'bloc', 'provider', 'mobx'],
#     'jpa/hibernate':         ['jpa', 'hibernate', 'spring data'],
#     'jpa':                   ['hibernate', 'spring data jpa'],
#     'activerecord':          ['active record', 'rails orm'],
#     'eloquent orm':          ['eloquent', 'laravel orm'],
#     'vuex':                  ['vue store', 'pinia'],
#     'ngrx':                  ['angular store', 'ng-rx'],
#     'rxjs':                  ['reactive extensions', 'observables'],
#     'jest':                  ['jtest', 'js testing'],
#     'collections':           ['collections framework', 'java collections'],
#     'collections framework': ['collections', 'java collections', 'arraylist', 'hashmap'],
#     'jsx':                   ['react jsx', 'javascript xml'],
#     'ssr':                   ['server side rendering', 'server-side rendering', 'next.js ssr'],
#     'ssg':                   ['static site generation', 'static generation'],
#     'vue cli':               ['vue-cli', '@vue/cli'],
#     'gin':                   ['gin framework', 'gin-gonic'],
#     'actix':                 ['actix-web', 'actix web'],
#     'tokio':                 ['async rust', 'rust async'],
#     'cargo':                 ['rust cargo', 'crates.io'],
#     'memory management':     ['ownership', 'borrowing', 'lifetimes', 'borrow checker'],
#     'concurrency':           ['goroutines', 'threads', 'async', 'parallel'],
#     'systems programming':   ['system programming', 'low-level', 'kernel'],
#     'rest architecture':     ['rest api', 'restful', 'rest apis', 'http'],
#     'oop principles':        ['oop', 'object oriented', 'encapsulation', 'inheritance', 'polymorphism'],
#     'solid principles':      ['solid', 'single responsibility', 'open closed'],
#     'design patterns':       ['factory pattern', 'singleton', 'observer pattern'],
#     'system design':         ['system architecture', 'high level design', 'hld'],
#     'distributed systems':   ['distributed computing', 'distributed architecture'],
#     'scalability':           ['horizontal scaling', 'vertical scaling', 'load balancing'],
#     'microservices':         ['microservice', 'micro services', 'service mesh'],
#     'django mvt pattern':    ['django mvt', 'mvt', 'model view template'],
#     'orm concepts':          ['orm', 'object relational mapping', 'database abstraction'],
#     'component architecture':['component design', 'react components', 'vue components'],
#     'virtual dom':           ['vdom', 'virtual document object model'],
#     'reactive programming':  ['rxjs', 'observables', 'reactive', 'streams'],
#     'event loop':            ['javascript event loop', 'node.js event loop', 'async event loop'],
#     'goroutines':            ['go routines', 'go concurrency', 'concurrent goroutines'],
#     'channels':              ['go channels', 'channel communication'],
#     'type system':           ['typescript types', 'static typing', 'type checking'],
#     'generics':              ['typescript generics', 'generic programming'],
#     'ownership model':       ['rust ownership', 'ownership borrowing', 'borrow checker'],
#     'lifetimes':             ['rust lifetimes', 'lifetime annotations'],
#     'ml algorithms':         ['machine learning algorithms', 'supervised learning', 'unsupervised learning'],
#     'model evaluation':      ['model metrics', 'accuracy', 'f1 score', 'precision recall'],
#     'feature engineering':   ['feature extraction', 'feature selection', 'data features'],
#     'rag architecture':      ['rag', 'retrieval augmented generation', 'retrieval augmented'],
#     'generative ai':         ['genai', 'gen ai', 'llm', 'large language model'],
#     'prompt engineering':    ['prompt design', 'prompting', 'prompt optimization'],
#     'nextauth':              ['next auth', 'next.js authentication'],
#     'prisma':                ['prisma orm', 'prisma client'],
#     'vector databases':      ['vector db', 'chroma', 'pinecone', 'weaviate', 'faiss'],
#     'transformers':          ['hugging face transformers', 'transformer models', 'bert', 'gpt'],
#     'jpa/orm':               ['jpa', 'hibernate', 'spring data'],
#     'spring framework':      ['spring', 'spring boot', 'spring mvc'],
#     'dependency injection':  ['di', 'ioc', 'inversion of control'],
#     'rails':                 ['ruby on rails', 'ror'],
#     'laravel':               ['laravel framework', 'php laravel'],
#     'ssr/ssg/isr':           ['ssr', 'ssg', 'isr', 'server side rendering', 'static generation'],
# }

# # ── Scoring weight profiles ──────────────────────────────────────────────────
# WEIGHTS_FRESHER = {
#     'must_have':      0.50,
#     'good_to_have':   0.20,
#     'ats_keywords':   0.15,
#     'core_concepts':  0.08,
#     'responsibilities':0.04,
#     'nice_to_have':   0.03,
#     'education':      0.00,
# }

# WEIGHTS_EXPERIENCED = {
#     'must_have':      0.35,
#     'good_to_have':   0.20,
#     'ats_keywords':   0.15,
#     'nice_to_have':   0.12,
#     'core_concepts':  0.08,
#     'responsibilities':0.05,
#     'education':      0.05,
# }


# # ─────────────────────────────────────────────────────────────────────────────
# class JobRolesDB:
#     """Loads job roles from ats_weighted_v2.csv — weighted skill format."""

#     def __init__(self, csv_path: str = None):
#         if csv_path is None:
#             script_dir = os.path.dirname(os.path.abspath(__file__))
#             csv_path   = os.path.join(script_dir, "ats_weighted_v2.csv")

#         self.roles = []
#         self.df    = None

#         if not os.path.exists(csv_path):
#             print(f"  ⚠  CSV not found: {csv_path}")
#             print(f"     Place ats_weighted_v2.csv in the same folder as this script")
#             return

#         self.df = pd.read_csv(csv_path).fillna("")
#         for _, row in self.df.iterrows():
#             self.roles.append(row.to_dict())
#         print(f"  ✓  Loaded {len(self.roles)} job roles from {os.path.basename(csv_path)}")

#     @staticmethod
#     def parse_weighted(cell: str) -> List[Tuple[str, int]]:
#         """
#         Parse 'Skill:weight|Skill:weight' → [(skill, weight), ...]
#         Falls back to weight=5 if no weight given.
#         """
#         if not cell or str(cell).strip() == "":
#             return []
#         result = []
#         for item in str(cell).split("|"):
#             item = item.strip()
#             if not item:
#                 continue
#             if ":" in item:
#                 parts = item.rsplit(":", 1)
#                 skill = parts[0].strip()
#                 try:
#                     weight = int(parts[1].strip())
#                 except ValueError:
#                     weight = 5
#             else:
#                 skill = item
#                 weight = 5
#             if skill:
#                 result.append((skill, weight))
#         return result

#     @staticmethod
#     def parse_ats_keywords(cell: str) -> List[str]:
#         """Parse comma-separated lowercase ATS keywords."""
#         if not cell or str(cell).strip() == "":
#             return []
#         return [s.strip().lower() for s in str(cell).split(",") if s.strip()]

#     @staticmethod
#     def parse_responsibilities(cell: str) -> List[str]:
#         """Parse pipe-separated responsibilities."""
#         if not cell or str(cell).strip() == "":
#             return []
#         return [s.strip() for s in str(cell).split("|") if s.strip()]

#     def get_by_id(self, role_id: int) -> Dict:
#         for r in self.roles:
#             if int(r.get('id', -1)) == role_id:
#                 return r
#         return None

#     def get_by_title(self, title: str) -> Dict:
#         t = title.lower().strip()
#         for r in self.roles:
#             if r.get('job_title', '').lower() == t:
#                 return r
#         for r in self.roles:
#             if t in r.get('job_title', '').lower():
#                 return r
#         return None

#     def is_fresher_role(self, role: Dict) -> bool:
#         return any(i in role.get('experience_level', '').lower()
#                    for i in FRESHER_INDICATORS)

#     def list_roles(self):
#         print("\n" + "=" * 70)
#         print("  Available Job Roles  (ats_weighted_v2.csv)")
#         print("=" * 70)
#         by_cat = {}
#         for r in self.roles:
#             by_cat.setdefault(r.get('role_category', 'Other'), []).append(r)
#         for cat in sorted(by_cat):
#             print(f"\n  [{cat}]")
#             for r in by_cat[cat]:
#                 lvl = r.get('experience_level', '')
#                 tag = " 🟢" if 'Fresher' in lvl else " 🟡" if 'Mid' in lvl else " 🔴"
#                 print(f"    {int(r['id']):>3}. {r['job_title']:<40} {lvl}{tag}")
#         print()

#     def build_role_data(self, role: Dict) -> Dict:
#         """Build role_data with weighted skill lists."""
#         return {
#             'must_have':       self.parse_weighted(role.get('must_have_weighted', '')),
#             'good_to_have':    self.parse_weighted(role.get('good_to_have_weighted', '')),
#             'nice_to_have':    self.parse_weighted(role.get('nice_to_have_weighted', '')),
#             'core_concepts':   self.parse_weighted(role.get('core_concepts_weighted', '')),
#             'ats_keywords':    self.parse_ats_keywords(role.get('ats_keywords', '')),
#             'responsibilities':self.parse_responsibilities(role.get('key_responsibilities', '')),
#             'education':       role.get('education_requirements', ''),
#             'job_title':       role.get('job_title', ''),
#         }


# # ─────────────────────────────────────────────────────────────────────────────
# class ResumeRankingSystem:

#     def __init__(self):
#         self.stop_words = set(stopwords.words('english'))
#         self.lemmatizer = WordNetLemmatizer()
#         self.stemmer    = PorterStemmer()

#     # ── PDF extraction ────────────────────────────────────────────────────────
#     def extract_text_from_pdf(self, path: str) -> str:
#         try:
#             with open(path, 'rb') as f:
#                 reader = PyPDF2.PdfReader(f)
#                 pages  = [p.extract_text() or "" for p in reader.pages]
#             raw = "\n".join(pages)
#             if not raw.strip():
#                 print(f"     ⚠  No text extracted from {os.path.basename(path)}")
#             return self._clean_pdf_text(raw)
#         except Exception as e:
#             print(f"     ✗  Error reading {os.path.basename(path)}: {e}")
#             return ""

#     def _clean_pdf_text(self, text: str) -> str:
#         text = re.sub(r'([a-z])([A-Z])',  r'\1 \2', text)
#         text = re.sub(r'([a-zA-Z])(\d)',  r'\1 \2', text)
#         text = re.sub(r'(\d)([a-zA-Z])',  r'\1 \2', text)
#         text = re.sub(r'[^\x00-\x7F]+',  ' ',      text)
#         text = re.sub(r'[ \t]+',          ' ',      text)
#         text = re.sub(r'\n{3,}',          '\n\n',   text)
#         return text.strip()

#     # ── Tokenization ──────────────────────────────────────────────────────────
#     def stem(self, word: str) -> str:
#         return self.stemmer.stem(self.lemmatizer.lemmatize(word.lower()))

#     def token_set(self, text: str) -> set:
#         tokens = re.findall(r'\b[a-z][a-z0-9\+\#\.\/]{1,}\b', text.lower())
#         return {self.stem(t) for t in tokens if t not in NOISE and len(t) > 2}

#     # ── Core skill matcher ────────────────────────────────────────────────────
#     def match_skill(self, skill: str, resume_text: str, resume_stems: set) -> bool:
#         sl = skill.lower().strip()
#         rl = resume_text.lower()

#         if sl in rl:                                               return True
#         if re.search(r'\b' + re.escape(sl) + r'\b', rl):         return True
#         if ' ' not in sl and self.stem(sl) in resume_stems:       return True

#         words      = sl.split()
#         meaningful = [w for w in words if len(w) > 2 and w not in NOISE]
#         if len(meaningful) >= 2 and all(
#             re.search(r'\b' + re.escape(w) + r'\b', rl) for w in meaningful
#         ):
#             return True

#         if len(sl) <= 6 and re.search(r'\b' + re.escape(sl) + r'\b', rl):
#             return True

#         for canonical, aliases in SKILL_ALIASES.items():
#             if sl == canonical or sl in aliases:
#                 if any(re.search(r'\b' + re.escape(t) + r'\b', rl)
#                        for t in [canonical] + aliases):
#                     return True

#         return False

#     # ── WEIGHTED coverage scorer — KEY INNOVATION ─────────────────────────────
#     def weighted_coverage(self, resume_text: str,
#                           weighted_skills: List[Tuple[str, int]]) -> Dict:
#         """
#         Score using skill weights.
#         matched_score = sum of weights of matched skills
#         total_score   = sum of all weights
#         percentage    = matched_score / total_score * 100
#         """
#         if not weighted_skills:
#             return {'score': 0.0, 'matched': [], 'missing': [],
#                     'matched_weight': 0, 'total_weight': 0}

#         stems = self.token_set(resume_text)
#         matched, missing = [], []
#         matched_weight, total_weight = 0, 0

#         for skill, weight in weighted_skills:
#             total_weight += weight
#             if self.match_skill(skill, resume_text, stems):
#                 matched.append((skill, weight))
#                 matched_weight += weight
#             else:
#                 missing.append((skill, weight))

#         score = round(matched_weight / total_weight * 100, 1) if total_weight > 0 else 0.0

#         return {
#             'score':          score,
#             'matched':        matched,          # [(skill, weight), ...]
#             'missing':        missing,           # [(skill, weight), ...]
#             'matched_weight': matched_weight,
#             'total_weight':   total_weight,
#         }

#     # ── ATS keyword coverage (unweighted, simple match) ───────────────────────
#     def ats_coverage(self, resume_text: str, keywords: List[str]) -> Dict:
#         if not keywords:
#             return {'score': 0.0, 'matched': [], 'missing': [], 'total': 0}
#         stems   = self.token_set(resume_text)
#         matched = [k for k in keywords if     self.match_skill(k, resume_text, stems)]
#         missing = [k for k in keywords if not self.match_skill(k, resume_text, stems)]
#         return {
#             'score':   round(len(matched) / len(keywords) * 100, 1),
#             'matched': matched,
#             'missing': missing,
#             'total':   len(keywords),
#         }

#     # ── Responsibilities scorer ───────────────────────────────────────────────
#     def responsibilities_score(self, resume_text: str,
#                                responsibilities: List[str]) -> Dict:
#         if not responsibilities:
#             return {'score': 0.0, 'matched': [], 'missing': []}
#         resume_lower = resume_text.lower()
#         matched, missing = [], []
#         for resp in responsibilities:
#             words = re.findall(r'\b[a-z][a-z0-9\+\#\.]{2,}\b', resp.lower())
#             words = [w for w in words if w not in NOISE]
#             if not words:
#                 continue
#             found = [w for w in words if re.search(r'\b' + re.escape(w) + r'\b', resume_lower)]
#             if len(found) / len(words) >= 0.5:
#                 matched.append(resp[:70])
#             else:
#                 missing.append(resp[:70])
#         total = len(matched) + len(missing)
#         return {
#             'score':   round(len(matched) / total * 100, 1) if total > 0 else 0.0,
#             'matched': matched,
#             'missing': missing,
#             'total':   total,
#         }

#     # ── Experience ────────────────────────────────────────────────────────────
#     def extract_experience(self, text: str) -> Tuple[float, bool]:
#         tl = text.lower()
#         for pat in [
#             r'(\d+\.?\d*)\+?\s*years?\s*(?:of\s*)?(?:professional\s*|work\s*|industry\s*)?experience',
#             r'experience\s*[:\-]\s*(\d+\.?\d*)\+?\s*years?',
#             r'(\d+\.?\d*)\s*yrs?\s*(?:of\s*)?(?:professional\s*)?experience',
#         ]:
#             m = re.search(pat, tl)
#             if m:
#                 yrs = float(m.group(1))
#                 return yrs, (yrs == 0.0)
#         has_work = any(s in tl for s in WORK_EXP_SIGNALS)
#         return (1.0, False) if has_work else (0.0, True)

#     # ── Education ─────────────────────────────────────────────────────────────
#     def extract_education(self, text: str) -> Dict:
#         edu = {k: False for k in DEGREE_KEYWORDS}
#         edu['certifications'] = []
#         t = text.lower()
#         for level, kws in DEGREE_KEYWORDS.items():
#             if any(k in t for k in kws):
#                 edu[level] = True
#         for m in re.finditer(r'(?:certified|certification|certificate)\s+(?:in\s+)?([a-z][a-z\s]{2,35})', t):
#             cert = m.group(1).strip()
#             if cert not in edu['certifications']:
#                 edu['certifications'].append(cert)
#         return edu

#     def education_score(self, edu: Dict) -> float:
#         base = 100 if edu.get('phd') else 85 if edu.get('masters') else \
#                70 if edu.get('bachelors') else 50 if edu.get('diploma') else 0
#         return min(base + len(edu.get('certifications', [])) * 5, 100)

#     # ── MAIN ranking ──────────────────────────────────────────────────────────
#     def rank_candidates(self, resumes_folder: str, role_data: Dict,
#                         role_title: str = "Job", role_is_fresher: bool = True,
#                         weights: Dict = None) -> pd.DataFrame:

#         if weights is None:
#             weights = WEIGHTS_FRESHER if role_is_fresher else WEIGHTS_EXPERIENCED

#         mode = 'Fresher' if role_is_fresher else 'Experienced'
#         print(f"\n  Role   : {role_title}")
#         print(f"  Mode   : {mode}")
#         print(f"\n  Skill Tiers (weighted):")
#         for key, label, dot in [
#             ('must_have',    'MUST Have',    '🔴'),
#             ('good_to_have', 'GOOD To Have', '🟡'),
#             ('nice_to_have', 'NICE To Have', '🟢'),
#             ('core_concepts','Core Concepts','🔵'),
#         ]:
#             items = role_data.get(key, [])
#             total_w = sum(w for _, w in items)
#             w_pct   = int(weights.get(key, 0) * 100)
#             skills_preview = ", ".join(f"{s}({w})" for s,w in items[:4])
#             print(f"    {dot} {label:<16} {len(items):>2} skills  total_w={total_w}  tier_w={w_pct}%  [{skills_preview}...]")
#         print(f"\n  Tier Weights:")
#         for k, v in weights.items():
#             if v > 0:
#                 print(f"    {k:<16} {int(v*100):>3}%  {'▓'*int(v*40)}")
#         print("-" * 70)

#         pdf_files = [f for f in os.listdir(resumes_folder) if f.lower().endswith('.pdf')]
#         if not pdf_files:
#             print(f"  ⚠  No PDF resumes in: {resumes_folder}")
#             return pd.DataFrame()

#         print(f"\n  {len(pdf_files)} resume(s) found. Scanning...\n")
#         candidates = []

#         for fname in sorted(pdf_files):
#             path   = os.path.join(resumes_folder, fname)
#             print(f"  ┌─ {fname}")

#             resume = self.extract_text_from_pdf(path)
#             if not resume.strip():
#                 print(f"  └─ ⚠  Skipped.\n")
#                 continue

#             must_r = self.weighted_coverage(resume, role_data['must_have'])
#             good_r = self.weighted_coverage(resume, role_data['good_to_have'])
#             nice_r = self.weighted_coverage(resume, role_data['nice_to_have'])
#             conc_r = self.weighted_coverage(resume, role_data['core_concepts'])
#             ats_r  = self.ats_coverage(resume,      role_data['ats_keywords'])
#             resp_r = self.responsibilities_score(resume, role_data['responsibilities'])
#             edu    = self.extract_education(resume)
#             edu_s  = self.education_score(edu)
#             exp_yrs, is_fresher = self.extract_experience(resume)

#             final = round(
#                 must_r['score'] * weights['must_have']      +
#                 good_r['score'] * weights['good_to_have']   +
#                 ats_r['score']  * weights['ats_keywords']   +
#                 conc_r['score'] * weights['core_concepts']  +
#                 resp_r['score'] * weights['responsibilities']+
#                 nice_r['score'] * weights['nice_to_have']   +
#                 edu_s           * weights.get('education', 0),
#                 1
#             )

#             exp_tag = "Fresher ✓" if is_fresher else f"{exp_yrs:.1f} yrs"

#             def _fmt_w(r, label, wkey, dot='  '):
#                 pct = r['score']
#                 w   = int(weights.get(wkey, 0) * 100)
#                 mw  = r.get('matched_weight', len(r.get('matched',[])))
#                 tw  = r.get('total_weight',   len(r.get('matched',[])) + len(r.get('missing',[])))
#                 bar = '▪' * int(pct / 10)
#                 return f"  │ {dot} {label:<18} {pct:>5.1f}%  (w:{mw}/{tw})  tier={w}%  {bar}"

#             def _fmt_ats(r, label, wkey, dot='  '):
#                 pct = r['score']
#                 w   = int(weights.get(wkey, 0) * 100)
#                 bar = '▪' * int(pct / 10)
#                 return f"  │ {dot} {label:<18} {pct:>5.1f}%  ({len(r['matched'])}/{r['total']})  tier={w}%  {bar}"

#             print(_fmt_w(must_r,  'Must Have',     'must_have',      '🔴'))
#             print(_fmt_w(good_r,  'Good To Have',  'good_to_have',   '🟡'))
#             print(_fmt_ats(ats_r, 'ATS Keywords',  'ats_keywords',   '⚪'))
#             print(_fmt_w(conc_r,  'Core Concepts', 'core_concepts',  '🔵'))
#             print(_fmt_ats(resp_r,'Responsibilities','responsibilities','  '))
#             print(_fmt_w(nice_r,  'Nice To Have',  'nice_to_have',   '🟢'))
#             edu_w = int(weights.get('education', 0) * 100)
#             print(f"  │     {'Education':<18} {edu_s:>5.1f}%  w={edu_w}%")
#             print(f"  │     {'Experience':<18}         [{exp_tag}]")
#             print(f"  └─ FINAL SCORE        : {final:>5.1f}%\n")

#             # Feedback — show by weight descending (most important missing first)
#             miss_must = sorted(must_r['missing'], key=lambda x: -x[1])
#             miss_good = sorted(good_r['missing'], key=lambda x: -x[1])[:4]
#             if miss_must:
#                 skills_str = ", ".join(f"{s}(w{w})" for s,w in miss_must)
#                 print(f"     🔴 Missing Must-Have    : {skills_str}")
#             if miss_good:
#                 skills_str = ", ".join(f"{s}(w{w})" for s,w in miss_good)
#                 print(f"     🟡 Missing Good-To-Have : {skills_str}")
#             matched_good = sorted(good_r['matched'], key=lambda x: -x[1])[:5]
#             matched_nice = sorted(nice_r['matched'], key=lambda x: -x[1])[:4]
#             if matched_good:
#                 print(f"     🟡 Good-To-Have Found   : {', '.join(s for s,_ in matched_good)}")
#             if matched_nice:
#                 print(f"     🟢 Nice-To-Have Found   : {', '.join(s for s,_ in matched_nice)}")
#             print()

#             candidates.append({
#                 'Candidate':            fname.replace('.pdf', ''),
#                 'Final Score':          final,
#                 'Must Have %':          must_r['score'],
#                 'Good To Have %':       good_r['score'],
#                 'ATS Match %':          ats_r['score'],
#                 'Core Concepts %':      conc_r['score'],
#                 'Responsibilities %':   resp_r['score'],
#                 'Nice To Have %':       nice_r['score'],
#                 'Education Score':      edu_s,
#                 'Experience (yrs)':     round(exp_yrs, 1),
#                 'Is Fresher':           is_fresher,
#                 'Must Weight Score':    f"{must_r['matched_weight']}/{must_r['total_weight']}",
#                 'Good Weight Score':    f"{good_r['matched_weight']}/{good_r['total_weight']}",
#                 'ATS Matched':          f"{len(ats_r['matched'])}/{ats_r['total']}",
#                 'Missing Must Have':    ", ".join(f"{s}(w{w})" for s,w in miss_must),
#                 'Missing Good To Have': ", ".join(f"{s}(w{w})" for s,w in miss_good),
#                 'Nice To Have Matched': ", ".join(s for s,_ in matched_nice),
#                 'Good To Have Matched': ", ".join(s for s,_ in matched_good),
#                 'Has Degree':           any(edu.get(k) for k in ['bachelors','masters','phd']),
#                 'Certifications':       len(edu.get('certifications', [])),
#                 'Rank':                 0,
#             })

#         if not candidates:
#             print("  No candidates processed.")
#             return pd.DataFrame()

#         df = pd.DataFrame(candidates).sort_values('Final Score', ascending=False)
#         df['Rank'] = range(1, len(df) + 1)
#         return df


#     def rank_candidates_from_paths(self, resume_paths: list, role_data: Dict,
#                                role_title: str = "Job",
#                                role_is_fresher: bool = True,
#                                weights: Dict = None):

#         if weights is None:
#             weights = WEIGHTS_FRESHER if role_is_fresher else WEIGHTS_EXPERIENCED

#         candidates = []

#         for path in resume_paths:

#             fname = os.path.basename(path)

#             print(f"Scanning: {fname}")

#             resume = self.extract_text_from_pdf(path)

#             if not resume.strip():
#                 continue

#             must_r = self.weighted_coverage(resume, role_data['must_have'])
#             good_r = self.weighted_coverage(resume, role_data['good_to_have'])
#             nice_r = self.weighted_coverage(resume, role_data['nice_to_have'])
#             conc_r = self.weighted_coverage(resume, role_data['core_concepts'])
#             ats_r  = self.ats_coverage(resume, role_data['ats_keywords'])
#             resp_r = self.responsibilities_score(resume, role_data['responsibilities'])

#             edu = self.extract_education(resume)
#             edu_s = self.education_score(edu)

#             exp_yrs, is_fresher = self.extract_experience(resume)

#             final = round(
#                 must_r['score'] * weights['must_have'] +
#                 good_r['score'] * weights['good_to_have'] +
#                 ats_r['score']  * weights['ats_keywords'] +
#                 conc_r['score'] * weights['core_concepts'] +
#                 resp_r['score'] * weights['responsibilities'] +
#                 nice_r['score'] * weights['nice_to_have'] +
#                 edu_s * weights.get('education', 0),
#                 1
#             )

#             candidates.append({
#                 "Candidate": fname.replace(".pdf",""),
#                 "Final Score": final,
#                 "Must Have %": must_r['score'],
#                 "Good To Have %": good_r['score'],
#                 "ATS Match %": ats_r['score'],
#                 "Core Concepts %": conc_r['score'],
#                 "Responsibilities %": resp_r['score'],
#                 "Nice To Have %": nice_r['score'],
#                 "Education Score": edu_s,
#                 "Experience (yrs)": exp_yrs
#             })

#         if not candidates:
#             return pd.DataFrame()

#         df = pd.DataFrame(candidates).sort_values("Final Score", ascending=False)

#         df["Rank"] = range(1, len(df)+1)

#         return df
#     # ── Report ────────────────────────────────────────────────────────────────
#     def generate_report(self, df: pd.DataFrame,
#                         output_file: str = 'candidate_rankings.csv') -> str:
#         if df.empty:
#             return output_file
#         df.to_csv(output_file, index=False)

#         print("\n" + "=" * 70)
#         print("                  FINAL CANDIDATE RANKINGS")
#         print("=" * 70)
#         print(f"  {'Rank':<5} {'Candidate':<32} {'Score':>6}  {'Bar'}")
#         print("-" * 70)
#         for _, row in df.iterrows():
#             bar   = '█' * int(row['Final Score'] / 5)
#             badge = ' [Fresher]' if row.get('Is Fresher') else ''
#             print(f"  #{row['Rank']:<4} {str(row['Candidate'])[:31]:<32} "
#                   f"{row['Final Score']:>5.1f}%  {bar}{badge}")
#         print("=" * 70)

#         top = df.iloc[0]
#         print(f"\n  ★  Top Candidate : {top['Candidate']}")
#         print(f"  {'-'*55}")
#         for col, label, dot in [
#             ('Must Have %',        'Must Have',        '🔴'),
#             ('Good To Have %',     'Good To Have',     '🟡'),
#             ('ATS Match %',        'ATS Keywords',     '⚪'),
#             ('Core Concepts %',    'Core Concepts',    '🔵'),
#             ('Responsibilities %', 'Responsibilities', '  '),
#             ('Nice To Have %',     'Nice To Have',     '🟢'),
#             ('Education Score',    'Education',        '  '),
#         ]:
#             val = top.get(col, 0)
#             bar = '▒' * int(val / 5)
#             print(f"  {dot} {label:<20} {val:>5.1f}%  {bar}")

#         exp_tag = '(Fresher)' if top.get('Is Fresher') else f"{top['Experience (yrs)']} yrs"
#         print(f"     {'Experience':<20} {exp_tag}")
#         print(f"\n  Must Weight Score : {top['Must Weight Score']}")
#         print(f"  Good Weight Score : {top['Good Weight Score']}")
#         print(f"  ATS Matched       : {top['ATS Matched']}")
#         if top['Missing Must Have']:
#             print(f"  🔴 Missing Must   : {top['Missing Must Have']}")
#         if top['Missing Good To Have']:
#             print(f"  🟡 Missing Good   : {top['Missing Good To Have']}")
#         if top['Nice To Have Matched']:
#             print(f"  🟢 Nice Matched   : {top['Nice To Have Matched']}")

#         print(f"\n  ✓  Saved to: {output_file}")
#         return output_file


# # ─────────────────────────────────────────────────────────────────────────────
# def main():
#     parser = argparse.ArgumentParser(
#         description='HR ATS Resume Ranking System v11 — Weighted Skill Scoring'
#     )
#     parser.add_argument('--resumes',     default=r"C:\Users\ASUS\Desktop\data")
#     parser.add_argument('--dataset',     default=None,
#                         help='Path to ats_weighted_v2.csv (default: same folder as script)')
#     parser.add_argument('--role',        type=str)
#     parser.add_argument('--role-id',     type=int)
#     parser.add_argument('--output',      default='candidate_rankings.csv')
#     parser.add_argument('--list',        action='store_true')
#     parser.add_argument('--fresher',     action='store_true')
#     parser.add_argument('--experienced', action='store_true')
#     args = parser.parse_args()

#     print("\n  HR ATS Resume Ranking System — v11")
#     print("  Weighted Skills: Python:10|Django:9|SQL:8 → Score by importance")
#     print("=" * 70)

#     db     = JobRolesDB(args.dataset)
#     system = ResumeRankingSystem()

#     if not db.roles:
#         print("  No roles loaded.")
#         return

#     if args.list:
#         db.list_roles()
#         return

#     os.makedirs(args.resumes, exist_ok=True)
#     role = None

#     if args.role_id:
#         role = db.get_by_id(args.role_id)
#         if not role:
#             print(f"  ⚠  Role ID {args.role_id} not found.")
#             db.list_roles(); return

#     elif args.role:
#         role = db.get_by_title(args.role)
#         if not role:
#             print(f"  ⚠  Role '{args.role}' not found.")
#             db.list_roles(); return

#     else:
#         db.list_roles()
#         choice = input("  Enter Role ID or partial name: ").strip()
#         role   = db.get_by_id(int(choice)) if choice.isdigit() else db.get_by_title(choice)
#         if not role:
#             print(f"  ⚠  '{choice}' not found.")
#             return

#     role_is_fresher = args.fresher or (not args.experienced and db.is_fresher_role(role))
#     weights   = WEIGHTS_FRESHER if role_is_fresher else WEIGHTS_EXPERIENCED
#     role_data = db.build_role_data(role)

#     print(f"\n  experience_level : \"{role.get('experience_level', 'N/A')}\"")
#     print(f"  Scoring mode     : {'Fresher' if role_is_fresher else 'Experienced'}")

#     rankings = system.rank_candidates(
#         resumes_folder  = args.resumes,
#         role_data       = role_data,
#         role_title      = role['job_title'],
#         role_is_fresher = role_is_fresher,
#         weights         = weights,
#     )
#     if not rankings.empty:
#         system.generate_report(rankings, args.output)

#     return rankings


# if __name__ == "__main__":
#     main()

# def run_ats(resume_paths, role_title):

#     db = JobRolesDB()
#     system = ResumeRankingSystem()

#     role = db.get_by_title(role_title)

#     if not role:
#         return None

#     role_data = db.build_role_data(role)

#     rankings = system.rank_candidates_from_paths(
#         resume_paths,
#         role_data,
#         role_title,
#         db.is_fresher_role(role)
#     )

#     return rankings






















































# """
# applications/atsengine.py  — COMPLETE SELF-CONTAINED FILE
# ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

# Yeh file COMPLETE hai — sec_v11.py ka koi bhi import NAHI chahiye.
# Sab kuch (NOISE, SKILL_ALIASES, scoring logic, PDF extraction) ek hi jagah hai.

# PLACE THIS FILE AT:   your_project/applications/atsengine.py

# PROJECT STRUCTURE:
#     your_project/
#     ├── manage.py
#     ├── linkedin_style_ats_roles_weighted.csv   ← project root mein
#     └── applications/
#         ├── views.py
#         ├── models.py
#         └── atsengine.py                        ← YEH FILE

# VIEWS.PY MEIN AISE USE KARO:
#     from .atsengine import run_ats

#     def ats_ranking(request, job_id):
#         job          = get_object_or_404(Job, id=job_id)
#         applications = Application.objects.filter(job=job)

#         resume_paths = []
#         for app in applications:
#             if app.resume_url:
#                 path = os.path.join(settings.MEDIA_ROOT, str(app.resume_url))
#                 if os.path.exists(path):
#                     resume_paths.append(path)

#         rankings = run_ats(resume_paths, job.job_title)

#         if rankings is None or rankings.empty:
#             return JsonResponse({"error": "ATS ranking failed"}, status=500)

#         return JsonResponse(rankings.to_dict(orient="records"), safe=False)
# """

# import os
# import re
# import sys
# import shutil
# import tempfile
# from typing import List, Dict, Tuple
# import django
# from django.conf import settings as django_settings


# import nltk
# import PyPDF2
# import pandas as pd

# nltk.download('punkt',                      quiet=True)
# nltk.download('stopwords',                  quiet=True)
# nltk.download('wordnet',                    quiet=True)
# nltk.download('averaged_perceptron_tagger', quiet=True)
# nltk.download('punkt_tab',                  quiet=True)

# from nltk.corpus import stopwords
# from nltk.stem   import WordNetLemmatizer, PorterStemmer


# # ─────────────────────────────────────────────────────────────────────────────
# # PATHS
# # ─────────────────────────────────────────────────────────────────────────────

# # applications/atsengine.py  →  dirname(dirname) = project root
# BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))

# # CSV must be placed in project root (same folder as manage.py)
# # atsengine.py ke top pe — CSV_PATH wali line REPLACE karo with this:


# def _get_csv_path():
#     try:
#         return os.path.join(str(django_settings.BASE_DIR), "linkedin_style_ats_roles_weighted.csv")
#     except Exception:
#         return os.path.join(os.path.dirname(os.path.dirname(os.path.abspath(__file__))), "linkedin_style_ats_roles_weighted.csv")

# CSV_PATH = _get_csv_path()

# # ─────────────────────────────────────────────────────────────────────────────
# # CONSTANTS  (copied from sec_v11.py — no import needed)
# # ─────────────────────────────────────────────────────────────────────────────

# NOISE = {
#     'the','a','an','in','of','and','or','to','for','with','is','are','be','by',
#     'on','at','as','we','our','you','your','their','will','must','can','have',
#     'has','had','this','that','these','such','all','any','more','than','very',
#     'join','looking','help','make','ensure','work','using','use','also','able',
#     'following','include','including','across','within','both','each','other',
#     'developer','development','team','company','role','position','candidate',
#     'strong','good','excellent','great','highly','well','effectively',
#     'required','preferred','responsibilities','qualifications','bonus','skills',
#     'experience','knowledge','familiarity','ability','understanding','proficiency',
#     'minimum','plus','years','year','related','field','degree','equivalent',
#     'provide','build','design','implement','maintain','develop','create','manage',
#     'collaborate','communicate','support','ensure','analyze','deliver','drive',
# }

# DEGREE_KEYWORDS = {
#     'phd':       ['phd', 'ph.d', 'doctorate', 'doctoral'],
#     'masters':   ['master', 'm.tech', 'm.s', 'msc', 'mba', 'mca', 'm.com', 'postgraduate'],
#     'bachelors': ['bachelor', 'b.tech', 'b.e', 'bsc', 'bba', 'bca', 'b.com',
#                   'b.s', 'llb', 'undergraduate', 'b.a'],
#     'diploma':   ['diploma', 'associate', 'certificate course'],
# }

# WORK_EXP_SIGNALS = [
#     'internship', 'intern at', 'full-time', 'part-time', 'freelance',
#     'consultant', 'contract', 'worked at', 'working at', 'employment',
#     'employed', 'job title', 'position held',
# ]

# FRESHER_INDICATORS = ['fresher', '0-2', '0-1', 'entry', 'junior', 'graduate']

# SKILL_ALIASES = {
#     'django rest framework': ['drf', 'django rest', 'djangorestframework'],
#     'javascript':            ['js', 'es6', 'es6+', 'ecmascript'],
#     'typescript':            ['ts'],
#     'postgresql':            ['postgres', 'psql'],
#     'node.js':               ['nodejs', 'node js'],
#     'react.js':              ['reactjs', 'react js', 'react'],
#     'express.js':            ['expressjs', 'express js', 'express'],
#     'python':                ['py'],
#     'rest apis':             ['rest api', 'restful', 'restful api', 'rest'],
#     'oop':                   ['object oriented', 'object-oriented', 'oops'],
#     'ci/cd':                 ['continuous integration', 'cicd', 'jenkins', 'github actions'],
#     'git':                   ['github', 'gitlab', 'version control', 'vcs'],
#     'machine learning':      ['ml'],
#     'unit testing':          ['unittest', 'unit test', 'pytest', 'jest', 'junit'],
#     'sql':                   ['mysql', 'postgresql', 'sqlite', 'sqlite3'],
#     'linux':                 ['ubuntu', 'debian', 'centos', 'unix', 'bash'],
#     'problem solving':       ['problem-solving', 'analytical', 'debugging'],
#     'algorithms':            ['algorithm', 'dsa', 'data structures and algorithms'],
#     'data structures':       ['dsa', 'data structure'],
#     'mvc':                   ['mvt', 'model view', 'model-view'],
#     'authentication':        ['auth', 'jwt', 'oauth', 'login', 'session'],
#     'docker':                ['containerization', 'container'],
#     'spring boot':           ['springboot', 'spring-boot'],
#     'next.js':               ['nextjs', 'next js'],
#     'vue.js':                ['vuejs', 'vue js', 'vue'],
#     'mongodb':               ['mongo'],
#     'kubernetes':            ['k8s'],
#     'redux':                 ['redux toolkit', 'react-redux'],
#     'tailwind css':          ['tailwind', 'tailwindcss'],
#     'orm':                   ['sqlalchemy', 'hibernate', 'activerecord', 'eloquent', 'mongoose', 'typeorm'],
#     'state management':      ['redux', 'vuex', 'ngrx', 'bloc', 'provider', 'mobx'],
#     'jpa/hibernate':         ['jpa', 'hibernate', 'spring data'],
#     'jpa':                   ['hibernate', 'spring data jpa'],
#     'activerecord':          ['active record', 'rails orm'],
#     'eloquent orm':          ['eloquent', 'laravel orm'],
#     'vuex':                  ['vue store', 'pinia'],
#     'ngrx':                  ['angular store', 'ng-rx'],
#     'rxjs':                  ['reactive extensions', 'observables'],
#     'jest':                  ['jtest', 'js testing'],
#     'collections':           ['collections framework', 'java collections'],
#     'collections framework': ['collections', 'java collections', 'arraylist', 'hashmap'],
#     'jsx':                   ['react jsx', 'javascript xml'],
#     'ssr':                   ['server side rendering', 'server-side rendering', 'next.js ssr'],
#     'ssg':                   ['static site generation', 'static generation'],
#     'vue cli':               ['vue-cli', '@vue/cli'],
#     'gin':                   ['gin framework', 'gin-gonic'],
#     'actix':                 ['actix-web', 'actix web'],
#     'tokio':                 ['async rust', 'rust async'],
#     'cargo':                 ['rust cargo', 'crates.io'],
#     'memory management':     ['ownership', 'borrowing', 'lifetimes', 'borrow checker'],
#     'concurrency':           ['goroutines', 'threads', 'async', 'parallel'],
#     'systems programming':   ['system programming', 'low-level', 'kernel'],
#     'rest architecture':     ['rest api', 'restful', 'rest apis', 'http'],
#     'oop principles':        ['oop', 'object oriented', 'encapsulation', 'inheritance', 'polymorphism'],
#     'solid principles':      ['solid', 'single responsibility', 'open closed'],
#     'design patterns':       ['factory pattern', 'singleton', 'observer pattern'],
#     'system design':         ['system architecture', 'high level design', 'hld'],
#     'distributed systems':   ['distributed computing', 'distributed architecture'],
#     'scalability':           ['horizontal scaling', 'vertical scaling', 'load balancing'],
#     'microservices':         ['microservice', 'micro services', 'service mesh'],
#     'django mvt pattern':    ['django mvt', 'mvt', 'model view template'],
#     'orm concepts':          ['orm', 'object relational mapping', 'database abstraction'],
#     'component architecture':['component design', 'react components', 'vue components'],
#     'virtual dom':           ['vdom', 'virtual document object model'],
#     'reactive programming':  ['rxjs', 'observables', 'reactive', 'streams'],
#     'event loop':            ['javascript event loop', 'node.js event loop', 'async event loop'],
#     'goroutines':            ['go routines', 'go concurrency', 'concurrent goroutines'],
#     'channels':              ['go channels', 'channel communication'],
#     'type system':           ['typescript types', 'static typing', 'type checking'],
#     'generics':              ['typescript generics', 'generic programming'],
#     'ownership model':       ['rust ownership', 'ownership borrowing', 'borrow checker'],
#     'lifetimes':             ['rust lifetimes', 'lifetime annotations'],
#     'ml algorithms':         ['machine learning algorithms', 'supervised learning', 'unsupervised learning'],
#     'model evaluation':      ['model metrics', 'accuracy', 'f1 score', 'precision recall'],
#     'feature engineering':   ['feature extraction', 'feature selection', 'data features'],
#     'rag architecture':      ['rag', 'retrieval augmented generation', 'retrieval augmented'],
#     'generative ai':         ['genai', 'gen ai', 'llm', 'large language model'],
#     'prompt engineering':    ['prompt design', 'prompting', 'prompt optimization'],
#     'nextauth':              ['next auth', 'next.js authentication'],
#     'prisma':                ['prisma orm', 'prisma client'],
#     'vector databases':      ['vector db', 'chroma', 'pinecone', 'weaviate', 'faiss'],
#     'transformers':          ['hugging face transformers', 'transformer models', 'bert', 'gpt'],
#     'jpa/orm':               ['jpa', 'hibernate', 'spring data'],
#     'spring framework':      ['spring', 'spring boot', 'spring mvc'],
#     'dependency injection':  ['di', 'ioc', 'inversion of control'],
#     'rails':                 ['ruby on rails', 'ror'],
#     'laravel':               ['laravel framework', 'php laravel'],
#     'ssr/ssg/isr':           ['ssr', 'ssg', 'isr', 'server side rendering', 'static generation'],
# }

# # ── Scoring weight profiles ───────────────────────────────────────────────────
# WEIGHTS_FRESHER = {
#     'must_have':        0.50,
#     'good_to_have':     0.20,
#     'ats_keywords':     0.15,
#     'core_concepts':    0.08,
#     'responsibilities': 0.04,
#     'nice_to_have':     0.03,
#     'education':        0.00,
# }

# WEIGHTS_EXPERIENCED = {
#     'must_have':        0.35,
#     'good_to_have':     0.20,
#     'ats_keywords':     0.15,
#     'nice_to_have':     0.12,
#     'core_concepts':    0.08,
#     'responsibilities': 0.05,
#     'education':        0.05,
# }


# # ─────────────────────────────────────────────────────────────────────────────
# # CSV LOADER  (JobRolesDB logic — inline)
# # ─────────────────────────────────────────────────────────────────────────────

# def _parse_weighted(cell: str) -> List[Tuple[str, int]]:
#     """'Python:10|Django:9|SQL:8' → [('Python',10), ('Django',9), ('SQL',8)]"""
#     if not cell or str(cell).strip() == "":
#         return []
#     result = []
#     for item in str(cell).split("|"):
#         item = item.strip()
#         if not item:
#             continue
#         if ":" in item:
#             parts = item.rsplit(":", 1)
#             skill = parts[0].strip()
#             try:
#                 weight = int(parts[1].strip())
#             except ValueError:
#                 weight = 5
#         else:
#             skill, weight = item, 5
#         if skill:
#             result.append((skill, weight))
#     return result


# def _parse_ats_keywords(cell: str) -> List[str]:
#     """'python, django, drf' → ['python', 'django', 'drf']"""
#     if not cell or str(cell).strip() == "":
#         return []
#     return [s.strip().lower() for s in str(cell).split(",") if s.strip()]


# def _parse_responsibilities(cell: str) -> List[str]:
#     """'Build REST APIs|Write unit tests' → ['Build REST APIs', 'Write unit tests']"""
#     if not cell or str(cell).strip() == "":
#         return []
#     return [s.strip() for s in str(cell).split("|") if s.strip()]


# def _load_roles(csv_path: str) -> List[Dict]:
#     """Load all rows from CSV into list of dicts."""
#     if not os.path.exists(csv_path):
#         print(f"[ATS ERROR] CSV not found: {csv_path}")
#         return []
#     df = pd.read_csv(csv_path).fillna("")
#     roles = df.to_dict(orient="records")
#     print(f"[ATS] Loaded {len(roles)} roles from {os.path.basename(csv_path)}")
#     return roles


# def _get_role_by_title(roles: List[Dict], title: str) -> Dict:
#     """Exact match first, then partial match."""
#     t = title.lower().strip()
#     # exact match
#     for r in roles:
#         if r.get("job_title", "").lower() == t:
#             return r
#     # partial match
#     for r in roles:
#         if t in r.get("job_title", "").lower():
#             return r
#     return None


# def _is_fresher_role(role: Dict) -> bool:
#     return any(i in role.get("experience_level", "").lower()
#                for i in FRESHER_INDICATORS)


# def _build_role_data(role: Dict) -> Dict:
#     """
#     Convert a CSV row dict into role_data dict used by the scoring engine.
#     Handles missing columns gracefully (empty list / empty string).
#     """
#     return {
#         "must_have":        _parse_weighted(role.get("must_have_weighted", "")),
#         "good_to_have":     _parse_weighted(role.get("good_to_have_weighted", "")),
#         "nice_to_have":     _parse_weighted(role.get("nice_to_have_weighted", "")),
#         "core_concepts":    _parse_weighted(role.get("core_concepts_weighted", "")),
#         # These columns may not exist in your CSV — handled safely
#         "ats_keywords":     _parse_ats_keywords(role.get("ats_keywords", "")),
#         "responsibilities": _parse_responsibilities(role.get("key_responsibilities", "")),
#         "education":        role.get("education_requirements", ""),
#         "job_title":        role.get("job_title", ""),
#     }


# # ─────────────────────────────────────────────────────────────────────────────
# # ATS SCORING ENGINE  (ResumeRankingSystem logic — inline)
# # ─────────────────────────────────────────────────────────────────────────────

# class _ATSEngine:
#     """Full ATS scoring engine — extracted from sec_v11.ResumeRankingSystem."""

#     def __init__(self):
#         self.stop_words = set(stopwords.words("english"))
#         self.lemmatizer = WordNetLemmatizer()
#         self.stemmer    = PorterStemmer()

#     # ── PDF text extraction ────────────────────────────────────────────────────
#     def extract_text(self, path: str) -> str:
#         try:
#             with open(path, "rb") as f:
#                 reader = PyPDF2.PdfReader(f)
#                 pages  = [p.extract_text() or "" for p in reader.pages]
#             raw = "\n".join(pages)
#             if not raw.strip():
#                 print(f"[ATS WARNING] No text extracted from: {os.path.basename(path)}")
#             return self._clean(raw)
#         except Exception as e:
#             print(f"[ATS ERROR] Cannot read {os.path.basename(path)}: {e}")
#             return ""

#     def _clean(self, text: str) -> str:
#         text = re.sub(r"([a-z])([A-Z])",  r"\1 \2", text)
#         text = re.sub(r"([a-zA-Z])(\d)",  r"\1 \2", text)
#         text = re.sub(r"(\d)([a-zA-Z])",  r"\1 \2", text)
#         text = re.sub(r"[^\x00-\x7F]+",  " ",       text)
#         text = re.sub(r"[ \t]+",          " ",       text)
#         text = re.sub(r"\n{3,}",          "\n\n",    text)
#         return text.strip()

#     # ── Tokenisation ──────────────────────────────────────────────────────────
#     def _stem(self, word: str) -> str:
#         return self.stemmer.stem(self.lemmatizer.lemmatize(word.lower()))

#     def _token_set(self, text: str) -> set:
#         tokens = re.findall(r"\b[a-z][a-z0-9\+\#\.\/]{1,}\b", text.lower())
#         return {self._stem(t) for t in tokens if t not in NOISE and len(t) > 2}

#     # ── Skill matcher ─────────────────────────────────────────────────────────
#     def _match(self, skill: str, resume_text: str, stems: set) -> bool:
#         sl = skill.lower().strip()
#         rl = resume_text.lower()

#         if sl in rl:                                              return True
#         if re.search(r"\b" + re.escape(sl) + r"\b", rl):        return True
#         if " " not in sl and self._stem(sl) in stems:            return True

#         words = [w for w in sl.split() if len(w) > 2 and w not in NOISE]
#         if len(words) >= 2 and all(
#             re.search(r"\b" + re.escape(w) + r"\b", rl) for w in words
#         ):
#             return True

#         if len(sl) <= 6 and re.search(r"\b" + re.escape(sl) + r"\b", rl):
#             return True

#         for canonical, aliases in SKILL_ALIASES.items():
#             if sl == canonical or sl in aliases:
#                 if any(re.search(r"\b" + re.escape(t) + r"\b", rl)
#                        for t in [canonical] + aliases):
#                     return True
#         return False

#     # ── Weighted skill coverage ────────────────────────────────────────────────
#     def _weighted_coverage(self, resume_text: str,
#                             weighted_skills: List[Tuple[str, int]]) -> Dict:
#         if not weighted_skills:
#             return {"score": 0.0, "matched": [], "missing": [],
#                     "matched_weight": 0, "total_weight": 0}
#         stems = self._token_set(resume_text)
#         matched, missing = [], []
#         mw = tw = 0
#         for skill, weight in weighted_skills:
#             tw += weight
#             if self._match(skill, resume_text, stems):
#                 matched.append((skill, weight))
#                 mw += weight
#             else:
#                 missing.append((skill, weight))
#         score = round(mw / tw * 100, 1) if tw > 0 else 0.0
#         return {"score": score, "matched": matched, "missing": missing,
#                 "matched_weight": mw, "total_weight": tw}

#     # ── ATS keyword coverage ──────────────────────────────────────────────────
#     def _ats_coverage(self, resume_text: str, keywords: List[str]) -> Dict:
#         if not keywords:
#             return {"score": 0.0, "matched": [], "missing": [], "total": 0}
#         stems   = self._token_set(resume_text)
#         matched = [k for k in keywords if     self._match(k, resume_text, stems)]
#         missing = [k for k in keywords if not self._match(k, resume_text, stems)]
#         return {
#             "score":   round(len(matched) / len(keywords) * 100, 1),
#             "matched": matched,
#             "missing": missing,
#             "total":   len(keywords),
#         }

#     # ── Responsibilities ──────────────────────────────────────────────────────
#     def _resp_score(self, resume_text: str, responsibilities: List[str]) -> Dict:
#         if not responsibilities:
#             return {"score": 0.0, "matched": [], "missing": []}
#         rl = resume_text.lower()
#         matched, missing = [], []
#         for resp in responsibilities:
#             words = [w for w in re.findall(r"\b[a-z][a-z0-9\+\#\.]{2,}\b",
#                                             resp.lower()) if w not in NOISE]
#             if not words:
#                 continue
#             found = [w for w in words if re.search(r"\b" + re.escape(w) + r"\b", rl)]
#             (matched if len(found) / len(words) >= 0.5 else missing).append(resp[:70])
#         total = len(matched) + len(missing)
#         return {"score": round(len(matched) / total * 100, 1) if total else 0.0,
#                 "matched": matched, "missing": missing}

#     # ── Experience extraction ─────────────────────────────────────────────────
#     def _extract_experience(self, text: str) -> Tuple[float, bool]:
#         tl = text.lower()
#         for pat in [
#             r"(\d+\.?\d*)\+?\s*years?\s*(?:of\s*)?(?:professional\s*|work\s*|industry\s*)?experience",
#             r"experience\s*[:\-]\s*(\d+\.?\d*)\+?\s*years?",
#             r"(\d+\.?\d*)\s*yrs?\s*(?:of\s*)?(?:professional\s*)?experience",
#         ]:
#             m = re.search(pat, tl)
#             if m:
#                 yrs = float(m.group(1))
#                 return yrs, (yrs == 0.0)
#         has_work = any(s in tl for s in WORK_EXP_SIGNALS)
#         return (1.0, False) if has_work else (0.0, True)

#     # ── Education extraction ──────────────────────────────────────────────────
#     def _extract_education(self, text: str) -> Dict:
#         edu = {k: False for k in DEGREE_KEYWORDS}
#         edu["certifications"] = []
#         t = text.lower()
#         for level, kws in DEGREE_KEYWORDS.items():
#             if any(k in t for k in kws):
#                 edu[level] = True
#         for m in re.finditer(
#             r"(?:certified|certification|certificate)\s+(?:in\s+)?([a-z][a-z\s]{2,35})", t
#         ):
#             cert = m.group(1).strip()
#             if cert not in edu["certifications"]:
#                 edu["certifications"].append(cert)
#         return edu

#     def _education_score(self, edu: Dict) -> float:
#         base = 100 if edu.get("phd") else 85 if edu.get("masters") else \
#                70  if edu.get("bachelors") else 50 if edu.get("diploma") else 0
#         return min(base + len(edu.get("certifications", [])) * 5, 100)

#     # ── MAIN: score one resume ────────────────────────────────────────────────
#     def score_resume(self, resume_path: str, role_data: Dict,
#                      weights: Dict) -> Dict:
#         """
#         Score a single PDF resume against role_data using weights.
#         Returns a flat dict (one row of the final rankings DataFrame).
#         """
#         fname  = os.path.basename(resume_path)
#         text   = self.extract_text(resume_path)
#         if not text.strip():
#             print(f"[ATS] Skipped (empty text): {fname}")
#             return None

#         must_r = self._weighted_coverage(text, role_data["must_have"])
#         good_r = self._weighted_coverage(text, role_data["good_to_have"])
#         nice_r = self._weighted_coverage(text, role_data["nice_to_have"])
#         conc_r = self._weighted_coverage(text, role_data["core_concepts"])
#         ats_r  = self._ats_coverage(text,      role_data["ats_keywords"])
#         resp_r = self._resp_score(text,         role_data["responsibilities"])
#         edu    = self._extract_education(text)
#         edu_s  = self._education_score(edu)
#         exp_yrs, is_fresher = self._extract_experience(text)

#         final = round(
#             must_r["score"] * weights["must_have"]       +
#             good_r["score"] * weights["good_to_have"]    +
#             ats_r["score"]  * weights["ats_keywords"]    +
#             conc_r["score"] * weights["core_concepts"]   +
#             resp_r["score"] * weights["responsibilities"] +
#             nice_r["score"] * weights["nice_to_have"]    +
#             edu_s           * weights.get("education", 0),
#             1,
#         )

#         miss_must    = sorted(must_r["missing"], key=lambda x: -x[1])
#         miss_good    = sorted(good_r["missing"], key=lambda x: -x[1])[:4]
#         matched_good = sorted(good_r["matched"], key=lambda x: -x[1])[:5]
#         matched_nice = sorted(nice_r["matched"], key=lambda x: -x[1])[:4]

#         print(f"[ATS]   {fname:<40} → {final:.1f}%")

#         return {
#             "Candidate":            fname.replace(".pdf", ""),
#             "Final Score":          final,
#             "Must Have %":          must_r["score"],
#             "Good To Have %":       good_r["score"],
#             "ATS Match %":          ats_r["score"],
#             "Core Concepts %":      conc_r["score"],
#             "Responsibilities %":   resp_r["score"],
#             "Nice To Have %":       nice_r["score"],
#             "Education Score":      edu_s,
#             "Experience (yrs)":     round(exp_yrs, 1),
#             "Is Fresher":           is_fresher,
#             "Must Weight Score":    f"{must_r['matched_weight']}/{must_r['total_weight']}",
#             "Good Weight Score":    f"{good_r['matched_weight']}/{good_r['total_weight']}",
#             "ATS Matched":          f"{len(ats_r['matched'])}/{ats_r['total']}",
#             "Missing Must Have":    ", ".join(f"{s}(w{w})" for s, w in miss_must),
#             "Missing Good To Have": ", ".join(f"{s}(w{w})" for s, w in miss_good),
#             "Nice To Have Matched": ", ".join(s for s, _ in matched_nice),
#             "Good To Have Matched": ", ".join(s for s, _ in matched_good),
#             "Has Degree":           any(edu.get(k) for k in ["bachelors", "masters", "phd"]),
#             "Certifications":       len(edu.get("certifications", [])),
#             "Rank":                 0,
#         }


# # ─────────────────────────────────────────────────────────────────────────────
# # PUBLIC FUNCTION — this is what views.py calls
# # ─────────────────────────────────────────────────────────────────────────────

# def run_ats(resume_paths: list, job_title: str) -> pd.DataFrame:
#     """
#     Main entry point called from views.py.

#     Args:
#         resume_paths : list of ABSOLUTE PDF file paths
#                        collected from Django Application model via MEDIA_ROOT
#                        e.g. ['/home/user/proj/media/resumes/john.pdf', ...]

#         job_title    : Job.job_title string
#                        must match (exact or partial) a row in CSV
#                        e.g. 'Python Developer', 'Django Developer'

#     Returns:
#         pandas DataFrame columns:
#             Candidate, Final Score, Must Have %, Good To Have %,
#             ATS Match %, Core Concepts %, Responsibilities %,
#             Nice To Have %, Education Score, Experience (yrs),
#             Is Fresher, Must Weight Score, Good Weight Score,
#             ATS Matched, Missing Must Have, Missing Good To Have,
#             Nice To Have Matched, Good To Have Matched,
#             Has Degree, Certifications, Rank

#         Returns EMPTY DataFrame on any failure.
#     """

#     # ── 1. Load CSV ───────────────────────────────────────────────────────────
#     roles = _load_roles(CSV_PATH)
#     if not roles:
#         return pd.DataFrame()

#     # ── 2. Find matching role ─────────────────────────────────────────────────
#     role = _get_role_by_title(roles, job_title)
#     if not role:
#         available = [r["job_title"] for r in roles]
#         print(f"[ATS ERROR] '{job_title}' not found in CSV.")
#         print(f"[ATS] Available titles: {available}")
#         return pd.DataFrame()

#     # ── 3. Scoring setup ──────────────────────────────────────────────────────
#     is_fresher = _is_fresher_role(role)
#     weights    = WEIGHTS_FRESHER if is_fresher else WEIGHTS_EXPERIENCED
#     role_data  = _build_role_data(role)

#     print(f"[ATS] ─────────────────────────────────────────────")
#     print(f"[ATS] Job     : {role['job_title']}")
#     print(f"[ATS] Level   : {role.get('experience_level', 'N/A')}")
#     print(f"[ATS] Mode    : {'Fresher' if is_fresher else 'Experienced'}")
#     print(f"[ATS] Resumes : {len(resume_paths)}")
#     print(f"[ATS] ─────────────────────────────────────────────")

#     # ── 4. Validate file paths ────────────────────────────────────────────────
#     valid_paths = []
#     for p in resume_paths:
#         if os.path.exists(p):
#             valid_paths.append(p)
#         else:
#             print(f"[ATS WARNING] File missing on disk: {p}")

#     if not valid_paths:
#         print("[ATS ERROR] No valid resume files found.")
#         return pd.DataFrame()

#     # ── 5. Score each resume ──────────────────────────────────────────────────
#     engine     = _ATSEngine()
#     candidates = []

#     for path in valid_paths:
#         result = engine.score_resume(path, role_data, weights)
#         if result:
#             candidates.append(result)

#     if not candidates:
#         print("[ATS] No candidates scored.")
#         return pd.DataFrame()

#     # ── 6. Build DataFrame, rank, return ─────────────────────────────────────
#     df = pd.DataFrame(candidates)
#     df = df.sort_values("Final Score", ascending=False).reset_index(drop=True)
#     df["Rank"] = range(1, len(df) + 1)
#     df = df.fillna("")   # NaN → "" so JsonResponse doesn't crash

#     print(f"[ATS] ✓ Done — {len(df)} candidate(s) ranked.")
#     return 










"""
HR ATS Resume Ranking System — v11
Weighted Skill Scoring | ats_weighted_v2.csv

CSV FORMAT — skill:weight|skill:weight pipe-separated:
  must_have_weighted      → "Python:10|Django:9|SQL:8|Git:7"
  good_to_have_weighted   → "DRF:8|PostgreSQL:7|ORM:6"
  nice_to_have_weighted   → "Celery:5|Redis:5|Docker:5"
  core_concepts_weighted  → "Django MVT:9|REST Architecture:8"
  ats_keywords            → "python, django, drf, rest api, sql" (comma, lowercase)
  key_responsibilities    → pipe-separated sentences
  education_requirements  → comma-separated degrees

HOW WEIGHTED SCORING WORKS:
  Each skill has a weight (1-10). When matched, it contributes proportionally.
  Score = sum(matched_weights) / sum(all_weights) * 100

  Example: must_have = "Python:10|Django:9|SQL:8" → total=27
    Resume has Python+Django → matched=19 → score = 19/27 * 100 = 70.4%
  This means high-weight skills matter MORE than low-weight ones.

TIER WEIGHTS (how much each tier contributes to final score):
  Fresher:
    must_have      50%  | good_to_have  20% | ats_keywords  15%
    core_concepts   8%  | responsibilities  4% | nice_to_have   3%
  Experienced:
    must_have      35%  | good_to_have  20% | ats_keywords  15%
    nice_to_have   12%  | core_concepts  8% | responsibilities 5% | education 5%

USAGE:
  python sec_v11.py                            # interactive menu
  python sec_v11.py --role "Django Developer"
  python sec_v11.py --role-id 4
  python sec_v11.py --list
  python sec_v11.py --fresher
  python sec_v11.py --experienced
"""

import os, re, argparse
from typing import List, Dict, Tuple

try:
    from django.conf import settings as django_settings
    _CSV_PATH = os.path.join(str(django_settings.BASE_DIR), "linkedin_style_ats_roles_weighted.csv")
except Exception:
    _CSV_PATH = os.path.join(os.path.dirname(os.path.abspath(__file__)), "linkedin_style_ats_roles_weighted.csv")

import nltk
import PyPDF2
import pandas as pd

nltk.download('punkt',                      quiet=True)
nltk.download('stopwords',                  quiet=True)
nltk.download('wordnet',                    quiet=True)
nltk.download('averaged_perceptron_tagger', quiet=True)
nltk.download('punkt_tab',                  quiet=True)

from nltk.corpus import stopwords
from nltk.stem   import WordNetLemmatizer, PorterStemmer

# ── Noise words ──────────────────────────────────────────────────────────────
NOISE = {
    'the','a','an','in','of','and','or','to','for','with','is','are','be','by',
    'on','at','as','we','our','you','your','their','will','must','can','have',
    'has','had','this','that','these','such','all','any','more','than','very',
    'join','looking','help','make','ensure','work','using','use','also','able',
    'following','include','including','across','within','both','each','other',
    'developer','development','team','company','role','position','candidate',
    'strong','good','excellent','great','highly','well','effectively',
    'required','preferred','responsibilities','qualifications','bonus','skills',
    'experience','knowledge','familiarity','ability','understanding','proficiency',
    'minimum','plus','years','year','related','field','degree','equivalent',
    'provide','build','design','implement','maintain','develop','create','manage',
    'collaborate','communicate','support','ensure','analyze','deliver','drive',
}

DEGREE_KEYWORDS = {
    'phd':       ['phd', 'ph.d', 'doctorate', 'doctoral'],
    'masters':   ['master', 'm.tech', 'm.s', 'msc', 'mba', 'mca', 'm.com', 'postgraduate'],
    'bachelors': ['bachelor', 'b.tech', 'b.e', 'bsc', 'bba', 'bca', 'b.com',
                  'b.s', 'llb', 'undergraduate', 'b.a'],
    'diploma':   ['diploma', 'associate', 'certificate course'],
}

WORK_EXP_SIGNALS = [
    'internship', 'intern at', 'full-time', 'part-time', 'freelance',
    'consultant', 'contract', 'worked at', 'working at', 'employment',
    'employed', 'job title', 'position held',
]

FRESHER_INDICATORS = ['fresher', '0-2', '0-1', 'entry', 'junior', 'graduate']

# ── Skill aliases ────────────────────────────────────────────────────────────
SKILL_ALIASES = {
    'django rest framework': ['drf', 'django rest', 'djangorestframework'],
    'javascript':            ['js', 'es6', 'es6+', 'ecmascript'],
    'typescript':            ['ts'],
    'postgresql':            ['postgres', 'psql'],
    'node.js':               ['nodejs', 'node js'],
    'react.js':              ['reactjs', 'react js', 'react'],
    'express.js':            ['expressjs', 'express js', 'express'],
    'python':                ['py'],
    'rest apis':             ['rest api', 'restful', 'restful api', 'rest'],
    'oop':                   ['object oriented', 'object-oriented', 'oops'],
    'ci/cd':                 ['continuous integration', 'cicd', 'jenkins', 'github actions'],
    'git':                   ['github', 'gitlab', 'version control', 'vcs'],
    'machine learning':      ['ml'],
    'unit testing':          ['unittest', 'unit test', 'pytest', 'jest', 'junit'],
    'sql':                   ['mysql', 'postgresql', 'sqlite', 'sqlite3'],
    'linux':                 ['ubuntu', 'debian', 'centos', 'unix', 'bash'],
    'problem solving':       ['problem-solving', 'analytical', 'debugging'],
    'algorithms':            ['algorithm', 'dsa', 'data structures and algorithms'],
    'data structures':       ['dsa', 'data structure'],
    'mvc':                   ['mvt', 'model view', 'model-view'],
    'authentication':        ['auth', 'jwt', 'oauth', 'login', 'session'],
    'docker':                ['containerization', 'container'],
    'spring boot':           ['springboot', 'spring-boot'],
    'next.js':               ['nextjs', 'next js'],
    'vue.js':                ['vuejs', 'vue js', 'vue'],
    'mongodb':               ['mongo'],
    'kubernetes':            ['k8s'],
    'redux':                 ['redux toolkit', 'react-redux'],
    'tailwind css':          ['tailwind', 'tailwindcss'],
    'orm':                   ['sqlalchemy', 'hibernate', 'activerecord', 'eloquent', 'mongoose', 'typeorm'],
    'state management':      ['redux', 'vuex', 'ngrx', 'bloc', 'provider', 'mobx'],
    'jpa/hibernate':         ['jpa', 'hibernate', 'spring data'],
    'jpa':                   ['hibernate', 'spring data jpa'],
    'activerecord':          ['active record', 'rails orm'],
    'eloquent orm':          ['eloquent', 'laravel orm'],
    'vuex':                  ['vue store', 'pinia'],
    'ngrx':                  ['angular store', 'ng-rx'],
    'rxjs':                  ['reactive extensions', 'observables'],
    'jest':                  ['jtest', 'js testing'],
    'collections':           ['collections framework', 'java collections'],
    'collections framework': ['collections', 'java collections', 'arraylist', 'hashmap'],
    'jsx':                   ['react jsx', 'javascript xml'],
    'ssr':                   ['server side rendering', 'server-side rendering', 'next.js ssr'],
    'ssg':                   ['static site generation', 'static generation'],
    'vue cli':               ['vue-cli', '@vue/cli'],
    'gin':                   ['gin framework', 'gin-gonic'],
    'actix':                 ['actix-web', 'actix web'],
    'tokio':                 ['async rust', 'rust async'],
    'cargo':                 ['rust cargo', 'crates.io'],
    'memory management':     ['ownership', 'borrowing', 'lifetimes', 'borrow checker'],
    'concurrency':           ['goroutines', 'threads', 'async', 'parallel'],
    'systems programming':   ['system programming', 'low-level', 'kernel'],
    'rest architecture':     ['rest api', 'restful', 'rest apis', 'http'],
    'oop principles':        ['oop', 'object oriented', 'encapsulation', 'inheritance', 'polymorphism'],
    'solid principles':      ['solid', 'single responsibility', 'open closed'],
    'design patterns':       ['factory pattern', 'singleton', 'observer pattern'],
    'system design':         ['system architecture', 'high level design', 'hld'],
    'distributed systems':   ['distributed computing', 'distributed architecture'],
    'scalability':           ['horizontal scaling', 'vertical scaling', 'load balancing'],
    'microservices':         ['microservice', 'micro services', 'service mesh'],
    'django mvt pattern':    ['django mvt', 'mvt', 'model view template'],
    'orm concepts':          ['orm', 'object relational mapping', 'database abstraction'],
    'component architecture':['component design', 'react components', 'vue components'],
    'virtual dom':           ['vdom', 'virtual document object model'],
    'reactive programming':  ['rxjs', 'observables', 'reactive', 'streams'],
    'event loop':            ['javascript event loop', 'node.js event loop', 'async event loop'],
    'goroutines':            ['go routines', 'go concurrency', 'concurrent goroutines'],
    'channels':              ['go channels', 'channel communication'],
    'type system':           ['typescript types', 'static typing', 'type checking'],
    'generics':              ['typescript generics', 'generic programming'],
    'ownership model':       ['rust ownership', 'ownership borrowing', 'borrow checker'],
    'lifetimes':             ['rust lifetimes', 'lifetime annotations'],
    'ml algorithms':         ['machine learning algorithms', 'supervised learning', 'unsupervised learning'],
    'model evaluation':      ['model metrics', 'accuracy', 'f1 score', 'precision recall'],
    'feature engineering':   ['feature extraction', 'feature selection', 'data features'],
    'rag architecture':      ['rag', 'retrieval augmented generation', 'retrieval augmented'],
    'generative ai':         ['genai', 'gen ai', 'llm', 'large language model'],
    'prompt engineering':    ['prompt design', 'prompting', 'prompt optimization'],
    'nextauth':              ['next auth', 'next.js authentication'],
    'prisma':                ['prisma orm', 'prisma client'],
    'vector databases':      ['vector db', 'chroma', 'pinecone', 'weaviate', 'faiss'],
    'transformers':          ['hugging face transformers', 'transformer models', 'bert', 'gpt'],
    'jpa/orm':               ['jpa', 'hibernate', 'spring data'],
    'spring framework':      ['spring', 'spring boot', 'spring mvc'],
    'dependency injection':  ['di', 'ioc', 'inversion of control'],
    'rails':                 ['ruby on rails', 'ror'],
    'laravel':               ['laravel framework', 'php laravel'],
    'ssr/ssg/isr':           ['ssr', 'ssg', 'isr', 'server side rendering', 'static generation'],
}

# ── Scoring weight profiles ──────────────────────────────────────────────────
WEIGHTS_FRESHER = {
    'must_have':      0.50,
    'good_to_have':   0.20,
    'ats_keywords':   0.15,
    'core_concepts':  0.08,
    'responsibilities':0.04,
    'nice_to_have':   0.03,
    'education':      0.00,
}

WEIGHTS_EXPERIENCED = {
    'must_have':      0.35,
    'good_to_have':   0.20,
    'ats_keywords':   0.15,
    'nice_to_have':   0.12,
    'core_concepts':  0.08,
    'responsibilities':0.05,
    'education':      0.05,
}


# ─────────────────────────────────────────────────────────────────────────────
class JobRolesDB:
    """Loads job roles from ats_weighted_v2.csv — weighted skill format."""

    def __init__(self, csv_path: str = None):
        if csv_path is None:
            csv_path = _CSV_PATH

        self.roles = []
        self.df    = None

        if not os.path.exists(csv_path):
            print(f"  ⚠  CSV not found: {csv_path}")
            print(f"     Place ats_weighted_v2.csv in the same folder as this script")
            return

        self.df = pd.read_csv(csv_path).fillna("")
        for _, row in self.df.iterrows():
            self.roles.append(row.to_dict())
        print(f"  ✓  Loaded {len(self.roles)} job roles from {os.path.basename(csv_path)}")

    @staticmethod
    def parse_weighted(cell: str) -> List[Tuple[str, int]]:
        """
        Parse 'Skill:weight|Skill:weight' → [(skill, weight), ...]
        Falls back to weight=5 if no weight given.
        """
        if not cell or str(cell).strip() == "":
            return []
        result = []
        for item in str(cell).split("|"):
            item = item.strip()
            if not item:
                continue
            if ":" in item:
                parts = item.rsplit(":", 1)
                skill = parts[0].strip()
                try:
                    weight = int(parts[1].strip())
                except ValueError:
                    weight = 5
            else:
                skill = item
                weight = 5
            if skill:
                result.append((skill, weight))
        return result

    @staticmethod
    def parse_ats_keywords(cell: str) -> List[str]:
        """Parse comma-separated lowercase ATS keywords."""
        if not cell or str(cell).strip() == "":
            return []
        return [s.strip().lower() for s in str(cell).split(",") if s.strip()]

    @staticmethod
    def parse_responsibilities(cell: str) -> List[str]:
        """Parse pipe-separated responsibilities."""
        if not cell or str(cell).strip() == "":
            return []
        return [s.strip() for s in str(cell).split("|") if s.strip()]

    def get_by_id(self, role_id: int) -> Dict:
        for r in self.roles:
            if int(r.get('id', -1)) == role_id:
                return r
        return None

    def get_by_title(self, title: str) -> Dict:
        t = title.lower().strip()
        for r in self.roles:
            if r.get('job_title', '').lower() == t:
                return r
        for r in self.roles:
            if t in r.get('job_title', '').lower():
                return r
        return None

    def is_fresher_role(self, role: Dict) -> bool:
        return any(i in role.get('experience_level', '').lower()
                   for i in FRESHER_INDICATORS)

    def list_roles(self):
        print("\n" + "=" * 70)
        print("  Available Job Roles  (ats_weighted_v2.csv)")
        print("=" * 70)
        by_cat = {}
        for r in self.roles:
            by_cat.setdefault(r.get('role_category', 'Other'), []).append(r)
        for cat in sorted(by_cat):
            print(f"\n  [{cat}]")
            for r in by_cat[cat]:
                lvl = r.get('experience_level', '')
                tag = " 🟢" if 'Fresher' in lvl else " 🟡" if 'Mid' in lvl else " 🔴"
                print(f"    {int(r['id']):>3}. {r['job_title']:<40} {lvl}{tag}")
        print()

    def build_role_data(self, role: Dict) -> Dict:
        """Build role_data with weighted skill lists."""
        return {
            'must_have':       self.parse_weighted(role.get('must_have_weighted', '')),
            'good_to_have':    self.parse_weighted(role.get('good_to_have_weighted', '')),
            'nice_to_have':    self.parse_weighted(role.get('nice_to_have_weighted', '')),
            'core_concepts':   self.parse_weighted(role.get('core_concepts_weighted', '')),
            'ats_keywords':    self.parse_ats_keywords(role.get('ats_keywords', '')),
            'responsibilities':self.parse_responsibilities(role.get('key_responsibilities', '')),
            'education':       role.get('education_requirements', ''),
            'job_title':       role.get('job_title', ''),
        }


# ─────────────────────────────────────────────────────────────────────────────
class ResumeRankingSystem:

    def __init__(self):
        self.stop_words = set(stopwords.words('english'))
        self.lemmatizer = WordNetLemmatizer()
        self.stemmer    = PorterStemmer()

    # ── PDF extraction ────────────────────────────────────────────────────────
    def extract_text_from_pdf(self, path: str) -> str:
        try:
            with open(path, 'rb') as f:
                reader = PyPDF2.PdfReader(f)
                pages  = [p.extract_text() or "" for p in reader.pages]
            raw = "\n".join(pages)
            if not raw.strip():
                print(f"     ⚠  No text extracted from {os.path.basename(path)}")
            return self._clean_pdf_text(raw)
        except Exception as e:
            print(f"     ✗  Error reading {os.path.basename(path)}: {e}")
            return ""

    def _clean_pdf_text(self, text: str) -> str:
        text = re.sub(r'([a-z])([A-Z])',  r'\1 \2', text)
        text = re.sub(r'([a-zA-Z])(\d)',  r'\1 \2', text)
        text = re.sub(r'(\d)([a-zA-Z])',  r'\1 \2', text)
        text = re.sub(r'[^\x00-\x7F]+',  ' ',      text)
        text = re.sub(r'[ \t]+',          ' ',      text)
        text = re.sub(r'\n{3,}',          '\n\n',   text)
        return text.strip()

    # ── Tokenization ──────────────────────────────────────────────────────────
    def stem(self, word: str) -> str:
        return self.stemmer.stem(self.lemmatizer.lemmatize(word.lower()))

    def token_set(self, text: str) -> set:
        tokens = re.findall(r'\b[a-z][a-z0-9\+\#\.\/]{1,}\b', text.lower())
        return {self.stem(t) for t in tokens if t not in NOISE and len(t) > 2}

    # ── Core skill matcher ────────────────────────────────────────────────────
    def match_skill(self, skill: str, resume_text: str, resume_stems: set) -> bool:
        sl = skill.lower().strip()
        rl = resume_text.lower()

        if sl in rl:                                               return True
        if re.search(r'\b' + re.escape(sl) + r'\b', rl):         return True
        if ' ' not in sl and self.stem(sl) in resume_stems:       return True

        words      = sl.split()
        meaningful = [w for w in words if len(w) > 2 and w not in NOISE]
        if len(meaningful) >= 2 and all(
            re.search(r'\b' + re.escape(w) + r'\b', rl) for w in meaningful
        ):
            return True

        if len(sl) <= 6 and re.search(r'\b' + re.escape(sl) + r'\b', rl):
            return True

        for canonical, aliases in SKILL_ALIASES.items():
            if sl == canonical or sl in aliases:
                if any(re.search(r'\b' + re.escape(t) + r'\b', rl)
                       for t in [canonical] + aliases):
                    return True

        return False

    # ── WEIGHTED coverage scorer — KEY INNOVATION ─────────────────────────────
    def weighted_coverage(self, resume_text: str,
                          weighted_skills: List[Tuple[str, int]]) -> Dict:
        """
        Score using skill weights.
        matched_score = sum of weights of matched skills
        total_score   = sum of all weights
        percentage    = matched_score / total_score * 100
        """
        if not weighted_skills:
            return {'score': 0.0, 'matched': [], 'missing': [],
                    'matched_weight': 0, 'total_weight': 0}

        stems = self.token_set(resume_text)
        matched, missing = [], []
        matched_weight, total_weight = 0, 0

        for skill, weight in weighted_skills:
            total_weight += weight
            if self.match_skill(skill, resume_text, stems):
                matched.append((skill, weight))
                matched_weight += weight
            else:
                missing.append((skill, weight))

        score = round(matched_weight / total_weight * 100, 1) if total_weight > 0 else 0.0

        return {
            'score':          score,
            'matched':        matched,          # [(skill, weight), ...]
            'missing':        missing,           # [(skill, weight), ...]
            'matched_weight': matched_weight,
            'total_weight':   total_weight,
        }

    # ── ATS keyword coverage (unweighted, simple match) ───────────────────────
    def ats_coverage(self, resume_text: str, keywords: List[str]) -> Dict:
        if not keywords:
            return {'score': 0.0, 'matched': [], 'missing': [], 'total': 0}
        stems   = self.token_set(resume_text)
        matched = [k for k in keywords if     self.match_skill(k, resume_text, stems)]
        missing = [k for k in keywords if not self.match_skill(k, resume_text, stems)]
        return {
            'score':   round(len(matched) / len(keywords) * 100, 1),
            'matched': matched,
            'missing': missing,
            'total':   len(keywords),
        }

    # ── Responsibilities scorer ───────────────────────────────────────────────
    def responsibilities_score(self, resume_text: str,
                               responsibilities: List[str]) -> Dict:
        if not responsibilities:
            return {'score': 0.0, 'matched': [], 'missing': []}
        resume_lower = resume_text.lower()
        matched, missing = [], []
        for resp in responsibilities:
            words = re.findall(r'\b[a-z][a-z0-9\+\#\.]{2,}\b', resp.lower())
            words = [w for w in words if w not in NOISE]
            if not words:
                continue
            found = [w for w in words if re.search(r'\b' + re.escape(w) + r'\b', resume_lower)]
            if len(found) / len(words) >= 0.5:
                matched.append(resp[:70])
            else:
                missing.append(resp[:70])
        total = len(matched) + len(missing)
        return {
            'score':   round(len(matched) / total * 100, 1) if total > 0 else 0.0,
            'matched': matched,
            'missing': missing,
            'total':   total,
        }

    # ── Experience ────────────────────────────────────────────────────────────
    def extract_experience(self, text: str) -> Tuple[float, bool]:
        tl = text.lower()
        for pat in [
            r'(\d+\.?\d*)\+?\s*years?\s*(?:of\s*)?(?:professional\s*|work\s*|industry\s*)?experience',
            r'experience\s*[:\-]\s*(\d+\.?\d*)\+?\s*years?',
            r'(\d+\.?\d*)\s*yrs?\s*(?:of\s*)?(?:professional\s*)?experience',
        ]:
            m = re.search(pat, tl)
            if m:
                yrs = float(m.group(1))
                return yrs, (yrs == 0.0)
        has_work = any(s in tl for s in WORK_EXP_SIGNALS)
        return (1.0, False) if has_work else (0.0, True)

    # ── Education ─────────────────────────────────────────────────────────────
    def extract_education(self, text: str) -> Dict:
        edu = {k: False for k in DEGREE_KEYWORDS}
        edu['certifications'] = []
        t = text.lower()
        for level, kws in DEGREE_KEYWORDS.items():
            if any(k in t for k in kws):
                edu[level] = True
        for m in re.finditer(r'(?:certified|certification|certificate)\s+(?:in\s+)?([a-z][a-z\s]{2,35})', t):
            cert = m.group(1).strip()
            if cert not in edu['certifications']:
                edu['certifications'].append(cert)
        return edu

    def education_score(self, edu: Dict) -> float:
        base = 100 if edu.get('phd') else 85 if edu.get('masters') else \
               70 if edu.get('bachelors') else 50 if edu.get('diploma') else 0
        return min(base + len(edu.get('certifications', [])) * 5, 100)

    # ── MAIN ranking ──────────────────────────────────────────────────────────
    def rank_candidates(self, resumes_folder: str, role_data: Dict,
                        role_title: str = "Job", role_is_fresher: bool = True,
                        weights: Dict = None) -> pd.DataFrame:

        if weights is None:
            weights = WEIGHTS_FRESHER if role_is_fresher else WEIGHTS_EXPERIENCED

        mode = 'Fresher' if role_is_fresher else 'Experienced'
        print(f"\n  Role   : {role_title}")
        print(f"  Mode   : {mode}")
        print(f"\n  Skill Tiers (weighted):")
        for key, label, dot in [
            ('must_have',    'MUST Have',    '🔴'),
            ('good_to_have', 'GOOD To Have', '🟡'),
            ('nice_to_have', 'NICE To Have', '🟢'),
            ('core_concepts','Core Concepts','🔵'),
        ]:
            items = role_data.get(key, [])
            total_w = sum(w for _, w in items)
            w_pct   = int(weights.get(key, 0) * 100)
            skills_preview = ", ".join(f"{s}({w})" for s,w in items[:4])
            print(f"    {dot} {label:<16} {len(items):>2} skills  total_w={total_w}  tier_w={w_pct}%  [{skills_preview}...]")
        print(f"\n  Tier Weights:")
        for k, v in weights.items():
            if v > 0:
                print(f"    {k:<16} {int(v*100):>3}%  {'▓'*int(v*40)}")
        print("-" * 70)

        pdf_files = [f for f in os.listdir(resumes_folder) if f.lower().endswith('.pdf')]
        if not pdf_files:
            print(f"  ⚠  No PDF resumes in: {resumes_folder}")
            return pd.DataFrame()

        print(f"\n  {len(pdf_files)} resume(s) found. Scanning...\n")
        candidates = []

        for fname in sorted(pdf_files):
            path   = os.path.join(resumes_folder, fname)
            print(f"  ┌─ {fname}")

            resume = self.extract_text_from_pdf(path)
            if not resume.strip():
                print(f"  └─ ⚠  Skipped.\n")
                continue

            must_r = self.weighted_coverage(resume, role_data['must_have'])
            good_r = self.weighted_coverage(resume, role_data['good_to_have'])
            nice_r = self.weighted_coverage(resume, role_data['nice_to_have'])
            conc_r = self.weighted_coverage(resume, role_data['core_concepts'])
            ats_r  = self.ats_coverage(resume,      role_data['ats_keywords'])
            resp_r = self.responsibilities_score(resume, role_data['responsibilities'])
            edu    = self.extract_education(resume)
            edu_s  = self.education_score(edu)
            exp_yrs, is_fresher = self.extract_experience(resume)

            final = round(
                must_r['score'] * weights['must_have']      +
                good_r['score'] * weights['good_to_have']   +
                ats_r['score']  * weights['ats_keywords']   +
                conc_r['score'] * weights['core_concepts']  +
                resp_r['score'] * weights['responsibilities']+
                nice_r['score'] * weights['nice_to_have']   +
                edu_s           * weights.get('education', 0),
                1
            )

            exp_tag = "Fresher ✓" if is_fresher else f"{exp_yrs:.1f} yrs"

            def _fmt_w(r, label, wkey, dot='  '):
                pct = r['score']
                w   = int(weights.get(wkey, 0) * 100)
                mw  = r.get('matched_weight', len(r.get('matched',[])))
                tw  = r.get('total_weight',   len(r.get('matched',[])) + len(r.get('missing',[])))
                bar = '▪' * int(pct / 10)
                return f"  │ {dot} {label:<18} {pct:>5.1f}%  (w:{mw}/{tw})  tier={w}%  {bar}"

            def _fmt_ats(r, label, wkey, dot='  '):
                pct = r['score']
                w   = int(weights.get(wkey, 0) * 100)
                bar = '▪' * int(pct / 10)
                return f"  │ {dot} {label:<18} {pct:>5.1f}%  ({len(r['matched'])}/{r['total']})  tier={w}%  {bar}"

            print(_fmt_w(must_r,  'Must Have',     'must_have',      '🔴'))
            print(_fmt_w(good_r,  'Good To Have',  'good_to_have',   '🟡'))
            print(_fmt_ats(ats_r, 'ATS Keywords',  'ats_keywords',   '⚪'))
            print(_fmt_w(conc_r,  'Core Concepts', 'core_concepts',  '🔵'))
            print(_fmt_ats(resp_r,'Responsibilities','responsibilities','  '))
            print(_fmt_w(nice_r,  'Nice To Have',  'nice_to_have',   '🟢'))
            edu_w = int(weights.get('education', 0) * 100)
            print(f"  │     {'Education':<18} {edu_s:>5.1f}%  w={edu_w}%")
            print(f"  │     {'Experience':<18}         [{exp_tag}]")
            print(f"  └─ FINAL SCORE        : {final:>5.1f}%\n")

            # Feedback — show by weight descending (most important missing first)
            miss_must = sorted(must_r['missing'], key=lambda x: -x[1])
            miss_good = sorted(good_r['missing'], key=lambda x: -x[1])[:4]
            if miss_must:
                skills_str = ", ".join(f"{s}(w{w})" for s,w in miss_must)
                print(f"     🔴 Missing Must-Have    : {skills_str}")
            if miss_good:
                skills_str = ", ".join(f"{s}(w{w})" for s,w in miss_good)
                print(f"     🟡 Missing Good-To-Have : {skills_str}")
            matched_good = sorted(good_r['matched'], key=lambda x: -x[1])[:5]
            matched_nice = sorted(nice_r['matched'], key=lambda x: -x[1])[:4]
            if matched_good:
                print(f"     🟡 Good-To-Have Found   : {', '.join(s for s,_ in matched_good)}")
            if matched_nice:
                print(f"     🟢 Nice-To-Have Found   : {', '.join(s for s,_ in matched_nice)}")
            print()

            candidates.append({
                'Candidate':            fname.replace('.pdf', ''),
                'Final Score':          final,
                'Must Have %':          must_r['score'],
                'Good To Have %':       good_r['score'],
                'ATS Match %':          ats_r['score'],
                'Core Concepts %':      conc_r['score'],
                'Responsibilities %':   resp_r['score'],
                'Nice To Have %':       nice_r['score'],
                'Education Score':      edu_s,
                'Experience (yrs)':     round(exp_yrs, 1),
                'Is Fresher':           is_fresher,
                'Must Weight Score':    f"{must_r['matched_weight']}/{must_r['total_weight']}",
                'Good Weight Score':    f"{good_r['matched_weight']}/{good_r['total_weight']}",
                'ATS Matched':          f"{len(ats_r['matched'])}/{ats_r['total']}",
                'Missing Must Have':    ", ".join(f"{s}(w{w})" for s,w in miss_must),
                'Missing Good To Have': ", ".join(f"{s}(w{w})" for s,w in miss_good),
                'Nice To Have Matched': ", ".join(s for s,_ in matched_nice),
                'Good To Have Matched': ", ".join(s for s,_ in matched_good),
                'Has Degree':           any(edu.get(k) for k in ['bachelors','masters','phd']),
                'Certifications':       len(edu.get('certifications', [])),
                'Rank':                 0,
            })

        if not candidates:
            print("  No candidates processed.")
            return pd.DataFrame()

        df = pd.DataFrame(candidates).sort_values('Final Score', ascending=False)
        df['Rank'] = range(1, len(df) + 1)
        return df

    # ── Rank from file paths (Django use) ────────────────────────────────────
    def rank_candidates_from_paths(self, resume_paths: list, role_data: Dict,
                                   role_title: str = "Job",
                                   role_is_fresher: bool = True,
                                   weights: Dict = None) -> pd.DataFrame:
        if weights is None:
            weights = WEIGHTS_FRESHER if role_is_fresher else WEIGHTS_EXPERIENCED

        candidates = []

        for path in resume_paths:
            fname  = os.path.basename(path)
            resume = self.extract_text_from_pdf(path)
            if not resume.strip():
                print(f"  ⚠  Skipped (empty): {fname}")
                continue

            must_r = self.weighted_coverage(resume, role_data['must_have'])
            good_r = self.weighted_coverage(resume, role_data['good_to_have'])
            nice_r = self.weighted_coverage(resume, role_data['nice_to_have'])
            conc_r = self.weighted_coverage(resume, role_data['core_concepts'])
            ats_r  = self.ats_coverage(resume,      role_data['ats_keywords'])
            resp_r = self.responsibilities_score(resume, role_data['responsibilities'])
            edu    = self.extract_education(resume)
            edu_s  = self.education_score(edu)
            exp_yrs, is_fresher = self.extract_experience(resume)

            final = round(
                must_r['score'] * weights['must_have']       +
                good_r['score'] * weights['good_to_have']    +
                ats_r['score']  * weights['ats_keywords']    +
                conc_r['score'] * weights['core_concepts']   +
                resp_r['score'] * weights['responsibilities'] +
                nice_r['score'] * weights['nice_to_have']    +
                edu_s           * weights.get('education', 0),
                1
            )

            miss_must    = sorted(must_r['missing'], key=lambda x: -x[1])
            miss_good    = sorted(good_r['missing'], key=lambda x: -x[1])[:4]
            matched_good = sorted(good_r['matched'], key=lambda x: -x[1])[:5]
            matched_nice = sorted(nice_r['matched'], key=lambda x: -x[1])[:4]

            print(f"  {fname:<45} → {final:.1f}%")

            candidates.append({
                'Candidate':            fname.replace('.pdf', ''),
                'Final Score':          final,
                'Must Have %':          must_r['score'],
                'Good To Have %':       good_r['score'],
                'ATS Match %':          ats_r['score'],
                'Core Concepts %':      conc_r['score'],
                'Responsibilities %':   resp_r['score'],
                'Nice To Have %':       nice_r['score'],
                'Education Score':      edu_s,
                'Experience (yrs)':     round(exp_yrs, 1),
                'Is Fresher':           is_fresher,
                'Must Weight Score':    f"{must_r['matched_weight']}/{must_r['total_weight']}",
                'Good Weight Score':    f"{good_r['matched_weight']}/{good_r['total_weight']}",
                'ATS Matched':          f"{len(ats_r['matched'])}/{ats_r['total']}",
                'Missing Must Have':    ", ".join(f"{s}(w{w})" for s, w in miss_must),
                'Missing Good To Have': ", ".join(f"{s}(w{w})" for s, w in miss_good),
                'Nice To Have Matched': ", ".join(s for s, _ in matched_nice),
                'Good To Have Matched': ", ".join(s for s, _ in matched_good),
                'Has Degree':           any(edu.get(k) for k in ['bachelors', 'masters', 'phd']),
                'Certifications':       len(edu.get('certifications', [])),
                'Rank':                 0,
            })

        if not candidates:
            return pd.DataFrame()

        df = pd.DataFrame(candidates).sort_values('Final Score', ascending=False).reset_index(drop=True)
        df['Rank'] = range(1, len(df) + 1)
        df = df.fillna("")
        return df

    # ── Report ────────────────────────────────────────────────────────────────
    def generate_report(self, df: pd.DataFrame,
                        output_file: str = 'candidate_rankings.csv') -> str:
        if df.empty:
            return output_file
        df.to_csv(output_file, index=False)

        print("\n" + "=" * 70)
        print("                  FINAL CANDIDATE RANKINGS")
        print("=" * 70)
        print(f"  {'Rank':<5} {'Candidate':<32} {'Score':>6}  {'Bar'}")
        print("-" * 70)
        for _, row in df.iterrows():
            bar   = '█' * int(row['Final Score'] / 5)
            badge = ' [Fresher]' if row.get('Is Fresher') else ''
            print(f"  #{row['Rank']:<4} {str(row['Candidate'])[:31]:<32} "
                  f"{row['Final Score']:>5.1f}%  {bar}{badge}")
        print("=" * 70)

        top = df.iloc[0]
        print(f"\n  ★  Top Candidate : {top['Candidate']}")
        print(f"  {'-'*55}")
        for col, label, dot in [
            ('Must Have %',        'Must Have',        '🔴'),
            ('Good To Have %',     'Good To Have',     '🟡'),
            ('ATS Match %',        'ATS Keywords',     '⚪'),
            ('Core Concepts %',    'Core Concepts',    '🔵'),
            ('Responsibilities %', 'Responsibilities', '  '),
            ('Nice To Have %',     'Nice To Have',     '🟢'),
            ('Education Score',    'Education',        '  '),
        ]:
            val = top.get(col, 0)
            bar = '▒' * int(val / 5)
            print(f"  {dot} {label:<20} {val:>5.1f}%  {bar}")

        exp_tag = '(Fresher)' if top.get('Is Fresher') else f"{top['Experience (yrs)']} yrs"
        print(f"     {'Experience':<20} {exp_tag}")
        print(f"\n  Must Weight Score : {top['Must Weight Score']}")
        print(f"  Good Weight Score : {top['Good Weight Score']}")
        print(f"  ATS Matched       : {top['ATS Matched']}")
        if top['Missing Must Have']:
            print(f"  🔴 Missing Must   : {top['Missing Must Have']}")
        if top['Missing Good To Have']:
            print(f"  🟡 Missing Good   : {top['Missing Good To Have']}")
        if top['Nice To Have Matched']:
            print(f"  🟢 Nice Matched   : {top['Nice To Have Matched']}")

        print(f"\n  ✓  Saved to: {output_file}")
        return output_file


# ─────────────────────────────────────────────────────────────────────────────
def main():
    parser = argparse.ArgumentParser(
        description='HR ATS Resume Ranking System v11 — Weighted Skill Scoring'
    )
    parser.add_argument('--resumes',     default=r"C:\Users\ASUS\Desktop\data")
    parser.add_argument('--dataset',     default=None,
                        help='Path to ats_weighted_v2.csv (default: same folder as script)')
    parser.add_argument('--role',        type=str)
    parser.add_argument('--role-id',     type=int)
    parser.add_argument('--output',      default='candidate_rankings.csv')
    parser.add_argument('--list',        action='store_true')
    parser.add_argument('--fresher',     action='store_true')
    parser.add_argument('--experienced', action='store_true')
    args = parser.parse_args()

    print("\n  HR ATS Resume Ranking System — v11")
    print("  Weighted Skills: Python:10|Django:9|SQL:8 → Score by importance")
    print("=" * 70)

    db     = JobRolesDB(args.dataset)
    system = ResumeRankingSystem()

    if not db.roles:
        print("  No roles loaded.")
        return

    if args.list:
        db.list_roles()
        return

    os.makedirs(args.resumes, exist_ok=True)
    role = None

    if args.role_id:
        role = db.get_by_id(args.role_id)
        if not role:
            print(f"  ⚠  Role ID {args.role_id} not found.")
            db.list_roles(); return

    elif args.role:
        role = db.get_by_title(args.role)
        if not role:
            print(f"  ⚠  Role '{args.role}' not found.")
            db.list_roles(); return

    else:
        db.list_roles()
        choice = input("  Enter Role ID or partial name: ").strip()
        role   = db.get_by_id(int(choice)) if choice.isdigit() else db.get_by_title(choice)
        if not role:
            print(f"  ⚠  '{choice}' not found.")
            return

    role_is_fresher = args.fresher or (not args.experienced and db.is_fresher_role(role))
    weights   = WEIGHTS_FRESHER if role_is_fresher else WEIGHTS_EXPERIENCED
    role_data = db.build_role_data(role)

    print(f"\n  experience_level : \"{role.get('experience_level', 'N/A')}\"")
    print(f"  Scoring mode     : {'Fresher' if role_is_fresher else 'Experienced'}")

    rankings = system.rank_candidates(
        resumes_folder  = args.resumes,
        role_data       = role_data,
        role_title      = role['job_title'],
        role_is_fresher = role_is_fresher,
        weights         = weights,
    )
    if not rankings.empty:
        system.generate_report(rankings, args.output)

    return rankings


if __name__ == "__main__":
    main()


# ─────────────────────────────────────────────────────────────────────────────
# PUBLIC FUNCTION — views.py se call karo
# ─────────────────────────────────────────────────────────────────────────────

def run_ats(resume_paths: list, job_title: str) -> 'pd.DataFrame':
    """
    Django views.py mein use karo:
        from .atsengine import run_ats
        rankings = run_ats(resume_paths, job.job_title.strip())

    Args:
        resume_paths : list of absolute PDF paths from MEDIA_ROOT
        job_title    : Job.job_title — CSV se match hona chahiye

    Returns:
        DataFrame with all ranking columns, sorted by Final Score.
        Empty DataFrame on failure.
    """
    db     = JobRolesDB()
    system = ResumeRankingSystem()

    role = db.get_by_title(job_title)
    if not role:
        available = [r['job_title'] for r in db.roles]
        print(f"  ⚠  '{job_title}' CSV mein nahi mila.")
        print(f"  Available: {available}")
        return pd.DataFrame()

    role_is_fresher = db.is_fresher_role(role)
    weights         = WEIGHTS_FRESHER if role_is_fresher else WEIGHTS_EXPERIENCED
    role_data       = db.build_role_data(role)

    print(f"\n  Job    : {role['job_title']}")
    print(f"  Level  : {role.get('experience_level', 'N/A')}")
    print(f"  Mode   : {'Fresher' if role_is_fresher else 'Experienced'}")
    print(f"  Files  : {len(resume_paths)}")
    print("-" * 60)

    valid_paths = [p for p in resume_paths if os.path.exists(p)]
    missing     = [p for p in resume_paths if not os.path.exists(p)]
    for p in missing:
        print(f"  ⚠  File not found: {p}")

    if not valid_paths:
        print("  ⚠  No valid resume files.")
        return pd.DataFrame()

    return system.rank_candidates_from_paths(
        resume_paths    = valid_paths,
        role_data       = role_data,
        role_title      = role['job_title'],
        role_is_fresher = role_is_fresher,
        weights         = weights,
    )