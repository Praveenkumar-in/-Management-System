# Smart Queue Management System for College Fee Payment

A **full-stack MERN application** that digitizes the fee payment queue in college accounts offices.  
Students can generate **digital tokens**, track their position in the queue, and receive **real-time updates and SMS notifications**.

Admins can manage the queue using a **control dashboard**, and a **public display board** shows the current token on a monitor.

---


---

# Tech Stack

## Frontend
- React (Vite)
- Bootstrap 5
- Bootstrap Icons
- Socket.io Client
- Axios
- React Router

## Backend
- Node.js
- Express.js
- MongoDB (Mongoose)
- Socket.io
- JWT Authentication
- SMS Integration (Fast2SMS)

## Deployment
- Vercel (Frontend)
- Render (Backend)
- MongoDB Atlas (Database)

---

# Features

## Student

- Student Registration
- Student Login
- Generate Digital Token
- View Queue Position
- See Students Ahead
- Estimated Waiting Time
- Real-time queue updates
- SMS notification when token generated
- SMS alert when turn is near

---

## Admin

- Admin Login
- Call Next Token
- Call Next 10 Tokens
- Skip Token
- Reset Queue
- View Queue List
- Real-time dashboard updates
- Monitor display button

---

## Public Display Board

Designed for **large monitor / TV display** in the office.

Shows:

- Current token being served
- Next tokens in queue
- Counter information
- Live updates using WebSockets

---

# Project Structure

```
smart-queue-management
│
├── backend
│   ├── config
│   │   └── db.js
│   │
│   ├── controllers
│   │   ├── authController.js
│   │   ├── tokenController.js
│   │   └── adminController.js
│   │
│   ├── models
│   │   ├── User.js
│   │   ├── Token.js
│   │   └── QueueSession.js
│   │
│   ├── routes
│   │   ├── authRoutes.js
│   │   ├── tokenRoutes.js
│   │   └── adminRoutes.js
│   │
│   ├── middleware
│   │   └── authMiddleware.js
│   │
│   ├── services
│   │   └── smsService.js
│   │
│   ├── socket
│   │   └── socket.js
│   │
│   ├── server.js
│   └── package.json
│
└── frontend
    ├── src
    │   ├── components
    │   │   └── Navbar.jsx
    │   │
    │   ├── pages
    │   │   ├── StudentLogin.jsx
    │   │   ├── StudentRegister.jsx
    │   │   ├── StudentDashboard.jsx
    │   │   ├── AdminLogin.jsx
    │   │   ├── AdminDashboard.jsx
    │   │   └── DisplayBoard.jsx
    │   │
    │   ├── services
    │   │   └── api.js
    │   │
    │   ├── socket
    │   │   └── socket.js
    │   │
    │   ├── App.jsx
    │   └── main.jsx
```

---

# API Endpoints

## Authentication

```
POST /api/auth/register
POST /api/auth/login-student
POST /api/auth/login-admin
```

---

## Token System

```
POST /api/token/generate
GET  /api/token/status
GET  /api/token/queue
```

---

## Admin Controls

```
POST /api/admin/call-next
POST /api/admin/call-next-10
POST /api/admin/skip
POST /api/admin/reset
```

---

# Real-Time Events (Socket.io)

Events emitted by server:

```
queueUpdated
tokenGenerated
tokenCalled
queueReset
```

These update:

- Student dashboards
- Admin dashboard
- Display board

---







# Deployment

## Frontend → Vercel

1. Push project to GitHub
2. Import project in Vercel
3. Select `frontend` folder
4. Deploy

---

## Backend → Render

1. Create new Web Service
2. Connect GitHub repository
3. Set root directory:

```
backend
```

4. Start command

```
node server.js
```

---

# Screenshots

### Student Dashboard
(Add screenshot here)

### Admin Control Panel
(Add screenshot here)

### Public Display Board
(Add screenshot here)

---

# Future Improvements

- Voice announcement for tokens
- Multi-counter support
- Mobile PWA app
- Queue analytics dashboard
- SMS reminders when turn approaches

---

## 👨‍💻 Author
**Praveen Kumar**  

🔗 [LinkedIn](https://www.linkedin.com/in/praveenkumar65/)  
🔗 [GitHub](https://github.com/Praveenkumar-in)  
- ⚠️ This project is protected under All Rights Reserved.
- Unauthorized copying or use of this code is prohibited.
