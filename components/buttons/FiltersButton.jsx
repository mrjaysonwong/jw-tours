'use client';
import { useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { Button, Badge } from '@mui/material';
import TuneIcon from '@mui/icons-material/Tune';

// internal imports
import BookingsFiltersDialog from '@/app/(features)/bookings/BookingsFiltersDialog';
import TourListFiltersDialog from '@/components/dialogs/TourListFiltersDialog';
import { baseTourListParams, bookingsParams } from '@/constants/queryParams';

const countVisibleFilters = (searchParams, type) => {
  let total = 0;

  const allowedQueryParams =
    type === 'my-bookings' ? bookingsParams : baseTourListParams;

  for (const [key, value] of searchParams.entries()) {
    if (key === 'sort' || key === 'page') continue;
    if (allowedQueryParams.includes(key)) {
      total += value.split(',').filter(Boolean).length;
    }
  }

  return total;
};

const FiltersButton = ({ type }) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const searchParams = useSearchParams();
  const count = countVisibleFilters(searchParams, type);
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
          <TourListFiltersDialog
            isDialogOpen={isDialogOpen}
            setIsDialogOpen={setIsDialogOpen}
          />
        ))}
    </>
  );
};

export default FiltersButton;
