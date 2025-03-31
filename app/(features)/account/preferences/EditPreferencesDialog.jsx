import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Button,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  FormControlLabel,
  Checkbox,
} from '@mui/material';
import { useForm, Controller } from 'react-hook-form';
import axios from 'axios';
import { useSession } from 'next-auth/react';
import { useRouter, usePathname } from 'next/navigation';

// internal imports
import FormSubmitButton from '@/components/buttons/FormSubmitButton';
import { useMessageStore } from '@/stores/messageStore';
import { sleep } from '@/utils/sleep';
import { errorHandler } from '@/helpers/errorHelpers';
import { API_URLS } from '@/config/apiRoutes';

const EditPreferencesDialog = ({
  isDialogOpen,
  setIsDialogOpen,
  user,
  refetch,
}) => {
  const router = useRouter();
  const pathname = usePathname();

  const { handleAlertMessage } = useMessageStore();

  const { update } = useSession();

  const {
    control,
    handleSubmit,
    formState: { isSubmitting, isSubmitSuccessful },
  } = useForm();

  const handleClose = () => {
    setIsDialogOpen(false);
  };

  const onSubmit = async (formData) => {
    try {
      const url = `${API_URLS.USERS}/${user._id}/preferences`;

      const { data } = await axios.patch(url, formData);

      router.replace(pathname, { locale: data.langCode });

      refetch();
      setIsDialogOpen(false);

      // Triggers session update
      update({});

      await sleep(2500);
      handleAlertMessage(data.message, 'success');
    } catch (error) {
      const { errorMessage } = errorHandler(error);
      setHasError(true);
      handleAlertMessage(errorMessage, 'error');
    }
  };

  return (
    <>
      <Dialog open={isDialogOpen} scroll="body" closeAfterTransition={false}>
        <DialogTitle>Edit Preferences</DialogTitle>

        <form onSubmit={handleSubmit(onSubmit)}>
          <DialogContent dividers sx={{ borderBottom: 'none' }}>
            <FormControl fullWidth size="small">
              <InputLabel htmlFor="select-language">Language</InputLabel>
              <Controller
                name="langCode"
                control={control}
                defaultValue={user?.langCode}
                render={({ field }) => (
                  <Select
                    {...field}
                    label="Language"
                    inputProps={{
                      id: 'select-language',
                    }}
                    sx={{ mb: 1 }}
                  >
                    <MenuItem value="en">English</MenuItem>
                    <MenuItem value="fr">Français</MenuItem>
                    <MenuItem value="it">Italiano</MenuItem>
                    <MenuItem value="ja">日本語</MenuItem>
                    <MenuItem value="ko">한국인</MenuItem>
                    <MenuItem value="zh">中国人</MenuItem>
                  </Select>
                )}
              />
            </FormControl>

            <Controller
              name="subscription.isSubscribed"
              control={control}
              defaultValue={user.subscription.isSubscribed || false}
              render={({ field }) => (
                <FormControlLabel
                  {...field}
                  control={<Checkbox checked={field.value} />}
                  label="Subscribe to newsletter"
                />
              )}
            />
          </DialogContent>

          <DialogActions sx={{ px: 3, py: 2 }}>
            <Button type="button" disabled={isSubmitting} onClick={handleClose}>
              Cancel
            </Button>

            <FormSubmitButton label="Update" isSubmitting={isSubmitting} />
          </DialogActions>
        </form>
      </Dialog>
    </>
  );
};

export default EditPreferencesDialog;
