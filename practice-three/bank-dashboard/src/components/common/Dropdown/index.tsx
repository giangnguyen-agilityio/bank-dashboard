import { memo, ReactNode } from 'react';
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
  id: string;
  actions: Array<{
    key: string;
    icon?: ReactNode;
    className?: string;
  }>;
  onAction?: (id: string) => void;
}

const Dropdown = ({ id, actions, onAction }: DropdownProps) => {
  const handleAction = () => {
    onAction?.(id);
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

      <DropdownMenu aria-label="More actions menu" onAction={handleAction}>
        {actions.map((action) => (
          <DropdownItem
            key={action.key}
            aria-label={`${action.key} button`}
            className={action.className}
            startContent={action.icon}
          >
            <Text
              variant="title"
              customClass={cn(
                'font-primary capitalize font-semibold text-lg lg:text-2xl',
                action.className,
              )}
            >
              {action.key}
            </Text>
          </DropdownItem>
        ))}
      </DropdownMenu>
    </DropdownNextUI>
  );
};

export default memo(Dropdown);
