# 🚀 TalentBridge – AI Powered Job Recruitment Platform

TalentBridge is a **Full Stack Job Recruitment Platform** built using **React.js and Django** that connects **job seekers with employers** through a modern hiring system.

The platform allows employers to **post job openings, manage applicants, and evaluate candidates**, while job seekers can **search jobs, apply instantly, and track their application progress**.

It also integrates an **ATS (Applicant Tracking System)** that helps recruiters analyze and rank candidate resumes.

---

# 🌟 Key Features

## 👨‍💻 Job Seekers

* Create professional user profiles
* Upload resumes
* Search and filter job listings
* Apply to jobs instantly
* Track application progress
* View interview and hiring status

## 🏢 Employers

* Employer account registration
* Post new job listings
* Manage job postings
* View and manage applicants
* Track hiring pipeline

## 🤖 ATS Resume Ranking

TalentBridge includes an **ATS system** that:

* Analyzes uploaded resumes
* Matches skills with job requirements
* Ranks candidates based on relevance
* Helps recruiters shortlist candidates faster

---

# 🛠 Tech Stack

### Frontend

* React.js
* React Router
* Axios
* CSS / Tailwind Styled UI

### Backend

* Django
* Django REST Framework

### Database

* SQLite (Development)

### Authentication

* Session-based authentication
* Secure password hashing

---

# 📂 Project Structure

```
TalentBridge/
│
├── backend/
│   ├── users/
│   ├── jobs/
│   ├── applications/
│   ├── manage.py
│   └── requirements.txt
│
├── frontend/
│   ├── src/
│   ├── components/
│   └── package.json
│
└── README.md
```

---

# 🖥 Application Screenshots

## 🏠 Home Page

![Home Page](screenshots/home.png)

## 🔐 Login Page

![Login Page](screenshots/login.png)

## 👤 Job Seeker Registration

![Registration](screenshots/register.png)

## 🔎 Job Listings

![Job Listings](screenshots/job-listings.png)

## 📄 Applications Dashboard

![Applications Dashboard](screenshots/applications.png)

## 🏢 Employer Dashboard

![Employer Dashboard](screenshots/employer-dashboard.png)

## 📝 Post Job

![Post Job](screenshots/post-job.png)

---

# ⚙️ Installation Guide

## Prerequisites

Make sure the following are installed:

* Python 3.x
* Node.js
* npm

---

# Backend Setup (Django)

### 1️⃣ Clone the Repository

```
git clone https://github.com/Jainam259/Talent_Bridge.git
cd Talent_Bridge
```

### 2️⃣ Create Virtual Environment

```
python -m venv venv
```

Activate environment

Windows

```
venv\Scripts\activate
```

Mac/Linux

```
source venv/bin/activate
```

### 3️⃣ Install Dependencies

```
pip install -r requirements.txt
```

### 4️⃣ Run Migrations

```
python manage.py migrate
```

### 5️⃣ Start Backend Server

```
python manage.py runserver
```

Backend will run on:

```
http://127.0.0.1:8000
```

---

# Frontend Setup (React)

Navigate to frontend folder

```
cd frontend
```

Install dependencies

```
npm install
```

Start React application

```
npm start
```

Frontend runs on

```
http://localhost:3000
```

---

# 📡 Example API Endpoints

| Method | Endpoint                   | Description         |
| ------ | -------------------------- | ------------------- |
| POST   | /users/register-jobseeker/ | Register Job Seeker |
| POST   | /users/register-employer/  | Register Employer   |
| POST   | /users/login/              | Login               |
| GET    | /jobs/                     | Get job listings    |
| POST   | /applications/apply/       | Apply for job       |

---

# 📚 Learning Outcomes

Through building TalentBridge, the following concepts were implemented:

* Full Stack Web Development
* REST API Development using Django
* React Component Architecture
* Database Modeling
* Authentication & Security
* Application Tracking System design

---

# 👨‍💻 Developer

**Jainam Shah**

📧 Email
[jainamshah898@gmail.com](mailto:jainamshah898@gmail.com)

📱 Phone
+91 6354592403

GitHub
https://github.com/Jainam259

---

# ⭐ Support

If you like this project, please **give it a star ⭐ on GitHub**.

---

# 📌 Future Improvements

* Deploy project on cloud
* Add AI-based resume matching
* Integrate email notifications
* Add interview scheduling system
* Improve ATS scoring algorithm
