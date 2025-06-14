import { Component, Input, ViewChild } from '@angular/core';
import { CardGridItem } from '../../../core/interfaces/card-grid-item';
import { ImageLightboxComponent } from '../image-lightbox/image-lightbox.component';

@Component({
  selector: 'app-card-grid',
  imports: [ImageLightboxComponent],
  templateUrl: './card-grid.component.html',
  styleUrl: './card-grid.component.scss',
})
export class CardGridComponent {
  @Input() items: CardGridItem[] = [];
  @ViewChild('lightbox') lightbox!: ImageLightboxComponent;

  openLightbox(index: number) {
    this.lightbox.open(index);
  }

  get imageUrls(): string[] {
    return this.items.map((i) => i.image);
  }
}
