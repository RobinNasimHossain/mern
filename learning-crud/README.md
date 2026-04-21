# MERN CRUD — Student Manager (শিক্ষার্থী ম্যানেজার)

> A learning-purpose MERN CRUD application with step-by-step debugging guide in **Bangla** and **English**.
>
> শেখার উদ্দেশ্যে তৈরি MERN CRUD অ্যাপ্লিকেশন — **বাংলা** ও **ইংরেজি** তে ধাপে ধাপে ডিবাগিং গাইড সহ।

## Features (বৈশিষ্ট্য)

- **Full CRUD** — Create, Read, Update, Delete students
- **Bilingual Comments** — Every file has Bangla + English explanations
- **Debugging Guide** — Comprehensive [DEBUGGING_GUIDE.md](./DEBUGGING_GUIDE.md)
- **React 18 + Vite + Tailwind** — Modern frontend stack
- **Express + Mongoose** — Clean REST API backend
- **Validation** — Both client-side and server-side

## Tech Stack (প্রযুক্তি)

| Layer          | Technology                    |
| -------------- | ----------------------------- |
| Frontend       | React 18, Vite, Tailwind CSS  |
| Backend        | Express.js, Node.js           |
| Database       | MongoDB, Mongoose             |
| HTTP Client    | Axios                         |

## Project Structure (প্রজেক্ট গঠন)

```
learning-crud/
├── DEBUGGING_GUIDE.md          # 📖 Bilingual debugging guide
├── README.md                   # 📄 This file
├── package.json                # 🔧 Root scripts
├── server/
│   ├── package.json
│   ├── index.js                # 🚀 Server entry point
│   ├── models/
│   │   └── Student.js          # 📋 Mongoose schema
│   └── routes/
│       └── students.js         # 🛤️ CRUD routes
└── client/
    ├── package.json
    ├── index.html
    ├── vite.config.js           # ⚡ Vite + proxy config
    ├── tailwind.config.js
    ├── src/
    │   ├── main.jsx             # 🏠 React entry point
    │   ├── App.jsx              # 🎯 Main component
    │   ├── api.js               # 🌐 API helper (Axios)
    │   ├── index.css            # 🎨 Tailwind imports
    │   └── components/
    │       ├── StudentForm.jsx  # 📝 Create/Edit form
    │       └── StudentList.jsx  # 📋 Student list display
    └── .eslintrc.cjs
```

## Quick Start (দ্রুত শুরু)

```bash
# 1. Install dependencies (ডিপেন্ডেন্সি ইনস্টল)
cd learning-crud
npm run install:all

# 2. Start MongoDB (MongoDB চালু করুন)
docker start mern-mongo
# Or: mongod

# 3. Start the server (সার্ভার চালু — Terminal 1)
npm run dev:server
# → http://localhost:4000

# 4. Start the client (ক্লায়েন্ট চালু — Terminal 2)
npm run dev:client
# → http://localhost:5173
```

## API Endpoints (API এন্ডপয়েন্ট)

| Method | Path               | Description                              |
| ------ | ------------------ | ---------------------------------------- |
| GET    | `/api/students`    | Get all students (সব শিক্ষার্থী)         |
| GET    | `/api/students/:id`| Get one student (একজন শিক্ষার্থী)        |
| POST   | `/api/students`    | Create student (নতুন শিক্ষার্থী তৈরি)    |
| PUT    | `/api/students/:id`| Update student (শিক্ষার্থী আপডেট)        |
| DELETE | `/api/students/:id`| Delete student (শিক্ষার্থী মুছে ফেলা)     |
| GET    | `/api/health`      | Health check (সার্ভার স্ট্যাটাস)          |

## Debugging Guide (ডিবাগিং গাইড)

See the comprehensive [DEBUGGING_GUIDE.md](./DEBUGGING_GUIDE.md) for:
- Common errors and their solutions
- Step-by-step debugging techniques
- Tool recommendations
- All in Bangla + English!

---

**Happy Learning! শুভ শিক্ষা! 📚**
