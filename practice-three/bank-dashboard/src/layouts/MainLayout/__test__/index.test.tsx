// Utils
import { screen, wrapper, userEvent, waitFor } from '@app/utils';

// Layouts
import { MainLayout } from '@app/layouts';

// Stores
import { useAuthStore } from '@app/stores';

jest.mock('@app/stores', () => ({
  ...jest.requireActual('@app/stores'),
  useAuthStore: jest.fn(),
}));

describe('MainLayout Component', () => {
  const mockChildren = <div data-testid="main-content">Main Content</div>;

  beforeEach(() => {
    jest.clearAllMocks();
    (useAuthStore as unknown as jest.Mock).mockImplementation((selector) =>
      selector({
        isAuthenticated: true,
        isAdmin: false,
        checkAuthStatus: jest.fn(),
      }),
    );
    jest.spyOn(console, 'error').mockImplementation(jest.fn());
  });

  it('should render the layout correctly without crashing', () => {
    const { container } = wrapper(<MainLayout>{mockChildren}</MainLayout>);

    expect(container).toMatchSnapshot();
  });

  it('should toggle sidebar when clicking the navbar toggle button', async () => {
    wrapper(<MainLayout>{mockChildren}</MainLayout>);

    const toggleButton = screen.getByLabelText('Open sidebar');
    const sidebar = screen.queryByTestId('sidebar');

    await userEvent.click(toggleButton);

    await waitFor(() => {
      expect(sidebar).toBeInTheDocument();
    });
  });

  it('should toggle sidebar when clicking the navbar toggle button', async () => {
    (useAuthStore as unknown as jest.Mock).mockImplementation((selector) =>
      selector({
        isAdmin: true,
        checkAuthStatus: jest.fn(),
      }),
    );

    wrapper(<MainLayout>{mockChildren}</MainLayout>);

    const toggleButton = screen.getByLabelText('Open sidebar');
    const sidebar = screen.queryByTestId('sidebar');

    await userEvent.click(toggleButton);

    await waitFor(() => {
      expect(sidebar).toBeInTheDocument();
    });
  });
});
