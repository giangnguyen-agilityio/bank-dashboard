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
      description:
        'This is the border color of the avatar when the avatar has border',
    },
    size: {
      control: { type: 'select' },
      options: ['tiny', 'sm', 'md', 'lg', 'xl', '2xl', '3xl'],
      description: 'This is the size of the avatar',
    },
    hasBorder: {
      control: 'boolean',
      description: 'Determines whether the avatar has border or not',
    },
    isEdit: {
      control: 'boolean',
      description:
        'Shows edit icon inside avatar when avatar is editable, size > lg and radius is full.',
    },
    radius: {
      control: { type: 'select' },
      options: ['none', 'sm', 'md', 'lg', 'full'],
      description: 'This is the border radius of the avatar',
    },
    customClass: {
      control: { type: 'text' },
      description: 'Custom CSS class via TailwindCSS for styling the avatar',
    },
  },
} satisfies Meta<typeof Avatar>;

export default meta;

type Story = StoryObj;

const defaultProps = {
  size: 'xl',
  hasBorder: false,
  isEdit: false,
  color: 'default',
  radius: 'full',
  customClass: '',
  src: 'https://i.pravatar.cc/300',
};

export const Default: Story = {
  args: {
    ...defaultProps,
    src: undefined,
    customClass: 'text-white-100 bg-blue-100',
  },
};

export const Primary: Story = {
  args: {
    ...defaultProps,
  },
};

export const WithBorder: Story = {
  args: {
    ...defaultProps,
    color: 'danger',
    hasBorder: true,
  },
};

export const WithIcon: Story = {
  args: {
    ...defaultProps,
    size: '2xl',
    hasBorder: true,
    isEdit: true,
  },
};

export const WithRadius: Story = {
  args: {
    ...defaultProps,
    radius: 'none',
  },
};
