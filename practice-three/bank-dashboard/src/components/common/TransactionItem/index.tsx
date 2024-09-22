import { memo } from 'react';

import { Box, Text } from '@app/components';
import { TransactionItemData } from '@app/interfaces';
import { getTransactionAmountStyles } from '@app/utils';

const TransactionItem = ({
  icon,
  transactionInfo,
  transactionAmount,
  kind,
}: TransactionItemData) => {
  const { className, symbol } = getTransactionAmountStyles(kind);

  return (
    <Box className="flex w-full">
      <Box
        data-testid="transaction-icon"
        className="mr-3.75 md:mr-2 lg:mr-4.25"
      >
        {icon}
      </Box>

      <Box className="flex w-full h-full items-center justify-between">
        <Box
          className="flex flex-col w-32.75 md:w-25.5 lg:w-40"
          data-testid="transaction-info"
        >
          <Text
            data-testid="transaction-title"
            variant="title"
            customClass="mb-1 text-lg !text-text-default md:text-md lg:mb-1.75 lg:text-2xl"
          >
            {transactionInfo.title}
          </Text>
          <Text
            data-testid="transaction-date"
            variant="title"
            customClass="font-regular text-base lg:text-xl"
          >
            {transactionInfo.date}
          </Text>
        </Box>

        <Text
          data-testid="transaction-amount"
          customClass={`h-full text-sm font-primary font-medium lg:text-2xl ${className}`}
        >
          {symbol}${transactionAmount.toLocaleString('en-US')}
        </Text>
      </Box>
    </Box>
  );
};

export default memo(TransactionItem);
