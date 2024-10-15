// Utils
import { wrapper } from '@app/utils';

// Components
import { ErrorFallback } from '@app/components';

// Stores
import { useAuthStore } from '@app/stores';

jest.mock('@app/stores', () => ({
  ...jest.requireActual('@app/stores'),
  useAuthStore: jest.fn(),
}));

describe('ErrorFallback Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    jest.spyOn(console, 'error').mockImplementation(jest.fn());
    (useAuthStore as unknown as jest.Mock).mockImplementation((selector) =>
      selector({
        isAdmin: false,
      }),
    );
  });

  it('should renders correctly without crashing', () => {
    const { container } = wrapper(<ErrorFallback />);

    expect(container).toMatchSnapshot();
  });

  it('should renders correctly with role admin crashing', () => {
    (useAuthStore as unknown as jest.Mock).mockImplementation((selector) =>
      selector({
        isAdmin: true,
      }),
    );

    const { container } = wrapper(<ErrorFallback />);

    expect(container).toMatchSnapshot();
  });
});
