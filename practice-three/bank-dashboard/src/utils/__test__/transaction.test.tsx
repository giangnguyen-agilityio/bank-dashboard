import { render } from '@testing-library/react';

import { TransactionKind } from '@app/interfaces';
import { renderTransactionIcon, getTransactionAmountStyles } from '@app/utils';

describe('renderTransactionIcon', () => {
  const MockIconComponent = () => <span>Icon</span>;

  it('should render the IconComponent with the correct background color class', () => {
    const bgColorClass = 'bg-blue-500';
    const { container } = render(
      renderTransactionIcon(MockIconComponent, bgColorClass),
    );

    expect(container.firstChild).toHaveClass(
      'flex justify-center items-center rounded-full size-12.5 md:size-10 lg:size-14',
    );
    expect(container.firstChild).toHaveClass(bgColorClass);
    expect(container.querySelector('span')).toHaveTextContent('Icon');
  });

  it('should render the IconComponent without crashing', () => {
    const bgColorClass = 'bg-red-500';
    const { container } = render(
      renderTransactionIcon(MockIconComponent, bgColorClass),
    );

    expect(container).toBeInTheDocument();
    expect(container.querySelector('span')).toHaveTextContent('Icon');
  });
});

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
