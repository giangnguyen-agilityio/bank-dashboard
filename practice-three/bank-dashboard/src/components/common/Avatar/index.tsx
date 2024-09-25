import { memo } from 'react';
import {
  Avatar as AvatarNextUI,
  AvatarProps as AvatarNextUIProps,
} from '@nextui-org/react';

// Icons
import { EditIcon } from '@app/assets';

// Utils
import { cn } from '@app/utils';

interface AvatarProps extends Omit<AvatarNextUIProps, 'size'> {
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl';
  customClass?: string;
  hasBorder?: boolean;
  isEdit?: boolean;
}

const SIZE_CLASSES = {
  xs: 'w-8.75 h-8.75',
  sm: 'w-12.5 h-12.5',
  md: 'w-15 h-15',
  lg: 'w-17.5 h-17.5',
  xl: 'w-27.5 h-27.5',
  '2xl': 'w-32.5 h-32.5',
  '3xl': 'w-42.5 h-42.5',
};

const getIconSize = (size: AvatarProps['size']) => {
  switch (size) {
    case 'xl':
      return 'w-6.25 h-6.25';
    case '2xl':
      return 'w-7.5 h-7.5';
    case '3xl':
      return 'w-10 h-10';
    default:
      return '';
  }
};

const Avatar = ({
  color,
  customClass = '',
  size = 'md',
  hasBorder = false,
  isEdit = false,
  ...rest
}: AvatarProps) => {
  const sizeClass = SIZE_CLASSES[size];
  const className = cn(
    sizeClass,
    hasBorder && `border-2 border-${color} border-opacity-25`,
    customClass,
  );
  const classNames = {
    base: className,
  };
  const iconSizeClass = getIconSize(size);
  const isShowIcon =
    isEdit && (size === 'xl' || size === '2xl' || size === '3xl');

  return (
    <div className="avatar-container relative inline-block">
      <AvatarNextUI classNames={classNames} data-testid="avatar" {...rest} />
      {isShowIcon && (
        <div className="absolute bottom-3.75 right-0" data-testid="icon">
          <div
            className={cn(
              'flex justify-center items-center rounded-full bg-background-secondary ',
              iconSizeClass,
            )}
            aria-label="Edit Avatar Icon"
          >
            <EditIcon />
          </div>
        </div>
      )}
    </div>
  );
};

export default memo(Avatar);
