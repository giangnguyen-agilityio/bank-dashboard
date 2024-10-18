import { memo, useMemo } from 'react';

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
import { useMediaQuery } from '@app/hooks';

// Icons
import { DeleteIcon } from '@app/assets';

// Components
import { Box, Dropdown, Pagination, Table } from '@app/components';

interface AccountTableProps {
  currentPage: number;
  totalAccounts?: number;
  accounts?: IAccountData[];
  isLoading?: boolean;
  onPageChange?: (page: number) => void;
  onDelete?: (accountId: string) => void;
}

const AccountTable = ({
  totalAccounts = 0,
  accounts = [],
  isLoading,
  currentPage,
  onPageChange,
  onDelete,
}: AccountTableProps) => {
  const isMobile = useMediaQuery(`(max-width: ${SCREEN_WIDTH.sm})`);
  const totalPage = useMemo(
    () => Math.ceil(totalAccounts / LIMIT_PER_PAGE),
    [totalAccounts],
  );
  const isShowPagination = !isLoading && accounts.length > 0;

  const actions = useMemo(
    () => [
      {
        key: 'delete',
        className: 'text-red-200 hover:outline-red-200',
        icon: <DeleteIcon customClass="text-red-200" />,
      },
    ],
    [],
  );

  const COLUMN_ACCOUNT_LIST_DESKTOP: TableColumnType<IAccountData>[] = useMemo(
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
            <Dropdown id={item.id} actions={actions} onAction={onDelete} />
          );
        },
      },
    ],
    [actions, onDelete],
  );

  const COLUMN_ACCOUNT_LIST_MOBILE: TableColumnType<IAccountData>[] = useMemo(
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
            <Dropdown id={item.id} actions={actions} onAction={onDelete} />
          );
        },
      },
    ],
    [actions, onDelete],
  );

  return (
    <Box className="flex flex-col gap-1">
      {/* Table */}
      <Table
        aria-label="Account table"
        variant={isMobile ? 'secondary' : 'primary'}
        columns={
          isMobile ? COLUMN_ACCOUNT_LIST_MOBILE : COLUMN_ACCOUNT_LIST_DESKTOP
        }
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
            onPageChange={onPageChange}
          />
        </Box>
      )}
    </Box>
  );
};

export default memo(AccountTable);
