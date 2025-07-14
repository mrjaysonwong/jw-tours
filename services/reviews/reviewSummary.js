import { Types } from 'mongoose';

// internal imports
import Review from '@/models/reviewModel';

export async function getReviewSummary(tourId) {
  const reviews = await Review.aggregate([
    {
      $match: {
        tour: new Types.ObjectId(`${tourId}`),
        status: 'approved',
      },
    },
    {
      $group: {
        _id: '$rating',
        count: { $sum: 1 },
      },
    },
  ]);

  // Convert to object with keys 1-5
  const starCounts = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 };
  let totalCount = 0;
  let ratingSum = 0;

  for (const row of reviews) {
    const rating = row._id;
    const count = row.count;

    if (rating >= 1 && rating <= 5) {
      starCounts[rating] = count;
      ratingSum += rating * count;
      totalCount += count;
    }
  }

  const avgRating = totalCount > 0 ? ratingSum / totalCount : 0;

  return { starCounts, totalCount, avgRating };
}
