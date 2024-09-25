import { ElementType } from 'react';
import clsx from 'clsx';

import { Box } from '@app/components';

interface CustomIconProps {
  IconComponent?: ElementType;
  customClass?: string;
}

const ICON_WRAPPER_CLASS = 'flex justify-center items-center rounded-full';

const CustomIcon = ({ IconComponent, customClass }: CustomIconProps) => (
  <Box
    data-testid="icon-wrapper"
    className={clsx(ICON_WRAPPER_CLASS, customClass)}
  >
    {IconComponent && <IconComponent />}
  </Box>
);

export default CustomIcon;
