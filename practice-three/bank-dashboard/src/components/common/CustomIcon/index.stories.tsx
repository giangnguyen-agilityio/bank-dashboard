import type { Meta, StoryObj } from '@storybook/react';

import { MOCK_DEFAULT_TRANSACTION_ITEMS } from '@app/mocks';

import CustomIcon from '.';

const meta = {
  title: 'Components/CustomIcon',
  component: CustomIcon,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
} satisfies Meta<typeof CustomIcon>;

export default meta;

type Story = StoryObj<typeof CustomIcon>;

export const Default: Story = {
  args: {
    IconComponent: MOCK_DEFAULT_TRANSACTION_ITEMS.transactionIcon.icon,
    customClass: MOCK_DEFAULT_TRANSACTION_ITEMS.transactionIcon.backgroundColor,
  },
};
