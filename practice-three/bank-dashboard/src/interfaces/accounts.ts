import { ElementType } from 'react';

interface IAccountStatusItem {
  icon: ElementType;
  title: string;
  quantity: number;
  backgroundColor: string;
}

export enum AccountRole {
  Admin = 'Admin',
  User = 'User',
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
  country: string;
  status: boolean;
  role: AccountRole;
}

interface SecurityFormData {
  password: string;
  newPassword: string;
}

type SettingFormData = Omit<IAccountData, 'id' | 'role' | 'status'>;

export type {
  IAccountStatusItem,
  IAccountData,
  SettingFormData,
  SecurityFormData,
};
