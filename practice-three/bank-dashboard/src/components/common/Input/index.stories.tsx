import type { Meta, StoryObj } from '@storybook/react';

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
    startContent: (
      <svg
        width={24}
        height={24}
        viewBox="0 0 24 24"
        fill="currentColor"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g
          fill="none"
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeMiterlimit={10}
          strokeWidth={1.5}
        >
          <path
            data-name="Stroke 1"
            d="M11.845 21.662C8.153 21.662 5 21.088 5 18.787s3.133-4.425 6.845-4.425c3.692 0 6.845 2.1 6.845 4.4s-3.134 2.9-6.845 2.9z"
          />
          <path
            data-name="Stroke 3"
            d="M11.837 11.174a4.372 4.372 0 10-.031 0z"
          />
        </g>
      </svg>
    ),
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
