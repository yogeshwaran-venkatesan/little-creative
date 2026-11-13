/**
 * ============================================================
 *  ALL SITE PHOTOS LIVE HERE — replace these later.
 * ============================================================
 * Current images are free-licence stock photos from Unsplash
 * (https://unsplash.com/license), used as placeholders for the pitch.
 *
 * To use the client's own photos:
 *   1. Put the files in  /public/photos/  (e.g. public/photos/hero-1.jpg)
 *   2. Change src to '/photos/hero-1.jpg'
 *   3. Update the alt text
 * Local files skip the Unsplash resizing params automatically.
 */

const UNSPLASH = 'https://images.unsplash.com/';
const u = (id: string): string => UNSPLASH + id;

export type PhotoCategory = 'wedding' | 'couple' | 'baby' | 'family' | 'portrait' | 'events';

export interface Photo {
  src: string;
  alt: string;
}

/** Sized URL — Unsplash images get resize params, local files are returned as-is */
export function photoUrl(src: string, width = 1600): string {
  if (!src.startsWith(UNSPLASH)) {
    return src;
  }
  return `${src}?auto=format&fit=crop&w=${width}&q=80`;
}

/** Responsive srcset for Unsplash images (null for local files) */
export function photoSrcset(src: string, widths: number[] = [480, 800, 1200, 1600, 2000]): string | null {
  if (!src.startsWith(UNSPLASH)) {
    return null;
  }
  return widths.map((w) => `${photoUrl(src, w)} ${w}w`).join(', ');
}

export const PHOTOS = {
  /* ---------- Home: hero slider ---------- */
  heroWedding: { src: u('photo-1764286954620-28029fbae9b6'), alt: 'Bride and groom at a traditional Indian wedding' },
  heroCouple: { src: u('photo-1615966650071-855b15f29ad1'), alt: 'Couple silhouetted on a beach at golden hour' },
  heroFamily: { src: u('photo-1780980301761-f6e0fa6f0bdf'), alt: 'Happy family of four sitting together outdoors' },

  /* ---------- Home: intro ---------- */
  introMain: { src: u('photo-1722952934708-749c22eb2e58'), alt: 'Bride and groom posing together' },
  introDetail: { src: u('photo-1686865604150-43f95d61416c'), alt: 'Close-up of a bride’s henna-decorated hands' },

  /* ---------- Home: services ---------- */
  serviceWedding: { src: u('photo-1630526720753-aa4e71acf67d'), alt: 'Couple in traditional Indian wedding attire' },
  serviceCouple: { src: u('photo-1774814319627-6b105a4dbf03'), alt: 'Couple sitting on a boat at sunset' },
  serviceBaby: { src: u('photo-1630305131239-c8df91783f10'), alt: 'Baby with dark hair looking upward' },
  serviceFamily: { src: u('photo-1770871821382-60ea99b0a941'), alt: 'Family running together in a sunlit garden' },
  servicePortrait: { src: u('photo-1610173827043-9db50e0d8ef9'), alt: 'Woman in a red bridal outfit' },
  serviceEvents: { src: u('photo-1668432747162-5e7ded79e498'), alt: 'Guests gathered at a celebration' },

  /* ---------- Home: featured work ---------- */
  featuredCouple: { src: u('photo-1779475559689-a19f9c339352'), alt: 'Smiling couple in traditional wedding attire' },
  featuredHenna: { src: u('photo-1621801306185-8c0ccf9c8eb8'), alt: 'Hands with intricate henna patterns' },
  featuredBride: { src: u('photo-1600685890506-593fdf55949b'), alt: 'Bride in traditional red attire' },
  featuredBaby: { src: u('photo-1780329930345-19a7f25e5fc6'), alt: 'Baby cradled in loving hands' },
  featuredHands: { src: u('photo-1654156577076-e0350ba86cc1'), alt: 'Couple holding hands' },
  featuredBaby2: { src: u('photo-1780329939164-cc0e146f833d'), alt: 'Baby with wide curious eyes' },

  /* ---------- Home: quote band ---------- */
  quoteBand: { src: u('photo-1591969851586-adbbd4accf81'), alt: 'Couple embracing against a bright sky' },

  /* ---------- Page banners ---------- */
  bannerPortfolio: { src: u('photo-1769500811478-f7d0f896d1a2'), alt: 'Woman in traditional attire with arms outstretched' },
  bannerServices: { src: u('photo-1490723186985-6d7672633c86'), alt: 'Man kissing his partner’s forehead' },
  bannerAbout: { src: u('photo-1529180979161-06b8b6d6f2be'), alt: 'Family silhouette holding hands at sunset' },
  bannerContact: { src: u('photo-1769500809146-953b80aaa98e'), alt: 'Bride in traditional attire' },

  /* ---------- About page ---------- */
  aboutStory: { src: u('photo-1599462616558-2b75fd26a283'), alt: 'Groom in a white sherwani kissing his bride' },
  aboutStoryDetail: { src: u('photo-1617627143750-d86bc21e42bb'), alt: 'Woman in a pink and orange sari with gold jewellery' },
} satisfies Record<string, Photo>;

/* =========================================================
   PORTFOLIO GALLERY
   ratio = width / height of the photo (keeps the layout stable while loading).
   When you swap in the client's photos, update ratio too
   (portrait ≈ 0.67, square = 1, landscape ≈ 1.5).
   ========================================================= */
export const CATEGORIES: readonly PhotoCategory[] = ['wedding', 'couple', 'baby', 'family', 'portrait', 'events'];

export interface GalleryPhoto {
  photo: Photo;
  category: PhotoCategory;
  ratio: number;
}

const g = (id: string, category: PhotoCategory, ratio: number, alt: string): GalleryPhoto => ({
  photo: { src: u(id), alt },
  category,
  ratio,
});

export const PORTFOLIO_PHOTOS: readonly GalleryPhoto[] = [
  g('photo-1764286954620-28029fbae9b6', 'wedding', 1.5, 'Bride and groom at a traditional Indian wedding'),
  g('photo-1774814319627-6b105a4dbf03', 'couple', 0.75, 'Couple sitting on a boat at sunset'),
  g('photo-1780329939164-cc0e146f833d', 'baby', 0.667, 'Baby with wide curious eyes'),
  g('photo-1770871821382-60ea99b0a941', 'family', 0.667, 'Family running together in a sunlit garden'),
  g('photo-1610173827043-9db50e0d8ef9', 'portrait', 0.667, 'Woman in a red bridal outfit'),
  g('photo-1514178703120-3fa66528901d', 'events', 0.609, 'Women showing their mehndi designs'),

  g('photo-1630526720753-aa4e71acf67d', 'wedding', 0.667, 'Couple in traditional Indian wedding attire'),
  g('photo-1615966650071-855b15f29ad1', 'couple', 1.667, 'Couple silhouetted on a beach at golden hour'),
  g('photo-1780329904651-1df56b304c0d', 'baby', 1.5, 'Baby looking up with curious eyes'),
  g('photo-1543342384-1f1350e27861', 'family', 0.667, 'Mother holding her baby beside a smiling father'),
  g('photo-1617627143750-d86bc21e42bb', 'portrait', 0.667, 'Woman in a pink and orange sari with gold jewellery'),
  g('photo-1668432747162-5e7ded79e498', 'events', 1.5, 'Guests gathered at a celebration'),

  g('photo-1779475559689-a19f9c339352', 'wedding', 0.667, 'Smiling couple in traditional wedding attire'),
  g('photo-1774814328175-86c1ed4949e6', 'couple', 0.75, 'Smiling couple outdoors in traditional attire'),
  g('photo-1630305131239-c8df91783f10', 'baby', 0.667, 'Baby with dark hair looking upward'),
  g('photo-1780980301761-f6e0fa6f0bdf', 'family', 1.5, 'Happy family of four sitting together outdoors'),
  g('photo-1610047614301-13c63f00c032', 'portrait', 0.667, 'Woman in a red and gold sari'),
  g('photo-1645856052484-2e5506e20942', 'events', 1.5, 'Group dressed in yellow and orange at a celebration'),

  g('photo-1722952934708-749c22eb2e58', 'wedding', 0.667, 'Bride and groom posing together'),
  g('photo-1617376431454-8195cf1fd668', 'couple', 0.667, 'Groom hugging his bride'),
  g('photo-1604917621956-10dfa7cce2e7', 'baby', 0.624, 'Newborn in a white knit cap'),
  g('photo-1589169011402-8b2cbd1ee593', 'family', 1.587, 'Mother holding a laughing child'),
  g('photo-1654764746225-e63f5e90facd', 'portrait', 0.667, 'Bride in a red and gold outfit'),
  g('photo-1686865604150-43f95d61416c', 'events', 1.5, 'Close-up of henna-decorated hands'),

  g('photo-1769500809146-953b80aaa98e', 'wedding', 1.5, 'Bride in traditional attire'),
  g('photo-1490723186985-6d7672633c86', 'couple', 1.5, 'Man kissing his partner’s forehead'),
  g('photo-1780329930345-19a7f25e5fc6', 'baby', 0.667, 'Baby cradled in loving hands'),
  g('photo-1780329944309-08b392306b49', 'family', 1.5, 'Family of five posing against a red wall'),
  g('photo-1536766768598-e09213fdcf22', 'portrait', 0.668, 'Portrait of a woman'),
  g('photo-1711301633355-d10a31380c44', 'events', 1.5, 'Crowd under a colourful canopy'),

  g('photo-1599462616558-2b75fd26a283', 'wedding', 0.518, 'Groom in a white sherwani kissing his bride'),
  g('photo-1591969851586-adbbd4accf81', 'couple', 0.667, 'Couple embracing against a bright sky'),
  g('photo-1775113512546-45d138822aaf', 'baby', 0.667, 'Baby in a white outfit sticking out its tongue'),
  g('photo-1529180979161-06b8b6d6f2be', 'family', 1.5, 'Family silhouette holding hands at sunset'),
  g('photo-1684868268327-7e5590bcfbd6', 'portrait', 0.667, 'Woman in a red and gold bridal outfit'),
  g('photo-1621801306185-8c0ccf9c8eb8', 'wedding', 1.5, 'Hands with intricate henna patterns'),
];
