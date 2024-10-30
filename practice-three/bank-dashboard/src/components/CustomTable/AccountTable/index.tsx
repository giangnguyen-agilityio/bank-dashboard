import { memo, useMemo, lazy, Suspense, useState, useCallback } from 'react';

// Constants
import {
  SCREEN_WIDTH,
  LIMIT_PER_PAGE,
  WIDTH_COLUMN_CONFIG,
  UN_SET_COLUMN_CONFIG,
} from '@app/constants';

// Interfaces
import { IAccountData } from '@app/interfaces';

// Types
import { TableColumnType } from '@app/types';

// Hooks
import { useAccount, useFetchAccounts, useMediaQuery } from '@app/hooks';

// Icons
import { DeleteIcon } from '@app/assets';

// Components
import {
  Box,
  Dropdown,
  Pagination,
  Table,
  Spinner,
  Button,
  Text,
} from '@app/components';

const ConfirmModal = lazy(() => import('@app/components/ConfirmModal'));

const AccountTable = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [isModalOpen, setModalOpen] = useState(false);
  const [selectedAccountId, setSelectedAccountId] = useState<string | null>(
    null,
  );

  const isMobile = useMediaQuery(`(max-width: ${SCREEN_WIDTH.sm})`);

  const { data: totalAccountsPerPage, isLoading } = useFetchAccounts(
    currentPage,
    LIMIT_PER_PAGE,
  );
  const { isDeletingAccount, deleteAccount } = useAccount();

  const { users: accounts = [], count: totalAccounts = 0 } =
    totalAccountsPerPage || {};

  const totalPage = useMemo(
    () => Math.ceil(totalAccounts / LIMIT_PER_PAGE),
    [totalAccounts],
  );
  const isShowPagination = !isLoading && accounts.length > 0;

  const handlePageChange = useCallback((newPage: number) => {
    setCurrentPage(newPage);
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

  const TABLE_COLUMN_DESKTOP: TableColumnType<IAccountData>[] = useMemo(
    () => [
      {
        header: 'Name',
        accessor: 'name',
      },
      {
        header: 'User Name',
        accessor: 'username',
      },
      {
        header: 'Email',
        accessor: 'email',
        size: WIDTH_COLUMN_CONFIG.LARGE,
      },
      {
        header: 'Date Of Birth',
        accessor: 'dateOfBirth',
      },
      {
        header: 'Address',
        accessor: 'presentAddress',
        size: WIDTH_COLUMN_CONFIG.LARGE,
      },
      {
        header: '',
        accessor: (item) => {
          return (
            <Dropdown
              options={[
                {
                  key: 'delete',
                  className:
                    'text-text-error hover:outline-text-error data-[hover=true]:bg-transparent',
                  icon: <DeleteIcon customClass="text-text-error" />,
                  onAction: () => handleOpenModal(item.id),
                },
              ]}
            />
          );
        },
      },
    ],
    [handleOpenModal],
  );

  const TABLE_COLUMN_MOBILE: TableColumnType<IAccountData>[] = useMemo(
    () => [
      {
        header: 'User Name',
        accessor: 'username',
        size: UN_SET_COLUMN_CONFIG,
      },
      {
        header: 'Email',
        accessor: 'email',
      },
      {
        header: '',
        accessor: (item) => {
          return (
            <Dropdown
              options={[
                {
                  key: 'delete',
                  className:
                    'text-text-error hover:outline-text-error data-[hover=true]:bg-transparent',
                  icon: <DeleteIcon customClass="text-text-error" />,
                  onAction: () => handleOpenModal(item.id),
                },
              ]}
            />
          );
        },
      },
    ],
    [handleOpenModal],
  );

  return (
    <>
      <Box className="flex flex-col gap-3.75 md:gap-4.5 lg:gap-5">
        <Box className="card-action flex justify-between items-center">
          <Text
            as="h2"
            aria-label="Title of list accounts"
            variant="heading"
            customClass="text-2xl md:text-4xl lg:text-6xl"
          >
            List Accounts
          </Text>
          <Button
            as="h3"
            aria-label="Add new account button"
            color="default"
            className="font-primary font-semibold rounded-sm p-1 bg-transparent text-text-secondary text-lg md:text-xl lg:text-3xl"
          >
            + Add New Account
          </Button>
        </Box>

        {/* Account Table */}
        <Box className="flex flex-col gap-1">
          {/* Table */}
          <Table
            aria-label="Account table"
            variant={isMobile ? 'secondary' : 'primary'}
            columns={isMobile ? TABLE_COLUMN_MOBILE : TABLE_COLUMN_DESKTOP}
            data={accounts}
            isLoading={isLoading}
          />

          {/* Pagination */}
          {isShowPagination && (
            <Box className="flex w-full justify-end mx-auto">
              <Pagination
                aria-label="Account table pagination"
                totalPages={totalPage}
                currentPage={currentPage}
                onPageChange={handlePageChange}
              />
            </Box>
          )}
        </Box>
      </Box>

      {/* Modal */}
      {isModalOpen && (
        <Suspense fallback={<Spinner />}>
          <ConfirmModal
            size="md"
            isOpen={isModalOpen}
            title="Confirm"
            content={`Are you sure you want to delete the account with ID: ${selectedAccountId}?\nThis action cannot be undone.`}
            onConfirm={handleDeleteAction}
            onCancel={handleCloseModal}
            isLoading={isDeletingAccount}
          />
        </Suspense>
      )}
    </>
  );
};

export default memo(AccountTable);
