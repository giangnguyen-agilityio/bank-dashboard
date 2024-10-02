import { ChangeEvent, useCallback } from 'react';
import { Link } from '@tanstack/react-router';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Checkbox, useDisclosure } from '@nextui-org/react';

// Assets
import { EyeFilledIcon, EyeSlashFilledIcon, UserIcon } from '@app/assets';

// Hooks
import { useAuth } from '@app/hooks';

// Interfaces
import { LoginFormData } from '@app/interfaces';

// Constants
import { DESTINATION } from '@app/constants';

// Schemas
import { loginSchema } from '@app/schemas';

// Components
import { Box, Button, Input, Text } from '@app/components';

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

  const { mutate } = useAuth();

  const handleLogin = (data: LoginFormData) => {
    mutate(data);
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

export default LoginForm;