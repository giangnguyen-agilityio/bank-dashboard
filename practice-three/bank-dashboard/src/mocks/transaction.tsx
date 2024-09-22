import { renderTransactionIcon } from '@app/utils';
import { TransactionItemData, TransactionKind } from '@app/interfaces';
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

export { MOCK_DEFAULT_TRANSACTION_ITEMS, MOCK_TRANSACTION_ITEMS };
