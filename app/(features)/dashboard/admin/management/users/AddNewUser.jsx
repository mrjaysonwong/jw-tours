import { Typography, Card, CardContent } from '@mui/material';

// internal imports
import AddUserFormFields from '@/app/(features)/authentication/AddUserFormFields';

export default function AddNewUser() {
  return (
    <>
      <Typography variant="h5">Add New User</Typography>

      <Card>
        <CardContent>
          <AddUserFormFields />
        </CardContent>
      </Card>
    </>
  );
}
