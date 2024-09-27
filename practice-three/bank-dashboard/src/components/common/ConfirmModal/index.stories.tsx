import type { Meta, StoryObj } from '@storybook/react';
import { useDisclosure } from '@nextui-org/react';

// Components
import { Button, ConfirmModal } from '..';

const meta = {
  title: 'Components/ConfirmModal',
  component: ConfirmModal,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
} satisfies Meta<typeof ConfirmModal>;

export default meta;

type Story = StoryObj<typeof ConfirmModal>;

const ConfirmModalStory = ({ title }: { title?: string }) => {
  const { isOpen, onOpen, onClose } = useDisclosure({
    defaultOpen: false,
  });

  return (
    <>
      <Button onPress={onOpen}>Open Modal</Button>
      <ConfirmModal
        isOpen={isOpen}
        title={title}
        content="This is the sample content"
        onConfirm={onClose}
        onCancel={onClose}
      />
    </>
  );
};

export const Primary: Story = {
  render: () => <ConfirmModalStory />,
};

export const Secondary: Story = {
  render: () => <ConfirmModalStory title={'The sample title'} />,
};
