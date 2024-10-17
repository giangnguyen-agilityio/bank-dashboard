import { ChangeEvent, useState, useCallback, useEffect } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import toast from 'react-hot-toast';
import { useShallow } from 'zustand/react/shallow';

// Interfaces
import { IAccountData, SecurityFormData } from '@app/interfaces';

// Schemas
import { settingSchema } from '@app/schemas';

// Icons
import { EyeSlashFilledIcon, EyeFilledIcon, LoadingIcon } from '@app/assets';

// Stores
import { useAuthStore } from '@app/stores';

// Constants
import {
  SECRET_KEY,
  SUCCESS_MESSAGE,
  VALIDATION_MESSAGES,
} from '@app/constants';

// Utils
import { cn, decryptString } from '@app/utils';

// Hooks
import { useAccount } from '@app/hooks';

// Components
import { Box, Button, Input, Text } from '@app/components';

const DEFAULT_VALUE = {
  password: '',
  newPassword: '',
};

const classes = {
  inputBase: 'w-full md:w-1/2',
  inputWrapper:
    'px-3.75 rounded-lg py-3 lg:px-5 lg:py-4 md:rounded-xl lg:min-h-12.5',
  input:
    'font-primary text-md placeholder:text-text-primary lg:text-2xl placeholder:text-md lg:placeholder:text-2xl',
  inputLabel: 'font-primary text-md pb:2.25 lg:pb-2.75 lg:text-2xl',
  errorMessage: 'font-primary text-base lg:text-xl',
};

const SecurityForm = () => {
  const {
    control,
    formState: { isValid, isDirty, errors },
    handleSubmit,
    clearErrors,
    setError,
    watch,
    reset,
  } = useForm<SecurityFormData>({
    mode: 'onBlur',
    reValidateMode: 'onBlur',
    defaultValues: DEFAULT_VALUE,
    resolver: zodResolver(settingSchema),
  });

  const [passwordVisibility, setPasswordVisibility] = useState({
    isPasswordVisible: false,
    isNewPasswordVisible: false,
  });

  const { editAccount, isUpdatingAccount: isUpdatingPassword } = useAccount();
  const setCredentials = useAuthStore(
    useShallow((state) => state.setCredentials),
  );
  const userData = useAuthStore(useShallow((state) => state.data));
  const { userInfo, exp } = userData || {};

  const encryptedPassword = userInfo?.password || '';
  const decryptedPassword = decryptString(encryptedPassword, SECRET_KEY);

  const currentPassword = watch('password');
  const newPassword = watch('newPassword');

  // Toggle visibility for passwords
  const handleTogglePasswordVisibility = useCallback(() => {
    setPasswordVisibility((prevState) => ({
      ...prevState,
      isPasswordVisible: !prevState.isPasswordVisible,
    }));
  }, []);

  const handleToggleNewPasswordVisibility = useCallback(() => {
    setPasswordVisibility((prevState) => ({
      ...prevState,
      isNewPasswordVisible: !prevState.isNewPasswordVisible,
    }));
  }, []);

  const handleInputChange = useCallback(
    (name: keyof SecurityFormData, onChange: (value: string) => void) => {
      return (e: ChangeEvent<HTMLInputElement>) => {
        onChange(e.target.value);

        // Clear error message on change
        if (errors[name]?.message) {
          clearErrors(name);
        }
      };
    },
    [errors, clearErrors],
  );

  const handleUpdatePassword = (data: SecurityFormData) => {
    if (currentPassword && currentPassword !== decryptedPassword) {
      setError('password', {
        message: VALIDATION_MESSAGES.PASSWORD.NOT_MATCH,
      });

      return;
    }

    const newData = {
      ...userInfo,
      password: data.newPassword,
    } as IAccountData;

    editAccount(newData, {
      onSuccess: () => {
        setCredentials({ users: newData, exp: exp || '' });
        toast.success(SUCCESS_MESSAGE.UPDATE_PASSWORD);
        reset();
      },
    });
  };

  useEffect(() => {
    if (newPassword && newPassword !== currentPassword) {
      clearErrors('newPassword');
    }
  }, [currentPassword, newPassword, clearErrors]);

  return (
    <form className="space-y-5" onSubmit={handleSubmit(handleUpdatePassword)}>
      <Box
        aria-label="Form"
        className="form-content flex justify-center items-center flex-col space-y-3.5 lg:space-y-4"
      >
        <Text customClass="w-full font-medium text-blue-100 text-lg lg:text-3xl">
          Change Password
        </Text>

        <Box className="w-full flex flex-wrap flex-col gap-4 lg:gap-5.5">
          {/* Current Password */}
          <Controller
            name="password"
            control={control}
            render={({
              field: { name, onChange, ...rest },
              fieldState: { error },
            }) => (
              <Input
                {...rest}
                aria-label="Password input field"
                data-testid="password-input"
                name={name}
                isRequired
                classNames={{
                  base: classes.inputBase,
                  inputWrapper: classes.inputWrapper,
                  input: classes.input,
                  label: classes.inputLabel,
                  errorMessage: classes.errorMessage,
                }}
                label="Current Password"
                labelPlacement="outside"
                radius="none"
                autoComplete="off"
                placeholder="*********"
                isInvalid={!!error?.message}
                isDisabled={isUpdatingPassword}
                errorMessage={error?.message}
                endContent={
                  <Button
                    variant="light"
                    color="default"
                    aria-label="toggle password visibility"
                    className="p-1"
                    onClick={handleTogglePasswordVisibility}
                  >
                    {passwordVisibility.isPasswordVisible ? (
                      <EyeSlashFilledIcon customClass="w-4.5 h-4 text-gray-100 pointer-events-none" />
                    ) : (
                      <EyeFilledIcon customClass="w-4.5 h-4 text-gray-100 pointer-events-none" />
                    )}
                  </Button>
                }
                type={
                  passwordVisibility.isPasswordVisible ? 'text' : 'password'
                }
                onChange={handleInputChange(name, onChange)}
              />
            )}
          />

          {/* New Password Input */}
          <Controller
            name="newPassword"
            control={control}
            render={({
              field: { name, onChange, ...rest },
              fieldState: { error },
            }) => (
              <Input
                {...rest}
                aria-label="New password input field"
                data-testid="new-password-input"
                name={name}
                isRequired
                classNames={{
                  base: classes.inputBase,
                  inputWrapper: classes.inputWrapper,
                  input: classes.input,
                  label: classes.inputLabel,
                  errorMessage: classes.errorMessage,
                }}
                label="New Password"
                labelPlacement="outside"
                radius="none"
                autoComplete="off"
                placeholder="*********"
                isInvalid={!!error?.message}
                isDisabled={isUpdatingPassword}
                errorMessage={error?.message}
                endContent={
                  <Button
                    variant="light"
                    color="default"
                    aria-label="toggle new password visibility"
                    className="p-1"
                    onClick={handleToggleNewPasswordVisibility}
                  >
                    {passwordVisibility.isNewPasswordVisible ? (
                      <EyeSlashFilledIcon customClass="w-4.5 h-4 text-gray-100 pointer-events-none" />
                    ) : (
                      <EyeFilledIcon customClass="w-4.5 h-4 text-gray-100 pointer-events-none" />
                    )}
                  </Button>
                }
                type={
                  passwordVisibility.isNewPasswordVisible ? 'text' : 'password'
                }
                onChange={handleInputChange(name, onChange)}
              />
            )}
          />
        </Box>
      </Box>

      <Box
        aria-label="Form action"
        className="form-action w-full flex justify-end"
      >
        <Button
          isIconOnly
          type="submit"
          aria-label="Save button"
          data-testid="save-button"
          className={cn(
            'w-full h-10 lg:h-12.5 md:w-32.5 lg:w-47.75',
            'font-semibold text-xl tracking-wide text-text-tertiary lg:text-4xl',
          )}
          isDisabled={!isValid || !isDirty}
          isLoading={isUpdatingPassword}
          spinner={<LoadingIcon />}
        >
          Save
        </Button>
      </Box>
    </form>
  );
};

export default SecurityForm;
