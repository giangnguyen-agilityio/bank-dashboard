import { ReactNode } from 'react';
import { useLocation } from '@tanstack/react-router';

// Utils
import { wrapper, screen, userEvent, waitFor, fireEvent } from '@app/utils';

// Constants
import { DESTINATION, SIDEBAR_LIST } from '@app/constants';

// Components
import { Sidebar } from '@app/components';

jest.mock('@tanstack/react-router', () => ({
  ...jest.requireActual('@tanstack/react-router'),
  useLocation: jest.fn(),
}));

describe('Sidebar Component', () => {
  const mockToggleSidebar = jest.fn();
  const defaultProps = {
    isOpen: false,
    items: SIDEBAR_LIST,
    toggleSidebar: mockToggleSidebar,
  };

  beforeEach(() => {
    jest.clearAllMocks();
    jest.spyOn(console, 'error').mockImplementation(jest.fn());
    (useLocation as jest.Mock).mockReturnValue({
      pathname: DESTINATION.DASHBOARD,
    });
  });

  it('should renders the sidebar correctly without crashing', () => {
    const { container } = wrapper(<Sidebar {...defaultProps} />);

    const items = screen.getAllByTestId('sidebar-item');

    expect(container).toMatchSnapshot();
    expect(items).toHaveLength(defaultProps.items.length);
  });

  it('should visible the sidebar when isOpen is true', () => {
    wrapper(<Sidebar {...defaultProps} isOpen={true} />);

    const sidebar = screen.getByTestId('sidebar');

    expect(sidebar).toHaveClass('translate-x-0');
  });

  it('should hide the sidebar when isOpen is false', () => {
    wrapper(<Sidebar {...defaultProps} isOpen={false} />);

    const sidebar = screen.getByTestId('sidebar');

    expect(sidebar).toHaveClass('-translate-x-full');
  });

  it('should toggle sidebar when clicking the close button', async () => {
    wrapper(<Sidebar {...defaultProps} isOpen={true} />);

    const closeButton = screen.getByTestId('close-sidebar-button');

    userEvent.click(closeButton);

    await waitFor(() => expect(mockToggleSidebar).toHaveBeenCalledTimes(1));
  });

  it('should render the default props for Sidebar when props are not provided', () => {
    wrapper(
      <Sidebar
        {...defaultProps}
        isOpen={undefined as unknown as boolean}
        items={
          undefined as unknown as {
            icon: ReactNode;
            label: string;
            link: string;
          }[]
        }
      />,
    );

    const sidebar = screen.getByTestId('sidebar');

    expect(sidebar).toHaveClass('-translate-x-full');
  });

  it('should apply the active class when the location matches the link', () => {
    (useLocation as jest.Mock).mockReturnValue({
      pathname: DESTINATION.DASHBOARD,
    });

    wrapper(<Sidebar {...defaultProps} isOpen={true} />);

    const sidebarItem = screen.getAllByTestId('sidebar-item')[0];

    expect(sidebarItem).toHaveClass('border-blue-200');
  });

  it('should apply inactive class when the location does not match the link', () => {
    (useLocation as jest.Mock).mockReturnValue({ pathname: '/other' });

    wrapper(<Sidebar {...defaultProps} isOpen={true} />);

    const sidebarItem = screen.getAllByTestId('sidebar-item')[0];

    expect(sidebarItem).toHaveClass('border-transparent');
  });

  it('should toggle to close the sidebar when the sidebar item is clicked', () => {
    (useLocation as jest.Mock).mockReturnValue({ pathname: '/' });

    wrapper(<Sidebar {...defaultProps} isOpen={true} />);

    const sidebarItem = screen.getAllByTestId('sidebar-item')[0];

    fireEvent.click(sidebarItem);

    expect(mockToggleSidebar).toHaveBeenCalledTimes(1);
  });
});
