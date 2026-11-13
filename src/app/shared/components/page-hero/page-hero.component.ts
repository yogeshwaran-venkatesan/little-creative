import { Component, input } from '@angular/core';
import { TranslatePipe } from '@ngx-translate/core';

import { Photo } from '../../../core/data/images';
import { PhotoComponent } from '../photo/photo.component';

/**
 * Banner at the top of inner pages (Portfolio, Services, About, Contact).
 * All text inputs are i18n keys. titleKey may contain <em>…</em>.
 */
@Component({
  selector: 'app-page-hero',
  imports: [TranslatePipe, PhotoComponent],
  templateUrl: './page-hero.component.html',
  styleUrl: './page-hero.component.scss',
})
export class PageHeroComponent {
  readonly photo = input.required<Photo>();
  readonly eyebrowKey = input.required<string>();
  readonly titleKey = input.required<string>();
  readonly leadKey = input<string>();
}
