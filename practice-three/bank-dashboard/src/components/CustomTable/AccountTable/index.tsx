import { useState } from 'react';
import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  useDisclosure,
  Modal,
  Button,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
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

const AccountTable = ({
  totalAccounts = 0,
  accounts = [],
  isLoading,
  currentPage,
  onPageChange,
}: AccountTableProps) => {
  const isMobile = useMediaQuery(`(max-width: ${SCREEN_WIDTH.sm})`);
  const totalPage = Math.ceil(totalAccounts / LIMIT_PER_PAGE);

  const { isOpen, onOpenChange } = useDisclosure();
  const [selectedAccountId, setSelectedAccountId] = useState<string | null>(
    null,
  );
  const [actionType, setActionType] = useState<'edit' | 'delete' | null>(null);

  const handleOpenModal = (id: string, action: 'edit' | 'delete') => {
    setSelectedAccountId(id);
    setActionType(action);
    onOpenChange();
  };

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
          <Dropdown classNames={{ content: 'min-w-25 md:min-w-27.5' }}>
            <DropdownTrigger>
              <button className="flex w-full items-center justify-end p-0">
                <MoreVerticalIcon />
              </button>
            </DropdownTrigger>
            <DropdownMenu
              aria-label="Actions"
              onAction={(key) =>
                handleOpenModal(item.id, key as 'edit' | 'delete')
              }
            >
              <DropdownItem
                key="edit"
                className="data-[hover=true]:bg-green-50"
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

      {/* Modal */}
      <Modal isOpen={isOpen} onOpenChange={onOpenChange} placement="top-center">
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                {actionType === 'edit' ? 'Edit Account' : 'Delete Account'}
              </ModalHeader>
              <ModalBody>
                {actionType === 'edit'
                  ? `Are you sure you want to edit account with ID: ${selectedAccountId}?`
                  : `Are you sure you want to delete account with ID: ${selectedAccountId}?`}
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="flat" onPress={onClose}>
                  Cancel
                </Button>
                <Button color="primary" onPress={onClose}>
                  Confirm
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </Box>
  );
};

export default AccountTable;
