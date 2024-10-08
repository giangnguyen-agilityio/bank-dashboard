// Utils
import { render, screen, userEvent, waitFor } from '@app/utils';

// Hooks
import { useMediaQuery } from '@app/hooks';

// Mocks
import { MOCK_TRANSACTION_DATA } from '@app/mocks';

// Components
import { TransactionTable } from '@app/components';

jest.mock('@app/hooks', () => ({
  ...jest.requireActual('@app/hooks'),
  useMediaQuery: jest.fn(),
}));

describe('TransactionTable Component', () => {
  it('should render the table with transactions data', () => {
    (useMediaQuery as jest.Mock).mockReturnValue(false);

    render(
      <TransactionTable
        currentPage={1}
        transactions={MOCK_TRANSACTION_DATA}
        totalTransactions={MOCK_TRANSACTION_DATA.length}
        isLoading={false}
      />,
    );

    expect(screen.getByTestId('pagination')).toBeInTheDocument();
  });

  it('should render a loading state when isLoading is true', () => {
    render(
      <TransactionTable
        currentPage={1}
        transactions={undefined}
        totalTransactions={undefined}
        isLoading={true}
      />,
    );

    const loading = screen.getByLabelText('Loading');

    expect(loading).toBeInTheDocument();
  });

  it('should render mobile columns when screen is mobile', () => {
    (useMediaQuery as jest.Mock).mockReturnValue(true);

    render(
      <TransactionTable
        currentPage={1}
        transactions={MOCK_TRANSACTION_DATA}
        totalTransactions={MOCK_TRANSACTION_DATA.length}
        isLoading={false}
      />,
    );

    expect(screen.getByTestId('pagination')).toBeInTheDocument();
  });

  it('should switch tabs when a different tab is selected', async () => {
    const mockOnTabChange = jest.fn();
    render(
      <TransactionTable
        currentPage={1}
        transactions={MOCK_TRANSACTION_DATA}
        totalTransactions={MOCK_TRANSACTION_DATA.length}
        isLoading={false}
        onTabChange={mockOnTabChange}
      />,
    );

    await userEvent.click(screen.getAllByTestId('custom-tab-item')[0]);

    await waitFor(() => {
      expect(mockOnTabChange).toHaveBeenCalled();
    });
  });
});
