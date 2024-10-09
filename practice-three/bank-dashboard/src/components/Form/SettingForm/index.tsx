import { ChangeEvent, useCallback } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import toast from 'react-hot-toast';

// Assets
import { LoadingIcon } from '@app/assets';

// Hooks
import { useAccount, useMediaQuery } from '@app/hooks';

// Interfaces
import { IAccountData, SettingFormData } from '@app/interfaces';

// Schemas
import { accountSchema } from '@app/schemas';

// Constants
import { SCREEN_WIDTH, SUCCESS_MESSAGE } from '@app/constants';

// Stores
import { useAuthStore } from '@app/stores';

// Utils
import { getCurrentDate } from '@app/utils';

// Components
import { Avatar, Box, Button, Input } from '@app/components';

const DEFAULT_VALUE: SettingFormData = {
  name: '',
  username: '',
  password: '',
  email: '',
  dateOfBirth: '',
  presentAddress: '',
  permanentAddress: '',
  city: '',
  postalCode: '',
  county: '',
};

const classes = {
  inputContainer:
    'w-full flex flex-col gap-y-4 md:flex-row md:gap-x-6.5 lg:gap-x-9',
  inputBase: 'flex-none md:flex-1',
  inputWrapper:
    'px-3.75 rounded-lg py-3 lg:px-5 lg:py-4 md:rounded-xl lg:min-h-12.5',
  input:
    'font-primary text-md placeholder:text-text-primary lg:text-2xl placeholder:text-md lg:placeholder:text-2xl',
  inputLabel: 'font-primary text-md pb:2.25 lg:pb-2.75 lg:text-2xl',
  errorMessage: 'font-primary text-base lg:text-xl',
};

const SettingForm = () => {
  const {
    control,
    formState: { isValid, isDirty, errors },
    handleSubmit,
    clearErrors,
    reset,
  } = useForm<SettingFormData>({
    mode: 'onBlur',
    reValidateMode: 'onBlur',
    defaultValues: DEFAULT_VALUE,
    resolver: zodResolver(accountSchema),
  });

  const isMobile = useMediaQuery(`(max-width: ${SCREEN_WIDTH.sm})`);

  const { editAccount, isUpdatingAccount } = useAccount();
  const setCredentials = useAuthStore((state) => state.setCredentials);
  const userData = useAuthStore((state) => state.data);
  const { userInfo, exp } = userData || {};

  const handleLogin = (data: SettingFormData) => {
    const newData = {
      ...userInfo,
      ...data,
    } as IAccountData;

    editAccount(newData, {
      onSuccess: () => {
        setCredentials({ users: newData, exp: exp || '' });
        toast.success(SUCCESS_MESSAGE.UPDATE_ACCOUNT);
        reset();
      },
    });
  };

  const handleInputChange = useCallback(
    (name: keyof SettingFormData, onChange: (value: string) => void) => {
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

  return (
    <form className="space-y-5" onSubmit={handleSubmit(handleLogin)}>
      <Box
        aria-label="Form"
        className="form-content flex justify-center items-center flex-col md:items-start md:flex-row space-y-5.25 md:space-y-0 md:space-x-11.25 lg:space-x-13"
      >
        <Box
          className="upload-image-field cursor-pointer"
          title="Image upload is not available in this version"
        >
          <Avatar
            isEdit
            size={isMobile ? '3xl' : '2xl'}
            customClass="text-white-100"
          />
        </Box>
        <Box className="w-full flex flex-wrap flex-col gap-4 md:flex-row lg:gap-5.5">
          <div className={classes.inputContainer}>
            {/* Name Input */}
            <Controller
              name="name"
              control={control}
              render={({
                field: { name, onChange, ...rest },
                fieldState: { error },
              }) => (
                <Input
                  {...rest}
                  aria-label="Name input field"
                  data-testid="name-input"
                  name={name}
                  isRequired
                  classNames={{
                    base: classes.inputBase,
                    inputWrapper: classes.inputWrapper,
                    input: classes.input,
                    label: classes.inputLabel,
                    errorMessage: classes.errorMessage,
                  }}
                  label="Name"
                  labelPlacement="outside"
                  radius="none"
                  autoComplete="off"
                  placeholder="Enter your name"
                  isInvalid={!!error?.message}
                  isDisabled={isUpdatingAccount}
                  errorMessage={error?.message}
                  onChange={handleInputChange(name, onChange)}
                />
              )}
            />

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
                  aria-label="Username input field"
                  data-testid="username-input"
                  name={name}
                  isRequired
                  classNames={{
                    base: classes.inputBase,
                    inputWrapper: classes.inputWrapper,
                    input: classes.input,
                    label: classes.inputLabel,
                    errorMessage: classes.errorMessage,
                  }}
                  label="Username"
                  labelPlacement="outside"
                  radius="none"
                  autoComplete="off"
                  placeholder="Enter your username"
                  isInvalid={!!error?.message}
                  isDisabled={isUpdatingAccount}
                  errorMessage={error?.message}
                  onChange={handleInputChange(name, onChange)}
                />
              )}
            />
          </div>

          <div className={classes.inputContainer}>
            {/* Email Input */}
            <Controller
              name="email"
              control={control}
              render={({
                field: { name, onChange, ...rest },
                fieldState: { error },
              }) => (
                <Input
                  {...rest}
                  aria-label="Email input field"
                  data-testid="email-input"
                  name={name}
                  isRequired
                  classNames={{
                    base: classes.inputBase,
                    inputWrapper: classes.inputWrapper,
                    input: classes.input,
                    label: classes.inputLabel,
                    errorMessage: classes.errorMessage,
                  }}
                  label="Email"
                  labelPlacement="outside"
                  radius="none"
                  autoComplete="off"
                  placeholder="Enter your email"
                  isInvalid={!!error?.message}
                  isDisabled={isUpdatingAccount}
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
                  label="Password"
                  labelPlacement="outside"
                  radius="none"
                  autoComplete="off"
                  placeholder="Enter your password"
                  isInvalid={!!error?.message}
                  isDisabled={isUpdatingAccount}
                  errorMessage={error?.message}
                  onChange={handleInputChange(name, onChange)}
                />
              )}
            />
          </div>

          <div className={classes.inputContainer}>
            {/* Date Of Birth Input */}
            <Controller
              name="dateOfBirth"
              control={control}
              render={({
                field: { name, onChange, ...rest },
                fieldState: { error },
              }) => (
                <Input
                  {...rest}
                  type="date"
                  aria-label="Date of birth input field"
                  data-testid="date-of-birth-input"
                  name={name}
                  // isRequired
                  classNames={{
                    base: classes.inputBase,
                    inputWrapper: classes.inputWrapper,
                    input: classes.input,
                    label: classes.inputLabel,
                    errorMessage: classes.errorMessage,
                  }}
                  max={getCurrentDate()}
                  label="Date Of Birth"
                  labelPlacement="outside"
                  radius="none"
                  autoComplete="off"
                  placeholder="Enter your date of birth"
                  isInvalid={!!error?.message}
                  isDisabled={isUpdatingAccount}
                  errorMessage={error?.message}
                  onChange={handleInputChange(name, onChange)}
                />
              )}
            />

            {/* Present Address Input */}
            <Controller
              name="presentAddress"
              control={control}
              render={({
                field: { name, onChange, ...rest },
                fieldState: { error },
              }) => (
                <Input
                  {...rest}
                  aria-label="Present address input field"
                  data-testid="present-address-input"
                  name={name}
                  isRequired
                  classNames={{
                    base: classes.inputBase,
                    inputWrapper: classes.inputWrapper,
                    input: classes.input,
                    label: classes.inputLabel,
                    errorMessage: classes.errorMessage,
                  }}
                  label="Present Address"
                  labelPlacement="outside"
                  radius="none"
                  autoComplete="off"
                  placeholder="Enter your present address"
                  isInvalid={!!error?.message}
                  isDisabled={isUpdatingAccount}
                  errorMessage={error?.message}
                  onChange={handleInputChange(name, onChange)}
                />
              )}
            />
          </div>

          <div className={classes.inputContainer}>
            {/* Permanent Address Input */}
            <Controller
              name="permanentAddress"
              control={control}
              render={({
                field: { name, onChange, ...rest },
                fieldState: { error },
              }) => (
                <Input
                  {...rest}
                  aria-label="Permanent address input field"
                  data-testid="permanent-address-input"
                  name={name}
                  isRequired
                  classNames={{
                    base: classes.inputBase,
                    inputWrapper: classes.inputWrapper,
                    input: classes.input,
                    label: classes.inputLabel,
                    errorMessage: classes.errorMessage,
                  }}
                  label="Permanent Address"
                  labelPlacement="outside"
                  radius="none"
                  autoComplete="off"
                  placeholder="Enter your permanent address"
                  isInvalid={!!error?.message}
                  isDisabled={isUpdatingAccount}
                  errorMessage={error?.message}
                  onChange={handleInputChange(name, onChange)}
                />
              )}
            />

            {/* City Input */}
            <Controller
              name="city"
              control={control}
              render={({
                field: { name, onChange, ...rest },
                fieldState: { error },
              }) => (
                <Input
                  {...rest}
                  aria-label="City input field"
                  data-testid="city-input"
                  name={name}
                  isRequired
                  classNames={{
                    base: classes.inputBase,
                    inputWrapper: classes.inputWrapper,
                    input: classes.input,
                    label: classes.inputLabel,
                    errorMessage: classes.errorMessage,
                  }}
                  label="City"
                  labelPlacement="outside"
                  radius="none"
                  autoComplete="off"
                  placeholder="Enter your city"
                  isInvalid={!!error?.message}
                  isDisabled={isUpdatingAccount}
                  errorMessage={error?.message}
                  onChange={handleInputChange(name, onChange)}
                />
              )}
            />
          </div>

          <div className={classes.inputContainer}>
            {/* Postal code Input */}
            <Controller
              name="postalCode"
              control={control}
              render={({
                field: { name, onChange, ...rest },
                fieldState: { error },
              }) => (
                <Input
                  {...rest}
                  aria-label="Postal code input field"
                  data-testid="postal-code-input"
                  name={name}
                  isRequired
                  classNames={{
                    base: classes.inputBase,
                    inputWrapper: classes.inputWrapper,
                    input: classes.input,
                    label: classes.inputLabel,
                    errorMessage: classes.errorMessage,
                  }}
                  label="Postal Code"
                  labelPlacement="outside"
                  radius="none"
                  autoComplete="off"
                  placeholder="Enter your postal code"
                  isInvalid={!!error?.message}
                  isDisabled={isUpdatingAccount}
                  errorMessage={error?.message}
                  onChange={handleInputChange(name, onChange)}
                />
              )}
            />

            {/* Country Input */}
            <Controller
              name="county"
              control={control}
              render={({
                field: { name, onChange, ...rest },
                fieldState: { error },
              }) => (
                <Input
                  {...rest}
                  aria-label="Country input field"
                  data-testid="country-input"
                  name={name}
                  isRequired
                  classNames={{
                    base: classes.inputBase,
                    inputWrapper: classes.inputWrapper,
                    input: classes.input,
                    label: classes.inputLabel,
                    errorMessage: classes.errorMessage,
                  }}
                  label="Country"
                  labelPlacement="outside"
                  radius="none"
                  autoComplete="off"
                  placeholder="Enter your country"
                  isInvalid={!!error?.message}
                  isDisabled={isUpdatingAccount}
                  errorMessage={error?.message}
                  onChange={handleInputChange(name, onChange)}
                />
              )}
            />
          </div>
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
          className="w-full h-10 font-semibold text-xl tracking-wide text-text-tertiary lg:text-4xl lg:h-12.5 md:w-32.5 lg:w-47.75"
          isDisabled={!isValid || !isDirty || isUpdatingAccount}
          isLoading={isUpdatingAccount}
          spinner={<LoadingIcon />}
        >
          Save
        </Button>
      </Box>
    </form>
  );
};

export default SettingForm;
