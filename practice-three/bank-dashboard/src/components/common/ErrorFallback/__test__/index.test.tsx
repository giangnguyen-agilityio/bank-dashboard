// Utils
import { wrapper } from '@app/utils';

// Components
import { ErrorFallback } from '@app/components';

describe('ErrorFallback Component', () => {
  const mockError = new Error('This is a mock error');

  beforeEach(() => {
    jest.spyOn(console, 'error').mockImplementation(jest.fn());
  });
  it('should renders the error message when error prop is provided', () => {
    const { container } = wrapper(<ErrorFallback error={mockError} />);

    expect(container).toMatchSnapshot();
  });

  it('should renders correctly without crashing', () => {
    const { container } = wrapper(<ErrorFallback />);

    expect(container).toMatchSnapshot();
  });
});
