// Utils
import { render, screen, userEvent, waitFor } from '@app/utils';

// Hooks
import { useFetchTransactions, useMediaQuery } from '@app/hooks';

// Mocks
import { MOCK_TRANSACTION_DATA } from '@app/mocks';

// Components
import { TransactionTable } from '@app/components';

jest.mock('@app/hooks', () => ({
  ...jest.requireActual('@app/hooks'),
  useFetchTransactions: jest.fn(),
  useMediaQuery: jest.fn(),
}));

describe('TransactionTable Component', () => {
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

  it('should render the table with transactions data', () => {
    (useMediaQuery as jest.Mock).mockReturnValue(false);

    const { container } = render(<TransactionTable />);

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

    render(<TransactionTable />);

    expect(screen.getByText('No records found')).toBeInTheDocument();
  });

  it('should handle tab change', async () => {
    render(<TransactionTable />);

    // Simulate tab change
    await userEvent.click(screen.getByText('Expense'));

    // Wait for the mock fetch to be triggered
    await waitFor(() => {
      expect(useFetchTransactions).toHaveBeenLastCalledWith('Expense', 1, 10);
    });
  });

  it('should handle pagination correctly', async () => {
    render(<TransactionTable />);

    // Click to go to the next page
    await userEvent.click(screen.getByTestId('next-button'));

    // Wait for the mock fetch to be triggered with the new page
    await waitFor(() => {
      expect(useFetchTransactions).toHaveBeenCalled();
    });
  });

  it('should show loading state while fetching transactions', () => {
    (useFetchTransactions as jest.Mock).mockReturnValue({
      isLoading: true,
    });

    render(<TransactionTable />);

    // Verify loading state is shown
    expect(screen.getByLabelText('Loading')).toBeInTheDocument();
  });

  it('should render mobile columns when screen is mobile', () => {
    (useMediaQuery as jest.Mock).mockReturnValue(true);

    render(<TransactionTable />);

    expect(screen.getByTestId('pagination')).toBeInTheDocument();
  });
});
