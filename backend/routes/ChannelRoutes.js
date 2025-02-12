import { Router } from "express";
import { authMiddleware } from '../middlewares/AuthMiddleware.js';
import { createChannel, getUserChannels,getChannelMessages } from '../controllers/ChannelController.js';

const channelRoutes = Router();
channelRoutes.get("/get-channel-messages/:channelId", authMiddleware , getChannelMessages);
channelRoutes.post("/create-channel", authMiddleware , createChannel);
channelRoutes.get("/get-user-channels", authMiddleware , getUserChannels);

export default channelRoutes;