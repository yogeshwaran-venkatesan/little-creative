import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { TranslatePipe } from '@ngx-translate/core';

import { NAV_LINKS, SHOOT_LOCATIONS, SITE } from '../../../core/data/site.config';
import { RevealDirective } from '../../../core/directives/reveal.directive';

@Component({
  selector: 'app-footer',
  imports: [RouterLink, TranslatePipe, RevealDirective],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.scss',
})
export class FooterComponent {
  protected readonly site = SITE;
  protected readonly links = NAV_LINKS;
  protected readonly locations = SHOOT_LOCATIONS;
  protected readonly year = new Date().getFullYear();
}
