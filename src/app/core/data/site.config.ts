/**
 * Brand details — taken from the client's Instagram profile (@little___creative).
 * Change values here once and they update across the whole site.
 */
export const SITE = {
  brand: 'Little Creative',
  city: 'Madurai',
  phoneDisplay: '+91 96889 35048',
  phoneHref: 'tel:+919688935048',
  whatsappHref:
    'https://wa.me/919688935048?text=' +
    encodeURIComponent('Hi Little Creative, I would like to know more about your photography.'),
  instagramHandle: '@little___creative',
  instagramHref: 'https://www.instagram.com/little___creative/',
} as const;

export interface NavLink {
  path: string;
  key: string; // i18n key
  exact: boolean;
}

export const NAV_LINKS: readonly NavLink[] = [
  { path: '/', key: 'nav.home', exact: true },
  { path: '/portfolio', key: 'nav.portfolio', exact: false },
  { path: '/services', key: 'nav.services', exact: false },
  { path: '/about', key: 'nav.about', exact: false },
  { path: '/contact', key: 'nav.contact', exact: false },
];

/** Shoot locations from the client's Instagram highlights */
export const SHOOT_LOCATIONS: readonly string[] = [
  'locations.kodaikanal',
  'locations.pollachi',
  'locations.poombarai',
  'locations.sayalkudi',
  'locations.sivagangai',
  'locations.singampunari',
  'locations.tiruppur',
];
