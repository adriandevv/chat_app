
import { create } from "zustand";
import {createAuthSlice, UserInfo } from "./slice/auth-slice";
import { createChatSlice } from "./slice/chat-slice";


export interface AuthSlice {
    userInfo: UserInfo;
    setUserInfo: (userInfo: UserInfo ) => void;
    selectedChatType: string | undefined;
    selectedChatData: any;
    selectedChatMessages: any[];
    directMessagesContacts: any[];
    isUploadingFile: boolean;
    isDownloadingFile: boolean;
    fileUploadProgress: number;
    fileDownloadProgress: number;
    channels: any[];
    addChannelInChannelList: (channel: any) => void;
    setChannels: (channels: any[]) => void;
    addChannel: (channel: any) => void;
    setIsUploadingFile: (isUploadingFile: boolean) => void;
    setIsDownloadingFile: (isDownloadingFile: boolean) => void;
    setFileUploadProgress: (fileUploadProgress: number) => void;
    setFileDownloadProgress: (fileDownloadProgress: number) => void;
    setSelectedChatType: (chatType: string ) => void;
    setSelectedChatData: (selectedChatData: any) => void;
    setSelectedChatMessages: (selectedChatMessages: any) => void;
    closeChat: () => void;
    addMessage: (message: any) => void;
    setDirectMessagesContacts: (directMessagesContacts: any[]) => void;
    addContactInDmContacts: (contact: any) => void;
}

export const useAppStore = create<AuthSlice>((set,get) => ({
    ...createAuthSlice(set),
    ...createChatSlice(set,get),
  }));
