import victori from "@/assets/victory.svg";
import loginBg from "@/assets/login2.png";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useState } from "react";
import { toast } from "sonner";
import  {SINGUP_ROUTE , LOGIN_ROUTE} from "@/utils/constantes"; // Replace with the actual route if different
import { useNavigate } from "react-router-dom";
import { useAppStore } from "@/store";


const Auth = () => {
  const navigate = useNavigate();
  const {setUserInfo} = useAppStore();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const validateLogin = () => {
    if (!email.length) {
      toast.error("El correo es requerido");
      return false;
    }
    if (!password.length) {
      toast.error("La contraseña es requerida");
      return false;
    }
    return true;
  }

  const validateSIgnup = () => {
    if (!email.length) {
      toast.error("El correo es requerido");
      return false;
    }
    if (!password.length) {
      toast.error("La contraseña es requerida");
      return false;
    }
    if (password !== confirmPassword) {
      toast.error("La contraseña y la confirmación no coinciden");
      return false;
    }

    return true;
  };

  const handleLogin = async (): Promise<void> => {
    if (validateLogin()) {
        try {
            const response = await fetch(LOGIN_ROUTE, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    credentials: "include",
                },
                body: JSON.stringify({
                    email,
                    password,
                }),
            });

            if (!response.ok) {
                throw new Error(`Error en la solicitud: ${response.statusText}`);
            }

            // Tipamos la respuesta JSON
            const login = await response.json();
            // Verifica si el usuario tiene su perfil configurado

            console.log(login.user);
            if (login?.user.profileSetup) {
              console.log(login.user);
              setUserInfo(login.user);
                navigate("/chat");
            } else {
              setUserInfo(login.user);
              navigate("/profile");
            }
        } catch (error) {
            console.error("Error en el proceso de inicio de sesión:", error);
        }
    }
};


  const handleSignup = async () => {
    if (validateSIgnup()) {
      const response = await fetch(SINGUP_ROUTE, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          credentials: 'include'
        },
        body: JSON.stringify({
          email,
          password,
        }),
      });
      if(response.ok){
        navigate('/profile')
      }
      console.log(response);
    }
  };
  return (
    <div className="w-[100vw] h-[100vh] flex justify-center items-center">
      <div className=" w-[80vw] h-[80vh] bg-white border-2 border-white text-opacity-90 shadow-2xl md:w-[90vw] lg:w-[70vw] xl:w-[60vw] rounded-3xl grid md:grid-cols-2 ">
        <div className="flex flex-col gap-10 items-center justify-center ">
          <div className="flex items-center justify-center flex-col">
            <div className="flex items-center justify-center ">
              <h1 className="text-4xl font-bold md:text-6xl">Bienvenido</h1>
              <img src={victori} alt="victori" className="h-[100px]" />
            </div>
            <p className="font-medium text-center">
              Inicia sesión o suscribete para acceder a la plataforma
            </p>
          </div>
          <div className="flex items-center justify-center w-full ">
            <Tabs className="w-3/4" defaultValue="login">
              <TabsList className="bg-transparent rounded-none w-full">
                <TabsTrigger
                  value="login"
                  className="data-[state=active]:bg-transparent text-black text-opacity-90 border-b-2 rounded-none w-full 
              data[state=active]:font-semibold data-[state=active]:border-b-purple-500 p-3 transition-all duration-300 
              "
                >
                  Iniciar Session
                </TabsTrigger>
                <TabsTrigger
                  value="signup"
                  className="data-[state=active]:bg-transparent text-black text-opacity-90 border-b-2 rounded-none w-full 
              data[state=active]:font-semibold data-[state=active]:border-b-purple-500 p-3 transition-all duration-300 
              "
                >
                  Registrarse
                </TabsTrigger>
              </TabsList>
              <TabsContent className="flex flex-col gap-5 mt-10" value="login">
                <Input
                  placeholder="Correo electronico"
                  type="email"
                  className="rounded-full p-6"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <Input
                  placeholder="Contraseña"
                  type="password"
                  className="rounded-full p-6"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <Button className="rounded-full p-6" onClick={handleLogin}>
                  Iniciar Session
                </Button>
              </TabsContent>
              <TabsContent className="flex flex-col gap-5 mt-10" value="signup">
                <Input
                  placeholder="Correo electronico"
                  type="email"
                  className="rounded-full p-6"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <Input
                  placeholder="Contraseña"
                  type="password"
                  className="rounded-full p-6"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />{" "}
                <Input
                  placeholder="confirmar Contraseña"
                  type="password"
                  className="rounded-full p-6"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
                <Button className="rounded-full p-6" onClick={handleSignup}>
                  Registrarse
                </Button>
              </TabsContent>
            </Tabs>
          </div>
        </div>
        <div>
          <img
            src={loginBg}
            className="hidden md:flex justify-center items-center"
            alt="login background"
          />
        </div>
      </div>
    </div>
  );
};

export default Auth;
