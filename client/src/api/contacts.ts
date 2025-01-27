import { GET_DM_CONTACTS_ROUTE, SEARCH_CONTACTS_ROUTE } from "@/utils/constantes";

 export  const getContacts = async (searchTerm : string) => {
  console.log(searchTerm);
    if(searchTerm.length===0){
        return [];
    }
    const response = await fetch(SEARCH_CONTACTS_ROUTE, {
      method: "POST",
      credentials: "include", // Incluir cookies en la solicitud
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ contactRef: searchTerm }),
    });
    const result = await response.json();
    if (!response.ok) {
      throw new Error("Ocurrió un error desconocido");
    }

    return result.formattedContacts;
  }


export const getDMContacts = async () => {
  try {
    const response = await fetch(GET_DM_CONTACTS_ROUTE, {
      method: "GET",
      credentials: "include",
    });
    const result = await response.json();
    if (!response.ok) {
      throw new Error("Ocurrió un error desconocido");
    }
    return result;
  } catch (error) {
    console.error("Error fetching DM contacts:", error);
    throw error;
  }
};