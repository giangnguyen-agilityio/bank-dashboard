import { Key, memo, ReactNode } from 'react';
import {
  Dropdown as DropdownNextUI,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
} from '@nextui-org/react';

// Assets
import { MoreVerticalIcon } from '@app/assets';

// Utils
import { cn } from '@app/utils';

// Components
import { Text } from '@app/components';

interface DropdownProps {
  options: Array<{
    key: string;
    icon?: ReactNode;
    isDisabled?: boolean;
    className?: string;
    onAction: () => void;
  }>;
}

const Dropdown = ({ options }: DropdownProps) => {
  const disabledKeys = options
    .filter(({ isDisabled }) => isDisabled)
    .map(({ key }) => key);

  const handleAction = (key: Key) => {
    const option = options.find((option) => option.key === key);

    return option?.onAction();
  };

  return (
    <DropdownNextUI
      role="dialog"
      aria-label="More actions"
      data-testid="dropdown"
      classNames={{ content: 'min-w-25 md:min-w-27.5' }}
    >
      <DropdownTrigger aria-label="More actions button">
        <button>
          <MoreVerticalIcon />
        </button>
      </DropdownTrigger>

      <DropdownMenu
        aria-label="More actions menu"
        disabledKeys={disabledKeys}
        onAction={handleAction}
      >
        {options.map(({ key, className, icon }) => (
          <DropdownItem
            key={key}
            aria-label={`${key} button`}
            className={className}
            startContent={icon}
          >
            <Text
              variant="title"
              customClass={cn(
                'font-primary capitalize font-semibold text-lg lg:text-2xl',
                className,
              )}
            >
              {key}
            </Text>
          </DropdownItem>
        ))}
      </DropdownMenu>
    </DropdownNextUI>
  );
};

export default memo(Dropdown);
