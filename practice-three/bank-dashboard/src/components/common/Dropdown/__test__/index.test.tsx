import { render, screen, userEvent, waitFor } from '@app/utils';

// Components
import { Dropdown } from '@app/components';

jest.mock('@app/utils', () => ({
  ...jest.requireActual('@app/utils'),
  cn: jest.fn(),
}));

const defaultProps = {
  id: 'dropdown-1',
  actions: [
    { key: 'edit', className: 'text-success-500' },
    { key: 'delete', className: 'text-red-500' },
  ],
  onAction: jest.fn(),
};

describe('Dropdown Component', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should render without crashing', () => {
    const { container } = render(<Dropdown {...defaultProps} />);

    expect(container).toMatchSnapshot();
  });

  it('should display the actions provided', async () => {
    render(<Dropdown {...defaultProps} />);

    await userEvent.click(screen.getByLabelText('More actions button'));

    await waitFor(() => {
      expect(screen.getByLabelText('edit button')).toBeInTheDocument();
    });
    expect(screen.getByLabelText('delete button')).toBeInTheDocument();
  });

  it('should trigger onAction when an action is clicked', async () => {
    render(<Dropdown {...defaultProps} />);

    await userEvent.click(screen.getByLabelText('More actions button'));

    await userEvent.click(screen.getByLabelText('edit button'));

    await waitFor(() => {
      expect(defaultProps.onAction).toHaveBeenCalledWith(defaultProps.id);
    });
  });

  it('should not call onAction if no handler is provided', async () => {
    const { onAction, ...propsWithoutHandler } = defaultProps;

    render(<Dropdown {...propsWithoutHandler} />);

    await userEvent.click(screen.getByLabelText('More actions button'));

    await userEvent.click(screen.getByLabelText('edit button'));

    await waitFor(() => {
      expect(onAction).not.toHaveBeenCalled();
    });
  });
});
