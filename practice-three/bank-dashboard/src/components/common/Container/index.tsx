import { createElement, memo, ReactNode } from 'react';

// Utils
import { cn } from '@app/utils';

export interface ContainerProps
  extends Partial<Omit<HTMLDivElement, 'children'>> {
  children?: ReactNode;
  as?: string;
}

const Container = ({ as = 'div', className = '', ...props }: ContainerProps) =>
  createElement(as, {
    ...props,
    className: cn('m-auto container', className),
  });

export default memo(Container);
