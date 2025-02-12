import {
  GET_ALL_MESSAGES_ROUTE,
  GET_CHANNEL_MESSAGES_ROUTE,
  HOST,
  UPlOAD_FILE_ROUTE,
} from "@/utils/constantes";
import axios from "axios";
import { useAppStore } from "@/store";

export const getMessages = async (id: string) => {
  try {
    if (!id) {
      throw new Error("No se proporcionó un id");
    }
    const response = await fetch(GET_ALL_MESSAGES_ROUTE, {
      method: "POST",
      credentials: "include", // Incluir cookies en la solicitud
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id: id }),
    });
    const result = await response.json();
    if (!response.ok) {
      throw new Error("Ocurrió un error desconocido");
    }
    console.log(result);

    return result.messages;
  } catch (error) {
    console.log(error);
  }
};

export const uploadMessageFile = async (File: FormData) => {
  const { setFileUploadProgress } = useAppStore.getState();
  try {
    const response = await axios.post(UPlOAD_FILE_ROUTE, File, {
      withCredentials: true,
      onUploadProgress: (progressEvent) => {
        const progress = Math.round(
          (progressEvent.loaded * 100) / progressEvent.total
        );
        setFileUploadProgress(progress);
      },
    });
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const downloadFile = async (fileUrl: string) => {
  const { setFileDownloadProgress, setIsDownloadingFile } =
    useAppStore.getState();
  setIsDownloadingFile(true);
  setFileDownloadProgress(0);

  try {
    const response = await axios.get(`${HOST}/${fileUrl}`, {
      withCredentials: true,
      responseType: "blob",
      onDownloadProgress: (progressEvent) => {
        const progress = Math.round(
          (progressEvent.loaded * 100) / progressEvent.total
        );
        setFileDownloadProgress(progress);
      },
    });
    
    setIsDownloadingFile(false);

    return response.data;
  } catch (error) {
    setIsDownloadingFile(false);

    console.log(error);
  }
};


export const getChannelMessages = async (channelId : string) => 
  {
    try {
      const response = await fetch(`${GET_CHANNEL_MESSAGES_ROUTE}/${channelId}`,{
        method: "GET",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        }
      });
      const result = await response.json();
      if(!response.ok){
        throw new Error("Ocurrió un error desconocido");
      }
      return result.messages;
    } catch (error) {
      console.log(error);
    }
  };
