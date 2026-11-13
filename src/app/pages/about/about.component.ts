import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { TranslatePipe } from '@ngx-translate/core';

import { PageHeroComponent } from '../../shared/components/page-hero/page-hero.component';
import { PhotoComponent } from '../../shared/components/photo/photo.component';
import { RevealDirective } from '../../core/directives/reveal.directive';
import { PHOTOS, PORTFOLIO_PHOTOS } from '../../core/data/images';
import { SHOOT_LOCATIONS } from '../../core/data/site.config';

@Component({
  selector: 'app-about',
  imports: [RouterLink, TranslatePipe, PageHeroComponent, PhotoComponent, RevealDirective],
  templateUrl: './about.component.html',
  styleUrl: './about.component.scss',
})
export class AboutComponent {
  protected readonly banner = PHOTOS.bannerAbout;
  protected readonly story = PHOTOS.aboutStory;
  protected readonly storyDetail = PHOTOS.aboutStoryDetail;
  protected readonly locations = SHOOT_LOCATIONS;

  /** "At a glance" camera-info card — i18n: about.glance.<key>.label / .value */
  protected readonly glance = ['base', 'specialty', 'coverage', 'travel'] as const;

  /** Approach cards — i18n: about.values.items.<key>.title / .text */
  protected readonly values = ['natural', 'light', 'care'] as const;

  /** Film strip: 12 photos, doubled for a seamless loop */
  private readonly strip = PORTFOLIO_PHOTOS.slice(0, 12);
  protected readonly filmStrip = [...this.strip, ...this.strip];

  protected pad(n: number): string {
    return String(n).padStart(2, '0');
  }
}
