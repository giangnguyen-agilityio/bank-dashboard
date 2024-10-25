import { useEffect } from 'react';
import { useNavigate } from '@tanstack/react-router';
import { Link } from '@tanstack/react-router';
import { Card, CardBody } from '@nextui-org/react';
import { useShallow } from 'zustand/react/shallow';

// Assets
import { LogoIcon } from '@app/assets';

// Constants
import { DESTINATION } from '@app/constants';

// Hooks
import { useAuth } from '@app/hooks';

// Interfaces
import { LoginFormData } from '@app/interfaces';

// Stores
import { useAuthStore } from '@app/stores';

// Components
import { Box, LoginForm, Text } from '@app/components';

const LoginPage = () => {
  const { isPendingLogin, mutate } = useAuth();
  const isAuthenticated = useAuthStore(
    useShallow((state) => state.isAuthenticated),
  );

  const navigate = useNavigate();

  const handleLogin = (data: LoginFormData) => {
    mutate(data);
  };

  useEffect(() => {
    if (isAuthenticated) {
      navigate({ to: DESTINATION.DASHBOARD });
    }
  }, [isAuthenticated, navigate]);

  return (
    <>
      <Box className="min-h-screen">
        {/* Logo */}
        <Link
          to="/"
          className="flex items-center cursor-pointer h-20.5 lg:h-25 hover:opacity-100 active:opacity-100"
          aria-label="Logo"
        >
          <LogoIcon customClass="w-full text-text-secondary" />
        </Link>

        <Card className="w-full max-w-md mx-auto">
          <CardBody className="p-7 rounded-2xl bg-background-default">
            <Text
              as="h2"
              variant="heading"
              customClass="uppercase text-center mb-5 text-2xl"
            >
              Sign in
            </Text>
            <LoginForm
              handleLogin={handleLogin}
              isPendingLogin={isPendingLogin}
            />
          </CardBody>
        </Card>
      </Box>
    </>
  );
};

export default LoginPage;
