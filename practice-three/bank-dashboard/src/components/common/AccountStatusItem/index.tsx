import { ElementType } from 'react';

// Utils
import { cn } from '@app/utils';

// Component
import { Box, Text, CustomIcon } from '@app/components';

interface ItemProps {
  icon?: ElementType;
  title?: string;
  quantity?: number;
  backgroundColor?: string;
}

const AccountStatusItem = ({
  icon,
  title = 'N/A',
  quantity = 0,
  backgroundColor = 'bg-blue-15',
}: ItemProps) => {
  const iconClass = cn('p-2.5 size-11.25 lg:size-17.5', backgroundColor);

  return (
    <Box
      data-testid="account-item-content"
      className="w-42.5 bg-background-default flex justify-center rounded-xl px-3.5 py-5 gap-3 md:rounded-2xl lg:w-63.75 lg:rounded-3xl md:px-4.5 md:py-5.5 lg:px-4.5 lg:py-6.25 md:gap-2.5 lg:gap-3.75"
    >
      <CustomIcon
        aria-label={`${title} icon`}
        data-testid="account-item-icon"
        IconComponent={icon}
        customClass={iconClass}
      />
      <Box
        aria-label={`${title} information`}
        data-testid="account-item-info"
        className="flex flex-col h-full gap-1 lg:gap-2"
      >
        <Text
          aria-label={title}
          data-testid="account-item-title"
          variant="title"
          customClass="text-base md:text-sm lg:text-2xl"
        >
          {title}
        </Text>
        <Text
          aria-label={`${title} quantity`}
          data-testid="account-item-quantity"
          customClass="font-semibold text-2xl lg:text-5xl"
        >
          {String(quantity)}
        </Text>
      </Box>
    </Box>
  );
};

export default AccountStatusItem;
