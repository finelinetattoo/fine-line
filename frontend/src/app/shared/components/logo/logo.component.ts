import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-logo',
  imports: [CommonModule],
  templateUrl: './logo.component.html',
  styleUrl: './logo.component.scss',
})
export class LogoComponent {
  @Input() size: 'small' | 'medium' | 'large' | 'extralarge' = 'medium';
  @Input({ required: false }) imgClass = '';

  readonly urlIconWeb = 'favicon.ico';
}
