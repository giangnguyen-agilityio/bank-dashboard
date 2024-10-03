import { ElementType } from 'react';

interface IAccountStatusItem {
  icon: ElementType;
  title: string;
  quantity: number;
  backgroundColor: string;
}

export enum AccountRole {
  Admin,
  User,
}

interface IAccountData {
  id: string;
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
  status: boolean;
  role: AccountRole;
}

export type { IAccountStatusItem, IAccountData };
