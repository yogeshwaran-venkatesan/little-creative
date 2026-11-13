import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TranslatePipe } from '@ngx-translate/core';

import { HeaderComponent } from './shared/components/header/header.component';
import { FooterComponent } from './shared/components/footer/footer.component';
import { ShutterLoaderComponent } from './shared/components/shutter-loader/shutter-loader.component';
import { CursorComponent } from './shared/components/cursor/cursor.component';
import { SITE } from './core/data/site.config';

@Component({
  selector: 'app-root',
  imports: [
    RouterOutlet,
    TranslatePipe,
    HeaderComponent,
    FooterComponent,
    ShutterLoaderComponent,
    CursorComponent,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  protected readonly site = SITE;
}
