import { render } from '@testing-library/react';

// Components
import { Input } from '@app/components';

describe('Input Component', () => {
  it('should renders the Input component without crashing', () => {
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
