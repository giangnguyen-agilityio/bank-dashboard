export const BrandCardIcon = ({
  customClass,
  isDefault = false,
}: {
  customClass?: string;
  isDefault?: boolean;
}) => {
  return (
    <svg
      aria-label="Brand Card Icon"
      className={customClass}
      width={44}
      height={30}
      fill="none"
      viewBox="0 0 44 30"
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle
        cx={15}
        cy={15}
        r={15}
        fill={isDefault ? '#b1b1b1' : 'currentColor'}
        fillOpacity={0.5}
      />
      <circle
        cx={29}
        cy={15}
        r={15}
        fill={isDefault ? '#b1b1b1' : 'currentColor'}
        fillOpacity={0.5}
      />
    </svg>
  );
};
