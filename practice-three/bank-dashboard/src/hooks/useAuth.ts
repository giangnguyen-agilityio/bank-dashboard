import { useNavigate } from '@tanstack/react-router';
import { useMutation } from '@tanstack/react-query';
import toast from 'react-hot-toast';

// Services
import { login } from '@app/services';

// Interface
import { LoginFormData } from '@app/interfaces';

// Stores
import { DESTINATION, ERROR_MESSAGE } from '@app/constants';

// Stores
import { useAuthStore } from '@app/stores';

export const useAuth = () => {
  const { setCredentials } = useAuthStore();
  const navigate = useNavigate();

  const { data, isPending, isSuccess, mutate } = useMutation({
    mutationFn: (user: LoginFormData) => login(user),
    onSuccess: (data) => {
      if (data?.users) {
        setCredentials(data);
        navigate({ to: DESTINATION.DASHBOARD });

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
