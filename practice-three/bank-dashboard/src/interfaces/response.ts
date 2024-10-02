import { IAccountData, TransactionData } from '@app/interfaces';

interface TransactionResponse {
  transactions: TransactionData[];
  count: number;
}

interface AccountResponse {
  users: IAccountData[];
  count: number;
}

export type { TransactionResponse, AccountResponse };
