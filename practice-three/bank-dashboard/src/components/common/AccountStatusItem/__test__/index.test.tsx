import { render, screen } from '@testing-library/react';

import { UserIcon } from '@app/assets';
import { AccountStatusItem } from '@app/components';

describe('AccountStatusItem Component', () => {
  it('should renders correctly with provided props', () => {
    render(
      <AccountStatusItem
        icon={UserIcon}
        title="Total Accounts"
        quantity={20}
        backgroundColor="bg-blue-500"
      />,
    );

    expect(screen.getByTestId('icon-wrapper')).toBeInTheDocument();
    expect(screen.getByTestId('account-item-title')).toHaveTextContent(
      'Total Accounts',
    );
    expect(screen.getByTestId('account-item-quantity')).toHaveTextContent('20');
    expect(screen.getByTestId('icon-wrapper')).toHaveClass('bg-blue-500');
  });

  it('should renders correctly with default props', () => {
    render(
      <AccountStatusItem
        icon={undefined}
        title={undefined}
        quantity={undefined}
        backgroundColor={undefined}
      />,
    );

    expect(screen.getByTestId('icon-wrapper').firstChild).toBeNull();
    expect(screen.getByTestId('account-item-title')).toHaveTextContent('N/A');
    expect(screen.getByTestId('icon-wrapper')).toHaveClass('bg-blue-15');
  });
});
