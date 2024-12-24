interface UserInfo {
    id: string;
    email: string;
    firstName: string;
    lastName: string;
    image: string;
    color: number;
    profileSetup: boolean;
}

export interface AuthSlice {
    userInfo: UserInfo | undefined;
    setUserInfo: (userInfo: UserInfo | undefined) => void;
}

export const createAuthSlice = (set: (partial: Partial<AuthSlice>) => void): AuthSlice => ({
    userInfo: undefined,
    setUserInfo: (userInfo: UserInfo | undefined) => set({ userInfo }),
});
