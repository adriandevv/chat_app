import { useAppStore } from "@/store";
import { GET_USER_INFO } from "@/utils/constantes";
import { useEffect, useState } from "react";

export const useUserInfo = () => {
    const [loading, setLoading] = useState(true);
    const { userInfo, setUserInfo } = useAppStore();

    useEffect(() => {
        const fetchUserInfo = async () => {
            try {
                const response = await fetch(GET_USER_INFO, {
                       credentials: 'include'
                });
                const data = await response.json();

                setUserInfo(data.user);
            } catch (error) {
                setUserInfo(undefined);
                console.log(error);
            }
            finally {
                setLoading(false);
            }
        }

        if(!userInfo){
            fetchUserInfo();
        }else {
            setLoading(false);
        }
    }
        , [userInfo, setUserInfo]);

        return { userInfo, loading };
    
}