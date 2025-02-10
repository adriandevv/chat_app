import { useEffect } from "react";
import { Logo } from "./Logo";
import { NewDM } from "./NewDM";
import { ProfileInfo } from "./ProfileInfo";
import { getDMContacts } from "@/api/contacts";
import { useAppStore } from "@/store";
import { ContactList } from "@/components/ContactList.tsx";
import { CreateChannel } from "@/components/CreateChannel.tsx";
import { getUserChannels } from "@/api/channel";


export const ContactsContainer = () => {
const {setDirectMessagesContacts, directMessagesContacts, channels,setChannels} = useAppStore();
  useEffect(() => {
    async function fetchData (){
      const res = await getDMContacts();
      setDirectMessagesContacts(res.contacts);     
    }
    const getChannels = async () => {
      const data = await getUserChannels();
      console.log(data);
      setChannels(data.channels);
    };
    fetchData();
    getChannels();
  }, [setChannels, setDirectMessagesContacts]);



  return (
    <div className="relative md:w-[35vw] lg:w-[30vw] xl:w-[20vw] bg-[#1b1c24] border-r-2 border-[#2f303b] w-full">
      <div className="pt-3">
        <Logo/>
      </div>
      <div className="my-5">
        <div className="flex items-center justify-between pr-10">
          <Title text="Mensajes directos"/>
          <NewDM/>
        </div>
        <div className="max-h-[38vh] overflow-y-auto scrollbar-hide">
          <ContactList contacts={directMessagesContacts}/>
        </div>
      </div>
      <div className="my-5">
        <div className="flex items-center justify-between pr-10">
          <Title text="Canales"/>
          <CreateChannel/>
        </div>
        <div className="max-h-[38vh] overflow-y-auto scrollbar-hide">
          <ContactList contacts={channels} isChannel={true}/>
        </div>
      </div>
      <ProfileInfo/>
    </div>
  );
};



const Title = ({text}:{text:string}) => {
  return(
    <h6 className="uppercase tracking-widest text-neutral-400 pl-10 font-light text-opacity-90 text-sm">
      {text}
    </h6>
  );
}
