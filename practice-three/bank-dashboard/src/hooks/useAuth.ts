import { useNavigate } from '@tanstack/react-router';
import { useMutation } from '@tanstack/react-query';
import toast from 'react-hot-toast';

// Services
import { login } from '@app/services';

// Interface
import { LoginFormData } from '@app/interfaces';

// Stores
import { DESTINATION, ERROR_MESSAGE, SUCCESS_MESSAGE } from '@app/constants';

// Stores
import { useAuthStore } from '@app/stores';

export const useAuth = () => {
  const { setCredentials } = useAuthStore();
  const navigate = useNavigate();

  const { data, isPending, isSuccess, mutate } = useMutation({
    mutationFn: (user: LoginFormData) => login(user),
    onSuccess: (data) => {
      if (data) {
        setCredentials(data);
        toast.success(SUCCESS_MESSAGE.LOGIN);
        navigate({ to: DESTINATION.DASHBOARD });
      }
    },
    onError: () => {
      toast.error(ERROR_MESSAGE.LOGIN);
    },
  });

  return {
    user: data,
    isSuccess,
    isPendingLogin: isPending,
    mutate,
  };
};
