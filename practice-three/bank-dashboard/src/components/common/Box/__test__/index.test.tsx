import { render } from '@testing-library/react';

import { Box } from '@app/components';

describe('Box Component', () => {
  it('should render as a div by default', () => {
    const { container } = render(<Box>Default Box</Box>);
    const boxElement = container.querySelector('div');

    expect(boxElement).toBeInTheDocument();
    expect(boxElement).toHaveTextContent('Default Box');
  });

  it('should render as a span when specified', () => {
    const { container } = render(<Box as="span">Span Box</Box>);
    const boxElement = container.querySelector('span');

    expect(boxElement).toBeInTheDocument();
    expect(boxElement).toHaveTextContent('Span Box');
  });

  it('should render with custom props like className and id', () => {
    const { container } = render(
      <Box className="custom-class" id="custom-id">
        Box with Props
      </Box>,
    );
    const boxElement = container.querySelector('div');

    expect(boxElement).toHaveClass('custom-class');
    expect(boxElement).toHaveAttribute('id', 'custom-id');
  });

  it('should pass props to the element when as is changed', () => {
    const { container } = render(
      <Box as="section" className="section-class">
        Section Box
      </Box>,
    );
    const boxElement = container.querySelector('section');

    expect(boxElement).toBeInTheDocument();
    expect(boxElement).toHaveClass('section-class');
    expect(boxElement).toHaveTextContent('Section Box');
  });
});
