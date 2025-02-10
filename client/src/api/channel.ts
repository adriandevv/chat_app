import { CREATE_CHANNEL_ROUTE, GET_USER_CHANNELS_ROUTE } from "@/utils/constantes";

export const createChannel = async (channelName, selectedContacts) => {
  try {
    console.log(channelName, selectedContacts);
    if (channelName.length > 0 && selectedContacts.length > 0) {
      const res = await fetch(CREATE_CHANNEL_ROUTE, {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
         name:channelName,
          members: selectedContacts.map((contact) => contact.value),
        }),
      });
      if (!res.ok) {
        throw new Error("Error al crear el canal");
      }
      const data = await res.json();
      return data;
    }
  } catch (error) {
    console.log(error);
  }
};

export const getUserChannels = async () => {
  try {
    const res = await fetch(GET_USER_CHANNELS_ROUTE, {
      method: "GET",
      credentials: "include",
    });
    if (!res.ok) {
      throw new Error("Error al obtener los canales");
    }
    const data = await res.json();
    return data;
  } catch (error) {
    console.log(error);
  }
};
