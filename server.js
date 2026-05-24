import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors'
import http from 'http'
import connectDB from './config/db.js'
import authRoutes from './routes/auth.route.js'
import chatRoutes from './routes/chat.route.js'
import userRoutes from './routes/user.route.js'
import messageRoutes from './routes/message.route.js'
import initSocket from './sockets/socket.js';

dotenv.config();

const PORT = process.env.PORT;
const app = express();
const server = http.createServer(app);
initSocket(server);

connectDB();

app.use(express.json())
app.use(cors());

app.use("/api/auth", authRoutes);
app.use("/api/chat" ,chatRoutes);
app.use("/api/user", userRoutes);
app.use("/api/message", messageRoutes)



server.listen(PORT, ()=>{
    console.log(`Server is listening on port ${PORT}`);
})