import clsx from 'clsx';
import { createElement, memo, ReactNode } from 'react';

export interface ContainerProps
  extends Partial<Omit<HTMLDivElement, 'children'>> {
  children?: ReactNode;
  as?: string;
}

const Container = ({ as = 'div', className = '', ...props }: ContainerProps) =>
  createElement(as, {
    ...props,
    className: clsx('m-auto container', className),
  });

export default memo(Container);
