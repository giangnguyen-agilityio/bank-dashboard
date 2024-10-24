import type { Meta, StoryObj } from '@storybook/react';

// Components
import Pagination from '.';

const meta = {
  title: 'Components/Pagination',
  component: Pagination,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
} satisfies Meta<typeof Pagination>;

export default meta;

type Story = StoryObj<typeof Pagination>;

export const Default: Story = {
  args: {
    totalPages: 10,
  },
  argTypes: {
    onPageChange: { action: 'clicked' },
  },
};