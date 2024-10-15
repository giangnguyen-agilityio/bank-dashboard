// Utils
import { render } from '@app/utils';

// Components
import { Box } from '@app/components';

describe('Box Component', () => {
  it('should render the correct element corresponding to the as prop', () => {
    const { container } = render(
      <Box as="section" className="section-class">
        Section Box
      </Box>,
    );

    expect(container).toMatchSnapshot();
  });
});
