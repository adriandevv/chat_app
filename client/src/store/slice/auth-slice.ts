


interface UserInfo {
    // Define the properties of UserInfo here
    id: string;
    email: string;
    firstName: string;
    lastName: string;
    image: string;
    color: string;
    profileSetup: boolean;
}

export interface AuthSlice {
    userInfo: UserInfo | undefined;
    setUserInfo: (userInfo: UserInfo) => void;
}

export const createAuthSlice = (set: (partial: Partial<AuthSlice>) => void): AuthSlice => (
{
    userInfo: undefined,
    setUserInfo: (userInfo: UserInfo) => set({ userInfo }),
}
);