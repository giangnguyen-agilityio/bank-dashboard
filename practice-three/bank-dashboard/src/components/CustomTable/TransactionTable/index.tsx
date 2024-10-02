import { useState } from 'react';

// Constants
import {
  COLUMNS_TRANSACTION_LIST,
  TRANSACTION_TABLE_TABS,
} from '@app/constants';

// Interfaces
import { TransactionData } from '@app/interfaces';

// Components
import { Box, CustomTabs, Pagination, Table } from '@app/components';

// Define the types for the props
interface TransactionTableProps {
  totalTransactions?: number;
  totalIncomeTransactions?: number;
  totalExpenseTransactions?: number;
  transactions?: TransactionData[];
  incomeTransactions?: TransactionData[];
  expenseTransactions?: TransactionData[];
}

const TransactionTable = ({
  totalTransactions = 0,
  totalIncomeTransactions = 0,
  totalExpenseTransactions = 0,
  transactions = [],
  incomeTransactions = [],
  expenseTransactions = [],
}: TransactionTableProps) => {
  const [selected, setSelected] = useState<string | number>(
    TRANSACTION_TABLE_TABS.ALL_TRANSACTIONS.KEY,
  );

  const createTableData = (
    key: string,
    title: string,
    data: TransactionData[],
    totalPages: number,
  ) => ({
    key,
    title,
    tabContent: (
      <Box className="flex flex-col gap-3.75 lg:gap-5">
        <Table columns={COLUMNS_TRANSACTION_LIST} data={data} />

        <Box className="flex w-full justify-end mx-auto">
          <Pagination totalPages={totalPages} />
        </Box>
      </Box>
    ),
  });

  const tableData = [
    createTableData(
      TRANSACTION_TABLE_TABS.ALL_TRANSACTIONS.KEY,
      TRANSACTION_TABLE_TABS.ALL_TRANSACTIONS.TITLE,
      transactions,
      totalTransactions,
    ),
    createTableData(
      TRANSACTION_TABLE_TABS.INCOME_TRANSACTIONS.KEY,
      TRANSACTION_TABLE_TABS.INCOME_TRANSACTIONS.TITLE,
      incomeTransactions,
      totalIncomeTransactions,
    ),
    createTableData(
      TRANSACTION_TABLE_TABS.EXPENSE_TRANSACTIONS.KEY,
      TRANSACTION_TABLE_TABS.EXPENSE_TRANSACTIONS.TITLE,
      expenseTransactions,
      totalExpenseTransactions,
    ),
  ];

  return (
    <>
      {/* Transaction Table */}
      <CustomTabs
        tabs={tableData}
        selectedKey={selected}
        onSelectionChange={setSelected}
      />
    </>
  );
};

export default TransactionTable;
