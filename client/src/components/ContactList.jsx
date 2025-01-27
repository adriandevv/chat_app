import { useAppStore } from "@/store";

const ContactList = ({ contacts, isChannel = false }) => {
  const {
    selectedChatdata,
    setSelectedChatData,
    setSelectedChatType,
    selectedChatType,
    setSelectedChatMessages,
  } = useAppStore();

  const handleClick = (contact) => {
    if (isChannel) setSelectedChatType("channel");
    else setSelectedChatType("contact");
    setSelectedChatData(contact);
    if (selectedChatdata && selectedChatdata.id !== contact.id) {
      setSelectedChatMessages([]);
    }
  };

  return <div className="mt-5 ">{
    contacts.map((contact)=>(
        <div key={contact._id}>
            {contact._id}
        </div>
    ))
  }</div>;
};

export { ContactList };
