// Constants
import { NOTIFICATIONS } from '@app/constants';

// Interfaces
import { IAccountStatusItem } from '@app/interfaces';

// Components
import { AccountStatusItem, Box, Text } from '@app/components';

interface AccountStatusBarProps {
  data?: IAccountStatusItem[];
}

const AccountStatusBar = ({ data = [] }: AccountStatusBarProps) => (
  <Box
    data-testid="account-status-bar"
    className="flex w-full overflow-auto bg-background-primary p-1 gap-5 md:gap-5.5 lg:gap-7.5"
  >
    {data.length > 0 ? (
      data.map(({ icon, title, quantity, backgroundColor }) => (
        <AccountStatusItem
          key={title}
          icon={icon}
          title={title}
          quantity={quantity}
          backgroundColor={backgroundColor}
        />
      ))
    ) : (
      <Text>{NOTIFICATIONS.STATUS_BAR_NOT_AVAILABLE}</Text>
    )}
  </Box>
);

export default AccountStatusBar;
