import { useState } from 'react';
import { Button, Menu, MenuItem, Fade } from '@mui/material';
import TuneOutlinedIcon from '@mui/icons-material/TuneOutlined';

const filterOptions = [
  { value: 'all', label: 'All stars' },
  { value: '5', label: '5 stars' },
  { value: '4', label: '4 stars' },
  { value: '3', label: '3 stars' },
  { value: '2', label: '2 stars' },
  { value: '1', label: '1 star' },
];

const getLabel = (value) => {
  const found = filterOptions.find((opt) => opt.value === value);
  return found ? found.label : 'All stars';
};

export const FilterReviewsByRating = ({ value, setValue }) => {
  const [anchorEl, setAnchorEl] = useState(null);

  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleSelect = (val) => {
    setValue(val);
    handleClose();
  };

  return (
    <>
      <Button
        variant="outlined"
        disableRipple
        id="fade-button"
        aria-controls={open ? 'fade-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}
        startIcon={<TuneOutlinedIcon />}
        sx={{ textTransform: 'none', color: 'inherit', borderColor: 'inherit' }}
      >
        Filter by {getLabel(value)}
      </Button>
      <Menu
        id="fade-menu"
        MenuListProps={{
          'aria-labelledby': 'fade-button',
        }}
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        TransitionComponent={Fade}
      >
        {filterOptions.map((option) => (
          <MenuItem
            key={option.value}
            selected={value === option.value}
            onClick={() => handleSelect(option.value)}
          >
            {option.label}
          </MenuItem>
        ))}
      </Menu>
    </>
  );
};

export default FilterReviewsByRating;
