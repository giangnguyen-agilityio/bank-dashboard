import { ElementType } from 'react';

// Utils
import { getTransactionAmountStyles, render, screen } from '@app/utils';

// Mocks
import {
  MOCK_DEFAULT_TRANSACTION_ITEMS,
  MOCK_TRANSACTION_ITEMS,
} from '@app/mocks';

// Interfaces
import { TransactionKind } from '@app/interfaces';

// Components
import { TransactionItem } from '@app/components';

jest.mock('@app/utils', () => ({
  ...jest.requireActual('@app/utils'),
  getTransactionAmountStyles: jest.fn(),
}));

describe('TransactionItem Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should renders the TransactionItem component without crashing', () => {
    (getTransactionAmountStyles as jest.Mock).mockReturnValue({
      className: 'text-red-500',
      symbol: '-',
    });

    const { container } = render(
      <TransactionItem {...MOCK_TRANSACTION_ITEMS[0]} />,
    );

    expect(container).toMatchSnapshot();
  });

  it('should use default icon and background color when transactionIcon is not provided', () => {
    render(
      <TransactionItem
        {...MOCK_TRANSACTION_ITEMS[0]}
        transactionIcon={
          undefined as unknown as {
            icon: ElementType;
            backgroundColor: string;
          }
        }
      />,
    );

    const iconElement = screen.getByTestId('icon-wrapper');

    // Check fallback to MOCK_DEFAULT_TRANSACTION_ITEMS values
    expect(iconElement.firstChild).toHaveAttribute('aria-label', 'Money Icon');
    expect(iconElement).toHaveClass(
      MOCK_DEFAULT_TRANSACTION_ITEMS.transactionIcon.backgroundColor,
    );
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
