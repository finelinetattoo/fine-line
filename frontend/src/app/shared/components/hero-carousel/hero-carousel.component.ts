import { CommonModule, isPlatformBrowser } from '@angular/common';
import {
  Component,
  OnInit,
  OnDestroy,
  Input,
  inject,
  PLATFORM_ID,
} from '@angular/core';
import { ButtonComponent } from '../../../shared/components/button/button.component';

@Component({
  selector: 'app-hero-carousel',
  templateUrl: './hero-carousel.component.html',
  styleUrl: './hero-carousel.component.scss',
  imports: [CommonModule, ButtonComponent],
})
export class HeroCarouselComponent implements OnInit, OnDestroy {
  @Input() images: string[] = [];
  @Input() title: string = '';
  @Input() subtitle: string = '';
  @Input() paragraph1: string = '';
  @Input() paragraph2: string = '';
  @Input() buttonLabel: string = '';
  @Input() buttonLink: string = '';

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
      this.nextSlide();
    }, 5000);
  }

  nextSlide() {
    this.currentIndex = (this.currentIndex + 1) % this.images.length;
  }

  prevSlide() {
    this.currentIndex =
      (this.currentIndex - 1 + this.images.length) % this.images.length;
  }
}
