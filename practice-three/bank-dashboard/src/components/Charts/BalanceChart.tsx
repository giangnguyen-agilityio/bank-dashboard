import { memo } from 'react';
import { ApexOptions } from 'apexcharts';
import Chart from 'react-apexcharts';
import { Card } from '@nextui-org/react';

// Themes
import { colorPalette } from '@app/themes';

// Hooks
import { useMediaQuery } from '@app/hooks';

// Constants
import { CHART_MENU_ICON, SCREEN_WIDTH } from '@app/constants';

// Utils
import { cn } from '@app/utils';

interface ChartData {
  name: string;
  data: number[];
}

interface ChartProps {
  series?: ChartData[];
  labels?: string[];
  customOptions?: ApexOptions;
  className?: string;
}

const BalanceChart = ({
  series = [],
  labels = [],
  customOptions = {},
  className = '',
}: ChartProps) => {
  const isDesktop = useMediaQuery(`(min-width: ${SCREEN_WIDTH.xl})`);

  const smallChartHeight = 180;
  const mediumChartHeight = 230;

  const defaultOptions = {
    chart: {
      toolbar: {
        show: true,
        export: {
          csv: {
            filename: 'balance-chart',
          },
          png: {
            filename: 'balance-chart',
          },
          svg: {
            filename: 'balance-chart',
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
    xaxis: {
      categories: labels,
      labels: {
        style: {
          colors: colorPalette.blue[50],
        },
      },
    },
    yaxis: {
      labels: {
        style: {
          colors: colorPalette.blue[50],
        },
      },
    },
    dataLabels: {
      enabled: false,
    },
    stroke: {
      curve: 'smooth' as const,
    },
    grid: {
      borderColor: colorPalette.blue[25],
      strokeDashArray: 4,
      xaxis: {
        lines: {
          show: true,
        },
      },
    },
    colors: [colorPalette.blue[200]],
    fill: {
      type: 'gradient',
      gradient: {
        opacityFrom: 0.25, // Matching the opacity at 0%
        opacityTo: 0, // Matching the opacity at 100%
        colorStops: [
          {
            offset: 0, // 0% in the original gradient
            color: colorPalette.blue[300],
            opacity: 0.25,
          },
          {
            offset: 100, // 100% in the original gradient
            color: colorPalette.blue[300],
            opacity: 0,
          },
        ],
      },
    },
  };

  // Merge customOptions with defaultOptions
  const options = { ...defaultOptions, ...customOptions };

  return (
    <Card
      className={cn(
        'shadow-md',
        'pr-3 pt-3 md:pr-5 md:pt-5 lg:pr-6.25 lg:pt-7.5',
        className,
      )}
    >
      <Chart
        options={options}
        series={series}
        type="area"
        {...(!isDesktop
          ? { height: smallChartHeight }
          : { height: mediumChartHeight })}
      />
    </Card>
  );
};

export default memo(BalanceChart);
