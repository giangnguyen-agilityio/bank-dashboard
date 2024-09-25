import { render } from '@testing-library/react';

// Components
import { Button } from '@app/components';

describe('Button Component', () => {
  it('should renders the Button component without crashing', () => {
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
