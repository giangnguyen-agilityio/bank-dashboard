import { memo } from 'react';
import Chart from 'react-apexcharts';
import { Card } from '@nextui-org/react';

// Themes
import { colorPalette } from '@app/themes';

// Hooks
import { useMediaQuery } from '@app/hooks';

// Constants
import { SCREEN_WIDTH } from '@app/constants';

const BalanceChart = () => {
  const isDesktop = useMediaQuery(`(min-width: ${SCREEN_WIDTH.xl})`);
  const categories = [
    'Jul',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec',
    'Jan',
    'Feb',
    'Mar',
    'Apr',
  ];
  const smallChartHeight = 180;
  const mediumChartHeight = 230;

  const options = {
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
      },
      zoom: {
        enabled: false,
      },
    },
    xaxis: {
      categories,
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
  const series = [
    {
      name: 'Balance',
      data: [110, 310, 210, 480, 420, 780, 200, 585, 210, 620],
    },
  ];

  return (
    <Card className="shadow-md pr-3 pt-3 md:pr-5 md:pt-5 lg:pr-6.25 lg:pt-7.5">
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
