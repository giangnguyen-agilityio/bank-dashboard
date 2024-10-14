import { ReactNode } from 'react';
import {
  QueryClient,
  QueryClientProvider,
  useQueryClient,
} from '@tanstack/react-query';

// Utils
import { renderHook, waitFor } from '@app/utils';

// Hooks
import { useAccount, useFetchAccounts } from '@app/hooks';

// Services
import { getAccounts, removeAccount, updateAccount } from '@app/services';

// Mocks
import { MOCK_ACCOUNT_RESPONSE, MOCK_ACCOUNTS_DATA } from '@app/mocks';

jest.mock('@app/services', () => ({
  ...jest.requireActual('@app/services'),
  getAccounts: jest.fn(),
  updateAccount: jest.fn(),
  removeAccount: jest.fn(),
}));

jest.mock('@tanstack/react-query', () => ({
  ...jest.requireActual('@tanstack/react-query'),
  useQueryClient: jest.fn(),
}));

const queryClient = new QueryClient();
const keepPreviousDataMock = jest.fn();

const env = ({ children }: { children: ReactNode }) => (
  <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
);

(useQueryClient as jest.Mock).mockReturnValueOnce({
  placeholderData: keepPreviousDataMock,
});

describe('useFetchAccounts hook', () => {
  it('should fetches the transactions correctly', async () => {
    (getAccounts as jest.Mock).mockResolvedValueOnce(MOCK_ACCOUNT_RESPONSE);

    const { result } = renderHook(() => useFetchAccounts(), {
      wrapper: env,
    });

    await waitFor(() => result.current.isSuccess);

    expect(result.current.data).toEqual(MOCK_ACCOUNT_RESPONSE);
  });
});

describe('useAccount hook', () => {
  it('edits account successfully', async () => {
    const accountData = MOCK_ACCOUNTS_DATA[0];
    (updateAccount as jest.Mock).mockResolvedValueOnce(accountData);

    const { result } = renderHook(() => useAccount(), {
      wrapper: env,
    });

    await waitFor(() => result.current.editAccount(accountData));

    expect(updateAccount).toHaveBeenCalledWith(accountData);
  });

  it('handles account update error', async () => {
    const accountData = MOCK_ACCOUNTS_DATA[0];

    (updateAccount as jest.Mock).mockRejectedValue(new Error('Update failed'));

    const { result } = renderHook(() => useAccount(), {
      wrapper: env,
    });

    await waitFor(() => result.current.editAccount(accountData));

    // Assert error handling
    expect(result.current.isUpdatingAccount).toBe(false);
  });

  it('deletes account successfully', async () => {
    (removeAccount as jest.Mock).mockResolvedValue({});

    const { result } = renderHook(() => useAccount(), {
      wrapper: env,
    });

    await waitFor(() => result.current.deleteAccount(MOCK_ACCOUNTS_DATA[0].id));

    // Assert successful deletion
    expect(removeAccount).toHaveBeenCalled();
  });

  it('handles account deletion error', async () => {
    (removeAccount as jest.Mock).mockRejectedValue(new Error('Delete failed'));

    const { result } = renderHook(() => useAccount(), {
      wrapper: env,
    });

    await waitFor(() => result.current.deleteAccount(MOCK_ACCOUNTS_DATA[0].id));

    expect(removeAccount).toHaveBeenCalled();
  });
});
