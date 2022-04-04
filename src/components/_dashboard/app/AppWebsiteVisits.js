import { merge } from 'lodash';
import ReactApexChart from 'react-apexcharts';
// material
import { Card, CardHeader, Box } from '@mui/material';
//
import { BaseOptionChart } from '../../charts';

// ----------------------------------------------------------------------

const CHART_DATA = [
  {
    name: 'Ping',
    type: 'column',
    data: [24, 29, 21, 29, 46, 22, 23, 23, 33, 31, 31]
  },
  {
    name: 'Upload',
    type: 'line',
    data: [4, 4, 6, 9, 4, 9, 7, 9, 99, 87, 98]
  },
  {
    name: 'Download',
    type: 'area',
    data: [163, 131, 144, 86, 13, 101, 207, 47, 399, 264, 182]
  }
];

export default function AppWebsiteVisits() {
  const chartOptions = merge(BaseOptionChart(), {
    stroke: { width: [0, 2, 3] },
    plotOptions: { bar: { columnWidth: '11%', borderRadius: 4 } },
    fill: { type: ['solid', 'solid', 'gradient'] },
    labels: [
      '01/01/2022',
      '02/01/2022',
      '03/01/2022',
      '04/01/2022',
      '05/01/2022',
      '06/01/2022',
      '07/01/2022',
      '08/01/2022',
      '09/01/2022',
      '10/01/2022',
      '11/01/2022'
    ],
    xaxis: { type: 'datetime' },
    tooltip: {
      shared: true,
      intersect: false,
      y: {
        formatter: (y) => {
          if (typeof y !== 'undefined') {
            return `${y.toFixed(0)} Mbps`;
          }
          return y;
        }
      }
    }
  });

  return (
    <Card>
      <CardHeader title="Last 10 Results" subheader="(+43%) than last month" />
      <Box sx={{ p: 3, pb: 1 }} dir="ltr">
        <ReactApexChart type="line" series={CHART_DATA} options={chartOptions} height={364} />
      </Box>
    </Card>
  );
}
