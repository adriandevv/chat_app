import {Router} from 'express';
import { getUSerInfo, login, singup } from '../controllers/AuthController.js';


const authRoutes = Router();
authRoutes.post("/signup",singup
);
authRoutes.post("/login",login);
authRoutes.get("/userInfo", getUSerInfo)

export default authRoutes;