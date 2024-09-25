// Constants
import { WIDTH_COLUMN_CONFIG } from '@app/constants';

// Interfaces
import { IAccountData } from '@app/interfaces';

// Types
import { TTableAccessor } from '@app/types';

export type TableColumn = {
  header: string;
  accessor: TTableAccessor<IAccountData>;
  size?: number;
};

const MOCK_COLUMNS_ACCOUNT_LIST: TableColumn[] = [
  { header: 'Name', accessor: 'name' },
  {
    header: 'User Name',
    accessor: 'username',
    size: WIDTH_COLUMN_CONFIG.MEDIUM,
  },
  {
    header: 'Email',
    accessor: 'email',
    size: WIDTH_COLUMN_CONFIG.LARGE,
  },
  {
    header: 'Date Of Birth',
    accessor: 'dateOfBirth',
  },
  {
    header: 'Address',
    accessor: 'presentAddress',
  },
];

export { MOCK_COLUMNS_ACCOUNT_LIST };
