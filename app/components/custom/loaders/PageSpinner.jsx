import CircularProgress from '@mui/material/CircularProgress';
import { MainContainer } from '@/app/components/global-styles/globals';

export default function PageSpinner() {
  return (
    <MainContainer>
      <CircularProgress />
    </MainContainer>
  );
}
