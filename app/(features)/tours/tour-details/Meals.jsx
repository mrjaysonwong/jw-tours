// internal imports
import { useTourDetails } from '@/contexts/TourContextProvider';
import InclusionsList from '@/components/lists/InclusionsList';

const Meals = () => {
  const { tour } = useTourDetails();

  const mealsInclusion = tour.inclusions.find(
    (inclusion) => inclusion.label === 'Meals'
  );

  return <InclusionsList inclusions={mealsInclusion} />;
};

export default Meals;
