// Utils
import { render, screen, userEvent } from '@app/utils';

// Components
import { Carousel } from '@app/components';

// Mocks
import { MOCK_QUICK_TRANSFER_DATA } from '@app/mocks';

describe('Carousel Component', () => {
  it('should renders the Carousel correctly', () => {
    const { container } = render(<Carousel data={MOCK_QUICK_TRANSFER_DATA} />);

    expect(container).toMatchSnapshot();
  });

  it('should shows the next slide when clicking the next button', async () => {
    render(<Carousel data={MOCK_QUICK_TRANSFER_DATA} />);

    const nextButton = screen.getByRole('button');

    await userEvent.click(nextButton);

    expect(
      screen.getByText(MOCK_QUICK_TRANSFER_DATA[3].name),
    ).toBeInTheDocument();
    expect(
      screen.queryByText(MOCK_QUICK_TRANSFER_DATA[2].name),
    ).not.toBeInTheDocument();
  });
});
