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
  addChannelInChannelList: (channel: any) => void;
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
  addContactInDmContacts: (message: any) => void;
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
  addChannelInChannelList : (channel: any) => {
    const channels = get().channels;
    const data = channels.find((ch) => ch._id === channel.channelId);
    const index = channels.findIndex((ch) => ch._id === channel.channelId);
    if(index !==1 && index !== undefined){
      channels.splice(index, 1);
      channels.unshift(data);

    }
  },
  addContactInDmContacts: (message) =>{
    const userId = get().userInfo.id;
    const setDirectMessagesContacts = get().setDirectMessagesContacts;
    const fromId = message.sender._id === userId ? message.recipient._id : message.sender._id;
    
    const fromData = message.sender._id === userId ? message.recipient : message.sender;
    const dmContacts = get().directMessagesContacts;
    
    const data = dmContacts.find((contact) => contact._id === fromId);

    const index = dmContacts.findIndex((contact) => contact._id === fromId);
    console.log("addContactInDmContacts",{data,index,dmContacts,userId,message,fromData});
    if(index !==-1 && index !== undefined){
      dmContacts.splice(index, 1);
      dmContacts.unshift(data);
    } else {
      dmContacts.unshift(fromData);
    }
    setDirectMessagesContacts(dmContacts);
  }
});
