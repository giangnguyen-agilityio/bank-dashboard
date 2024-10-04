import type { Meta, StoryObj } from '@storybook/react';

// Components
import MainLayout from '.';

const meta = {
  title: 'Components/MainLayout',
  component: MainLayout,
  tags: ['autodocs'],
  parameters: {
    layout: 'left',
  },
  decorators: [
    (Story) => (
      <div className="container mx-auto h-fit w-[375px] md:w-[1024px]">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof MainLayout>;

export default meta;

type Story = StoryObj<typeof MainLayout>;

export const Default: Story = {
  args: {
    children: <div>Main Content</div>,
  },
};
