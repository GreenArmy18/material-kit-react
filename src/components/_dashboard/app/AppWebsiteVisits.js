import { merge } from 'lodash';
import ReactApexChart from 'react-apexcharts';
// material
import { Card, CardHeader, Box } from '@mui/material';
//
import { BaseOptionChart } from '../../charts';
import speedTestData from '../../../data/speed_tests-data.json';

// ----------------------------------------------------------------------
// get the last 10 donwload values from speedTestData
const last10Download = speedTestData.map((row) => row.Download).slice(-10);
// get the last 10 upload values from speedTestData
const last10Upload = speedTestData.map((row) => row.Upload).slice(-10);
// get the last 10 ping values from speedTestData
const last10Ping = speedTestData.map((row) => row.Ping).slice(-10);
console.log('last10Download', last10Download);
console.log('last10Upload', last10Upload);
console.log('last10Ping', last10Ping);
// ----------------------------------------------------------------------
// get the last 10 dates from speedTestData
const last10Dates = speedTestData.map((row) => row.Date).slice(-10);
const CHART_DATA = [
  {
    name: 'Ping',
    type: 'column',
    data: last10Ping
  },
  {
    name: 'Upload',
    type: 'line',
    data: last10Upload
  },
  {
    name: 'Download',
    type: 'area',
    data: last10Download
  }
];

export default function AppWebsiteVisits() {
  const chartOptions = merge(BaseOptionChart(), {
    stroke: { width: [0, 2, 3] },
    // dataLabels: { enabled: true },
    plotOptions: { bar: { columnWidth: '11%', borderRadius: 4 } },
    fill: { type: ['solid', 'solid', 'gradient'] },
    labels: last10Dates,
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
