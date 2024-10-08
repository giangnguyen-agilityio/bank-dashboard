import toast from 'react-hot-toast';
import { useQuery, keepPreviousData, useMutation } from '@tanstack/react-query';

// Constants
import { END_POINTS, ERROR_MESSAGE } from '@app/constants';

// Interface
import { IAccountData } from '@app/interfaces';

// Services
import { getAccounts, updateAccount } from '@app/services';

const useFetchAccounts = (page?: number, limit?: number) =>
  useQuery({
    queryKey: [END_POINTS.USERS, page, limit],
    queryFn: () => getAccounts(page, limit),
    placeholderData: keepPreviousData,
  });

const useAccount = () => {
  const { data, isPending, isSuccess, mutate } = useMutation({
    mutationFn: (data: IAccountData) => updateAccount(data),
    onError: () => {
      toast.success(ERROR_MESSAGE.UNKNOWN_ERROR);
    },
  });

  return {
    user: data,
    isSuccess,
    isUpdatingAccount: isPending,
    mutate,
  };
};

export { useFetchAccounts, useAccount };
