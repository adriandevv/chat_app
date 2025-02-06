import {Router} from 'express';
import { getAllContacts, getContactsForDMList, searchContacts } from '../controllers/ContactController.js';
import { authMiddleware } from '../middlewares/AuthMiddleware.js';

const contactRoutes = Router();
contactRoutes.post("/search", authMiddleware ,searchContacts
);
contactRoutes.get("/get-contacts-for-dm", authMiddleware, getContactsForDMList);
contactRoutes.get("/get-all-contacts", authMiddleware, getAllContacts);


export default contactRoutes;