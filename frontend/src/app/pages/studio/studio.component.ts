import { Component } from '@angular/core';
import { ParallaxSectionComponent } from '../../components/molecules/parallax-section/parallax-section.component';

@Component({
  selector: 'app-studio',
  imports: [ParallaxSectionComponent],
  templateUrl: './studio.component.html',
  styleUrl: './studio.component.scss',
})
export class StudioComponent {
  parallaxSectionData = {
    parallaxBgClass: 'bg-about-mobile md:bg-about-desktop',
    title: 'Un estudio de confianza',
    description:
      'Un estudio diseñado para ofrecer calma, confianza y arte en cada detalle.',
  };
}
