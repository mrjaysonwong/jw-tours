import Image from 'next/image';

// local imports
import { StyledHeroHeader } from '../styled/StyledHeros';
import Headline from './Headline';

export default function TabPanelFive({ item }) {
  const { src, alt, subHeader } = item;
  return (
    <StyledHeroHeader>
      <Image
        className="hero-image"
        src={src}
        alt={alt}
        width={1700}
        height={900}
        style={{
          objectFit: 'cover',
          objectPosition: '85% 80%',
        }}
        priority
      />
      <Headline subHeader={subHeader} />
    </StyledHeroHeader>
  );
}
