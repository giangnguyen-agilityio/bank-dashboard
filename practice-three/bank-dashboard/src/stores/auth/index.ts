import { create } from 'zustand';
import { persist } from 'zustand/middleware';

// Interfaces
import { AccountRole, AuthResponse } from '@app/interfaces';

interface AuthData {
  role: AccountRole;
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
        const { users, exp } = authResponse;
        const newData = {
          role: users[0].role,
          exp,
        };
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
      partialize: (state) => ({ data: state.data }),
    },
  ),
);

export { useAuthStore };
