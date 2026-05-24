import express from 'express'
import { getUserChats, accessChat } from '../controllers/chat.controller.js'
import authMiddleware from '../middlewares/auth.middleware.js'

const router = express.Router();

router.get("/chats", authMiddleware, getUserChats);
router.post("/access", authMiddleware, accessChat)

export default router;
