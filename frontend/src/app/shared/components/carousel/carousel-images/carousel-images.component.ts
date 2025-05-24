import { CommonModule, isPlatformBrowser } from '@angular/common';
import {
  Component,
  inject,
  Input,
  OnDestroy,
  OnInit,
  PLATFORM_ID,
} from '@angular/core';

@Component({
  selector: 'app-carousel-images',
  imports: [CommonModule],
  templateUrl: './carousel-images.component.html',
  styleUrl: './carousel-images.component.scss',
})
export class CarouselImagesComponent implements OnInit, OnDestroy {
  @Input() images: string[] = [];
  @Input() interval: number = 5000;

  currentIndex = 0;
  intervalId: any;
  private platformId = inject(PLATFORM_ID);
  private isBrowser = isPlatformBrowser(this.platformId);

  ngOnInit() {
    if (this.isBrowser) this.startAutoplay();
  }

  ngOnDestroy() {
    if (this.isBrowser) {
      clearInterval(this.intervalId);
    }
  }

  startAutoplay() {
    this.intervalId = setInterval(() => this.next(), this.interval);
  }

  stopAutoplay() {
    clearInterval(this.intervalId);
  }

  next() {
    this.currentIndex = (this.currentIndex + 1) % this.images.length;
  }

  prev() {
    this.currentIndex =
      (this.currentIndex - 1 + this.images.length) % this.images.length;
  }

  setSlide(index: number) {
    this.currentIndex = index;
  }
}
