import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-carousel-images',
  imports: [CommonModule],
  templateUrl: './carousel-images.component.html',
  styleUrl: './carousel-images.component.scss',
})
export class CarouselImagesComponent implements OnInit {
  @Input() images: string[] = [];
  @Input() interval: number = 5000;

  currentIndex = 0;
  intervalId: any;

  ngOnInit() {
    this.startAutoplay();
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
