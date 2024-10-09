import { useRouter } from '@tanstack/react-router';
import { Image } from '@nextui-org/react';

// Constants
import { UNAUTHORIZED_IMAGE } from '@app/constants';

// Components
import { Box, Button, Text } from '@app/components';

const classes = {
  container: 'flex flex-col items-center gap-4 p-4',
  imageWrapper:
    'relative z-2 w-[500px] md:w-[800px] h-80 md:h-125 aspect-video',
  title: 'font-semibold text-center text-4xl md:text-8xl',
  message:
    'font-medium max-w-lg text-gray-150 text-center whitespace-pre-line text-lg md:text-5xl',
  link: 'font-medium text-white-100 bg-background-secondary p-3 rounded-lg text-2xl md:text-3xl',
};

const UnauthorizedPage = () => {
  const router = useRouter();

  const handleNavigateBack = () => {
    router.history.back();
  };

  return (
    <Box className={classes.container}>
      <Image
        aria-label="Unauthorized image"
        classNames={{
          wrapper: classes.imageWrapper,
          img: classes.imageWrapper,
        }}
        src={UNAUTHORIZED_IMAGE}
        alt="Unauthorized Image"
      />
      <Box className="absolute pt-24.5 md:pt-32.75 z-1">
        <Text data-testid="title" customClass={classes.title}>
          Whoops!
        </Text>

        <Text data-testid="message" customClass={classes.message}>
          You don't have permission to access this page.
        </Text>
      </Box>
      <Button
        className={classes.link}
        aria-label="Link back to previous page"
        onClick={handleNavigateBack}
      >
        Back to previous page
      </Button>
    </Box>
  );
};

export default UnauthorizedPage;
