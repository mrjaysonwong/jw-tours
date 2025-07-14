'use client';
import { useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { Button, Badge } from '@mui/material';
import TuneIcon from '@mui/icons-material/Tune';

// internal imports
import BookingsFiltersDialog from '@/app/(features)/bookings/BookingsFiltersDialog';
import TourListingFiltersDialog from '@/app/(features)/tours/TourListingFiltersDialog';

const allowedParams = [
  'tourFrom',
  'tourTo',
  'bookingFrom',
  'bookingTo',
  'status',
  'minDuration',
  'maxDuration',
  'transportation',
];

const countVisibleFilters = (searchParams) => {
  let total = 0;

  for (const [key, value] of searchParams.entries()) {
    if (allowedParams.includes(key)) {
      total += value.split(',').filter(Boolean).length;
    }
  }

  return total;
};

const FiltersButton = ({ type }) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const searchParams = useSearchParams();
  const count = countVisibleFilters(searchParams);
  const invisible = count === 0;

  const handleClick = () => {
    setIsDialogOpen(true);
  };

  return (
    <>
      <Badge
        badgeContent={count}
        variant="dot"
        color="primary"
        invisible={invisible}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
      >
        <Button
          color="inherit"
          variant="outlined"
          startIcon={<TuneIcon />}
          onClick={handleClick}
        >
          Filters
        </Button>
      </Badge>

      {isDialogOpen &&
        (type === 'my-bookings' ? (
          <BookingsFiltersDialog
            isDialogOpen={isDialogOpen}
            setIsDialogOpen={setIsDialogOpen}
          />
        ) : (
          <TourListingFiltersDialog
            isDialogOpen={isDialogOpen}
            setIsDialogOpen={setIsDialogOpen}
          />
        ))}
    </>
  );
};

export default FiltersButton;
