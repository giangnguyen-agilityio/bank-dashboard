import type { Meta, StoryObj } from '@storybook/react';

import { MOCK_DEFAULT_TRANSACTION_ITEMS } from '@app/mocks';

import TransactionIcon from '.';

const meta = {
  title: 'Components/TransactionIcon',
  component: TransactionIcon,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
} satisfies Meta<typeof TransactionIcon>;

export default meta;

type Story = StoryObj<typeof TransactionIcon>;

export const Default: Story = {
  args: {
    IconComponent: MOCK_DEFAULT_TRANSACTION_ITEMS.transactionIcon.icon,
    bgColorClass:
      MOCK_DEFAULT_TRANSACTION_ITEMS.transactionIcon.backgroundColor,
  },
};
