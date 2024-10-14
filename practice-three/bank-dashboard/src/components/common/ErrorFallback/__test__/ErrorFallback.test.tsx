// Utils
import { wrapper, screen } from '@app/utils';

// Components
import { ErrorFallback } from '@app/components';

describe('ErrorFallback Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    jest.spyOn(console, 'error').mockImplementation(jest.fn());
  });

  it('should renders correctly without crashing', () => {
    wrapper(<ErrorFallback />);

    expect(screen.getByText(/Oops! Something went wrong/i)).toBeInTheDocument();
    expect(
      screen.getByText(/An error occurred. For more help/i),
    ).toBeInTheDocument();
  });
});
