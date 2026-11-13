import { Injectable, inject, signal } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { TranslateService } from '@ngx-translate/core';
import { Observable } from 'rxjs';

export type AppLang = 'en' | 'ta';

const STORAGE_KEY = 'lc-lang';
const SUPPORTED: readonly AppLang[] = ['en', 'ta'];

@Injectable({ providedIn: 'root' })
export class LanguageService {
  private readonly translate = inject(TranslateService);
  private readonly document = inject(DOCUMENT);

  /** Current language — read it in templates with lang.current() */
  readonly current = signal<AppLang>('en');

  /** Called once by provideAppInitializer in app.config.ts */
  init(): Observable<unknown> {
    this.translate.addLangs([...SUPPORTED]);
    this.translate.setDefaultLang('en');
    return this.use(this.readStored() ?? 'en');
  }

  use(lang: AppLang): Observable<unknown> {
    this.current.set(lang);

    const html = this.document.documentElement;
    html.lang = lang;
    html.classList.toggle('lang-ta', lang === 'ta');

    try {
      localStorage.setItem(STORAGE_KEY, lang);
    } catch {
      /* storage unavailable (private mode) — ignore */
    }

    return this.translate.use(lang);
  }

  toggle(): void {
    this.use(this.current() === 'en' ? 'ta' : 'en').subscribe();
  }

  private readStored(): AppLang | null {
    try {
      const value = localStorage.getItem(STORAGE_KEY);
      return SUPPORTED.includes(value as AppLang) ? (value as AppLang) : null;
    } catch {
      return null;
    }
  }
}
