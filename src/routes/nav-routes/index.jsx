import TravelExploreIcon from '@mui/icons-material/TravelExplore';
import TourIcon from '@mui/icons-material/Tour';

export const navRoutes = [
  {
    pathName: 'Home',
    path: '/',
  },
  {
    pathName: 'Travel Guides',
    path: '/travel-guides',
  },
  {
    pathName: 'Trip Types',
    nestedPathName: [
      {
        pathName: 'Land Arrangements',
        path: '/trip/land-arrangements',
        icon: <TourIcon />,
      },
      {
        pathName: 'Shared Tours',
        path: '/trip/shared-tours',
        icon: <TourIcon />,
      },
      {
        pathName: 'Walking Tours',
        path: '/trip/walking',
        icon: <TourIcon />,
      },
      {
        pathName: 'Historical Tours',
        path: '/trip/historical',
        icon: <TourIcon />,
      },
      {
        pathName: 'Hiking Tours',
        path: '/trip/hiking',
        icon: <TourIcon />,
      },
      {
        pathName: 'Private Tours',
        path: '/trip/private-tours',
        icon: <TourIcon />,
      },
      {
        pathName: 'Island Cruises',
        path: '/trip/island-cruises',
        icon: <TourIcon />,
      },
    ],
  },
  {
    pathName: 'Destinations',
    nestedPathName: [
      {
        pathName: 'Palawan',
        path: '/destinations/palawan',
        icon: <TravelExploreIcon />,
      },
      {
        pathName: 'Puerto Galera',
        path: '/destinations/puerto-galera',
        icon: <TravelExploreIcon />,
      },
      {
        pathName: 'Boracay',
        path: '/destinations/boracay',
        icon: <TravelExploreIcon />,
      },
      {
        pathName: 'Ilocos Region',
        path: '/destinations/ilocos',
        icon: <TravelExploreIcon />,
      },
      {
        pathName: 'Cebu',
        path: '/destinations/cebu',
        icon: <TravelExploreIcon />,
      },
      {
        pathName: 'Bohol',
        path: '/destinations/bohol',
        icon: <TravelExploreIcon />,
      },
      {
        pathName: 'Davao',
        path: '/destinations/davao',
        icon: <TravelExploreIcon />,
      },
      {
        pathName: 'Siargao',
        path: '/destinations/siargao',
        icon: <TravelExploreIcon />,
      },
    ],
  },
  {
    pathName: 'About Us',
    path: '/about',
  },
  {
    pathName: 'Contact Us',
    path: '/contact',
  },
  {
    pathName: 'Protected',
    path: '/protected',
  },
];
