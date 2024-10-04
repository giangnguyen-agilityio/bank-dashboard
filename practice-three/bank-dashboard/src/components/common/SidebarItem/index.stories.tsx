import type { Meta, StoryObj } from '@storybook/react';

// Constants
import { SIDEBAR_LIST } from '@app/constants';

// Components
import SidebarItem from '.';

const meta = {
  title: 'Components/SidebarItem',
  component: SidebarItem,
  tags: ['autodocs'],
  parameters: { actions: { argTypesRegex: '^on.*' } },
  decorators: [
    (Story) => (
      <div className="container w-screen h-fit p-5 max-w-screen-lg">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof SidebarItem>;

export default meta;

type Story = StoryObj<typeof SidebarItem>;

export const Default: Story = {
  args: {
    icon: SIDEBAR_LIST[0].icon,
    label: SIDEBAR_LIST[0].label,
    link: SIDEBAR_LIST[0].link,
  },
};
