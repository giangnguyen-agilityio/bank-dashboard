import { extendVariants, Button as NextUIButton } from '@nextui-org/react';
import { memo } from 'react';

const Button = extendVariants(NextUIButton, {
  variants: {
    variant: {
      bold: 'border-transparent font-primary font-semibold',
      circle: 'font-primary font-medium rounded-5xl',
      outline: 'outline-gray-150 font-primary font-medium rounded-md',
    },
    color: {
      default: 'bg-transparent text-text-secondary dark:text-text-default',
      primary: 'bg-background-secondary text-text-tertiary',
      secondary: 'bg-background-primary',
    },
    disabled: {
      true: 'bg-transparent text-gray-150 cursor-not-allowed',
    },
    size: {
      unset: 'min-w-0 w-auto h-auto p-3.25',
      tiny: 'min-w-0 w-auto h-auto px-3 py-1.75',
      xs: 'min-w-0 w-auto h-auto px-5.25 py-3',
      sm: 'min-w-0 w-auto h-auto px-6.25 py-3.75',
      md: 'min-w-0 w-auto h-auto px-6 py-4',
      lg: 'min-w-0 w-auto h-auto px-12 py-3',
      xl: 'min-w-0 w-auto h-auto px-18.5 py-3.5',
      '2xl': 'min-w-0 w-auto h-auto px-31.25 py-2.75',
    },
  },
  defaultVariants: {
    color: 'primary',
    size: 'unset',
  },
});

export default memo(Button);
