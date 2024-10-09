import CryptoJS from 'crypto-js';

// Interfaces
import { AccountRole } from '@app/interfaces';

// Utils
import { checkUserRole, decryptString } from '@app/utils';

jest.mock('crypto-js', () => ({
  AES: {
    decrypt: jest.fn(),
  },
  enc: {
    Utf8: {
      toString: jest.fn(),
    },
  },
}));

describe('decryptString', () => {
  const mockSecretKey = 'mock-secret-key';
  const mockDecryptedValue = 'decrypted-value';
  const mockEncryptedValue = 'mock-encrypted-string';

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should return an empty string if encryptedString is empty', () => {
    const result = decryptString('', mockSecretKey);
    expect(result).toBe('');
  });

  it('should return an empty string if secretKey is empty', () => {
    const result = decryptString(mockEncryptedValue, '');
    expect(result).toBe('');
  });

  it('should decrypt the string using the provided secret key', () => {
    // Mock the CryptoJS decryption and encoding behavior
    (CryptoJS.AES.decrypt as jest.Mock).mockReturnValue({
      toString: () => mockDecryptedValue,
    });

    const result = decryptString(mockEncryptedValue, mockSecretKey);
    expect(CryptoJS.AES.decrypt).toHaveBeenCalledWith(
      mockEncryptedValue,
      mockSecretKey,
    );
    expect(result).toBe(mockDecryptedValue);
  });

  it('should return an empty string if decryption fails (invalid encryptedString)', () => {
    // Simulate decryption failure by throwing an error
    (CryptoJS.AES.decrypt as jest.Mock).mockImplementation(() => {
      throw new Error('Decryption failed');
    });

    const result = decryptString(mockEncryptedValue, mockSecretKey);
    expect(result).toBe('');
  });

  it('should handle decryption result returning an empty string', () => {
    // Simulate decryption returning an empty string
    (CryptoJS.AES.decrypt as jest.Mock).mockReturnValue({
      toString: () => '',
    });

    const result = decryptString(mockEncryptedValue, mockSecretKey);
    expect(result).toBe('');
  });
});

describe('checkUserRole', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('should return false if there is no stored data', () => {
    expect(checkUserRole()).toBe(false);
  });

  it('should return false if state is undefined', () => {
    localStorage.setItem('auth-storage', JSON.stringify({}));

    expect(checkUserRole()).toBe(false);
  });

  it('should return false if data is undefined', () => {
    localStorage.setItem('auth-storage', JSON.stringify({ state: {} }));

    expect(checkUserRole()).toBe(false);
  });

  it('should return false if userInfo is undefined', () => {
    localStorage.setItem(
      'auth-storage',
      JSON.stringify({ state: { data: {} } }),
    );

    expect(checkUserRole()).toBe(false);
  });

  it('should return false if role is undefined', () => {
    localStorage.setItem(
      'auth-storage',
      JSON.stringify({ state: { data: { userInfo: {} } } }),
    );

    expect(checkUserRole()).toBe(false);
  });

  it('should return true if the user role is Admin', () => {
    localStorage.setItem(
      'auth-storage',
      JSON.stringify({
        state: {
          data: {
            userInfo: {
              role: AccountRole.Admin,
            },
          },
        },
      }),
    );

    expect(checkUserRole()).toBe(true);
  });

  it('should return false if the user role is not Admin', () => {
    localStorage.setItem(
      'auth-storage',
      JSON.stringify({
        state: {
          data: {
            userInfo: {
              role: AccountRole.User,
            },
          },
        },
      }),
    );

    expect(checkUserRole()).toBe(false);
  });
});
