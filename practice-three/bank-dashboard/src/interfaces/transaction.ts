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

export type { TransactionItemData };
