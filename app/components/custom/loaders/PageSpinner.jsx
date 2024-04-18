import CircularProgress from '@mui/material/CircularProgress';
import { MainContainer } from '@/app/components/global-styles/globals';

export default function PageSpinner() {
  return (
    <MainContainer>
      <CircularProgress thickness={1} />
    </MainContainer>
  );
}
