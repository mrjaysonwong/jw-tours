import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Button,
  Divider,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
} from '@mui/material';
import { useForm, Controller } from 'react-hook-form';
import axios from 'axios';
import { useSession } from 'next-auth/react';
import { useRouter, usePathname } from '@/navigation';
import FormSubmitButton from '@/components/buttons/FormSubmitButton';
import { useMessageStore } from '@/stores/messageStore';
import { sleep } from '@/utils/sleep';

export default function EditFormDialog({ open, setOpen, user }) {
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
    setOpen(false);
  };

  const onSubmit = async (values) => {
    try {
      const action = 'update-language';
      const url = `/api/account/preferences?action=${action}`;

      const { data } = await axios.patch(url, values);

      router.replace(pathname, { locale: data.lang });

      // Trigger update session
      update({});

      setOpen(false);

      await sleep(3500);
      handleAlertMessage(data.statusText, 'success');
    } catch (error) {
      handleAlertMessage('An error occured. Try again.', 'error');
    }
  };

  return (
    <>
      <Dialog open={open}>
        <DialogTitle>Edit Preferences</DialogTitle>

        <form>
          <DialogContent dividers sx={{ borderBottom: 'none' }}>
            <FormControl fullWidth>
              <InputLabel htmlFor="select-language">Language</InputLabel>
              <Controller
                name="languageCountry"
                control={control}
                defaultValue={user?.languageCountry}
                render={({ field }) => (
                  <Select
                    {...field}
                    size="small"
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
          <Button disabled={isSubmitting} onClick={handleClose}>
            Cancel
          </Button>

          <FormSubmitButton
            label="Update"
            action="update"
            handleSubmit={handleSubmit(onSubmit)}
            isSubmitting={isSubmitting}
            isSubmitSuccessful={isSubmitSuccessful}
          />
        </DialogActions>
      </Dialog>
    </>
  );
}
