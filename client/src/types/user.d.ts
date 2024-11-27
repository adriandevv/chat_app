export interface User {
    email: string;
    password: string;
    firstName?: string;  // Opcional
    lastName?: string;   // Opcional
    Image?: string;      // Opcional
    color?: number;      // Opcional
    profileSetup: boolean;
  }
  