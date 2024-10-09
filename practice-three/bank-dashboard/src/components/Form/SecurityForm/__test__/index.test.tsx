// Utils
import {
  render,
  screen,
  fireEvent,
  waitFor,
  decryptString,
  userEvent,
} from '@app/utils';

// Hooks
import { useAccount } from '@app/hooks';

// Stores
import { useAuthStore } from '@app/stores';

// Components
import { SecurityForm } from '@app/components';

jest.mock('@app/hooks', () => ({
  ...jest.requireActual('@app/hooks'),
  useAccount: jest.fn(),
}));

jest.mock('@app/stores', () => ({
  ...jest.requireActual('@app/stores'),
  useAuthStore: jest.fn(),
}));

jest.mock('@app/utils', () => ({
  ...jest.requireActual('@app/utils'),
  decryptString: jest.fn(),
}));

jest.mock('react-hot-toast', () => ({
  success: jest.fn(),
}));

describe('SecurityForm', () => {
  const mockEditAccount = jest.fn();
  const mockSetCredentials = jest.fn();

  beforeEach(() => {
    (useAccount as jest.Mock).mockReturnValue({
      editAccount: mockEditAccount,
      isUpdatingAccount: false,
    });

    (useAuthStore as unknown as jest.Mock).mockImplementation((selector) =>
      selector({
        setCredentials: mockSetCredentials,
        data: {
          userInfo: {
            password: 'encryptedPassword123',
          },
          exp: 'expiryToken',
        },
      }),
    );

    (decryptString as jest.Mock).mockReturnValue('decryptedPassword123');
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should render SecurityForm component correctly', () => {
    render(<SecurityForm />);

    expect(screen.getByLabelText('Password input field')).toBeInTheDocument();
    expect(
      screen.getByLabelText('New password input field'),
    ).toBeInTheDocument();
    expect(screen.getByLabelText('Save button')).toBeDisabled();
  });

  it('should disable Save button when form is invalid and not dirty', async () => {
    render(<SecurityForm />);

    const passwordInput = screen.getByLabelText('Password input field');
    const newPasswordInput = screen.getByLabelText('New password input field');
    const saveButton = screen.getByLabelText('Save button');

    await userEvent.type(passwordInput, 'decryptedPassword');
    await userEvent.type(newPasswordInput, 'newValidPassword');

    fireEvent.blur(newPasswordInput);

    await waitFor(() => {
      expect(saveButton).toBeDisabled();
    });
  });

  it('should show an error when the current password does not match', async () => {
    render(<SecurityForm />);

    const passwordInput = screen.getByLabelText('Password input field');
    const saveButton = screen.getByLabelText('Save button');

    await userEvent.type(passwordInput, 'wrongPassword123');
    await userEvent.click(saveButton);
  });

  it('should toggle password visibility for current password', async () => {
    render(<SecurityForm />);

    const passwordInput = screen.getByLabelText('Password input field');
    const toggleButton = screen.getByLabelText('toggle password visibility');

    expect(passwordInput).toHaveAttribute('type', 'password');

    await userEvent.click(toggleButton);

    expect(passwordInput).toHaveAttribute('type', 'text');
  });

  it('should toggle new password visibility for current password', async () => {
    render(<SecurityForm />);

    const newPasswordInput = screen.getByLabelText('New password input field');
    const toggleButton = screen.getByLabelText(
      'toggle new password visibility',
    );

    expect(newPasswordInput).toHaveAttribute('type', 'password');

    await userEvent.click(toggleButton);

    expect(newPasswordInput).toHaveAttribute('type', 'text');
  });

  it('should call editAccount on successful form submission', async () => {
    render(<SecurityForm />);

    const passwordInput = screen.getByLabelText('Password input field');
    const newPasswordInput = screen.getByLabelText('New password input field');
    const saveButton = screen.getByLabelText('Save button');

    await userEvent.type(passwordInput, 'decryptedPassword123');
    await userEvent.type(newPasswordInput, 'newValidPassword123');

    fireEvent.blur(newPasswordInput);

    await userEvent.click(saveButton);

    await waitFor(() => {
      expect(mockEditAccount).toHaveBeenCalled();
    });
  });

  it('should disable the save button when isUpdatingAccount is true', () => {
    (useAccount as jest.Mock).mockReturnValue({
      editAccount: mockEditAccount,
      isUpdatingAccount: true,
    });

    render(<SecurityForm />);

    const saveButton = screen.getByLabelText('Save button');
    expect(saveButton).toBeDisabled();
  });

  it('should clear the error message when the input field is valid', async () => {
    render(<SecurityForm />);

    const passwordInput = screen.getByTestId('password-input');
    const newPasswordInput = screen.getByTestId('new-password-input');

    await userEvent.type(passwordInput, 'decryptedPassword12');
    await userEvent.type(newPasswordInput, 'decryptedPassword12');

    fireEvent.blur(newPasswordInput);

    await userEvent.type(passwordInput, 'decryptedPassword123');

    const saveButton = screen.getByLabelText('Save button');

    await userEvent.click(saveButton);
  });
});
