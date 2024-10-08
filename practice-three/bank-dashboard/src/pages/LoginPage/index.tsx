import { Toaster } from 'react-hot-toast';
import { Link } from '@tanstack/react-router';
import { Card, CardBody } from '@nextui-org/react';

// Assets
import { LogoIcon } from '@app/assets';

// Constants
import { TOAST_CONFIG } from '@app/constants';

// Hooks
import { useAuth } from '@app/hooks';

// Interfaces
import { LoginFormData } from '@app/interfaces';

// Components
import { Box, LoginForm, Text } from '@app/components';

const LoginPage = () => {
  const { isPendingLogin, mutate } = useAuth();

  const handleLogin = (data: LoginFormData) => {
    mutate(data);
  };

  return (
    <>
      <Box className="min-h-screen">
        {/* Logo */}
        <Link
          to="/"
          as="h1"
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
      <Toaster
        position="bottom-center"
        toastOptions={{
          duration: TOAST_CONFIG.DURATION,
          success: TOAST_CONFIG.SUCCESS_COLOR,
          error: TOAST_CONFIG.ERROR_COLOR,
          style: TOAST_CONFIG.TEXT_COLOR,
        }}
      />
    </>
  );
};

export default LoginPage;
