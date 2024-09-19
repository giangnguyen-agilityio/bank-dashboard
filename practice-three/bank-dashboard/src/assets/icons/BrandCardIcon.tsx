import { CustomClassType } from '@app/types/components';

export const BrandCardIcon = ({
  customClass = 'w-11 h-7.5',
}: CustomClassType) => (
  <svg
    aria-label="Brand Card Icon"
    className={customClass}
    fill="none"
    viewBox="0 0 44 30"
    xmlns="http://www.w3.org/2000/svg"
  >
    <circle cx={15} cy={15} r={15} fill="#fff" fillOpacity={0.5} />
    <circle cx={29} cy={15} r={15} fill="#fff" fillOpacity={0.5} />
  </svg>
);
