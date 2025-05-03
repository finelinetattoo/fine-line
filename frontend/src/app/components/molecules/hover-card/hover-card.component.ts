import { Component, Input } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-hover-card',
  imports: [RouterModule],
  templateUrl: './hover-card.component.html',
  styleUrl: './hover-card.component.scss',
})
export class HoverCardComponent {
  @Input() imageMain!: string;
  @Input() imageOverlay!: string;
  @Input() imageAlt!: string;
  @Input() imageLink!: string;
}
