import { memo } from 'react';
import Chart from 'react-apexcharts';
import { ApexOptions } from 'apexcharts';
import { Card } from '@nextui-org/react';

// Themes
import { colorPalette } from '@app/themes';

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

const ActivityChart = ({
  series = [],
  labels = [],
  customOptions = {},
  className = '',
}: ChartProps) => {
  const defaultOptions: ApexOptions = {
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
        columnWidth: 16,
        borderRadius: 7,
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
      categories: labels,
      labels: {
        style: {
          fontSize: '12px',
          colors: colorPalette.blue[50],
        },
      },
    },
    yaxis: {
      labels: {
        style: {
          fontSize: '12px',
          colors: colorPalette.blue[50],
        },
      },
    },
    legend: {
      markers: {
        shape: 'circle',
      },
      fontSize: '12px',
      position: 'top',
      horizontalAlign: 'right',
      itemMargin: {
        horizontal: 15,
        vertical: 0,
      },
      offsetX: 20,
    },
    colors: [colorPalette.blue[200], colorPalette.green[200]],
    responsive: [
      {
        breakpoint: 640,
        options: {
          plotOptions: {
            bar: {
              columnWidth: 10,
              borderRadius: 4,
            },
          },
          xaxis: {
            labels: {
              style: {
                fontSize: '14px',
              },
            },
          },
          yaxis: {
            labels: {
              style: {
                fontSize: '14px',
              },
            },
          },
          legend: {
            fontSize: '14px',
          },
        },
      },
      {
        breakpoint: 1024,
        options: {
          plotOptions: {
            bar: {
              columnWidth: 20,
              borderRadius: 8,
            },
          },
          xaxis: {
            labels: {
              style: {
                fontSize: '16px',
              },
            },
          },
          yaxis: {
            labels: {
              style: {
                fontSize: '16px',
              },
            },
          },
          legend: {
            fontSize: '16px',
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
        'shadow-md h-full',
        'px-3 pt-3 md:px-5 md:pt-5 lg:px-6.25 lg:pt-7.5',
        className,
      )}
    >
      <Chart options={options} series={series} type="bar" height={300} />
    </Card>
  );
};

export default memo(ActivityChart);
