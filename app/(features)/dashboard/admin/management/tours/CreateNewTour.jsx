import React, { useState, useMemo } from 'react';
import {
  Grid,
  Typography,
  Card,
  CardHeader,
  CardContent,
  CardActions,
  Divider,
  Box,
} from '@mui/material';
import { useForm, useFieldArray } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import axios from 'axios';

// internal imports
import { CreateNewTourProvider } from '@/contexts/CreateNewTourProvider';
import FormInput from '@/components/inputs/FormInput';
import { createTourSchema } from '@/validation/yup/admin/createTourSchema';
import FormSubmitButton from '@/components/buttons/FormSubmitButton';
import { useMessageStore } from '@/stores/messageStore';
import { errorHandler } from '@/helpers/errorHelpers';
import { API_URLS } from '@/config/apiRoutes';
import Overview from './Overview';
import ImagesContent from './ImagesContent';
import Destination from './Destination';
import Itinerary from './Itinerary';
import MeetingLocation from './MeetingLocation';
import CapacityAndPricing from './CapacityAndPricing';
import TourGuideSelection from './TourGuideSelection';
import TourAvailability from './TourAvailability';
import Transportation from './Transportation';
import ImportantInformation from './ImportantInformation';
import TourInclusions from './TourInclusions';

const CreateNewTour = () => {
  const [uploadedImages, setUploadedImages] = useState([]);
  const [uploadedFileNames, setUploadedFileNames] = useState([]);
  const { handleAlertMessage } = useMessageStore();

  const {
    register,
    control,
    handleSubmit,
    reset,
    setValue,
    watch,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: yupResolver(createTourSchema),
    defaultValues: {
      overview: '',
    },
  });

  const {
    fields: itineraryFields,
    append: appendItinerary,
    remove: removeItinerary,
  } = useFieldArray({
    control,
    name: 'itinerary',
  });

  const {
    fields: inclusionFields,
    append: appendInclusion,
    remove: removeInclusion,
  } = useFieldArray({
    control,
    name: 'inclusions',
  });

  const onSubmit = async (formData) => {
    try {
      const url = `${API_URLS.ADMIN}/create-tour`;

      const { data } = await axios.post(url, formData);

      reset();
      removeItinerary();
      removeInclusion();
      setUploadedImages([]);
      setUploadedFileNames([]);
      handleAlertMessage(data.message, 'success');
    } catch (error) {
      const { errorMessage } = errorHandler(error);
      handleAlertMessage(errorMessage, 'error');
    }
  };

  const itineraryFunctions = useMemo(
    () => ({
      itineraryFields,
      appendItinerary,
      removeItinerary,
    }),
    [itineraryFields, appendItinerary, removeItinerary]
  );

  const inclusionFunctions = useMemo(
    () => ({
      inclusionFields,
      appendInclusion,
      removeInclusion,
    }),
    [inclusionFields, appendInclusion, removeInclusion]
  );

  const contextValues = {
    register,
    control,
    errors,
    setValue,
    watch,
    ...itineraryFunctions,
    ...inclusionFunctions,
  };

  return (
    <>
      <Typography variant="h5">Create a new tour</Typography>

      <Card elevation={0} sx={{ bgcolor: 'transparent' }}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <CreateNewTourProvider value={contextValues}>
            <Grid container spacing={2}>
              <Grid item xs={12} md={6}>
                <Card>
                  <CardHeader
                    title="Details"
                    titleTypographyProps={{
                      fontSize: '1.2rem',
                      fontWeight: 500,
                    }}
                    subheader="Title, Overview, Images..."
                    subheaderTypographyProps={{ fontSize: '0.9rem' }}
                  />

                  <Divider />

                  <CardContent>
                    <Box sx={{ my: 2 }}>
                      <Typography>Title</Typography>

                      <FormInput
                        register={register}
                        inputName="title"
                        placeholder="Ex: El Nido Private Tour A w/ Lunch"
                        errors={errors?.title}
                      />
                    </Box>

                    <Box sx={{ my: 2 }}>
                      <Typography>Overview</Typography>

                      <Overview />
                    </Box>

                    <Box sx={{ my: 2 }}>
                      <Typography>Images</Typography>

                      <ImagesContent
                        uploadedImages={uploadedImages}
                        setUploadedImages={setUploadedImages}
                        uploadedFileNames={uploadedFileNames}
                        setUploadedFileNames={setUploadedFileNames}
                      />
                    </Box>

                    <Box sx={{ my: 2 }}>
                      <Typography>Destination</Typography>

                      <Destination />
                    </Box>

                    <Divider />

                    <Box sx={{ my: 2 }}>
                      <Typography>Meeting Location</Typography>

                      <MeetingLocation />
                    </Box>

                    <Divider />

                    <Box sx={{ my: 2 }}>
                      <Typography>Itinerary</Typography>

                      <Itinerary />
                    </Box>
                  </CardContent>
                </Card>
              </Grid>

              <Grid item xs={12} md={6}>
                <Card>
                  <CardHeader
                    title="Properties"
                    titleTypographyProps={{
                      fontSize: '1.2rem',
                      fontWeight: 500,
                    }}
                    subheader="Additional functions and attributes..."
                    subheaderTypographyProps={{ fontSize: '0.9rem' }}
                  />

                  <Divider />

                  <CardContent>
                    <Box sx={{ my: 2 }}>
                      <CapacityAndPricing />
                    </Box>

                    <Divider />

                    <Box sx={{ my: 2 }}>
                      <Typography>Tour guide</Typography>

                      <TourGuideSelection />
                    </Box>

                    <Box sx={{ my: 2 }}>
                      <Typography>Tour Availability</Typography>

                      <TourAvailability />
                    </Box>

                    <Divider />

                    <Box sx={{ my: 2 }}>
                      <Typography htmlFor="transporation-select">
                        Transportation
                      </Typography>

                      <Transportation />
                    </Box>

                    <Divider />

                    <Box sx={{ my: 2 }}>
                      <Typography>Tour Inclusions</Typography>

                      <TourInclusions />
                    </Box>

                    <Divider />

                    <Box sx={{ my: 2 }}>
                      <Typography>Important Information</Typography>

                      <ImportantInformation />
                    </Box>
                  </CardContent>
                </Card>
              </Grid>
            </Grid>
          </CreateNewTourProvider>

          <CardActions sx={{ p: 2 }}>
            <FormSubmitButton
              label="Save changes"
              isSubmitting={isSubmitting}
            />
          </CardActions>
        </form>
      </Card>
    </>
  );
};

export default CreateNewTour;
