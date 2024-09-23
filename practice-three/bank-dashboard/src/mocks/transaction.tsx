import { renderTransactionIcon } from '@app/utils';
import {
  TransactionData,
  TransactionItemData,
  TransactionKind,
} from '@app/interfaces';
import { MoneyIcon, PaypalIcon, WalletIcon } from '@app/assets';

const MOCK_DEFAULT_TRANSACTION_ITEMS: TransactionItemData = {
  icon: renderTransactionIcon(MoneyIcon, 'bg-green-50'),
  transactionInfo: {
    title: 'N/A',
    date: 'N/A',
  },
  transactionAmount: 0,
  kind: TransactionKind.Income,
};

const MOCK_TRANSACTION_ITEMS: TransactionItemData[] = [
  {
    icon: renderTransactionIcon(WalletIcon, 'bg-white-200'),
    transactionInfo: {
      title: 'Deposit from my Card',
      date: '28 January 2021',
    },
    transactionAmount: 850,
    kind: TransactionKind.Expense,
  },
  {
    icon: renderTransactionIcon(PaypalIcon, 'bg-blue-20'),
    transactionInfo: {
      title: 'Deposit Paypal',
      date: '25 January 2021',
    },
    transactionAmount: 2500,
    kind: TransactionKind.Income,
  },
  {
    icon: renderTransactionIcon(MoneyIcon, 'bg-green-50'),
    transactionInfo: {
      title: 'Jemi Wilson',
      date: '21 January 2021',
    },
    transactionAmount: 5400,
    kind: TransactionKind.Income,
  },
];

const MOCK_TRANSACTION_DATA: TransactionData[] = [
  {
    description: 'Withdrawal',
    transactionId: 'TXN001',
    type: 'Expense',
    category: 'Withdrawal',
    date: '2024-09-23',
    amount: 150,
  },
  {
    description: 'Payment',
    transactionId: 'TXN002',
    type: 'Expense',
    category: 'Payment',
    date: '2024-09-22',
    amount: 300,
  },
  {
    description: 'Debit',
    transactionId: 'TXN003',
    type: 'Expense',
    category: 'Debit',
    date: '2024-09-21',
    amount: 50,
  },
  {
    description: 'Purchase',
    transactionId: 'TXN004',
    type: 'Expense',
    category: 'Purchase',
    date: '2024-09-20',
    amount: 200,
  },
  {
    description: 'Transfer In',
    transactionId: 'TXN005',
    type: 'Expense',
    category: 'Transfer In',
    date: '2024-09-19',
    amount: 500,
  },
  {
    description: 'Deposit',
    transactionId: 'TXN006',
    type: 'Income',
    category: 'Deposit',
    date: '2024-09-18',
    amount: 1000,
  },
  {
    description: 'Wire Transfer',
    transactionId: 'TXN007',
    type: 'Income',
    category: 'Wire Transfer',
    date: '2024-09-17',
    amount: 2000,
  },
  {
    description: 'Transfer Out',
    transactionId: 'TXN008',
    type: 'Income',
    category: 'Transfer Out',
    date: '2024-09-16',
    amount: 500,
  },
  {
    description: 'Card',
    transactionId: 'TXN009',
    type: 'Income',
    category: 'Card',
    date: '2024-09-15',
    amount: 800,
  },
  {
    description: 'Withdrawal',
    transactionId: 'TXN010',
    type: 'Expense',
    category: 'Withdrawal',
    date: '2024-09-14',
    amount: 100,
  },
  {
    description: 'Payment',
    transactionId: 'TXN011',
    type: 'Expense',
    category: 'Payment',
    date: '2024-09-13',
    amount: 250,
  },
  {
    description: 'Debit',
    transactionId: 'TXN012',
    type: 'Expense',
    category: 'Debit',
    date: '2024-09-12',
    amount: 75,
  },
  {
    description: 'Purchase',
    transactionId: 'TXN013',
    type: 'Expense',
    category: 'Purchase',
    date: '2024-09-11',
    amount: 250,
  },
  {
    description: 'Transfer In',
    transactionId: 'TXN014',
    type: 'Expense',
    category: 'Transfer In',
    date: '2024-09-10',
    amount: 300,
  },
  {
    description: 'Deposit',
    transactionId: 'TXN015',
    type: 'Income',
    category: 'Deposit',
    date: '2024-09-09',
    amount: 1500,
  },
  {
    description: 'Wire Transfer',
    transactionId: 'TXN016',
    type: 'Income',
    category: 'Wire Transfer',
    date: '2024-09-08',
    amount: 2500,
  },
  {
    description: 'Transfer Out',
    transactionId: 'TXN017',
    type: 'Income',
    category: 'Transfer Out',
    date: '2024-09-07',
    amount: 600,
  },
  {
    description: 'Card',
    transactionId: 'TXN018',
    type: 'Income',
    category: 'Card',
    date: '2024-09-06',
    amount: 700,
  },
  {
    description: 'Withdrawal',
    transactionId: 'TXN019',
    type: 'Expense',
    category: 'Withdrawal',
    date: '2024-09-05',
    amount: 200,
  },
  {
    description: 'Payment',
    transactionId: 'TXN020',
    type: 'Expense',
    category: 'Payment',
    date: '2024-09-04',
    amount: 350,
  },
];

export {
  MOCK_DEFAULT_TRANSACTION_ITEMS,
  MOCK_TRANSACTION_ITEMS,
  MOCK_TRANSACTION_DATA,
};
