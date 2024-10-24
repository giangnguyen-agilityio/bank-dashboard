// Constants
import { NOTIFICATIONS } from '@app/constants';

// Utils
import { render, screen } from '@app/utils';

// Mocks
import { MOCK_ACCOUNT_STATUS_BAR_DATA } from '@app/mocks';

// Components
import { AccountStatusBar } from '@app/components';

describe('AccountStatusBar Component', () => {
  it('should renders correct props for AccountStatusItem', () => {
    const { container } = render(
      <AccountStatusBar data={MOCK_ACCOUNT_STATUS_BAR_DATA} />,
    );

    expect(container).toMatchSnapshot();
  });

  it('should renders notification when data is empty', () => {
    render(<AccountStatusBar data={[]} />);

    expect(
      screen.getByText(NOTIFICATIONS.STATUS_BAR_NOT_AVAILABLE),
    ).toBeInTheDocument();
  });

  it('should renders notification when data is undefined', () => {
    render(<AccountStatusBar />);

    expect(
      screen.getByText(NOTIFICATIONS.STATUS_BAR_NOT_AVAILABLE),
    ).toBeInTheDocument();
  });
});
