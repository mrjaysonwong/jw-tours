import { Autocomplete, TextField } from '@mui/material';
import { Controller } from 'react-hook-form';

// internal imports
import { importantInformationData } from '@/data/tour/importantInformationData';
import { useCreateTourContext } from '@/contexts/CreateNewTourProvider';
import ErrorText from '@/components/errors/ErrorText';

const ImportantInformation = () => {
  const { control, errors } = useCreateTourContext();

  return (
    <Controller
      name="importantInfo"
      control={control}
      render={({ field }) => (
        <Autocomplete
          {...field}
          id="important-info-select"
          multiple
          limitTags={1}
          options={importantInformationData}
          autoHighlight
          getOptionLabel={(option) => option.label}
          value={field.value || []}
          groupBy={(option) => option.category}
          isOptionEqualToValue={(option, value) => option.label === value.label}
          onChange={(_, newValue) => {
            field.onChange(newValue); // Manually handling array changes
          }}
          renderInput={(params) => (
            <>
              <TextField
                {...params}
                placeholder="Info listed"
                margin="dense"
                size="small"
                error={!!errors?.importantInfo}
              />

              <ErrorText error={errors?.importantInfo?.message} />
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

export default ImportantInformation;
