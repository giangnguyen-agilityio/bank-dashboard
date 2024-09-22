import { render } from '@testing-library/react';

import { Text } from '@app/components';

describe('Text Component', () => {
  it('should render with default props', () => {
    const { container } = render(<Text>Default Text</Text>);
    const textElement = container.querySelector('p');

    expect(textElement).toBeInTheDocument();
    expect(textElement).toHaveClass(
      'font-primary text-text-default font-regular',
    );
    expect(textElement).toHaveClass('truncate');
  });

  it('should render with a custom tag', () => {
    const { container } = render(<Text as="span">Span Text</Text>);
    const textElement = container.querySelector('span');

    expect(textElement).toBeInTheDocument();
    expect(textElement).toHaveClass(
      'font-primary text-text-default font-regular',
    );
  });

  it('should apply variant classes correctly', () => {
    const { container } = render(<Text variant="success">Success Text</Text>);
    const textElement = container.querySelector('p');

    expect(textElement).toHaveClass(
      'font-primary text-text-success font-medium',
    );
  });

  it('should apply size classes correctly', () => {
    const { container } = render(<Text size="lg">Large Text</Text>);
    const textElement = container.querySelector('p');

    expect(textElement).toHaveClass('text-lg');
  });

  it('should apply type classes correctly', () => {
    const { container } = render(<Text type="wrap">Wrapped Text</Text>);
    const textElement = container.querySelector('p');

    expect(textElement).toHaveClass('break-all whitespace-normal');
  });

  it('should render with custom class', () => {
    const { container } = render(
      <Text customClass="custom-class">Custom Class Text</Text>,
    );
    const textElement = container.querySelector('p');

    expect(textElement).toHaveClass('custom-class');
  });

  it('should not render when children are null', () => {
    const { container } = render(<Text>{null}</Text>);
    expect(container.firstChild).toBeNull();
  });

  it('should not render when children are undefined', () => {
    const { container } = render(<Text>{undefined}</Text>);
    expect(container.firstChild).toBeNull();
  });

  it('should apply all classes correctly for various props', () => {
    const { container } = render(
      <Text
        as="div"
        variant="error"
        size="3xl"
        type="wrap"
        customClass="extra-class"
      >
        Full Props Text
      </Text>,
    );
    const textElement = container.querySelector('div');

    expect(textElement).toHaveClass(
      'font-primary text-text-error font-medium',
    );
    expect(textElement).toHaveClass('text-3xl');
    expect(textElement).toHaveClass('break-all whitespace-normal');
    expect(textElement).toHaveClass('extra-class');
  });
});
