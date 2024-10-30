// Hooks
import { useFetchAccounts } from '@app/hooks';

// Constants
import { ACCOUNT_STATUS } from '@app/constants';

// Icons
import { UserIcon } from '@app/assets';

// Interfaces
import { IAccountData, IAccountStatusItem } from '@app/interfaces';

// HOCs
import ErrorBoundary from '@app/hocs';

// Components
import { Box, AccountTable, AccountStatusBar } from '@app/components';

const AccountPage = () => {
  const { data: { users = [] } = {} } = useFetchAccounts();

  const activeAccounts = users.filter(
    (account: IAccountData) => account.status === ACCOUNT_STATUS.ACTIVE,
  );

  const ACCOUNT_STATUS_BAR_DATA: IAccountStatusItem[] = [
    {
      icon: UserIcon,
      title: 'Total Accounts',
      quantity: users.length,
      backgroundColor: 'bg-blue-15',
    },
    {
      icon: UserIcon,
      title: 'Active Accounts',
      quantity: activeAccounts.length,
      backgroundColor: 'bg-green-50',
    },
    {
      icon: UserIcon,
      title: 'Inactive Accounts',
      quantity: users.length - activeAccounts.length || 0,
      backgroundColor: 'bg-white-200',
    },
  ];

  return (
    <Box className="min-h-fit flex flex-col gap-5.5 md:gap-5 lg:gap-6">
      <ErrorBoundary>
        <Box aria-label="Account status bar">
          <AccountStatusBar data={ACCOUNT_STATUS_BAR_DATA} />
        </Box>
      </ErrorBoundary>

      {/* Account List */}
      <ErrorBoundary>
        <AccountTable />
      </ErrorBoundary>
    </Box>
  );
};

export default AccountPage;
