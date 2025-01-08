import { useProfileInfo } from "@/hooks/useProfileInfo";
import { getColor } from "@/lib/utils";
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
  } from "@/components/ui/tooltip"
  import { FiEdit2 } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import {  IoPowerSharp } from "react-icons/io5"; 
import { logout as  apiLogout } from "@/api/profile";
import { useAppStore } from "@/store";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";

export const ProfileInfo = () => {
  const { setUserInfo, closeChat} = useAppStore();
    const { firstName, lastName, image, selectedColor } = useProfileInfo();
  const navigate = useNavigate();
  const logOut = async () => {
   const res = await apiLogout();
   console.log(res);
   if(res.mensaje){
    navigate("/auth");
    if (setUserInfo && closeChat) {
      setUserInfo(undefined);
      closeChat();
    }
}
  }

  return (
    <div className="absolute bottom-0 h-16 flex items-center justify-between px-10 w-full bg-[#2a2b33]">
      <div className="flex gap-3 items-center justify-center">
        <div className="h-12 w-12 relative">
          <Avatar className="h-12 w-12 rounded-full overflow-hidden">
            <AvatarImage
              alt="Avatar profile"
              src={image as string}
              className="object-cover h-full w-full bg-black rounded-full"
            />
            <AvatarFallback
              className={`h-12 w-12 text-5xl border-[1px] justify-center items-center ${getColor(
                selectedColor
              )}`}
            >
              {firstName?.charAt(0).toUpperCase()}
            </AvatarFallback>
          </Avatar>
        </div>
        <div>{firstName && lastName ? `${firstName} ${lastName}` : ""}</div>
      </div>
      <div className="flex gap-5">
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger onClick={() => navigate("/profile")}>
                <FiEdit2 className="text-purple-500 text-xl "/>
            </TooltipTrigger>
            <TooltipContent className="bg-[#1c1b1e] border-none text-white">
              Editar perfil
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger onClick={logOut}>
                <IoPowerSharp className="text-red-300 text-xl "/>
            </TooltipTrigger>
            <TooltipContent className="bg-[#1c1b1e] border-none text-white">
              Cerrar sesión
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>
    </div>
  );
};
