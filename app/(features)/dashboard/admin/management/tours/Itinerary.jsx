import React, { useEffect, useRef, useState } from 'react';
import { Button, Typography } from '@mui/material';

// internal imports
import { useCreateTourContext } from '@/contexts/CreateNewTourProvider';
import ErrorText from '@/components/errors/ErrorText';
import AddItineraryDialog from './AddItineraryDialog';

const Itinerary = () => {
  const {
    errors,
    itineraryFields,
    appendItinerary,
    removeItinerary,
  } = useCreateTourContext();

  const itineraryRef = useRef(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const errorFields = errors?.itinerary && 'Itinerary fields are required';

  useEffect(() => {
    if (errors.itinerary && itineraryRef.current) {
      itineraryRef.current.scrollIntoView({
        behavior: 'smooth',
        block: 'center',
      });
    }
  }, [errors.itinerary]);

  return (
    <>
      {itineraryFields.length === 0 ? (
        <Typography color="gray">No Itinerary was set</Typography>
      ) : (
        <Typography>{itineraryFields.length} Itinerary steps</Typography>
      )}

      <Button
        ref={itineraryRef}
        variant="contained"
        onClick={() => setIsDialogOpen(true)}
        sx={{ my: 1 }}
      >
        {itineraryFields.length === 0 ? 'Add' : 'Manage'} Itinerary Stepper
      </Button>

      <ErrorText error={errors?.itinerary?.message || errorFields} />

      {isDialogOpen && (
        <AddItineraryDialog
          isDialogOpen={isDialogOpen}
          setIsDialogOpen={setIsDialogOpen}
          fields={itineraryFields}
          append={appendItinerary}
          remove={removeItinerary}
        />
      )}
    </>
  );
};

export default Itinerary;
