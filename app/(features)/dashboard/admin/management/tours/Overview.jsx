import { useEffect, useRef } from 'react';
import { Controller } from 'react-hook-form';
import { Box } from '@mui/material';

// internal imports
import TiptapEditor from '@/utils/components/TiptapEditor';
import ErrorText from '@/components/errors/ErrorText';
import { useCreateTourContext } from '@/contexts/CreateNewTourProvider';

const Overview = () => {
  const { control, errors, setValue } = useCreateTourContext();
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
        defaultValue=""
        render={({ field }) => (
          <>
            <TiptapEditor
              value={field.value}
              onChange={field.onChange}
              error={errors.overview}
              placeholder="Write something awesome..."
              setValue={setValue}
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
