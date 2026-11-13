import { PHOTOS, Photo, PhotoCategory } from './images';

/* ---------- Hero slider ---------- */
export interface HeroSlide {
  key: 'wedding' | 'couple' | 'family'; // i18n: home.hero.slides.<key>.eyebrow / .title
  photo: Photo;
}

export const HERO_SLIDES: readonly HeroSlide[] = [
  { key: 'wedding', photo: PHOTOS.heroWedding },
  { key: 'couple', photo: PHOTOS.heroCouple },
  { key: 'family', photo: PHOTOS.heroFamily },
];

/* ---------- Services preview ---------- */
export interface ServicePreview {
  key: PhotoCategory; // i18n: home.services.items.<key>.title / .text
  photo: Photo;
}

export const HOME_SERVICES: readonly ServicePreview[] = [
  { key: 'wedding', photo: PHOTOS.serviceWedding },
  { key: 'couple', photo: PHOTOS.serviceCouple },
  { key: 'baby', photo: PHOTOS.serviceBaby },
  { key: 'family', photo: PHOTOS.serviceFamily },
  { key: 'portrait', photo: PHOTOS.servicePortrait },
  { key: 'events', photo: PHOTOS.serviceEvents },
];

/* ---------- Featured work grid ---------- */
export interface FeaturedItem {
  photo: Photo;
  category: PhotoCategory; // i18n: categories.<category>
  size: 'tall' | 'wide' | 'regular';
}

export const HOME_FEATURED: readonly FeaturedItem[] = [
  { photo: PHOTOS.featuredCouple, category: 'wedding', size: 'tall' },
  { photo: PHOTOS.featuredHenna, category: 'wedding', size: 'wide' },
  { photo: PHOTOS.featuredBride, category: 'portrait', size: 'tall' },
  { photo: PHOTOS.featuredBaby, category: 'baby', size: 'regular' },
  { photo: PHOTOS.featuredHands, category: 'couple', size: 'regular' },
  { photo: PHOTOS.featuredBaby2, category: 'baby', size: 'regular' },
];

/* ---------- Process ---------- */
export const PROCESS_STEPS = ['enquire', 'plan', 'shoot', 'deliver'] as const; // i18n: home.process.steps.<key>

/* ---------- Reviews ----------
 * Add ONLY real client reviews (from Google / Instagram, with permission).
 * The section stays hidden while this list is empty.
 * Example:
 *   { name: 'Priya & Karthik', event: 'Wedding, Madurai', text: '…' },
 */
export interface Review {
  name: string;
  event: string;
  text: string;
}

export const REVIEWS: readonly Review[] = [];
