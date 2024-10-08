/**
 * Calculates a person's age from a given date of birth.
 * @param dob Date of birth
 * @returns Age of the person in years
 */
const calculateAge = (dob: Date) => {
  const today = new Date();
  const diff = today.getTime() - dob.getTime();

  // Subtract 1970 since it's calculated from the Epoch time
  const age = new Date(diff).getUTCFullYear() - 1970;

  return age;
};

/**
 * Returns the current date in the format 'YYYY-MM-DD'
 * @returns The current date
 */
const getCurrentDate = (): string => {
  return new Date().toISOString().split('T')[0];
};

export { calculateAge, getCurrentDate };
