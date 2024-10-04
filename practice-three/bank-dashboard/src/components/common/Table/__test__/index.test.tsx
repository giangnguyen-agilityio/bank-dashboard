// Utils
import { render, screen } from '@app/utils';

// Constants
import { NOTIFICATIONS } from '@app/constants';

// Mocks
import {
  MOCK_ACCOUNTS_DATA,
  MOCK_COLUMNS_ACCOUNT_LIST,
  TableColumn,
} from '@app/mocks';

// Components
import { Table, Text } from '@app/components';

describe('CustomTable Component', () => {
  beforeEach(() => {
    jest.spyOn(console, 'warn').mockImplementation(jest.fn());
    jest.spyOn(console, 'error').mockImplementation(jest.fn());
  });

  it('should renders the table with data and headers correctly', () => {
    render(
      <Table
        columns={MOCK_COLUMNS_ACCOUNT_LIST}
        data={MOCK_ACCOUNTS_DATA}
        isStriped
      />,
    );

    const headers = screen.getAllByTestId('table-column');

    expect(headers).toHaveLength(MOCK_COLUMNS_ACCOUNT_LIST.length);
    expect(headers[0]).toHaveTextContent('Name');
    expect(headers[1]).toHaveTextContent('User Name');
    expect(headers[2]).toHaveTextContent('Email');
    expect(headers[3]).toHaveTextContent('Date Of Birth');
    expect(headers[4]).toHaveTextContent('Address');
  });

  it('should renders the secondary variant without headers', () => {
    render(
      <Table
        columns={MOCK_COLUMNS_ACCOUNT_LIST}
        data={MOCK_ACCOUNTS_DATA}
        variant="secondary"
      />,
    );

    const thead = screen.getAllByRole('rowgroup')[0];
    const className = thead.getAttribute('class');

    expect(className).toContain('hidden');
  });

  it('should renders the empty content message when no data is provided', () => {
    render(<Table columns={MOCK_COLUMNS_ACCOUNT_LIST} data={[]} />);

    expect(
      screen.getByText(NOTIFICATIONS.NO_RECORDS_FOUND),
    ).toBeInTheDocument();
  });

  it('should applies custom classes and styles correctly', () => {
    render(
      <Table columns={MOCK_COLUMNS_ACCOUNT_LIST} data={MOCK_ACCOUNTS_DATA} />,
    );

    const cells = screen.getAllByTestId('table-cell');

    expect(cells[0]).toHaveClass('text-base lg:text-2xl');
  });

  it('should renders the table with a column that has no accessor', () => {
    const modifiedColumns = [...MOCK_COLUMNS_ACCOUNT_LIST];
    modifiedColumns[0] = { header: 'Name' } as TableColumn;

    render(
      <Table columns={modifiedColumns} data={MOCK_ACCOUNTS_DATA} isStriped />,
    );

    const headers = screen.getAllByTestId('table-column');

    expect(headers).toHaveLength(modifiedColumns.length);
    expect(headers[0]).toHaveTextContent('Name');
  });

  it('should renders the table with a column that has an accessor function returning JSX', () => {
    const modifiedColumns = [...MOCK_COLUMNS_ACCOUNT_LIST];
    modifiedColumns[1] = {
      header: 'User Name',
      accessor: (customerData) => {
        const { username } = customerData || {};
        return <Text size="md">{username}</Text>;
      },
    };

    render(
      <Table columns={modifiedColumns} data={MOCK_ACCOUNTS_DATA} isStriped />,
    );

    const headers = screen.getAllByTestId('table-column');

    expect(headers).toHaveLength(modifiedColumns.length);
    expect(headers[1]).toHaveTextContent('User Name');
  });
});
