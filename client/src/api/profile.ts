import { ADD_PROFILE_IMAGE_ROUTE, DELETE_PROFILE_IMAGE_ROUTE, LOGOUT_ROUTE } from "@/utils/constantes";

export const UpdateImage = async (image : FormData) => {
    try {
      const url = `${ADD_PROFILE_IMAGE_ROUTE}`;
      const response = await fetch(url, {
        method: "POST",
        body: image,
        credentials: "include", // Incluir cookies en la solicitud
      });
      const result = await response.json();
      if (!response.ok || !result.user.image) {
        throw new Error("Ocurrió un error desconocido");
      }

      return result.user.image;
    } catch (error) {
      throw error;
    }
  };

  export const DeleteImage = async () => {
    try {
      const url = DELETE_PROFILE_IMAGE_ROUTE;
      const response = await fetch(url, {
        method: "DELETE",
        credentials: "include", // Incluir cookies en la solicitud
      });
      const result = await response.json();
      if (!response.ok) {
        throw new Error("Ocurrió un error desconocido");
      }

      return result.user.image;
    } catch (error) {
      throw error;
    }
  }

 export  const logout = async () => {
    try {
      const response = await fetch(LOGOUT_ROUTE, {
        method: "GET",
        credentials: "include", // Incluir cookies en la solicitud
      });
      const result = await response.json();
      if (!response.ok) {
        throw new Error("Ocurrió un error desconocido");
      }

      return result;
    } catch (error) {
      throw error;
    }
  }