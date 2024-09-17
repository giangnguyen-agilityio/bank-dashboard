import { createElement, HTMLAttributes } from 'react';

export interface BoxProps extends HTMLAttributes<HTMLDivElement> {
  as?: string;
}

export const Box = ({ as = 'div', children, ...props }: BoxProps) =>
  createElement(as, props, children);
