import { useState } from 'react';
import { Card } from '@nextui-org/react';

// Constants
import { SETTING_TABS } from '@app/constants';

// Components
import { Box, CustomTabs, SecurityForm, SettingForm } from '@app/components';

const SettingPage = () => {
  const [selected, setSelected] = useState<string | number>(
    SETTING_TABS.EDIT_PROFILE.KEY,
  );

  const handleTabChange = (key: string | number) => {
    setSelected(key);
  };

  const tabs = [
    {
      key: SETTING_TABS.EDIT_PROFILE.KEY,
      title: SETTING_TABS.EDIT_PROFILE.TITLE,
      tabContent: (
        <Box className="p-5 md:px-6.25 lg:p-7.5">
          <SettingForm />
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
