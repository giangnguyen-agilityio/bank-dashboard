import type { Meta, StoryObj } from '@storybook/react';

// Components
import Navbar from '.';

const meta = {
  title: 'Components/Navbar',
  component: Navbar,
  tags: ['autodocs'],
  parameters: {
    actions: { argTypesRegex: '^on.*' },
  },
  decorators: [
    (Story) => (
      <div className="container mx-auto min-w-[375px]">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof Navbar>;

export default meta;

type Story = StoryObj<typeof Navbar>;

export const Default: Story = {};
