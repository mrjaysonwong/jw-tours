import Link from 'next/link';

import { StyledContainer } from '@/components/styled/StyledContainers';
import { formatUrl } from '@/utils/formats/formatUrl';

const FilteredTours = ({ tours }) => {
  return (
    <StyledContainer>
      <ul>
        {tours.map((tour) => {
          const href = `/tours/${formatUrl(
            tour.destination.geoLocation
          )}/${formatUrl(tour.destination.name)}/${tour._id}`;
          return (
            <li key={tour._id} style={{ textTransform: 'capitalize' }}>
              <Link href={href}>{tour.destination.name}</Link>
            </li>
          );
        })}
      </ul>
    </StyledContainer>
  );
};

export default FilteredTours;
