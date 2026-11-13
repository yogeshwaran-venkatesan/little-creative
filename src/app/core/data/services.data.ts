import { PHOTOS, Photo, PhotoCategory } from './images';

/* =========================================================
   SERVICES — one detailed row per category
   i18n: services.items.<key>.title / .text / .features.<f>
   ========================================================= */
export interface ServiceDetail {
  key: PhotoCategory;
  photo: Photo;
  features: readonly string[];
}

export const SERVICE_DETAILS: readonly ServiceDetail[] = [
  { key: 'wedding', photo: PHOTOS.serviceWedding, features: ['f1', 'f2', 'f3'] },
  { key: 'couple', photo: PHOTOS.serviceCouple, features: ['f1', 'f2', 'f3'] },
  { key: 'baby', photo: PHOTOS.serviceBaby, features: ['f1', 'f2', 'f3'] },
  { key: 'family', photo: PHOTOS.serviceFamily, features: ['f1', 'f2', 'f3'] },
  { key: 'portrait', photo: PHOTOS.servicePortrait, features: ['f1', 'f2', 'f3'] },
  { key: 'events', photo: PHOTOS.serviceEvents, features: ['f1', 'f2', 'f3'] },
];

/* =========================================================
   PACKAGES — SAMPLE ONLY for the pitch.
   Replace names / features with the client's real packages.
   Prices show "Price on request" until real rates are added:
   set price: '₹ 25,000' (any string) to display it.
   i18n: services.packages.items.<key>.name / .for / .features.<f>
   ========================================================= */
export interface PackageItem {
  key: 'essential' | 'signature' | 'premium';
  featured: boolean;
  price: string | null;
  features: readonly string[];
}

export const PACKAGES: readonly PackageItem[] = [
  { key: 'essential', featured: false, price: null, features: ['f1', 'f2', 'f3', 'f4'] },
  { key: 'signature', featured: true, price: null, features: ['f1', 'f2', 'f3', 'f4', 'f5'] },
  { key: 'premium', featured: false, price: null, features: ['f1', 'f2', 'f3', 'f4', 'f5', 'f6'] },
];

/* FAQ — i18n: services.faq.items.<key>.q / .a */
export const FAQ_KEYS = ['book', 'travel', 'when', 'prepare'] as const;
