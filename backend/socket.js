import { Server as SocketIOServer } from "socket.io";

export const setupSocket = (server) => {
  const io = new SocketIOServer(server, {
    cors: {
      origin: "http://127.0.0.1:5173",
    },
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
    credentials: true,
  });

  const userSocketMap = new Map();
  const disconnect = (socket) => {
    console.log(`User ${socket.id} disconnected`);
    
     for(const [userId,socketId] of userSocketMap.entries() ){
        if(socketId === socket.id){
            userSocketMap.delete(userId);
            console.log(`User ${userId} disconnected`);
            break;
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
  });

  socket.on("disconnect", disconnect);
};
