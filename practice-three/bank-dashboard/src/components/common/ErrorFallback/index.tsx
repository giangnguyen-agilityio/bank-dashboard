import React from 'react';
import { Link } from '@tanstack/react-router';
import { Card, Image } from '@nextui-org/react';

// Constants
import { DESTINATION, ERROR_IMAGE, WIDTH_IMAGE } from '@app/constants';

// Utils
import { cn } from '@app/utils';

// Components
import { Box, Text } from '@app/components';

const classes = {
  container: 'flex flex-col items-center gap-6 p-4',
  imageWrapper: 'w-[500px] md:w-[1000px] h-80 md:h-125 aspect-video',
  errorMessage: 'text-center text-6xl md:text-8xl',
  detailErrorMessage:
    'w-full text-gray-150 text-center whitespace-pre-line text-2xl md:text-3xl',
  actionText:
    'font-medium text-center whitespace-pre-line text-2xl md:text-3xl',
  link: 'text-blue-200 text-2xl hover:underline md:text-3xl',
};

interface ErrorFallbackProps {
  error?: Error;
}

const ErrorFallback: React.FC<ErrorFallbackProps> = ({ error }) => {
  const errorMessage = `Oops! Something went wrong :(`;
  const detailErrorMessage = `An error occurred. For more help, feel free to reach out to our support team.`;

  if (error) {
    return (
      <Card
        className={cn(
          classes.container,
          'w-full h-auto justify-center shadow-md gap-4',
        )}
      >
        <Text customClass="text-base md:text-3xl">{errorMessage}</Text>
        <pre
          className={cn(
            'text-center whitespace-pre-line text-text-error',
            'text-base md:text-2xl',
          )}
        >
          {error.message}
        </pre>
      </Card>
    );
  }

  return (
    <Box className={classes.container}>
      <Image
        aria-label="Error image"
        classNames={{
          wrapper: classes.imageWrapper,
          img: classes.imageWrapper,
        }}
        width={WIDTH_IMAGE}
        src={ERROR_IMAGE}
        alt="Error Image"
      />
      <Text customClass={classes.errorMessage}>{errorMessage}</Text>
      <Text customClass={classes.detailErrorMessage}>{detailErrorMessage}</Text>

      <Text customClass={classes.actionText}>
        Please refresh the page or&nbsp;
        <Link
          to={DESTINATION.DASHBOARD}
          aria-label="Link back to home"
          className={classes.link}
        >
          back to home
        </Link>
      </Text>
    </Box>
  );
};

export default ErrorFallback;
