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

// Components
import { Box, Text } from '@app/components';

const ExpenseStatisticsChart = () => {
  const isMobile = useMediaQuery(`(max-width: ${SCREEN_WIDTH.sm})`);

  const series = [15, 35, 20, 30];
  const labels = ['Bill Expense', 'Others', 'Investment', 'Entertainment'];

  const options: ApexOptions = {
    chart: {
      toolbar: {
        show: true,
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
      fontSize: isMobile ? '8px' : '16px',
      offsetX: 0,
      offsetY: -20,
      markers: {
        offsetX: isMobile ? -5 : -10,
      },
    },
    labels,
    yaxis: {
      show: false,
      labels: {
        formatter: function (val) {
          return val + '%';
        },
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
      style: {
        fontSize: isMobile ? '8px' : '20px',
      },
      formatter: function (val) {
        return `${Math.round(Number(val))}%`;
      },
    },
  };

  return (
    <Box className="flex flex-col gap-3.75 md:gap-4.5 lg:gap-5">
      <Text
        as="h2"
        aria-label="Balance history chart title"
        variant="heading"
        customClass="text-2xl md:text-4xl lg:text-6xl"
      >
        Expense Statistics
      </Text>

      <Card className="shadow-md px-3 pt-3 md:px-5 md:pt-5 lg:px-6.25 lg:pt-7.5">
        <Chart options={options} series={series} type="donut" />
      </Card>
    </Box>
  );
};

export default memo(ExpenseStatisticsChart);
