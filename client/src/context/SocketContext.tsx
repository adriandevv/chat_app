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

export const SocketProvider = ({ children }: SocketProviderProps): JSX.Element => {
    const socket = useRef<Socket | null>(null);
    const { userInfo } = useAppStore();

    useEffect(() => {
        if (userInfo) {
            socket.current = io(HOST, {
                withCredentials: true,
                query: {
                    userId: userInfo.id
                }
            });

            socket.current.on("connect", () => {
                console.log("Connected to socket server");
            });
        }
        const handleRecieveMessage = (message: any) => {
            const { selectedChatData, selectedChatType } = useAppStore();
            if (selectedChatType !== undefined) {

            }
        };

        socket.current?.on("recievedMessage", handleRecieveMessage);

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