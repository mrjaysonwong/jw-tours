import { Autocomplete, TextField } from '@mui/material';
import { Controller } from 'react-hook-form';

// internal imports
import { useCreateTourContext } from '@/contexts/CreateNewTourProvider';
import { useTourGuidesData } from '@/hooks/useTourGuidesData';
import { SkeletonCard } from '@/components/loaders/Skeletons';
import CustomError from '@/components/errors/CustomError';
import ErrorText from '@/components/errors/ErrorText';

const TourGuideSelection = () => {
  const { control, errors } = useCreateTourContext();
  const { data: guides, isLoading, isError, error } = useTourGuidesData();

  if (isError) return <CustomError error={error} h="25vh" />;

  if (isLoading) return <SkeletonCard l={1} h="40px" mt={1} />;

  const formattedGuides = guides.map((guide) => ({
    label: `${guide.firstName} ${guide.lastName}`,
    value: guide._id,
  }));

  return (
    <Controller
      name="guide"
      control={control}
      render={({ field }) => (
        <Autocomplete
          {...field}
          id="guide-select"
          options={formattedGuides.sort()}
          autoHighlight
          getOptionLabel={(option) => option.label}
          value={
            formattedGuides.find((opt) => opt.value === field.value) || null
          }
          isOptionEqualToValue={(option, value) => option.value === value.value}
          onChange={(_, newValue) => {
            field.onChange(newValue ? newValue.value : null);
          }}
          renderInput={(params) => (
            <>
              <TextField
                {...params}
                margin="dense"
                size="small"
                error={!!errors.guide}
              />

              <ErrorText error={errors?.guide} />
            </>
          )}
          slotProps={{
            paper: {
              elevation: 4,
            },
          }}
        />
      )}
    />
  );
};

export default TourGuideSelection;
