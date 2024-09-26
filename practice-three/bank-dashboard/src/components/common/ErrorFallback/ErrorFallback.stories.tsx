import type { Meta, StoryObj } from '@storybook/react';

// Components
import { ErrorFallback } from '@app/components';

const meta: Meta<typeof ErrorFallback> = {
  title: 'Components/ErrorFallback',
  component: ErrorFallback,
  argTypes: {
    message: {
      description: 'The error message to display',
    },
  },
  args: {},
  parameters: {
    controls: {
      expanded: true,
    },
  },
};

export default meta;

type Story = StoryObj<typeof ErrorFallback>;

export const Primary: Story = {};

export const WithMessage: Story = {
  args: {
    message: 'The sample error message',
  },
};
