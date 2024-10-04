import { Image, Link } from '@nextui-org/react';

// Constants
import { DESTINATION, ERROR_IMAGE, WIDTH_IMAGE } from '@app/constants';

// Components
import { Box, Text } from '@app/components';

export type ErrorFallbackProps = {
  message?: string;
};

const classes = {
  container: 'flex flex-col items-center gap-6 p-4',
  imageWrapper: 'h-92.5 md:h-125',
  errorMessage: 'text-center text-6xl md:text-8xl',
  detailErrorMessage:
    'w-full text-gray-150 text-center whitespace-pre-line text-2xl md:text-3xl',
  actionText:
    'font-medium text-center whitespace-pre-line text-2xl md:text-3xl',
  link: 'text-blue-200 text-2xl hover:underline md:text-3xl',
};

const ErrorFallback = ({ message = '' }: ErrorFallbackProps) => {
  const errorMessage = `Oops! Something went wrong :(`;
  const detailErrorMessage = `An error occurred. For more help, feel free to reach out to our support team`;

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

      {message && (
        <Text
          data-testid="error-message"
          customClass={classes.detailErrorMessage}
        >
          {`Detail error:\n${message}`}
        </Text>
      )}

      <Text customClass={classes.actionText}>
        Please refresh the page or&nbsp;
        <Link
          href={DESTINATION.DASHBOARD}
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
