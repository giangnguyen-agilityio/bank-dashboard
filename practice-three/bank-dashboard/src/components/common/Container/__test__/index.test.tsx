import { render, screen } from '@testing-library/react';

// Components
import { Container } from '@app/components';

describe('Container Component', () => {
  it('should renders as a div by default', () => {
    render(<Container>Default Container</Container>);
    const container = screen.getByText(/Default Container/i);

    expect(container).toBeInTheDocument();
    expect(container.tagName).toBe('DIV');
    expect(container).toHaveClass('m-auto');
    expect(container).toHaveClass('container');
  });

  it('should applies additional classes correctly', () => {
    render(
      <Container className="extra-class">Container with extra class</Container>,
    );
    const container = screen.getByText(/Container with extra class/i);

    expect(container).toHaveClass('extra-class');
  });

  it('should renders as a different HTML element when specified', () => {
    render(<Container as="section">Section Container</Container>);
    const container = screen.getByText(/Section Container/i);

    expect(container).toBeInTheDocument();
    expect(container.tagName).toBe('SECTION');
  });

  it('should handles unknown HTML elements gracefully', () => {
    render(<Container as="article">Article Container</Container>);
    const container = screen.getByText(/Article Container/i);

    expect(container).toBeInTheDocument();
    expect(container.tagName).toBe('ARTICLE');
  });

  it('should not override default className', () => {
    render(
      <Container className="container-custom">Custom Container</Container>,
    );
    const container = screen.getByText(/Custom Container/i);

    expect(container).toHaveClass('m-auto');
    expect(container).toHaveClass('container');
    expect(container).toHaveClass('container-custom');
  });
});
