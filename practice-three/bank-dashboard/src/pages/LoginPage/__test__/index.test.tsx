// Utils
import { wrapper, screen, waitFor, fireEvent } from '@app/utils';

// Hooks
import { useAuth } from '@app/hooks';

// Pages
import { LoginPage } from '@app/pages';

// Stores
import { useAuthStore } from '@app/stores';

jest.mock('@app/hooks', () => ({
  ...jest.requireActual('@app/hooks'),
  useAuth: jest.fn(),
}));

jest.mock('@app/stores', () => ({
  ...jest.requireActual('@app/stores'),
  useAuthStore: jest.fn(),
}));

describe('LoginPage', () => {
  const mutateMock = jest.fn();

  beforeEach(() => {
    (useAuth as jest.Mock).mockReturnValue({
      isPendingLogin: false,
      mutate: mutateMock,
    });
    (useAuthStore as unknown as jest.Mock).mockImplementation((selector) =>
      selector({
        isAuthenticated: true,
      }),
    );

    jest.spyOn(console, 'error').mockImplementation(() => jest.fn());
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should renders the Login page without crashing', () => {
    const { container } = wrapper(<LoginPage />);

    expect(container).toMatchSnapshot();
  });

  it('should perform the login action correctly', async () => {
    wrapper(<LoginPage />);

    const usernameInput = screen.getByTestId('username-input');
    const passwordInput = screen.getByTestId('password-input');

    fireEvent.change(usernameInput, { target: { value: 'username' } });
    fireEvent.change(passwordInput, { target: { value: 'password123' } });

    fireEvent.submit(screen.getByRole('button', { name: /sign in/i }));

    await waitFor(() => {
      expect(mutateMock).toHaveBeenCalled();
    });
  });

  it('should disables the login button when pending', () => {
    (useAuth as jest.Mock).mockReturnValue({
      isPendingLogin: true,
      mutate: mutateMock,
    });

    wrapper(<LoginPage />);

    expect(screen.getByRole('button', { name: /sign in/i })).toBeDisabled();
  });
});
