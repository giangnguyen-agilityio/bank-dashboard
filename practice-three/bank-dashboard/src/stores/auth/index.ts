import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import CryptoJS from 'crypto-js';

// Interfaces
import { AuthResponse, IAccountData } from '@app/interfaces';

// Constants
import { SECRET_KEY } from '@app/constants';

interface AuthData {
  userInfo: IAccountData;
  exp: string;
}

interface AuthStore {
  data: AuthData | null;
  isAuthenticated: boolean;
  setCredentials: (data: AuthResponse) => void;
  clearCredentials: () => void;
  checkAuthStatus: () => void;
}

const useAuthStore = create<AuthStore>()(
  persist(
    (set, get) => ({
      data: null,
      isAuthenticated: false,

      setCredentials: (authResponse: AuthResponse) => {
        const { users: userInfo, exp } = authResponse;

        const encryptedPassword = CryptoJS.AES.encrypt(
          userInfo.password,
          SECRET_KEY,
        ).toString();

        const newUserInfo = {
          ...userInfo,
          password: encryptedPassword,
        };

        const newData = { userInfo: newUserInfo, exp };

        set({ data: newData, isAuthenticated: true });
      },

      clearCredentials: () => {
        set({ data: null, isAuthenticated: false });
      },

      checkAuthStatus: () => {
        const { data } = get();

        if (!data || !data.exp) {
          get().clearCredentials();

          return;
        }

        const expTimestamp: number = new Date(data.exp).getTime();
        const currentTimestamp: number = Date.now();

        // If the token has expired
        if (expTimestamp < currentTimestamp) {
          get().clearCredentials();

          return;
        }

        set({ isAuthenticated: true });
      },
    }),
    {
      name: 'auth-storage',
      partialize: (state) => ({
        data: state.data,
        isAuthenticated: state.isAuthenticated,
      }),
    },
  ),
);

export { useAuthStore };
