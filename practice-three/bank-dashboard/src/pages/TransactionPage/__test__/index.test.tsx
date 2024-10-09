// Utils
import { render, screen, fireEvent, waitFor } from '@app/utils';

// Hooks
import { useFetchTransactions } from '@app/hooks';

// Pages
import { TransactionPage } from '@app/pages';

// Interfaces
import { TransactionData, TransactionKind } from '@app/interfaces';

jest.mock('@app/hooks', () => ({
  ...jest.requireActual('@app/hooks'),
  useFetchTransactions: jest.fn(),
}));

jest.mock('@app/components', () => ({
  Box: ({ children }: { children: React.ReactNode }) => <div>{children}</div>,
  Text: ({ children }: { children: React.ReactNode }) => <h1>{children}</h1>,
  Button: ({ children }: { children: React.ReactNode }) => (
    <button>{children}</button>
  ),
  CreditCard: () => <div>Credit card</div>,
  Skeleton: () => <div>Loading chart...</div>,
  TransactionTable: ({
    transactions,
    currentPage,
    onPageChange,
    onTabChange,
    isLoading,
  }: {
    transactions: TransactionData[];
    totalTransactions: number;
    currentPage: number;
    onPageChange: (page: number) => void;
    onTabChange: (tab: TransactionKind) => void;
    isLoading: boolean;
  }) => (
    <div>
      {isLoading ? (
        <div>Loading transactions...</div>
      ) : (
        <div>
          {transactions.length > 0 ? (
            transactions.map((transaction) => (
              <div key={transaction.id}>Transaction {transaction.id}</div>
            ))
          ) : (
            <div>No transactions found</div>
          )}
        </div>
      )}
      <button
        aria-label="next-page"
        onClick={() => onPageChange(currentPage + 1)}
      >
        Next
      </button>
      <button
        aria-label="tab-change"
        onClick={() => onTabChange(TransactionKind.Expense)}
      >
        Change Tab
      </button>
    </div>
  ),
}));

describe('TransactionPage', () => {
  beforeEach(() => {
    (useFetchTransactions as jest.Mock).mockReturnValue({
      data: {
        transactions: [
          { id: '1', amount: 100 },
          { id: '2', amount: 200 },
        ],
        count: 2,
      },
      isLoading: false,
    });
  });

  it('should render the transaction table with transactions', () => {
    render(<TransactionPage />);

    // Verify transactions are rendered
    expect(screen.getByText('Transaction 1')).toBeInTheDocument();
    expect(screen.getByText('Transaction 2')).toBeInTheDocument();
  });

  it('should show "No transactions found" if there are no transactions', () => {
    (useFetchTransactions as jest.Mock).mockReturnValue({
      data: {
        transactions: [],
        count: 0,
      },
      isLoading: false,
    });

    render(<TransactionPage />);

    // Verify "No transactions found" message is shown
    expect(screen.getByText('No transactions found')).toBeInTheDocument();
  });

  it('should handle tab change', async () => {
    render(<TransactionPage />);

    // Simulate tab change
    fireEvent.click(screen.getByLabelText('tab-change'));

    // Wait for the mock fetch to be triggered
    await waitFor(() => {
      expect(useFetchTransactions).toHaveBeenCalledWith(
        TransactionKind.Expense,
        1,
        expect.any(Number),
      );
    });
  });

  it('should handle pagination correctly', async () => {
    render(<TransactionPage />);

    // Click to go to the next page
    fireEvent.click(screen.getByLabelText('next-page'));

    // Wait for the mock fetch to be triggered with the new page
    await waitFor(() => {
      expect(useFetchTransactions).toHaveBeenCalledWith(
        undefined,
        2,
        expect.any(Number),
      );
    });
  });

  it('should show loading state while fetching transactions', () => {
    (useFetchTransactions as jest.Mock).mockReturnValue({
      isLoading: true,
    });

    render(<TransactionPage />);

    // Verify loading state is shown
    expect(screen.getByText('Loading transactions...')).toBeInTheDocument();
  });
});
