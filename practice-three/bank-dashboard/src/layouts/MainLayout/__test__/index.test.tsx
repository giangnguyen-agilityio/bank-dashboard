// Utils
import { screen, wrapper, userEvent, waitFor } from '@app/utils';

// Layouts
import { MainLayout } from '@app/layouts';

describe('MainLayout Component', () => {
  const mockChildren = <div data-testid="main-content">Main Content</div>;

  beforeEach(() => {
    jest.clearAllMocks();
    jest.spyOn(console, 'error').mockImplementation(jest.fn());
  });

  it('should render the layout correctly without crashing', () => {
    wrapper(<MainLayout>{mockChildren}</MainLayout>);

    expect(screen.getByTestId('navbar')).toBeInTheDocument();
    expect(screen.getByTestId('sidebar')).toBeInTheDocument();
    expect(screen.getByTestId('main-content')).toBeInTheDocument();
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
});
