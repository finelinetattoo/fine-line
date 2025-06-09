import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-logo',
  imports: [CommonModule],
  templateUrl: './logo.component.html',
  styleUrl: './logo.component.scss',
})
export class LogoComponent {
  @Input() width: number = 64;
  @Input() height: number = 64;
  @Input() invert: boolean = false;
  private sizeValue: 'small' | 'medium' | 'large' | 'extralarge' = 'medium';

  @Input()
  set size(value: 'small' | 'medium' | 'large' | 'extralarge') {
    this.sizeValue = value;
    const map = {
      small: 'logo-fine-line-small.webp',
      medium: 'logo-fine-line-medium.webp',
      large: 'logo-fine-line-large.webp',
      extralarge: 'logo-fine-line-extralarge.webp',
    };
    this.urlIconWeb = `assets/images/logo/${map[value] ?? map.medium}`;
  }
  get size() {
    return this.sizeValue;
  }

  @Input({ required: false }) imgClass = '';

  public urlIconWeb = 'assets/images/logo/logo-fine-line-medium.webp';
}
