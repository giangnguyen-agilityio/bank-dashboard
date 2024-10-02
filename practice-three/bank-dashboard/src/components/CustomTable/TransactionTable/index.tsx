import { useState } from 'react';

// Constants
import {
  COLUMNS_TRANSACTION_LIST,
  LIMIT_PER_PAGE,
  TRANSACTION_TABLE_TABS,
} from '@app/constants';

// Interfaces
import { TransactionData, TransactionKind } from '@app/interfaces';

// Components
import { Box, Pagination, Table, CustomTabs } from '@app/components';

interface TransactionTableProps {
  currentPage: number;
  totalTransactions?: number;
  transactions?: TransactionData[];
  isLoading?: boolean;
  onTabChange?: (tab: TransactionKind) => void;
  onPageChange?: (page: number) => void;
}

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

  const totalPage = Math.ceil(totalTransactions / LIMIT_PER_PAGE);

  const handleTabChange = (key: string | number) => {
    setSelected(key);
    onTabChange?.(key as TransactionKind);
  };

  const tabs = [
    {
      key: TRANSACTION_TABLE_TABS.ALL_TRANSACTIONS.KEY,
      title: TRANSACTION_TABLE_TABS.ALL_TRANSACTIONS.TITLE,
      tabContent: (
        <Table
          columns={COLUMNS_TRANSACTION_LIST}
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
          columns={COLUMNS_TRANSACTION_LIST}
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
          columns={COLUMNS_TRANSACTION_LIST}
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
        tabs={tabs}
        selectedKey={selected}
        onSelectionChange={handleTabChange}
      />

      {/* Pagination */}
      <Box className="flex w-full justify-end mx-auto">
        <Pagination
          totalPages={totalPage}
          currentPage={currentPage}
          onPageChange={onPageChange}
        />
      </Box>
    </Box>
  );
};

export default TransactionTable;
