import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip,
  Legend,
} from 'recharts';
import { Box, Typography, Card, Grid } from '@mui/material';
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';

const data = [
  { name: 'Africa', value: 400 },
  { name: 'America', value: 300 },
  { name: 'Asia', value: 300 },
  { name: 'Europe', value: 200 },
];

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

const RADIAN = Math.PI / 180;
const renderCustomizedLabel = ({
  cx,
  cy,
  midAngle,
  innerRadius,
  outerRadius,
  percent,
  index,
}) => {
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);

  return (
    <text
      x={x}
      y={y}
      fill="white"
      textAnchor={x > cx ? 'start' : 'end'}
      dominantBaseline="central"
    >
      {`${(percent * 100).toFixed(0)}%`}
    </text>
  );
};

const legendPayload = data.map((entry, index) => ({
  id: entry.name,
  name: entry.name,
  value: entry.value,
  type: 'line',
  color: COLORS[index % COLORS.length],
}));

const GridPayload = ({ payload }) => (
  <Grid container sx={{ width: '200px', m: 'auto' }}>
    <Grid item xs={6}>
      <Typography fontWeight={500}>Continents</Typography>
      {payload.map((entry) => (
        <div
          key={entry.id}
          style={{
            display: 'flex',
            alignItems: 'center',
          }}
        >
          <FiberManualRecordIcon sx={{ color: entry.color, mr: 1 }} />
          <Typography>{entry.name}</Typography>
        </div>
      ))}
    </Grid>

    <Grid item xs={6} textAlign="right">
      <Typography fontWeight={500}>Views</Typography>
      {payload.map((entry) => (
        <div key={entry.id}>
          <Typography textAlign="right">{entry.value}</Typography>
        </div>
      ))}
    </Grid>
  </Grid>
);

export default function WebsiteViewsChart() {
  return (
    <Card sx={{ p: 3, pb: 7 }}>
      <Box sx={{ height: '400px' }}>
        <Typography variant="h6">Website Views</Typography>

        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              labelLine={false}
              label={renderCustomizedLabel}
              outerRadius={100}
              stroke="none"
              dataKey="value"
            >
              {data.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={COLORS[index % COLORS.length]}
                />
              ))}
            </Pie>

            <Tooltip />
            <Legend
              payload={legendPayload}
              content={({ payload }) => <GridPayload payload={payload} />}
            />
          </PieChart>
        </ResponsiveContainer>
      </Box>
    </Card>
  );
}
