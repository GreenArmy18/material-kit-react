import { merge } from 'lodash';
import ReactApexChart from 'react-apexcharts';
// material
import { Card, CardHeader, Box } from '@mui/material';
//
import { BaseOptionChart } from '../../charts';

// ----------------------------------------------------------------------

const CHART_DATA = [
  {
    name: 'Download',
    type: 'column',
    data: [163.0336363, 131.683385, 22, 27, 13, 22, 37, 21, 44, 22, 30]
  },
  {
    name: 'Upload',
    type: 'area',
    data: [4.16577002, 4.207767192, 41, 67, 22, 43, 21, 41, 56, 27, 43]
  },
  {
    name: 'Ping',
    type: 'line',
    data: [24.454, 29.157, 36, 30, 45, 35, 64, 52, 59, 36, 39]
  }
];

export default function AppWebsiteVisits() {
  const chartOptions = merge(BaseOptionChart(), {
    stroke: { width: [0, 2, 3] },
    plotOptions: { bar: { columnWidth: '11%', borderRadius: 4 } },
    fill: { type: ['solid', 'gradient', 'solid'] },
    labels: [
      '26/03/2021',
      '01/04/2021',
      '03/01/2003',
      '04/01/2003',
      '05/01/2003',
      '06/01/2003',
      '07/01/2003',
      '08/01/2003',
      '09/01/2003',
      '10/01/2003',
      '11/01/2003'
    ],
    xaxis: { type: 'datetime' },
    tooltip: {
      shared: true,
      intersect: false,
      y: {
        formatter: (y) => {
          if (typeof y !== 'undefined') {
            return `${y.toFixed(0)} visits`;
          }
          return y;
        }
      }
    }
  });

  return (
    <Card>
      <CardHeader title="Last 10 Results" subheader="(+43%) than last year" />
      <Box sx={{ p: 3, pb: 1 }} dir="ltr">
        <ReactApexChart type="line" series={CHART_DATA} options={chartOptions} height={364} />
      </Box>
    </Card>
  );
}
