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
  },
  args: {
    toggleSidebar: () => alert('Sidebar item toggled'),
  },
  decorators: [
    (Story) => (
      <div
        className="container"
        style={{
          width: '100vw',
          padding: '0 20px',
          maxWidth: '1440px',
        }}
      >
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
