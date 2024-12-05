export const HOST = import.meta.env.VITE_SERVER_URL;

export const AUTH_ROUTES = `${HOST}/api/auth` as string;
export const SINGUP_ROUTE = `${AUTH_ROUTES}/signup` as string;
export const LOGIN_ROUTE = `${AUTH_ROUTES}/login` as string;
export const GET_USER_INFO = `${AUTH_ROUTES}/user-info` as string;