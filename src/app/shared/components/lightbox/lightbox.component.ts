import {
  Component,
  ElementRef,
  computed,
  effect,
  inject,
  input,
  model,
  signal,
  untracked,
  viewChild,
} from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { TranslatePipe } from '@ngx-translate/core';

import { GalleryPhoto, photoUrl } from '../../../core/data/images';

/**
 * Full-screen photo viewer.
 * - index = null → closed; a number → open at that photo (two-way: [(index)])
 * - Keyboard: ← → Esc, Tab stays inside
 * - Swipe left/right on touch screens
 * - Camera "flash" on open, film-strip thumbnails, neighbour preloading
 */
@Component({
  selector: 'app-lightbox',
  imports: [TranslatePipe],
  templateUrl: './lightbox.component.html',
  styleUrl: './lightbox.component.scss',
  host: {
    '(document:keydown)': 'onKey($event)',
  },
})
export class LightboxComponent {
  readonly items = input.required<readonly GalleryPhoto[]>();
  readonly index = model<number | null>(null);

  protected readonly isOpen = computed(() => this.index() !== null);
  protected readonly current = computed(() => {
    const i = this.index();
    return i === null ? null : (this.items()[i] ?? null);
  });
  protected readonly loaded = signal(false);
  protected readonly direction = signal<'next' | 'prev'>('next');

  private readonly document = inject(DOCUMENT);
  private readonly dialog = viewChild<ElementRef<HTMLElement>>('dialog');
  private readonly closeBtn = viewChild<ElementRef<HTMLButtonElement>>('closeBtn');
  private readonly strip = viewChild<ElementRef<HTMLElement>>('strip');

  private lastFocus: HTMLElement | null = null;
  private pointerX: number | null = null;
  private swiped = false;

  constructor() {
    // Open / close side-effects: scroll lock + focus management
    effect(() => {
      const open = this.isOpen();
      untracked(() => {
        this.document.body.classList.toggle('no-scroll', open);
        if (open) {
          this.lastFocus ??= this.document.activeElement as HTMLElement | null;
          setTimeout(() => this.closeBtn()?.nativeElement.focus(), 60);
        } else if (this.lastFocus) {
          this.lastFocus.focus();
          this.lastFocus = null;
        }
      });
    });

    // Each photo change: reset loading state, preload neighbours, centre thumbnail
    effect(() => {
      const i = this.index();
      if (i === null) {
        return;
      }
      untracked(() => {
        this.loaded.set(false);
        this.preload(i + 1);
        this.preload(i - 1);
        setTimeout(() => {
          const strip = this.strip()?.nativeElement;
          const thumb = strip?.querySelector<HTMLElement>(`[data-i="${i}"]`);
          thumb?.scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'nearest' });
        });
      });
    });
  }

  protected src(item: GalleryPhoto, width = 2000): string {
    return photoUrl(item.photo.src, width);
  }

  protected pad(n: number): string {
    return String(n).padStart(2, '0');
  }

  close(): void {
    this.index.set(null);
  }

  next(): void {
    const i = this.index();
    if (i === null) return;
    this.direction.set('next');
    this.index.set((i + 1) % this.items().length);
  }

  prev(): void {
    const i = this.index();
    if (i === null) return;
    this.direction.set('prev');
    this.index.set((i - 1 + this.items().length) % this.items().length);
  }

  goTo(i: number): void {
    const cur = this.index() ?? 0;
    this.direction.set(i >= cur ? 'next' : 'prev');
    this.index.set(i);
  }

  onKey(event: KeyboardEvent): void {
    if (!this.isOpen()) return;

    switch (event.key) {
      case 'Escape':
        this.close();
        break;
      case 'ArrowRight':
        this.next();
        break;
      case 'ArrowLeft':
        this.prev();
        break;
      case 'Tab':
        this.trapFocus(event);
        break;
    }
  }

  onPointerDown(event: PointerEvent): void {
    this.pointerX = event.clientX;
    this.swiped = false;
  }

  onPointerUp(event: PointerEvent): void {
    if (this.pointerX === null) return;
    const dx = event.clientX - this.pointerX;
    this.pointerX = null;
    if (Math.abs(dx) > 50) {
      this.swiped = true;
      dx < 0 ? this.next() : this.prev();
    }
  }

  /** Click on empty space (not the photo or a control) closes the viewer */
  onStageClick(event: MouseEvent): void {
    if (this.swiped) {
      this.swiped = false;
      return;
    }
    if ((event.target as HTMLElement).tagName !== 'IMG') {
      this.close();
    }
  }

  private preload(i: number): void {
    const list = this.items();
    const item = list[(i + list.length) % list.length];
    if (item) {
      const img = new Image();
      img.src = this.src(item);
    }
  }

  private trapFocus(event: KeyboardEvent): void {
    const root = this.dialog()?.nativeElement;
    if (!root) return;
    const focusable = Array.from(root.querySelectorAll<HTMLElement>('button:not([tabindex="-1"])'));
    if (!focusable.length) return;

    const first = focusable[0];
    const last = focusable[focusable.length - 1];
    const active = this.document.activeElement;

    if (event.shiftKey && active === first) {
      event.preventDefault();
      last.focus();
    } else if (!event.shiftKey && active === last) {
      event.preventDefault();
      first.focus();
    }
  }
}
