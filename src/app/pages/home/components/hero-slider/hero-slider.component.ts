import { Component, OnDestroy, OnInit, inject, signal } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { RouterLink } from '@angular/router';
import { TranslatePipe } from '@ngx-translate/core';

import { HERO_SLIDES } from '../../../../core/data/home.data';
import { PhotoComponent } from '../../../../shared/components/photo/photo.component';

const SLIDE_MS = 6500;

@Component({
  selector: 'app-hero-slider',
  imports: [RouterLink, TranslatePipe, PhotoComponent],
  templateUrl: './hero-slider.component.html',
  styleUrl: './hero-slider.component.scss',
  host: {
    '[style.--slide-ms]': 'slideMs + "ms"',
    '(document:visibilitychange)': 'onVisibilityChange()',
    '(keydown.arrowleft)': 'prev()',
    '(keydown.arrowright)': 'next()',
  },
})
export class HeroSliderComponent implements OnInit, OnDestroy {
  protected readonly slides = HERO_SLIDES;
  protected readonly current = signal(0);
  protected readonly slideMs = SLIDE_MS;

  private readonly document = inject(DOCUMENT);
  private timer?: ReturnType<typeof setInterval>;

  ngOnInit(): void {
    this.start();
  }

  ngOnDestroy(): void {
    this.stop();
  }

  go(index: number): void {
    const count = this.slides.length;
    this.current.set((index + count) % count);
    this.start(); // restart the countdown after a manual change
  }

  next(): void {
    this.go(this.current() + 1);
  }

  prev(): void {
    this.go(this.current() - 1);
  }

  scrollDown(): void {
    this.document.getElementById('intro')?.scrollIntoView({ behavior: 'smooth' });
  }

  onVisibilityChange(): void {
    if (this.document.hidden) {
      this.stop();
    } else {
      this.start();
    }
  }

  protected pad(n: number): string {
    return String(n).padStart(2, '0');
  }

  private start(): void {
    this.stop();
    this.timer = setInterval(() => {
      this.current.update((i) => (i + 1) % this.slides.length);
    }, SLIDE_MS);
  }

  private stop(): void {
    if (this.timer) {
      clearInterval(this.timer);
      this.timer = undefined;
    }
  }
}
