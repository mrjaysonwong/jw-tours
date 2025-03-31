import { useParams } from 'next/navigation';
import { Typography, Divider } from '@mui/material';

// internal imports
import { useUserDataContext } from '@/contexts/UserProvider';
import { useUserDetailsContext } from '@/contexts/UserProvider';
import Password from './Password';
import DeleteAccount from './DeleteAccount';
import CustomError from '@/components/errors/CustomError';
import LoadingSpinner from '@/components/loaders/LoadingSpinner';

export const SecurityCard = () => {
  const params = useParams();
  const { isLoading, isError, error, userId, user, email } =
    useUserDataContext();

  const {
    userId: targetUserId,
    user: targetUser,
    email: targetEmail,
  } = useUserDetailsContext();

  if (isError) return <CustomError error={error} />;

  if (isLoading) return <LoadingSpinner h="50dvh" />;

  return (
    <>
      <Password
        userId={userId ?? targetUserId}
        user={user ?? targetUser}
        email={email ?? targetEmail}
      />

      {!params.id && <DeleteAccount />}
    </>
  );
};

const Security = () => {
  return (
    <>
      <Typography variant="h5">Security</Typography>
      <Typography>
        Change your security settings, or delete your account.
      </Typography>

      <Divider sx={{ my: 3 }} />

      <SecurityCard />
    </>
  );
};

export default Security;
