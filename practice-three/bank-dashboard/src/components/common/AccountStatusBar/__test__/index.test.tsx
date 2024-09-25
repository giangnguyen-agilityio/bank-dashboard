import { render, screen } from '@testing-library/react';

// Mocks
import { MOCK_ACCOUNT_STATUS_BAR_DATA } from '@app/mocks';

// Components
import { AccountStatusBar } from '@app/components';

// Constants
import { NOTIFICATIONS } from '@app/constants';

describe('AccountStatusBar Component', () => {
  it('should renders correct props for AccountStatusItem', () => {
    render(<AccountStatusBar data={MOCK_ACCOUNT_STATUS_BAR_DATA} />);

    MOCK_ACCOUNT_STATUS_BAR_DATA.forEach(({ title, quantity }) => {
      const itemTitle = screen.getByText(title);
      const itemQuantity = screen.getByText(quantity.toString());

      expect(itemTitle).toBeInTheDocument();
      expect(itemQuantity).toBeInTheDocument();
    });
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
