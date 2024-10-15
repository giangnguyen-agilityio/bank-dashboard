import CryptoJS from 'crypto-js';
import { redirect } from '@tanstack/react-router';

// Constants
import { DESTINATION } from '@app/constants';

// Interfaces
import { AccountRole } from '@app/interfaces';

// Utils
import { decryptString, checkUserRole, authorizeUserRole } from '@app/utils';

jest.mock('@tanstack/react-router', () => ({
  redirect: jest.fn(),
}));

interface AppState {
  state?: {
    data?: {
      userInfo?: { role: AccountRole };
    };
  };
}

const mockLocalStorage = (data: AppState | null) => {
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

describe('decryptString', () => {
  const secretKey = 'test-secret-key';

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should return decrypted string for valid inputs', () => {
    const encrypted = CryptoJS.AES.encrypt('hello world', secretKey).toString();
    const result = decryptString(encrypted, secretKey);

    expect(result).toBe('hello world');
  });

  it('should return an empty string if input is invalid', () => {
    const result = decryptString('', secretKey);

    expect(result).toBe('');
  });

  it('should return an empty string when decryption fails', () => {
    jest.spyOn(CryptoJS.AES, 'decrypt').mockImplementation(() => {
      throw new Error('Decryption failed');
    });
    jest.spyOn(console, 'error').mockImplementation(() => {});

    const result = decryptString('invalidEncryptedString', 'wrongKey');

    expect(result).toBe('');
  });
});

describe('checkUserRole', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should return false if there is no stored data', () => {
    mockLocalStorage(null);
    const result = checkUserRole(AccountRole.Admin);

    expect(result).toBe(false);
  });

  it('should return false if stored data is not valid JSON', () => {
    mockLocalStorage(null);
    Object.defineProperty(window.localStorage, 'getItem', {
      value: jest.fn(() => 'invalid json'),
    });
    const result = checkUserRole(AccountRole.Admin);

    expect(result).toBe(false);
  });

  it('should return false if user role does not match the required role', () => {
    mockLocalStorage({
      state: {
        data: {
          userInfo: { role: AccountRole.User },
        },
      },
    });
    const result = checkUserRole(AccountRole.Admin);

    expect(result).toBe(false);
  });

  it('should return true if user role matches the required role', () => {
    mockLocalStorage({
      state: {
        data: {
          userInfo: { role: AccountRole.Admin },
        },
      },
    });
    const result = checkUserRole(AccountRole.Admin);

    expect(result).toBe(true);
  });

  it('should return false if userInfo is undefined', () => {
    mockLocalStorage({});
    const result = checkUserRole(AccountRole.Admin);

    expect(result).toBe(false);
  });
});

describe('authorizeUserRole', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should proceed without throwing if the user has the required role', async () => {
    mockLocalStorage({
      state: {
        data: {
          userInfo: { role: AccountRole.Admin },
        },
      },
    });

    checkUserRole(AccountRole.Admin);

    const loaderFunction = authorizeUserRole(AccountRole.Admin);

    await expect(loaderFunction()).resolves.not.toThrow();
  });

  it('should throw a redirect if the user does not have the required role', async () => {
    mockLocalStorage({
      state: {},
    });

    checkUserRole(AccountRole.Admin);

    const loaderFunction = authorizeUserRole(AccountRole.Admin);

    await expect(loaderFunction()).rejects.not.toThrow();

    expect(redirect).toHaveBeenCalledWith({ to: DESTINATION.UNAUTHORIZED });
  });
});
