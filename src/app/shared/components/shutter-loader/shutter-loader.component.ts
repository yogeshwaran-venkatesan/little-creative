import { Component, OnInit, inject, signal } from '@angular/core';
import { DOCUMENT } from '@angular/common';

const SESSION_KEY = 'lc-intro-seen';
const DRAW_MS = 1500; // aperture draws + brand fades in
const OPEN_MS = 1100; // shutter curtains open

/**
 * Camera-shutter intro: an aperture iris draws and turns, the brand appears,
 * then two curtains slide apart to reveal the site.
 * Plays once per browser session; skipped for reduced-motion users.
 */
@Component({
  selector: 'app-shutter-loader',
  template: `
    @if (show()) {
      <div class="loader" [class.opening]="opening()" aria-hidden="true">
        <div class="curtain top"></div>
        <div class="curtain bottom"></div>

        <div class="center">
          <svg class="aperture" viewBox="0 0 100 100">
            <circle class="ring" cx="50" cy="50" r="44" />
            <g class="blades">
              @for (angle of blades; track angle) {
                <path [attr.transform]="'rotate(' + angle + ' 50 50)'" d="M50 6 L72 44" />
              }
            </g>
          </svg>
          <p class="brand"><em>Little</em> <span>Creative</span></p>
        </div>
      </div>
    }
  `,
  styles: `
    :host {
      display: contents;
    }

    .loader {
      position: fixed;
      inset: 0;
      z-index: 10000;
      display: grid;
      place-items: center;
      pointer-events: all;
    }

    .curtain {
      position: absolute;
      left: 0;
      right: 0;
      height: 50.5%;
      background: #0a0806;
      transition: transform 1.1s cubic-bezier(0.77, 0, 0.18, 1);
    }

    .curtain.top {
      top: 0;
    }

    .curtain.bottom {
      bottom: 0;
    }

    .opening .curtain.top {
      transform: translateY(-100%);
    }

    .opening .curtain.bottom {
      transform: translateY(100%);
    }

    .center {
      position: relative;
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 22px;
      transition:
        opacity 0.5s ease,
        transform 0.9s cubic-bezier(0.22, 1, 0.36, 1);
    }

    .opening .center {
      opacity: 0;
      transform: scale(1.3);
    }

    .aperture {
      width: 86px;
      height: 86px;
      fill: none;
      stroke: #c9a26b;
      stroke-width: 1.6;
      stroke-linecap: round;
      animation: turn 1.6s cubic-bezier(0.65, 0, 0.35, 1) both;
    }

    .ring {
      stroke-dasharray: 277;
      stroke-dashoffset: 277;
      animation: draw 1s cubic-bezier(0.65, 0, 0.35, 1) forwards;
    }

    .blades path {
      stroke-dasharray: 45;
      stroke-dashoffset: 45;
      animation: draw 0.7s cubic-bezier(0.65, 0, 0.35, 1) 0.45s forwards;
    }

    @keyframes draw {
      to {
        stroke-dashoffset: 0;
      }
    }

    @keyframes turn {
      from {
        transform: rotate(-90deg);
      }
      to {
        transform: rotate(0deg);
      }
    }

    .brand {
      display: flex;
      align-items: baseline;
      gap: 10px;
      margin: 0;
      color: #f2ebe1;
      animation: brand-in 1s cubic-bezier(0.22, 1, 0.36, 1) 0.6s both;
    }

    .brand em {
      font-family: 'Cormorant Garamond', Georgia, serif;
      font-size: 34px;
      color: #e3c796;
    }

    .brand span {
      font-family: 'Manrope', sans-serif;
      font-size: 13px;
      letter-spacing: 0.42em;
      text-transform: uppercase;
    }

    @keyframes brand-in {
      from {
        opacity: 0;
        letter-spacing: 0.2em;
        transform: translateY(10px);
      }
    }
  `,
})
export class ShutterLoaderComponent implements OnInit {
  protected readonly blades = [0, 60, 120, 180, 240, 300];
  protected readonly show = signal(false);
  protected readonly opening = signal(false);

  private readonly document = inject(DOCUMENT);

  ngOnInit(): void {
    const win = this.document.defaultView;
    if (!win) return;

    const reduced = win.matchMedia?.('(prefers-reduced-motion: reduce)').matches;
    if (reduced || this.seen()) return;

    this.show.set(true);
    this.document.body.classList.add('no-scroll');

    setTimeout(() => this.opening.set(true), DRAW_MS);
    setTimeout(() => {
      this.show.set(false);
      this.document.body.classList.remove('no-scroll');
      this.markSeen();
    }, DRAW_MS + OPEN_MS);
  }

  private seen(): boolean {
    try {
      return sessionStorage.getItem(SESSION_KEY) === '1';
    } catch {
      return false;
    }
  }

  private markSeen(): void {
    try {
      sessionStorage.setItem(SESSION_KEY, '1');
    } catch {
      /* ignore */
    }
  }
}
