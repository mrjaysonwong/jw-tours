import { useEffect } from 'react';
import { Autocomplete, TextField } from '@mui/material';
import { Controller } from 'react-hook-form';

// internal imports
import { importantInformationData } from '@/data/tour/importantInformationData';
import { useTourFormContext } from './CardForm';
import ErrorText from '@/components/errors/ErrorText';

const ImportantInformation = () => {
  const { control, errors, setValue, tour } = useTourFormContext();

  useEffect(() => {
    if (tour?.importantInfo) {
      const normalized = tour.importantInfo.map((item) => ({
        ...item,
        category: Array.isArray(item.category)
          ? item.category[0]
          : item.category,
      }));
      setValue('importantInfo', normalized);
    }
  }, [tour, setValue]);

  return (
    <Controller
      name="importantInfo"
      control={control}
      render={({ field }) => (
        <Autocomplete
          id="important-info-select"
          multiple
          limitTags={1}
          value={field.value || []}
          options={importantInformationData}
          autoHighlight
          getOptionLabel={(option) => option.label}
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
                inputRef={field.ref}
                name={field.name}
              />

              <ErrorText error={errors?.importantInfo?.message} />
            </>
          )}
        />
      )}
    />
  );
};

export default ImportantInformation;
