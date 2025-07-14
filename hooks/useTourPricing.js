import { useMemo } from 'react';

// internal imports
import { SERVICE_FEE_PERCENTAGE } from '@/constants/common';

export const useTourPricing = (tour, partySize) => {
  const baseServiceFee = tour.convertedPricing.serviceFee;

  const totalPerPersonFee = useMemo(
    () => tour.convertedPricing.perPersonFee * partySize,
    [tour, partySize]
  );

  const totalServiceFee = useMemo(() => {
    return partySize === tour.capacity.minSize
      ? baseServiceFee
      : baseServiceFee + (SERVICE_FEE_PERCENTAGE * totalPerPersonFee) / 100;
  }, [tour, partySize, totalPerPersonFee, baseServiceFee]);

  const totalCost = useMemo(
    () => tour.convertedPricing.tourCost + totalPerPersonFee + totalServiceFee,
    [tour, totalPerPersonFee, totalServiceFee]
  );

  return { totalPerPersonFee, totalServiceFee, totalCost };
};

export const useBasePricing = (tour, partySize) => {
  const baseServiceFee = tour.pricing.serviceFee;

  const baseTotalPerPersonFee = useMemo(
    () => tour.pricing.perPersonFee * partySize,
    [tour, partySize]
  );

  const baseTotalServiceFee = useMemo(() => {
    return partySize === tour.capacity.minSize
      ? baseServiceFee
      : baseServiceFee + (SERVICE_FEE_PERCENTAGE * baseTotalPerPersonFee) / 100;
  }, [tour, partySize, baseTotalPerPersonFee, baseServiceFee]);

  const baseTotalCost = useMemo(
    () => tour.pricing.tourCost + baseTotalPerPersonFee + baseTotalServiceFee,
    [tour, baseTotalPerPersonFee, baseTotalServiceFee]
  );

  return { baseTotalPerPersonFee, baseTotalServiceFee, baseTotalCost };
};
