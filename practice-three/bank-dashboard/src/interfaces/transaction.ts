import { ReactNode } from 'react';

export enum TransactionKind {
  Income,
  Expense,
}

interface TransactionItemData {
  icon: ReactNode;
  transactionInfo: {
    title: string;
    date: string;
  };
  transactionAmount: number;
  kind: TransactionKind;
}

interface TransactionData {
  description: string;
  transactionId: string;
  type: string;
  category: string;
  date: string;
  amount: number;
}

export type { TransactionItemData, TransactionData };
