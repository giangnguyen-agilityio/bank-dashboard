import { useNavigate } from '@tanstack/react-router';
import { useMutation } from '@tanstack/react-query';
import toast from 'react-hot-toast';

// Services
import { login } from '@app/services';

// Interface
import { AccountRole, LoginFormData } from '@app/interfaces';

// Stores
import { DESTINATION, ERROR_MESSAGE } from '@app/constants';

// Stores
import { useAuthStore } from '@app/stores';

export const useAuth = () => {
  const setCredentials = useAuthStore((state) => state.setCredentials);

  const navigate = useNavigate();

  const { data, isPending, isSuccess, mutate } = useMutation({
    mutationFn: (user: LoginFormData) => login(user),
    onSuccess: (data) => {
      if (data?.users) {
        setCredentials(data);
        const isAdmin = data.users.role === AccountRole.Admin;
        navigate({
          to: isAdmin ? DESTINATION.ACCOUNTS : DESTINATION.TRANSACTIONS,
        });

        return;
      }

      toast.error(ERROR_MESSAGE.LOGIN);
    },
    onError: () => {
      toast.error(ERROR_MESSAGE.UNEXPECTED_ERROR);
    },
  });

  return {
    user: data,
    isSuccess,
    isPendingLogin: isPending,
    mutate,
  };
};
