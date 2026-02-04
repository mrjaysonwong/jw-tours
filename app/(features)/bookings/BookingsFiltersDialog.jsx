import { useRouter, usePathname, useSearchParams } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  IconButton,
  Divider,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import dayjs from 'dayjs';

// internal imports
import FilterByDate from './FilterByDate';
import FilterByStatus from './FilterByStatus';
import FormSubmitButton from '@/components/buttons/FormSubmitButton';
import { filtersSchema } from '@/validation/yup/bookings/filtersSchema';
import { formatDate2 } from '@/utils/formats/formatDates';
import { filterParams, getQueryParams } from '@/utils/queryParams';

const BookingsFiltersDialog = ({ isDialogOpen, setIsDialogOpen }) => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const { sortParam } = getQueryParams(searchParams);

  const getDate = (key) => {
    const val = searchParams.get(key);
    return val ? dayjs(val) : null;
  };

  const handleClose = () => {
    setIsDialogOpen(false);
  };

  const defaultValues = {
    tourFrom: getDate('tourFrom'),
    tourTo: getDate('tourTo'),
    bookingFrom: getDate('bookingFrom'),
    bookingTo: getDate('bookingTo'),
    status: searchParams.get('status')?.split(',') || [],
  };

  const {
    control,
    handleSubmit,
    setValue,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: yupResolver(filtersSchema),
    defaultValues,
  });

  const onSubmit = (formData) => {
    const formValues = {
      tourFrom: formatDate2(formData.tourFrom),
      tourTo: formatDate2(formData.tourTo),
      bookingFrom: formatDate2(formData.bookingFrom),
      bookingTo: formatDate2(formData.bookingTo),
      status: formData.status?.join(','),
    };

    const queryParams = filterParams({
      ...formValues,
      sort: sortParam,
    });

    if (queryParams.size === 0) {
      router.replace(pathname);
    } else {
      router.replace(`${pathname}?${queryParams.toString()}`);
    }

    handleClose();
  };

  const handleReset = () => {
    const queryParams = filterParams({
      sort: sortParam,
    });

    reset({
      tourFrom: null,
      tourTo: null,
      bookingFrom: null,
      bookingTo: null,
      status: [],
    });

    router.replace(`${pathname}?${queryParams.toString()}`);
    handleClose();
  };

  return (
    <Dialog open={isDialogOpen}>
      <DialogTitle>Filters</DialogTitle>
      <IconButton
        aria-label="close"
        onClick={handleClose}
        sx={{
          position: 'absolute',
          right: 8,
          top: 12,
        }}
      >
        <CloseIcon />
      </IconButton>

      <DialogContent dividers>
        <form id="filters-form" onSubmit={handleSubmit(onSubmit)}>
          <FilterByDate control={control} errors={errors} setValue={setValue} />

          <Divider sx={{ my: 2 }} />

          <FilterByStatus control={control} />
        </form>
      </DialogContent>
      <DialogActions sx={{ py: 2, justifyContent: 'center' }}>
        <Button variant="outlined" onClick={handleReset}>
          Clear Filters
        </Button>

        <FormSubmitButton
          form="filters-form"
          size="small"
          label="Show Results"
          isSubmitting={isSubmitting}
        />
      </DialogActions>
    </Dialog>
  );
};

export default BookingsFiltersDialog;
