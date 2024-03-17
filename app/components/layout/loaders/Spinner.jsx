import CircularProgress from '@mui/material/CircularProgress';
import { MainContainer } from '../styles/globals';

export default function Spinner() {
  return (
    <MainContainer>
      <CircularProgress />
    </MainContainer>
  );
}