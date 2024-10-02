import { Skeleton } from '@nextui-org/react';

// Mocks
import { MOCK_CREDIT_CARD_DATA } from '@app/mocks';

// Components
import {
  Box,
  Button,
  CreditCard,
  Text,
  TransactionTable,
} from '@app/components';
import { useFetchTransactions } from '@app/hooks/useTransaction';
import { TransactionKind } from '@app/interfaces';

const TransactionPage = () => {
  const { data: transactionData } = useFetchTransactions();
  const { data: incomeTransactionData } = useFetchTransactions(
    TransactionKind.Income,
  );
  const { data: expenseTransactionData } = useFetchTransactions(
    TransactionKind.Expense,
  );

  const { transactions, count: totalTransactions } = transactionData || {};
  const { transactions: incomeTransactions, count: totalIncomeTransactions } =
    incomeTransactionData || {};
  const { transactions: expenseTransactions, count: totalExpenseTransactions } =
    expenseTransactionData || {};

  return (
    <Box className="min-h-screen flex flex-col gap-5.5 md:gap-5 lg:gap-6">
      <Box className="flex flex-col md:flex-row gap-5.5 md:gap-6.25 lg:gap-7.5">
        <Box className="flex flex-col gap-3 md:gap-4 lg:gap-5">
          {/* Card Action */}
          <Box className="card-action flex justify-between items-center">
            <Text
              variant="heading"
              customClass="text-2xl md:text-4xl lg:text-6xl"
            >
              My Card
            </Text>
            <Button
              color="default"
              className="font-primary font-semibold rounded-sm p-1 bg-transparent text-text-secondary text-lg md:text-xl lg:text-3xl"
            >
              + Add Card
            </Button>
          </Box>

          {/* Card List */}
          <Box className="card-wrapper mr-[-24px] md:mr-0">
            <Box className="w-full overflow-x-auto gap-2 md:pb-0">
              <Box className="w-max">
                <Box className="card-list w-fit flex gap-5 md:gap-6.25 lg:gap-7.5">
                  <CreditCard data={MOCK_CREDIT_CARD_DATA} />
                  <CreditCard data={MOCK_CREDIT_CARD_DATA} isDefault />
                </Box>
              </Box>
            </Box>
          </Box>
        </Box>

        {/* Expense Chart */}
        <Box className="flex flex-col gap-3 md:gap-4 lg:gap-5 w-full md:w-57.75 lg:w-87.5">
          <Text
            variant="heading"
            customClass="text-2xl md:text-4xl lg:text-6xl"
          >
            My Expense
          </Text>

          <Skeleton className="w-full rounded-3xl md:w-57.75 lg:w-87.5 h-52.75 md:h-full" />
        </Box>
      </Box>

      {/* Transactions List */}
      <Box className="flex flex-col gap-3.75 md:gap-4.5 lg:gap-5">
        <Text variant="heading" customClass="text-2xl md:text-4xl lg:text-6xl">
          Recent Transactions
        </Text>

        {/* Transaction Table */}
        <TransactionTable
          transactions={transactions}
          incomeTransactions={incomeTransactions}
          expenseTransactions={expenseTransactions}
          totalTransactions={totalTransactions}
          totalIncomeTransactions={totalIncomeTransactions}
          totalExpenseTransactions={totalExpenseTransactions}
        />
      </Box>
    </Box>
  );
};

export default TransactionPage;
