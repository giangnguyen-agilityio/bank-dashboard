import { ReactNode } from 'react';
import {
  QueryClient,
  QueryClientProvider,
  useQueryClient,
} from '@tanstack/react-query';
import { useNavigate } from '@tanstack/react-router';

// Utils
import { renderHook, waitFor } from '@app/utils';

// Hooks
import { useAuth } from '@app/hooks';

// Services
import { login } from '@app/services';

// Stores
import { useAuthStore } from '@app/stores';

// Constants
import { DESTINATION } from '@app/constants';

// Mocks
import { MOCK_ACCOUNTS_DATA } from '@app/mocks';

jest.mock('@app/services', () => ({
  ...jest.requireActual('@app/services'),
  login: jest.fn(),
}));

jest.mock('@app/stores', () => ({
  ...jest.requireActual('@app/stores'),
  useAuthStore: jest.fn(),
}));

jest.mock('react-hot-toast', () => ({
  ...jest.requireActual('react-hot-toast'),
  success: jest.fn(),
  error: jest.fn(),
}));

jest.mock('@tanstack/react-router', () => ({
  ...jest.requireActual('@tanstack/react-router'),
  useNavigate: jest.fn(),
}));

jest.mock('@tanstack/react-query', () => ({
  ...jest.requireActual('@tanstack/react-query'),
  useQueryClient: jest.fn(),
}));

const mockSetCredentials = jest.fn();
const mockNavigate = jest.fn();
const queryClient = new QueryClient();
const loginData = { username: 'jdoe', password: 'password123' };

const env = ({ children }: { children: ReactNode }) => (
  <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
);

(useQueryClient as jest.Mock).mockReturnValueOnce({});

describe('useAuth hook', () => {
  beforeEach(() => {
    (useAuthStore as unknown as jest.Mock).mockReturnValue({
      setCredentials: mockSetCredentials,
    });

    (useNavigate as jest.Mock).mockReturnValue(mockNavigate);
  });

  it('logs in successfully and navigates to the dashboard', async () => {
    const mockUserData = { users: MOCK_ACCOUNTS_DATA[0] };
    (login as jest.Mock).mockResolvedValue(mockUserData);

    const { result } = renderHook(() => useAuth(), {
      wrapper: env,
    });

    await waitFor(() => result.current.mutate(loginData));

    // Assert successful login and navigation
    expect(mockSetCredentials).toHaveBeenCalledWith(mockUserData);
    expect(mockNavigate).toHaveBeenCalledWith({ to: DESTINATION.DASHBOARD });
  });

  it('handles login failure when users data is missing', async () => {
    const mockUserData = {};

    (login as jest.Mock).mockResolvedValue(mockUserData);

    const { result } = renderHook(() => useAuth(), {
      wrapper: env,
    });

    await waitFor(() => result.current.mutate(loginData));

    // Assert login failure due to missing users data
    expect(mockSetCredentials).not.toHaveBeenCalled();
    expect(mockNavigate).not.toHaveBeenCalled();
  });

  it('handles unexpected login error', async () => {
    (login as jest.Mock).mockRejectedValue(new Error('Unexpected error'));

    const { result } = renderHook(() => useAuth(), {
      wrapper: env,
    });

    await waitFor(() => result.current.mutate(loginData));

    // Assert login failure due to unexpected error
    expect(mockSetCredentials).not.toHaveBeenCalled();
    expect(mockNavigate).not.toHaveBeenCalled();
  });
});
