import { useState } from 'react';
import Link from 'next/link';
import {
  Divider,
  Box,
  Typography,
  Grid,
  Rating,
  LinearProgress,
  Avatar,
  IconButton,
  Tooltip,
  Button,
  useMediaQuery,
} from '@mui/material';
import { useTheme } from '@mui/material/styles';
import VerifiedIcon from '@mui/icons-material/Verified';
import FlagOutlinedIcon from '@mui/icons-material/FlagOutlined';

// internal imports
import { useTourDetails } from '@/contexts/TourContextProvider';
import { formatISOlong } from '@/utils/formats/formatDates';
import { formatLastName } from '@/utils/formats/common';
import { useTourReviews } from '@/hooks/useReviews';
import { SkeletonReviewList } from '@/components/loaders/Skeletons';
import FilterTourRatings from './FilterReviewsByRating';

const starLevels = [5, 4, 3, 2, 1];

const RatingBreakdown = ({ starLabel, value, ratingCount }) => {
  return (
    <Box sx={{ display: 'flex', alignItems: 'center', width: '100%' }}>
      <Typography sx={{ minWidth: 55 }}>{starLabel}</Typography>
      <Box sx={{ flexGrow: 1, mx: 2, my: 1.5 }}>
        <LinearProgress
          variant="determinate"
          value={value}
          sx={{
            height: 10,
            borderRadius: 5,
            backgroundColor: '	rgba(128,128,128, 0.5)',
          }}
        />
      </Box>
      <Typography>{ratingCount}</Typography>
    </Box>
  );
};

const ClampedComment = ({ text }) => {
  const [expanded, setExpanded] = useState(false);

  const theme = useTheme();
  const isSmallDevices = useMediaQuery(theme.breakpoints.down('md'));

  const charLimit = isSmallDevices ? 100 : 200;
  const isLong = text.length > charLimit;

  return (
    <Box>
      <Typography
        sx={{
          my: 1,
          overflow: 'hidden',
          display: '-webkit-box',
          WebkitBoxOrient: 'vertical',
          ...(expanded ? {} : { WebkitLineClamp: 2, lineClamp: 2 }),
        }}
      >
        {text}
      </Typography>

      {isLong && (
        <Button
          disableRipple
          color="inherit"
          onClick={() => setExpanded(!expanded)}
          sx={{ textTransform: 'none' }}
        >
          {expanded ? 'Read less' : 'Read more'}
        </Button>
      )}
    </Box>
  );
};

const ReviewList = ({ reviews, isLoading }) => {
  if (isLoading) return <SkeletonReviewList l={3} />;
  if (reviews.length === 0) {
    return (
      <>
        <Typography variant="h6">No Results</Typography>
        <Typography>Try another filter</Typography>
      </>
    );
  }

  return reviews.map((r, index) => (
    <Box key={index} sx={{ my: 3 }}>
      <Rating
        name="half-rating-read"
        value={r.rating}
        precision={0.5}
        readOnly
        sx={{ color: '#FCC737' }}
      />
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          gap: 1,
        }}
      >
        <Avatar src={r.user.image?.url} />
        <Box sx={{ flexDirection: 'column' }}>
          <Typography>
            {r.user.firstName} {formatLastName(r.user.lastName)}.
          </Typography>
          <Typography color="text.secondary">
            {formatISOlong(r.createdAt)}
          </Typography>
        </Box>

        <Tooltip title="Report this review">
          <IconButton sx={{ ml: 'auto' }}>
            <FlagOutlinedIcon sx={{ color: 'gray' }} />
          </IconButton>
        </Tooltip>
      </Box>

      <ClampedComment text={r.comment} />
    </Box>
  ));
};

const TourReviews = () => {
  const [value, setValue] = useState('all');

  const { tour } = useTourDetails();
  const { starCounts, reviewCount, avgRating } = tour.reviewSummary;

  const { data, isLoading, hasNextPage, isFetchingNextPage, fetchNextPage } =
    useTourReviews(tour._id, value);

  const allReviews = data?.pages.flatMap((page) => page.data) ?? [];

  return (
    <>
      <Divider sx={{ my: 5 }} />

      <Typography variant="h6">Reviews</Typography>

      {reviewCount === 0 ? (
        <Typography sx={{ my: 2, fontWeight: 500 }}>No reviews yet</Typography>
      ) : (
        <>
          <Grid container spacing={2} alignItems="center">
            <Grid item xs={12} md={6} sx={{ textAlign: 'center' }}>
              <Typography variant="h4">{avgRating}</Typography>
              <Rating
                size="large"
                name="half-rating-read"
                defaultValue={avgRating}
                precision={0.5}
                readOnly
                sx={{ color: '#FCC737' }}
              />
              <Typography color="text.secondary" sx={{ fontWeight: 500 }}>
                based on {reviewCount} review{reviewCount > 1 ? 's' : ''}
              </Typography>
            </Grid>

            <Grid item xs={12} md={6}>
              <Typography
                color="text.secondary"
                sx={{ my: 1, fontWeight: 500 }}
              >
                Total reviews and rating
              </Typography>

              {starLevels.map((star) => (
                <RatingBreakdown
                  key={star}
                  starLabel={star === 1 ? '1 star' : `${star} stars`}
                  value={
                    reviewCount > 0 ? (starCounts[star] / reviewCount) * 100 : 0
                  }
                  ratingCount={starCounts[star]}
                />
              ))}
            </Grid>
          </Grid>

          <Box sx={{ my: 4, display: 'flex', alignItems: 'center', gap: 1 }}>
            <VerifiedIcon />
            <Typography>
              We perform{' '}
              <Link href="#">
                <Box component="span" sx={{ textDecoration: 'underline' }}>
                  checks on reviews
                </Box>
              </Link>
            </Typography>
          </Box>

          <Divider />

          <Box sx={{ my: 3, textAlign: 'right' }}>
            <FilterTourRatings value={value} setValue={setValue} />
          </Box>

          <ReviewList reviews={allReviews} isLoading={isLoading} />

          {hasNextPage && (
            <Box sx={{ textAlign: 'center' }}>
              <Button
                variant="outlined"
                onClick={() => fetchNextPage()}
                disabled={isFetchingNextPage}
              >
                {isFetchingNextPage ? 'Loading...' : 'See more reviews'}
              </Button>
            </Box>
          )}
        </>
      )}
    </>
  );
};

export default TourReviews;
