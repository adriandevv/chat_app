import victori from "@/assets/victory.svg";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useState } from "react";

type Props = {};

const Auth = (props: Props) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleLogin = () => {
  
  };

  const handleSignup = () => {
    if (password !== confirmPassword) {
      alert("Las contraseñas no coinciden");
      return
    }
  }
  return (
    <div className="w-[100vw] h-[100vh] flex justify-center items-center">
      <div className=" w-[80vw] h-[80vh] bg-white border-2 border-white text-opacity-90 shadow-2xl md:w-[90vw] lg:w-[70vw] xl:w-[60vw] rounded-3xl grid  ">
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
                  Login
                </TabsTrigger>
                <TabsTrigger
                  value="signup"
                  className="data-[state=active]:bg-transparent text-black text-opacity-90 border-b-2 rounded-none w-full 
              data[state=active]:font-semibold data-[state=active]:border-b-purple-500 p-3 transition-all duration-300 
              "
                >
                  Signup
                </TabsTrigger>
              </TabsList>
              <TabsContent className="flex flex-col gap-5 mt-10" value="login">
                <Input placeholder="Email" type="email"
                className="rounded-full p-6"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                />
                <Input placeholder="Password" type="password"
                className="rounded-full p-6"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                />
                <Button
                  className="rounded-full p-6"
                  onClick={handleLogin}
                >
                  login
                </Button>
              </TabsContent>
              <TabsContent className="" value="singup"></TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Auth;
