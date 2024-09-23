interface IAccountStatusItem {
  icon: React.ReactNode;
  title: string;
  quantity: number;
  backgroundColor: string;
}

export enum AccountStatus {
  Active,
  Inactive,
}

interface IAccountData {
  accountId: string;
  name: string;
  username: string;
  password: string;
  email: string;
  dateOfBirth: string;
  presentAddress: string;
  permanentAddress: string;
  city: string;
  postalCode: string;
  county: string;
  status: AccountStatus;
}

export type { IAccountStatusItem, IAccountData };
