// Utils
import { render, screen } from '@app/utils';

// HOCs
import ErrorBoundary from '@app/hocs';

// Mock the ErrorFallback component
jest.mock('@app/components', () => ({
  ErrorFallback: ({ error }: { error?: Error }) => (
    <div>
      <h1>Something went wrong!</h1>
      {error && <pre>{error.message}</pre>}
    </div>
  ),
}));

describe('ErrorBoundary Component', () => {
  beforeEach(() => {
    jest.spyOn(console, 'error').mockImplementation(jest.fn());
  });

  it('should renders child components when there is no error', () => {
    render(
      <ErrorBoundary>
        <div>Child Component</div>
      </ErrorBoundary>,
    );

    expect(screen.getByText('Child Component')).toBeInTheDocument();
  });

  it('should renders ErrorFallback when an error occurs', () => {
    const ErrorThrowingComponent = () => {
      throw new Error('Test error');
    };

    render(
      <ErrorBoundary>
        <ErrorThrowingComponent />
      </ErrorBoundary>,
    );

    expect(screen.getByText('Something went wrong!')).toBeInTheDocument();
    expect(screen.getByText('Test error')).toBeInTheDocument();
  });

  it('should logs error to console when an error occurs', () => {
    const consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation();

    const ErrorThrowingComponent = () => {
      throw new Error('Test error');
    };

    render(
      <ErrorBoundary>
        <ErrorThrowingComponent />
      </ErrorBoundary>,
    );

    expect(consoleErrorSpy).toHaveBeenCalledWith(
      'Error caught by ErrorBoundary:',
      expect.any(Error),
      expect.any(Object),
    );

    consoleErrorSpy.mockRestore();
  });
});
