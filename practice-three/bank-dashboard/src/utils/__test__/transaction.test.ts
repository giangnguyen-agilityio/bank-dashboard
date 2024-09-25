import { TransactionKind } from '@app/interfaces';
import { getTransactionAmountStyles } from '@app/utils';

describe('getTransactionAmountStyles', () => {
  it('should return the correct styles for an expense transaction', () => {
    const result = getTransactionAmountStyles(TransactionKind.Expense);

    expect(result).toEqual({
      className: 'text-text-error',
      symbol: '-',
    });
  });

  it('should return the correct styles for an income transaction', () => {
    const result = getTransactionAmountStyles(TransactionKind.Income);

    expect(result).toEqual({
      className: 'text-text-success',
      symbol: '+',
    });
  });

  it('should return default styles for an unknown transaction kind', () => {
    const result = getTransactionAmountStyles(
      'other' as unknown as TransactionKind,
    );

    expect(result).toEqual({
      className: '',
      symbol: '',
    });
  });
});
