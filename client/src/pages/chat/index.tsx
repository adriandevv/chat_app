import { useAppStore } from "@/store";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";



const Chat = () => {
const {userInfo} = useAppStore();
const navigate = useNavigate();
console.log(userInfo);


useEffect(() => {
if(!userInfo?.profileSetup){
toast('Por favor completa tu perfil para poder continuar');
navigate('/profile');
}


}, [userInfo]);


  return (
    <div>chat
    </div>
  )
}


export default Chat;