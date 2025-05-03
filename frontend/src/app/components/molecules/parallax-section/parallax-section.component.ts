import { Component, Input } from '@angular/core';
import { ButtonComponent } from '../../atoms/button/button.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-parallax-section',
  imports: [ButtonComponent, CommonModule],
  templateUrl: './parallax-section.component.html',
  styleUrl: './parallax-section.component.scss',
})
export class ParallaxSectionComponent {
  @Input() backgroundImage: string = '';
  @Input() title: string = '';
  @Input() description: string = '';
  @Input() buttonLabel: string = '';
  @Input() buttonLink: string = '';
}
