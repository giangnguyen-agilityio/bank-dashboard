import { useQuery, keepPreviousData } from '@tanstack/react-query';

// Constants
import { END_POINTS } from '@app/constants';

// Services
import { getAccounts } from '@app/services';

const useFetchAccounts = (page?: number, limit?: number) =>
  useQuery({
    queryKey: [END_POINTS.USERS, page, limit],
    queryFn: () => getAccounts(page, limit),
    placeholderData: keepPreviousData,
  });

export { useFetchAccounts };
