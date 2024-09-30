// Icons
import {
  CreditCardIcon,
  EconometricIcon,
  HomeIcon,
  InvestmentIcon,
  LoanIcon,
  ServiceIcon,
  SettingIcon,
  TransferIcon,
  UserIcon,
} from '@app/assets';

// Constants
import { DESTINATION } from '@app/constants';

const SIDEBAR_LIST = [
  { icon: <HomeIcon />, label: 'Dashboard', link: DESTINATION.DASHBOARD },
  {
    icon: <TransferIcon />,
    label: 'Transactions',
    link: DESTINATION.TRANSACTIONS,
  },
  { icon: <UserIcon />, label: 'Accounts', link: DESTINATION.ACCOUNTS },
  {
    icon: <InvestmentIcon />,
    label: 'Investments',
    link: DESTINATION.INVESTMENTS,
  },
  {
    icon: <CreditCardIcon />,
    label: 'Credit Cards',
    link: DESTINATION.CREDIT_CARDS,
  },
  { icon: <LoanIcon />, label: 'Loans', link: DESTINATION.LOANS },
  { icon: <ServiceIcon />, label: 'Services', link: DESTINATION.SERVICES },
  {
    icon: <EconometricIcon />,
    label: 'My Privileges',
    link: DESTINATION.PRIVILEGES,
  },
  { icon: <SettingIcon />, label: 'Settings', link: DESTINATION.SETTING },
];

export { SIDEBAR_LIST };
