// Mocks
import { MOCK_CREDIT_CARD_DATA } from '@app/mocks';

// Images
import { ExpenseChart } from '@app/assets';

// HOCs
import ErrorBoundary from '@app/hocs';

// Components
import {
  Box,
  Button,
  CreditCard,
  Text,
  TransactionTable,
} from '@app/components';

const TransactionPage = () => (
  <Box className="min-h-fit flex flex-col gap-5.5 md:gap-5 lg:gap-6">
    <Box className="flex flex-col md:flex-row gap-5.5 md:gap-6.25 lg:gap-7.5">
      <ErrorBoundary>
        <Box className="flex flex-col gap-3 md:gap-4 lg:gap-5">
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
              aria-label="Add card button"
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

      {/* Expense Chart */}
      <ErrorBoundary>
        <Box className="flex flex-col gap-3 md:gap-4 lg:gap-5 w-full md:w-57.75 lg:w-87.5">
          <Text
            variant="heading"
            customClass="text-2xl md:text-4xl lg:text-6xl"
          >
            My Expense
          </Text>

          <ExpenseChart customClass="w-fit rounded-3xl md:h-45.75 lg:w-87.5 lg:h-full" />
        </Box>
      </ErrorBoundary>
    </Box>

    {/* Transactions List */}
    <ErrorBoundary>
      <Box className="flex flex-col gap-3.75 md:gap-4.5 lg:gap-5">
        <Text
          as="h3"
          variant="heading"
          customClass="text-2xl md:text-4xl lg:text-6xl"
        >
          Recent Transactions
        </Text>

        {/* Transaction Table */}
        <TransactionTable />
      </Box>
    </ErrorBoundary>
  </Box>
);

export default TransactionPage;
