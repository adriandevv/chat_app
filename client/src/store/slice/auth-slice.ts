import { AuthSlice } from "../index.ts";

export interface UserInfo {
    id: string;
    email: string;
    firstName: string;
    lastName: string;
    image: string;
    color: number;
    profileSetup: boolean;
}



export const createAuthSlice = (set: (partial: Partial<AuthSlice>) => void): AuthSlice => ({
    userInfo: undefined,
    setUserInfo: (userInfo: UserInfo | undefined) => set({ userInfo }),
});
