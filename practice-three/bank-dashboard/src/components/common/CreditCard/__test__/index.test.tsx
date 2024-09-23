import { render, screen } from '@testing-library/react';

import { MOCK_CREDIT_CARD_DATA } from '@app/mocks';
import { ICreditCard } from '@app/interfaces';
import { maskCardNumber } from '@app/utils';
import { CreditCard } from '@app/components';

describe('CreditCard Component', () => {
  it('should render the CreditCard component', () => {
    render(<CreditCard data={MOCK_CREDIT_CARD_DATA} />);

    expect(screen.getByTestId('card-balance')).toBeInTheDocument();
    expect(screen.getByTestId('card-holder')).toBeInTheDocument();
    expect(screen.getByTestId('card-date')).toBeInTheDocument();
  });

  it('should render with default values when data is missing', () => {
    render(<CreditCard data={{} as ICreditCard} />);

    expect(screen.getByText('$0')).toBeInTheDocument();
    expect(screen.getAllByText('')[0]).toBeInTheDocument();
  });

  it('should render with default values when data is undefined', () => {
    render(<CreditCard data={undefined as unknown as ICreditCard} />);

    expect(screen.getByText('$0')).toBeInTheDocument();
    expect(screen.getAllByText('')[0]).toBeInTheDocument();
  });

  it('should display the masked card number', () => {
    render(<CreditCard data={MOCK_CREDIT_CARD_DATA} />);

    expect(
      screen.getByText(maskCardNumber(MOCK_CREDIT_CARD_DATA.cardNumber)),
    ).toBeInTheDocument();
  });

  it('should apply default card styles when isDefault is true', () => {
    render(<CreditCard data={MOCK_CREDIT_CARD_DATA} isDefault />);

    const cardElement = screen.getByTestId('credit-card');

    expect(cardElement).toHaveClass('bg-linear-card');
    expect(cardElement).not.toHaveClass('bg-white border-border-default');
  });

  it('should apply non-default card styles when isDefault is false', () => {
    render(<CreditCard data={MOCK_CREDIT_CARD_DATA} isDefault={false} />);

    const cardElement = screen.getByTestId('credit-card');

    expect(cardElement).toHaveClass('bg-white border-border-default');
    expect(cardElement).not.toHaveClass('bg-linear-card');
  });

  it('should render BrandCardIcon and ChipCardIcon', () => {
    render(<CreditCard data={MOCK_CREDIT_CARD_DATA} />);

    expect(screen.getByLabelText('Brand Card Icon')).toBeInTheDocument();
    expect(screen.getByLabelText('Chip Card Icon')).toBeInTheDocument();
  });

  it('should format the balance correctly', () => {
    render(<CreditCard data={{ ...MOCK_CREDIT_CARD_DATA, balance: 1500 }} />);

    expect(screen.getByText('$1,500')).toBeInTheDocument();
  });

  it('should render the overlay when isDefault is true', () => {
    render(<CreditCard data={MOCK_CREDIT_CARD_DATA} isDefault />);

    const overlay = screen.getByTestId('card-background');

    expect(overlay).toHaveClass('bg-background-default');
  });
});
