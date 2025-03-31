import Link from 'next/link';

// internal imports
import { StyledContainer } from '@/components/styled/StyledContainers';
import { formatUrl } from '@/utils/formats/formatUrl';

const TourList = ({ tours }) => {
  return (
    <StyledContainer>
      {tours.length === 0 ? (
        <div>No tours yet</div>
      ) : (
        <ul>
          {tours.map((tour) => (
            <li key={tour._id} style={{ textTransform: 'capitalize' }}>
              <Link
                href={`/tours/${formatUrl(
                  tour.destination.geoLocation
                )}/${formatUrl(tour.destination.name)}/${tour._id}`}
                prefetch={false}
              >
                {tour.destination.name}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </StyledContainer>
  );
};

export default TourList;
