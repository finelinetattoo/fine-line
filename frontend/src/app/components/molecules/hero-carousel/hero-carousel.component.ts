import { CommonModule } from '@angular/common';
import { Component, OnInit, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-hero-carousel',
  templateUrl: './hero-carousel.component.html',
  styleUrl: './hero-carousel.component.scss',
  imports: [CommonModule],
})
export class HeroCarouselComponent implements OnInit, OnDestroy {
  images = [
    'assets/images/carousel1.jpeg',
    'assets/images/carousel2.jpeg',
    'assets/images/carousel3.jpeg',
  ];

  currentIndex = 0;
  intervalId: any;

  ngOnInit() {
    this.startAutoplay();
  }

  ngOnDestroy() {
    clearInterval(this.intervalId);
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
