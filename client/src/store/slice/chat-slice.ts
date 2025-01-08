interface ChatSlice {
  selectedChatType: string;
  selectedChatData: string;
  selectedChatMessages: any[];
  setSelectedChatType: (selectedChatType: string | undefined) => void;
  setSelectedChatData: (selectedChatData: string) => void;
  setSelectedChatMessages: (selectedChatMessages: any[]) => void;
  closeChat: () => void;
}

export const createChatSlice = (set: (partial: Partial<ChatSlice>) => void): ChatSlice => ({
  selectedChatType: '',
  selectedChatData: '',
  selectedChatMessages: [],
  setSelectedChatType: (selectedChatType: string |  undefined) => set({ selectedChatType }),
  setSelectedChatData: (selectedChatData: string) => set({ selectedChatData }),
  setSelectedChatMessages: (selectedChatMessages: any[]) => set({ selectedChatMessages }),
  closeChat: () =>
    set({
      selectedChatData: undefined,
      selectedChatType: undefined,
      selectedChatMessages: [],
    }),
});
