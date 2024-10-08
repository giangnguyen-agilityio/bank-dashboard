import { useLocation } from '@tanstack/react-router';

// Utils
import {
  render,
  wrapper,
  screen,
  fireEvent,
  waitFor,
  getHeadingFromPathname,
  userEvent,
} from '@app/utils';

// Constants
import { DESTINATION } from '@app/constants';

// Stores
import { useAuthStore } from '@app/stores';

// Components
import { Navbar } from '@app/components';

jest.mock('@tanstack/react-router', () => ({
  ...jest.requireActual('@tanstack/react-router'),
  useLocation: jest.fn(),
}));

jest.mock('@app/utils', () => ({
  ...jest.requireActual('@app/utils'),
  getHeadingFromPathname: jest.fn(),
}));

jest.mock('@app/stores', () => ({
  ...jest.requireActual('@app/stores'),
  useAuthStore: jest.fn(),
}));

describe('Navbar Component', () => {
  const mockOnToggleSidebar = jest.fn();
  const clearCredentialsMock = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
    (useLocation as jest.Mock).mockReturnValue(DESTINATION.DASHBOARD);
    (getHeadingFromPathname as jest.Mock).mockReturnValue('Dashboard');
  });

  it('should renders the Navbar component correctly without crashing', () => {
    render(<Navbar onToggleSidebar={mockOnToggleSidebar} />);

    // Check if navbar is rendered
    expect(screen.getByTestId('navbar')).toBeInTheDocument();

    // Check if the heading is rendered
    expect(screen.getByText('Dashboard')).toBeInTheDocument();

    // Check if icons are rendered
    expect(screen.getByLabelText('Menu Icon')).toBeInTheDocument();
    expect(screen.getByLabelText('Setting Icon')).toBeInTheDocument();
    expect(screen.getByLabelText('Notification Icon')).toBeInTheDocument();

    // Check if Avatar is rendered
    expect(screen.getByRole('img')).toBeInTheDocument();
  });

  it('should calls onToggleSidebar when sidebar button is clicked', async () => {
    render(<Navbar onToggleSidebar={mockOnToggleSidebar} />);

    const toggleButton = screen.getByLabelText('Open sidebar');

    fireEvent.click(toggleButton);

    await waitFor(() => {
      expect(mockOnToggleSidebar).toHaveBeenCalledTimes(1);
    });
  });

  it('should renders heading dynamically based on pathname', () => {
    const mockLocation = { pathname: DESTINATION.SETTING };

    (useLocation as jest.Mock).mockImplementation(({ select }) =>
      select(mockLocation),
    );

    (getHeadingFromPathname as jest.Mock).mockReturnValue('Settings');

    render(<Navbar onToggleSidebar={mockOnToggleSidebar} />);

    // Ensure the correct heading is displayed
    expect(screen.getByText('Settings')).toBeInTheDocument();
  });

  it('should perform the logout action correctly', async () => {
    (useAuthStore as unknown as jest.Mock).mockImplementation((selector) =>
      selector({
        clearCredentials: clearCredentialsMock,
      }),
    );

    wrapper(<Navbar onToggleSidebar={mockOnToggleSidebar} />);

    const avatarButton = screen.getByTestId('avatar-wrapper');
    await userEvent.click(avatarButton);

    const logoutButton = screen.getByText('Logout');
    expect(logoutButton).toBeInTheDocument();

    await userEvent.click(logoutButton);

    await waitFor(() => {
      expect(clearCredentialsMock).toHaveBeenCalled();
    });
  });
});
