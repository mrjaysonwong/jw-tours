import { Typography, Box } from '@mui/material';
import CheckIcon from '@mui/icons-material/Check';

const InclusionsList = ({ inclusions }) => {
  return (
    <Box
      component="ul"
      sx={{
        display: { xs: 'block', md: 'flex' },
        listStyle: 'none',
        flexWrap: 'wrap',
        gap: 1,
      }}
    >
      {inclusions.items.map((item, index) => (
        <Box component="li" key={index} sx={{ mr: 1.5, display: 'flex' }}>
          <span>
            <CheckIcon color="primary" sx={{ fontSize: '1.1rem' }} />
          </span>
          <Typography variant="body2" sx={{ ml: 0.5 }}>
            {item}
          </Typography>
        </Box>
      ))}
    </Box>
  );
};

export default InclusionsList;
