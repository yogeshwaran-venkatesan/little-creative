import {
  AfterViewInit,
  Component,
  ElementRef,
  NgZone,
  OnDestroy,
  inject,
  signal,
  viewChild,
} from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { TranslatePipe } from '@ngx-translate/core';

/**
 * A soft gold "lens" that follows the mouse and grows over any element
 * marked with data-cursor="view" (or "drag", "explore").
 * The label is translated from cursor.<value>.
 * Desktop only (fine pointer + hover). Off for reduced-motion users.
 * Runs outside Angular change detection for 60fps smoothness.
 */
@Component({
  selector: 'app-cursor',
  imports: [TranslatePipe],
  template: `
    <div #lens class="lens" [class.on]="label() !== null" aria-hidden="true">
      <div class="lens-inner">
        <span class="lens-label">{{ label() ? ('cursor.' + label() | translate) : '' }}</span>
      </div>
    </div>
  `,
  styles: `
    :host {
      display: contents;
    }

    .lens {
      position: fixed;
      top: 0;
      left: 0;
      z-index: 650;
      width: 96px;
      height: 96px;
      margin: -48px 0 0 -48px;
      pointer-events: none;
      will-change: transform;
    }

    .lens-inner {
      display: grid;
      place-items: center;
      width: 100%;
      height: 100%;
      border-radius: 50%;
      background: rgba(201, 162, 107, 0.92);
      color: #17120c;
      transform: scale(0);
      transition: transform 0.55s var(--ease);
    }

    .lens.on .lens-inner {
      transform: scale(1);
    }

    .lens-label {
      font-size: 11px;
      font-weight: 600;
      letter-spacing: 0.22em;
      text-transform: uppercase;
    }

    :host-context(html.lang-ta) .lens-label {
      font-size: 12px;
      letter-spacing: 0;
      text-transform: none;
    }
  `,
})
export class CursorComponent implements AfterViewInit, OnDestroy {
  protected readonly label = signal<string | null>(null);

  private readonly lens = viewChild.required<ElementRef<HTMLElement>>('lens');
  private readonly zone = inject(NgZone);
  private readonly document = inject(DOCUMENT);

  private target = { x: -200, y: -200 };
  private pos = { x: -200, y: -200 };
  private raf = 0;
  private enabled = false;

  ngAfterViewInit(): void {
    const win = this.document.defaultView;
    if (!win?.matchMedia) return;

    this.enabled =
      win.matchMedia('(hover: hover) and (pointer: fine)').matches &&
      !win.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (!this.enabled) return;

    this.zone.runOutsideAngular(() => {
      this.document.addEventListener('pointermove', this.onMove, { passive: true });
      this.document.addEventListener('pointerover', this.onOver, { passive: true });
      this.document.documentElement.addEventListener('mouseleave', this.onLeave);
      this.loop();
    });
  }

  ngOnDestroy(): void {
    if (!this.enabled) return;
    cancelAnimationFrame(this.raf);
    this.document.removeEventListener('pointermove', this.onMove);
    this.document.removeEventListener('pointerover', this.onOver);
    this.document.documentElement.removeEventListener('mouseleave', this.onLeave);
  }

  private readonly onMove = (e: PointerEvent): void => {
    this.target = { x: e.clientX, y: e.clientY };
  };

  private readonly onOver = (e: PointerEvent): void => {
    const el = (e.target as Element | null)?.closest?.('[data-cursor]');
    const value = el?.getAttribute('data-cursor') ?? null;
    if (value !== this.label()) {
      this.zone.run(() => this.label.set(value));
    }
  };

  private readonly onLeave = (): void => {
    this.zone.run(() => this.label.set(null));
  };

  /** Eased follow — the lens trails the pointer slightly, like a lens catching focus */
  private readonly loop = (): void => {
    this.pos.x += (this.target.x - this.pos.x) * 0.18;
    this.pos.y += (this.target.y - this.pos.y) * 0.18;
    this.lens().nativeElement.style.transform = `translate3d(${this.pos.x}px, ${this.pos.y}px, 0)`;
    this.raf = requestAnimationFrame(this.loop);
  };
}
