import { ElementType } from 'react';

// Utils
import { cn } from '@app/utils';

// Components
import { Box } from '@app/components';

interface CustomIconProps {
  IconComponent?: ElementType;
  customClass?: string;
}

const ICON_WRAPPER_CLASS = 'flex justify-center items-center rounded-full';

const CustomIcon = ({ IconComponent, customClass }: CustomIconProps) => (
  <Box
    data-testid="icon-wrapper"
    className={cn(ICON_WRAPPER_CLASS, customClass)}
  >
    {IconComponent && <IconComponent />}
  </Box>
);

export default CustomIcon;
