import { Router } from "express";
import { authMiddleware } from '../middlewares/AuthMiddleware.js';
import { createChannel, getUserChannels } from '../controllers/ChannelController.js';

const channelRoutes = Router();
channelRoutes.post("/create-channel", authMiddleware , createChannel);
channelRoutes.get("/get-user-channels", authMiddleware , getUserChannels);


export default channelRoutes;