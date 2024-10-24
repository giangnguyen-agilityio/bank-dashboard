import { createElement, HTMLAttributes, memo, ReactNode } from 'react';

// Utils
import { cn } from '@app/utils';

interface TextProps extends HTMLAttributes<HTMLParagraphElement> {
  as?: 'p' | 'span' | 'div' | 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
  variant?:
    | 'default'
    | 'primary'
    | 'heading'
    | 'title'
    | 'sidebar'
    | 'description'
    | 'success'
    | 'error';
  size?:
    | 'xs'
    | 'sm'
    | 'base'
    | 'md'
    | 'lg'
    | 'xl'
    | '2xl'
    | '3xl'
    | '4xl'
    | '5xl'
    | '6xl'
    | '7xl'
    | '8xl';
  type?: 'nowrap' | 'wrap';
  customClass?: string;
  children: ReactNode;
}

const VARIANT_CLASSES = {
  default: 'font-primary text-text-default font-normal',
  primary: 'font-primary text-text-primary font-normal',
  heading: 'font-primary text-text-secondary font-semibold',
  title: 'font-primary text-text-primary font-medium',
  sidebar: 'font-primary text-gray-100 font-normal',
  description: 'font-secondary text-text-tertiary font-semibold',
  success: 'font-primary text-text-success font-medium',
  error: 'font-primary text-text-error font-medium',
};

const SIZE_CLASSES = {
  xs: 'text-xs',
  sm: 'text-sm',
  base: 'text-base',
  md: 'text-md',
  lg: 'text-lg',
  xl: 'text-xl',
  '2xl': 'text-2xl',
  '3xl': 'text-3xl',
  '4xl': 'text-4xl',
  '5xl': 'text-5xl',
  '6xl': 'text-6xl',
  '7xl': 'text-7xl',
  '8xl': 'text-8xl',
};

const TYPE_CLASSES = {
  nowrap: 'truncate',
  wrap: 'break-all whitespace-normal',
};

const Text = ({
  as = 'p',
  variant = 'default',
  type = 'nowrap',
  size,
  customClass,
  children,
  ...props
}: TextProps) => {
  if (!children) return null;

  const classes = cn(
    VARIANT_CLASSES[variant],
    size && SIZE_CLASSES[size],
    TYPE_CLASSES[type],
    customClass,
  );

  return createElement(as, { ...props, className: classes }, children);
};

export default memo(Text);
