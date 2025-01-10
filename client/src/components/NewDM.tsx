import {
  TooltipContent,
  Tooltip,
  TooltipProvider,
  TooltipTrigger,
} from "./ui/tooltip";
import { FaPlus } from "react-icons/fa6";
import { animationDefaultOptions, getColor } from "@/lib/utils";
import { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "./ui/input";
import { useDebounce } from "@uidotdev/usehooks";
import Lottie from "react-lottie";
import { getContacts } from "@/api/contacts";
import { ScrollArea } from "./ui/scroll-area";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { User } from "@/types/user";
import { HOST } from "@/utils/constantes";
import { useAppStore } from "@/store";

export const NewDM = () => {
  const { setSelectedChatType, setSelectedChatData } = useAppStore();
  const [openContactModal, setOpenContactModal] = useState(false);
  const [searchedContacts, setSearchedContacts] = useState<User[]>([]);

  const [search, setSearch] = useState("");
  const debouncedSearch = useDebounce(search, 300);

  useEffect(() => {
      searchContacts();
  }, [debouncedSearch]); 
 

  const selectNewContact = (contact: User) => {
    if(setSelectedChatType && setSelectedChatData){
      setSelectedChatType("contact");
      setSelectedChatData(contact);
      setSearchedContacts([]);
      setOpenContactModal(false);
    }
    
  }

  const searchContacts = async () => {
    try {
      const res = await getContacts(search);
      console.log(res);
      setSearchedContacts(res);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger>
            <FaPlus
              className="text-neutral-400 font-light cursor-pointer
            text-opacity-90 text-start hover:text-neutral-100 transition-all duration-300"
              onClick={() => setOpenContactModal(true)}
            />
          </TooltipTrigger>
          <TooltipContent className="bg-[#1c1b1e] border-none mb-2 p-3 text-white">
            Nuevo mensaje directo
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
      <Dialog open={openContactModal} onOpenChange={setOpenContactModal}>
        <DialogContent className="bg-[#181920] border-none text-white w-[400px] h-[400px] flex flex-col">
          <DialogHeader>
            <DialogTitle>Seleccione un contacto</DialogTitle>
          </DialogHeader>
          <Input
            placeholder="Buscar contacto"
            className="rounded-lg p-6 bg-[#2c2e3b] border-none"
            onChange={(e) => {
              setSearch(e.target.value);
            }}
          />
          <ScrollArea
            className={`h-[250px] ${
              searchedContacts.length === 0 ? "hidden" : ""
            }`}
          >
            <div className="flex flex-col gap-5">
              {searchedContacts?.map((contact) => (
                <div
                  key={contact._id}
                  onClick={() => selectNewContact(contact)}
                  className="flex items-center gap-5 cursor-pointer"
                >
                  <Avatar className="h-12 w-12 rounded-full overflow-hidden">
                    <AvatarImage
                      alt="Avatar profile"
                      src={`${HOST}/${contact.Image}`}
                      className="object-cover h-full w-full bg-black rounded-full"
                    />
                    <AvatarFallback
                      className={`h-12 w-12 text-5xl ${getColor(
                        contact.color || 0
                      )}`}
                    >
                      {contact.firstName?.charAt(0)?.toUpperCase() || "A"}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex flex-col">
                    <span>
                      {contact.firstName} {contact.lastName}
                    </span>
                    <span className="text-xs">
                      {contact.email}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </ScrollArea>
          {searchedContacts.length === 0 && (
            <div className="flex-1 ms:bg-[#1c1d25] flex flex-col justify-center items-center duration-1000 transition-all">
              <Lottie
                isClickToPauseDisabled
                options={animationDefaultOptions}
                height={100}
                width={100}
              />
              <div className="text-white mt-10 text-center">
                <h3>
                  Hola<span className="text-purple-500">!</span> Busca un
                  <span className="text-purple-500"> contacto</span>
                </h3>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
};
