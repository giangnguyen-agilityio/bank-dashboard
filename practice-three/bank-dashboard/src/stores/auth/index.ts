import { create } from 'zustand';
import { persist } from 'zustand/middleware';

// Interfaces
import { AccountRole, AuthResponse } from '@app/interfaces';

// Constants
import { DESTINATION } from '@app/constants';

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
        set({ data: newData });
        // Recalculate authentication status after setting credentials
        get().checkAuthStatus();
      },

      clearCredentials: () => {
        set({ data: null, isAuthenticated: false });
      },

      checkAuthStatus: () => {
        const { data } = get();

        if (!data || !data.exp) {
          get().clearCredentials();
          window.location.href = DESTINATION.LOGIN;

          return;
        }

        const expTimestamp: number = new Date(data.exp).getTime();
        const currentTimestamp: number = Date.now();

        // If the token has expired
        if (expTimestamp < currentTimestamp) {
          get().clearCredentials();
          window.location.href = DESTINATION.LOGIN;

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
