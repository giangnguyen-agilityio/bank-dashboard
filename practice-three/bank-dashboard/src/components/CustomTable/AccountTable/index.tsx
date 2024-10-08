import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
} from '@nextui-org/react';

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
import { DeleteIcon, MoreVerticalIcon } from '@app/assets';

// Components
import { Box, Pagination, Table, Text } from '@app/components';

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
  const totalPage = Math.ceil(totalAccounts / LIMIT_PER_PAGE);
  const isShowPagination = !isLoading && accounts.length > 0;

  const COLUMN_ACCOUNT_LIST_DESKTOP: TableColumnType<IAccountData>[] = [
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
          <Box className="flex w-full items-center justify-end p-0 data-[focus=true]:outline-none data-[focus-visible=true]:outline-none">
            <Dropdown
              aria-label="More actions"
              data-testid="dropdown"
              classNames={{ content: 'min-w-25 md:min-w-27.5' }}
            >
              <DropdownTrigger aria-label="More actions button">
                <button>
                  <MoreVerticalIcon />
                </button>
              </DropdownTrigger>
              <DropdownMenu
                aria-label="More actions menu"
                onAction={() => onDelete?.(item.id)}
              >
                <DropdownItem
                  key="delete"
                  aria-label="Delete account button"
                  className="data-[hover=true]:bg-red-100/35"
                  startContent={<DeleteIcon customClass="text-red-200" />}
                >
                  <Text
                    variant="title"
                    customClass="font-primary font-semibold text-lg lg:text-2xl text-red-200"
                  >
                    Delete
                  </Text>
                </DropdownItem>
              </DropdownMenu>
            </Dropdown>
          </Box>
        );
      },
    },
  ];

  const COLUMN_ACCOUNT_LIST_MOBILE: TableColumnType<IAccountData>[] = [
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
            aria-label="More actions"
            data-testid="dropdown"
            classNames={{
              content: 'min-w-25 md:min-w-27.5',
            }}
          >
            <DropdownTrigger aria-label="More actions button">
              <button className="flex w-full items-center justify-end p-0">
                <MoreVerticalIcon />
              </button>
            </DropdownTrigger>
            <DropdownMenu
              aria-label="More actions menu"
              onAction={() => onDelete?.(item.id)}
            >
              <DropdownItem
                key="delete"
                aria-label="Delete account button"
                className="data-[hover=true]:bg-red-100/35"
                startContent={<DeleteIcon customClass="text-red-200" />}
              >
                <Text
                  variant="title"
                  customClass="font-primary font-semibold text-lg text-red-200"
                >
                  Delete
                </Text>
              </DropdownItem>
            </DropdownMenu>
          </Dropdown>
        );
      },
    },
  ];

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

export default AccountTable;
