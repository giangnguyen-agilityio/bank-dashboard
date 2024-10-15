import { useLocation } from '@tanstack/react-router';

// Constants
import { DESTINATION } from '@app/constants';

// Utils
import { screen, fireEvent, wrapper } from '@app/utils';

// Components
import { SidebarItem } from '@app/components';

jest.mock('@tanstack/react-router', () => ({
  ...jest.requireActual('@tanstack/react-router'),
  useLocation: jest.fn(),
}));

describe('SidebarItem Component', () => {
  const mockOnToggleSidebar = jest.fn();
  const mockIcon = <svg data-testid="sidebar-icon" />;
  const defaultProps = {
    icon: mockIcon,
    label: 'Dashboard',
    link: DESTINATION.DASHBOARD,
    onToggleSidebar: mockOnToggleSidebar,
  };

  beforeEach(() => {
    jest.clearAllMocks();
    jest.spyOn(console, 'error').mockImplementation(jest.fn());
  });

  it('should render the sidebar item correctly without crashing', () => {
    (useLocation as jest.Mock).mockReturnValue({ pathname: '/' });

    const { container } = wrapper(<SidebarItem {...defaultProps} />);

    expect(container).toMatchSnapshot();
  });

  it('should apply the active class when the location matches the link', () => {
    (useLocation as jest.Mock).mockReturnValue({
      pathname: DESTINATION.DASHBOARD,
    });

    wrapper(<SidebarItem {...defaultProps} />);

    const sidebarItem = screen.getByTestId('sidebar-item');

    expect(sidebarItem).toHaveClass('border-blue-200');
  });

  it('should apply inactive class when the location does not match the link', () => {
    (useLocation as jest.Mock).mockReturnValue({ pathname: '/other' });

    wrapper(<SidebarItem {...defaultProps} />);

    const sidebarItem = screen.getByTestId('sidebar-item');

    expect(sidebarItem).toHaveClass('border-transparent');
  });

  it('should toggle to close the sidebar when the sidebar item is clicked', () => {
    (useLocation as jest.Mock).mockReturnValue({ pathname: '/' });

    wrapper(<SidebarItem {...defaultProps} />);

    const sidebarItem = screen.getByTestId('sidebar-item');

    fireEvent.click(sidebarItem);

    expect(mockOnToggleSidebar).toHaveBeenCalledTimes(1);
  });
});
