import { render, screen } from '@testing-library/react';

import { CustomIcon } from '@app/components';
import { WalletIcon } from '@app/assets';

describe('CustomIcon Component', () => {
  it('should renders the IconComponent correctly without crashing', () => {
    render(
      <CustomIcon IconComponent={WalletIcon} customClass="bg-white-200" />,
    );

    expect(screen.getByTestId('icon-wrapper')).toBeInTheDocument();
    expect(screen.getByTestId('icon-wrapper').firstChild).toHaveAttribute(
      'aria-label',
      'Wallet Icon',
    );
  });
});
