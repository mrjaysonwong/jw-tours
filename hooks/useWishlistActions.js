'use client';

import { useRouter } from 'next/navigation';

// internal imports
import { toggleWishlist } from '@/helpers/toggleWishlist';
import { errorHandler } from '@/helpers/errorHelpers';

export function useWishlistActions(handleAlertMessage) {
  const router = useRouter();

  const handleClickFavorite = async (e, tourId, inWishlist, session, target) => {
    try {
      const data = await toggleWishlist(e, tourId, inWishlist, session, target);
      router.refresh();
      handleAlertMessage(data.message, 'success');
    } catch (error) {
      const { errorMessage } = errorHandler(error);
      handleAlertMessage(errorMessage, 'error');
    }
  };

  return { handleClickFavorite };
}
