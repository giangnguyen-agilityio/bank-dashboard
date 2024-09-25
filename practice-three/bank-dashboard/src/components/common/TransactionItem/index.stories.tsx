import type { Meta, StoryObj } from '@storybook/react';

import {
  MOCK_DEFAULT_TRANSACTION_ITEMS,
  MOCK_TRANSACTION_ITEMS,
} from '@app/mocks';

import TransactionItem from '.';

const meta = {
  title: 'Components/TransactionItem',
  component: TransactionItem,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
} satisfies Meta<typeof TransactionItem>;

export default meta;

type Story = StoryObj<typeof TransactionItem>;

export const Default: Story = {
  args: {
    transactionIcon: MOCK_DEFAULT_TRANSACTION_ITEMS.transactionIcon,
    transactionInfo: MOCK_DEFAULT_TRANSACTION_ITEMS.transactionInfo,
    transactionAmount: MOCK_DEFAULT_TRANSACTION_ITEMS.transactionAmount,
    kind: MOCK_DEFAULT_TRANSACTION_ITEMS.kind,
  },
};

export const Primary: Story = {
  args: {
    transactionIcon: MOCK_TRANSACTION_ITEMS[0].transactionIcon,
    transactionInfo: MOCK_TRANSACTION_ITEMS[0].transactionInfo,
    transactionAmount: MOCK_TRANSACTION_ITEMS[0].transactionAmount,
    kind: MOCK_TRANSACTION_ITEMS[0].kind,
  },
};
