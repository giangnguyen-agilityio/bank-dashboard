import { render, screen, userEvent } from '@app/utils';

// Pages
import { SettingPage } from '@app/pages';

// Hooks
import { useAccount } from '@app/hooks';

// Stores
import { useAuthStore } from '@app/stores';

// Constants
import { SETTING_TABS } from '@app/constants';

// Mocks
import { MOCK_ACCOUNTS_DATA } from '@app/mocks';

jest.mock('@app/hooks', () => ({
  ...jest.requireActual('@app/hooks'),
  useAccount: jest.fn(),
  useMediaQuery: jest.fn(),
}));

jest.mock('@app/stores', () => ({
  ...jest.requireActual('@app/stores'),
  useAuthStore: jest.fn(),
}));

describe('SettingPage', () => {
  const mockEditAccount = jest.fn();
  const mockSetCredentials = jest.fn();

  const mockUseAccount = {
    isUpdatingAccount: false,
    editAccount: mockEditAccount,
  };

  beforeEach(() => {
    jest.clearAllMocks();

    (useAccount as jest.Mock).mockReturnValue(mockUseAccount);
    (useAuthStore as unknown as jest.Mock).mockImplementation((selector) =>
      selector({
        setCredentials: mockSetCredentials,
        data: {
          userInfo: MOCK_ACCOUNTS_DATA[0],
          exp: 'valid-exp',
        },
      }),
    );
  });

  it('should render the SettingPage with tabs', () => {
    const { container } = render(<SettingPage />);

    expect(container).toMatchSnapshot();
  });

  it('should switch tabs when a tab is clicked', async () => {
    render(<SettingPage />);

    expect(screen.getByText('Username')).toBeInTheDocument();

    // Click the "Security" tab
    await userEvent.click(screen.getByText(SETTING_TABS.SECURITY.TITLE));

    // The content of the Security tab should now be visible
    expect(screen.queryByText('Username')).not.toBeInTheDocument();
    expect(screen.getByText('Change Password')).toBeInTheDocument();
  });

  it('should render the default value when the user information is not provided', async () => {
    (useAuthStore as unknown as jest.Mock).mockImplementation((selector) =>
      selector({
        setCredentials: mockSetCredentials,
      }),
    );

    render(<SettingPage />);

    expect(screen.getByText('Username')).toBeInTheDocument();
  });
});
