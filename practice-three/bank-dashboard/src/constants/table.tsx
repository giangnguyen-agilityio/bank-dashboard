// The config width for column in table
const WIDTH_COLUMN_CONFIG = {
  SMALL: 80,
  MEDIUM: 130,
  LARGE: 200,
  EXTRA_LARGE: 250,
};

// Default size of table columns
const SIZE_COLUMN_DEFAULT = 120;
const UN_SET_COLUMN_CONFIG = 'unset';

const TRANSACTION_TABLE_TABS = {
  ALL_TRANSACTIONS: {
    KEY: '',
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

export {
  WIDTH_COLUMN_CONFIG,
  SIZE_COLUMN_DEFAULT,
  TRANSACTION_TABLE_TABS,
  UN_SET_COLUMN_CONFIG,
};
