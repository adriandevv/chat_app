import { ChatContainer } from "@/components/ChatContainer";
import { ContactsContainer } from "@/components/ContactsContainer";
import { EmptyChatContainer } from "@/components/EmptyChatContainer";
import { useAppStore } from "@/store";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

const Chat = () => {
  const { userInfo, selectedChatType, selectedChatData } = useAppStore();
  const navigate = useNavigate();
  console.log("selectedChatData", selectedChatData);

  useEffect(() => {
    if (!userInfo?.profileSetup) {
      toast("Por favor completa tu perfil para poder continuar");
      navigate("/profile");
    }
  }, [userInfo]);

  return (
    <div className="flex h-[100vh] text-white overflow-hidden">
      <ContactsContainer />

      {selectedChatData === "" ? <EmptyChatContainer /> : <ChatContainer />}
    </div>
  );
};

export default Chat;
