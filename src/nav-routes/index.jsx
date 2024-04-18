import TravelExploreIcon from '@mui/icons-material/TravelExplore';
import TourIcon from '@mui/icons-material/Tour';

export const navRoutes = [
  {
    pathName: 'Home',
    path: '/',
  },

  {
    pathName: 'Activites',
    path: '/activities',
  },

  {
    pathName: 'Travel Guides',
    path: '/travel-guides',
  },
  {
    pathName: 'Trip Types',
    nestedPathName: [
      {
        pathName: 'Day Trips',
        path: '/trip/day-trips',
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
        pathName: 'Bus Tours',
        path: '/trip/bus',
        icon: <TourIcon />,
      },
      {
        pathName: 'Hiking Tours',
        path: '/trip/hiking',
        icon: <TourIcon />,
      },
    ],
  },
  {
    pathName: 'Destinations',
    nestedPathName: [
      {
        pathName: 'Asia',
        path: '/destinations/asia',
        icon: <TravelExploreIcon />,
      },
      {
        pathName: 'Europe',
        path: '/destinations/europe',
        icon: <TravelExploreIcon />,
      },
      {
        pathName: 'Americas',
        path: '/destinations/americas',
        icon: <TravelExploreIcon />,
      },
      {
        pathName: 'Middle East',
        path: '/destinations/middle-east',
        icon: <TravelExploreIcon />,
      },
      {
        pathName: 'Africa',
        path: '/destinations/africa',
        icon: <TravelExploreIcon />,
      },
    ],
  },
  {
    pathName: 'About',
    path: '/about',
  },
  {
    pathName: 'Protected',
    path: '/protected',
  },
  {
    pathName: 'Contact',
    path: '/contact',
  },
];
