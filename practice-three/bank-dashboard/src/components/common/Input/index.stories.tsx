import type { Meta, StoryObj } from '@storybook/react';

// Icons
import { UserIcon } from '@app/assets';

// Components
import Input from '.';

const meta = {
  title: 'Components/Input',
  component: Input,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    color: {
      control: { type: 'select' },
      options: ['unset', 'default'],
    },
    size: {
      control: { type: 'select' },
      options: ['sm', 'md', 'lg'],
    },
    disabled: {
      control: 'boolean',
    },
    radius: {
      control: { type: 'select' },
      options: ['sm', 'md', 'lg'],
    },
    border: {
      control: { type: 'select' },
      options: ['unset', 'default'],
    },
  },
} satisfies Meta<typeof Input>;

export default meta;

type Story = StoryObj<typeof Input>;

export const Primary: Story = {
  args: {
    size: 'sm',
    placeholder: 'Enter your username',
  },
};

export const Secondary: Story = {
  args: {
    size: 'sm',
    color: 'unset',
    border: 'unset',
    placeholder: 'Enter your username',
  },
};

export const WithIcon: Story = {
  args: {
    size: 'sm',
    placeholder: 'Username',
    endContent: <UserIcon />,
  },
};

export const Disabled: Story = {
  args: {
    placeholder: 'example@gmail.com',
    disabled: true,
    color: 'default',
    size: 'sm',
  },
};

export const WithErrorMessage: Story = {
  args: {
    isInvalid: true,
    errorMessage: 'Please enter a valid email address',
    value: 'Example@gmail.com',
    size: 'sm',
  },
};
