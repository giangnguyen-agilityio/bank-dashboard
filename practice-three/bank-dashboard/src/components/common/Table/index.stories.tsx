import type { Meta, StoryObj } from '@storybook/react';

// Mocks
import { MOCK_ACCOUNTS_DATA, MOCK_COLUMNS_ACCOUNT_LIST } from '@app/mocks';

// Types
import { TableColumnType } from '@app/types';

// Components
import { Table } from '.';

const meta = {
  title: 'Components/Table',
  component: Table,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    variant: {
      control: { type: 'select' },
      options: ['primary', 'secondary'],
    },
    isStriped: {
      control: 'boolean',
    },
  },
} satisfies Meta<typeof Table>;

export default meta;

type Story = StoryObj<typeof Table>;

export const Primary: Story = {
  args: {
    data: MOCK_ACCOUNTS_DATA,
    columns: MOCK_COLUMNS_ACCOUNT_LIST as TableColumnType<unknown>[],
  },
};

export const WithoutData: Story = {
  args: {
    data: [],
    columns: MOCK_COLUMNS_ACCOUNT_LIST as TableColumnType<unknown>[],
  },
};
