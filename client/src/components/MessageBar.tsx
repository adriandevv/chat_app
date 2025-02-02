import { useEffect, useRef, useState } from "react";
import { GrAttachment } from "react-icons/gr";
import { IoSend } from "react-icons/io5";
import { RiEmojiStickerLine } from "react-icons/ri";
import { toast } from "sonner";
import EmojiPicker, { EmojiStyle } from "emoji-picker-react";
import { useAppStore } from "@/store";
import { useSocket } from "@/context/SocketContext";
import { uploadMessageFile } from "@/api/messages";

export const MessageBar = () => {
  const emojiRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { selectedChatType, selectedChatData, userInfo } = useAppStore();
  const [message, setMessage] = useState<string>("");
  const [showEmoji, setShowEmoji] = useState<boolean>(false);
  const socket = useSocket();

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        emojiRef.current &&
        !emojiRef.current.contains(event.target as Node)
      ) {
        setShowEmoji(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [emojiRef]);
  const handleAddEmoji = ({ emoji }: { emoji: string }) => {
    setMessage((prev) => prev + emoji);
  };
  const handleSendMessage = async () => {
    if (selectedChatType === "contact") {
      if (userInfo?.id) {
        socket.emit("sendMessage", {
          sender: userInfo.id,
          messageContent: message,
          recipient: selectedChatData._id,
          messageType: "text",
          fileUrl: undefined,
        });
      }
    }
    toast.success("Mensaje enviado");
  };

  const handleAttachmentClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };
  const handleAttachmentChange = async (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    try {
      const file = e.target.files?.[0];
      if (!file) return;
      const formData = new FormData();
      formData.append("File", file);
      const res = await uploadMessageFile(formData);
      if (res.filePath) {
        if (selectedChatType === "contact") {
          if (userInfo?.id) {
            socket.emit("sendMessage", {
              sender: userInfo.id,
              messageContent: undefined,
              recipient: selectedChatData._id,
              messageType: "file",
              fileUrl: res.filePath,
            });
          }
        }
      }
      console.log(res);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="h-[10vh] bg-[#1c11d25] flex justify-center items-center px-8 mb-6 gap-6">
      <div className="flex-1 flex bg-[#2a2b33] rounded-md items-center gap-5 pr-5">
        <input
          type="text"
          className="flex-1 p-5 bg-transparent rounded-md focus:border-none focus:outline-none noto-color-emoji-regular "
          placeholder="Mensaje"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <button
          className="text-neutral-500 focus:border-none focus:outline-none focus:text-white duration-300 transition-all"
          onClick={handleAttachmentClick}
        >
          <GrAttachment className="text-2xl" />
        </button>
        <input
          type="file"
          ref={fileInputRef}
          className="hidden"
          accept="image/*"
          onChange={handleAttachmentChange}
        />
        <div className="relative">
          <button
            className="text-neutral-500 focus:border-none focus:outline-none focus:text-white duration-300 transition-all"
            onClick={() => setShowEmoji(!showEmoji)}
          >
            <RiEmojiStickerLine className="text-2xl" />
          </button>
          <div className="absolute bottom-16 right-0">
            <div ref={emojiRef}>
              <EmojiPicker
                theme={"dark" as any}
                open={showEmoji}
                onEmojiClick={handleAddEmoji}
                autoFocusSearch={false}
                emojiStyle={EmojiStyle.GOOGLE}
              />
            </div>
          </div>
        </div>
      </div>
      <button
        className="bg-[#8417ff] rounded-md flex items-center justify-center p-5 focus:border-none
      hover:bg-[#741bda] focus:bg-[#741bda] focus:outline-none focus:text-white duration-300 transition-all"
        onClick={handleSendMessage}
      >
        <IoSend className="text-2xl" />
      </button>
    </div>
  );
};
