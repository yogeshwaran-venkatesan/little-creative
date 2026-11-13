import { Component, effect, inject, input, signal, untracked } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { TranslatePipe, TranslateService } from '@ngx-translate/core';

import { PageHeroComponent } from '../../shared/components/page-hero/page-hero.component';
import { RevealDirective } from '../../core/directives/reveal.directive';
import { CATEGORIES, PHOTOS, PhotoCategory } from '../../core/data/images';
import { SITE } from '../../core/data/site.config';

const WHATSAPP_NUMBER = '919688935048';

/** Accepts 10-digit Indian mobile numbers, with optional +91 / 0 / spaces / dashes */
const MOBILE_PATTERN = /^(?:\+?91[\s-]?|0)?[6-9]\d{4}[\s-]?\d{5}$/;

/**
 * Enquiry form — no backend needed.
 * On submit it builds a tidy message and opens WhatsApp chat with the studio,
 * ready to send. Pre-fills the event type from ?service= or ?package=.
 */
@Component({
  selector: 'app-contact',
  imports: [ReactiveFormsModule, TranslatePipe, PageHeroComponent, RevealDirective],
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.scss',
})
export class ContactComponent {
  /** From links like /contact?service=wedding (Services page) */
  readonly service = input<string>();
  /** From links like /contact?package=signature (Packages) */
  readonly package = input<string>();

  protected readonly site = SITE;
  protected readonly banner = PHOTOS.bannerContact;
  protected readonly categories = CATEGORIES;
  protected readonly today = new Date().toISOString().slice(0, 10);

  protected readonly sent = signal(false);

  private readonly fb = inject(FormBuilder);
  private readonly translate = inject(TranslateService);

  protected readonly form = this.fb.nonNullable.group({
    name: ['', [Validators.required, Validators.minLength(2)]],
    phone: ['', [Validators.required, Validators.pattern(MOBILE_PATTERN)]],
    eventType: ['', Validators.required],
    date: [''],
    location: [''],
    message: [''],
  });

  constructor() {
    effect(() => {
      const service = this.service();
      const pkg = this.package();
      untracked(() => {
        if (service && (CATEGORIES as readonly string[]).includes(service)) {
          this.form.controls.eventType.setValue(service as PhotoCategory);
        }
        if (pkg && !this.form.controls.message.value) {
          const name = this.translate.instant(`services.packages.items.${pkg}.name`);
          this.form.controls.message.setValue(
            this.translate.instant('contact.form.packagePrefill', { name }),
          );
        }
      });
    });
  }

  /** Show an error only after the user has touched the field (or tried to submit) */
  protected showError(field: 'name' | 'phone' | 'eventType'): boolean {
    const c = this.form.controls[field];
    return c.invalid && (c.touched || c.dirty);
  }

  submit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const v = this.form.getRawValue();
    const t = (key: string): string => this.translate.instant(key);

    const lines = [
      t('contact.whatsapp.greeting'),
      '',
      `${t('contact.form.name')}: ${v.name}`,
      `${t('contact.form.phone')}: ${v.phone}`,
      `${t('contact.form.eventType')}: ${t('categories.' + v.eventType)}`,
      v.date ? `${t('contact.form.date')}: ${this.formatDate(v.date)}` : '',
      v.location ? `${t('contact.form.location')}: ${v.location}` : '',
      v.message ? `\n${v.message}` : '',
    ].filter((line, i) => line !== '' || i === 1);

    const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(lines.join('\n'))}`;
    window.open(url, '_blank', 'noopener');
    this.sent.set(true);
  }

  reset(): void {
    this.form.reset();
    this.sent.set(false);
  }

  private formatDate(iso: string): string {
    const [y, m, d] = iso.split('-');
    return `${d}/${m}/${y}`;
  }
}
