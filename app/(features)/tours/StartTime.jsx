import { Controller } from 'react-hook-form';
import { Box, Typography, FormControl, Select, MenuItem } from '@mui/material';
import ScheduleOutlinedIcon from '@mui/icons-material/ScheduleOutlined';

// internal imports
import { useTourDetails } from '@/contexts/TourDetailsProvider';
import { styledInput, styledBox } from './PartySizeOption';
import ErrorText from '@/components/errors/ErrorText';

const StartTime = ({ control, errors }) => {
  const { tour } = useTourDetails();
  return (
    <>
      <Box sx={styledBox}>
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
          }}
        >
          <Typography sx={{ fontWeight: 500, ml: 2 }}>Start time:</Typography>

          <Box sx={{ ml: 'auto' }}>
            <FormControl
              size="small"
              sx={styledInput}
              error={!!errors.startTime}
            >
              <Controller
                name="startTime"
                control={control}
                defaultValue={''}
                render={({ field }) => {
                  return (
                    <Select
                      {...field}
                      id="startTimeSelect"
                      IconComponent={() => (
                        <ScheduleOutlinedIcon sx={{ mr: 1 }} />
                      )}
                    >
                      {tour.startTime.map((time, index) => (
                        <MenuItem key={index} value={time}>
                          {time}
                        </MenuItem>
                      ))}
                    </Select>
                  );
                }}
              />
            </FormControl>
          </Box>
        </Box>
      </Box>
      <ErrorText error={errors.startTime} />
    </>
  );
};

export default StartTime;
