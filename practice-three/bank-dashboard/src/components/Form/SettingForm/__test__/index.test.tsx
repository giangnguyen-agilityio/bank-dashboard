// Utils
import { fireEvent, render, screen, userEvent, waitFor } from '@app/utils';

// Hooks
import { useAccount, useMediaQuery } from '@app/hooks';

// Stores
import { useAuthStore } from '@app/stores';

// Mocks
import { MOCK_ACCOUNTS_DATA } from '@app/mocks';

// Constants
import { VALIDATION_MESSAGES } from '@app/constants';

// Components
import { SettingForm } from '@app/components';

jest.mock('@app/hooks', () => ({
  ...jest.requireActual('@app/hooks'),
  useAccount: jest.fn(),
  useMediaQuery: jest.fn(),
}));

jest.mock('@app/stores', () => ({
  ...jest.requireActual('@app/stores'),
  useAuthStore: jest.fn(),
}));

describe('SettingForm', () => {
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
          userInfo: MOCK_ACCOUNTS_DATA[0],
          exp: '2024-10-09T23:52:51.820Z',
          isAuthenticated: true,
        },
      }),
    );

    (useMediaQuery as jest.Mock).mockReturnValue(false);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should render SettingForm component correctly', () => {
    render(<SettingForm />);

    expect(screen.getByLabelText('Name input field')).toBeInTheDocument();
    expect(screen.getByLabelText('Username input field')).toBeInTheDocument();
    expect(screen.getByLabelText('Email input field')).toBeInTheDocument();
    expect(screen.getByLabelText('Password input field')).toBeInTheDocument();
    expect(screen.getByTestId('save-button')).toBeDisabled();
  });

  it('should clear the error message when the input field is valid', async () => {
    render(<SettingForm />);

    const nameInput = screen.getByTestId('name-input');
    const passwordInput = screen.getByTestId('password-input');

    await userEvent.type(nameInput, 'John Doe');
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

  it('should perform the edit action when the save button is clicked', async () => {
    (useMediaQuery as jest.Mock).mockReturnValue(true);

    render(<SettingForm />);

    const mockData = {
      name: 'John Doe',
      username: 'jdoe',
      password: 'password123',
      email: 'jdoe@example.com',
      dateOfBirth: '1990-01-01',
      presentAddress: '123 Main St, Apt 4',
      permanentAddress: '456 Maple St',
      city: 'New York',
      postalCode: '1234',
      county: 'New York',
    };

    const nameInput = screen.getByTestId('name-input');
    const usernameInput = screen.getByTestId('username-input');
    const emailInput = screen.getByTestId('email-input');
    const passwordInput = screen.getByTestId('password-input');
    const dateOfBirthInput = screen.getByTestId('date-of-birth-input');
    const presentAddressInput = screen.getByTestId('present-address-input');
    const permanentAddressInput = screen.getByTestId('permanent-address-input');
    const cityInput = screen.getByTestId('city-input');
    const postalCodeInput = screen.getByTestId('postal-code-input');
    const countyInput = screen.getByTestId('country-input');
    const saveButton = screen.getByTestId('save-button');

    await userEvent.type(nameInput, mockData.name);
    await userEvent.type(usernameInput, mockData.username);
    await userEvent.type(emailInput, mockData.email);
    await userEvent.type(passwordInput, mockData.password);
    await userEvent.type(dateOfBirthInput, mockData.dateOfBirth);
    await userEvent.type(presentAddressInput, mockData.presentAddress);
    await userEvent.type(permanentAddressInput, mockData.permanentAddress);
    await userEvent.type(cityInput, mockData.city);
    await userEvent.type(postalCodeInput, mockData.postalCode);
    await userEvent.type(countyInput, mockData.county);

    fireEvent.blur(countyInput);

    await userEvent.click(saveButton);

    await waitFor(() => {
      expect(mockEditAccount).toHaveBeenCalled();
    });
  });
});
