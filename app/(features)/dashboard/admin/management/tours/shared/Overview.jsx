import { useEffect, useRef } from 'react';
import { Controller } from 'react-hook-form';
import { Box } from '@mui/material';

// internal imports
import TiptapEditor from '@/components/common/TiptapEditor';
import ErrorText from '@/components/errors/ErrorText';
import { useTourFormContext } from './CardForm';

const Overview = () => {
  const { tour, control, errors } = useTourFormContext();
  const editorRef = useRef(null);

  useEffect(() => {
    if (errors.overview && editorRef.current) {
      editorRef.current.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  }, [errors.overview]);

  return (
    <Box
      ref={editorRef}
      sx={{
        mt: 1,
        border: '1px solid',
        borderColor: 'divider',
        borderRadius: '6px',
      }}
    >
      <Controller
        name="overview"
        control={control}
        defaultValue={tour?.overview || ''}
        render={({ field }) => (
          <>
            <TiptapEditor
              value={field.value}
              onChange={field.onChange}
              error={errors.overview}
              placeholder="Write something awesome..."
            />

            {errors.overview && (
              <Box sx={{ my: 1 }}>
                <ErrorText error={errors.overview} />
              </Box>
            )}
          </>
        )}
      />
    </Box>
  );
};

export default Overview;
