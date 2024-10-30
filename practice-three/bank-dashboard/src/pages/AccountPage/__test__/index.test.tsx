import { wrapper, screen } from '@app/utils';

// Pages
import { AccountPage } from '@app/pages';

// Hooks
import { useFetchAccounts, useMediaQuery } from '@app/hooks';

// Mocks
import { MOCK_ACCOUNTS_DATA } from '@app/mocks';

// Mock hooks
jest.mock('@app/hooks', () => ({
  ...jest.requireActual('@app/hooks'),
  useFetchAccounts: jest.fn(),
  useMediaQuery: jest.fn(),
}));

describe('AccountPage', () => {
  beforeEach(() => {
    jest.spyOn(console, 'error').mockImplementation(() => jest.fn());
    (useMediaQuery as jest.Mock).mockReturnValue(true);
    (useFetchAccounts as jest.Mock).mockReturnValue({
      data: {
        users: MOCK_ACCOUNTS_DATA,
        count: 20,
      },
      isLoading: false,
    });
  });

  it('should render the account page correctly', () => {
    const { container } = wrapper(<AccountPage />);

    expect(container).toMatchSnapshot();
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
