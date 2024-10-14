import { redirect } from '@tanstack/react-router';
import CryptoJS from 'crypto-js';

// Interfaces
import { AccountRole } from '@app/interfaces';

// Constants
import { DESTINATION } from '@app/constants';

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
 * Checks if the user has the given required role.
 * @param {AccountRole} requiredRole - The role to check against.
 * @returns {boolean} true if the user has the required role, false otherwise.
 */
const checkUserRole = (requiredRole: AccountRole): boolean => {
  const storedData = localStorage.getItem('auth-storage');
  if (!storedData) return false;

  try {
    const parsedData = JSON.parse(storedData);
    const { data } = parsedData?.state || {};
    const userRole = data?.userInfo?.role;

    return userRole === requiredRole;
  } catch (error) {
    console.error('Error parsing stored user data:', error);

    return false;
  }
};

/**
 * Creates a route loader function that checks if the user has the required role.
 * If the user does not have the required role, the function throws a redirect to the unauthorized route.
 * @param {AccountRole} requiredRole - The role the user must have to access the route.
 * @returns {LoaderFunction} A route loader function that performs the role check.
 */
const authorizeUserRole = (requiredRole: AccountRole) => async () => {
  const hasRequiredRole = checkUserRole(requiredRole);

  if (!hasRequiredRole) {
    throw redirect({ to: DESTINATION.UNAUTHORIZED });
  }
};

export { checkUserRole, authorizeUserRole };
