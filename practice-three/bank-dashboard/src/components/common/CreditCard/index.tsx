import { memo } from 'react';
import clsx from 'clsx';
import { Card, CardBody, CardFooter, Divider } from '@nextui-org/react';

import { Box, Text } from '@app/components';
import { ICreditCard } from '@app/interfaces';
import { BrandCardIcon, ChipCardIcon } from '@app/assets';
import { maskCardNumber } from '@app/utils';

interface CreditCardProps {
  isDefault?: boolean;
  data: ICreditCard;
}

const CreditCard = ({ isDefault = false, data }: CreditCardProps) => {
  const {
    balance = 0,
    cardHolder = '',
    cardNumber = '',
    expiryDate = '',
  } = data;

  const cardClass = clsx(
    'shadow-none w-66.25 md:w-57.75 lg:w-87.5 rounded-xl md:rounded-2xl lg:rounded-3xl',
    isDefault ? 'bg-linear-card' : 'bg-white border border-border-default',
  );

  const textClass = (baseClass: string, isLabel: boolean = false) => {
    const textColor = isLabel ? '!text-text-primary' : '!text-text-secondary';

    return clsx(baseClass, {
      'text-text-tertiary': isDefault,
      [textColor]: !isDefault,
    });
  };

  return (
    <Card className={cardClass}>
      {/* Card Body */}
      <CardBody className="flex gap-5.75 p-0 px-5 py-4 lg:gap-7.5 lg:px-6.5 lg:pt-4.5 lg:pb-7">
        <Box className="flex w-full justify-between items-center">
          {/* Card Balance */}
          <Box aria-label="Card Balance" data-testid="card-balance">
            <Text
              customClass={textClass(
                'font-secondary font-normal text-text-primary text-sm lg:text-base',
              )}
            >
              Balance
            </Text>
            <Text
              variant="description"
              customClass={textClass('text-2xl lg:text-5xl', false)}
            >
              ${balance}
            </Text>
          </Box>

          {/* Card Chip */}
          <ChipCardIcon isDefault={isDefault} />
        </Box>

        <Box className="flex w-full gap-17 items-center">
          {/* Card Holder */}
          <Box aria-label="Card Holder" data-testid="card-holder">
            <Text
              customClass={textClass(
                'font-secondary font-normal uppercase opacity-70 text-text-primary text-xs lg:text-base',
              )}
            >
              Card Holder
            </Text>
            <Text
              variant="description"
              customClass={textClass('text-md lg:text-xl', false)}
            >
              {cardHolder}
            </Text>
          </Box>

          {/* Card Date */}
          <Box aria-label="Card Date" data-testid="card-date">
            <Text
              customClass={textClass(
                'font-secondary font-normal uppercase opacity-70 text-text-primary text-xs lg:text-base',
              )}
            >
              Valid Thru
            </Text>
            <Text
              variant="description"
              customClass={textClass('text-md lg:text-xl', false)}
            >
              {expiryDate}
            </Text>
          </Box>
        </Box>
      </CardBody>

      <Divider />

      {/* Card Footer */}
      <CardFooter className="relative px-5 py-4 h-12.5 lg:h-17.5 lg:px-6.5 lg:py-5.5">
        {isDefault && (
          <Box className="absolute w-full h-full top-0 left-0 bg-background-default opacity-15" />
        )}
        <Box
          className={clsx('flex w-full justify-between items-center', {
            'text-text-tertiary': isDefault,
          })}
        >
          {/* Card Number */}
          <Text
            variant="description"
            customClass={textClass('text-xl lg:text-6xl', false)}
          >
            {maskCardNumber(cardNumber)}
          </Text>

          {/* Brand Icon */}
          <BrandCardIcon />
        </Box>
      </CardFooter>
    </Card>
  );
};

export default memo(CreditCard);
