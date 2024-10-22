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

const ActivityChart = () => {
  const isMobile = useMediaQuery(`(max-width: ${SCREEN_WIDTH.sm})`);

  const options: ApexOptions = {
    chart: {
      toolbar: {
        show: true,
        offsetX: 15,
      },
      zoom: {
        enabled: false,
      },
    },
    plotOptions: {
      bar: {
        horizontal: false,
        columnWidth: isMobile ? 10 : 20,
        borderRadius: isMobile ? 4 : 8,
      },
    },
    dataLabels: {
      enabled: false,
    },
    stroke: {
      show: true,
      width: 2,
      curve: 'smooth',
    },
    xaxis: {
      categories: ['Sat', 'Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri'],
      labels: {
        style: {
          fontSize: isMobile ? '14px' : '16px',
          colors: colorPalette.blue[50],
        },
      },
    },
    yaxis: {
      labels: {
        style: {
          fontSize: isMobile ? '14px' : '16px',
          colors: colorPalette.blue[50],
        },
      },
    },
    legend: {
      markers: {
        shape: 'circle',
      },
      fontSize: isMobile ? '14px' : '16px',
      position: 'top',
      horizontalAlign: 'right',
      itemMargin: {
        horizontal: 15,
        vertical: 0,
      },
      offsetX: 20,
    },
    colors: [colorPalette.blue[200], colorPalette.green[200]],
  };

  const series = [
    {
      name: 'Deposit',
      data: [490, 350, 350, 490, 150, 405, 400],
    },
    {
      name: 'Withdraw',
      data: [250, 115, 280, 380, 235, 260, 320],
    },
  ];

  return (
    <Box className="flex flex-col gap-3.75 md:gap-4.5 lg:gap-5">
      <Text
        as="h2"
        aria-label="Balance history chart title"
        variant="heading"
        customClass="text-2xl md:text-4xl lg:text-6xl"
      >
        Weekly Activity
      </Text>

      <Card className="shadow-md px-3 pt-3 md:px-5 md:pt-5 lg:px-6.25 lg:pt-7.5">
        <Chart options={options} series={series} type="bar" />
      </Card>
    </Box>
  );
};

export default memo(ActivityChart);
