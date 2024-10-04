import { useState, useCallback } from 'react';

// Hooks
import { useFetchAccounts } from '@app/hooks';

// Constants
import { LIMIT_PER_PAGE, ACCOUNT_STATUS } from '@app/constants';

// Icons
import { UserIcon } from '@app/assets';

// Interfaces
import { IAccountData, IAccountStatusItem } from '@app/interfaces';

// Components
import {
  Box,
  Text,
  AccountTable,
  AccountStatusBar,
  Button,
} from '@app/components';

const AccountPage = () => {
  const [page, setPage] = useState(1);
  const { data: totalAccountsPerPage, isLoading } = useFetchAccounts(
    page,
    LIMIT_PER_PAGE,
  );

  const { data: { users = [] } = {} } = useFetchAccounts();

  const { users: accounts, count: totalAccounts } = totalAccountsPerPage || {};

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

  const handlePageChange = useCallback(
    (newPage: number) => {
      setPage(newPage);
    },
    [setPage],
  );

  return (
    <Box className="min-h-screen flex flex-col gap-5.5 md:gap-5 lg:gap-6">
      <Box aria-label="Account status bar">
        <AccountStatusBar data={ACCOUNT_STATUS_BAR_DATA} />
      </Box>

      {/* Transactions List */}
      <Box className="flex flex-col gap-3.75 md:gap-4.5 lg:gap-5">
        <Box className="card-action flex justify-between items-center">
          <Text
            aria-label="Title of list accounts"
            variant="heading"
            customClass="text-2xl md:text-4xl lg:text-6xl"
          >
            List Accounts
          </Text>
          <Button
            aria-label="Add new account button"
            color="default"
            className="font-primary font-semibold rounded-sm p-1 bg-transparent text-text-secondary text-lg md:text-xl lg:text-3xl"
          >
            + Add New Account
          </Button>
        </Box>

        {/* Transaction Table */}
        <AccountTable
          aria-label="Account table"
          accounts={accounts}
          totalAccounts={totalAccounts}
          currentPage={page}
          isLoading={isLoading}
          onPageChange={handlePageChange}
        />
      </Box>
    </Box>
  );
};

export default AccountPage;
