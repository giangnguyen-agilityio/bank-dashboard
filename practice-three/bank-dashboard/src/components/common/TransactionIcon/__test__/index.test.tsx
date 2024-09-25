import { render, screen } from '@testing-library/react';

import { TransactionIcon } from '@app/components';
import { WalletIcon } from '@app/assets';

describe('TransactionIcon Component', () => {
  it('should renders the IconComponent correctly without crashing', () => {
    render(
      <TransactionIcon
        IconComponent={WalletIcon}
        bgColorClass="bg-white-200"
      />,
    );

    expect(screen.getByTestId('icon-wrapper')).toBeInTheDocument();
    expect(screen.getByTestId('icon-wrapper').firstChild).toHaveAttribute(
      'aria-label',
      'Wallet Icon',
    );
  });
});
