import CryptoJS from 'crypto-js';

// Interfaces
import { AccountRole } from '@app/interfaces';

/**
 * Decrypts an AES-encrypted string using a provided secret key.
 * @param {string} encryptedString - The AES-encrypted string to decrypt.
 * @param {string} secretKey - The secret key used for decryption.
 * @returns {string} The decrypted string in UTF-8 format. Returns an empty string if decryption fails or if input is invalid.
 */
export function decryptString(
  encryptedString: string,
  secretKey: string,
): string {
  if (!encryptedString || !secretKey) return '';

  try {
    const decrypted = CryptoJS.AES.decrypt(encryptedString, secretKey);
    return decrypted.toString(CryptoJS.enc.Utf8);
  } catch {
    return '';
  }
}

/**
 * Checks if the user is an admin.
 * @returns {boolean} True if the user is an admin, false otherwise.
 */
const checkUserRole = (): boolean => {
  const storedData = localStorage.getItem('auth-storage');
  if (!storedData) return false;

  const parsedData = JSON.parse(storedData);
  const { data } = parsedData?.state || {};

  if (!data || !data.userInfo || !data.userInfo.role) return false;

  return data.userInfo.role === AccountRole.Admin;
};

export { checkUserRole };
