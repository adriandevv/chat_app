import {Router} from 'express';
import { addProfileImage, deleteProfileImage, getUserInfo, login, signup, updateProfile } from '../controllers/AuthController.js';
import { authMiddleware } from '../middlewares/AuthMiddleware.js';
import multer from 'multer';


const upload = multer({dest: "uploads/profiles/"});
const authRoutes = Router();
authRoutes.post("/signup",signup
);
authRoutes.post("/login",login);
authRoutes.get("/user-info",authMiddleware, getUserInfo);
authRoutes.post("/update-profile",authMiddleware, updateProfile);
authRoutes.post("/add-profile-image",authMiddleware,upload.single('profile-image'), addProfileImage);
authRoutes.delete("/delete-profile-image",authMiddleware, deleteProfileImage);
export default authRoutes;