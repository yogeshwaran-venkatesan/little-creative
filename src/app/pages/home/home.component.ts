import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { TranslatePipe } from '@ngx-translate/core';

import { HeroSliderComponent } from './components/hero-slider/hero-slider.component';
import { PhotoComponent } from '../../shared/components/photo/photo.component';
import { RevealDirective } from '../../core/directives/reveal.directive';
import { PHOTOS } from '../../core/data/images';
import { SHOOT_LOCATIONS, SITE } from '../../core/data/site.config';
import { HOME_FEATURED, HOME_SERVICES, PROCESS_STEPS, REVIEWS } from '../../core/data/home.data';

@Component({
  selector: 'app-home',
  imports: [RouterLink, TranslatePipe, HeroSliderComponent, PhotoComponent, RevealDirective],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {
  protected readonly site = SITE;
  protected readonly photos = PHOTOS;
  protected readonly services = HOME_SERVICES;
  protected readonly featured = HOME_FEATURED;
  protected readonly steps = PROCESS_STEPS;
  protected readonly reviews = REVIEWS;

  /** Doubled so the marquee loops seamlessly */
  protected readonly marquee = [...SHOOT_LOCATIONS, ...SHOOT_LOCATIONS];

  protected pad(n: number): string {
    return String(n).padStart(2, '0');
  }
}
