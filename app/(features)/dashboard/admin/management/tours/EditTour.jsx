import React, { useMemo } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { useForm, useFieldArray } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import axios from 'axios';
import { Typography } from '@mui/material';

// internal imports
import { useTour } from '@/hooks/useTours';
import { TourDetailsProvider } from '@/contexts/TourContextProvider';
import LoadingSpinner from '@/components/loaders/LoadingSpinner';
import CustomError from '@/components/errors/CustomError';
import { tourSchema } from '@/validation/yup/tour/tourSchema';
import CardForm from './shared/CardForm';
import { API_URLS } from '@/constants/apiRoutes';
import { useMessageStore } from '@/stores/messageStore';
import { errorHandler } from '@/helpers/errorHelpers';

const EditForm = () => {
  const params = useParams();
  const router = useRouter();

  const { handleAlertMessage } = useMessageStore();

  const {
    data: tour,
    isLoading,
    isError,
    error,
    isClientError,
    refetch,
  } = useTour(params.id);

  const {
    register,
    control,
    handleSubmit,
    setValue,
    watch,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: yupResolver(tourSchema),
    mode: 'onChange',
    reValidateMode: 'onChange',
  });

  const {
    fields: imagesFields,
    append: appendImages,
    remove: removeImages,
  } = useFieldArray({
    control,
    name: 'images',
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
      const url = `${API_URLS.TOURS}/${params.id}`;

      const { data } = await axios.patch(url, formData);

      refetch();
      handleAlertMessage(data.message, 'success');
    } catch (error) {
      const { errorMessage } = errorHandler(error);
      handleAlertMessage(errorMessage, 'error');
    }
  };

  const imagesFunctions = useMemo(
    () => ({
      imagesFields,
      appendImages,
      removeImages,
    }),
    [imagesFields, appendImages, removeImages]
  );

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
    handleSubmit,
    onSubmit,
    isSubmitting,
    errors,
    setValue,
    watch,
    tour,
    ...imagesFunctions,
    ...itineraryFunctions,
    ...inclusionFunctions,
  };

  if (isLoading) return <LoadingSpinner h="70vh" />;

  if (isClientError) {
    router.replace('/admin/dashboard/tours');
    return (
      <>
        <Typography variant="h6">Tour not found</Typography>
        <Typography>Redirecting...</Typography>
      </>
    );
  }

  if (isError) return <CustomError error={error} h="70vh" />;

  return (
    <TourDetailsProvider value={contextValues}>
      <CardForm />
    </TourDetailsProvider>
  );
};

const EditTour = () => {
  return (
    <>
      <Typography variant="h5">Edit</Typography>

      <EditForm />
    </>
  );
};

export default EditTour;
