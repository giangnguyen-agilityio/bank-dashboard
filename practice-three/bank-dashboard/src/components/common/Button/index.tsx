import { extendVariants, Button as NextUIButton } from '@nextui-org/react';
import { memo } from 'react';

const Button = extendVariants(NextUIButton, {
  variants: {
    variant: {
      circle: 'font-primary font-medium rounded-5xl',
      outline: 'outline-gray-150 font-primary font-medium rounded-md',
    },
    color: {
      default: 'bg-transparent text-blue-100',
      primary: 'bg-background-tertiary text-text-tertiary',
      secondary: 'bg-white-300',
    },
    disabled: {
      true: 'bg-transparent text-gray-150 cursor-not-allowed',
    },
    isIconOnly: {
      true: 'bg-background-primary',
    },
    size: {
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
    variant: 'light',
  },
});

export default memo(Button);
