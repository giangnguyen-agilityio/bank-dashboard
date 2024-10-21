import { Card } from '@nextui-org/react';

// Components
import {
  BalanceChart,
  Box,
  Button,
  CreditCard,
  Text,
  TransactionItem,
} from '@app/components';

// Mocks
import { MOCK_CREDIT_CARD_DATA, MOCK_TRANSACTION_ITEMS } from '@app/mocks';

const DashboardPage = () => {
  return (
    <Box className="min-h-fit flex flex-col gap-5.5 md:gap-5 lg:gap-6">
      <Box className="flex flex-col md:flex-row gap-5.5 md:gap-6.25 lg:gap-7.5">
        <Box className="flex flex-col gap-3 md:gap-4 lg:gap-5">
          {/* Card Action */}
          <Box className="card-action flex justify-between items-center">
            <Text
              as="h3"
              variant="heading"
              customClass="text-2xl md:text-4xl lg:text-6xl"
            >
              My Card
            </Text>
            <Button
              aria0-label="Add card button"
              color="default"
              className="font-primary font-semibold rounded-sm p-1 bg-transparent text-text-secondary text-lg md:text-xl lg:text-3xl"
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

        {/* Recent Transaction */}
        <Box className="flex flex-col w-full justify-between gap-3.75 md:gap-4.5 lg:gap-5">
          <Text
            as="h2"
            aria-label="Balance history chart title"
            variant="heading"
            customClass="text-2xl md:text-4xl lg:text-6xl"
          >
            Recent Transaction
          </Text>

          <Card className="flex shadow-none border border-blue-25 gap-3 px-4.5 py-5 md:px-3.75 md:py-3.75 lg:px-6.25 lg:py-6.25">
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
      </Box>

      {/* Balance Chart */}
      <BalanceChart />
    </Box>
  );
};

export default DashboardPage;
