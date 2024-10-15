// Utils
import { wrapper, screen, fireEvent, waitFor, userEvent } from '@app/utils';

// Hooks
import { useAuth } from '@app/hooks';

// Constants
import { VALIDATION_MESSAGES } from '@app/constants';

// Components
import { LoginForm } from '@app/components';

jest.mock('@app/hooks', () => ({
  ...jest.requireActual('@app/hooks'),
  useAuth: jest.fn(),
}));

describe('LoginForm Component', () => {
  const mockMutate = jest.fn();

  beforeEach(() => {
    (useAuth as jest.Mock).mockReturnValue({ mutate: mockMutate });
    jest.clearAllMocks();
    jest.spyOn(console, 'error').mockImplementation(jest.fn());
  });

  it('should render the form with username and password fields', () => {
    const { container } = wrapper(
      <LoginForm isPendingLogin={false} handleLogin={mockMutate} />,
    );

    expect(container).toMatchSnapshot();
  });

  it('should disable "Sign in" button when form is invalid or untouched', () => {
    wrapper(<LoginForm isPendingLogin={false} handleLogin={mockMutate} />);

    const loginButton = screen.getByTestId('login-button');

    expect(loginButton).toBeDisabled();
  });

  it('should enable "Sign in" button when form is valid and has changes', async () => {
    wrapper(<LoginForm isPendingLogin={false} handleLogin={mockMutate} />);

    await userEvent.type(screen.getByTestId(/username-input/i), 'username');
    await userEvent.type(screen.getByTestId(/password-input/i), 'password123');

    fireEvent.blur(screen.getByTestId(/password-input/i));

    await waitFor(() => {
      expect(screen.getByTestId('login-button')).not.toBeDisabled();
    });
  });

  it('should toggle password visibility', async () => {
    wrapper(<LoginForm isPendingLogin={false} handleLogin={mockMutate} />);

    const passwordInput = screen.getByTestId(/password-input/i);
    const toggleButton = screen.getByLabelText(/toggle password visibility/i);

    // Initially, password is hidden
    expect(passwordInput).toHaveAttribute('type', 'password');

    fireEvent.click(toggleButton);

    // After clicking, password is visible
    await waitFor(() => {
      expect(passwordInput).toHaveAttribute('type', 'text');
    });

    fireEvent.click(toggleButton);

    // Toggle back to hidden
    await waitFor(() => {
      expect(passwordInput).toHaveAttribute('type', 'password');
    });
  });

  it('should show validation errors for invalid input', async () => {
    wrapper(<LoginForm isPendingLogin={false} handleLogin={mockMutate} />);

    const usernameInput = screen.getByLabelText(/username/i);

    fireEvent.blur(usernameInput);

    await waitFor(() => {
      expect(screen.getByText(/username is required/i)).toBeInTheDocument();
    });
  });

  it('should submit the form correctly with valid input', async () => {
    wrapper(<LoginForm isPendingLogin={false} handleLogin={mockMutate} />);

    await userEvent.type(screen.getByTestId(/username-input/i), 'username');
    await userEvent.type(screen.getByTestId(/password-input/i), 'password123');

    fireEvent.blur(screen.getByTestId(/password-input/i));

    await userEvent.click(screen.getByTestId('login-button'));

    await waitFor(() => {
      expect(mockMutate).toHaveBeenCalled();
    });
  });

  it('should toggle the "Remember me" checkbox', () => {
    wrapper(<LoginForm isPendingLogin={false} handleLogin={mockMutate} />);

    const checkbox = screen.getByRole('checkbox', { name: /remember me/i });

    expect(checkbox).not.toBeChecked();

    fireEvent.click(checkbox);

    expect(checkbox).toBeChecked();
  });

  it('should clear the error message when the input field is valid', async () => {
    wrapper(<LoginForm isPendingLogin={false} handleLogin={mockMutate} />);

    const usernameInput = screen.getByTestId(/username-input/i);
    const passwordInput = screen.getByTestId(/password-input/i);

    await userEvent.type(usernameInput, 'username');
    await userEvent.type(passwordInput, 'password');

    await userEvent.click(usernameInput);

    await waitFor(() => {
      expect(
        screen.getByText(VALIDATION_MESSAGES.PASSWORD.REQUIREMENTS),
      ).toBeInTheDocument();
    });

    await userEvent.type(passwordInput, 'password123');

    await waitFor(() => {
      expect(
        screen.queryByText(VALIDATION_MESSAGES.PASSWORD.REQUIREMENTS),
      ).not.toBeInTheDocument();
    });
  });
});
