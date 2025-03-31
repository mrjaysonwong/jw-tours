import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
  CircularProgress,
} from '@mui/material';

const requestText = {
  account: 'delete this user account',
  photo: 'delete this profile photo',
  export: 'download this user list',
};

const getContextText = (type) => {
  return requestText[type];
};

const ConfirmationDialog = ({
  title,
  buttonLabel,
  type,
  isDialogOpen,
  setIsDialogOpen,
  handleSubmit,
  isSubmitting,
  isSubmitSuccessful,
}) => {
  const isExport = type === 'export';

  const handleClose = () => {
    setIsDialogOpen(false);
  };

  return (
    <>
      <Dialog open={isDialogOpen}>
        <DialogTitle>{title}</DialogTitle>
        <DialogContent dividers sx={{ borderBottom: 'none' }}>
          <DialogContentText>
            Are you sure you want to {getContextText(type)}?
          </DialogContentText>

          {!isExport && (
            <DialogContentText>
              This action is permanent and cannot be undone.
            </DialogContentText>
          )}
        </DialogContent>
        <DialogActions sx={{ px: 3, py: 2 }}>
          <Button
            onClick={handleClose}
            disabled={isSubmitting || isSubmitSuccessful}
          >
            Cancel
          </Button>

          <Button
            variant="contained"
            onClick={handleSubmit}
            disabled={isSubmitting || isSubmitSuccessful}
          >
            {isSubmitting ? (
              <CircularProgress
                aria-describedby="loading"
                aria-busy={true}
                size="1.5rem"
              />
            ) : (
              buttonLabel
            )}
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default ConfirmationDialog;
