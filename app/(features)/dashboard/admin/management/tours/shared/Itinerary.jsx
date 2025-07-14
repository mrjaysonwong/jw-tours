import React, { useEffect, useRef, useState } from 'react';
import { Button, Typography } from '@mui/material';

// internal imports
import { useTourFormContext } from './CardForm';
import ErrorText from '@/components/errors/ErrorText';
import AddItineraryDialog from './AddItineraryDialog';

const Itinerary = () => {
  const {
    errors,
    itineraryFields,
    appendItinerary,
    removeItinerary,
    setValue,
    tour,
  } = useTourFormContext();

  const itineraryRef = useRef(null);
  const hasInitialized = useRef(false);
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

  useEffect(() => {
    if (tour?.itinerary?.length > 0) {
      setValue('itinerary', tour.itinerary);
      hasInitialized.current = true;
    }
  }, [tour, setValue]);

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
          hasInitialized={hasInitialized}
        />
      )}
    </>
  );
};

export default Itinerary;
