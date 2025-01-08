export interface User {
    _id?: string;
    email: string;
    password: string;
    firstName?: string;  // Opcional
    lastName?: string;   // Opcional
    Image?: string;      // Opcional
    color?: number;      // Opcional
    profileSetup: boolean;
  }
  