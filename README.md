# 🎓 Learning Management System (LMS)

An intuitive platform for schools to manage staff, students, and courses, with built-in real-time video call support using **Agora**.  
Admins can onboard their schools, create accounts for staff and students (credentials delivered via email), and assign courses. Lecturers can then manage their students and host live video calls, while students can log in and join their assigned courses.

🔗 **Live Demo**: [Learning Management System](https://learning-management-system-ten-bay.vercel.app)

---

## 🚀 Tech Stack

- **Frontend**: React (Vite) + TypeScript + Tailwind CSS  
- **Backend**: Node.js + Express  
- **Database**: MongoDB  
- **Email Service**: Nodemailer (SMTP)  
- **Authentication**: JWT (JSON Web Tokens)  
- **Video Calls**: Agora SDK  

---

## ✨ Features

### 👩‍💼 Admin
- Register a school
- Create staff & student accounts (credentials sent by email)
- Create courses
- Assign staff and students to courses

### 👨‍🏫 Staff (Lecturer)
- Log in with emailed credentials
- View assigned students
- Host live video calls with students via Agora

### 👩‍🎓 Student
- Log in with emailed credentials
- View assigned courses
- Join live video call sessions

---

## 📦 Installation

### 1. Clone the Repository
```bash
git clone https://github.com/AbiolaDave/learning-management-system.git
cd learning-management-system

```



---
### 2. Setup Frontend
cd frontend
npm install


### 3. Setup Backend
cd ../backend
npm install

### 4. Environment Variables

## Create a .env file in backend with:
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret

# Email Config
EMAIL_HOST=smtp.yourprovider.com
EMAIL_PORT=587
EMAIL_USER=your_email@example.com
EMAIL_PASS=your_password

# Agora Config
AGORA_APP_ID=your_agora_app_id
AGORA_APP_CERTIFICATE=your_agora_certificate

## And in frontend with:
VITE_API_URL=http://localhost:5000
VITE_AGORA_APP_ID=your_agora_app_id

## Running Locally

Open two terminals:

## Backend
cd backend
npm start

## Frontend
cd frontend
npm run dev

npm run dev

Frontend will run on http://localhost:5173

Backend will run on http://localhost:5000

## 📖 Usage Flow
1. Admin signs up → creates a school profile.  
2. Admin adds staff and students → credentials are emailed automatically.  
3. Staff and students log in using emailed credentials.  
4. Admin creates a course → assigns staff and students.  
5. Lecturers can view their students and host video calls.  
6. Students join assigned courses and participate in calls.  

## 📡 API Endpoints (Examples)

| Method | Endpoint                          | Description                          |
|--------|-----------------------------------|--------------------------------------|
| POST   | `/api/admin/signup`              | Register new admin/school            |
| POST   | `/api/admin/create-staff`        | Add staff and send login email       |
| POST   | `/api/admin/create-student`      | Add student and send login email     |
| POST   | `/api/courses`                   | Create new course                    |
| POST   | `/api/courses/:id/assign-staff`  | Assign staff to course               |
| POST   | `/api/courses/:id/assign-student`| Assign students to course            |
| GET    | `/api/lecturer/:id/students`     | Get students for a lecturer’s course |
| POST   | `/api/lecturer/:id/start-call`   | Initiate video call (Agora)          |

## Future Improvements

    Student dashboard with progress tracking

    Course material uploads (documents, videos, assignments)

    Video session recording

    In-call chat and screen sharing

    Mobile-friendly UI/React Native app

## Contributing

Contributions are welcome!

    Fork the repo

    Create a new branch (feature/your-feature)

    Commit your changes

    Open a Pull Request

```bash
