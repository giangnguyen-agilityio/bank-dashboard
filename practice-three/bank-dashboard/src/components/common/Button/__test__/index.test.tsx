import { render } from '@testing-library/react';

import { Button } from '@app/components';

describe('Button Component', () => {
  it('should render with default color and size variants', () => {
    const { container } = render(<Button>Default Button</Button>);
    const buttonElement = container.querySelector('button');

    expect(buttonElement).toBeInTheDocument();
    expect(buttonElement).toHaveClass(
      'bg-background-secondary',
      'text-text-tertiary',
      'min-w-0',
      'w-auto',
      'h-auto',
      'p-3.25',
    );
  });

  it('should apply the bold variant', () => {
    const { container } = render(<Button variant="bold">Bold Button</Button>);
    const buttonElement = container.querySelector('button');

    expect(buttonElement).toHaveClass(
      'font-primary',
      'font-semibold',
      'border-transparent',
    );
  });

  it('should apply the circle variant', () => {
    const { container } = render(
      <Button variant="circle">Circle Button</Button>,
    );
    const buttonElement = container.querySelector('button');

    expect(buttonElement).toHaveClass(
      'font-primary',
      'font-medium',
      'rounded-5xl',
    );
  });

  it('should apply the outline variant', () => {
    const { container } = render(
      <Button variant="outline">Outline Button</Button>,
    );
    const buttonElement = container.querySelector('button');

    expect(buttonElement).toHaveClass(
      'outline-gray-150',
      'font-primary',
      'font-medium',
      'rounded-md',
    );
  });

  it('should apply the disabled variant', () => {
    const { container } = render(
      <Button disabled={true}>Disabled Button</Button>,
    );
    const buttonElement = container.querySelector('button');

    expect(buttonElement).toHaveClass(
      'bg-transparent',
      'text-gray-150',
      'cursor-not-allowed',
    );
  });

  it('should apply the tiny size variant', () => {
    const { container } = render(<Button size="tiny">Tiny Button</Button>);
    const buttonElement = container.querySelector('button');

    expect(buttonElement).toHaveClass(
      'px-3',
      'py-1.75',
      'min-w-0',
      'w-auto',
      'h-auto',
    );
  });

  it('should apply the 2xl size variant', () => {
    const { container } = render(<Button size="2xl">2XL Button</Button>);
    const buttonElement = container.querySelector('button');

    expect(buttonElement).toHaveClass(
      'px-31.25',
      'py-2.75',
      'min-w-0',
      'w-auto',
      'h-auto',
    );
  });

  it('should combine variants correctly', () => {
    const { container } = render(
      <Button variant="circle" color="secondary" size="lg">
        Custom Button
      </Button>,
    );
    const buttonElement = container.querySelector('button');

    expect(buttonElement).toHaveClass(
      'font-primary',
      'font-medium',
      'rounded-5xl',
      'bg-background-primary',
      'px-12',
      'py-3',
    );
  });
});
