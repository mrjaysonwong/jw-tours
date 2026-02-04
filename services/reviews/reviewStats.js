import { Types } from 'mongoose';

// internal imports
import Review from '@/models/reviewModel';

export async function getTourReviewStats(tourId) {
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
        reviewCount: { $sum: 1 },
      },
    },
  ]);

  // Convert to object with keys 1-5
  const starCounts = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 };
  let totalCount = 0;
  let ratingSum = 0;

  for (const r of reviews) {
    const rating = r._id;
    const reviewCount = r.reviewCount;

    if (rating >= 1 && rating <= 5) {
      starCounts[rating] = reviewCount;
      ratingSum += rating * reviewCount;
      totalCount += reviewCount;
    }
  }

  const avgRating = totalCount > 0 ? ratingSum / totalCount : 0;

  return { starCounts, totalCount, avgRating };
}

export async function getToursReviewMap(tours) {
  const reviews = await Review.aggregate([
    {
      $match: {
        tour: { $in: tours.map((t) => t._id) },
        status: 'approved',
      },
    },
    {
      $group: {
        _id: '$tour',
        avgRating: { $avg: '$rating' },
        reviewCount: { $sum: 1 },
      },
    },
  ]);

  const reviewsMap = {};

  for (const r of reviews) {
    reviewsMap[r._id.toString()] = {
      avgRating: r.avgRating,
      reviewCount: r.reviewCount,
    };
  }

  return reviewsMap;
}
