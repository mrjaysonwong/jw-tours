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

// internal imports
import FilterByDuration from './FilterByDuration';
import FilterByTransportation from './FilterByTransportation';
import { filtersSchema } from '@/validation/yup/tour/filtersSchema';
import FormSubmitButton from '@/components/buttons/FormSubmitButton';
import { buildQueryParams } from '@/utils/common';
import { durationOptions } from './FilterByDuration';

const allowedParams = ['minDuration', 'maxDuration', 'transportation', 'sort'];

function getDuration(searchParams) {
  const searchMin = +searchParams.get('minDuration');
  const searchMax = +searchParams.get('maxDuration');

  const duration = durationOptions
    .map((opt) => `${opt.min}-${opt.max}`)
    .filter((range) => {
      const [min, max] = range.split('-').map(Number);

      // Is this bucket inside the selected filter range?
      return min >= searchMin && max <= searchMax;
    });

  return duration;
}

const TourListingFiltersDialog = ({ isDialogOpen, setIsDialogOpen }) => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const handleClose = () => {
    setIsDialogOpen(false);
  };

  const duration = getDuration(searchParams);

  const defaultValues = {
    transportation: searchParams.get('transportation')?.split(',') || [],
    duration: duration.length > 0 ? duration : [],
  };

  const {
    control,
    handleSubmit,
    reset,
    formState: { isSubmitting },
  } = useForm({ resolver: yupResolver(filtersSchema), defaultValues });

  const onSubmit = ({ transportation, duration }) => {
    let minDuration;
    let maxDuration;

    if (duration?.length) {
      // Sort by the numeric min part
      const sorted = duration.slice().sort((a, b) => {
        const minA = parseInt(a.split('-')[0], 10);
        const minB = parseInt(b.split('-')[0], 10);
        return minA - minB;
      });

      const first = sorted[0].split('-');
      const last = sorted[sorted.length - 1].split('-');

      minDuration = first[0];
      maxDuration = last[1];
    }

    const formValues = {
      transportation: transportation?.join(','),
      ...(duration && {
        minDuration,
        maxDuration,
      }),
    };

    const queryParams = buildQueryParams(
      formValues,
      searchParams,
      allowedParams
    );

    const query = queryParams.size > 0 ? `${queryParams.toString()}` : '';

    if (queryParams.size === 0) {
      router.replace(pathname);
    } else {
      router.replace(`${pathname}?${query}`);
    }

    handleClose();
  };

  const handleReset = () => {
    reset({ transportation: [], duration: [] });
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
          <FilterByDuration control={control} />
          <FilterByTransportation control={control} />
        </form>
      </DialogContent>

      <DialogActions sx={{ py: 2, justifyContent: 'center' }}>
        <Button variant="outlined" onClick={handleReset}>
          Reset Filters
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

export default TourListingFiltersDialog;
