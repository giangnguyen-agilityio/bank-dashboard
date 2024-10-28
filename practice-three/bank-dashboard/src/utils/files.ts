import {
  ALLOWED_IMAGE_FILE_TYPES,
  MAX_IMAGE_FILE_SIZE_MB,
} from '@app/constants';

/**
 * Checks if the given file size is valid.
 * @param size The size of the file in bytes to check.
 * @returns true if the file size is valid (less than or equal to MAX_IMAGE_FILE_SIZE_MB), false otherwise.
 */
const isFileSizeValid = (size: number): boolean =>
  size <= MAX_IMAGE_FILE_SIZE_MB;

/**
 * Checks if the given filename has a valid file type.
 * @param filename The filename to check, e.g. 'example.jpg'.
 * @returns true if the file type is valid, false otherwise.
 */
const isFileTypeValid = (filename: string): boolean => {
  const fileExtension = filename.split('.').pop()?.toLowerCase();

  return ALLOWED_IMAGE_FILE_TYPES.includes(`.${fileExtension}`);
};

/**
 * Converts a given File object to a base64-encoded string.
 * @param file A File object to convert.
 * @returns A Promise that resolves to a base64-encoded string.
 */
const convertFileToBase64 = (file: File): Promise<string> =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });

export { isFileSizeValid, isFileTypeValid, convertFileToBase64 };
