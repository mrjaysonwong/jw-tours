// internal imports
import Wishlists from '@/app/(features)/wishlists/Wishlists';
import { fetchWishlist } from '@/services/wishlists/fetchWishlist';

export const metadata = { title: 'Wishlists' };

export default async function WishListsPage() {
  const { guest, user } = await fetchWishlist();

  /* Demo for small-medium dataset */
  const duplicatedTours = Array.from({ length: 32 }).flatMap(() =>
    guest?.tours.map((t) => ({ ...t }))
  );

  const wishlist = { guest, user }

  return <Wishlists wishlist={wishlist} />;
}
