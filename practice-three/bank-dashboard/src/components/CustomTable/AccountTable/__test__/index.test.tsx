// Utils
import { render, screen, userEvent, waitFor } from '@app/utils';

// Interfaces
import { IAccountData } from '@app/interfaces';

// Hooks
import { useMediaQuery } from '@app/hooks';

// Mocks
import { MOCK_ACCOUNTS_DATA } from '@app/mocks';

// Components
import { AccountTable } from '@app/components';

jest.mock('@app/hooks', () => ({
  ...jest.requireActual('@app/hooks'),
  useMediaQuery: jest.fn(),
}));

describe('AccountTable Component', () => {
  const mockAccounts: IAccountData[] = MOCK_ACCOUNTS_DATA;

  it('should render the table with accounts data', () => {
    render(
      <AccountTable
        currentPage={1}
        accounts={mockAccounts}
        totalAccounts={MOCK_ACCOUNTS_DATA.length}
      />,
    );

    expect(screen.getByText('John Doe')).toBeInTheDocument();
    expect(screen.getByText('Jane Smith')).toBeInTheDocument();

    expect(screen.getByText('User Name')).toBeInTheDocument();
    expect(screen.getByText('Email')).toBeInTheDocument();

    expect(screen.getByTestId('pagination')).toBeInTheDocument();
  });

  it('should render a loading state when isLoading is true', () => {
    render(
      <AccountTable
        currentPage={1}
        isLoading={true}
        accounts={undefined}
        totalAccounts={undefined}
      />,
    );

    const loading = screen.getByLabelText('Loading');

    expect(loading).toBeInTheDocument();
  });

  it('should not render pagination when there are no accounts', () => {
    render(
      <AccountTable
        currentPage={1}
        accounts={[]}
        totalAccounts={0}
        isLoading={false}
      />,
    );

    expect(
      screen.queryByLabelText('Account table pagination'),
    ).not.toBeInTheDocument();
  });

  it('should call onDelete when delete action is triggered', async () => {
    const mockOnDelete = jest.fn();
    const mockAccounts: IAccountData[] = MOCK_ACCOUNTS_DATA;

    render(
      <AccountTable
        currentPage={1}
        accounts={mockAccounts}
        totalAccounts={1}
        onDelete={mockOnDelete}
      />,
    );

    await userEvent.click(screen.getAllByLabelText('More actions button')[0]);
    await userEvent.click(screen.getAllByLabelText('More actions menu')[0]);
    await userEvent.click(screen.getAllByLabelText('Delete account button')[0]);

    await waitFor(() => {
      expect(mockOnDelete).toHaveBeenCalled();
    });
  });

  it('should render mobile columns when screen is mobile', () => {
    (useMediaQuery as jest.Mock).mockReturnValue(true);

    const mockAccounts: IAccountData[] = MOCK_ACCOUNTS_DATA;

    render(
      <AccountTable
        currentPage={1}
        accounts={mockAccounts}
        totalAccounts={1}
      />,
    );

    expect(screen.getByText('User Name')).toBeInTheDocument();
    expect(screen.getByText('Email')).toBeInTheDocument();
  });

  it('should render empty state when no accounts are available', () => {
    render(<AccountTable currentPage={1} accounts={[]} totalAccounts={0} />);

    expect(screen.queryByText('John Doe')).not.toBeInTheDocument();
  });
});
