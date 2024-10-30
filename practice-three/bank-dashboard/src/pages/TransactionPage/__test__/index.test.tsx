// Utils
import { render } from '@app/utils';

// Pages
import { TransactionPage } from '@app/pages';

describe('TransactionPage', () => {
  it('should render the transaction table with transactions', () => {
    const { container } = render(<TransactionPage />);

    // Verify transactions are rendered
    expect(container).toMatchSnapshot();
  });
});
