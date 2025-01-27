import { GET_ALL_MESSAGES_ROUTE } from "@/utils/constantes";

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
