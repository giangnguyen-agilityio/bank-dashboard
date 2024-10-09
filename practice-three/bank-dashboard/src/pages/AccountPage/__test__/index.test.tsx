/* eslint-disable @typescript-eslint/no-explicit-any */
import { render, screen, fireEvent, waitFor } from '@app/utils';

// Pages
import { AccountPage } from '@app/pages';

// Hooks
import { useFetchAccounts, useAccount } from '@app/hooks';

// Mock hooks
jest.mock('@app/hooks', () => ({
  ...jest.requireActual('@app/hooks'),
  useFetchAccounts: jest.fn(),
  useAccount: jest.fn(),
}));

jest.mock('@app/components', () => ({
  Box: ({ children }: { children: React.ReactNode }) => <div>{children}</div>,
  Text: ({ children }: { children: React.ReactNode }) => <h1>{children}</h1>,
  AccountTable: ({ accounts, onPageChange, onDelete }: any) => (
    <div>
      {accounts?.length > 0 ? (
        accounts.map((account: any) => (
          <div key={account.id} aria-label="account-item">
            {account.name}
            <button onClick={() => onDelete(account.id)}>Delete</button>
          </div>
        ))
      ) : (
        <div>No accounts</div>
      )}
      <button aria-label="next-page" onClick={() => onPageChange(2)}>
        Next
      </button>
    </div>
  ),
  AccountStatusBar: ({ data }: any) => (
    <div>
      {data.map((item: any) => (
        <div key={item.title}>
          {item.title}: {item.quantity}
        </div>
      ))}
    </div>
  ),
  Button: ({ children }: { children: React.ReactNode }) => (
    <button>{children}</button>
  ),
  ConfirmModal: ({ isOpen, onConfirm, onCancel }: any) =>
    isOpen ? (
      <div>
        <p>Confirm Delete?</p>
        <button onClick={onConfirm}>Confirm</button>
        <button onClick={onCancel}>Cancel</button>
      </div>
    ) : null,
}));

describe('AccountPage', () => {
  beforeEach(() => {
    (useFetchAccounts as jest.Mock).mockReturnValue({
      data: {
        users: [
          { id: '1', name: 'Account 1', status: 'ACTIVE' },
          { id: '2', name: 'Account 2', status: 'INACTIVE' },
        ],
        count: 2,
      },
      isLoading: false,
    });

    (useAccount as jest.Mock).mockReturnValue({
      isDeletingAccount: false,
      deleteAccount: jest.fn(),
    });
  });

  it('should render account status bar correctly', () => {
    render(<AccountPage />);

    expect(screen.getByText('Total Accounts: 2')).toBeInTheDocument();
  });

  it('should render the account table and delete modal', async () => {
    render(<AccountPage />);

    // Click delete button for an account
    fireEvent.click(screen.getAllByText('Delete')[0]);

    // Verify modal opens
    expect(screen.getByText('Confirm Delete?')).toBeInTheDocument();

    // Click confirm button on modal
    fireEvent.click(screen.getByText('Confirm'));

    // Ensure the delete function is called
    await waitFor(() => {
      expect(useAccount().deleteAccount).toHaveBeenCalledWith(
        '1',
        expect.any(Object),
      );
    });
  });

  it('should handle pagination correctly', () => {
    render(<AccountPage />);

    // Click next page button
    fireEvent.click(screen.getByLabelText('next-page'));

    // Ensure the correct page change handler is triggered
    expect(useFetchAccounts).toHaveBeenCalledWith(2, expect.any(Number));
  });

  it('should close modal when cancel is clicked', () => {
    render(<AccountPage />);

    // Click delete button for an account
    fireEvent.click(screen.getAllByText('Delete')[0]);

    // Verify modal opens
    expect(screen.getByText('Confirm Delete?')).toBeInTheDocument();

    // Click cancel button
    fireEvent.click(screen.getByText('Cancel'));

    // Verify modal closes
    expect(screen.queryByText('Confirm Delete?')).not.toBeInTheDocument();
  });

  it('should render the default value correctly', () => {
    (useFetchAccounts as jest.Mock).mockReturnValue({
      data: {
        users: [],
        count: null,
      },
      isLoading: false,
    });

    render(<AccountPage />);

    expect(screen.queryByText('Total Accounts: 2')).not.toBeInTheDocument();
  });

  it('should render the default value correctly when data is null', () => {
    (useFetchAccounts as jest.Mock).mockReturnValue({
      data: {
        users: undefined,
        count: null,
      },
    });

    render(<AccountPage />);

    expect(screen.queryByText('Total Accounts: 2')).not.toBeInTheDocument();
  });
});
