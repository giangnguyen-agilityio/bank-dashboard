import type { Meta, StoryObj } from '@storybook/react';

import { MOCK_ACCOUNT_STATUS_BAR_DATA } from '@app/mocks';

// Components
import AccountStatusItem from '.';

const meta = {
  title: 'Components/AccountStatusItem',
  component: AccountStatusItem,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
} satisfies Meta<typeof AccountStatusItem>;

export default meta;

type Story = StoryObj<typeof AccountStatusItem>;

export const Default: Story = {
  args: {
    icon: MOCK_ACCOUNT_STATUS_BAR_DATA[0].icon,
    title: MOCK_ACCOUNT_STATUS_BAR_DATA[0].title,
    quantity: MOCK_ACCOUNT_STATUS_BAR_DATA[0].quantity,
    backgroundColor: MOCK_ACCOUNT_STATUS_BAR_DATA[0].backgroundColor,
  },
};
