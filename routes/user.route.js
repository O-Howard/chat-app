import express from 'express'
import { getUser, searchUser } from '../controllers/user.controller.js'
import authMiddleware from '../middlewares/auth.middleware.js'

const router = express.Router();

router.get("/search", authMiddleware, searchUser);
router.get("/:id", authMiddleware, getUser);

export default router;