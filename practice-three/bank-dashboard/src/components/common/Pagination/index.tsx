import React, { memo, useCallback } from 'react';
import { Pagination as PaginationNextUI } from '@nextui-org/react';

// Utils
import { cn } from '@app/utils';

// Icons
import { LeftArrowIcon, RightArrowIcon } from '@app/assets';

// Components
import { Button } from '@app/components';

interface PaginationProps {
  totalPages: number;
  currentPage?: number;
  onPageChange?: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({
  totalPages,
  currentPage = 1,
  onPageChange,
}) => {
  const itemClass = cn(
    'bg-transparent text-blue-200 dark:text-text-default shadow-none',
    'data-[active=true]:bg-blue-200 data-[active=true]:text-text-tertiary dark:data-[active=true]:bg-gray-100',
  );

  const prevButtonClass = cn(
    'flex p-0 font-primary font-semibold bg-transparent',
    {
      'text-blue-200 dark:text-text-default': currentPage !== 1,
    },
  );

  const nextButtonClass = cn(
    'flex p-0 font-primary font-semibold bg-transparent',
    {
      'text-blue-200 dark:text-text-default': currentPage !== totalPages,
    },
  );

  const handlePrev = useCallback(() => {
    if (currentPage > 1) {
      onPageChange?.(currentPage - 1);
    }
  }, [currentPage, onPageChange]);

  const handleNext = useCallback(() => {
    if (currentPage < totalPages) {
      onPageChange?.(currentPage + 1);
    }
  }, [currentPage, totalPages, onPageChange]);

  return (
    <div className="flex justify-center items-center font-primary font-semibold space-x-2 p-2">
      <Button
        aria-label="Previous Button"
        data-testid="prev-button"
        disableAnimation
        className={prevButtonClass}
        disabled={currentPage === 1}
        startContent={<LeftArrowIcon />}
        onPress={handlePrev}
      >
        Prev
      </Button>

      <PaginationNextUI
        aria-label="Pagination"
        data-testid="pagination"
        classNames={{
          item: itemClass,
          cursor: 'bg-background-secondary dark:bg-transparent',
        }}
        total={totalPages}
        page={currentPage}
        onChange={onPageChange}
      />

      <Button
        aria-label="Next Button"
        data-testid="next-button"
        disableAnimation
        className={nextButtonClass}
        disabled={currentPage === totalPages}
        endContent={<RightArrowIcon />}
        onPress={handleNext}
      >
        Next
      </Button>
    </div>
  );
};

export default memo(Pagination);
