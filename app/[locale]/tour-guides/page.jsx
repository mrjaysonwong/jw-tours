import { unstable_noStore as noStore } from 'next/cache';

// internal imports
import GuidesList from '@/app/(features)/tour-guides/GuidesList';

async function fetchGuidesList() {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/guides`
    );

    if (res.status === 500) throw new Error('Failed to fetch guides list');

    const { data } = await res.json();

    return data;
  } catch (error) {
    throw error;
  }
}

export default async function TourGuidesPage() {
  noStore();
  const guides = await fetchGuidesList();

  return <GuidesList guides={guides} />;
}
