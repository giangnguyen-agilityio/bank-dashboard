import type { Meta, StoryObj } from '@storybook/react';

// Components
import Navbar from '.';

const meta = {
  title: 'Components/Navbar',
  component: Navbar,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
  args: {
    onToggleSidebar: () => alert('Sidebar toggled'),
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
} satisfies Meta<typeof Navbar>;

export default meta;

type Story = StoryObj<typeof Navbar>;

export const Default: Story = {};
