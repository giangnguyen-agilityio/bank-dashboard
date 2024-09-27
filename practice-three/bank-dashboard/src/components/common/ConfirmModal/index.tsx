import {
  Modal as ModalNextUI,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  ModalProps,
} from '@nextui-org/react';

// Components
import { Button } from '@app/components';

interface ConfirmModalProps extends Omit<ModalProps, 'children'> {
  isOpen: boolean;
  content: string;
  title?: string;
  onConfirm?: () => void;
  onCancel?: () => void;
}

const ConfirmModal = ({
  isOpen,
  title,
  content,
  onConfirm,
  onCancel,
  ...props
}: ConfirmModalProps) => {
  return (
    <ModalNextUI
      data-testid="confirm-modal"
      radius="lg"
      isOpen={isOpen}
      classNames={{
        body: 'p-4',
        base: 'bg-background-default font-secondary text-gray-150',
        closeButton:
          'top-4 right-4 bg-background-default text-text-default hover:bg-gray-100',
      }}
      onClose={onCancel}
      {...props}
    >
      <ModalContent data-testid="confirm-modal-content">
        <>
          <ModalHeader
            id="confirm-modal-header"
            className="flex h-16 bg-background-secondary"
          >
            <span className="size-8 absolute top-4 right-14 rounded-full bg-background-default" />
            <span className="size-8 absolute top-4 right-24 rounded-full bg-background-default" />
          </ModalHeader>

          <ModalBody
            data-testid="confirm-modal-content"
            className="p-6 pt-8 text-center"
          >
            <p className="text-5xl text-blue-200/70">{title}</p>
            <p className="whitespace-pre-line text-center text-xl text-gray-150">
              {content}
            </p>
          </ModalBody>

          <ModalFooter
            data-testid="confirm-modal-footer"
            className="flex justify-center gap-4"
          >
            <Button
              aria-label="Confirm Button"
              data-testid="confirm-button"
              className="flex-1 font-semibold"
              size="xs"
              onPress={onConfirm}
            >
              Submit
            </Button>

            <Button
              aria-label="Cancel Button"
              data-testid="cancel-button"
              variant="bordered"
              color="default"
              size="xs"
              className="flex-1 font-semibold text-gray-100 hover:text-blue-200 hover:border-blue-200"
              onPress={onCancel}
            >
              Cancel
            </Button>
          </ModalFooter>
        </>
      </ModalContent>
    </ModalNextUI>
  );
};

export default ConfirmModal;
