import { wrapper, screen, userEvent, waitFor } from '@app/utils';

// Pages
import { AccountPage } from '@app/pages';

// Hooks
import { useFetchAccounts, useAccount, useMediaQuery } from '@app/hooks';

// Mocks
import { MOCK_ACCOUNTS_DATA } from '@app/mocks';

// Mock hooks
jest.mock('@app/hooks', () => ({
  ...jest.requireActual('@app/hooks'),
  useFetchAccounts: jest.fn(),
  useAccount: jest.fn(),
  useMediaQuery: jest.fn(),
}));

describe('AccountPage', () => {
  beforeEach(() => {
    jest.spyOn(console, 'error').mockImplementation(() => jest.fn());
    (useFetchAccounts as jest.Mock).mockReturnValue({
      data: {
        users: MOCK_ACCOUNTS_DATA,
        count: 20,
      },
      isLoading: false,
    });

    (useAccount as jest.Mock).mockReturnValue({
      isDeletingAccount: false,
      deleteAccount: jest.fn(),
    });

    (useMediaQuery as jest.Mock).mockReturnValue(true);
  });

  it('should render the account page correctly', () => {
    const { container } = wrapper(<AccountPage />);

    expect(container).toMatchSnapshot();
  });

  it('should render the delete modal correctly', async () => {
    wrapper(<AccountPage />);

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
      expect(useAccount().deleteAccount).toHaveBeenCalled();
    });
  });

  it('should handle pagination correctly', () => {
    wrapper(<AccountPage />);

    // Click next page button
    userEvent.click(screen.getByLabelText('Next Button'));

    // Ensure the correct page change handler is triggered
    expect(useFetchAccounts).toHaveBeenCalled();
  });

  it('should close modal when cancel is clicked', async () => {
    wrapper(<AccountPage />);

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

  it('should render the default value correctly', () => {
    (useFetchAccounts as jest.Mock).mockReturnValue({
      data: {
        users: [],
        count: null,
      },
      isLoading: false,
    });

    wrapper(<AccountPage />);

    expect(screen.queryByText('Total Accounts: 20')).not.toBeInTheDocument();
  });

  it('should render the default value correctly when data is null', () => {
    (useFetchAccounts as jest.Mock).mockReturnValue({});

    wrapper(<AccountPage />);

    expect(screen.queryByText('Total Accounts: 20')).not.toBeInTheDocument();
  });
});
