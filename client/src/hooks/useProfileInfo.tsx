import { useAppStore } from "@/store";
import { useEffect, useState } from "react";
import { useUserInfo } from "./useUserInfo";
import { HOST } from "@/utils/constantes";

export const useProfileInfo = () => {
  useUserInfo();
  const {userInfo} = useAppStore();
    const [firstName, setFirstName] = useState(userInfo?.firstName || 'Adrian');
    const [lastName, setLastName] = useState(userInfo?.lastName || 'Garcia');
    const [image, setImage] = useState<string | null>(null);
    const [hovered, setHovered] = useState(false);
    const [selectedColor, setSelectedColor] = useState(userInfo?.color || 1);
    useEffect(() => {
      if (!userInfo) return; // Evita ejecutar el efecto si userInfo aún no está cargado
    
      if (userInfo.profileSetup) {
        setFirstName(userInfo.firstName);
        setLastName(userInfo.lastName);
        setSelectedColor(userInfo.color);
        
      }
      if (userInfo.image) {
        setImage(`${HOST}/${userInfo.image}`);
      }
    }, [userInfo]);

  return  {firstName, setFirstName, lastName, setLastName, image, setImage, hovered, setHovered, selectedColor, setSelectedColor};
}