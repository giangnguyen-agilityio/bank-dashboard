import { render } from '@testing-library/react';

import { Input } from '@app/components';

describe('Input Component', () => {
  it('should render with default variants', () => {
    const { container } = render(<Input />);
    const inputWrapper = container.querySelector('[data-slot="input-wrapper"]');

    expect(inputWrapper).toBeInTheDocument();
    expect(inputWrapper).toHaveClass(
      'border',
      'bg-white-100',
      'rounded-xl',
      'px-5',
      'py-4',
    );
  });

  it('should apply the unset color variant', () => {
    const { container } = render(<Input color="unset" />);
    const inputWrapper = container.querySelector('[data-slot="input-wrapper"]');

    expect(inputWrapper).toHaveClass(
      'bg-blue-10',
      'data-[hover=true]:bg-blue-20',
      'group-data-[focus=true]:border',
      'border-blue-200',
    );
  });

  it('should apply the sm size variant', () => {
    const { container } = render(<Input size="sm" />);
    const inputWrapper = container.querySelector('[data-slot="input-wrapper"]');

    expect(inputWrapper).toHaveClass('px-3.75', 'py-3');
  });

  it('should apply the lg size variant', () => {
    const { container } = render(<Input size="lg" />);
    const inputWrapper = container.querySelector('[data-slot="input-wrapper"]');

    expect(inputWrapper).toHaveClass('px-7.5', 'py-3.75');
  });

  it('should apply the sm radius variant', () => {
    const { container } = render(<Input radius="sm" />);
    const inputWrapper = container.querySelector('[data-slot="input-wrapper"]');

    expect(inputWrapper).toHaveClass('rounded-lg');
  });

  it('should apply the lg radius variant', () => {
    const { container } = render(<Input radius="lg" />);
    const inputWrapper = container.querySelector('[data-slot="input-wrapper"]');

    expect(inputWrapper).toHaveClass('rounded-5xl');
  });

  it('should apply the unset border variant', () => {
    const { container } = render(<Input border="unset" />);
    const inputWrapper = container.querySelector('[data-slot="input-wrapper"]');

    expect(inputWrapper).toHaveClass('shadow-none');
  });

  it('should apply the disabled variant', () => {
    const { container } = render(<Input disabled={true} />);
    const inputElement = container.querySelector('input');

    expect(inputElement).toHaveClass('cursor-not-allowed');
  });

  it('should combine variants correctly', () => {
    const { container } = render(
      <Input color="unset" size="lg" radius="sm" border="unset" />,
    );
    const inputWrapper = container.querySelector('[data-slot="input-wrapper"]');

    expect(inputWrapper).toHaveClass(
      'bg-blue-10',
      'px-7.5',
      'py-3.75',
      'rounded-lg',
      'shadow-none',
    );
  });
});
