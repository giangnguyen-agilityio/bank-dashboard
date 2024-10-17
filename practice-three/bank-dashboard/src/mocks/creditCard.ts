import { ICreditCard } from '@app/interfaces';

const MOCK_CREDIT_CARD_DATA: ICreditCard[] = [
  {
    id: '1',
    balance: 5756,
    cardHolder: 'Eddy Cusuma',
    expiryDate: '12/22',
    cardNumber: '3778123456781234',
  },
  {
    id: '2',
    balance: 5756,
    cardHolder: 'Eddy Cusuma',
    expiryDate: '12/22',
    cardNumber: '3778123456781234',
    isDefault: true,
  },
];

export { MOCK_CREDIT_CARD_DATA };
