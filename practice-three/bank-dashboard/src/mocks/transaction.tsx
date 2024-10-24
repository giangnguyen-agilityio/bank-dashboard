import {
  TransactionData,
  TransactionItemData,
  TransactionKind,
} from '@app/interfaces';
import { MoneyIcon, PaypalIcon, WalletIcon } from '@app/assets';

const MOCK_DEFAULT_TRANSACTION_ITEMS: TransactionItemData = {
  transactionIcon: {
    icon: MoneyIcon,
    backgroundColor: 'bg-green-50',
  },
  transactionInfo: {
    title: 'N/A',
    date: 'N/A',
  },
  transactionAmount: 0,
  kind: TransactionKind.Income,
};

const MOCK_TRANSACTION_ITEMS: TransactionItemData[] = [
  {
    transactionIcon: {
      icon: WalletIcon,
      backgroundColor: 'bg-white-200',
    },
    transactionInfo: {
      title: 'Deposit from my Card',
      date: '28 January 2021',
    },
    transactionAmount: 850,
    kind: TransactionKind.Expense,
  },
  {
    transactionIcon: {
      icon: PaypalIcon,
      backgroundColor: 'bg-blue-20',
    },
    transactionInfo: {
      title: 'Deposit Paypal',
      date: '25 January 2021',
    },
    transactionAmount: 2500,
    kind: TransactionKind.Income,
  },
  {
    transactionIcon: {
      icon: MoneyIcon,
      backgroundColor: 'bg-green-50',
    },
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
    id: 'TXN001',
    type: 'Expense',
    category: 'Withdrawal',
    date: '2024-09-23',
    amount: 150,
    cardNumber: '5849210731624890',
  },
  {
    description: 'Payment',
    id: 'TXN002',
    type: 'Expense',
    category: 'Payment',
    date: '2024-09-22',
    amount: 300,
    cardNumber: '9302458674019285',
  },
  {
    description: 'Debit',
    id: 'TXN003',
    type: 'Expense',
    category: 'Debit',
    date: '2024-09-21',
    amount: 50,
    cardNumber: '8174592306841527',
  },
  {
    description: 'Purchase',
    id: 'TXN004',
    type: 'Expense',
    category: 'Purchase',
    date: '2024-09-20',
    amount: 200,
    cardNumber: '3745902186437509',
  },
  {
    description: 'Transfer In',
    id: 'TXN005',
    type: 'Expense',
    category: 'Transfer In',
    date: '2024-09-19',
    amount: 500,
    cardNumber: '5609382741058632',
  },
  {
    description: 'Deposit',
    id: 'TXN006',
    type: 'Income',
    category: 'Deposit',
    date: '2024-09-18',
    amount: 1000,
    cardNumber: '9283746152098476',
  },
  {
    description: 'Wire Transfer',
    id: 'TXN007',
    type: 'Income',
    category: 'Wire Transfer',
    date: '2024-09-17',
    amount: 2000,
    cardNumber: '1057483926502184',
  },
  {
    description: 'Transfer Out',
    id: 'TXN008',
    type: 'Income',
    category: 'Transfer Out',
    date: '2024-09-16',
    amount: 500,
    cardNumber: '7629841035274689',
  },
  {
    description: 'Card',
    id: 'TXN009',
    type: 'Income',
    category: 'Card',
    date: '2024-09-15',
    amount: 800,
    cardNumber: '4398725610843967',
  },
  {
    description: 'Withdrawal',
    id: 'TXN010',
    type: 'Expense',
    category: 'Withdrawal',
    date: '2024-09-14',
    amount: 100,
    cardNumber: '8412650397241586',
  },
  {
    description: 'Payment',
    id: 'TXN011',
    type: 'Expense',
    category: 'Payment',
    date: '2024-09-13',
    amount: 250,
    cardNumber: '5849210731624890',
  },
  {
    description: 'Debit',
    id: 'TXN012',
    type: 'Expense',
    category: 'Debit',
    date: '2024-09-12',
    amount: 75,
    cardNumber: '9302458674019285',
  },
  {
    description: 'Purchase',
    id: 'TXN013',
    type: 'Expense',
    category: 'Purchase',
    date: '2024-09-11',
    amount: 250,
    cardNumber: '8174592306841527',
  },
  {
    description: 'Transfer In',
    id: 'TXN014',
    type: 'Expense',
    category: 'Transfer In',
    date: '2024-09-10',
    amount: 300,
    cardNumber: '3745902186437509',
  },
  {
    description: 'Deposit',
    id: 'TXN015',
    type: 'Income',
    category: 'Deposit',
    date: '2024-09-09',
    amount: 1500,
    cardNumber: '5609382741058632',
  },
  {
    description: 'Wire Transfer',
    id: 'TXN016',
    type: 'Income',
    category: 'Wire Transfer',
    date: '2024-09-08',
    amount: 2500,
    cardNumber: '9283746152098476',
  },
  {
    description: 'Transfer Out',
    id: 'TXN017',
    type: 'Income',
    category: 'Transfer Out',
    date: '2024-09-07',
    amount: 600,
    cardNumber: '1057483926502184',
  },
  {
    description: 'Card',
    id: 'TXN018',
    type: 'Income',
    category: 'Card',
    date: '2024-09-06',
    amount: 700,
    cardNumber: '7629841035274689',
  },
  {
    description: 'Withdrawal',
    id: 'TXN019',
    type: 'Expense',
    category: 'Withdrawal',
    date: '2024-09-05',
    amount: 200,
    cardNumber: '4398725610843967',
  },
  {
    description: 'Payment',
    id: 'TXN020',
    type: 'Expense',
    category: 'Payment',
    date: '2024-09-04',
    amount: 350,
    cardNumber: '8412650397241586',
  },
];

const MOCK_TRANSACTION_RESPONSE = {
  transactions: [
    {
      description: 'Withdrawal',
      id: 'TXN001',
      type: 'Expense',
      category: 'Withdrawal',
      date: '2024-09-23',
      amount: 150,
      cardNumber: '5849210731624890',
    },
    {
      description: 'Payment',
      id: 'TXN002',
      type: 'Expense',
      category: 'Payment',
      date: '2024-09-22',
      amount: 300,
      cardNumber: '9302458674019285',
    },
    {
      description: 'Debit',
      id: 'TXN003',
      type: 'Expense',
      category: 'Debit',
      date: '2024-09-21',
      amount: 50,
      cardNumber: '8174592306841527',
    },
  ],
  count: 3,
};

export {
  MOCK_DEFAULT_TRANSACTION_ITEMS,
  MOCK_TRANSACTION_ITEMS,
  MOCK_TRANSACTION_DATA,
  MOCK_TRANSACTION_RESPONSE,
};
