import { calculateAge, getCurrentDate } from '@app/utils';

describe('calculateAge', () => {
  beforeAll(() => {
    jest.useFakeTimers();
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  it('should return correct age for a past date', () => {
    const dob = new Date('1990-01-01');
    const age = calculateAge(dob);

    // Assume today is 2024-10-15 for this example.
    expect(age).toBe(34);
  });

  it('should return 0 if the person is born today', () => {
    const today = new Date();
    const age = calculateAge(today);

    expect(age).toBe(0);
  });

  it('should handle leap years correctly', () => {
    const dob = new Date('2000-02-29');
    const age = calculateAge(dob);

    // Assume today is 2024-10-15, so the person should be 24 years old
    expect(age).toBe(24);
  });

  it('should return negative age for future date', () => {
    const futureDob = new Date('2050-01-01');
    const age = calculateAge(futureDob);

    expect(age).toBeLessThan(0);
  });
});

describe('getCurrentDate', () => {
  beforeAll(() => {
    jest.useFakeTimers();
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  it("should return today's date in the format YYYY-MM-DD", () => {
    const currentDate = getCurrentDate();

    // Get today's date in the expected format
    const expectedDate = new Date().toISOString().split('T')[0];

    expect(currentDate).toBe(expectedDate);
  });
});
