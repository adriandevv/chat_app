import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom'
import { Toaster } from "@/components/ui/sonner"
import './index.css'
import App from './App.tsx'
import { SocketProvider } from './context/SocketContext.tsx';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <SocketProvider>
        <App />
        <Toaster closeButton />
      </SocketProvider>
    </BrowserRouter>
  </React.StrictMode>
);
