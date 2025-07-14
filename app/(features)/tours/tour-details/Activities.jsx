// internal imports
import { useTourDetails } from '@/contexts/TourContextProvider';
import InclusionsList from '@/components/lists/InclusionsList';

const Activities = () => {
  const { tour } = useTourDetails();

  const activitiesInclusion = tour.inclusions.find(
    (inclusion) => inclusion.label === 'Activities'
  );

  return <InclusionsList inclusions={activitiesInclusion} />;
};

export default Activities;
