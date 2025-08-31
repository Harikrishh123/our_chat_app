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

mern-chat-app/
│
├── client/                   # React frontend
│   ├── public/               # Static files
│   └── src/
│       ├── assets/           # Images, icons
│       ├── components/       # Reusable UI components (Contacts, Logout, etc.)
│       ├── pages/            # Page components (Login, Register, Chat, SetAvatar)
│       ├── utils/            # API routes and helpers
│       ├── App.js            # Main app component
│       └── index.js          # React entry point
│
├── server/                   # Node.js backend
│   ├── controllers/          # Logic for handling requests
│   ├── models/               # Mongoose schemas (User, Message)
│   ├── routes/               # Express routes (auth, chat)
│   ├── utils/                # Utility functions (JWT, validation)
│   └── index.js              # Server entry point (Express + Socket.IO setup)
│
├── .gitignore
├── package.json              # Root package (if using workspaces, else client/server each have one)
└── README.md


---

## ⚡ Installation & Setup

### 1️⃣ Clone the repo
```bash
git clone https://github.com/your-username/mern-chat-app.git
cd mern-chat-app
```

###  2️⃣ Setup backend
```
cd server
npm install
```

## Create a .env file inside server/:
```
MONGO_URL=your_mongodb_connection_string
PORT=5000
JWT_SECRET=your_secret_key
```

## Run the backend:

```
npm start
```

### 3️⃣ Setup frontend
```
cd client
npm install
```

## Create a .env file inside client/:
```
REACT_APP_LOCALHOST_KEY=chat-app-user
```

## Run the frontend:

```
npm start
```

