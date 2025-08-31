# 💬 MERN Chat Application

A real-time chat application built using the **MERN stack (MongoDB, Express.js, React.js, Node.js)** and **Socket.IO**.  
Users can register, log in, set an avatar, and chat in real-time with other users.  

---

## 🚀 Features

- 🔐 User authentication (Register & Login)  
- 🖼️ Set custom avatar images  
- 💬 Real-time messaging with Socket.IO  
- 📜 Message history stored in MongoDB  
- 🟢 Online/Offline user tracking  
- 🎨 Responsive UI using React + Styled Components  

---

## 🛠️ Tech Stack

**Frontend**  
- React.js  
- Styled Components  
- Axios  
- React Router  
- Socket.IO Client  

**Backend**  
- Node.js  
- Express.js  
- MongoDB (Mongoose)  
- Socket.IO  

---

## 📂 Project Structure
project/
│── client/ # React frontend
│ ├── src/
│ │ ├── pages/ # React pages (Login, Register, Chat, SetAvatar)
│ │ ├── components/ # UI components (Logout, Contacts, etc.)
│ │ └── utils/ # API routes
│
│── server/ # Node.js backend
│ ├── models/ # Mongoose schemas
│ ├── routes/ # Auth & Chat routes
│ ├── controllers/
│ └── index.js # Entry point
│
└── README.md

---

## ⚡ Installation & Setup

### 1️⃣ Clone the repo
```bash
git clone https://github.com/your-username/mern-chat-app.git
cd mern-chat-app


