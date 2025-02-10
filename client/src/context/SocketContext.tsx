import { useAppStore } from "@/store";
import { HOST } from "@/utils/constantes";
import { createContext, useContext, useEffect, useRef, ReactNode } from "react";
import io, { Socket } from "socket.io-client";

export const SocketContext = createContext<Socket | null>(null);

export const useSocket = (): Socket | null => {
  return useContext(SocketContext);
};

interface SocketProviderProps {
  children: ReactNode;
}

export const SocketProvider = ({
  children,
}: SocketProviderProps): JSX.Element => {
  const socket = useRef<Socket | null>(null);

  const { userInfo } = useAppStore();

  useEffect(() => {
    if (userInfo) {
      socket.current = io(HOST, {
        withCredentials: true,
        query: {
          userId: userInfo.id,
        },
      });

      socket.current.on("connect", () => {
        console.log("Connected to socket server");
      });
    }

    const handleRecieveMessage = (message: any) => {
      const { selectedChatData, selectedChatType, addMessage } =
        useAppStore.getState();
      if (
        (selectedChatType !== undefined &&
          selectedChatData._id === message.sender._id) ||
        selectedChatData._id === message.recipient._id
      ) {
        console.log("Mensaje Recibido:", message);
        addMessage(message);
      }
    };
    const handleRecieveChannelMessage = (message: any) => {
      const { selectedChatData, selectedChatType, addMessage } =
        useAppStore.getState();
        console.log("Mensaje Recibido:", message);
      if (
        selectedChatType !== undefined &&
        selectedChatData._id === message.channelId
      ) {
        addMessage(message);
      }
    };

    socket.current?.on("recieveMessage", handleRecieveMessage);
    socket.current?.on("recieve-channel-message", handleRecieveChannelMessage);
    return () => {
      if (socket.current) {
        socket.current.disconnect();
      }
    };
  }, [userInfo]);

  return (
    <SocketContext.Provider value={socket.current}>
      {children}
    </SocketContext.Provider>
  );
};
