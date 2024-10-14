import { memo, ReactNode } from 'react';
import isEqual from 'react-fast-compare';
import {
  Table as TableNextUI,
  TableBody,
  TableHeader,
  TableColumn,
  TableRow,
  TableCell,
  Spinner,
} from '@nextui-org/react';

// Constants
import { NOTIFICATIONS, SIZE_COLUMN_DEFAULT } from '@app/constants';

// Types
import { TableColumnType, TTableAccessor } from '@app/types';

// Utils
import { cn } from '@app/utils';

// Components
import { Text } from '@app/components';

type VariantTable = 'primary' | 'secondary';

interface CustomTableProps<T> {
  columns: TableColumnType<T>[];
  data: T[];
  variant?: VariantTable;
  isStriped?: boolean;
  isLoading?: boolean;
}

const CustomTable = <T extends { id: string }>({
  columns,
  data = [],
  isStriped = false,
  isLoading = false,
  variant = 'primary',
}: CustomTableProps<T>) => {
  const renderCell = (
    item: T,
    accessor?: TTableAccessor<T>,
    size?: number | string,
  ): ReactNode => {
    if (!accessor) return;

    if (typeof accessor === 'string')
      return (
        <Text
          customClass="text-base lg:text-2xl"
          style={{ maxWidth: size || SIZE_COLUMN_DEFAULT }}
        >
          {item[accessor] as ReactNode}
        </Text>
      );

    if (typeof accessor === 'function') return accessor(item);
  };

  const TableClasses = {
    wrapper: cn(
      'mx-auto',
      'min-w-81.25 w-full',
      'px-5 py-5 md:px-5 md:py-4.25 lg:px-7.5 lg:py-5',
      'rounded-xl md:rounded-2xl lg:rounded-3xl',
    ),
    header: cn(
      'bg-background-default border-b border-solid border-blue-20',
      'font-primary font-medium text-text-primary text-base lg:text-2xl',
      'pb-1.75 lg:pb-2.5',
    ),
    tr: cn(
      'border-b border-solid border-blue-20',
      '[&:last-child]:border-none',
      `${variant === 'secondary' ? 'flex justify-between md:justify-none' : ''}`,
    ),
    td: 'first:rounded-l-lg last:rounded-r-lg',
    cell: cn(
      'font-primary font-medium text-text-primary text-base lg:text-2xl',
      'content-center p-3 lg:p-3.5',
    ),
  };

  return (
    <TableNextUI
      {...(isStriped && { isStriped: true })}
      aria-label="Table"
      classNames={{
        wrapper: TableClasses.wrapper,
        th: TableClasses.header,
        tr: TableClasses.tr,
        td: cn(TableClasses.td, TableClasses.cell),
      }}
      hideHeader={variant === 'secondary'}
    >
      <TableHeader aria-label="Table header" className="border-spacing-y-0">
        {columns.map((columnConfig, index) => {
          const { header } = columnConfig;

          return (
            <TableColumn
              aria-label="Table column"
              key={`${header}-${index}`}
              data-testid="table-column"
              className={TableClasses.header}
            >
              {header}
            </TableColumn>
          );
        })}
      </TableHeader>

      <TableBody
        aria-label="Table body"
        data-testid="table-body"
        isLoading={isLoading}
        loadingContent={<Spinner className="pt-10" />}
        emptyContent={NOTIFICATIONS.NO_RECORDS_FOUND}
      >
        {data?.map((item) => (
          <TableRow
            key={item.id}
            aria-label={`Table row ${item.id}`}
            data-id={`table-row-${item.id}`}
          >
            {columns.map((columnConfig, indexColumn) => (
              <TableCell
                aria-label="Table-cell"
                key={`table-cell-${indexColumn}`}
                data-testid="table-cell"
                className={TableClasses.cell}
              >
                {renderCell(item, columnConfig.accessor, columnConfig.size)}
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
