import { memo } from 'react';
import { Switch as SwitchNextUI } from '@nextui-org/react';

// Icons
import { MoonIcon, SunIcon } from '@app/assets';

// Hooks
import { useColorMode } from '@app/hooks';

const Switch = () => {
  const { isDarkMode, handleToggleTheme } = useColorMode();

  return (
    <SwitchNextUI
      defaultSelected
      size="lg"
      color="primary"
      thumbIcon={({ isSelected, className }) =>
        isSelected ? (
          <SunIcon customClass={className} />
        ) : (
          <MoonIcon customClass={className} />
        )
      }
      isSelected={isDarkMode}
      onValueChange={() => handleToggleTheme()}
    />
  );
};

export default memo(Switch);
