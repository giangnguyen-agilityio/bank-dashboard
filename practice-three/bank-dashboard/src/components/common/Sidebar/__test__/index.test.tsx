import { ReactNode } from 'react';

// Utils
import { wrapper, screen, userEvent, waitFor } from '@app/utils';

// Constants
import { SIDEBAR_LIST } from '@app/constants';

// Components
import { Sidebar } from '@app/components';

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
});
