interface ICreditCard {
  id: string;
  balance: number;
  cardHolder: string;
  expiryDate: string;
  cardNumber: string;
  isDefault?: boolean;
}

export type { ICreditCard };
