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

const ActivityChart = () => {
  const isMobile = useMediaQuery(`(max-width: ${SCREEN_WIDTH.sm})`);
  const isDesktop = useMediaQuery(`(min-width: ${SCREEN_WIDTH.lg})`);
  const categories = ['Sat', 'Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri'];

  const options: ApexOptions = {
    chart: {
      toolbar: {
        show: true,
        offsetX: 15,
        export: {
          csv: {
            filename: 'weekly-activity-chart',
          },
          png: {
            filename: 'weekly-activity-chart',
          },
          svg: {
            filename: 'weekly-activity-chart',
          },
        },
      },
      zoom: {
        enabled: false,
      },
    },
    plotOptions: {
      bar: {
        horizontal: false,
        columnWidth: isMobile ? 10 : isDesktop ? 16 : 20,
        borderRadius: isMobile ? 4 : isDesktop ? 7 : 8,
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
      categories,
      labels: {
        style: {
          fontSize: isMobile ? '14px' : isDesktop ? '12px' : '16px',
          colors: colorPalette.blue[50],
        },
      },
    },
    yaxis: {
      labels: {
        style: {
          fontSize: isMobile ? '14px' : isDesktop ? '12px' : '16px',
          colors: colorPalette.blue[50],
        },
      },
    },
    legend: {
      markers: {
        shape: 'circle',
      },
      fontSize: isMobile ? '14px' : isDesktop ? '12px' : '16px',
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
    <Card className="shadow-md h-full px-3 pt-3 md:px-5 md:pt-5 lg:px-6.25 lg:pt-7.5">
      <Chart options={options} series={series} type="bar" height={300} />
    </Card>
  );
};

export default memo(ActivityChart);
