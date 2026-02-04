import { useRouter, usePathname, useSearchParams } from 'next/navigation';
import { Typography, Box, MenuItem, FormControl, Select } from '@mui/material';

const allowedSortValues = ['price_desc', 'price_asc', 'rating_desc'];

const SortBy = () => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const rawSort = searchParams.get('sort');
  const sortParam = allowedSortValues.includes(rawSort) ? rawSort : 'price_asc';

  const handleChange = (event) => {
    const newSort = event.target.value;
    const queryParams = new URLSearchParams(searchParams);

    if (allowedSortValues.includes(newSort)) {
      queryParams.set('sort', newSort);
      queryParams.delete('page');
    }

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
        <Select name="sort-tours-by" value={sortParam} onChange={handleChange}>
          <MenuItem value="price_asc">Price low to high</MenuItem>
          <MenuItem value="price_desc">Price high to low</MenuItem>
          <MenuItem value="rating_desc">Rating</MenuItem>
        </Select>
      </FormControl>
    </Box>
  );
};

export default SortBy;
