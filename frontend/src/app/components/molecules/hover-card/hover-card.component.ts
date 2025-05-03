import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-hover-card',
  imports: [],
  templateUrl: './hover-card.component.html',
  styleUrl: './hover-card.component.scss',
})
export class HoverCardComponent {
  @Input() imageMain!: string;
  @Input() imageOverlay!: string;
  @Input() imageAlt!: string;
}
