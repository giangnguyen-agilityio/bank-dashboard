import { useQuery, keepPreviousData } from '@tanstack/react-query';

// Constants
import { END_POINTS } from '@app/constants';

// Interfaces
import { TransactionKind } from '@app/interfaces';

// Services
import { getTransactions } from '@app/services';

const useFetchTransactions = (
  filter?: TransactionKind,
  page?: number,
  limit?: number,
) =>
  useQuery({
    queryKey: [END_POINTS.TRANSACTIONS, filter, page, limit],
    queryFn: () => getTransactions(filter, page, limit),
    placeholderData: keepPreviousData,
  });

export { useFetchTransactions };
