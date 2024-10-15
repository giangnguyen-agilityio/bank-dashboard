import { useRouter } from '@tanstack/react-router';

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
    const { container } = render(<UnauthorizedPage />);

    expect(container).toMatchSnapshot();
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
