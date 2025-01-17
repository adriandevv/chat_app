export const HOST = import.meta.env.VITE_SERVER_URL;

export const AUTH_ROUTES = `${HOST}/api/auth` as string;
export const SINGUP_ROUTE = `${AUTH_ROUTES}/signup` as string;
export const LOGIN_ROUTE = `${AUTH_ROUTES}/login` as string;
export const GET_USER_INFO = `${AUTH_ROUTES}/user-info` as string;
export const UPDATE_PROFILE_ROUTE = `${AUTH_ROUTES}/update-profile` as string;
export const ADD_PROFILE_IMAGE_ROUTE = `${AUTH_ROUTES}/add-profile-image` as string;
export const DELETE_PROFILE_IMAGE_ROUTE = `${AUTH_ROUTES}/delete-profile-image` as string;
export const LOGOUT_ROUTE = `${AUTH_ROUTES}/logout` as string;
export const SEARCH_CONTACTS_ROUTE = `${HOST}/api/contacts/search` as string; 
