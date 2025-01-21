import { SEARCH_CONTACTS_ROUTE } from "@/utils/constantes";

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