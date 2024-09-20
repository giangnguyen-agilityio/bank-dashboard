import React, { memo, useCallback } from 'react';
import { clsx } from 'clsx';
import { Pagination as PaginationNextUI } from '@nextui-org/react';

import { LeftArrowIcon, RightArrowIcon } from '@app/assets';

import Button from '../Button';

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
  const itemClass = clsx('bg-transparent text-blue-200 shadow-none');

  const prevButtonClass = clsx(
    'flex p-0 font-primary font-semibold bg-transparent',
    {
      'text-blue-200': currentPage !== 1,
    },
  );

  const nextButtonClass = clsx(
    'flex p-0 font-primary font-semibold bg-transparent',
    {
      'text-blue-200': currentPage !== totalPages,
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
        onClick={handlePrev}
      >
        Prev
      </Button>

      <PaginationNextUI
        aria-label="Pagination"
        data-testid="pagination"
        classNames={{
          item: itemClass,
          cursor: 'bg-background-tertiary',
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
        onClick={handleNext}
      >
        Next
      </Button>
    </div>
  );
};

export default memo(Pagination);
