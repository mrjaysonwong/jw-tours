import Image from 'next/image';
import { TableCell, TableRow, Typography } from '@mui/material';

const NoDataRow = () => {
  return (
    <TableRow sx={{ height: '40vh' }}>
      <TableCell colSpan={12} align="center">
        <Image
          src="https://res.cloudinary.com/dpyxciwcu/image/upload/v1736652221/jwtours/status/alert-folder_18157948_p41rkd.png"
          alt="No data icon"
          width={109}
          height={109}
          priority
        />
        <Typography sx={{ color: 'grey' }}>No data</Typography>
      </TableCell>
    </TableRow>
  );
};

export default NoDataRow;
