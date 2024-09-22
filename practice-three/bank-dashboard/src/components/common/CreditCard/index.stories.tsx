import type { Meta, StoryObj } from '@storybook/react';

import { MOCK_CREDIT_CARD_DATA } from '@app/mocks';

// Components
import CreditCard from '.';

const meta = {
  title: 'Components/CreditCard',
  component: CreditCard,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    isDefault: {
      control: 'boolean',
    },
  },
} satisfies Meta<typeof CreditCard>;

export default meta;

type Story = StoryObj<typeof CreditCard>;

export const Primary: Story = {
  args: {
    data: MOCK_CREDIT_CARD_DATA,
  },
};

export const Secondary: Story = {
  args: {
    data: MOCK_CREDIT_CARD_DATA,
    isDefault: true,
  },
};
