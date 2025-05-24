import { CommonModule, isPlatformBrowser } from '@angular/common';
import {
  Component,
  Input,
  OnInit,
  OnDestroy,
  inject,
  PLATFORM_ID,
} from '@angular/core';
import { Testimonial } from '../../../../core/interfaces/testimonial';

@Component({
  selector: 'app-carousel-rating',
  imports: [CommonModule],
  templateUrl: './carousel-rating.component.html',
  styleUrl: './carousel-rating.component.scss',
})
export class CarouselRatingComponent implements OnInit, OnDestroy {
  @Input() items: Testimonial[] = [];

  currentIndex = 0;
  intervalId: any;
  private platformId = inject(PLATFORM_ID);
  private isBrowser = isPlatformBrowser(this.platformId);

  ngOnInit() {
    if (this.isBrowser) this.startAutoplay();
  }

  ngOnDestroy() {
    if (this.isBrowser) clearInterval(this.intervalId);
  }

  startAutoplay() {
    this.intervalId = setInterval(() => {
      this.next();
    }, 5000);
  }

  next() {
    this.currentIndex = (this.currentIndex + 1) % this.items.length;
  }

  prev() {
    this.currentIndex =
      (this.currentIndex - 1 + this.items.length) % this.items.length;
  }
  getFullStars(rating?: number): number[] {
    return Array(Math.floor(rating ?? 0));
  }

  hasHalfStar(rating?: number): boolean {
    return (rating ?? 0) % 1 >= 0.5;
  }
}
