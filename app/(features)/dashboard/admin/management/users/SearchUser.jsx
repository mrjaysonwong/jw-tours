import { Box, InputBase } from '@mui/material';
import { alpha } from '@mui/material/styles';
import SearchIcon from '@mui/icons-material/Search';

const SearchUser = ({
  searchTerm,
  setSearchTerm,
  setPage,
  setRole,
  setValue,
}) => {
  const handleChange = (event) => {
    setSearchTerm(event.target.value);
    setPage(0);
    setRole('');
    setValue(0);
  };

  return (
    <Box
      sx={(theme) => ({
        borderRadius: '6px',
        backgroundColor:
          theme.palette.mode === 'light'
            ? alpha(theme.palette.common.black, 0.06)
            : alpha(theme.palette.common.white, 0.08),
        '&:hover': {
          backgroundColor:
            theme.palette.mode === 'light'
              ? alpha(theme.palette.common.black, 0.09)
              : alpha(theme.palette.common.white, 0.1),
        },
      })}
    >
      <InputBase
        fullWidth
        placeholder="Search"
        value={searchTerm}
        onChange={handleChange}
        autoComplete="off"
        inputProps={{
          id: 'search-user',
          'aria-label': 'search user',
        }}
        startAdornment={<SearchIcon sx={{ mr: 1, color: 'grey' }} />}
        sx={{ px: 2, flex: 1, py: 1.5 }}
      />
    </Box>
  );
};

export default SearchUser;
