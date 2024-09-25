import React, { ElementType } from 'react';
import clsx from 'clsx';

import { Box } from '@app/components';

interface TransactionIconProps {
  IconComponent: ElementType;
  bgColorClass: string;
}

const ICON_WRAPPER_CLASS =
  'flex justify-center items-center rounded-full size-12.5 md:size-10 lg:size-14';

const TransactionIcon: React.FC<TransactionIconProps> = ({
  IconComponent,
  bgColorClass,
}) => (
  <Box
    data-testid="icon-wrapper"
    className={clsx(ICON_WRAPPER_CLASS, bgColorClass)}
  >
    <IconComponent />
  </Box>
);

export default TransactionIcon;
