import { ReactNode } from 'react';
import {
  QueryClient,
  QueryClientProvider,
  useQueryClient,
} from '@tanstack/react-query';

// Utils
import { act, renderHook, waitFor } from '@app/utils';

// Hooks
import { useAccount, useFetchAccounts } from '@app/hooks';

// Services
import { getAccounts, removeAccount, updateAccount } from '@app/services';

// Constants
import { END_POINTS } from '@app/constants';

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
  it('should update the account data optimistically', async () => {
    const accountData = MOCK_ACCOUNTS_DATA[0];
    const previousAccountData = {
      ...MOCK_ACCOUNTS_DATA[0],
      name: 'Updated Name',
    };

    // Set up initial data in the Query Client
    queryClient.setQueryData(
      [END_POINTS.USERS, accountData.id],
      previousAccountData,
    );

    const { result } = renderHook(() => useAccount(), { wrapper: env });

    // Trigger the mutation
    await act(async () => {
      result.current.editAccount(accountData);
    });

    // Verify that the data in the cache was optimistically updated
    const updatedData = queryClient.getQueryData([
      END_POINTS.USERS,
      accountData.id,
    ]);

    expect(updatedData).toEqual(previousAccountData);
  });

  it('should handles account update error', async () => {
    const accountData = MOCK_ACCOUNTS_DATA[0];

    (updateAccount as jest.Mock).mockRejectedValue(new Error('Update failed'));

    const { result } = renderHook(() => useAccount(), {
      wrapper: env,
    });

    await waitFor(() => result.current.editAccount(accountData));

    // Assert error handling
    expect(result.current.isUpdatingAccount).toBe(false);
  });

  it('should deletes account successfully', async () => {
    (removeAccount as jest.Mock).mockResolvedValue({});

    const { result } = renderHook(() => useAccount(), {
      wrapper: env,
    });

    await waitFor(() => result.current.deleteAccount(MOCK_ACCOUNTS_DATA[0].id));

    // Assert successful deletion
    expect(removeAccount).toHaveBeenCalled();
  });

  it('should handles account deletion error', async () => {
    (removeAccount as jest.Mock).mockRejectedValue(new Error('Delete failed'));

    const { result } = renderHook(() => useAccount(), {
      wrapper: env,
    });

    await waitFor(() => result.current.deleteAccount(MOCK_ACCOUNTS_DATA[0].id));

    expect(removeAccount).toHaveBeenCalled();
  });
});
