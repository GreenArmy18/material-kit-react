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
    data: [163, 131, 144, 86, 13, 101, 207, 47, 399, 264, 182, 408, 410, 366]
  },
  {
    name: 'Upload',
    type: 'area',
    data: [4, 4, 6, 9, 4, 9, 7, 9, 99, 87, 98, 98, 98, 94]
  },
  {
    name: 'Ping',
    type: 'line',
    data: [24, 29, 21, 29, 46, 22, 23, 23, 33, 31, 31, 33, 32, 30]
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
      '20/06/2021',
      '22/06/2021',
      '01/07/2021',
      '27/07/2021',
      '17/08/2021',
      '18/09/2021',
      '11/10/2021',
      '17/11/2021',
      '15/12/2021',
      '08/01/2022',
      '26/01/2022',
      '01/02/2022'
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
