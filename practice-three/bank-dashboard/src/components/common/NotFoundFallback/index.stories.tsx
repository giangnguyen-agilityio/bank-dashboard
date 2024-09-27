import type { Meta, StoryObj } from '@storybook/react';

// Components
import { NotFoundFallback } from '@app/components';

const meta: Meta<typeof NotFoundFallback> = {
  title: 'Components/NotFoundFallback',
  component: NotFoundFallback,
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

type Story = StoryObj<typeof NotFoundFallback>;

export const Primary: Story = {};

export const WithMessage: Story = {
  args: {
    title: 'The sample title',
    message: 'The sample error message',
  },
};
