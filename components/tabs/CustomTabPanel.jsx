import { Box } from '@mui/material';

const CustomTabPanel = (props) => {
  const { children, value, index, a11ylabel, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`${a11ylabel}-tabpanel-${index}`}
      aria-labelledby={`${a11ylabel}-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ py: 3 }}>{children}</Box>}
    </div>
  );
};

export default CustomTabPanel;
