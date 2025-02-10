import { useAppStore } from "@/store";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { HOST } from "@/utils/constantes";
import { getColor } from "../lib/utils";
const ContactList = ({ contacts, isChannel = false }) => {
  const {
    selectedChatData,
    setSelectedChatData,
    setSelectedChatType,
    selectedChatType,
    setSelectedChatMessages,
  } = useAppStore();

  const handleClick = (contact) => {
    if (isChannel) setSelectedChatType("channel");
    else setSelectedChatType("contact");
    setSelectedChatData(contact);
    if (selectedChatData && selectedChatData?.id === contact?.id) {
      setSelectedChatMessages([]);
    }
    setSelectedChatMessages([]);
  };
  console.log("Contact list:",contacts);

  return (
    <div className="mt-5 ">
      {contacts.map((contact) => (
        <div
          key={contact?._id}
          className={`flex items-center gap-4 pl-10 py-2 transition-all duration-300 cursor-pointer ${
            selectedChatData && selectedChatData._id === contact._id
              ? "bg-[#8417ff] hover:bg-[#8417ff]"
              : "hover:bg-[#f1f1f111]"
          }`}
          onClick={() => handleClick(contact)}
        >
          <div className="flex gap-5 items-center justify-start text-neutral-300">
            {!isChannel && (
              <Avatar className="size-11 rounded-full overflow-hidden">
                <AvatarImage
                  alt="Avatar profile"
                  src={`${HOST}/${contact.Image}`}
                  className="object-cover h-full w-full bg-black rounded-full"
                />
                <AvatarFallback
                  className={`
                  ${
                    selectedChatData && selectedChatData._id === contact._id
                      ? "bg-[#ffffff22] border border-white/70 "
                      : getColor(contact.color || 0)
                  }
                    uppercase size-11 text-2xl `}
                >
                  {contact.firstName?.charAt(0)?.toUpperCase()}
                </AvatarFallback>
              </Avatar>
            )}
          </div>
          {isChannel && (
            <div className="bg-[#ffffff22] size-10 flex items-center justify-center rounded-full">
              # 
            </div>
            
          )}
          {
            contact?.name && (
              <p className="text-neutral-300 text-lg font-bold">
              {contact?.name}
            </p>
            )

          }
          {contact?.firstName ? (
            <p className="text-neutral-300 text-lg font-bold">
              {contact.firstName} {contact.lastName}
            </p>
          ) : (
            <p className="text-neutral-300">{contact?.email}</p>
          )}

        </div>
      ))}
    </div>
  );
};

export { ContactList };
