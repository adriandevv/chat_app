import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { colors, getColor } from "@/lib/utils";
import { useAppStore } from "@/store";
import { IoArrowBack } from "react-icons/io5";
import { FaTrashCan, FaPlus } from "react-icons/fa6";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { UPDATE_PROFILE_ROUTE } from "@/utils/constantes";
import { useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useProfileInfo } from "@/hooks/useProfileInfo";
import { DeleteImage, UpdateImage } from "@/api/profile";

interface FileInputEvent extends React.ChangeEvent<HTMLInputElement> {
  target: HTMLInputElement & EventTarget;
}

const Profile = () => {
  const { userInfo, setUserInfo } = useAppStore();
  const navigate = useNavigate();
  const {
    firstName,
    setFirstName,
    lastName,
    setLastName,
    image,
    setImage,
    hovered,
    setHovered,
    selectedColor,
    setSelectedColor,
  } = useProfileInfo();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const validateProfile = () => {
    if (!firstName) {
      toast.error("El nombre es requerido");
      return false;
    }
    if (!lastName) {
      toast.error("El apellido es requerido");
      return false;
    }
    return true;
  };

  const handleFileInputClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleImageChange = (e: FileInputEvent) => {
    const file = e.target.files?.[0];
    if (file) {      
      const formData = new FormData();
      formData.append("profile-image", file);
      UpdateImage(formData);
      toast.success("Imagen de perfil actualizada.");

      const reader = new FileReader();
      reader.onload = (e: ProgressEvent<FileReader>) => {
        if (e.target && e.target.result) {
          setImage(e.target.result as string);
        }
      };
      reader.readAsDataURL(file);
    }
    e.target.value = "";
  };
  const handleDeleteImage = async () => {
    try {
      DeleteImage();
      setImage(null);
      toast.success("Imagen de perfil eliminada");
    } catch (error) {
      toast.error("Ocurrió un error al eliminar la imagen de perfil");
    }
    setImage(null);
  };

  const handleNavigate = () => {
    if (userInfo?.profileSetup) {
      navigate("/chat");
    } else {
      toast.error("Completa tu perfil para continuar");
    }
  };
  const saveChanges = async () => {
    if (validateProfile()) {
      try {
        const response = await fetch(UPDATE_PROFILE_ROUTE, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify({
            firstName,
            lastName,
            color: selectedColor,
          }),
        });
        if (response.ok) {
          const data = await response.json();
          setUserInfo(data.user);
        }
      } catch (error) {}

      toast.success("Cambios guardados");
    }

    console.log("Save changes");
  };

  return (
    <div className="bg-[#1b1c24] h-screen flex items-center justify-center flex-col gap-10 ">
      <div className="flex flex-col gap-10 w-[80vw] md:w-max">
        <div>
          <IoArrowBack
            onClick={handleNavigate}
            className="text-2xl lg:text-4xl text-white/90 cursor-pointer"
          />
        </div>
        <div className="grid grid-cols-2">
          <div
            className="h-full w-32 md:w-48 md:h-48 relative flex items-center justify-center"
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
          >
            <Avatar className="h-32 w-32 md:w-48 md:h-48 rounded-full overflow-hidden  ">
              <AvatarImage
                alt="Avatar profile"
                src={image as string}
                className="object-cover h-full w-full bg-black"
              />
              <AvatarFallback
                className={`h-32 w-32 md:w-48 md:h-48 text-5xl border-[1px] justify-center items-center ${getColor(
                  selectedColor
                )}`}
              >
                {firstName?.charAt(0).toUpperCase()}
              </AvatarFallback>
            </Avatar>
            {hovered && (
              <div
                className="absolute inset-0 flex items-center justify-center bg-black/50  rounded-full ring-fuchsia-50 "
                onClick={image ? handleDeleteImage : handleFileInputClick}
              >
                {image ? (
                  <FaTrashCan className="text-white text-3xl cursor-pointer" />
                ) : (
                  <FaPlus className="text-white text-3xl cursor-pointer" />
                )}
              </div>
            )}

            <input
              type="file"
              ref={fileInputRef}
              className="hidden"
              onChange={handleImageChange}

              name="profile-image"
              accept=".png, .jpg, .jpeg, .svg, .webp"
            />
          </div>
          <div className="flex min-32 md:min-w-64 flex-col gap-5 text-white items-center justify-center">
            <div className="w-full">
              <Input
                placeholder="Email"
                type="email"
                disabled
                value={userInfo?.email}
                className="rounded-lg p-6 bg-[#2c2e3b] border-none "
              />
            </div>
            <div className="w-full">
              <Input
                placeholder="Nombre"
                type="text"
                onChange={(e) => {
                  setFirstName(e.target.value);
                }}
                value={firstName}
                className="rounded-lg p-6 bg-[#2c2e3b] border-none "
              />
            </div>
            <div className="w-full">
              <Input
                placeholder="Apellidos"
                type="text"
                onChange={(e) => {
                  setLastName(e.target.value);
                }}
                value={lastName}
                className="rounded-lg p-6 bg-[#2c2e3b] border-none "
              />
            </div>
            <div className="w-full flex gap-5">
              {colors.map((_, index) => (
                <div
                  key={index}
                  onClick={() => {
                    setSelectedColor(index);
                  }}
                  className={`h-8 w-8 rounded-full ${getColor(
                    index
                  )} cursor-pointer transition-all duration-300
                      ${selectedColor === index ? "ring-2 ring-white" : ""}`}
                ></div>
              ))}
            </div>
          </div>
        </div>
        <div className="w-full">
          <Button
            className="h-16 w-full bg-purple-700 hover:bg-purple-900 transition-all duration-300"
            onClick={saveChanges}
          >
            Guardar cambios
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Profile;
