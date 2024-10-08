import { useState, useCallback } from 'react';

// Hooks
import { useFetchAccounts, useAccount } from '@app/hooks';

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
  ConfirmModal,
} from '@app/components';

const AccountPage = () => {
  const [page, setPage] = useState(1);
  const [isModalOpen, setModalOpen] = useState(false);
  const [selectedAccountId, setSelectedAccountId] = useState<string | null>(
    null,
  );

  const { data: totalAccountsPerPage, isLoading } = useFetchAccounts(
    page,
    LIMIT_PER_PAGE,
  );
  const { data: { users = [] } = {} } = useFetchAccounts();
  const { isDeletingAccount, deleteAccount } = useAccount();

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

  const handlePageChange = useCallback((newPage: number) => {
    setPage(newPage);
  }, []);

  const handleOpenModal = useCallback((id: string) => {
    setSelectedAccountId(id);
    setModalOpen(true);
  }, []);

  const handleCloseModal = useCallback(() => {
    setModalOpen(false);
    setSelectedAccountId(null);
  }, []);

  const handleDeleteAction = useCallback(() => {
    if (selectedAccountId) {
      deleteAccount(selectedAccountId, {
        onSuccess: () => {
          handleCloseModal();
        },
      });
    }
  }, [selectedAccountId, deleteAccount, handleCloseModal]);

  return (
    <Box className="min-h-fit flex flex-col gap-5.5 md:gap-5 lg:gap-6">
      <Box aria-label="Account status bar">
        <AccountStatusBar data={ACCOUNT_STATUS_BAR_DATA} />
      </Box>

      {/* Account List */}
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

        {/* Account Table */}
        <AccountTable
          aria-label="Account table"
          accounts={accounts}
          totalAccounts={totalAccounts}
          currentPage={page}
          isLoading={isLoading}
          onPageChange={handlePageChange}
          onDelete={handleOpenModal}
        />
      </Box>

      {/* Modal */}
      <ConfirmModal
        size="md"
        isOpen={isModalOpen}
        title="Confirm"
        content={`Are you sure you want to delete the account with ID: ${selectedAccountId}?\nThis action cannot be undone.`}
        onConfirm={handleDeleteAction}
        onCancel={handleCloseModal}
        isLoading={isDeletingAccount}
      />
    </Box>
  );
};

export default AccountPage;
