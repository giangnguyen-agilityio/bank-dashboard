import { CustomClassType } from '@app/types';

export const BrandCardIcon = ({ customClass }: CustomClassType) => (
  <svg
    aria-label="Brand Card Icon"
    className={customClass}
    width={44}
    height={30}
    fill="none"
    viewBox="0 0 44 30"
    xmlns="http://www.w3.org/2000/svg"
  >
    <circle cx={15} cy={15} r={15} fill="currentColor" fillOpacity={0.5} />
    <circle cx={29} cy={15} r={15} fill="currentColor" fillOpacity={0.5} />
  </svg>
);
