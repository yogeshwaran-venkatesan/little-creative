import {
  Component,
  DestroyRef,
  ElementRef,
  computed,
  effect,
  inject,
  input,
  signal,
  untracked,
  viewChildren,
} from '@angular/core';
import { Location } from '@angular/common';
import { TranslatePipe, TranslateService } from '@ngx-translate/core';

import { PageHeroComponent } from '../../shared/components/page-hero/page-hero.component';
import { PhotoComponent } from '../../shared/components/photo/photo.component';
import { LightboxComponent } from '../../shared/components/lightbox/lightbox.component';
import { RevealDirective } from '../../core/directives/reveal.directive';
import { CATEGORIES, PHOTOS, PORTFOLIO_PHOTOS, PhotoCategory } from '../../core/data/images';
import { SITE } from '../../core/data/site.config';

type Filter = 'all' | PhotoCategory;

const FILTERS: readonly Filter[] = ['all', ...CATEGORIES];

function isFilter(value: unknown): value is Filter {
  return typeof value === 'string' && (FILTERS as readonly string[]).includes(value);
}

@Component({
  selector: 'app-portfolio',
  imports: [TranslatePipe, PageHeroComponent, PhotoComponent, LightboxComponent, RevealDirective],
  templateUrl: './portfolio.component.html',
  styleUrl: './portfolio.component.scss',
  host: {
    '(window:resize)': 'measureIndicator()',
  },
})
export class PortfolioComponent {
  /** Bound from ?category=… (withComponentInputBinding in app.config) */
  readonly category = input<string>();

  protected readonly site = SITE;
  protected readonly banner = PHOTOS.bannerPortfolio;
  protected readonly filters = FILTERS;

  protected readonly active = signal<Filter>('all');
  protected readonly lightboxIndex = signal<number | null>(null);
  protected readonly indicator = signal({ left: 0, width: 0 });

  protected readonly visible = computed(() => {
    const f = this.active();
    return f === 'all' ? PORTFOLIO_PHOTOS : PORTFOLIO_PHOTOS.filter((p) => p.category === f);
  });

  protected readonly counts: Record<Filter, number> = FILTERS.reduce(
    (acc, f) => {
      acc[f] = f === 'all' ? PORTFOLIO_PHOTOS.length : PORTFOLIO_PHOTOS.filter((p) => p.category === f).length;
      return acc;
    },
    {} as Record<Filter, number>,
  );

  private readonly location = inject(Location);
  private readonly filterButtons = viewChildren<ElementRef<HTMLButtonElement>>('filterBtn');

  constructor() {
    // Sync filter from the URL (e.g. links from the Home page)
    effect(() => {
      const c = this.category();
      untracked(() => this.active.set(isFilter(c) ? c : 'all'));
    });

    // Move the gold pill under the active filter
    effect(() => {
      this.active();
      this.filterButtons();
      untracked(() => setTimeout(() => this.measureIndicator()));
    });

    // Tamil labels are wider — re-measure after a language switch
    const sub = inject(TranslateService).onLangChange.subscribe(() =>
      setTimeout(() => this.measureIndicator(), 50),
    );
    inject(DestroyRef).onDestroy(() => sub.unsubscribe());
  }

  select(filter: Filter): void {
    if (filter === this.active()) return;
    this.active.set(filter);
    this.lightboxIndex.set(null);
    // Update the URL without a router navigation (keeps the page still)
    this.location.replaceState('/portfolio', filter === 'all' ? '' : `category=${filter}`);
  }

  open(index: number): void {
    this.lightboxIndex.set(index);
  }

  measureIndicator(): void {
    const index = this.filters.indexOf(this.active());
    const btn = this.filterButtons()[index]?.nativeElement;
    if (btn) {
      this.indicator.set({ left: btn.offsetLeft, width: btn.offsetWidth });
      btn.scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'nearest' });
    }
  }

  protected pad(n: number): string {
    return String(n).padStart(2, '0');
  }
}
