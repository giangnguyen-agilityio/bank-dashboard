// Utils
import { renderHook, act } from '@app/utils';

// Stores
import { useAuthStore } from '@app/stores';

// Mocks
import { MOCK_ACCOUNTS_DATA } from '@app/mocks';

// Interfaces
import { AccountRole, AuthResponse } from '@app/interfaces';

const mockAuthResponse = {
  users: MOCK_ACCOUNTS_DATA[0],
  exp: new Date(Date.now() + 60 * 60 * 1000).toISOString(),
};

// Mock CryptoJS AES encryption
jest.mock('crypto-js', () => ({
  AES: {
    encrypt: jest.fn().mockReturnValue({
      toString: jest.fn().mockReturnValue('encryptedPassword'),
    }),
  },
}));

describe('Auth Store', () => {
  afterEach(() => {
    const { clearCredentials } = useAuthStore.getState();
    act(() => clearCredentials());
  });

  it('should set credentials, encrypt password, and set isAdmin if user is Admin', () => {
    const { result } = renderHook(() => useAuthStore());

    const adminAuthResponse = {
      ...mockAuthResponse,
      users: {
        ...mockAuthResponse.users,
        role: AccountRole.Admin,
      },
    };

    act(() => {
      result.current.setCredentials(adminAuthResponse);
    });

    const { data, isAuthenticated, isAdmin } = result.current;

    expect(data?.userInfo.username).toEqual(adminAuthResponse.users.username);
    expect(data?.userInfo.password).toEqual('encryptedPassword');
    expect(isAuthenticated).toBe(true);
    expect(isAdmin).toBe(true); // Ensure isAdmin is true for admin user
  });

  it('should set isAdmin to false if user is not an Admin', () => {
    const { result } = renderHook(() => useAuthStore());

    const nonAdminAuthResponse = {
      ...mockAuthResponse,
      users: {
        ...mockAuthResponse.users,
        role: AccountRole.User,
      },
    };

    act(() => {
      result.current.setCredentials(nonAdminAuthResponse);
    });

    const { isAdmin } = result.current;

    expect(isAdmin).toBe(false);
  });

  it('should clear credentials', () => {
    const { result } = renderHook(() => useAuthStore());

    act(() => {
      result.current.setCredentials(mockAuthResponse);
      result.current.clearCredentials();
    });

    const { data, isAuthenticated, isAdmin } = result.current;

    expect(data).toBeNull();
    expect(isAuthenticated).toBe(false);
    expect(isAdmin).toBe(false);
  });

  it('should check authentication status and clear credentials if expired', () => {
    const { result } = renderHook(() => useAuthStore());

    const expiredAuthResponse = {
      ...mockAuthResponse,
      exp: new Date(Date.now() - 60 * 60 * 1000).toISOString(),
    };

    act(() => {
      result.current.setCredentials(expiredAuthResponse);
      result.current.checkAuthStatus();
    });

    const { data, isAuthenticated, isAdmin } = result.current;

    expect(data).toBeNull();
    expect(isAuthenticated).toBe(false);
    expect(isAdmin).toBe(false);
  });

  it('should remain authenticated and keep isAdmin if token is valid', () => {
    const { result } = renderHook(() => useAuthStore());

    act(() => {
      result.current.setCredentials(mockAuthResponse);
      result.current.checkAuthStatus();
    });

    const { isAuthenticated, isAdmin } = result.current;

    expect(isAuthenticated).toBe(true);
    expect(isAdmin).toBe(false);
  });

  it('should clear credentials if data or exp is null', () => {
    const { result } = renderHook(() => useAuthStore());

    act(() => {
      result.current.checkAuthStatus();
    });

    const { data, isAuthenticated, isAdmin } = result.current;

    expect(data).toBeNull();
    expect(isAuthenticated).toBe(false);
    expect(isAdmin).toBe(false);

    const invalidAuthResponse = {
      users: {
        username: 'testUser',
        password: 'testPassword',
      },
      exp: null,
    };

    act(() => {
      result.current.setCredentials(
        invalidAuthResponse as unknown as AuthResponse,
      );
      result.current.checkAuthStatus();
    });

    const {
      data: dataAfterExpNull,
      isAuthenticated: isAuthenticatedAfterExpNull,
      isAdmin: isAdminAfterExpNull,
    } = result.current;

    expect(dataAfterExpNull).toBeNull();
    expect(isAuthenticatedAfterExpNull).toBe(false);
    expect(isAdminAfterExpNull).toBe(false);
  });
});
