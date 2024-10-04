// Utils
import { render, screen } from '@app/utils';

// Components
import { Avatar } from '@app/components';

describe('Avatar Component', () => {
  it('should render the Avatar with default size (md)', () => {
    render(<Avatar />);

    const avatar = screen.getByTestId('avatar');

    expect(avatar).toHaveClass('w-15 h-15');
  });

  it('should apply the custom class if provided', () => {
    render(<Avatar customClass="custom-class" />);

    const avatar = screen.getByTestId('avatar');

    expect(avatar).toHaveClass('custom-class');
  });

  it('should apply size class based on the size prop', () => {
    render(<Avatar size="xl" />);

    const avatar = screen.getByTestId('avatar');

    expect(avatar).toHaveClass('w-27.5 h-27.5');
  });

  it('should render border with the correct color and opacity if hasBorder is true', () => {
    render(<Avatar color="primary" hasBorder />);

    const avatar = screen.getByTestId('avatar');

    expect(avatar).toHaveClass('border-2 border-primary border-opacity-25');
  });

  it('should not render the border if hasBorder is false', () => {
    render(<Avatar color="primary" />);

    const avatar = screen.getByTestId('avatar');

    expect(avatar).not.toHaveClass('border-2');
  });

  it('should render the edit icon when isEdit is true and size is greater than xl', () => {
    const sizes: ('xl' | '2xl' | '3xl')[] = ['xl', '2xl', '3xl'];

    sizes.forEach((size) => {
      const { container } = render(<Avatar size={size} isEdit />);
      const editIcon = container.querySelector('[data-testid="icon"]');

      expect(editIcon).toBeInTheDocument();
    });
  });

  it('should not render the edit icon when isEdit is true but size is smaller than xl', () => {
    render(<Avatar size="md" isEdit />);

    const editIcon = screen.queryByTestId('icon');

    expect(editIcon).not.toBeInTheDocument();
  });
});
