// Utils
import { render, screen } from '@app/utils';

// Icons
import { WalletIcon } from '@app/assets';

// Components
import { CustomIcon } from '@app/components';

describe('CustomIcon Component', () => {
  it('should renders the IconComponent correctly without crashing', () => {
    const { container } = render(
      <CustomIcon IconComponent={WalletIcon} customClass="bg-white-200" />,
    );

    expect(container).toMatchSnapshot();
    expect(screen.getByTestId('icon-wrapper').firstChild).toHaveAttribute(
      'aria-label',
      'Wallet Icon',
    );
  });
});
