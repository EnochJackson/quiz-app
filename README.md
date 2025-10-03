# 📚 Quiz App (React + Spring Boot)

A full-stack **Quiz Application** built with **React (frontend)** and **Spring Boot (backend)**.  
Supports **user registration/login with JWT authentication**, **role-based access (Admin/User)**, and **quiz management**.

---
## 🚀 Features

### 👤 Authentication
- Register new users (default role = USER).
- Secure login with **JWT tokens**.
- Role stored in token claims (`USER` / `ADMIN`).
- Logout clears token.

### 📝 Quiz
- Users can:
  - Take quizzes with multiple questions.
  - Submit answers and get results instantly.
- Admin can:
  - Add, update, delete questions.
  - View and manage all users (except `admin`).

### 🔐 Security
- JWT authentication handled by Spring Security.
- Passwords stored **securely with BCrypt**.
- Admin dashboard protected by `ROLE_ADMIN`.

---

## 🛠️ Tech Stack

### Frontend
- ⚛️ React (with Hooks & React Router)
- 🎨 TailwindCSS for styling
- Axios for API requests

### Backend
- ☕ Spring Boot (REST APIs)
- Spring Security + JWT
- JPA/Hibernate
- MySQL (or H2 for dev)

---

## 📂 Project Structure

![image alt](https://github.com/EnochJackson/quiz-app/blob/1faee6994a7b0251f9aa04c02247e5f365f15ea5/str.png)

---

## ⚡ Setup & Run

### 1️⃣ Backend (Spring Boot)
```bash
cd backend
mvn spring-boot:run
```

- Backend runs on 👉 http://localhost:8080

### 2️⃣ Frontend (React)
```bash
cd frontend
npm install
npm start
```
- Frontend runs on 👉 http://localhost:3000

---

## 🔑 API Endpoints

- Auth:
  - POST /api/auth/register → Register new user
  - POST /api/auth/login → Login, returns JWT

- Quiz:
  - GET /api/quiz/questions → Fetch questions
  - POST /api/quiz/submit → Submit quiz answers

- Admin:
  - GET /api/admin/users → List users
  - DELETE /api/admin/users/{id} → Remove user
  - POST /api/admin/questions → Add question
  - PUT /api/admin/questions/{id} → Update question
  - DELETE /api/admin/questions/{id} → Delete question

---

## 🖥️ Admin Dashboard
   - Monitor registered users
   - Delete unwanted accounts
   - Manage quiz questions

---

## ✅ Future Improvements
   - Add quiz categories
   - Track scores & leaderboards
   - Timer for quizzes
   - Deploy on cloud (Heroku / Vercel)

---

## 🤝 Contributing

Pull requests are welcome! For major changes, open an issue first.

---

## 📚 Author
   - 👨‍💻 Enoch Jackson C
   - 📫 enochjackson441@gmail.com
