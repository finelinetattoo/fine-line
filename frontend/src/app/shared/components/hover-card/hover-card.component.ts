import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-hover-card',
  imports: [RouterModule, CommonModule],
  templateUrl: './hover-card.component.html',
  styleUrl: './hover-card.component.scss',
})
export class HoverCardComponent {
  @Input() imageMain!: string;
  @Input() imageOverlay!: string;
  @Input() imageAlt!: string;
  @Input() customClass = '';
}
