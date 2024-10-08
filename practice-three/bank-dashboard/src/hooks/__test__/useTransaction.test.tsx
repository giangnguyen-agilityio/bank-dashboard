import { ReactNode } from 'react';
import {
  QueryClient,
  QueryClientProvider,
  useQueryClient,
} from '@tanstack/react-query';

// Hooks
import { useFetchTransactions } from '@app/hooks';

// Utils
import { renderHook, waitFor } from '@app/utils';

// Services
import { getTransactions } from '@app/services';

// Mocks
import { MOCK_TRANSACTION_RESPONSE } from '@app/mocks';

jest.mock('@tanstack/react-query', () => ({
  ...jest.requireActual('@tanstack/react-query'),
  useQueryClient: jest.fn(),
}));

jest.mock('@app/services', () => ({
  getTransactions: jest.fn(),
  removeAccount: jest.fn(),
  updateAccount: jest.fn(),
}));

const queryClient = new QueryClient();
const keepPreviousDataMock = jest.fn();

const env = ({ children }: { children: ReactNode }) => (
  <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
);

(useQueryClient as jest.Mock).mockReturnValueOnce({
  placeholderData: keepPreviousDataMock,
});

describe('useFetchTransactions', () => {
  it('should fetches the transactions correctly', async () => {
    (getTransactions as jest.Mock).mockResolvedValueOnce(
      MOCK_TRANSACTION_RESPONSE,
    );

    const { result } = renderHook(() => useFetchTransactions(), {
      wrapper: env,
    });

    await waitFor(() => result.current.isSuccess);

    expect(result.current.data).toEqual(MOCK_TRANSACTION_RESPONSE);
  });
});
