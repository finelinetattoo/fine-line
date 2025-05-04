import { CommonModule } from '@angular/common';
import { Component, Input, OnInit, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-carousel-display',
  imports: [CommonModule],
  templateUrl: './carousel-display.component.html',
  styleUrl: './carousel-display.component.scss',
})
export class CarouselDisplayComponent implements OnInit, OnDestroy {
  @Input() items: { quote: string; name: string; avatar?: string }[] = [];

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
}
