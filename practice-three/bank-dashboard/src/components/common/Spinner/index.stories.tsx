import type { Meta, StoryObj } from '@storybook/react';

// Components
import { Spinner } from '..';

const meta = {
  title: 'Components/Spinner',
  tags: ['autodocs'],
  component: Spinner,
  parameters: {
    layout: 'centered',
  },
  decorators: [
    (Story) => (
      <div className="h-15">
        <Story />
      </div>
    ),
  ],
  argTypes: {
    size: {
      description: 'The size of the spinner',
      control: { type: 'select' },
      options: ['sm', 'md', 'lg'],
    },
  },
} satisfies Meta<typeof Spinner>;

export default meta;

type Story = StoryObj<typeof Spinner>;

export const Default: Story = {
  args: {
    size: 'md',
  },
};

export const WithLabel: Story = {
  args: {
    label: 'Loading...',
    classNames: {
      label: 'text-blue-200',
    },
  },
};

export const WithCustomColor: Story = {
  args: {
    classNames: {
      circle1: 'border-[5px] border-b-green-200 border-l-green-200',
      circle2: 'border-[5px] border-b-green-200 border-l-green-200',
    },
  },
};
