import React, { useMemo } from 'react';
import { Typography } from '@mui/material';
import { useForm, useFieldArray } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import axios from 'axios';

// internal imports
import { CreateNewTourProvider } from '@/contexts/TourContextProvider';
import { tourSchema } from '@/validation/yup/tour/tourSchema';
import { useMessageStore } from '@/stores/messageStore';
import { errorHandler } from '@/helpers/errorHelpers';
import { API_URLS } from '@/constants/apiRoutes';
import CardForm from './shared/CardForm';

const CreateNewTour = () => {
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
    resolver: yupResolver(tourSchema),
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

  const {
    fields: imagesFields,
    append: appendImages,
    remove: removeImages,
  } = useFieldArray({
    control,
    name: 'images',
  });

  const onSubmit = async (formData) => {
    try {
      const url = `${API_URLS.ADMIN}/create-tour`;

      const { data } = await axios.post(url, formData);

      reset();
      removeItinerary();
      removeInclusion();
      removeImages();
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

  const imagesFunctions = useMemo(
    () => ({
      imagesFields,
      appendImages,
      removeImages,
    }),
    [imagesFields, appendImages, removeImages]
  );

  const contextValues = {
    register,
    control,
    handleSubmit,
    onSubmit,
    isSubmitting,
    errors,
    setValue,
    watch,
    ...itineraryFunctions,
    ...inclusionFunctions,
    ...imagesFunctions,
  };

  return (
    <>
      <Typography variant="h5">Create a new tour</Typography>

      <CreateNewTourProvider value={contextValues}>
        <CardForm />
      </CreateNewTourProvider>
    </>
  );
};

export default CreateNewTour;
