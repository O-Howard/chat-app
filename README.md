## 💬 Real-Time Chat Backend

A backend system for a real-time chat application built with Node.js, Express, Socket.IO, and MongoDB.  
The system supports authentication, private messaging, and real-time communication using WebSockets design.

---

## Tech Stack

- Node.js
- Express.js
- Socket.IO
- MongoDB + Mongoose
- JWT Authentication

---

## Features

- User registration and login with JWT authentication
- Real-time messaging using Socket.IO
- Private chats (rooms)
- Persistent message storage in MongoDB
- Secure protected API routes

---

## System Flow

1. User registers / logs in
2. Server returns JWT token
3. Client connects to Socket.IO with token
4. User joins a chat room
5. Messages are saved in MongoDB
6. Messages are sent in real-time to all users in the room

---

## Architecture

- Client (Postman / Frontend)
         ↓
- Express REST API
         ↓
- Socket.IO Server
         ↓
- MongoDB Database

---

## API Routes

- POST /api/auth/register
- POST /api/auth/login
- GET  /api/auth/:profile
- GET  /api/chat/chats
- POST /api/chat/access
- GET  /api/message/:chatId
- GET  /api/user/search
- get  /api/user/:id

---

## Socket Events

- join_chat
- send_message
- receive_message

---

## Installation

- git clone https://github.com/O-Howard/chat-app
- cd chat-app
- npm install

---

## Run server

npm run dev

---

## Environment Variables

- PORT=5000
- MONGO_URI=your_mongo_url
- JWT_SECRET=your_secret

---

## Future Improvements

- Typing indicators
- Message read receipts
- File/image sharing

---

Live API: https://chat-app-i4ve.onrender.com

