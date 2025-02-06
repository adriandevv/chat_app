import { ChatContainer } from "@/components/ChatContainer";
import { ContactsContainer } from "@/components/ContactsContainer";
import { EmptyChatContainer } from "@/components/EmptyChatContainer";
import { useAppStore } from "@/store";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

const Chat = () => {
  const {
    userInfo,
    selectedChatData,
    isUploadingFile,
    isDownloadingFile,
    fileUploadProgress,
    fileDownloadProgress
  } = useAppStore();
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
      {
        isUploadingFile && 
          <div className="h-[100vh] w-[100vw] fixed top-0 z-10 left-0 bg-black/80 flex items-center justify-center flex-col gap-5 backdrop-blur-lg">
          <h5 className="text-5xl animate-pulse">Uploading file...</h5>
          {fileUploadProgress && <h5 className="text-3xl animate-pulse">{fileUploadProgress}%</h5>}
            
          </div>
      }
      {
        isDownloadingFile && 
          <div className="h-[100vh] w-[100vw] fixed top-0 z-10 left-0 bg-black/80 flex items-center justify-center flex-col gap-5 backdrop-blur-lg">
          <h5 className="text-5xl animate-pulse">Downloading file...</h5>
          {fileDownloadProgress && <h5 className="text-3xl animate-pulse">{fileDownloadProgress}%</h5>}
            
          </div>
      }
      <ContactsContainer />

      {selectedChatData === "" ? <EmptyChatContainer /> : <ChatContainer />}
    </div>
  );
};

export default Chat;
