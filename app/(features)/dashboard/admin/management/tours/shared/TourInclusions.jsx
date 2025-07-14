import React, { useEffect, useRef, useState, useMemo } from 'react';
import { useWatch } from 'react-hook-form';
import { Button, Typography } from '@mui/material';

// internal imports
import { useTourFormContext } from './CardForm';
import ErrorText from '@/components/errors/ErrorText';
import AddInclusionsDialog from './AddInclusionsDialog';

const TourInclusions = () => {
  const {
    control,
    errors,
    inclusionFields,
    appendInclusion,
    removeInclusion,
    setValue,
    tour,
  } = useTourFormContext();

  const inclusionsRef = useRef(null);
  const hasInitialized = useRef(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  // Watch the inclusions array
  const watchedInclusions = useWatch({ name: 'inclusions', control });

  const memoizedWatchedInclusions = useMemo(
    () => watchedInclusions,
    [watchedInclusions]
  );

  const errorFields = errors?.inclusions && 'Inclusions fields are required';

  useEffect(() => {
    if (errors.inclusions && inclusionsRef.current) {
      inclusionsRef.current.scrollIntoView({
        behavior: 'smooth',
        block: 'center',
      });
    }
  }, [errors.inclusions]);

  useEffect(() => {
    if (tour?.inclusions?.length > 0) {
      setValue('inclusions', tour.inclusions);
      hasInitialized.current = true;
    }
  }, [tour, setValue]);

  const totalItems = memoizedWatchedInclusions?.reduce(
    (total, inclusion) => total + inclusion.items.length,
    0
  );

  return (
    <>
      {inclusionFields.length === 0 ? (
        <Typography color="gray">No Inclusions type was set</Typography>
      ) : (
        <Typography>
          {totalItems < 1 ? 'No' : totalItems} Inclusions listed
        </Typography>
      )}

      <Button
        ref={inclusionsRef}
        variant="contained"
        onClick={() => setIsDialogOpen(true)}
        sx={{ my: 1 }}
      >
        {inclusionFields.length === 0 ? 'Add' : 'Manage'} Inclusions
      </Button>

      <ErrorText error={errors?.inclusions?.message || errorFields} />

      {isDialogOpen && (
        <AddInclusionsDialog
          isDialogOpen={isDialogOpen}
          setIsDialogOpen={setIsDialogOpen}
          fields={inclusionFields}
          append={appendInclusion}
          remove={removeInclusion}
          watchedInclusions={memoizedWatchedInclusions}
        />
      )}
    </>
  );
};

export default TourInclusions;
