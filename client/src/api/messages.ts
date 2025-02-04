import { GET_ALL_MESSAGES_ROUTE, HOST, UPlOAD_FILE_ROUTE } from "@/utils/constantes";

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
  try {
    const response = await fetch(UPlOAD_FILE_ROUTE, {
      method: "POST",
      credentials: "include",
      body: File,
    });
    const result = await response.json();
    if (!response.ok) {
      throw new Error("Ocurrió un error desconocido");
    }
    return result;
  } catch (error) {
    console.log(error);
  }
};

export const downloadFile = async (fileUrl: string) => {
  try {
    const response = await fetch(`${HOST}/${fileUrl}`, {
      method: "GET",
      credentials: "include",
    });
    const result = await response.blob();
    if (!response.ok) {
      throw new Error("Ocurrió un error desconocido");
    }
    return result;
  } catch (error) {
    console.log(error);
  }

};