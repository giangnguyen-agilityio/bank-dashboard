// Utils
import { render, screen, waitFor, userEvent } from '@app/utils';

// Hooks
import { useFetchTransactions, useMediaQuery } from '@app/hooks';

// Pages
import { TransactionPage } from '@app/pages';

// Mocks
import { MOCK_TRANSACTION_DATA } from '@app/mocks';

jest.mock('@app/hooks', () => ({
  ...jest.requireActual('@app/hooks'),
  useFetchTransactions: jest.fn(),
  useMediaQuery: jest.fn(),
}));

describe('TransactionPage', () => {
  beforeEach(() => {
    (useFetchTransactions as jest.Mock).mockReturnValue({
      data: {
        transactions: MOCK_TRANSACTION_DATA,
        count: 20,
      },
      isLoading: false,
    });

    (useMediaQuery as jest.Mock).mockReturnValue(true);
  });

  it('should render the transaction table with transactions', () => {
    const { container } = render(<TransactionPage />);

    // Verify transactions are rendered
    expect(container).toMatchSnapshot();
  });

  it('should show "No records found" if there are no transactions', () => {
    (useFetchTransactions as jest.Mock).mockReturnValue({
      data: {
        transactions: [],
        count: 0,
      },
      isLoading: false,
    });

    render(<TransactionPage />);

    expect(screen.getByText('No records found')).toBeInTheDocument();
  });

  it('should handle tab change', async () => {
    render(<TransactionPage />);

    // Simulate tab change
    userEvent.click(screen.getByText('Expense'));

    // Wait for the mock fetch to be triggered
    await waitFor(() => {
      expect(useFetchTransactions).toHaveBeenLastCalledWith('expense', 1, 10);
    });
  });

  it('should handle pagination correctly', async () => {
    render(<TransactionPage />);

    // Click to go to the next page
    userEvent.click(screen.getByTestId('next-button'));

    // Wait for the mock fetch to be triggered with the new page
    await waitFor(() => {
      expect(useFetchTransactions).toHaveBeenCalled();
    });
  });

  it('should show loading state while fetching transactions', () => {
    (useFetchTransactions as jest.Mock).mockReturnValue({
      isLoading: true,
    });

    render(<TransactionPage />);

    // Verify loading state is shown
    expect(screen.getByLabelText('Loading')).toBeInTheDocument();
  });
});
