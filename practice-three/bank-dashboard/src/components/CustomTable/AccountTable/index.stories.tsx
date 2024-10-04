import type { Meta, StoryObj } from '@storybook/react';

// Mocks
import { MOCK_ACCOUNTS_DATA } from '@app/mocks';

// Components
import AccountTable from '.';

const meta = {
  title: 'Components/AccountTable',
  component: AccountTable,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    actions: { argTypesRegex: '^on.*' },
  },
} satisfies Meta<typeof AccountTable>;

export default meta;

type Story = StoryObj<typeof AccountTable>;

export const Default: Story = {
  args: {
    currentPage: 1,
    totalAccounts: MOCK_ACCOUNTS_DATA.length,
    accounts: MOCK_ACCOUNTS_DATA,
    isLoading: false,
  },
};

export const WithLoadingIndicator: Story = {
  args: {
    currentPage: 0,
    isLoading: true,
  },
};
