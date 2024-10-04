import type { Meta, StoryObj } from '@storybook/react';

// Mocks
import { MOCK_TRANSACTION_DATA } from '@app/mocks';

// Components
import TransactionTable from '.';

const meta = {
  title: 'Components/TransactionTable',
  component: TransactionTable,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    actions: { argTypesRegex: '^on.*' },
  },
} satisfies Meta<typeof TransactionTable>;

export default meta;

type Story = StoryObj<typeof TransactionTable>;

export const Default: Story = {
  args: {
    currentPage: 1,
    totalTransactions: MOCK_TRANSACTION_DATA.length,
    transactions: MOCK_TRANSACTION_DATA,
    isLoading: true,
  },
};

export const WithLoadingIndicator: Story = {
  args: {
    currentPage: 0,
    isLoading: true,
  },
};
