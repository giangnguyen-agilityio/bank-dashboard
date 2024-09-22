import { TransactionKind } from '@app/interfaces';

/**
 * Renders a transaction icon component within a wrapper with a default size and rounded corners.
 * @param IconComponent - The icon component to render.
 * @param bgColorClass - A tailwind class for the background color of the icon wrapper.
 * @returns The rendered icon component within the wrapper.
 */
const ICON_WRAPPER_CLASS =
  'flex justify-center items-center rounded-full size-12.5 md:size-10 lg:size-14';

const renderTransactionIcon = (
  IconComponent: React.ElementType,
  bgColorClass: string,
) => (
  <div className={`${ICON_WRAPPER_CLASS} ${bgColorClass}`}>
    <IconComponent />
  </div>
);

/**
 * Given a transaction kind, returns an object containing a tailwind class for the transaction amount text color and a symbol to be prepended to the amount.
 * @param kind - The transaction kind. Can be 'expense', 'income', or any other string.
 * @returns An object with two properties: `className` and `symbol`. `className` is a tailwind class for the transaction amount text color. `symbol` is a string to be prepended to the amount.
 */
const getTransactionAmountStyles = (kind: TransactionKind) => {
  switch (kind) {
    case TransactionKind.Expense:
      return {
        className: 'text-text-error',
        symbol: '-',
      };
    case TransactionKind.Income:
      return {
        className: 'text-text-success',
        symbol: '+',
      };
    default:
      return {
        className: '',
        symbol: '',
      };
  }
};

export { renderTransactionIcon, getTransactionAmountStyles };
