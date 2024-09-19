import { CustomClassType } from '@app/types/components';

export const UpArrowIcon = ({
  customClass = 'w-7.5 h-7.5',
}: CustomClassType) => (
  <svg
    aria-label="Up Arrow Icon"
    className={customClass}
    viewBox="0 0 30 30"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <circle cx="15" cy="15" r="14" stroke="currentColor" stroke-width="2" />
    <path
      d="M15.5303 9.96967C15.2374 9.67678 14.7626 9.67678 14.4697 9.96967L9.6967 14.7426C9.40381 15.0355 9.40381 15.5104 9.6967 15.8033C9.98959 16.0962 10.4645 16.0962 10.7574 15.8033L15 11.5607L19.2426 15.8033C19.5355 16.0962 20.0104 16.0962 20.3033 15.8033C20.5962 15.5104 20.5962 15.0355 20.3033 14.7426L15.5303 9.96967ZM15.75 21L15.75 10.5L14.25 10.5L14.25 21L15.75 21Z"
      fill="currentColor"
    />
  </svg>
);
