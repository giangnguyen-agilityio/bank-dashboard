import type { Meta, StoryObj } from '@storybook/react';

// Mocks
import { MOCK_TAB_DATA } from '@app/mocks';

// Components
import { CustomTabs } from '..';

const meta = {
  title: 'Components/CustomTabs',
  tags: ['autodocs'],
  component: CustomTabs,
  parameters: {
    layout: 'centered',
  },
  decorators: [
    (Story) => (
      <div className="pt-20">
        <div className="max-w-full w-87.5 mx-auto">
          <Story />
        </div>
      </div>
    ),
  ],
} satisfies Meta<typeof CustomTabs>;

export default meta;

type Story = StoryObj<typeof CustomTabs>;

export const Primary: Story = {
  args: {
    tabs: MOCK_TAB_DATA,
  },
};
