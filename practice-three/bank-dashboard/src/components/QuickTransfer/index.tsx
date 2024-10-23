import { Card } from '@nextui-org/react';

// Icons
import { SendIcon } from '@app/assets';

// Mocks
import { MOCK_QUICK_TRANSFER_DATA } from '@app/mocks';

// Utils
import { cn } from '@app/utils';

// Components
import { Box, Input, Button, Text, Carousel } from '@app/components';

const QuickTransfer = () => (
  <Card className="shadow-md h-full justify-center p-3 lg:p-6.25 w-full">
    <Box>
      <Carousel data={MOCK_QUICK_TRANSFER_DATA} />
    </Box>

    <Box className="flex gap-6.25 md:gap-5 lg:gap-7 pt-5 lg:pt-7.5">
      <Box className="content-center">
        <Text variant="primary" customClass="text-base lg:text-2xl">
          Write Amount
        </Text>
      </Box>
      <Input
        aria-label="amount input field"
        data-testid="amount-input"
        classNames={{
          inputWrapper: 'p-0 pl-4 rounded-full max-h-10 lg:max-h-12.5',
          input: 'text-base md:text-lg lg:text-2xl',
          label: 'text-base md:text-xl',
        }}
        min={0}
        type="number"
        endContent={
          <Button
            className={cn(
              'rounded-full font-primary font-medium p-2',
              'w-full max-w-31.25 h-10 lg:h-12.5',
              'text-base lg:text-2xl',
            )}
            size="md"
          >
            Send
            <SendIcon customClass="w-5 h-5" />
          </Button>
        }
      />
    </Box>
  </Card>
);

export { QuickTransfer };
