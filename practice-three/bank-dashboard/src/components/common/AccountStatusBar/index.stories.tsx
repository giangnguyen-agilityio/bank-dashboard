import type { Meta, StoryObj } from '@storybook/react';

// Mocks
import { MOCK_ACCOUNT_STATUS_BAR_DATA } from '@app/mocks';

// Components
import AccountStatusBar from '.';

const meta = {
  title: 'Components/AccountStatusBar',
  component: AccountStatusBar,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
} satisfies Meta<typeof AccountStatusBar>;

export default meta;

type Story = StoryObj<typeof AccountStatusBar>;

export const Default: Story = {
  args: {
    data: MOCK_ACCOUNT_STATUS_BAR_DATA,
  },
};

export const WithoutData: Story = {
  args: {
    data: [],
  },
};
