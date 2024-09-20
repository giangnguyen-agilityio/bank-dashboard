import { CustomClassType } from '@app/types/components';

export const RightArrowIcon = ({
  customClass = 'w-2.25 h-3.75',
}: CustomClassType) => (
  <svg
    aria-label="Wallet Icon"
    className={customClass}
    viewBox="0 0 9 15"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M1 1L7.5 7.5L1 14" stroke="currentColor" strokeWidth="2" />
  </svg>
);
