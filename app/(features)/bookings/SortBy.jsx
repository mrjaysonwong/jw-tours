'use client';

import { useRouter, usePathname, useSearchParams } from 'next/navigation';
import { Typography, Box, MenuItem, FormControl, Select } from '@mui/material';

const SortBy = () => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const sortParam = searchParams.get('sort') === 'oldest' ? 'oldest' : 'newest';

  const handleChange = (event) => {
    const newSort = event.target.value;
    const queryParams = new URLSearchParams(searchParams);

    queryParams.set('sort', newSort);
    router.replace(`${pathname}?${queryParams.toString()}`);
  };

  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        gap: 1,
        justifyContent: 'right',
      }}
    >
      <Typography>Sort by:</Typography>

      <FormControl size="small">
        <Select
          name="sort-bookings-by"
          value={sortParam}
          onChange={handleChange}
        >
          <MenuItem value={'newest'}>Newest booking</MenuItem>
          <MenuItem value={'oldest'}>Oldest booking</MenuItem>
        </Select>
      </FormControl>
    </Box>
  );
};

export default SortBy;
