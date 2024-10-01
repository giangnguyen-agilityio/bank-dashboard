import { IAccountData } from '@app/interfaces';

interface LoginFormData {
  username: string;
  password: string;
}

interface AuthResponse {
  users: IAccountData[];
  exp: string;
}

export type { LoginFormData, AuthResponse };
