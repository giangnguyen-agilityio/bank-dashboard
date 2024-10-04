// Utils
import { render, fireEvent, screen } from '@app/utils';

// Components
import { ConfirmModal } from '@app/components';

describe('ConfirmModal Component', () => {
  const mockOnConfirm = jest.fn();
  const mockOnCancel = jest.fn();
  const defaultProps = {
    isOpen: true,
    title: 'Confirm Action',
    content: 'Are you sure you want to proceed?',
    onConfirm: mockOnConfirm,
    onCancel: mockOnCancel,
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should render the modal when isOpen is true', () => {
    render(<ConfirmModal {...defaultProps} />);

    expect(screen.getByText('Confirm Action')).toBeInTheDocument();
    expect(
      screen.getByText('Are you sure you want to proceed?'),
    ).toBeInTheDocument();
  });

  it('should not render the modal when isOpen is false', () => {
    render(<ConfirmModal {...defaultProps} isOpen={false} />);

    expect(screen.queryByTestId('confirm-modal')).not.toBeInTheDocument();
  });

  it('should trigger onConfirm when Confirm Button is clicked', () => {
    render(<ConfirmModal {...defaultProps} />);

    const confirmButton = screen.getByTestId('confirm-button');

    fireEvent.click(confirmButton);

    expect(mockOnConfirm).toHaveBeenCalledTimes(1);
  });

  it('should trigger onCancel when Cancel Button is clicked', () => {
    render(<ConfirmModal {...defaultProps} />);

    const cancelButton = screen.getByTestId('cancel-button');

    fireEvent.click(cancelButton);

    expect(mockOnCancel).toHaveBeenCalledTimes(1);
  });
});
