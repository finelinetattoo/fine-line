import { Component, Input } from '@angular/core';
import { CardGridItem } from '../../../core/interfaces/card-grid-item';

@Component({
  selector: 'app-card-grid',
  imports: [],
  templateUrl: './card-grid.component.html',
  styleUrl: './card-grid.component.scss',
})
export class CardGridComponent {
  @Input() items: CardGridItem[] = [];
}
