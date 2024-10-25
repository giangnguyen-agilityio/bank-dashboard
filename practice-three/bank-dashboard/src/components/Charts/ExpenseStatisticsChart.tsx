import { memo } from 'react';
import Chart from 'react-apexcharts';
import { ApexOptions } from 'apexcharts';
import { Card } from '@nextui-org/react';

// Themes
import { colorPalette } from '@app/themes';

// Constants
import { CHART_MENU_ICON, SCREEN_WIDTH } from '@app/constants';

// Hooks
import { useMediaQuery } from '@app/hooks';

// Utils
import { cn } from '@app/utils';

interface ChartProps {
  series?: number[];
  labels?: string[];
  customOptions?: ApexOptions;
  className?: string;
}

const ExpenseStatisticsChart = ({
  series = [],
  labels = [],
  customOptions = {},
  className = '',
}: ChartProps) => {
  const isDesktop = useMediaQuery(`(min-width: ${SCREEN_WIDTH.xl})`);

  const smallChartHeight = 270;

  const formatYaxisLabel = (val: number) => `${val}%`;
  const formatDataLabels = (val: number) => `${Math.round(val)}%`;

  const defaultOptions: ApexOptions = {
    chart: {
      toolbar: {
        show: true,
        export: {
          csv: {
            filename: 'expense-statistics-chart',
          },
          png: {
            filename: 'expense-statistics-chart',
          },
          svg: {
            filename: 'expense-statistics-chart',
          },
        },
        tools: {
          download: CHART_MENU_ICON,
        },
      },
      zoom: {
        enabled: false,
      },
    },
    stroke: {
      colors: [colorPalette.white[100]],
    },
    legend: {
      show: true,
      position: 'bottom',
      offsetY: -10,
    },
    labels,
    yaxis: {
      show: false,
      labels: {
        formatter: formatYaxisLabel,
      },
    },
    fill: {
      type: 'gradient',
      opacity: 1,
    },
    colors: [
      colorPalette.orange[100],
      colorPalette.blue[200],
      colorPalette.pink[200],
      colorPalette.blue[100],
    ],
    dataLabels: {
      enabled: true,
      formatter: formatDataLabels,
    },
    responsive: [
      {
        breakpoint: 1024,
        options: {
          legend: {
            show: false,
          },
        },
      },

      {
        breakpoint: 1440,
        options: {
          legend: {
            offsetY: -5,
          },
        },
      },
    ],
  };

  // Merge customOptions with defaultOptions
  const options = { ...defaultOptions, ...customOptions };

  return (
    <Card
      className={cn(
        'flex shadow-md h-full',
        'px-3 pt-3 md:px-5 md:pt-5 lg:px-6.25 lg:pt-7.5',
        className,
      )}
    >
      <Chart
        options={options}
        series={series}
        type="donut"
        {...(isDesktop ? { height: '100%' } : { height: smallChartHeight })}
      />
    </Card>
  );
};

export default memo(ExpenseStatisticsChart);
