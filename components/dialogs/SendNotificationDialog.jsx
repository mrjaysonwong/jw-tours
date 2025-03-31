import { useState } from 'react';
import { usePathname } from 'next/navigation';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
  Divider,
  Box,
  Avatar,
  Select,
  InputLabel,
  FormControl,
  MenuItem,
  TextField,
} from '@mui/material';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { sendNotificationSchema } from '@/validation/yup/admin/sendNotificationSchema';
import axios from 'axios';
import GroupIcon from '@mui/icons-material/Group';
import EditNotificationsIcon from '@mui/icons-material/EditNotifications';
import ArticleIcon from '@mui/icons-material/Article';
import TitleIcon from '@mui/icons-material/Title';
import MessageIcon from '@mui/icons-material/Message';
import LinkIcon from '@mui/icons-material/Link';

// internal imports
import FormSubmitButton from '@/components/buttons/FormSubmitButton';
import { useSendNotificationStore } from '@/stores/notificationStore';
import ErrorText from '@/components/errors/ErrorText';
import { API_URLS } from '@/config/apiRoutes';
import { errorHandler } from '@/helpers/errorHelpers';
import { useMessageStore } from '@/stores/messageStore';
import FormInput from '@/components/inputs/FormInput';

const typeItems = [{ value: 'Email' }, { value: 'SMS' }, { value: 'Push' }];

const templateItems = [
  { value: 'Survey' },
  { value: 'Promo' },
  { value: 'Update' },
  { value: 'Announcement' },
  { value: 'Newsletter' },
];

const avatarStyle = {
  borderRadius: '6px',
  mr: 2,
  color: 'white',
};

const selectInputData = (errors, setLinkInputOpen) => [
  {
    label: 'Notification Type',
    icon: <EditNotificationsIcon />,
    menuItems: typeItems,
    inputName: 'notificationType',
    error: errors.notificationType,
  },
  {
    label: 'Template',
    icon: <ArticleIcon />,
    menuItems: templateItems,
    inputName: 'template',
    error: errors.template,
    setLinkInputOpen, // Only for the Template input
  },
];

const textFieldInputData = (errors, isLinkInputOpen) => [
  ...(isLinkInputOpen
    ? [
        {
          icon: <LinkIcon />,
          label: 'External Link',
          inputName: 'link',
          error: errors.link,
        },
      ]
    : []),
  {
    icon: <TitleIcon />,
    label: 'Title',
    inputName: 'title',
    error: errors.title,
  },
  {
    icon: <MessageIcon />,
    label: 'Message',
    inputName: 'message',
    error: errors.message,
    multiline: true,
    maxRows: 4,
  },
];

const FormSelectInput = ({
  label,
  icon,
  menuItems,
  control,
  inputName,
  errors,
  setValue,
  setLinkInputOpen,
}) => {
  return (
    <>
      <Box sx={{ display: 'flex', py: 1 }}>
        <Avatar sx={avatarStyle}>{icon}</Avatar>

        <FormControl fullWidth size="small" error={!!errors}>
          <InputLabel htmlFor={`select-label-${inputName}`}>{label}</InputLabel>

          <Controller
            name={inputName}
            control={control}
            defaultValue={''}
            render={({ field }) => {
              const handleSelectChange = (e) => {
                field.onChange(e);

                const selectedValue = e.target.value;
                if (selectedValue === 'survey') {
                  setLinkInputOpen(true);
                  setValue('link', '');
                } else {
                  setLinkInputOpen(false);
                }
              };

              return (
                <>
                  <Select
                    {...field}
                    label={label}
                    onChange={handleSelectChange}
                    inputProps={{
                      id: `select-label-${inputName}`,
                    }}
                  >
                    {menuItems.map((item, index) => (
                      <MenuItem key={index} value={item.value.toLowerCase()}>
                        {item.value}
                      </MenuItem>
                    ))}
                  </Select>

                  <ErrorText error={errors} />
                </>
              );
            }}
          />
        </FormControl>
      </Box>
    </>
  );
};

const SendNotificationDialog = ({
  isDialogOpen,
  setIsDialogOpen,
  setSelected,
}) => {
  const [isLinkInputOpen, setLinkInputOpen] = useState(false);

  const pathname = usePathname();

  const { selectedUserIds, clearSelectedUserIds } = useSendNotificationStore();

  const { handleAlertMessage } = useMessageStore();

  const handleClose = () => {
    setIsDialogOpen(false);
  };

  const {
    register,
    control,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm({ resolver: yupResolver(sendNotificationSchema) });

  const onSubmit = async (formData) => {
    try {
      const url = `${API_URLS.ADMIN}/users/send-notification`;

      const requestData = {
        ...(formData.link && { link: formData.link }),
        userIds: [...selectedUserIds],
        ...formData,
      };

      const { data } = await axios.post(url, requestData);

      handleAlertMessage(data.message, 'success');

      clearSelectedUserIds();
      setIsDialogOpen(false);
      setSelected(new Set());
    } catch (error) {
      const { errorMessage } = errorHandler(error);
      handleAlertMessage(errorMessage, 'error');
    }
  };

  return (
    <>
      <Dialog open={isDialogOpen} scroll="body">
        <DialogTitle>Send Notification</DialogTitle>

        <Divider />

        <form onSubmit={handleSubmit(onSubmit)}>
          <DialogContent sx={{ width: { xs: 'auto', sm: '410px' } }}>
            <Typography>Send To</Typography>

            <Box sx={{ display: 'flex', py: 1 }}>
              <Avatar sx={avatarStyle}>
                <GroupIcon />
              </Avatar>

              <TextField
                fullWidth
                disabled
                size="small"
                id="read-only-input"
                label={`Selected ${
                  selectedUserIds.length === 1 ? 'User' : 'Users'
                }`}
                defaultValue={selectedUserIds.length}
                slots={{
                  input: {
                    readOnly: true,
                  },
                }}
              />
            </Box>

            {selectInputData(errors, setLinkInputOpen).map((data, index) => (
              <FormSelectInput
                key={index}
                label={data.label}
                icon={data.icon}
                menuItems={data.menuItems}
                control={control}
                inputName={data.inputName}
                errors={data.error}
                setValue={setValue}
                setLinkInputOpen={data.setLinkInputOpen || (() => {})} // Default to a no-op function if not provided
              />
            ))}

            {textFieldInputData(errors, isLinkInputOpen).map((data, index) => (
              <Box key={index} sx={{ display: 'flex', py: 1 }}>
                <Avatar sx={avatarStyle}>{data.icon}</Avatar>

                <Box sx={{ width: '100%' }}>
                  <FormInput
                    register={register}
                    inputName={data.inputName}
                    label={data.label}
                    defaultValue=""
                    errors={data.error}
                    margin="none"
                    multiline={data.multiline}
                    maxRows={data.maxRows}
                  />
                </Box>
              </Box>
            ))}
          </DialogContent>

          <DialogActions sx={{ px: 3, py: 2 }}>
            <Button disabled={isSubmitting} onClick={handleClose}>
              Cancel
            </Button>

            <FormSubmitButton label="Send" isSubmitting={isSubmitting} />
          </DialogActions>
        </form>
      </Dialog>
    </>
  );
};

export default SendNotificationDialog;
