import { redirect } from 'next/navigation';
import { Typography, Container } from '@mui/material';

// local imports
import HeroTabsLanding from '@/components/heros/HeroTabsLanding';
import { slides } from '@/data/heroData.js';

export default function HomePage({ searchParams }) {
  const { selectedTab, aid } = searchParams;

  if (aid >= slides.length) {
    redirect('/');
  }

  return (
    <>
      <section>
        <HeroTabsLanding data={slides} />
      </section>

      <section>
        <Container sx={{ my: 3 }}>
          <Typography variant="h5" sx={{ fontWeight: 'bold' }}>
            Unforgettable{' '}
            {selectedTab === 'culture'
              ? 'cultural'
              : !selectedTab
              ? 'landmarks'
              : selectedTab}{' '}
            experiences
          </Typography>
        </Container>
      </section>
    </>
  );
}
