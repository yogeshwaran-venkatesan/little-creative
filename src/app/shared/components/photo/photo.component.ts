import { Component, computed, input, signal } from '@angular/core';
import { Photo, photoSrcset, photoUrl } from '../../../core/data/images';

/**
 * Responsive, lazy-loaded photo that fades in once loaded.
 * Fills its host — size the host (width/height/aspect-ratio) from the parent.
 *
 * <app-photo [photo]="photos.heroWedding" sizes="100vw" [eager]="true" />
 */
@Component({
  selector: 'app-photo',
  template: `
    <img
      [src]="url()"
      [attr.srcset]="srcset()"
      [attr.sizes]="sizes()"
      [alt]="photo().alt"
      [attr.loading]="eager() ? 'eager' : 'lazy'"
      [attr.fetchpriority]="eager() ? 'high' : null"
      decoding="async"
      [class.loaded]="loaded()"
      (load)="loaded.set(true)"
    />
  `,
  styles: `
    :host {
      display: block;
      position: relative;
      overflow: hidden;
      background: var(--surface);
    }

    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      opacity: 0;
      transition: opacity 1s var(--ease);
    }

    img.loaded {
      opacity: 1;
    }
  `,
})
export class PhotoComponent {
  readonly photo = input.required<Photo>();
  /** Matches the rendered width so the browser picks the right file */
  readonly sizes = input<string>('100vw');
  /** true for above-the-fold images (hero) */
  readonly eager = input<boolean>(false);
  /** Fallback width for src */
  readonly width = input<number>(1600);

  protected readonly loaded = signal(false);
  protected readonly url = computed(() => photoUrl(this.photo().src, this.width()));
  protected readonly srcset = computed(() => photoSrcset(this.photo().src));
}
