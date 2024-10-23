import { useState } from 'react';

// Icons
import { RightArrowIcon } from '@app/assets';

// Utils
import { cn } from '@app/utils';

// Components
import { Avatar, Box, Button, Text } from '@app/components';

interface CarouselProps {
  data: {
    id: number;
    src: string;
    name: string;
    role: string;
  }[];
}

const Carousel = ({ data }: CarouselProps) => {
  const [index, setIndex] = useState(0);

  const ITEMS_PER_SLIDE = 3;
  const totalSlides = Math.ceil(data.length / ITEMS_PER_SLIDE);

  const nextSlide = () => {
    setIndex((prev) => (prev + 1) % totalSlides);
  };

  const currentData = data.slice(
    index * ITEMS_PER_SLIDE,
    index * ITEMS_PER_SLIDE + ITEMS_PER_SLIDE,
  );

  return (
    <Box
      className={cn(
        'flex justify-center items-center',
        'w-full md:w-73.75 lg:w-full',
        'gap-2.5 lg:gap-8.25',
      )}
    >
      <Box className="w-full flex gap-3 justify-center items-center lg:min-w-25">
        {currentData.map((data, index) => (
          <Box
            key={index}
            className="w-full flex flex-col justify-center items-center gap-3 lg:gap-3"
          >
            <Avatar
              src={data.src}
              customClass="w-12.5 h-12.5 lg:w-17.5 lg:h-17.5"
            />
            <Box className="flex flex-col gap-1.5 justify-between items-center">
              <Text
                variant="default"
                customClass="text-base lg:text-2xl max-w-15 lg:max-w-20"
                title={data.name}
              >
                {data.name}
              </Text>
              <Text
                variant="title"
                customClass="text-base lg:text-xl font-normal text-center max-w-15 lg:max-w-20"
                title={data.role}
              >
                {data.role}
              </Text>
            </Box>
          </Box>
        ))}
      </Box>

      <Button
        isIconOnly
        variant="circle"
        className={cn(
          'bg-transparent shadow-md border border-blue-10',
          'w-10 h-10 lg:w-14 lg:h-12.5',
        )}
        endContent={<RightArrowIcon customClass="text-text-primary" />}
        onPress={nextSlide}
      />
    </Box>
  );
};

export { Carousel };
