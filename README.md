# Little Creative — Photography Website (Pitch Demo)

Angular 19 site for **Little Creative**, Madurai (Instagram: @little___creative).
English + Tamil, dark cinematic theme, camera-style animations.

## Run it

```bash
npm install
npm start          # opens on http://localhost:4200
```

Production build:

```bash
npm run build      # output: dist/little-creative/browser
```

Requires Node.js 18.19+ (or 20+). Angular CLI is installed locally by `npm install`.

## Where things live

| What | File |
|---|---|
| Brand name, phone, WhatsApp, Instagram, locations | `src/app/core/data/site.config.ts` |
| **All photos** (swap stock photos for real ones) | `src/app/core/data/images.ts` |
| Home slides, services preview, reviews | `src/app/core/data/home.data.ts` |
| Service details, sample packages, prices, FAQ | `src/app/core/data/services.data.ts` |
| English text | `public/i18n/en.json` |
| Tamil text | `public/i18n/ta.json` |
| Colours, fonts, global animation | `src/styles.scss` |

## Swapping in the client's photos

1. Copy photos into `public/photos/` (e.g. `public/photos/wedding-01.jpg`).
2. In `src/app/core/data/images.ts`, change a `src` to `'/photos/wedding-01.jpg'` and update its `alt` text.
3. For gallery photos also update `ratio` (width ÷ height: portrait ≈ 0.67, landscape ≈ 1.5).

Current images are free-licence Unsplash stock photos used as placeholders.

## Before going live

- Packages in `services.data.ts` are **samples** — replace with real packages; set `price` to show a price.
- Add real client reviews to `REVIEWS` in `home.data.ts` (the section stays hidden while empty).
- Have a fluent Tamil reader review `public/i18n/ta.json`.
