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
import { useMessageStore } from '@/stores/messageStore';
import { useForm, Controller } from 'react-hook-form';
import axios from 'axios';
import FormSubmitButton from '@/app/components/custom/buttons/FormSubmitButton';
import { useRouter, usePathname } from '@/navigation';
import { useSession } from 'next-auth/react';
import { sleep } from '@/utils/helper/common';

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

      setOpen(false);

      // Trigger update session
      update({});

      router.replace(pathname, { locale: data.lang });

      await sleep(1000);
      handleAlertMessage(data.statusText, 'success');
    } catch (error) {
      handleAlertMessage('An error occured. Try again.', 'error');
    }
  };

  return (
    <>
      <Dialog open={open}>
        <DialogTitle>Edit Preferences</DialogTitle>

        <Divider sx={{ mx: 3 }} />

        <form>
          <DialogContent>
            <FormControl fullWidth>
              <InputLabel htmlFor="select-language">Language</InputLabel>
              <Controller
                name="languageCountry"
                control={control}
                defaultValue={user?.languageCountry}
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

        <DialogActions sx={{ m: 2 }}>
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
