import type { Meta, StoryObj } from '@storybook/react';

// Constants
import { SIDEBAR_LIST } from '@app/constants';

// Components
import Sidebar from '.';

const meta = {
  title: 'Components/Sidebar',
  component: Sidebar,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    actions: { argTypesRegex: '^on.*' },
  },
  decorators: [
    (Story) => (
      <div className="container w-screen h-screen px-5 max-w-screen-lg mx-auto">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof Sidebar>;

export default meta;

type Story = StoryObj<typeof Sidebar>;

export const Default: Story = {
  args: {
    items: SIDEBAR_LIST,
    isOpen: true,
  },
};
