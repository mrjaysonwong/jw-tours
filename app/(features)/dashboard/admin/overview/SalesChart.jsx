import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import { Box, Typography, Card, useTheme, useMediaQuery } from '@mui/material';

const getRandomSales = (min, max) =>
  Math.floor(Math.random() * (max - min + 1)) + min;

const data = [
  {
    name: 'Jan',
    'This Year': getRandomSales(250000, 1500000),
    'Last Year': getRandomSales(250000, 1500000),
  },
  {
    name: 'Feb',
    'This Year': getRandomSales(250000, 1500000),
    'Last Year': getRandomSales(250000, 1500000),
  },
  {
    name: 'Mar',
    'This Year': getRandomSales(250000, 1500000),
    'Last Year': getRandomSales(250000, 1500000),
  },
  {
    name: 'Apr',
    'This Year': getRandomSales(250000, 1500000),
    'Last Year': getRandomSales(250000, 1500000),
  },
  {
    name: 'May',
    'This Year': getRandomSales(250000, 1500000),
    'Last Year': getRandomSales(250000, 1500000),
  },
  {
    name: 'Jun',
    'This Year': getRandomSales(250000, 1500000),
    'Last Year': getRandomSales(250000, 1500000),
  },
  {
    name: 'Jul',
    'This Year': getRandomSales(250000, 1500000),
    'Last Year': getRandomSales(250000, 1500000),
  },
  {
    name: 'Aug',
    'This Year': getRandomSales(250000, 1500000),
    'Last Year': getRandomSales(250000, 1500000),
  },
  {
    name: 'Sep',
    'This Year': getRandomSales(250000, 1500000),
    'Last Year': getRandomSales(250000, 1500000),
  },
  {
    name: 'Oct',
    'This Year': getRandomSales(250000, 1500000),
    'Last Year': getRandomSales(250000, 1500000),
  },
  {
    name: 'Nov',
    'This Year': getRandomSales(250000, 1500000),
    'Last Year': getRandomSales(250000, 1500000),
  },
  {
    name: 'Dec',
    'This Year': getRandomSales(250000, 1500000),
    'Last Year': getRandomSales(250000, 1500000),
  },
];

const formatYAxisValue = (value) => {
  if (value >= 1000000) {
    return `${(value / 1000000).toFixed(1)}M`;
  } else if (value >= 1000) {
    return `${Math.round(value / 1000)}k`;
  }
  return value;
};

export default function SalesChart() {
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <Card sx={{ p: 3, pb: 7 }}>
      <Box sx={{ height: isSmallScreen ? '700px' : '400px' }}>
        <Typography variant="h6">Sales</Typography>

        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            layout={isSmallScreen ? 'vertical' : 'horizontal'}
            barCategoryGap={isSmallScreen ? 12 : 10}
            data={data}
            margin={{
              bottom: 20,
            }}
          >
            {isSmallScreen ? (
              <>
                <CartesianGrid strokeDasharray="5 2" />
                <XAxis type="number" tickFormatter={formatYAxisValue} />
                <YAxis dataKey="name" type="category" />
              </>
            ) : (
              <>
                <CartesianGrid strokeDasharray="5 2" />
                <XAxis dataKey="name" />
                <YAxis type="number" tickFormatter={formatYAxisValue} />
              </>
            )}
            <Tooltip
              formatter={(value, name) => [
                `₱${new Intl.NumberFormat('en').format(value)}`,
                name,
              ]}
              labelStyle={{ color: 'black' }}
              cursor={{ fill: '#4747474d' }}
            />
            <Legend align="right" verticalAlign="top" height={36} />
            <Bar dataKey="This Year" fill="var( --color-green-light)" />
            <Bar dataKey="Last Year" fill="#808080e6" />
          </BarChart>
        </ResponsiveContainer>
      </Box>
    </Card>
  );
}
