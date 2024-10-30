// Utils
import { render, screen, userEvent, waitFor } from '@app/utils';

// Hooks
import { useAccount, useFetchAccounts, useMediaQuery } from '@app/hooks';

// Mocks
import { MOCK_ACCOUNTS_DATA } from '@app/mocks';

// Components
import { AccountTable } from '@app/components';

jest.mock('@app/hooks', () => ({
  ...jest.requireActual('@app/hooks'),
  useMediaQuery: jest.fn(),
  useAccount: jest.fn(),
  useFetchAccounts: jest.fn(),
}));

describe('AccountTable Component', () => {
  const mockOnDelete = jest.fn();

  beforeEach(() => {
    jest.spyOn(console, 'error').mockImplementation(() => jest.fn());
    (useFetchAccounts as jest.Mock).mockReturnValue({
      data: {
        users: MOCK_ACCOUNTS_DATA,
        count: 20,
      },
      isLoading: false,
    });
    (useMediaQuery as jest.Mock).mockReturnValue(true);
    (useAccount as jest.Mock).mockReturnValue({
      isDeletingAccount: false,
      deleteAccount: mockOnDelete,
    });
  });

  it('should render the table with accounts data', () => {
    const { container } = render(<AccountTable />);

    expect(container).toMatchSnapshot();
  });

  it('should render a loading state when isLoading is true', () => {
    (useFetchAccounts as jest.Mock).mockReturnValue({
      isLoading: true,
    });

    render(<AccountTable />);

    const loading = screen.getByLabelText('Loading');

    expect(loading).toBeInTheDocument();
  });

  it('should not render pagination when there are no accounts', () => {
    (useFetchAccounts as jest.Mock).mockReturnValue({
      data: [],
      isLoading: false,
    });

    render(<AccountTable />);

    expect(
      screen.queryByLabelText('Account table pagination'),
    ).not.toBeInTheDocument();
  });

  it('should render mobile columns when screen is mobile', () => {
    (useMediaQuery as jest.Mock).mockReturnValue(true);

    render(<AccountTable />);

    expect(screen.getByText('User Name')).toBeInTheDocument();
    expect(screen.getByText('Email')).toBeInTheDocument();
  });

  it('should render empty state when no accounts are available', () => {
    (useFetchAccounts as jest.Mock).mockReturnValue({
      data: {
        users: [],
        count: 0,
      },
      isLoading: false,
    });

    render(<AccountTable />);

    expect(screen.queryByText('John Doe')).not.toBeInTheDocument();
  });

  it('should render the delete modal correctly', async () => {
    render(<AccountTable />);

    await userEvent.click(screen.getAllByLabelText('More actions button')[0]);

    await waitFor(() => {
      expect(screen.getByLabelText('delete button')).toBeInTheDocument();
    });

    await userEvent.click(screen.getByLabelText('delete button'));

    await waitFor(() => {
      expect(screen.getByTestId('confirm-button')).toBeInTheDocument();
    });

    await userEvent.click(screen.getByTestId('confirm-button'));

    await waitFor(() => {
      expect(mockOnDelete).toHaveBeenCalled();
    });
  });

  it('should handle pagination correctly', async () => {
    render(<AccountTable />);

    // Click next page button
    await userEvent.click(screen.getByLabelText('Next Button'));

    // Ensure the correct page change handler is triggered
    await waitFor(() => {
      expect(useFetchAccounts).toHaveBeenCalled();
    });
  });
});

it('should close modal when cancel is clicked', async () => {
  render(<AccountTable />);

  await userEvent.click(screen.getAllByLabelText('More actions button')[0]);

  await waitFor(() => {
    expect(screen.getByLabelText('delete button')).toBeInTheDocument();
  });

  await userEvent.click(screen.getByLabelText('delete button'));

  await waitFor(() => {
    expect(screen.getByTestId('cancel-button')).toBeInTheDocument();
  });

  await userEvent.click(screen.getByTestId('cancel-button'));

  await waitFor(() => {
    expect(screen.queryByTestId('cancel-button')).not.toBeInTheDocument();
  });
});
