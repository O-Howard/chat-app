import { Server } from "socket.io";
import Message from "../models/message.model.js";
import jwt from "jsonwebtoken"

const initSocket = (server) => {
    const io = new Server(server, {
        cors: {
        origin: "*",
        },
    });

    io.use((socket, next) => {
        const token = socket.handshake.auth?.token;

        if (!token) {
            return next(new Error("No token provided"));
        }

        try {
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            socket.user = decoded; 
            next();
        } catch (err) {
            return next(new Error("Invalid token"));
        }
    });

    io.on("connection", (socket) => {
        console.log("User connected", socket.user.id);

        socket.on("join_chat", (chatId) => {
            socket.join(chatId);
            console.log(`User ${socket.id} joined chat ${chatId}`);
        });

        socket.on("send_message", async (data) => {
            const { chatId, text } = data;

            const newMessage = await Message.create({
                chat: chatId,
                text: text,
                sender: socket.user.id,
            });

            io.to(chatId).emit("receive_message", newMessage);
        });
    });
};

export default initSocket;
