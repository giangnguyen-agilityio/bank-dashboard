// Utils
import { render, screen } from '@app/utils';

// Icons
import { UserIcon } from '@app/assets';

// Components
import { AccountStatusItem } from '@app/components';

describe('AccountStatusItem Component', () => {
  it('should renders correctly with provided props', () => {
    const { container } = render(
      <AccountStatusItem
        icon={UserIcon}
        title="Total Accounts"
        quantity={20}
        backgroundColor="bg-blue-500"
      />,
    );

    expect(container).toMatchSnapshot();
  });

  it('should renders correctly with default props', () => {
    render(<AccountStatusItem />);

    expect(screen.getByTestId('icon-wrapper').firstChild).toBeNull();
    expect(screen.getByTestId('account-item-title')).toHaveTextContent('N/A');
    expect(screen.getByTestId('icon-wrapper')).toHaveClass('bg-blue-15');
  });
});
