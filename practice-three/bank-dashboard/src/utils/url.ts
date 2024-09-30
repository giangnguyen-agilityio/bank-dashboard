import { DESTINATION } from '@app/constants';

const routeToHeading: { [key: string]: string } = {
  [DESTINATION.TRANSACTIONS]: 'Transactions',
  [DESTINATION.ACCOUNTS]: 'Accounts',
  [DESTINATION.INVESTMENTS]: 'Investments',
  [DESTINATION.CREDIT_CARDS]: 'Credit Cards',
  [DESTINATION.LOANS]: 'Loans',
  [DESTINATION.SERVICES]: 'Services',
  [DESTINATION.PRIVILEGES]: 'Privileges',
  [DESTINATION.SETTING]: 'Settings',
};

const getHeadingFromPathname = (
  pathname: string,
  defaultHeading = 'Overview',
) => routeToHeading[pathname] || defaultHeading;

export { getHeadingFromPathname };
