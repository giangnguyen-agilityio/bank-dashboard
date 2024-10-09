import { useRouter } from '@tanstack/react-router';

// Constants
import { UNAUTHORIZED_IMAGE } from '@app/constants';

// Utils
import { render, screen, userEvent } from '@app/utils';

// Pages
import { UnauthorizedPage } from '@app/pages';

jest.mock('@tanstack/react-router', () => ({
  ...jest.requireActual('@tanstack/react-router'),
  useRouter: jest.fn(),
}));

describe('UnauthorizedPage', () => {
  const mockBack = jest.fn();

  beforeEach(() => {
    (useRouter as jest.Mock).mockReturnValue({
      history: {
        back: mockBack,
      },
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should renders the UnauthorizedPage correctly', () => {
    render(<UnauthorizedPage />);

    // Check if the title is rendered
    const titleElement = screen.getByTestId('title');

    expect(titleElement).toBeInTheDocument();

    // Check if the message is rendered
    const messageElement = screen.getByTestId('message');

    expect(messageElement).toBeInTheDocument();
    expect(messageElement).toHaveTextContent(
      "You don't have permission to access this page.",
    );

    // Check if the image is rendered
    const imageElement = screen.getByAltText('Unauthorized Image');

    expect(imageElement).toBeInTheDocument();
    expect(imageElement).toHaveAttribute('src', UNAUTHORIZED_IMAGE);

    // Check if the button is rendered
    const buttonElement = screen.getByRole('button', {
      name: /Back to previous page/i,
    });

    expect(buttonElement).toBeInTheDocument();
  });

  it('should navigates back when the button is clicked', async () => {
    render(<UnauthorizedPage />);

    const buttonElement = screen.getByRole('button', {
      name: /Back to previous page/i,
    });

    await userEvent.click(buttonElement);

    expect(mockBack).toHaveBeenCalledTimes(1);
  });
});
