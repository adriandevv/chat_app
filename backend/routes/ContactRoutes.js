import {Router} from 'express';
import { searchContacts } from '../controllers/ContactController.js';
import { authMiddleware } from '../middlewares/AuthMiddleware.js';

const contactRoutes = Router();
contactRoutes.post("/search", authMiddleware ,searchContacts
);

export default contactRoutes;