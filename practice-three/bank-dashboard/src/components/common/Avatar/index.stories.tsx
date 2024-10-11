import type { Meta, StoryObj } from '@storybook/react';

// Components
import Avatar from '.';

const meta = {
  title: 'Components/Avatar',
  component: Avatar,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    color: {
      control: { type: 'select' },
      options: [
        'default',
        'primary',
        'secondary',
        'success',
        'warning',
        'danger',
        undefined,
      ],
    },
    size: {
      control: { type: 'select' },
      options: ['tiny', 'sm', 'md', 'lg', 'xl', '2xl', '3xl'],
    },
    hasBorder: {
      control: 'boolean',
    },
    isEdit: {
      control: 'boolean',
    },
    radius: {
      options: ['none', 'sm', 'md', 'lg', 'full'],
    },
  },
} satisfies Meta<typeof Avatar>;

export default meta;

type Story = StoryObj<typeof Avatar>;

export const Default: Story = {
  args: {
    size: 'md',
  },
};

export const Primary: Story = {
  args: {
    size: 'xl',
    src: 'https://i.pravatar.cc/300',
  },
};

export const WithBorder: Story = {
  args: {
    size: 'md',
    color: 'danger',
    src: 'https://i.pravatar.cc/300',
    hasBorder: true,
  },
};

export const WithIcon: Story = {
  args: {
    size: '2xl',
    color: 'primary',
    src: 'https://i.pravatar.cc/300',
    hasBorder: true,
    isEdit: true,
  },
};

export const WithRadius: Story = {
  args: {
    size: 'lg',
    color: 'primary',
    src: 'https://i.pravatar.cc/300',
    hasBorder: false,
    isEdit: false,
    radius: 'md',
  },
};
