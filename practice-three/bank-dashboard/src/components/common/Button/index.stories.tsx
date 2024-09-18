import type { Meta, StoryObj } from '@storybook/react';
import { Spinner } from '@nextui-org/react';

// Components
import Button from '.';

const meta = {
  title: 'Components/Button',
  component: Button,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    variant: {
      control: { type: 'select' },
      options: ['bold', 'circle', 'outline'],
    },
    color: {
      control: { type: 'select' },
      options: ['default', 'primary', 'secondary'],
    },
    disabled: {
      control: 'boolean',
    },
    size: {
      control: { type: 'select' },
      options: ['unset', 'tiny', 'xs', 'sm', 'md', 'lg', 'xl', '2xl'],
    },
  },
} satisfies Meta<typeof Button>;

export default meta;

type Story = StoryObj<typeof Button>;

export const Default: Story = {
  args: {
    children: 'Button',
    color: 'default',
    size: 'xs',
  },
};

export const Primary: Story = {
  args: {
    children: 'Button',
    color: 'primary',
    size: 'xs',
  },
};

export const Secondary: Story = {
  args: {
    children: 'Button',
    color: 'secondary',
    variant: 'bold',
    size: 'xs',
  },
};

export const Disabled: Story = {
  args: {
    variant: 'outline',
    children: 'Button',
    disabled: true,
    size: 'xs',
  },
};

export const Loading: Story = {
  args: {
    isLoading: true,
    spinner: <Spinner />,
    children: 'Loading',
    color: 'primary',
    size: 'xs',
  },
};

export const Icon: Story = {
  args: {
    children: (
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
