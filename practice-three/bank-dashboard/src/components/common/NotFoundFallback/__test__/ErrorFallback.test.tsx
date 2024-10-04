// Utils
import { render, screen } from '@app/utils';

// Components
import { NotFoundFallback } from '@app/components';

describe('NotFoundFallback Component', () => {
  it('should renders correctly with title and message', () => {
    const customTitle = 'The sample title';
    const customMessage = 'The sample message';

    render(<NotFoundFallback title={customTitle} message={customMessage} />);

    const title = screen.getByTestId('title');
    const message = screen.getByTestId('message');

    expect(title).toHaveTextContent(customTitle);
    expect(message).toHaveTextContent(customMessage);
  });

  it('should renders correctly without crashing', () => {
    render(<NotFoundFallback />);

    expect(screen.getByText(/Sorry, page not found/i)).toBeInTheDocument();
    expect(
      screen.getByText(
        /The page you are looking for doesn't exist or another error occurred. Please go back to the Homepage./i,
      ),
    ).toBeInTheDocument();
  });
});
