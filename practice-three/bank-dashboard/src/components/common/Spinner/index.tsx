import { memo } from 'react';
import { Spinner as SpinnerNextUI, SpinnerProps } from '@nextui-org/react';

const Spinner = ({ size = 'lg', classNames, ...props }: SpinnerProps) => {
  const { circle1 = '', circle2 = '' } = classNames || {};

  const circleClass =
    'border-4 border-b-background-secondary border-l-background-secondary';

  return (
    <div className="absolute inset-0 z-50">
      <SpinnerNextUI
        data-testid="spinner"
        className="absolute inset-0 m-auto z-60"
        size={size}
        classNames={{
          circle1: `${circleClass} ${circle1}`,
          circle2: `${circleClass} ${circle2}`,
          ...classNames,
        }}
        {...props}
      />
    </div>
  );
};

export default memo(Spinner);
