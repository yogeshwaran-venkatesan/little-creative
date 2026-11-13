import { Routes } from '@angular/router';

/**
 * All pages are lazy-loaded.
 * Page components arrive in Batch 2 (home), Batch 3 (portfolio)
 * and Batch 4 (services, about, contact).
 */
export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./pages/home/home.component').then((m) => m.HomeComponent),
    title: 'Little Creative | Photography, Madurai',
  },
  {
    path: 'portfolio',
    loadComponent: () =>
      import('./pages/portfolio/portfolio.component').then((m) => m.PortfolioComponent),
    title: 'Portfolio | Little Creative',
  },
  {
    path: 'services',
    loadComponent: () =>
      import('./pages/services/services.component').then((m) => m.ServicesComponent),
    title: 'Services & Packages | Little Creative',
  },
  {
    path: 'about',
    loadComponent: () => import('./pages/about/about.component').then((m) => m.AboutComponent),
    title: 'About | Little Creative',
  },
  {
    path: 'contact',
    loadComponent: () =>
      import('./pages/contact/contact.component').then((m) => m.ContactComponent),
    title: 'Contact | Little Creative',
  },
  { path: '**', redirectTo: '' },
];
