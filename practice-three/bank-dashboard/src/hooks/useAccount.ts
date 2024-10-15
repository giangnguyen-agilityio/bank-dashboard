import toast from 'react-hot-toast';
import {
  useQuery,
  keepPreviousData,
  useMutation,
  useQueryClient,
} from '@tanstack/react-query';

// Constants
import { END_POINTS, ERROR_MESSAGE, SUCCESS_MESSAGE } from '@app/constants';

// Interface
import { IAccountData } from '@app/interfaces';

// Services
import { getAccounts, removeAccount, updateAccount } from '@app/services';

const useFetchAccounts = (page?: number, limit?: number) =>
  useQuery({
    queryKey: [END_POINTS.USERS, page, limit],
    queryFn: () => getAccounts(page, limit),
    placeholderData: keepPreviousData,
    staleTime: 60000,
    refetchInterval: 60000,
  });

const useAccount = () => {
  const queryClient = useQueryClient();

  const {
    data,
    isSuccess,
    isPending: isUpdatingAccount,
    mutate: editAccount,
  } = useMutation({
    mutationFn: (data: IAccountData) => updateAccount(data),
    onError: () => {
      toast.error(ERROR_MESSAGE.UNKNOWN_ERROR);
    },
  });

  const { isPending: isDeletingAccount, mutate: deleteAccount } = useMutation({
    mutationFn: async (id: IAccountData['id']) => await removeAccount(id),
    onSuccess: () => {
      toast.success(SUCCESS_MESSAGE.DELETE_ACCOUNT);
      queryClient.invalidateQueries({ queryKey: [END_POINTS.USERS] });
    },
    onError: () => toast.error(ERROR_MESSAGE.UNKNOWN_ERROR),
  });

  return {
    user: data,
    isSuccess,
    isUpdatingAccount,
    isDeletingAccount,
    editAccount,
    deleteAccount,
  };
};

export { useFetchAccounts, useAccount };
