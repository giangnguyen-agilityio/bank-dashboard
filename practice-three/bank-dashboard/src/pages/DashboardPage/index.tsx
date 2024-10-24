import { Card } from '@nextui-org/react';

// Mocks
import { MOCK_CREDIT_CARD_DATA, MOCK_TRANSACTION_ITEMS } from '@app/mocks';

// Hooks
import { useMediaQuery } from '@app/hooks';

// Constants
import { SCREEN_WIDTH } from '@app/constants';

// Utils
import { cn } from '@app/utils';

// HOCs
import ErrorBoundary from '@app/hocs';

// Components
import {
  ActivityChart,
  BalanceChart,
  Box,
  Button,
  CreditCard,
  ExpenseStatisticsChart,
  Text,
  TransactionItem,
  QuickTransfer,
} from '@app/components';

const DashboardPage = () => {
  const isMobile = useMediaQuery(`(min-width: ${SCREEN_WIDTH.sm})`);

  return (
    <Box className="min-h-fit flex flex-col gap-5.5 md:gap-5 lg:gap-6">
      <Box className="flex flex-col md:flex-row gap-5.5 md:gap-6.25 lg:gap-7.5">
        <ErrorBoundary>
          <Box as="section" className="flex flex-col gap-3 md:gap-4 lg:gap-5">
            {/* Card Action */}
            <Box className="card-action flex justify-between items-center">
              <Text
                as="h2"
                variant="heading"
                customClass="text-2xl md:text-4xl lg:text-6xl"
              >
                My Card
              </Text>
              <Button
                aria0-label="Add card button"
                color="default"
                className={cn(
                  'bg-transparent rounded-sm p-1',
                  'font-primary font-semibold text-text-secondary',
                  'text-lg md:text-xl lg:text-3xl',
                )}
              >
                See All
              </Button>
            </Box>

            {/* Card List */}
            <Box className="card-wrapper mr-[-24px] md:mr-0">
              <Box className="w-full overflow-x-auto gap-2 md:pb-0">
                <Box className="w-max">
                  <Box className="card-list w-fit flex gap-5 md:gap-6.25 lg:gap-7.5">
                    {MOCK_CREDIT_CARD_DATA.map((card) => (
                      <CreditCard
                        key={card.id}
                        data={card}
                        isDefault={card.isDefault}
                      />
                    ))}
                  </Box>
                </Box>
              </Box>
            </Box>
          </Box>
        </ErrorBoundary>

        {/* Recent Transaction */}
        <ErrorBoundary>
          <Box
            as="section"
            className={cn(
              'flex flex-col w-full justify-between',
              'gap-3.75 md:gap-4.5 lg:gap-5',
            )}
          >
            <Text
              as="h2"
              aria-label="Balance history chart title"
              variant="heading"
              customClass="text-2xl md:text-4xl lg:text-6xl"
            >
              Recent Transaction
            </Text>

            <Card
              className={cn(
                'flex shadow-none border border-blue-25 gap-3',
                'px-4.5 py-5 md:px-3.75 md:py-3.75 lg:px-6.25 lg:py-6.25',
              )}
            >
              {MOCK_TRANSACTION_ITEMS.map((transaction, index) => (
                <TransactionItem
                  key={`${transaction.transactionInfo}-${index}`}
                  transactionIcon={transaction.transactionIcon}
                  transactionInfo={transaction.transactionInfo}
                  transactionAmount={transaction.transactionAmount}
                  kind={transaction.kind}
                />
              ))}
            </Card>
          </Box>
        </ErrorBoundary>
      </Box>

      <Box className="flex flex-col md:flex-row gap-5.5 md:gap-6.25 lg:gap-7.5">
        {/* Weekly Activity Section*/}
        <ErrorBoundary>
          <Box
            as="section"
            className={cn(
              'flex flex-col',
              'md:min-w-[487px] lg:min-w-[730px]',
              'gap-3.75 md:gap-4.5 lg:gap-5',
            )}
          >
            <Text
              as="h2"
              aria-label="Weekly activity chart title"
              variant="heading"
              customClass="text-2xl md:text-4xl lg:text-6xl"
            >
              Weekly Activity
            </Text>

            {/* Weekly Activity Chart */}
            <ActivityChart />
          </Box>
        </ErrorBoundary>

        {/* Expense Statistics Section */}
        <ErrorBoundary>
          <Box
            as="section"
            className="w-full flex flex-col gap-3.75 md:gap-4.5 lg:gap-5"
          >
            <Text
              as="h2"
              aria-label="Expense statistics chart title"
              variant="heading"
              customClass="text-2xl md:text-4xl lg:text-6xl"
            >
              Expense Statistics
            </Text>

            {/* Expense Statistics Chart */}
            <ExpenseStatisticsChart />
          </Box>
        </ErrorBoundary>
      </Box>

      <Box
        className={cn(
          'flex flex-col',
          'gap-5.5 md:gap-6.25 lg:gap-7.5',
          isMobile && 'flex-row',
        )}
      >
        {/* Quick Transfer Section */}
        <ErrorBoundary>
          <Box
            as="section"
            className={cn(
              'flex flex-col',
              'w-full md:w-111.25 lg:w-182.5',
              'gap-3.75 md:gap-4.5 lg:gap-5',
            )}
          >
            <Text
              as="h2"
              aria-label="Quick transfer title"
              variant="heading"
              customClass="text-2xl md:text-4xl lg:text-6xl"
            >
              Quick Transfer
            </Text>

            {/* Quick Transfer */}
            <QuickTransfer />
          </Box>
        </ErrorBoundary>

        {/* Balance History Section */}
        <ErrorBoundary>
          <Box
            as="section"
            className="w-full flex flex-col gap-3.75 md:gap-4.5 lg:gap-5"
          >
            <Text
              as="h2"
              aria-label="Balance history chart title"
              variant="heading"
              customClass="text-2xl md:text-4xl lg:text-6xl"
            >
              Balance History
            </Text>

            {/* Balance Chart */}
            <BalanceChart />
          </Box>
        </ErrorBoundary>
      </Box>
    </Box>
  );
};

export default DashboardPage;
