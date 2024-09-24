import { memo, ReactNode } from 'react';
import { clsx } from 'clsx';
import isEqual from 'react-fast-compare';
import {
  Table as TableNextUI,
  TableBody,
  TableHeader,
  TableColumn,
  TableRow,
  TableCell,
} from '@nextui-org/react';

// Types
import { TableColumnType, TTableAccessor } from '@app/types';

type VariantTable = 'primary' | 'secondary';

interface CustomTableProps<T> {
  columns: TableColumnType<T>[];
  data: T[];
  variant?: VariantTable;
  isStriped?: boolean;
}

const CustomTable = <T extends { id: string }>({
  columns,
  data,
  isStriped = false,
  variant = 'primary',
}: CustomTableProps<T>) => {
  const renderCell = (item: T, accessor?: TTableAccessor<T>): ReactNode => {
    if (!accessor) return;

    if (typeof accessor === 'string')
      return <div>{item[accessor] as ReactNode}</div>;

    if (typeof accessor === 'function') return accessor(item);
  };

  const TableClasses = {
    wrapper: clsx(
      'mx-auto',
      'w-81.25 md:185.75 lg:w-277.5',
      'px-5 py-5 md:px-5 md:py-4.25 lg:px-7.5 lg:py-5',
      'rounded-xl md:rounded-2xl lg:rounded-3xl',
    ),
    header: clsx(
      'bg-background-default border-b border-solid border-blue-20',
      'font-primary font-medium text-text-primary text-base lg:text-2xl',
      'pb-1.75 lg:pb-2.5',
    ),
    tr: clsx(
      'border-b border-solid border-blue-20',
      '[&:last-child]:border-none',
    ),
    td: 'first:rounded-l-lg last:rounded-r-lg',
    cell: clsx(
      'font-primary font-medium text-text-primary text-base lg:text-2xl',
      'p-3 lg:p-3.5',
    ),
  };

  return (
    <TableNextUI
      {...(isStriped && { isStriped: true })}
      classNames={{
        wrapper: TableClasses.wrapper,
        th: TableClasses.header,
        tr: TableClasses.tr,
        td: clsx(TableClasses.td, TableClasses.cell),
      }}
      hideHeader={variant === 'secondary'}
    >
      <TableHeader className="border-spacing-y-0">
        {columns.map((columnConfig, index) => {
          const { header } = columnConfig;

          return (
            <TableColumn
              key={`${header}${index}`}
              data-testid="table-column"
              className={TableClasses.header}
            >
              {header}
            </TableColumn>
          );
        })}
      </TableHeader>

      <TableBody data-testid="table-body" emptyContent={'No records found.'}>
        {data.map((item) => (
          <TableRow key={item.id} data-id={`table-row-${item.id}`}>
            {columns.map((columnConfig, indexColumn) => (
              <TableCell
                key={`table-cell-${indexColumn}`}
                data-testid="table-cell"
                className={TableClasses.cell}
              >
                {renderCell(item, columnConfig.accessor)}
              </TableCell>
            ))}
          </TableRow>
        ))}
      </TableBody>
    </TableNextUI>
  );
};

export const Table = memo(CustomTable, isEqual) as <T>(
  props: CustomTableProps<T>,
) => JSX.Element;
