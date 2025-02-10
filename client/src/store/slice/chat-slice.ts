interface ChatSlice {
  selectedChatType: string;
  selectedChatData: string;
  selectedChatMessages: any[];
  directMessagesContacts: any[];
  isUploadingFile: boolean;
  isDownloadingFile: boolean;
  fileUploadProgress: number;
  fileDownloadProgress: number;
  channels: any[];
  setChannels: (channels: any[]) => void;
  setSelectedChatType: (selectedChatType: string | undefined) => void;
  setSelectedChatData: (selectedChatData: string) => void;
  setSelectedChatMessages: (selectedChatMessages: any[]) => void;
  setDirectMessagesContacts: (directMessagesContacts: any[]) => void;
  closeChat: () => void;
  addChannel: (channel: any) => void;
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
  channels:[],

  setChannels: (channels: any[]) => set({ channels }),
  setSelectedChatType: (selectedChatType: string | undefined) =>
    set({ selectedChatType }),
  setIsUploadingFile: (isUploadingFile: boolean) => set({ isUploadingFile }),
  setIsDownloadingFile: (isDownloadingFile: boolean) =>
    set({ isDownloadingFile }),
  setFileUploadProgress: (fileUploadProgress: number) => set({ fileUploadProgress }),
  setFileDownloadProgress: (fileDownloadProgress: number) =>
    set({ fileDownloadProgress }),
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
    addChannel: (channel: any) => {
    const channels = get().channels;
    set({ channels: [...channels, channel] });
  },
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
