import { UserIcon } from '@app/assets';

const MOCK_ACCOUNT_STATUS_BAR_DATA = [
  {
    icon: <UserIcon />,
    title: 'Total Accounts',
    quantity: 20,
    backgroundColor: 'bg-blue-15',
  },
  {
    icon: <UserIcon />,
    title: 'Active Accounts',
    quantity: 18,
    backgroundColor: 'bg-green-50',
  },
  {
    icon: <UserIcon />,
    title: 'Inactive Accounts',
    quantity: 2,
    backgroundColor: 'bg-white-200',
  },
];

export { MOCK_ACCOUNT_STATUS_BAR_DATA };
