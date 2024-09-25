import { render } from '@testing-library/react';

// Components
import { Box } from '@app/components';

describe('Box Component', () => {
  it('should render the correct element corresponding to the as prop', () => {
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
