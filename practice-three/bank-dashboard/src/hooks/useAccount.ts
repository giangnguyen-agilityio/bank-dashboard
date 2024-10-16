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

    onMutate: async (data: IAccountData) => {
      await queryClient.cancelQueries({
        queryKey: [END_POINTS.USERS, data.id],
      });

      const previousAccounts = queryClient.getQueryData([
        END_POINTS.USERS,
        data.id,
      ]);

      queryClient.setQueryData([END_POINTS.USERS, data.id], data);

      return { previousAccounts, data };
    },

    onError: (_, __, context) => {
      toast.error(ERROR_MESSAGE.UNKNOWN_ERROR);

      if (context?.previousAccounts) {
        queryClient.setQueryData(
          [END_POINTS.USERS, context.data.id],
          context.previousAccounts,
        );
      }
    },

    onSettled: (data?: IAccountData) => {
      queryClient.invalidateQueries({
        queryKey: [END_POINTS.USERS, data?.id],
      });
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
