import { useState } from 'react';
import { Button, Menu, MenuItem, Fade } from '@mui/material';
import TuneOutlinedIcon from '@mui/icons-material/TuneOutlined';

const filterOptions = [
  { rating: 'all', label: 'All stars' },
  { rating: '5', label: '5 stars' },
  { rating: '4', label: '4 stars' },
  { rating: '3', label: '3 stars' },
  { rating: '2', label: '2 stars' },
  { rating: '1', label: '1 star' },
];

const getLabel = (rating) => {
  const found = filterOptions.find((opt) => opt.rating === rating);
  return found ? found.label : 'All stars';
};

export const FilterReviewsByRating = ({ rating, setRating }) => {
  const [anchorEl, setAnchorEl] = useState(null);

  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleSelect = (newValue) => {
    setRating(newValue);
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
        Filter by {getLabel(rating)}
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
            key={option.rating}
            selected={rating === option.rating}
            onClick={() => handleSelect(option.rating)}
          >
            {option.label}
          </MenuItem>
        ))}
      </Menu>
    </>
  );
};

export default FilterReviewsByRating;
