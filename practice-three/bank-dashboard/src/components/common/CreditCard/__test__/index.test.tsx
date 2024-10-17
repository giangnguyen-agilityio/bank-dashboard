// Utils
import { render, screen } from '@app/utils';

// Mocks
import { MOCK_CREDIT_CARD_DATA } from '@app/mocks';

// Interfaces
import { ICreditCard } from '@app/interfaces';

// Utils
import { maskCardNumber } from '@app/utils';

// Components
import { CreditCard } from '@app/components';

describe('CreditCard Component', () => {
  it('should render the CreditCard component', () => {
    const { container } = render(
      <CreditCard data={MOCK_CREDIT_CARD_DATA[0]} />,
    );

    expect(container).toMatchSnapshot();
  });

  it('should render with default values when data is missing', () => {
    render(<CreditCard data={{} as ICreditCard} />);

    expect(screen.getByText('$0')).toBeInTheDocument();
    expect(screen.getAllByText('')[0]).toBeInTheDocument();
  });

  it('should render with default values when data is undefined', () => {
    render(<CreditCard />);

    expect(screen.getByText('$0')).toBeInTheDocument();
    expect(screen.getAllByText('')[0]).toBeInTheDocument();
  });

  it('should display the masked card number', () => {
    render(<CreditCard data={MOCK_CREDIT_CARD_DATA[0]} />);

    expect(
      screen.getByText(maskCardNumber(MOCK_CREDIT_CARD_DATA[0].cardNumber)),
    ).toBeInTheDocument();
  });

  it('should apply default card styles when isDefault is true', () => {
    render(<CreditCard data={MOCK_CREDIT_CARD_DATA[1]} isDefault />);

    const cardElement = screen.getByTestId('credit-card');

    expect(cardElement).toHaveClass('bg-linear-card');
    expect(cardElement).not.toHaveClass('bg-white border-border-default');
  });

  it('should apply non-default card styles when isDefault is false', () => {
    render(<CreditCard data={MOCK_CREDIT_CARD_DATA[1]} isDefault={false} />);

    const cardElement = screen.getByTestId('credit-card');

    expect(cardElement).toHaveClass('bg-white-100 border-border-default');
    expect(cardElement).not.toHaveClass('bg-linear-card');
  });
});
