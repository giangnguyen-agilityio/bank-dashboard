// Constants
import {
  ALLOWED_IMAGE_FILE_TYPES,
  MAX_IMAGE_FILE_SIZE_MB,
} from '@app/constants';

// Utils
import {
  isFileSizeValid,
  isFileTypeValid,
  convertFileToBase64,
} from '@app/utils';

describe('isFileSizeValid', () => {
  it('should return true if the file size is less than or equal to MAX_IMAGE_FILE_SIZE_MB', () => {
    expect(isFileSizeValid(MAX_IMAGE_FILE_SIZE_MB)).toBe(true);
    expect(isFileSizeValid(MAX_IMAGE_FILE_SIZE_MB - 1)).toBe(true);
  });

  it('should return false if the file size is greater than MAX_IMAGE_FILE_SIZE_MB', () => {
    expect(isFileSizeValid(MAX_IMAGE_FILE_SIZE_MB + 1)).toBe(false);
  });
});

describe('isFileTypeValid', () => {
  it('should return true for a valid file type', () => {
    ALLOWED_IMAGE_FILE_TYPES.forEach((type) => {
      const filename = `example${type}`;

      expect(isFileTypeValid(filename)).toBe(true);
    });
  });

  it('should return false for an invalid file type', () => {
    expect(isFileTypeValid('example.txt')).toBe(false);
    expect(isFileTypeValid('example.pdf')).toBe(false);
  });

  it('should return false if the file has no extension', () => {
    expect(isFileTypeValid('example')).toBe(false);
  });

  it('should be case-insensitive for file extensions', () => {
    ALLOWED_IMAGE_FILE_TYPES.forEach((type) => {
      const filename = `example${type.toUpperCase()}`;

      expect(isFileTypeValid(filename)).toBe(true);
    });
  });
});

describe('convertFileToBase64', () => {
  it('should resolve to a base64 string when given a valid File object', async () => {
    const fileContent = 'Hello, World!';
    const blob = new Blob([fileContent], { type: 'text/plain' });
    const file = new File([blob], 'test.txt', { type: 'text/plain' });

    const base64String = await convertFileToBase64(file);

    expect(base64String).toContain('data:text/plain;base64,');
  });
});
