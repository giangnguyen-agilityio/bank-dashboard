import { useEffect, useState } from 'react';
import { Card } from '@nextui-org/react';
import toast from 'react-hot-toast';

// Constants
import { SETTING_TABS, SUCCESS_MESSAGE } from '@app/constants';

// Hooks
import { useAccount } from '@app/hooks';

// Stores
import { useAuthStore } from '@app/stores';

// Interfaces
import { IAccountData, SettingFormData } from '@app/interfaces';

// Components
import { Box, CustomTabs, SecurityForm, SettingForm } from '@app/components';

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
  county: '',
};

const SettingPage = () => {
  const [selected, setSelected] = useState<string | number>(
    SETTING_TABS.EDIT_PROFILE.KEY,
  );
  const [infoField, setInfoField] = useState(defaultValues);

  const { isUpdatingAccount, editAccount } = useAccount();
  const setCredentials = useAuthStore((state) => state.setCredentials);
  const userData = useAuthStore((state) => state.data);
  const { userInfo, exp } = userData || {};

  const handleTabChange = (key: string | number) => {
    setSelected(key);
  };

  const handleSubmit = (data: SettingFormData): void => {
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
  };

  const tabs = [
    {
      key: SETTING_TABS.EDIT_PROFILE.KEY,
      title: SETTING_TABS.EDIT_PROFILE.TITLE,
      tabContent: (
        <Box className="p-5 md:px-6.25 lg:p-7.5">
          <SettingForm
            isLoading={isUpdatingAccount}
            infoField={infoField}
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
          <SecurityForm />
        </Box>
      ),
    },
  ];

  useEffect(() => {
    if (userInfo) {
      setInfoField(userInfo);
    }
  }, [userInfo]);

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
