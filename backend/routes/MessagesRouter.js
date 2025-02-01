import {Router} from 'express';
import { getMessages ,uploadFile} from '../controllers/MessagesController.js';
import { authMiddleware } from '../middlewares/AuthMiddleware.js';
import multer from 'multer';

const messagesRoutes = Router();
const upload = multer({ dest: 'uploads/files' });
messagesRoutes.post("/get-messages", authMiddleware ,getMessages
);
messagesRoutes.post("/upload-file", authMiddleware,upload.single("file"), uploadFile);

export default messagesRoutes;