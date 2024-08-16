export function menuLinks(t) {
  const linksTranslations = [
    { label: t('labels.home'), href: '/' },
    {
      label: t('labels.destinations'),
      dropdown: 'destinations',
      nestedLabel: [
        {
          label: t('labels.palawan'),
          href: '/destinations/palawan',
        },
        {
          label: t('labels.puerto_galera'),
          href: '/destinations/puerto-galera',
        },
        {
          label: t('labels.boracay'),
          href: '/destinations/boracay',
        },
        {
          label: t('labels.ilocos_region'),
          href: '/destinations/ilocos',
        },
        {
          label: t('labels.cebu'),
          href: '/destinations/cebu',
        },
        {
          label: t('labels.bohol'),
          href: '/destinations/bohol',
        },
        {
          label: t('labels.davao'),
          href: '/destinations/davao',
        },
        {
          label: t('labels.siargao'),
          href: '/destinations/siargao',
        },
        {
          label: t('labels.bicol'),
          href: '/destinations/bicol',
        },
        {
          label: t('labels.northern_luzon'),
          href: '/destinations/northern-luzon',
        },
        {
          label: t('labels.camiguin'),
          href: '/destinations/camiguin',
        },
        {
          label: t('labels.visayas'),
          href: '/destinations/visayas',
        },
      ],
    },
    {
      label: t('labels.trip_types'),
      dropdown: 'trip-types',
      nestedLabel: [
        {
          label: t('labels.adventure'),
          href: '/trip/adventure',
        },
        {
          label: t('labels.culture'),
          href: '/trip/culture',
        },
        {
          label: t('labels.beach_time'),
          href: '/trip/beach-group-tours',
        },
        {
          label: t('labels.historical_tours'),
          href: '/trip/historical',
        },
        {
          label: t('labels.hiking_tours'),
          href: '/trip/hiking',
        },
        {
          label: t('labels.private_tours'),
          href: '/trip/private-tours',
        },
        {
          label: t('labels.island_cruises'),
          href: '/trip/island-cruises',
        },
        {
          label: t('labels.tours_on_sale'),
          href: '/trip/on-sale',
        },
      ],
    },
    {
      label: t('labels.about_us'),
      dropdown: 'about-us',
      nestedLabel: [
        {
          label: t('labels.our_story'),
          href: '/',
        },
        {
          label: t('labels.our_team'),
          href: '/',
        },
        {
          label: t('labels.our_reviews'),
          href: '/',
        },
        {
          label: t('labels.get_inspired'),
          href: '/',
        },
      ],
    },
    // { label: 'Contact Us', href: '/contact' },
  ];

  return linksTranslations;
}

// export const menuLinks = [
//   { label: 'Home', href: '/' },
//   {
//     label: 'Destinations',
//     dropdown: 'destinations',
//     nestedLabel: [
//       {
//         label: 'Palawan',
//         href: '/destinations/palawan',
//       },
//       {
//         label: 'Puerto Galera',
//         href: '/destinations/puerto-galera',
//       },
//       {
//         label: 'Boracay',
//         href: '/destinations/boracay',
//       },
//       {
//         label: 'Ilocos Region',
//         href: '/destinations/ilocos',
//       },
//       {
//         label: 'Cebu',
//         href: '/destinations/cebu',
//       },
//       {
//         label: 'Bohol',
//         href: '/destinations/bohol',
//       },
//       {
//         label: 'Davao',
//         href: '/destinations/davao',
//       },
//       {
//         label: 'Siargao',
//         href: '/destinations/siargao',
//       },
//       {
//         label: 'Bicol',
//         href: '/destinations/bicol',
//       },
//       {
//         label: 'Northern Luzon',
//         href: '/destinations/northern-luzon',
//       },
//       {
//         label: 'Camiguin',
//         href: '/destinations/camiguin',
//       },
//       {
//         label: 'Visayas',
//         href: '/destinations/visayas',
//       },
//     ],
//   },
//   {
//     label: 'Trip Types',
//     dropdown: 'trip-types',
//     nestedLabel: [
//       {
//         label: 'Adventure',
//         href: '/trip/adventure',
//       },
//       {
//         label: 'Culture',
//         href: '/trip/culture',
//       },
//       {
//         label: 'Beach Time',
//         href: '/trip/beach-group-tours',
//       },
//       {
//         label: 'Historical Tours',
//         href: '/trip/historical',
//       },
//       {
//         label: 'Hiking Tours',
//         href: '/trip/hiking',
//       },
//       {
//         label: 'Private Tours',
//         href: '/trip/private-tours',
//       },
//       {
//         label: 'Island Cruises',
//         href: '/trip/island-cruises',
//       },
//       {
//         label: 'Tours On Sale',
//         href: '/trip/on-sale',
//       },
//     ],
//   },
//   {
//     label: 'About Us',
//     dropdown: 'about-us',
//     nestedLabel: [
//       {
//         label: 'Our Story',
//         href: '/',
//       },
//       {
//         label: 'Our Team',
//         href: '/',
//       },
//       {
//         label: 'Our Reviews',
//         href: '/',
//       },
//       {
//         label: 'Get Inspired',
//         href: '/',
//       },
//     ],
//   },
//   // { label: 'Contact Us', href: '/contact' },
// ];
