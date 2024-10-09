// Utils
import { renderHook, act } from '@app/utils';

// Stores
import { useAuthStore } from '@app/stores';

// Mocks
import { MOCK_ACCOUNTS_DATA } from '@app/mocks';

// Interfaces
import { AuthResponse } from '@app/interfaces';

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

  it('should set credentials and encrypt password', () => {
    const { result } = renderHook(() => useAuthStore());

    act(() => {
      result.current.setCredentials(mockAuthResponse);
    });

    const { data, isAuthenticated } = result.current;

    expect(data?.userInfo.username).toEqual(mockAuthResponse.users.username);
    expect(data?.userInfo.password).toEqual('encryptedPassword');
    expect(isAuthenticated).toBe(true);
  });

  it('should clear credentials', () => {
    const { result } = renderHook(() => useAuthStore());

    act(() => {
      result.current.setCredentials(mockAuthResponse);
      result.current.clearCredentials();
    });

    const { data, isAuthenticated } = result.current;

    expect(data).toBeNull();
    expect(isAuthenticated).toBe(false);
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

    const { data, isAuthenticated } = result.current;

    expect(data).toBeNull();
    expect(isAuthenticated).toBe(false);
  });

  it('should remain authenticated if token is valid', () => {
    const { result } = renderHook(() => useAuthStore());

    act(() => {
      result.current.setCredentials(mockAuthResponse);
      result.current.checkAuthStatus();
    });

    const { isAuthenticated } = result.current;

    expect(isAuthenticated).toBe(true);
  });

  it('should clear credentials if data or exp is null', () => {
    const { result } = renderHook(() => useAuthStore());

    act(() => {
      result.current.checkAuthStatus();
    });

    const { data, isAuthenticated } = result.current;

    expect(data).toBeNull();
    expect(isAuthenticated).toBe(false);

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
    } = result.current;

    expect(dataAfterExpNull).toBeNull();
    expect(isAuthenticatedAfterExpNull).toBe(false);
  });
});
