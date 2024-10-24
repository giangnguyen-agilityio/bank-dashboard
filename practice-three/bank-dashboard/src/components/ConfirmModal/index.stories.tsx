import { useArgs } from '@storybook/preview-api';
import type { Meta, StoryObj } from '@storybook/react';

// Components
import { Button, ConfirmModal } from '@app/components';

const meta = {
  title: 'Components/ConfirmModal',
  component: ConfirmModal,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    isLoading: {
      description: 'Show the loading state of the modal',
      control: 'boolean',
    },
    title: {
      description: 'This is the title of the modal',
      control: 'text',
    },
    content: {
      description: 'This is the content of the modal',
      control: 'text',
    },
    onConfirm: {
      description: 'Callback function to confirm action',
      action: 'onConfirm',
    },
    onCancel: {
      description: 'Callback function to cancel action',
      action: 'onCancel',
    },
  },
} satisfies Meta<typeof ConfirmModal>;

export default meta;

type Story = StoryObj<typeof ConfirmModal>;

export const Primary: Story = {
  args: {
    isOpen: false,
    isLoading: false,
    title: 'Confirm',
    content: 'Are you sure you want to proceed?',
    onConfirm: () => {},
    onCancel: () => {},
  },
  render: function Render(args) {
    const [isOpen, setIsOpen] = useArgs<typeof args>();

    const handleOpen = () => setIsOpen({ isOpen: true });
    const handleClose = () => setIsOpen({ isOpen: false });

    return (
      <>
        <Button onClick={handleOpen}>Open Modal</Button>
        <ConfirmModal
          {...args}
          isOpen={isOpen.isOpen}
          onConfirm={handleClose}
          onCancel={handleClose}
        />
      </>
    );
  },
};
