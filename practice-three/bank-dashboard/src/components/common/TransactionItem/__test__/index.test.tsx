import { render, screen } from '@testing-library/react';

import { getTransactionAmountStyles } from '@app/utils';
import { MOCK_TRANSACTION_ITEMS } from '@app/mocks';
import { TransactionKind } from '@app/interfaces';
import { TransactionItem } from '@app/components';

jest.mock('@app/utils', () => ({
  ...jest.requireActual('@app/utils'),
  getTransactionAmountStyles: jest.fn(),
}));

describe('TransactionItem', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should renders the transaction icon', () => {
    (getTransactionAmountStyles as jest.Mock).mockReturnValue({
      className: 'text-red-500',
      symbol: '-',
    });

    render(<TransactionItem {...MOCK_TRANSACTION_ITEMS[0]} />);

    const iconElement = screen.getByLabelText('Wallet Icon');

    expect(iconElement).toBeInTheDocument();
  });

  it('should renders the transaction title and date', () => {
    (getTransactionAmountStyles as jest.Mock).mockReturnValue({
      className: 'text-red-500',
      symbol: '-',
    });

    render(<TransactionItem {...MOCK_TRANSACTION_ITEMS[0]} />);

    const titleElement = screen.getByTestId('transaction-title');
    const dateElement = screen.getByTestId('transaction-date');

    expect(titleElement).toBeInTheDocument();
    expect(titleElement).toHaveTextContent('Deposit from my Card');

    expect(dateElement).toBeInTheDocument();
    expect(dateElement).toHaveTextContent('28 January 2021');
  });

  it('should renders the transaction amount with proper styles and symbol', () => {
    (getTransactionAmountStyles as jest.Mock).mockReturnValue({
      className: 'text-red-500',
      symbol: '-',
    });

    render(<TransactionItem {...MOCK_TRANSACTION_ITEMS[0]} />);

    const amountElement = screen.getByTestId('transaction-amount');

    expect(amountElement).toBeInTheDocument();
    expect(amountElement).toHaveClass('text-red-500');
    expect(amountElement).toHaveTextContent('-$850');
  });

  it('should applies correct styles for different transaction kinds', () => {
    (getTransactionAmountStyles as jest.Mock).mockReturnValueOnce({
      className: 'text-red-500',
      symbol: '-',
    });

    render(<TransactionItem {...MOCK_TRANSACTION_ITEMS[0]} />);

    const amountElement = screen.getByTestId('transaction-amount');

    expect(amountElement).toHaveClass('text-red-500');

    (getTransactionAmountStyles as jest.Mock).mockReturnValueOnce({
      className: 'text-green-500',
      symbol: '+',
    });

    render(
      <TransactionItem
        {...MOCK_TRANSACTION_ITEMS[0]}
        kind={TransactionKind.Income}
      />,
    );

    const newAmountElement = screen.getAllByTestId('transaction-amount')[1];

    expect(newAmountElement).toHaveClass('text-green-500');
    expect(newAmountElement).toHaveTextContent('+$850');
  });
});
