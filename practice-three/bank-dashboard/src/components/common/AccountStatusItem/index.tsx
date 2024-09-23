import React from 'react';
import clsx from 'clsx';

import { Box, Text } from '@app/components';

interface ItemProps {
  icon: React.ReactNode;
  title: string;
  quantity: number;
  backgroundColor: string;
}

const AccountStatusItem = ({
  icon = null,
  title = 'N/A',
  quantity = 0,
  backgroundColor = 'bg-blue-15',
}: ItemProps) => {
  const iconClass = clsx(
    'rounded-full flex justify-center items-center p-2.5 size-11.25 lg:size-17.5',
    backgroundColor,
  );

  return (
    <Box
      data-testid="account-item-content"
      className="w-42.5 bg-background-default flex justify-center rounded-xl px-3.5 py-5 gap-3 md:rounded-2xl lg:w-63.75 lg:rounded-3xl md:px-4.5 md:py-5.5 lg:px-4.5 lg:py-6.25 md:gap-2.5 lg:gap-3.75"
    >
      <Box data-testid="account-item-icon" className={iconClass}>
        {icon}
      </Box>
      <Box
        data-testid="account-item-info"
        className="flex flex-col h-full gap-1 lg:gap-2"
      >
        <Text
          data-testid="account-item-title"
          variant="primary"
          customClass="font-medium text-base md:text-sm lg:text-2xl"
        >
          {title}
        </Text>
        <Text
          data-testid="account-item-quantity"
          customClass="font-semibold text-2xl lg:text-5xl"
        >
          {quantity}
        </Text>
      </Box>
    </Box>
  );
};

export default AccountStatusItem;
