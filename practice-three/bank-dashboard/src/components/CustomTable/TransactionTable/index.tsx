import { useState } from 'react';

// Constants
import {
  SCREEN_WIDTH,
  LIMIT_PER_PAGE,
  TRANSACTION_TABLE_TABS,
  WIDTH_COLUMN_CONFIG,
} from '@app/constants';

// Interfaces
import { TransactionData, TransactionKind } from '@app/interfaces';

// Types
import { TableColumnType } from '@app/types';

// Utils
import { getTransactionAmountStyles, maskCardNumber } from '@app/utils';

// Hooks
import { useMediaQuery } from '@app/hooks';

// Icons
import { UpArrowIcon } from '@app/assets';

// Components
import { Box, Pagination, Table, CustomTabs, Text } from '@app/components';

interface TransactionTableProps {
  currentPage: number;
  totalTransactions?: number;
  transactions?: TransactionData[];
  isLoading?: boolean;
  onTabChange?: (tab: TransactionKind) => void;
  onPageChange?: (page: number) => void;
}

const COLUMNS_TRANSACTION_LIST_DESKTOP: TableColumnType<TransactionData>[] = [
  {
    header: 'Description',

    accessor: (item) => (
      <Box
        className="flex gap-3 lg:gap-5"
        style={{ maxWidth: WIDTH_COLUMN_CONFIG.EXTRA_LARGE }}
      >
        <Box data-testid="icon-wrapper" className="icon-wrapper">
          {item.type === TransactionKind.Income ? (
            <UpArrowIcon />
          ) : (
            <UpArrowIcon customClass="rotate-180" />
          )}
        </Box>
        <Text customClass="text-base lg:text-2xl">{item.description}</Text>
      </Box>
    ),
  },
  {
    header: 'Transaction ID',
    accessor: 'id',
  },
  {
    header: 'Type',
    accessor: 'category',
  },
  {
    header: 'Card',
    accessor: (item) => (
      <Text customClass="text-base lg:text-2xl">
        {maskCardNumber(item.cardNumber)}
      </Text>
    ),
  },
  {
    header: 'Date',
    accessor: 'date',
  },
  {
    header: 'Amount',
    accessor: (item) => {
      const { className, symbol } = getTransactionAmountStyles(
        item.type as TransactionKind,
      );

      return (
        <Text customClass={`text-base lg:text-2xl ${className}`}>
          {`${symbol}$${item.amount}`}
        </Text>
      );
    },
  },
];

const COLUMNS_TRANSACTION_LIST_MOBILE: TableColumnType<TransactionData>[] = [
  {
    header: 'Description',
    accessor: (item) => (
      <Box className="flex items-center gap-3 lg:gap-5">
        <Box data-testid="icon-wrapper" className="icon-wrapper">
          {item.type === TransactionKind.Income ? (
            <UpArrowIcon />
          ) : (
            <UpArrowIcon customClass="rotate-180" />
          )}
        </Box>

        <Box
          title={item.description}
          className="information-wrapper flex flex-col gap-1.5"
        >
          <Text
            customClass="text-base lg:text-2xl"
            style={{ maxWidth: WIDTH_COLUMN_CONFIG.MEDIUM }}
          >
            {item.description}
          </Text>
          <Text customClass="text-blue-50 text-base lg:text-2xl">
            {item.date}
          </Text>
        </Box>
      </Box>
    ),
  },
  {
    header: 'Amount',
    accessor: (item) => {
      const { className, symbol } = getTransactionAmountStyles(
        item.type as TransactionKind,
      );

      return (
        <Text customClass={`text-base lg:text-2xl ${className}`}>
          {`${symbol}$${item.amount}`}
        </Text>
      );
    },
  },
];

const TransactionTable = ({
  totalTransactions = 0,
  transactions = [],
  isLoading,
  currentPage,
  onTabChange,
  onPageChange,
}: TransactionTableProps) => {
  const [selected, setSelected] = useState<string | number>(
    TRANSACTION_TABLE_TABS.ALL_TRANSACTIONS.KEY,
  );

  const isMobile = useMediaQuery(`(max-width: ${SCREEN_WIDTH.sm})`);

  const totalPage = Math.ceil(totalTransactions / LIMIT_PER_PAGE);

  const handleTabChange = (key: string | number) => {
    setSelected(key);
    onTabChange?.(key as TransactionKind);
  };

  const columns = isMobile
    ? COLUMNS_TRANSACTION_LIST_MOBILE
    : COLUMNS_TRANSACTION_LIST_DESKTOP;

  const tabs = [
    {
      key: TRANSACTION_TABLE_TABS.ALL_TRANSACTIONS.KEY,
      title: TRANSACTION_TABLE_TABS.ALL_TRANSACTIONS.TITLE,
      tabContent: (
        <Table
          aria-label="All transactions table"
          variant={isMobile ? 'secondary' : 'primary'}
          columns={columns}
          data={transactions}
          isLoading={isLoading}
        />
      ),
    },
    {
      key: TRANSACTION_TABLE_TABS.INCOME_TRANSACTIONS.KEY,
      title: TRANSACTION_TABLE_TABS.INCOME_TRANSACTIONS.TITLE,
      tabContent: (
        <Table
          aria-label="Income transactions table"
          variant={isMobile ? 'secondary' : 'primary'}
          columns={columns}
          data={transactions}
          isLoading={isLoading}
        />
      ),
    },
    {
      key: TRANSACTION_TABLE_TABS.EXPENSE_TRANSACTIONS.KEY,
      title: TRANSACTION_TABLE_TABS.EXPENSE_TRANSACTIONS.TITLE,
      tabContent: (
        <Table
          aria-label="Expense transactions table"
          variant={isMobile ? 'secondary' : 'primary'}
          columns={columns}
          data={transactions}
          isLoading={isLoading}
        />
      ),
    },
  ];

  return (
    <Box>
      {/* CustomTabs */}
      <CustomTabs
        aria-label="Transaction table tabs"
        tabs={tabs}
        selectedKey={selected}
        onSelectionChange={handleTabChange}
      />

      {/* Pagination */}
      {!isLoading && (
        <Box className="flex w-full justify-end mx-auto">
          <Pagination
            aria-label="Transaction table pagination"
            totalPages={totalPage}
            currentPage={currentPage}
            onPageChange={onPageChange}
          />
        </Box>
      )}
    </Box>
  );
};

export default TransactionTable;
