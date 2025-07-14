import { useParams } from 'next/navigation';
import { Autocomplete, TextField } from '@mui/material';
import { Controller } from 'react-hook-form';

// internal imports
import { useTourFormContext } from './CardForm';
import { useTourGuideListData } from '@/hooks/useTourGuideData';
import { SkeletonCard } from '@/components/loaders/Skeletons';
import CustomError from '@/components/errors/CustomError';
import ErrorText from '@/components/errors/ErrorText';

const TourGuideSelection = () => {
  const params = useParams();
  const { control, errors, tour } = useTourFormContext();
  const { data: guides, isLoading, isError, error } = useTourGuideListData(params.id);

  if (isLoading) return <SkeletonCard l={1} h="40px" mt={1} />;

  if (isError) return <CustomError error={error} h="25vh" />;

  const formattedGuides = guides.map((guide) => ({
    label: `${guide.firstName} ${guide.lastName}`,
    value: guide._id,
  }));

  return (
    <Controller
      name="guide"
      control={control}
      defaultValue={tour?.guide?._id}
      render={({ field }) => (
        <Autocomplete
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
                inputRef={field.ref}
                name={field.name}
              />

              <ErrorText error={errors?.guide} />
            </>
          )}
        />
      )}
    />
  );
};

export default TourGuideSelection;
