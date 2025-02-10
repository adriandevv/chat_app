import { useAppStore } from "@/store";
import { RiCloseFill } from "react-icons/ri";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { HOST } from "@/utils/constantes";
import { getColor } from "@/lib/utils";
export const ChatHeader = () => {
  const { closeChat, selectedChatData,selectedChatType } = useAppStore();
  const handleClose = () => {
    if (closeChat) {
      closeChat();
    }
  };
  return (
    <div className="h-[10vh] border-b-2 border-[#2f303b] flex items-center justify-center">
      <div className="flex gap-5 p-5 items-center justify-between w-full">
        <div className="flex gap-3 items-center justify-center">
          <div className="flex items-center gap-5 cursor-pointer">
            {selectedChatType !=='contact' ? (
              <div className="bg-[#ffffff22] size-10 flex items-center justify-center rounded-full">
                #
              </div>
            ) : (
              <Avatar className="h-12 w-12 rounded-full overflow-hidden">
                <AvatarImage
                  alt="Avatar profile"
                  src={`${HOST}/${selectedChatData.Image}`}
                  className="object-cover h-full w-full bg-black rounded-full"
                />
                <AvatarFallback
                  className={`h-12 w-12 text-5xl ${getColor(
                    selectedChatData.color || 0
                  )}`}
                >
                  {selectedChatData.firstName?.charAt(0)?.toUpperCase() || "A"}
                </AvatarFallback>
              </Avatar>
            )}

            <div className="flex flex-col">
              {selectedChatType !=='contact' && <span>{selectedChatData?.name}</span>}
              {selectedChatData.firstName ? (
                <span>
                  {selectedChatData.firstName} {selectedChatData.lastName}
                </span>
              ) : (
                <span className="text-xs">{selectedChatData.email}</span>
              )}
            </div>
          </div>
        </div>
        <div className="flex items-center justify-center gap-5">
          <button
            onClick={handleClose}
            className="text-neutral-500 focus:border-none focus:outline-none focus:text-white duration-300 transition-all"
          >
            <RiCloseFill className="text-3xl" />
          </button>
        </div>
      </div>
    </div>
  );
};
