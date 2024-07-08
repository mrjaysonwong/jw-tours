export const menuLinks = [
  { label: 'Home', href: '/' },
  {
    label: 'Destinations',
    dropdown: 'destinations',
    nestedLabel: [
      {
        label: 'Palawan',
        href: '/destinations/palawan',
      },
      {
        label: 'Puerto Galera',
        href: '/destinations/puerto-galera',
      },
      {
        label: 'Boracay',
        href: '/destinations/boracay',
      },
      {
        label: 'Ilocos Region',
        href: '/destinations/ilocos',
      },
      {
        label: 'Cebu',
        href: '/destinations/cebu',
      },
      {
        label: 'Bohol',
        href: '/destinations/bohol',
      },
      {
        label: 'Davao',
        href: '/destinations/davao',
      },
      {
        label: 'Siargao',
        href: '/destinations/siargao',
      },
    ],
  },
  {
    label: 'Trip Types',
    dropdown: 'trip-types',
    nestedLabel: [
      {
        label: 'Land Arrangements',
        href: '/trip/land-arrangements',
      },
      {
        label: 'Shared Tours',
        href: '/trip/shared-tours',
      },
      {
        label: 'Walking Tours',
        href: '/trip/walking',
      },
      {
        label: 'Historical Tours',
        href: '/trip/historical',
      },
      {
        label: 'Hiking Tours',
        href: '/trip/hiking',
      },
      {
        label: 'Private Tours',
        href: '/trip/private-tours',
      },
      {
        label: 'Island Cruises',
        href: '/trip/island-cruises',
      },
      {
        label: 'Tours On Sale',
        href: '/trip/on-sale',
      },
    ],
  },
  {
    label: 'About Us',
    dropdown: 'about-us',
    nestedLabel: [
      {
        label: 'Our Story',
        href: '/',
      },
      {
        label: 'Our Team',
        href: '/',
      },
      {
        label: 'Our Reviews',
        href: '/',
      },
      {
        label: 'Get Inspired',
        href: '/',
      },
    ],
  },
  // { label: 'Contact Us', href: '/contact' },
];
