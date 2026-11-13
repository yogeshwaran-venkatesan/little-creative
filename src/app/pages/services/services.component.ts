import { Component, inject, signal } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { RouterLink } from '@angular/router';
import { TranslatePipe } from '@ngx-translate/core';

import { PageHeroComponent } from '../../shared/components/page-hero/page-hero.component';
import { PhotoComponent } from '../../shared/components/photo/photo.component';
import { RevealDirective } from '../../core/directives/reveal.directive';
import { PHOTOS } from '../../core/data/images';
import { FAQ_KEYS, PACKAGES, SERVICE_DETAILS } from '../../core/data/services.data';

@Component({
  selector: 'app-services',
  imports: [RouterLink, TranslatePipe, PageHeroComponent, PhotoComponent, RevealDirective],
  templateUrl: './services.component.html',
  styleUrl: './services.component.scss',
})
export class ServicesComponent {
  protected readonly banner = PHOTOS.bannerServices;
  protected readonly services = SERVICE_DETAILS;
  protected readonly packages = PACKAGES;
  protected readonly faqs = FAQ_KEYS;

  /** Index of the open FAQ (one at a time) */
  protected readonly openFaq = signal<number | null>(0);

  private readonly document = inject(DOCUMENT);

  scrollTo(id: string): void {
    this.document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }

  toggleFaq(i: number): void {
    this.openFaq.update((cur) => (cur === i ? null : i));
  }

  protected pad(n: number): string {
    return String(n).padStart(2, '0');
  }
}
