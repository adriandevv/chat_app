interface ChatSlice {
  selectedChatType: string;
  selectedChatData: string;
  selectedChatMessages: any[];
  directMessagesContacts: any[];
  isUploadingFile: boolean;
  isDownloadingFile: boolean;
  fileUploadProgress: number;
  fileDownloadProgress: number;
  setSelectedChatType: (selectedChatType: string | undefined) => void;
  setSelectedChatData: (selectedChatData: string) => void;
  setSelectedChatMessages: (selectedChatMessages: any[]) => void;
  setDirectMessagesContacts: (directMessagesContacts: any[]) => void;
  closeChat: () => void;
  addMessage: (message: any) => void;
  setIsUploadingFile: (isUploadingFile: boolean) => void;
  setIsDownloadingFile: (isDownloadingFile: boolean) => void;
  setFileUploadProgress: (fileUploadProgress: number) => void;
  setFileDownloadProgress: (fileDownloadProgress: number) => void;
}

export const createChatSlice = (
  set: any,
  get: any
): ChatSlice => ({
  selectedChatType: "",
  selectedChatData: "",
  selectedChatMessages: [],
  directMessagesContacts: [],
  isUploadingFile: false,
  isDownloadingFile: false,
  fileUploadProgress: 0,
  fileDownloadProgress: 0,
  setIsUploadingFile: (isUploadingFile: boolean) => set({ isUploadingFile }),
  setIsDownloadingFile: (isDownloadingFile: boolean) =>
    set({ isDownloadingFile }),
  setFileUploadProgress: (fileUploadProgress: number) => set({ fileUploadProgress }),
  setFileDownloadProgress: (fileDownloadProgress: number) =>
    set({ fileDownloadProgress }),
  setSelectedChatType: (selectedChatType: string | undefined) =>
    set({ selectedChatType }),
  setSelectedChatData: (selectedChatData: string) => set({ selectedChatData }),
  setDirectMessagesContacts: (directMessagesContacts: any[]) =>
    set({ directMessagesContacts }),
  setSelectedChatMessages: (selectedChatMessages: any[]) =>
    set({ selectedChatMessages }),
  closeChat: () =>
    set({
      selectedChatData: undefined,
      selectedChatType: undefined,
      selectedChatMessages: [],
    }),
  addMessage: (message: any) => {
    const selectedChatMessages = get().selectedChatMessages;
    const selectedChatType = get().selectedChatType;

    set({
      selectedChatMessages: [
        ...selectedChatMessages,
        {
          ...message,
          recipient:
            selectedChatType === "channel"
              ? message.recipient
              : message.recipient._id,
          sender:
            selectedChatType === "channel"
              ? message.sender
              : message.sender._id,
        },
      ],
    });
  },
});
