import axios from 'axios';
import { getOrCreateGuestId } from '@/app/[locale]/tours/[...slug]/actions';
import { API_URLS } from '@/constants/apiRoutes';

export const toggleWishlist = async (
  e,
  tourId,
  inWishlist,
  session,
  target
) => {
  e.stopPropagation();
  e.preventDefault();

  const guestId = await getOrCreateGuestId();
  const url = API_URLS.WISHLISTS;

  const payload = { guestId, tourId, session, target};

  const method = inWishlist ? 'patch' : 'post';

  const { data } = await axios[method](url, payload);

  return data;
};
