import { maskCardNumber } from '@app/utils';
describe('maskCardNumber', () => {
  it('should mask the card number correctly for a standard 16-digit number', () => {
    const cardNumber = '1234567812345678';
    const result = maskCardNumber(cardNumber);

    expect(result).toBe('1234 **** **** 5678');
  });

  it('should mask the card number and ignore spaces', () => {
    const cardNumber = '1234 5678 1234 5678';
    const result = maskCardNumber(cardNumber);

    expect(result).toBe('1234 **** **** 5678');
  });

  it('should mask the card number and ignore non-digit characters', () => {
    const cardNumber = '1234-5678-1234-5678';
    const result = maskCardNumber(cardNumber);

    expect(result).toBe('1234 **** **** 5678');
  });

  it('should handle short card numbers (less than 16 digits)', () => {
    const cardNumber = '123456';
    const result = maskCardNumber(cardNumber);

    expect(result).toBe('1234 **** **** ');
  });

  it('should return the masked number with only the first 4 and last 4 digits if available', () => {
    const cardNumber = '123456789';
    const result = maskCardNumber(cardNumber);

    expect(result).toBe('1234 **** **** ');
  });

  it('should handle card numbers with mixed characters and spaces', () => {
    const cardNumber = '1234 5678a12x34 5678';
    const result = maskCardNumber(cardNumber);

    expect(result).toBe('1234 **** **** 5678');
  });
});
