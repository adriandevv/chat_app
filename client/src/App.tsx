import { Routes, Route, Navigate } from "react-router-dom";
import Auth from "@/pages/auth";
import Profile from "@/pages/profile";
import Chat from "@/pages/chat";
import { useAppStore } from "./store";
import React from "react";

const PrivateRoute = ({ children }: { children: React.ReactNode }) => {
  const { userInfo } = useAppStore();
  const isAutenticated = !!userInfo;
  return isAutenticated ? children : <Navigate to="/auth" />;
};

const AuthRoute = ({ children }: { children: React.ReactNode }) => {
  const { userInfo } = useAppStore();
  const isAutenticated = !!userInfo;
  return isAutenticated ? <Navigate to="/chat" /> :children ;
};

function App() {

  return (
    <Routes>
      <Route
        path={"/auth"}
        element={
          <AuthRoute>
            <Auth />
          </AuthRoute>
        }
      />
      <Route
        path={"/profile"}
        element={
         
            <Profile />
        
        }
      />
      <Route path={"/chat"} element={
        <PrivateRoute>
          <Chat />    
        </PrivateRoute>
      } 
        />
      <Route path="*" element={<Navigate to="/auth" />} />
    </Routes>
  );
}

export default App;
