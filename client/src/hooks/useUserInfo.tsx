import { useAppStore } from "@/store";
import { GET_USER_INFO } from "@/utils/constantes";
import { useEffect, useState } from "react";

export const useUserInfo = () => {
    const [loading, setLoading] = useState(true);
    const { userInfo } = useAppStore();

    useEffect(() => {
        const fetchUserInfo = async () => {
            try {
                const response = await fetch(GET_USER_INFO, {
                    credentials: 'include',
                });
                const data = await response.json();
                useAppStore.setState({ userInfo: data });
            } catch (error) {
                console.log(error);
            }
        }

        if(!userInfo){
            fetchUserInfo();
        }else {
            setLoading(false);
        }
    }
        , [userInfo]);

        return { userInfo, loading };
    
}