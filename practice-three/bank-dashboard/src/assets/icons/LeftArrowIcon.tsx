import { CustomClassType } from '@app/types/components';

export const LeftArrowIcon = ({
  customClass = 'w-2.25 h-3.5',
}: CustomClassType) => (
  <svg
    aria-label="Left Arrow Icon"
    className={customClass}
    viewBox="0 0 9 14"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M8 13L2 7L8 1" stroke="currentColor" strokeWidth="2" />
  </svg>
);
