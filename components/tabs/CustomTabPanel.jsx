import { Box } from '@mui/material';

const CustomTabPanel = (props) => {
  const { children, value, index, a11ylabel, ...other } = props;

  const safeLabel = a11ylabel.toLowerCase().replace(/\s+/g, '-');

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`${safeLabel}-tabpanel-${index}`}
      aria-labelledby={`${safeLabel}-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ py: 3 }}>{children}</Box>}
    </div>
  );
};

export default CustomTabPanel;
