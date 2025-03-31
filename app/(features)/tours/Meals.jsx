// internal imports
import { useTourDetails } from '@/contexts/TourDetailsProvider';
import InclusionsList from '@/components/lists/InclusionsList';

const Meals = () => {
  const { tour } = useTourDetails();

  const mealsInclusion = tour.inclusions.find(
    (inclusion) => inclusion.label === 'Meals'
  );

  return <InclusionsList inclusions={mealsInclusion} />;
};

export default Meals;
