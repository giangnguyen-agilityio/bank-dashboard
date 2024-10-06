// Utils
import { wrapper, screen } from '@app/utils';

// Components
import { ErrorFallback } from '@app/components';

describe('ErrorFallback Component', () => {
  it('should renders correctly with error message', () => {
    const customMessage = 'Network Error';

    wrapper(<ErrorFallback message={customMessage} />);

    const errorMessage = screen.getByTestId('error-message');

    expect(errorMessage).toBeInTheDocument();
    expect(errorMessage).toHaveTextContent(customMessage);
  });

  it('should renders correctly without crashing', () => {
    wrapper(<ErrorFallback />);

    expect(screen.getByText(/Oops! Something went wrong/i)).toBeInTheDocument();
    expect(
      screen.getByText(/An error occurred. For more help/i),
    ).toBeInTheDocument();
  });
});
