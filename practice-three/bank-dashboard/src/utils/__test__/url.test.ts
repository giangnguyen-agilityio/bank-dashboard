// Constants
import { DESTINATION } from '@app/constants';

// Utils
import { getHeadingFromPathname } from '@app/utils';

describe('getHeadingFromPathname', () => {
  it('should return the correct heading for a valid pathname', () => {
    expect(getHeadingFromPathname(DESTINATION.TRANSACTIONS)).toBe(
      'Transactions',
    );
    expect(getHeadingFromPathname(DESTINATION.ACCOUNTS)).toBe('Accounts');
    expect(getHeadingFromPathname(DESTINATION.INVESTMENTS)).toBe('Investments');
    expect(getHeadingFromPathname(DESTINATION.CREDIT_CARDS)).toBe(
      'Credit Cards',
    );
    expect(getHeadingFromPathname(DESTINATION.LOANS)).toBe('Loans');
    expect(getHeadingFromPathname(DESTINATION.SERVICES)).toBe('Services');
    expect(getHeadingFromPathname(DESTINATION.PRIVILEGES)).toBe('Privileges');
    expect(getHeadingFromPathname(DESTINATION.SETTING)).toBe('Settings');
  });

  it('should return the default heading for an invalid pathname', () => {
    const invalidPathname = 'INVALID_PATH';
    const defaultHeading = 'Overview';
    expect(getHeadingFromPathname(invalidPathname)).toBe(defaultHeading);
  });

  it('should return the provided default heading when the pathname is invalid', () => {
    const invalidPathname = 'INVALID_PATH';
    const customDefaultHeading = 'Custom Overview';
    expect(getHeadingFromPathname(invalidPathname, customDefaultHeading)).toBe(
      customDefaultHeading,
    );
  });

  it('should return "Overview" as the default heading if no default is provided', () => {
    expect(getHeadingFromPathname('INVALID_PATH')).toBe('Overview');
  });
});
