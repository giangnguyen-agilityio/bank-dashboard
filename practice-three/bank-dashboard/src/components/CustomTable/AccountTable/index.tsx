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
import { DeleteIcon, EditIcon, MoreVerticalIcon } from '@app/assets';

// Components
import { Box, Pagination, Table, Text } from '@app/components';

interface AccountTableProps {
  currentPage: number;
  totalAccounts?: number;
  accounts?: IAccountData[];
  isLoading?: boolean;
  onPageChange?: (page: number) => void;
}

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
    accessor: () => {
      return (
        <Dropdown
          classNames={{
            content: 'min-w-25 md:min-w-27.5',
          }}
        >
          <DropdownTrigger>
            <button className="flex w-full items-center justify-end p-0">
              <MoreVerticalIcon />
            </button>
          </DropdownTrigger>
          <DropdownMenu aria-label="Static Actions">
            <DropdownItem
              className="data-[hover=true]:bg-green-50"
              key="edit"
              startContent={<EditIcon customClass="text-green-100" />}
            >
              <Text
                variant="title"
                customClass="font-primary font-semibold text-lg lg:text-2xl text-green-100"
              >
                Edit
              </Text>
            </DropdownItem>
            <DropdownItem
              key="delete"
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
    accessor: () => {
      return (
        <Dropdown
          classNames={{
            content: 'min-w-25 md:min-w-27.5',
          }}
        >
          <DropdownTrigger>
            <button className="flex w-full items-center justify-end p-0">
              <MoreVerticalIcon />
            </button>
          </DropdownTrigger>
          <DropdownMenu aria-label="Static Actions">
            <DropdownItem
              className="data-[hover=true]:bg-green-50"
              key="edit"
              startContent={<EditIcon customClass="text-green-100" />}
            >
              <Text
                variant="title"
                customClass="font-primary font-semibold text-lg text-green-100"
              >
                Edit
              </Text>
            </DropdownItem>
            <DropdownItem
              key="delete"
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

const AccountTable = ({
  totalAccounts = 0,
  accounts = [],
  isLoading,
  currentPage,
  onPageChange,
}: AccountTableProps) => {
  const isMobile = useMediaQuery(`(max-width: ${SCREEN_WIDTH.sm})`);

  const totalPage = Math.ceil(totalAccounts / LIMIT_PER_PAGE);

  return (
    <Box className="flex flex-col gap-1">
      {/* Table */}
      <Table
        variant={isMobile ? 'secondary' : 'primary'}
        columns={
          isMobile ? COLUMN_ACCOUNT_LIST_MOBILE : COLUMN_ACCOUNT_LIST_DESKTOP
        }
        data={accounts}
        isLoading={isLoading}
      />

      {/* Pagination */}
      {!isLoading && (
        <Box className="flex w-full justify-end mx-auto">
          <Pagination
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
