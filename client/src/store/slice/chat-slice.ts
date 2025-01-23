interface ChatSlice {
  selectedChatType: string;
  selectedChatData: string;
  selectedChatMessages: any[];
  setSelectedChatType: (selectedChatType: string | undefined) => void;
  setSelectedChatData: (selectedChatData: string) => void;
  setSelectedChatMessages: (selectedChatMessages: any[]) => void;
  closeChat: () => void;
  addMessage: (message: any) => void;
}

export const createChatSlice = (
  set,
  get
) => ({
  selectedChatType: "",
  selectedChatData: "",
  selectedChatMessages: [],
  setSelectedChatType: (selectedChatType: string | undefined) =>
    set({ selectedChatType }),
  setSelectedChatData: (selectedChatData: string) => set({ selectedChatData }),
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
          sender: selectedChatType === "channel"
          ? message.sender
          : message.sender._id,
        },
      ],
    });
  },
});
