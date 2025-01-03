import { useEffect, useRef, useState } from "react";
import { GrAttachment } from "react-icons/gr";
import { IoSend } from "react-icons/io5";
import { RiEmojiStickerLine } from "react-icons/ri";
import { toast } from "sonner";
import  EmojiPicker, { EmojiStyle }  from "emoji-picker-react";

export const MessageBar = () => {
  const emojiRef = useRef<HTMLDivElement>(null);
  const [message, setMessage] = useState<string>("");
  const [showEmoji, setShowEmoji] = useState<boolean>(false);

  useEffect(() => {
     function handleClickOutside(event: MouseEvent) {
      if (emojiRef.current && !emojiRef.current.contains(event.target as Node)) {
        setShowEmoji(false);
      }
     }
    

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };


}, [emojiRef]);
  const handleAddEmoji = ({emoji}: {emoji:string}) => {
    setMessage((prev) => prev + emoji);
  };
  const handleSendMessage = async () => {
    toast.success("Mensaje enviado");
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
        <button className="text-neutral-500 focus:border-none focus:outline-none focus:text-white duration-300 transition-all">
          <GrAttachment className="text-2xl" />
        </button>
        <div className="relative">
          <button className="text-neutral-500 focus:border-none focus:outline-none focus:text-white duration-300 transition-all"
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
