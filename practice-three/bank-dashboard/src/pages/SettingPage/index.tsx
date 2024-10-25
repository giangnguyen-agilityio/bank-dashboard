import { lazy, Suspense, useCallback, useMemo, useState } from 'react';
import { Card } from '@nextui-org/react';
import toast from 'react-hot-toast';
import { useShallow } from 'zustand/react/shallow';

// Constants
import { SETTING_TABS, SUCCESS_MESSAGE } from '@app/constants';

// Hooks
import { useAccount } from '@app/hooks';

// Stores
import { useAuthStore } from '@app/stores';

// Interfaces
import { IAccountData, SettingFormData } from '@app/interfaces';

// Icons
import { LoadingIcon } from '@app/assets';

// Components
import { Box, CustomTabs, SettingForm, Text } from '@app/components';

const SecurityForm = lazy(() => import('@app/components/Form/SecurityForm'));

const defaultValues: SettingFormData = {
  name: '',
  username: '',
  password: '',
  email: '',
  dateOfBirth: '',
  presentAddress: '',
  permanentAddress: '',
  city: '',
  postalCode: '',
  country: '',
};

const SettingPage = () => {
  const [selected, setSelected] = useState<string | number>(
    SETTING_TABS.EDIT_PROFILE.KEY,
  );

  const { isUpdatingAccount, editAccount } = useAccount();
  const setCredentials = useAuthStore(
    useShallow((state) => state.setCredentials),
  );
  const userData = useAuthStore(useShallow((state) => state.data));
  const { userInfo, exp } = userData || {};

  const handleTabChange = (key: string | number) => {
    setSelected(key);
  };

  const handleSubmit = useCallback(
    (data: SettingFormData): void => {
      const newData = {
        ...userInfo,
        ...data,
      } as IAccountData;

      editAccount(newData, {
        onSuccess: () => {
          setCredentials({ users: newData, exp: exp || '' });
          toast.success(SUCCESS_MESSAGE.UPDATE_ACCOUNT);
        },
      });
    },
    [userInfo, exp, editAccount, setCredentials],
  );

  const tabs = useMemo(
    () => [
      {
        key: SETTING_TABS.EDIT_PROFILE.KEY,
        title: SETTING_TABS.EDIT_PROFILE.TITLE,
        tabContent: (
          <Box className="p-5 md:px-6.25 lg:p-7.5">
            <SettingForm
              isLoading={isUpdatingAccount}
              infoField={userInfo || defaultValues}
              onSubmit={handleSubmit}
            />
          </Box>
        ),
      },
      {
        key: SETTING_TABS.SECURITY.KEY,
        title: SETTING_TABS.SECURITY.TITLE,
        tabContent: (
          <Box className="p-5 md:px-6.25 lg:p-7.5">
            <Suspense
              fallback={
                <Box className="flex justify-center items-center gap-2">
                  <Text>Loading form, please wait...</Text>
                  <LoadingIcon />
                </Box>
              }
            >
              <SecurityForm />
            </Suspense>
          </Box>
        ),
      },
    ],
    [isUpdatingAccount, userInfo, handleSubmit],
  );

  return (
    <Card className="min-h-fit shadow-none rounded-xl md:rounded-2xl lg:rounded-3xl py-5.5 px-5 md:py-6.25 md:px-6.25 lg:py-5.5 lg:px-7.5">
      <CustomTabs
        aria-label="Setting tabs"
        tabs={tabs}
        selectedKey={selected}
        onSelectionChange={handleTabChange}
      />
    </Card>
  );
};

export default SettingPage;
