import TravelExploreIcon from '@mui/icons-material/TravelExplore';
import TourIcon from '@mui/icons-material/Tour';

export const navRoutes = [
  {
    label: 'Home',
    pathname: '/',
  },
  {
    label: 'Travel Guides',
    pathname: '/travel-guides',
  },
  {
    label: 'Trip Types',
    nestedLabel: [
      {
        label: 'Land Arrangements',
        pathname: '/trip/land-arrangements',
        icon: <TourIcon />,
      },
      {
        label: 'Shared Tours',
        pathname: '/trip/shared-tours',
        icon: <TourIcon />,
      },
      {
        label: 'Walking Tours',
        pathname: '/trip/walking',
        icon: <TourIcon />,
      },
      {
        label: 'Historical Tours',
        pathname: '/trip/historical',
        icon: <TourIcon />,
      },
      {
        label: 'Hiking Tours',
        pathname: '/trip/hiking',
        icon: <TourIcon />,
      },
      {
        label: 'Private Tours',
        pathname: '/trip/private-tours',
        icon: <TourIcon />,
      },
      {
        label: 'Island Cruises',
        pathname: '/trip/island-cruises',
        icon: <TourIcon />,
      },
    ],
  },
  {
    label: 'Destinations',
    nestedLabel: [
      {
        label: 'Palawan',
        pathname: '/destinations/palawan',
        icon: <TravelExploreIcon />,
      },
      {
        label: 'Puerto Galera',
        pathname: '/destinations/puerto-galera',
        icon: <TravelExploreIcon />,
      },
      {
        label: 'Boracay',
        pathname: '/destinations/boracay',
        icon: <TravelExploreIcon />,
      },
      {
        label: 'Ilocos Region',
        pathname: '/destinations/ilocos',
        icon: <TravelExploreIcon />,
      },
      {
        label: 'Cebu',
        pathname: '/destinations/cebu',
        icon: <TravelExploreIcon />,
      },
      {
        label: 'Bohol',
        pathname: '/destinations/bohol',
        icon: <TravelExploreIcon />,
      },
      {
        label: 'Davao',
        pathname: '/destinations/davao',
        icon: <TravelExploreIcon />,
      },
      {
        label: 'Siargao',
        pathname: '/destinations/siargao',
        icon: <TravelExploreIcon />,
      },
    ],
  },
  {
    label: 'About Us',
    pathname: '/about',
  },
  {
    label: 'Contact Us',
    pathname: '/contact',
  },
  {
    label: 'Protected',
    pathname: '/protected',
  },
];
