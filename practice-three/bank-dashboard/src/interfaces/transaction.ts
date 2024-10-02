import { ElementType } from 'react';

export enum TransactionKind {
  Income = 'Income',
  Expense = 'Expense',
}

interface TransactionItemData {
  transactionIcon: {
    icon: ElementType;
    backgroundColor: string;
  };
  transactionInfo: {
    title: string;
    date: string;
  };
  transactionAmount: number;
  kind: TransactionKind;
}

interface TransactionData {
  description: string;
  id: string;
  type: string;
  category: string;
  date: string;
  amount: number;
  cardNumber: string;
}

export type { TransactionItemData, TransactionData };
