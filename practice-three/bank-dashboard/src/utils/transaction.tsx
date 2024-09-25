import { TransactionKind } from '@app/interfaces';

/**
 * Given a transaction kind, returns an object containing a tailwind class for the transaction amount text color and a symbol to be prepended to the amount.
 * @param kind - The transaction kind. Can be 'expense', 'income', or any other string.
 * @returns An object with two properties: `className` and `symbol`. `className` is a tailwind class for the transaction amount text color. `symbol` is a string to be prepended to the amount.
 */
const getTransactionAmountStyles = (kind: TransactionKind) => {
  const transactionKind = {
    [kind]: {
      className: '',
      symbol: '',
    },
    [TransactionKind.Expense]: {
      className: 'text-text-error',
      symbol: '-',
    },
    [TransactionKind.Income]: {
      className: 'text-text-success',
      symbol: '+',
    },
  };

  return transactionKind[kind];
};

export { getTransactionAmountStyles };
