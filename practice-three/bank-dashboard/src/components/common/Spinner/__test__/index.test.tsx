// Utils
import { render, screen } from '@app/utils';

// Component
import { Spinner } from '@app/components';

describe('Spinner Component', () => {
  it('should render the Spinner component with circle style correctly', () => {
    render(
      <Spinner
        classNames={{
          circle1: 'border-b-red-100 border-l-red-100',
          circle2: 'border-b-red-100 border-l-red-100',
        }}
      />,
    );

    const spinner = screen.getByTestId('spinner');

    expect(spinner).toBeInTheDocument();
  });

  it('should render Spinner component correctly', () => {
    const { container } = render(<Spinner />);

    expect(container).toMatchSnapshot();
  });
});
