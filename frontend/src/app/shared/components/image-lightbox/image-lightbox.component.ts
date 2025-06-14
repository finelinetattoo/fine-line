import { CommonModule } from '@angular/common';
import {
  Component,
  computed,
  HostListener,
  Input,
  signal,
} from '@angular/core';

@Component({
  selector: 'app-image-lightbox',
  imports: [CommonModule],
  templateUrl: './image-lightbox.component.html',
  styleUrl: './image-lightbox.component.scss',
})
export class ImageLightboxComponent {
  @Input() images: string[] = [];
  index = signal<number | null>(null);

  isOpen = computed(() => this.index() !== null);
  currentImage = computed(() =>
    this.index() !== null ? this.images[this.index()!] : ''
  );

  open(i: number): void {
    this.index.set(i);
  }

  close(): void {
    this.index.set(null);
  }

  next(): void {
    const nextIndex = this.index()! + 1;
    this.index.set(nextIndex >= this.images.length ? 0 : nextIndex);
  }

  prev(): void {
    const prevIndex = this.index()! - 1;
    this.index.set(prevIndex < 0 ? this.images.length - 1 : prevIndex);
  }

  @HostListener('window:keydown', ['$event'])
  handleKeydown(event: KeyboardEvent): void {
    if (!this.isOpen()) return;

    switch (event.key) {
      case 'Escape':
        this.close();
        break;
      case 'ArrowLeft':
        this.prev();
        break;
      case 'ArrowRight':
        this.next();
        break;
    }
  }
}
