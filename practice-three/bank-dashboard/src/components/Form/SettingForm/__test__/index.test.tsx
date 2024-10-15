import { fireEvent, render, screen, userEvent, waitFor } from '@app/utils';
import { SettingForm } from '@app/components';
import { MOCK_ACCOUNTS_DATA } from '@app/mocks';
import { useMediaQuery } from '@app/hooks';
import { VALIDATION_MESSAGES } from '@app/constants';

// Mock data
const mockInfoField = MOCK_ACCOUNTS_DATA[0];

// Mock functions
const mockOnSubmit = jest.fn();
const mockDecryptString = jest.fn().mockReturnValue('decryptedPassword123');

// Mock external functions
jest.mock('@app/utils', () => ({
  ...jest.requireActual('@app/utils'),
  decryptString: () => mockDecryptString(),
  getCurrentDate: () => '2024-10-15',
}));

jest.mock('@app/hooks', () => ({
  ...jest.requireActual('@app/hooks'),
  useMediaQuery: jest.fn(),
}));

describe('SettingForm', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    (useMediaQuery as jest.Mock).mockReturnValue(false);
  });

  it('renders the form with initial values', async () => {
    const { container } = render(
      <SettingForm infoField={mockInfoField} onSubmit={mockOnSubmit} />,
    );

    expect(container).toMatchSnapshot();
  });

  it('updates input fields and clears error messages on change', async () => {
    render(<SettingForm infoField={mockInfoField} onSubmit={mockOnSubmit} />);

    const nameInput = screen.getByLabelText('Name');

    await userEvent.clear(nameInput);
    await userEvent.type(nameInput, 'Updated Name');

    await waitFor(() => {
      expect(nameInput).toHaveValue('Updated Name');
    });
  });

  it('displays validation errors for required fields', async () => {
    render(<SettingForm infoField={mockInfoField} onSubmit={mockOnSubmit} />);

    const nameInput = screen.getByLabelText('Name');
    const emailInput = screen.getByLabelText('Email');

    await userEvent.clear(nameInput);
    await userEvent.click(emailInput);

    expect(screen.getByText(/Name is required/i)).toBeInTheDocument();
  });

  it('calls onSubmit with the correct data when the form is valid', async () => {
    (useMediaQuery as jest.Mock).mockReturnValue(true);

    render(<SettingForm infoField={mockInfoField} onSubmit={mockOnSubmit} />);

    const submitButton = screen.getByRole('button', { name: /save button/i });
    const nameInput = screen.getByLabelText('Name');
    const emailInput = screen.getByLabelText('Email');

    await userEvent.clear(nameInput);
    await userEvent.type(nameInput, 'Updated Name');
    await userEvent.clear(emailInput);
    await userEvent.type(emailInput, 'example@gmail.com');
    await userEvent.click(nameInput);

    await userEvent.click(submitButton);

    await waitFor(() => {
      expect(mockOnSubmit).toHaveBeenCalled();
    });
  });

  it('should clear the error message when the input field is valid', async () => {
    render(<SettingForm infoField={mockInfoField} onSubmit={mockOnSubmit} />);

    const passwordInput = screen.getByTestId('password-input');

    await userEvent.clear(passwordInput);
    await userEvent.type(passwordInput, 'password');

    fireEvent.blur(passwordInput);

    await userEvent.type(passwordInput, 'password123');

    const errorMessage = screen.queryByText(
      VALIDATION_MESSAGES.PASSWORD.REQUIREMENTS,
    );

    await waitFor(() => {
      expect(errorMessage).not.toBeInTheDocument();
    });
  });
});
