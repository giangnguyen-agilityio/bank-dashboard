import '@testing-library/jest-dom';
import { cleanup } from '@testing-library/react';

// Interfaces
import { AccountRole } from '@app/interfaces';

interface AppState {
  state?: {
    data?: {
      userInfo?: { role: AccountRole };
    };
  };
}

// Optional: Mock local storage if your app uses it
// eslint-disable-next-line @typescript-eslint/no-explicit-any
(global as any).mockLocalStorage = (data: AppState | null) => {
  const mockStorage = {
    getItem: jest.fn(() => (data ? JSON.stringify(data) : null)),
    setItem: jest.fn(),
    removeItem: jest.fn(),
  };
  Object.defineProperty(window, 'localStorage', {
    value: mockStorage,
    writable: true,
  });
};

afterEach(() => {
  cleanup();
});
