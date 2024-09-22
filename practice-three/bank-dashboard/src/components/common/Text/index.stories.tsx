import type { Meta, StoryObj } from '@storybook/react';

// Components
import Text from '.';

const meta = {
  title: 'Components/Text',
  tags: ['autodocs'],

  component: Text,
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    as: {
      control: { type: 'select' },
      options: ['p', 'span', 'div', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6'],
    },
    variant: {
      control: { type: 'select' },
      options: [
        'default',
        'primary',
        'heading',
        'title',
        'sidebar',
        'description',
        'success',
        'error',
      ],
    },
    size: {
      control: { type: 'select' },
      options: [
        'xs',
        'sm',
        'base',
        'md',
        'lg',
        'xl',
        '2xl',
        '3xl',
        '4xl',
        '5xl',
        '6xl',
        '7xl',
        '8xl',
      ],
    },
    type: {
      control: { type: 'select' },
      options: ['wrap', 'nowrap'],
    },
  },
} satisfies Meta<typeof Text>;

export default meta;

type Story = StoryObj<typeof Text>;

export const Default: Story = {
  args: {
    children: 'Default Text',
    size: 'md',
  },
};

export const Primary: Story = {
  args: {
    children: 'Normal Text',
    variant: 'primary',
  },
};

export const Heading: Story = {
  args: {
    children: 'Heading',
    variant: 'heading',
    size: 'lg',
  },
};

export const Title: Story = {
  args: {
    children: 'Title',
    variant: 'title',
  },
};

export const Description: Story = {
  args: {
    children: 'Description',
    variant: 'description',
  },
};

export const Success: Story = {
  args: {
    children: 'Success',
    variant: 'success',
  },
};

export const Error: Story = {
  args: {
    children: 'Error',
    variant: 'error',
  },
};
