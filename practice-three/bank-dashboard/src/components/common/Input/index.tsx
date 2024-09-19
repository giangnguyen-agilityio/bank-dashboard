import { extendVariants, Input as NextUIInput } from '@nextui-org/react';

const Input = extendVariants(NextUIInput, {
  variants: {
    color: {
      unset: {
        inputWrapper: [
          'bg-blue-10',
          'data-[hover=true]:bg-blue-20',
          'group-data-[focus=true]:border border-blue-200',
          'group-data-[focus=true]:bg-blue-20',
        ],
      },
      default: {
        inputWrapper: [
          'bg-white-100 border-blue-25',
          'data-[hover=true]:bg-blue-10',
          'group-data-[focus=true]:border group-data-[focus=true]:border-blue-200',
          'group-data-[focus=true]:bg-blue-10',
        ],
      },
    },

    size: {
      sm: {
        inputWrapper: 'h-auto px-3.75 py-3',
        errorMessage: 'text-base text-red-100',
      },
      md: {
        inputWrapper: 'h-auto px-5 py-4',
      },
      lg: {
        inputWrapper: 'h-auto px-7.5 py-3.75',
        errorMessage: 'text-xl text-red-100',
      },
    },

    radius: {
      sm: {
        inputWrapper: 'rounded-lg',
      },
      md: {
        inputWrapper: 'rounded-xl',
      },
      lg: {
        inputWrapper: 'rounded-5xl',
      },
    },

    border: {
      unset: {
        inputWrapper: 'shadow-none',
      },
      default: {
        inputWrapper: 'border',
      },
    },
  },
  defaultVariants: {
    border: 'default',
    color: 'default',
    radius: 'md',
    size: 'md',
  },
});

export default Input;
