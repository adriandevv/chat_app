import { useAppStore } from "@/store";
import { useEffect, useRef } from "react";
import moment from "moment";
import { getMessages } from "@/api/messages";

export const MessageContainer = () => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const {
    selectedChatType,
    selectedChatData,
    userInfo,
    selectedChatMessages,
    setSelectedChatMessages,
  } = useAppStore();

  useEffect(() => {
    const fetchMessages = async () => {
      if (!selectedChatData._id) return;
      if (selectedChatType !== "contact") return;
      const res = await getMessages(selectedChatData._id);
     
        if (setSelectedChatMessages) {
          setSelectedChatMessages(res);
        }
        console.log("salida res:",res);

    };
    fetchMessages();
  }, [selectedChatData, selectedChatType]);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollIntoView({ behavior:"smooth"});
    }
    // return () => {

    // }
  }, [selectedChatMessages]); 

  const renderMessages = () => {
    let lastDate: string | null = null;
    return selectedChatMessages?.map((message) => {
      const messageDate = moment(message.timestamp).format("YYYY/MM/DD");
      const showDate = lastDate !== messageDate;
      lastDate = messageDate;
      return (
        <div key={message._id}>
          {showDate && (
            <div className="text-center text-gray-500 my-2">
              {moment(message.timestamp).format("YYYY/MM/DD")}
            </div>
          )}
          {selectedChatType === "contact" && renderDMMessage(message)}
        </div>
      );
    });
  };

  interface Message {
    _id: string;
    sender: string;
    messageType: string;
    messageContent: string;
    timestamp: string;
  }

  const renderDMMessage = (message: Message) => {
    return (
      <div
        className={`${
          message.sender === selectedChatData._id ? "text-right" : "text-left"
        }`}
      >
        {message.messageType === "text" && (
          <div
            className={`${
              message.sender !== selectedChatData._id
                ? "bg-[#8417ff]/5 text-[#8417ff]/90 border-[#8417ff]/50"
                : "bg-[#2a2b33]/5 text-white/80 border-[#ffffff]/20"
            } border inline-block p-4 rounded my-1 max-w-[50%] break-words`}
          >
            {message.messageContent}
          </div>
        )}
        <div className="text-xs text-gray-600">
          {moment(message.timestamp).format("LT")}
        </div>
      </div>
    );
  };
  return (
    <div className="flex-1 overflow-y-scroll scrollbar-hide p-4 px-8 md:w-[65vw] lg:w-[70vw] xl:w-[80vw] w-full">
      {renderMessages()}
      <div ref={scrollRef} />
    </div>
  );
};
