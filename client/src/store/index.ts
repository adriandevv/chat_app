
import { create } from "zustand";
import { AuthSlice, createAuthSlice } from "./slice/auth-slice";


export const useAppStore = create<AuthSlice>((set) => ({
    ...createAuthSlice(set),
  }));
