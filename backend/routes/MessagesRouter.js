import {Router} from 'express';
import { getMessages } from '../controllers/MessagesController.js';
import { authMiddleware } from '../middlewares/AuthMiddleware.js';

const messagesRoutes = Router();
messagesRoutes.post("/get-messages", authMiddleware ,getMessages
);

export default messagesRoutes;