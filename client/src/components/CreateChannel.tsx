import {
  TooltipContent,
  Tooltip,
  TooltipProvider,
  TooltipTrigger,
} from "./ui/tooltip";
import { FaPlus } from "react-icons/fa6";
import { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "./ui/input";
import { getAllContacts } from "@/api/contacts";
import { useAppStore } from "@/store";
import { Button } from "./ui/button";
import MultipleSelector from "./ui/multipleselector";

export const CreateChannel = () => {
  const [newChannelModal, setNewChannelModal] = useState(false);
  const [searchedContacts, setSearchedContacts] = useState([]);
  const [allContacts, setAllContacts] = useState([]);
  const [selectedContacts, setSelectedContacts] = useState([]);
  const [channelName, setChannelName] = useState("");

  useEffect(() => {
    const getData = async () => {
      const res = await getAllContacts();
      setAllContacts(res.contacts);
      console.log(res.contacts);
    };
    getData();
  }, []);

  const createChannel = async () => {


  };

  return (
    <>
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger>
            <FaPlus
              className="text-neutral-400 font-light cursor-pointer
              text-opacity-90 text-start hover:text-neutral-100 transition-all duration-300"
              onClick={() => setNewChannelModal(true)}
            />
          </TooltipTrigger>
          <TooltipContent className="bg-[#1c1b1e] border-none mb-2 p-3 text-white">
            Crear nuevo canal
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
      <Dialog open={newChannelModal} onOpenChange={setNewChannelModal}>
        <DialogContent className="bg-[#181920] border-none text-white w-[400px] h-[400px] flex flex-col">
          <DialogHeader>
            <DialogTitle>
              Por favor rellena todos los campos para crear un nuevo canal
            </DialogTitle>
          </DialogHeader>
          <div>
            <Input
              placeholder="Nombre del canal"
              className="rounded-lg p-6 bg-[#2c2e3b] border-none"
              onChange={(e) => {
                setChannelName(e.target.value);
              }}
              value={channelName}
            />
          </div>
          <div>
            <MultipleSelector 
            className="rounded-lg py-2 bg-[#2c2e3b] text-white"
            defaultOptions={allContacts}
            placeholder="Agregar contactos"
            value={selectedContacts}
            onChange={setSelectedContacts}
            emptyIndicator={<p className="text-center text-lg leading-10 text-gray-600">No se encontraron resultados.</p>}

            />
          </div>
          <div>
            <Button className="w-full bg-purple-700 hover:bg-purple-900 transition-all duration-300"
            onClick={createChannel}
            >
              Crear canal
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};
