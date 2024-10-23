import { memo } from 'react';
import Chart from 'react-apexcharts';
import { ApexOptions } from 'apexcharts';
import { Card } from '@nextui-org/react';

// Themes
import { colorPalette } from '@app/themes';

// Constants
import { SCREEN_WIDTH } from '@app/constants';

// Hooks
import { useMediaQuery } from '@app/hooks';

// Utils
import { cn } from '@app/utils';

const ExpenseStatisticsChart = () => {
  const isTablet = useMediaQuery(`(min-width: ${SCREEN_WIDTH.lg})`);
  const isDesktop = useMediaQuery(`(min-width: ${SCREEN_WIDTH.xl})`);
  const smallChartHeight = 270;

  const series = [15, 35, 20, 30];
  const labels = ['Bill Expense', 'Others', 'Investment', 'Entertainment'];

  const formatYaxisLabel = (val: number) => `${val}%`;
  const formatDataLabels = (val: number) => `${Math.round(val)}%`;

  const options: ApexOptions = {
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
      },
      zoom: {
        enabled: false,
      },
    },
    stroke: {
      width: 6,
      colors: [colorPalette.white[100]],
    },
    legend: {
      show: isTablet,
      position: 'bottom',
      offsetY: isDesktop ? -10 : -5,
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
  };

  return (
    <Card
      className={cn(
        'flex shadow-md h-full',
        'px-3 pt-3 md:px-5 md:pt-5 lg:px-6.25 lg:pt-7.5',
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
