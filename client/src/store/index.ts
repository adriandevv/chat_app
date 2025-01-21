
import { create } from "zustand";
import {createAuthSlice, UserInfo } from "./slice/auth-slice";
import { createChatSlice } from "./slice/chat-slice";


export interface AuthSlice {
    userInfo?: UserInfo | undefined;
    setUserInfo?: (userInfo: UserInfo | undefined) => void;
    selectedChatType?: any;
    selectedChatData?: any;
    selectedChatMessages?: any[];
    setSelectedChatType?: (chatType: string |  undefined ) => void;
    setSelectedChatData?: (selectedChatData: any) => void;
    setSelectedChatMessages?: (selectedChatMessages: any) => void;
    closeChat?: () => void;
    addMessage?: (message: any) => void;
}

export const useAppStore = create<AuthSlice>((set) => ({
    ...createAuthSlice(set),
    ...createChatSlice(set),
  }));
