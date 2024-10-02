import { useQuery } from '@tanstack/react-query';

// Constants
import { END_POINTS } from '@app/constants';

// Interfaces
import { TransactionKind } from '@app/interfaces';

// Services
import { getTransactions } from '@app/services';

const useFetchTransactions = (filter?: TransactionKind) =>
  useQuery({
    queryKey: [END_POINTS.TRANSACTIONS, filter],
    queryFn: () => getTransactions(filter),
  });

export { useFetchTransactions };
