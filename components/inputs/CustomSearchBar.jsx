import { Box, InputBase, IconButton } from '@mui/material';
import { alpha } from '@mui/material/styles';
import SearchIcon from '@mui/icons-material/Search';
import CloseIcon from '@mui/icons-material/Close';

const CustomSearchBar = ({
  type,
  searchTerm,
  setSearchTerm,
  placeholder = 'Search',
}) => {
  const handleChange = (event) => {
    setSearchTerm(event.target.value);
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
        placeholder={placeholder}
        value={searchTerm}
        onChange={handleChange}
        autoComplete="off"
        inputProps={{
          id: `search-${type}`,
          'aria-label': `search ${type}`,
        }}
        startAdornment={<SearchIcon sx={{ mr: 1, color: 'grey' }} />}
        endAdornment={
          searchTerm && (
            <IconButton
              size="small"
              aria-label="clear input"
              onClick={() => setSearchTerm('')}
            >
              <CloseIcon fontSize="small" />
            </IconButton>
          )
        }
        sx={{ px: 2, flex: 1, py: 1.5 }}
      />
    </Box>
  );
};

export default CustomSearchBar;
