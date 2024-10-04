// Utils
import { render } from '@app/utils';

// Components
import { Text } from '@app/components';

describe('Text Component', () => {
  it('should not render when children are null', () => {
    const { container } = render(<Text>{null}</Text>);

    expect(container.firstChild).toBeNull();
  });

  it('should not render when children are undefined', () => {
    const { container } = render(<Text>{undefined}</Text>);

    expect(container.firstChild).toBeNull();
  });

  it('should renders the Text component without crashing', () => {
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

    expect(textElement).toHaveClass('font-primary text-text-error font-medium');
    expect(textElement).toHaveClass('text-3xl');
    expect(textElement).toHaveClass('break-all whitespace-normal');
    expect(textElement).toHaveClass('extra-class');
  });
});
