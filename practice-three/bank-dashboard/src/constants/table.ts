import { TransactionData } from '@app/interfaces';
import { TableColumnType } from '@app/types';

// The config width for column in table
const WIDTH_COLUMN_CONFIG = {
  SMALL: 80,
  MEDIUM: 100,
  LARGE: 150,
};

// Default size of table columns
const SIZE_COLUMN_DEFAULT = 120;

const TRANSACTION_TABLE_TABS = {
  ALL_TRANSACTIONS: {
    KEY: 'all-transactions',
    TITLE: 'All Transactions',
  },
  EXPENSE_TRANSACTIONS: {
    KEY: 'expense',
    TITLE: 'Expense',
  },
  INCOME_TRANSACTIONS: {
    KEY: 'income',
    TITLE: 'Income',
  },
};

const COLUMNS_TRANSACTION_LIST: TableColumnType<TransactionData>[] = [
  { header: 'Description', accessor: 'description' },
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
    accessor: 'cardNumber',
  },
  {
    header: 'Date',
    accessor: 'date',
  },
  {
    header: 'Amount',
    accessor: 'amount',
  },
];

export {
  WIDTH_COLUMN_CONFIG,
  SIZE_COLUMN_DEFAULT,
  TRANSACTION_TABLE_TABS,
  COLUMNS_TRANSACTION_LIST,
};
