// Utils
import { render, screen } from '@app/utils';

// Components
import { Container } from '@app/components';

describe('Container Component', () => {
  it('should renders the Container component without crashing', () => {
    render(<Container>Default Container</Container>);

    const container = screen.getByText(/Default Container/i);

    expect(container).toBeInTheDocument();
    expect(container.tagName).toBe('DIV');
    expect(container).toHaveClass('m-auto');
    expect(container).toHaveClass('container');
  });
});
