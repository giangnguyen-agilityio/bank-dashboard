import { memo } from 'react';

// Interfaces
import { TransactionItemData } from '@app/interfaces';

// Utils
import { cn, getTransactionAmountStyles } from '@app/utils';

// Mocks
import { MOCK_DEFAULT_TRANSACTION_ITEMS } from '@app/mocks';

// Components
import { Box, Text, CustomIcon } from '@app/components';

const TransactionItem = ({
  transactionIcon,
  transactionInfo: { title, date },
  transactionAmount,
  kind,
}: TransactionItemData) => {
  const { className: amountClassName, symbol } =
    getTransactionAmountStyles(kind);

  const {
    icon = MOCK_DEFAULT_TRANSACTION_ITEMS.transactionIcon.icon,
    backgroundColor = MOCK_DEFAULT_TRANSACTION_ITEMS.transactionIcon
      .backgroundColor,
  } = transactionIcon || {};

  const formattedAmount = `${symbol}$${transactionAmount.toLocaleString('en-US')}`;

  return (
    <Box aria-label="Transaction item" className="flex w-full">
      {/* Icon Section */}
      <Box
        aria-label="Transaction icon"
        data-testid="transaction-icon"
        className="mr-3.75 md:mr-2 lg:mr-4.25"
      >
        <CustomIcon
          IconComponent={icon}
          customClass={cn('size-12.5 md:size-10 lg:size-14', backgroundColor)}
        />
      </Box>

      {/* Info and Amount Section */}
      <Box className="flex w-full h-full items-center justify-between">
        <Box
          aria-label="Transaction info"
          className="flex flex-col w-32.75 md:w-25.5 lg:w-40"
          data-testid="transaction-info"
        >
          {/* Transaction Title */}
          <Text
            aria-label="Transaction title"
            data-testid="transaction-title"
            variant="title"
            customClass="mb-1 text-lg text-text-default md:text-md lg:mb-1.75 lg:text-2xl"
          >
            {title}
          </Text>

          {/* Transaction Date */}
          <Text
            aria-label="Transaction date"
            data-testid="transaction-date"
            variant="title"
            customClass="font-normal text-base lg:text-xl"
          >
            {date}
          </Text>
        </Box>

        {/* Transaction Amount */}
        <Text
          aria-label="Transaction amount"
          data-testid="transaction-amount"
          customClass={`h-full text-sm font-medium lg:text-2xl ${amountClassName}`}
        >
          {formattedAmount}
        </Text>
      </Box>
    </Box>
  );
};

export default memo(TransactionItem);
