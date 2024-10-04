import { useLocation } from '@tanstack/react-router';

// Utils
import {
  render,
  screen,
  fireEvent,
  waitFor,
  getHeadingFromPathname,
} from '@app/utils';

// Constants
import { DESTINATION } from '@app/constants';

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

describe('Navbar component', () => {
  const mockOnToggleSidebar = jest.fn();

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
});
