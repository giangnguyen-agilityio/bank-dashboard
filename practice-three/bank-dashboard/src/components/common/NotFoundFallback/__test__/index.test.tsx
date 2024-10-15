// Utils
import { wrapper, screen } from '@app/utils';

// Components
import { NotFoundFallback } from '@app/components';

// Stores
import { useAuthStore } from '@app/stores';

jest.mock('@app/stores', () => ({
  ...jest.requireActual('@app/stores'),
  useAuthStore: jest.fn(),
}));

describe('NotFoundFallback Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    jest.spyOn(console, 'error').mockImplementation(jest.fn());
    (useAuthStore as unknown as jest.Mock).mockImplementation((selector) =>
      selector({
        isAdmin: false,
      }),
    );
  });

  it('should renders correctly with title and message', () => {
    const customTitle = 'The sample title';
    const customMessage = 'The sample message';

    wrapper(<NotFoundFallback title={customTitle} message={customMessage} />);

    const title = screen.getByTestId('title');
    const message = screen.getByTestId('message');

    expect(title).toHaveTextContent(customTitle);
    expect(message).toHaveTextContent(customMessage);
  });

  it('should renders correctly without crashing', () => {
    (useAuthStore as unknown as jest.Mock).mockImplementation((selector) =>
      selector({
        isAdmin: true,
      }),
    );

    const { container } = wrapper(<NotFoundFallback />);

    expect(container).toMatchSnapshot();
  });
});
