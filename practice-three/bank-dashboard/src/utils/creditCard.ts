/**
 * Utility function to mask a card number, showing only the first 4 and last 4 digits.
 * @param cardNumber - The credit card number as a string (with or without spaces)
 * @returns Masked card number in the format "XXXX **** **** XXXX"
 */

const maskCardNumber = (cardNumber: string): string => {
  // Clean up the input to remove any spaces or non-digit characters
  const cleanCardNumber = cardNumber.replace(/\D/g, '');

  // Validate card number length (16 digits for standard credit cards)
  if (cleanCardNumber.length !== 16) {
    throw new Error('Card number must have exactly 16 digits.');
  }

  // Use template literals to format the output
  return `${cleanCardNumber.slice(0, 4)} **** **** ${cleanCardNumber.slice(12)}`;
};

export { maskCardNumber };
