# TalentBridge 



# Talent Bridge

Talent Bridge is a platform that connects job seekers with employers, enabling profile creation and job searches. It streamlines the hiring process, making candidate-employer matching more efficient.

## Features

- User profile creation for job seekers
- Job search functionality
- Employer job postings
- Streamlined hiring process

## Technologies Used

- **Frontend**: React.js
- **Backend**: Django
- **Database**: SQLite

## Installation

### Prerequisites

Ensure you have the following installed:

- Node.js
- Python

### Backend Setup

1. Clone the repository:
   ```bash
   git clone https://github.com/your-repo/talent-bridge.git
   cd talent-bridge/backend
   ```
2. Create a virtual environment and activate it:
   ```bash
   python -m venv venv
   source venv/bin/activate  # On Windows: venv\Scripts\activate
   ```
3. Install dependencies:
   ```bash
   pip install -r requirements.txt
   ```
4. Apply database migrations:
   ```bash
   python manage.py migrate
   ```
5. Start the Django server:
   ```bash
   python manage.py runserver
   ```

### Frontend Setup

1. Navigate to the frontend directory:
   ```bash
   cd ../frontend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the React app:
   ```bash
   npm start
   ```

## Usage

1. Open the browser and go to `http://localhost:3000/`
2. Create a profile as a job seeker or employer
3. Search for jobs or post job listings
4. Connect and hire seamlessly

## Contributing

Contributions are welcome! Feel free to fork the repository and submit a pull request.

## Contact

For any queries, reach out at:
- Personal Email: [jainamshah898@gmail.com](mailto:jainamshah898@gmail.com)
- Phone: 6354592403

# 🚀 Talent Bridge – Full Stack Job Application Platform

Talent Bridge is a full-stack job application platform that connects job seekers with employers through a secure and scalable system.  
It enables employers to post and manage job listings while allowing candidates to browse and apply seamlessly.

The application implements JWT-based authentication, protected REST APIs, and role-based access control.

---

## 🛠 Tech Stack

### Frontend
- React.js
- Axios
- React Router

### Backend
- Django
- Django REST Framework
- JWT Authentication (SimpleJWT)

### Database
- SQLite (Development)

---

## ✨ Core Features

### 👤 User Roles
- Employer registration & login
- Job Seeker registration & login

### 🏢 Employer
- Create and manage job postings
- View applicants
- Secure role-based access

### 👨‍💻 Job Seeker
- Create profile
- Browse available jobs
- Apply for jobs

### 🔐 Authentication & Security
- JWT-based authentication (Access & Refresh Tokens)
- Protected API endpoints
- Stateless authentication system
- Secure password hashing

---

## 📂 Project Structure

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
│   └── package.json
│
└── README.md
```

---

## ⚙️ Backend Setup

### 1️⃣ Clone Repository

```bash
git clone https://github.com/yourusername/TALENT_BRIDGE.git
cd TALENT_BRIDGE/backend
```

### 2️⃣ Create Virtual Environment

```bash
python -m venv venv
source venv/bin/activate  # Windows: venv\Scripts\activate
```

### 3️⃣ Install Dependencies

```bash
pip install -r requirements.txt
```

### 4️⃣ Apply Migrations

```bash
python manage.py migrate
```

### 5️⃣ Run Server

```bash
python manage.py runserver
```

Backend runs at:
```
http://127.0.0.1:8000
```

---

## ⚙️ Frontend Setup

```bash
cd ../frontend
npm install
npm start
```

Frontend runs at:
```
http://localhost:3000
```

---

## 📌 Sample API Endpoints

| Method | Endpoint | Description |
|--------|----------|------------|
| POST | /users/api/register-employer/ | Register Employer |
| POST | /users/api/register-jobseeker/ | Register Job Seeker |
| POST | /users/api/login/ | Login (Returns JWT tokens) |
| GET | /users/api/profile/<id>/ | Protected route |

---

## 🔎 Example Protected Request

```
GET /users/api/profile/1/
Authorization: Bearer <access_token>
```

---

## 🧠 Learning Outcomes

- Designed relational database models
- Implemented JWT-based stateless authentication
- Built secure REST APIs using Django REST Framework
- Integrated React frontend with Django backend
- Implemented role-based access control

---

## 📬 Contact

For collaboration or queries, connect via GitHub.
