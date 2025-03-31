import React from 'react';
import { Controller } from 'react-hook-form';
import {
  Button,
  Dialog,
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Slide,
  Grid,
  Box,
  TextField,
  Container,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import DeleteIcon from '@mui/icons-material/Delete';

// internal imports
import { useCreateTourContext } from '@/contexts/CreateNewTourProvider';
import ErrorText from '@/components/errors/ErrorText';
import {
  generateHourlyTime,
  generateMinutesTime,
  admissionTypes,
} from '@/models/tourModel';
import AutoCompleteInput from '@/components/inputs/AutoCompleteInput';

const Transition = React.forwardRef((props, ref) => (
  <Slide direction="up" ref={ref} {...props} />
));
Transition.displayName = 'Transition';

const hourlyTime = generateHourlyTime();
const minutesTime = generateMinutesTime();

const AddItineraryDialog = ({
  isDialogOpen,
  setIsDialogOpen,
  fields,
  append,
  remove,
}) => {
  const { control, errors } = useCreateTourContext();

  const handleClose = () => {
    setIsDialogOpen(false);
  };

  return (
    <Dialog
      fullScreen
      open={isDialogOpen}
      onClose={handleClose}
      TransitionComponent={Transition}
    >
      <AppBar elevation={1} sx={{ position: 'relative' }}>
        <Toolbar>
          <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
            Add Itinerary
          </Typography>

          <IconButton
            edge="start"
            color="inherit"
            onClick={handleClose}
            aria-label="close"
          >
            <CloseIcon />
          </IconButton>
        </Toolbar>
      </AppBar>

      <Container sx={{ mt: 2 }}>
        {fields.map((field, index) => (
          <Box
            key={field.id}
            sx={{
              py: 2,
              ':not(:last-child)': {
                borderBottom: '1px solid',
                borderColor: 'divider',
              },
            }}
          >
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                my: 1,
              }}
            >
              <Typography variant="h6">Step {index + 1}</Typography>
              <DeleteIcon
                color="warning"
                onClick={() => remove(index)}
                sx={{ cursor: 'pointer' }}
              />
            </Box>

            <Grid container spacing={2} alignItems="flex-start">
              <Grid item xs={12} md={4}>
                <Controller
                  name={`itinerary.${index}.label`}
                  control={control}
                  render={({ field }) => (
                    <Box sx={{ my: 1, mb: 1.5 }}>
                      <TextField
                        {...field}
                        id="itinerary-label"
                        autoComplete="off"
                        size="small"
                        label="Label"
                        fullWidth
                        error={!!errors.itinerary?.[index]?.label}
                      />

                      <ErrorText
                        error={errors.itinerary?.[index]?.label?.message}
                      />
                    </Box>
                  )}
                />

                <Grid container rowSpacing={1} columnSpacing={2}>
                  <Grid item xs={12} md={6}>
                    <AutoCompleteInput
                      inputName={`itinerary.${index}.time.hour`}
                      label="Hourly"
                      id="hourly-select"
                      control={control}
                      options={hourlyTime}
                      error={errors?.itinerary?.[index]?.time?.hour?.message}
                    />
                  </Grid>

                  <Grid item xs={12} md={6}>
                    <AutoCompleteInput
                      inputName={`itinerary.${index}.time.minutes`}
                      label="Minutes"
                      id="minutes-select"
                      control={control}
                      options={minutesTime}
                      error={errors?.itinerary?.[index]?.time?.minutes?.message}
                    />
                  </Grid>

                  <Grid item xs={12} md={12}>
                    <AutoCompleteInput
                      inputName={`itinerary.${index}.admissionType`}
                      label="Admission Type"
                      id="admission-type-select"
                      control={control}
                      options={admissionTypes}
                      error={errors?.itinerary?.[index]?.admissionType?.message}
                    />
                  </Grid>
                </Grid>
              </Grid>

              <Grid item xs={12} md={8}>
                <Controller
                  name={`itinerary.${index}.description`}
                  control={control}
                  render={({ field }) => (
                    <Box sx={{ mt: 1 }}>
                      <TextField
                        {...field}
                        autoComplete="off"
                        multiline
                        maxRows={10}
                        size="small"
                        label="Description"
                        fullWidth
                        error={!!errors?.itinerary?.[index]?.description}
                      />
                      <ErrorText
                        error={errors?.itinerary?.[index]?.description?.message}
                      />
                    </Box>
                  )}
                />
              </Grid>
            </Grid>
          </Box>
        ))}
      </Container>

      <Container>
        <Button
          variant="contained"
          onClick={() =>
            append({
              label: '',
              time: { hour: '', minutes: '' },
              admissionType: '',
              description: '',
            })
          }
          sx={{ my: 2 }}
        >
          Add Stepper
        </Button>
      </Container>
    </Dialog>
  );
};

AddItineraryDialog.displayName = 'AddItineraryDialog';

export default React.memo(AddItineraryDialog);
