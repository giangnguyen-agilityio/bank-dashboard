import { ChangeEvent, useCallback } from 'react';
import { Link } from '@tanstack/react-router';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

import { Card, CardBody, Checkbox, useDisclosure } from '@nextui-org/react';

// Assets
import {
  EyeFilledIcon,
  EyeSlashFilledIcon,
  LogoIcon,
  UserIcon,
} from '@app/assets';

// Interfaces
import { LoginFormData } from '@app/interfaces';

// Constants
import { DESTINATION } from '@app/constants';

// Components
import { Box, Button, Container, Input, Text } from '@app/components';

// Schema Validation
const loginSchema = z.object({
  username: z.string().min(1, 'Username is required'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
});

const DEFAULT_VALUE: LoginFormData = {
  username: '',
  password: '',
};

const LoginForm = () => {
  const {
    control,
    formState: { isValid, isDirty, isLoading, errors },
    handleSubmit,
    clearErrors,
  } = useForm<LoginFormData>({
    mode: 'onBlur',
    reValidateMode: 'onBlur',
    defaultValues: DEFAULT_VALUE,
    resolver: zodResolver(loginSchema),
  });

  const { isOpen: isPasswordVisible, onOpenChange: togglePasswordVisibility } =
    useDisclosure();

  const handleLogin = (data: LoginFormData) => {
    console.log('Form submitted', data);
  };

  const handleInputChange = useCallback(
    (name: keyof LoginFormData, onChange: (value: string) => void) => {
      return (e: ChangeEvent<HTMLInputElement>) => {
        onChange(e.target.value);

        // Clear error message on change
        if (errors[name]?.message) {
          clearErrors(name);
        }
      };
    },
    [clearErrors, errors],
  );

  return (
    <form className="space-y-5" onSubmit={handleSubmit(handleLogin)}>
      <Box className="space-y-10">
        {/* Username Input */}
        <Controller
          name="username"
          control={control}
          render={({
            field: { name, onChange, ...rest },
            fieldState: { error },
          }) => (
            <Input
              {...rest}
              name={name}
              isRequired
              classNames={{
                inputWrapper: 'p-2.5',
                input:
                  'text-lg md:text-xl placeholder:text-lg md:placeholder:text-xl',
                label: 'text-lg md:text-xl',
              }}
              label="Username"
              labelPlacement="outside"
              radius="sm"
              placeholder="Enter your username"
              endContent={
                <Button
                  variant="light"
                  color="default"
                  aria-label="toggle password visibility"
                  className="p-1"
                >
                  <UserIcon customClass="w-4.5 h-4 text-gray-100 cursor-pointer" />
                </Button>
              }
              isInvalid={!!error?.message}
              isDisabled={isLoading}
              errorMessage={error?.message}
              onChange={handleInputChange(name, onChange)}
            />
          )}
        />

        {/* Password Input */}
        <Controller
          name="password"
          control={control}
          render={({
            field: { name, onChange, ...rest },
            fieldState: { error },
          }) => (
            <Input
              {...rest}
              name={name}
              isRequired
              classNames={{
                inputWrapper: 'p-2.5',
                input:
                  'text-lg md:text-xl placeholder:text-lg md:placeholder:text-xl',
                label: 'text-lg md:text-xl',
              }}
              label="Password"
              labelPlacement="outside"
              radius="sm"
              placeholder="Enter your password"
              endContent={
                <Button
                  variant="light"
                  color="default"
                  aria-label="toggle password visibility"
                  className="p-1"
                  onClick={togglePasswordVisibility}
                >
                  {isPasswordVisible ? (
                    <EyeSlashFilledIcon customClass="w-4.5 h-4 text-gray-100 pointer-events-none" />
                  ) : (
                    <EyeFilledIcon customClass="w-4.5 h-4 text-gray-100 pointer-events-none" />
                  )}
                </Button>
              }
              type={isPasswordVisible ? 'text' : 'password'}
              isInvalid={!!error?.message}
              isDisabled={isLoading}
              errorMessage={error?.message}
              onChange={handleInputChange(name, onChange)}
            />
          )}
        />
      </Box>

      {/* Other form fields */}
      <Box className="w-full flex items-center justify-between">
        <Checkbox
          classNames={{ label: 'text-text-default text-lg md:text-xl' }}
        >
          Remember me
        </Checkbox>

        <Link
          to={DESTINATION.FORGOT_PASSWORD}
          className="text-blue-200 font-semibold text-lg hover:underline"
        >
          Forgot your password?
        </Link>
      </Box>

      <Button
        aria-label="Sign in"
        data-testid="login-button"
        type="submit"
        className="w-full font-semibold text-lg tracking-wide text-text-tertiary"
        isDisabled={!isValid || !isDirty}
        isLoading={isLoading}
      >
        Sign in
      </Button>

      <Text customClass="text-text-default text-lg text-center">
        Don't have an account?&nbsp;
        <Link
          to={DESTINATION.SIGN_UP}
          data-testid="register-button"
          className="text-blue-200 font-semibold hover:underline"
        >
          Register here
        </Link>
      </Text>
    </form>
  );
};

const LoginPage = () => {
  return (
    <Container className="font-primary bg-background-primary">
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
            <LoginForm />
          </CardBody>
        </Card>
      </Box>
    </Container>
  );
};

export default LoginPage;