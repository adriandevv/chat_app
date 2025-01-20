import { Server as SocketIOServer } from "socket.io";
import Message from "./models/MessagesModel.js";
export const setupSocket = (server) => {
  const io = new SocketIOServer(server, {
    cors: {
      origin: ["http://127.0.0.1:5173", "http://localhost:5173"],
      credentials: true,
    },
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
  });

  const userSocketMap = new Map();
  const sendMessage = async (data) => {
    const senderSocketId = userSocketMap.get(data.sender);
    const recipientSocketId = userSocketMap.get(data.recipient);
    const createdMessage = await Message.create(data);
    const messageData = await
      Message
        .findById(createdMessage._id)
        .populate('sender', "id email firstName image color")
        .populate('recipient', "id email firstName image color");

    if (recipientSocketId) {
      io.to(recipientSocketId).emit("recieveMessage", messageData);
    }
    if (senderSocketId) {
      io.to(senderSocketId).emit("recieveMessage", messageData);
    }
  };

  const disconnect = (socket) => {
    console.log(`User ${socket.id} disconnected`);

    for (const [userId, socketId] of userSocketMap.entries()) {
      if (socketId === socket.id) {
        userSocketMap.delete(userId);
        console.log(`User ${userId} disconnected`);
        break;
      }
    }
  };
  io.on("connection", (socket) => {
    const userId = socket.handshake.query.userId;

    if (userId) {
      userSocketMap.set(userId, socket.id);
      console.log(`User ${userId} connected with id: ${socket.id}`);
    } else {
      console.log("User ID not provided during connection");
    }
    socket.on("sendMessage", sendMessage)
    socket.on("disconnect", disconnect);
  });


};
