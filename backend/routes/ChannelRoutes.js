import { Router } from "express";

const channelRoutes = Router();
channelRoutes.post("/create-channel", authMiddleware, createChannel);

export default channelRoutes;