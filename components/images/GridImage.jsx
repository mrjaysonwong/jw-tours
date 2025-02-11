import Image from 'next/image';
import { Box } from '@mui/material';

const GridImage = ({ src, alt }) => {
  return (
    <Box sx={{ width: '100%', height: '100vh', position: 'relative' }}>
      <Image
        src={src}
        alt={alt}
        priority
        fill
        sizes="900px"
        style={{ objectFit: 'cover' }}
      />
    </Box>
  );
};

export default GridImage
