/**
 * Utility function to mask a card number, showing only the first 4 and last 4 digits.
 * @param cardNumber - The credit card number as a string (with or without spaces)
 * @returns Masked card number in the format "XXXX **** **** XXXX"
 */
const maskCardNumber = (cardNumber: string): string => {
  // Clean up the input to remove any spaces or non-digit characters
  const cleanCardNumber = cardNumber.replace(/\D/g, '');

  // Use template literals to format the output
  return `${cleanCardNumber.slice(0, 4)} **** **** ${cleanCardNumber.slice(12)}`;
};

export { maskCardNumber };
