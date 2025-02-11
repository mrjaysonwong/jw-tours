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
} from '@mui/material';
import { useForm, Controller } from 'react-hook-form';
import axios from 'axios';
import { useSession } from 'next-auth/react';
import { useRouter, usePathname } from 'next/navigation';

// internal imports
import FormSubmitButton from '@/components/buttons/FormSubmitButton';
import { useMessageStore } from '@/stores/messageStore';
import AlertMessage from '@/components/alerts/AlertMessage';
import { sleep } from '@/utils/sleep';
import { errorHandler } from '@/helpers/errorHelpers';
import { API_URLS } from '@/constants/api';

const EditPreferencesDialog = ({ open, setOpen, user }) => {
  const router = useRouter();
  const pathname = usePathname();

  const { handleAlertMessage, alert, handleClose } = useMessageStore();

  const { update } = useSession();

  const {
    control,
    handleSubmit,
    formState: { isSubmitting, isSubmitSuccessful },
  } = useForm();

  const handleOnClose = () => {
    setOpen(false);
  };

  const onSubmit = async (formData) => {
    try {
      const url = `${API_URLS.USERS}/${user._id}/preferences`;

      const { data } = await axios.patch(url, formData);

      router.replace(pathname, { locale: data.langCode });

      setOpen(false);

      // Triggers session update
      update({});

      await sleep(2500);
      handleAlertMessage(data.statusText, 'success');
    } catch (error) {
      const { errorMessage } = errorHandler(error);
      handleAlertMessage(errorMessage, 'error');
    }
  };

  return (
    <>
      <Dialog open={open} scroll="body" closeAfterTransition={false}>
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
          </DialogContent>
        </form>

        <DialogActions sx={{ mx: 2, py: 2 }}>
          <Button type="button" disabled={isSubmitting} onClick={handleOnClose}>
            Cancel
          </Button>

          <FormSubmitButton
            label="Update"
            action="update"
            isSubmitting={isSubmitting}
            isSubmitSuccessful={isSubmitSuccessful}
          />
        </DialogActions>
      </Dialog>

      <AlertMessage
        open={alert.open}
        message={alert.message}
        severity={alert.severity}
        onClose={handleClose}
      />
    </>
  );
};

export default EditPreferencesDialog;
