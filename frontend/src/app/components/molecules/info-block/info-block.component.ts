import { Component, Input } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ButtonComponent } from '../../atoms/button/button.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-info-block',
  imports: [CommonModule, RouterModule, ButtonComponent],
  templateUrl: './info-block.component.html',
  styleUrl: './info-block.component.scss',
})
export class InfoBlockComponent {
  @Input() title!: string;
  @Input() paragraphs: readonly string[] = [];
  @Input() buttonLabel?: string;
  @Input() buttonLink?: string;
  @Input() imageSrc?: string;
  @Input() imageAlt = '';
  @Input() imagePosition: 'left' | 'right' = 'left';
  @Input() backgroundClass = '';
  @Input() imageStyle: 'rounded' | 'square' = 'rounded';
}
