import {
  Typography,
  Grid,
  Box,
  Card,
  CardContent,
  Divider,
  Tooltip,
} from '@mui/material';

// internal imports
import {
  useUserDataContext,
  useUserDetailsContext,
  UserDataProvider,
} from '@/contexts/UserProvider';
import { SkeletonCard } from '@/components/loaders/Skeletons';
import Password from '@/app/(features)/account/security/Password';

export default function EditUserSecurity() {
  const contextValues = useUserDetailsContext();

  return (
    <>
      {/* <Card>
        <CardContent>
          <Typography sx={{ fontSize: '1.2rem', fontWeight: 500 }}>
            Password
          </Typography>

          <Divider sx={{ my: 2 }} />
        </CardContent>
      </Card> */}

      <Password {...contextValues} />
    </>
  );
}
