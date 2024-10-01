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
  setCredentials: (data: AuthResponse) => void;
  clearCredentials: () => void;
}

const useAuthStore = create<AuthStore>()(
  persist(
    (set) => ({
      data: null,
      setCredentials: (data) => {
        const { users, exp } = data;
        const newData = {
          role: users[0].role,
          exp,
        };

        set({ data: newData });
      },
      clearCredentials: () => set({ data: null }),
    }),
    {
      name: 'auth-storage',
    },
  ),
);

export { useAuthStore };
