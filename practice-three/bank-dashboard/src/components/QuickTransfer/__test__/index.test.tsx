// Utils
import { render } from '@app/utils';

// Components
import { QuickTransfer } from '@app/components';

describe('QuickTransfer Component', () => {
  it('should renders the QuickTransfer correctly', () => {
    const { container } = render(<QuickTransfer />);

    expect(container).toMatchSnapshot();
  });
});
