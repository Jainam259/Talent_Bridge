# 🌉 TalentBridge — Full Stack Job Application Platform

> Connecting ambitious professionals with companies that actually value what they bring.
> No noise — just the right fit, faster.

---

## 🔗 Quick Links

- [About](#-about-the-project)
- [Tech Stack](#-tech-stack)
- [Features](#-features)
- [Project Structure](#-project-structure)
- [Installation](#-installation)
- [API Endpoints](#-api-endpoints)
- [Learning Outcomes](#-learning-outcomes)
- [Contributing](#-contributing)
- [Contact](#-contact)

---

## 🎯 About the Project

**TalentBridge** is a production-grade full-stack job platform that streamlines the entire hiring lifecycle — from candidate registration and job browsing to one-click applications and employer applicant management.

Built with a clean separation between **Job Seeker** and **Employer** roles, the platform implements JWT-based authentication, protected REST APIs, and role-based access control throughout.

---

## 🛠 Tech Stack

```
┌─────────────────────────────────────────────────────────┐
│                        FRONTEND                         │
│   React.js   |   React Router   |   Axios               │
├─────────────────────────────────────────────────────────┤
│                        BACKEND                          │
│   Django   |   Django REST Framework   |   SimpleJWT    │
├─────────────────────────────────────────────────────────┤
│                       DATABASE                          │
│                       SQLite                            │
└─────────────────────────────────────────────────────────┘
```

---

## ✨ Features

### 👤 Dual Role System

```
┌────────────────────────────────┐   ┌────────────────────────────────┐
│        🧑 JOB SEEKER           │   │         🏢 EMPLOYER             │
├────────────────────────────────┤   ├────────────────────────────────┤
│  • Multi-step profile setup   │   │  • Two-step company setup      │
│  • Browse & search jobs       │   │  • Post & manage job listings  │
│  • Filter by type & location  │   │  • View all applicants         │
│  • One-click apply            │   │  • ATS rank candidates         │
│  • Real-time status tracker   │   │  • Update application status   │
└────────────────────────────────┘   └────────────────────────────────┘
```

### 🔐 Authentication & Security

```
  JWT Access Token  +  JWT Refresh Token
        │                     │
        ▼                     ▼
  Short-lived auth      Auto-renew session
  (15 min expiry)       (7 day expiry)

  All sensitive routes → Bearer token required
  Passwords → PBKDF2 hashing (Django built-in)
  Roles → Job Seeker and Employer separated
```

### 🔍 Job Discovery

- Search by job title, skill, or keyword
- Filter by type — `Full Time` / `Part Time` / `Internship` / `Contract`
- Filter by location — city or region
- Live listings across Technology, Design, Finance, Healthcare, and more

### 📊 Application Status Pipeline

```
  [ Applied ] ──────► [ Interviewed ] ──────► [ Hired ]
       ●                     ●                    ●
  Submitted             Shortlisted           Accepted
```

---

## 📂 Project Structure

```
Talent_Bridge/
│
├── TalentBridge/                 ← Django Backend
│   ├── users/
│   │   ├── models.py             ← User & profile models
│   │   ├── serializers.py
│   │   ├── views.py              ← Register, login, profile
│   │   └── urls.py
│   │
│   ├── jobs/
│   │   ├── models.py             ← Job listing model
│   │   ├── serializers.py
│   │   ├── views.py              ← CRUD for job postings
│   │   └── urls.py
│   │
│   ├── applications/
│   │   ├── models.py             ← Application & status model
│   │   ├── serializers.py
│   │   ├── views.py              ← Apply, track, update status
│   │   └── urls.py
│   │
│   ├── manage.py
│   └── requirements.txt
│
├── frontend/                     ← React Frontend
│   ├── src/
│   │   ├── pages/                ← Home, About, Contact, Jobs
│   │   ├── components/           ← Navbar, Cards, Forms
│   │   ├── context/              ← Auth state management
│   │   └── App.js
│   └── package.json
│
└── README.md
```

---

## ⚙️ Installation

### Prerequisites

- Node.js (v18 or higher)
- Python (v3.10 or higher)

---

### Step 1 — Clone the Repository

```bash
git clone https://github.com/Jainam259/Talent_Bridge.git
cd Talent_Bridge
```

---

### Step 2 — Backend Setup

```bash
cd TalentBridge

# Create virtual environment
python -m venv venv

# Activate virtual environment
source venv/bin/activate          # macOS / Linux
venv\Scripts\activate             # Windows

# Install dependencies
pip install -r requirements.txt

# Run database migrations
python manage.py migrate

# Start Django server
python manage.py runserver
```

```
Backend running at → http://127.0.0.1:8000
```

---

### Step 3 — Frontend Setup

```bash
# Open a new terminal
cd frontend

npm install
npm start
```

```
Frontend running at → http://localhost:3000
```

---

## 📌 API Endpoints

### Users & Auth

| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| POST | `/users/api/register-employer/` | No | Register as Employer |
| POST | `/users/api/register-jobseeker/` | No | Register as Job Seeker |
| POST | `/users/api/login/` | No | Login — returns JWT tokens |
| GET | `/users/api/profile/<id>/` | Yes | Get user profile |

### Jobs

| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| GET | `/jobs/api/listings/` | No | List all job postings |
| POST | `/jobs/api/listings/` | Employer | Create a job posting |
| GET | `/jobs/api/listings/<id>/` | No | Get single job detail |
| DELETE | `/jobs/api/listings/<id>/` | Employer | Delete a job posting |

### Applications

| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| POST | `/applications/api/apply/` | Job Seeker | Apply for a job |
| GET | `/applications/api/my-applications/` | Job Seeker | View own applications |
| GET | `/applications/api/job/<id>/applicants/` | Employer | View all applicants |
| PATCH | `/applications/api/<id>/status/` | Employer | Update applicant status |

### Protected Request Example

```http
GET /users/api/profile/1/ HTTP/1.1
Host: 127.0.0.1:8000
Authorization: Bearer <your_access_token>
```

---

## 🧠 Learning Outcomes

- Designed relational database models for a multi-role user system
- Implemented JWT stateless authentication with access and refresh token rotation
- Built secure REST APIs using Django REST Framework with role-based permissions
- Integrated React.js frontend with Django backend using Axios interceptors
- Applied role-based access control separating Job Seeker and Employer flows
- Built a real-time application status tracking pipeline with visual progress

---

## 🤝 Contributing

Contributions are welcome! Follow these steps:

```bash
# 1. Fork the repository on GitHub

# 2. Clone your fork
git clone https://github.com/YOUR_USERNAME/Talent_Bridge.git

# 3. Create a feature branch
git checkout -b feature/YourFeatureName

# 4. Commit your changes
git commit -m "feat: add YourFeatureName"

# 5. Push and open a Pull Request
git push origin feature/YourFeatureName
```

---

## 📬 Contact

**Jainam Shah**

- Email — jainamshah898@gmail.com
- Phone — 6354592403
- GitHub — https://github.com/Jainam259

---

<div align="center">

Made with ❤️ by Jainam Shah

If this project helped you, please give it a ⭐ star!

</div>
