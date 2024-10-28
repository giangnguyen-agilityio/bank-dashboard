import { render, screen, userEvent } from '@app/utils';

// Components
import { Dropdown } from '@app/components';

describe('Dropdown Component', () => {
  const mockOptions = [
    {
      key: 'edit',
      icon: <span>Edit Icon</span>,
      isDisabled: false,
      className: 'edit-class',
      onAction: jest.fn(),
    },
    {
      key: 'delete',
      icon: <span>Delete Icon</span>,
      isDisabled: true,
      className: 'delete-class',
      onAction: jest.fn(),
    },
  ];

  it('should renders the dropdown correctly without crashing', () => {
    const { container } = render(<Dropdown options={mockOptions} />);

    expect(container).toMatchSnapshot();
  });

  it('should opens the menu and displays options when the trigger button is clicked', async () => {
    render(<Dropdown options={mockOptions} />);

    const dropdownTrigger = screen.getByLabelText('More actions button');

    await userEvent.click(dropdownTrigger);

    // Verify menu items are displayed after opening
    expect(screen.getByLabelText('edit button')).toBeInTheDocument();
    expect(screen.getByLabelText('delete button')).toBeInTheDocument();
  });

  it('should disables menu items marked as disabled', async () => {
    render(<Dropdown options={mockOptions} />);

    const dropdownTrigger = screen.getByLabelText('More actions button');

    await userEvent.click(dropdownTrigger);

    // Check disabled item
    const deleteItem = screen.getByLabelText('delete button');

    expect(deleteItem).toHaveAttribute('aria-disabled', 'true');

    // Check enabled item
    const editItem = screen.getByLabelText('edit button');

    expect(editItem).not.toHaveAttribute('aria-disabled');
  });

  it('should calls onAction for enabled menu items when clicked', async () => {
    render(<Dropdown options={mockOptions} />);

    const dropdownTrigger = screen.getByLabelText('More actions button');

    await userEvent.click(dropdownTrigger);

    const editItem = screen.getByLabelText('edit button');

    await userEvent.click(editItem);

    expect(mockOptions[0].onAction).toHaveBeenCalled();

    // Disabled item should not be called
    expect(mockOptions[1].onAction).not.toHaveBeenCalled();
  });

  it('should applies custom classes to menu items', async () => {
    render(<Dropdown options={mockOptions} />);

    const dropdownTrigger = screen.getByLabelText('More actions button');

    await userEvent.click(dropdownTrigger);

    // Check for custom classes
    const editItem = screen.getByLabelText('edit button');

    expect(editItem).toHaveClass('edit-class');

    const deleteItem = screen.getByLabelText('delete button');

    expect(deleteItem).toHaveClass('delete-class');
  });
});
