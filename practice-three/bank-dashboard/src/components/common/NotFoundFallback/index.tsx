import { Image, Link } from '@nextui-org/react';

// Constants
import { DESTINATION, NOT_FOUND_URL_IMAGE } from '@app/constants';

// Components
import { Box, Text } from '@app/components';

export type NotFoundFallbackProps = {
  title?: string;
  message?: string;
};

const classes = {
  container: 'flex flex-col items-center gap-4 p-4',
  imageWrapper: 'h-92.5 md:h-125',
  title: 'font-medium text-center text-6xl md:text-8xl',
  message:
    'max-w-lg text-gray-150 text-center whitespace-pre-line text-2xl md:text-3xl',
  link: 'font-medium text-white-100 bg-background-secondary p-3 rounded-lg text-2xl md:text-3xl',
};

const NotFoundFallback = ({
  title = 'Sorry, page not found',
  message = "The page you are looking for doesn't exist or another error occurred. Please go back to the Homepage.",
}: NotFoundFallbackProps) => {
  return (
    <Box className={classes.container}>
      <Image
        classNames={{
          wrapper: classes.imageWrapper,
          img: classes.imageWrapper,
        }}
        src={NOT_FOUND_URL_IMAGE}
        alt="Not Found Image"
      />
      <Text data-testid="title" customClass={classes.title}>
        {title}
      </Text>

      {message && (
        <Text data-testid="message" customClass={classes.message}>
          {message}
        </Text>
      )}

      <Link href={DESTINATION.DASHBOARD} className={classes.link}>
        Back to home
      </Link>
    </Box>
  );
};

export default NotFoundFallback;
