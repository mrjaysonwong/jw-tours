'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  Typography,
  Card,
  CardMedia,
  CardHeader,
  CardContent,
  Avatar,
  IconButton,
  Rating,
  Box,
  Divider,
} from '@mui/material';
import GroupOutlinedIcon from '@mui/icons-material/GroupOutlined';
import AccessTimeOutlinedIcon from '@mui/icons-material/AccessTimeOutlined';
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';

// internal imports
import { formatISOlong } from '@/utils/formats/formatDates';
import { formatUrl, formatLastName } from '@/utils/formats/common';
import { iconMapping } from '@/constants/iconMaps/icons';
import MoreVertMenu from '@/components/menus/MoreVertMenu';

const styledBox = {
  display: 'flex',
  alignItems: 'center',
  '& > :not(:first-child)::before': {
    content: '"|"',
    marginX: 1,
    color: 'gray',
  },
  div: {
    display: 'flex',
    alignItems: 'center',
  },
  '& :not(:first-child)': {
    svg: { mr: 0.5 },
  },
  svg: { fontSize: '1.1rem' },
  '& div > p': {
    fontSize: { xs: '0.8rem', lg: '0.7rem' },
  },
};

const styledTypo = {
  mt: 1,
  fontWeight: 550,
  background: '-webkit-linear-gradient(20deg, #27AF60, #1CA085)',
  WebkitBackgroundClip: 'text',
  WebkitTextFillColor: 'transparent',
};

// add feature add to favorite

const TourCard = ({ tour }) => {
  const path = usePathname();
  const isAdmin = path.includes('admin');

  const { tourCost, perPersonFee, serviceFee } = tour.pricing;
  const basePricing = tourCost + perPersonFee + serviceFee;

  const amount = tour.currency
    ? `${tour.currency.symbol} ${Math.round(
        tour.convertedTotalCost
      ).toLocaleString()} ${tour.currency.code}`
    : `$ ${Math.round(basePricing).toLocaleString()} USD`;

  const href = `/tours/${formatUrl(tour.geoLocation)}/${formatUrl(
    tour.destination.name
  )}/${tour._id}`;

  const handleClickFavorite = (e) => {
    e.stopPropagation();
    e.preventDefault();
    console.log('clicked favorite');
  };

  const CardContentComponent = (
    <Card
      sx={{
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        cursor: isAdmin ? 'default' : 'pointer',
        a: { color: 'inherit' },
      }}
    >
      <Box sx={{ position: 'relative' }}>
        <CardMedia component="img" image={tour.images[0].url} height={150} />

        {!isAdmin && (
          <Box sx={{ position: 'absolute', top: 10, right: 15 }}>
            <IconButton
              disableRipple
              onClick={handleClickFavorite}
              size="small"
              aria-label="add to favorites"
              sx={{
                bgcolor: 'white',
                '& svg': { color: 'black' },
              }}
            >
              <FavoriteBorderOutlinedIcon />
            </IconButton>
          </Box>
        )}
      </Box>

      <CardHeader
        title={<Typography sx={{ fontWeight: 550 }}>{tour.title}</Typography>}
        subheader={
          isAdmin && (
            <Typography variant="body2" color="text.secondary">
              Posted date: {formatISOlong(tour.createdAt, true)}
            </Typography>
          )
        }
        action={
          isAdmin && (
            <Box sx={{ ml: 0.5 }}>
              <MoreVertMenu menuType="tour-list" id={tour._id} />
            </Box>
          )
        }
        sx={{ a: { color: 'inherit' } }}
      />

      <CardHeader
        avatar={<Avatar src={tour.guide.image.url} />}
        title={
          <Typography sx={{ fontWeight: 550 }}>
            {tour.guide.firstName} {formatLastName(tour.guide.lastName)}.
          </Typography>
        }
        subheader={
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Rating
              size="small"
              name="rating"
              value={tour.avgRating}
              precision={0.5}
              readOnly
              sx={{ color: '#FCC737' }}
            />

            <Typography variant="caption" sx={{ mx: 0.5 }}>
              ({tour.reviewCount})
            </Typography>
          </Box>
        }
        sx={{ py: 0 }}
      />

      <Divider sx={{ my: 1 }} />

      <CardContent
        sx={{
          flexGrow: 1,
          display: 'flex',
          flexDirection: 'column',
          py: 0,
        }}
      >
        <Box sx={styledBox}>
          {iconMapping[tour.transportation.type]}

          <Box>
            <AccessTimeOutlinedIcon />
            <Typography>
              {tour.duration?.value} {tour.duration?.unit}
            </Typography>
          </Box>

          <Box>
            <GroupOutlinedIcon />
            <Typography>up to: {tour.capacity.maxSize} people</Typography>
          </Box>
        </Box>

        <Box sx={{ mt: 'auto' }}>
          <Typography sx={styledTypo}>{amount}</Typography>
          <Typography
            variant="caption"
            color="text.secondary"
            sx={{ fontStyle: 'italic' }}
          >
            Includes all fees
          </Typography>
        </Box>
      </CardContent>
    </Card>
  );

  return isAdmin ? (
    CardContentComponent
  ) : (
    <Link
      href={href}
      target="_blank"
      style={{ textDecoration: 'none', color: 'inherit' }}
    >
      {CardContentComponent}
    </Link>
  );
};

export default TourCard;
