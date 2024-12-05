import { Routes, Route, Navigate } from "react-router-dom";
import Auth from "@/pages/auth";
import Profile from "@/pages/profile";
import Chat from "@/pages/chat";
import { useAppStore } from "./store";

import React, { useEffect } from "react";

const PrivateRoute = ({ children }: { children: React.ReactNode }) => {
  const { userInfo } = useAppStore();
  const isAutenticated = !!userInfo;
  return isAutenticated ? children : <Navigate to="/auth" />;
};
const AuthRoute = ({ children }: { children: React.ReactNode }) => {
  const { userInfo } = useAppStore();
  const isAutenticated = !!userInfo;
  return isAutenticated ? children : <Navigate to="/chat" />;
};

function App() {

  return (
    <Routes>
      <Route
        path={"/auth"}
        element={
            <Auth />
        }
      />
      <Route
        path={"/profile"}
        element={
          <PrivateRoute>
            <Profile />
          </PrivateRoute>
        }
      />
      <Route path={"/chat"} element={<Chat />} />
      <Route path="*" element={<Navigate to="/auth" />} />
    </Routes>
  );
}

export default App;
