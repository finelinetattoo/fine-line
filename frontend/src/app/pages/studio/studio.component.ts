import { Component } from '@angular/core';
import { ParallaxSectionComponent } from '../../components/molecules/parallax-section/parallax-section.component';
import { InfoBlockComponent } from '../../components/molecules/info-block/info-block.component';

@Component({
  selector: 'app-studio',
  imports: [ParallaxSectionComponent, InfoBlockComponent],
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
  whatWeDoSection = {
    title: 'Qué hacemos',
    paragraphs: [
      'Más que un lugar para tatuarse, Fine Line es un espacio para conectar con el arte y sentirte cómodo desde el primer momento.',
      'Cuidamos cada aspecto del ambiente para que la experiencia sea íntima, segura y personalizada.',
    ] as string[],
    imageSrc: 'assets/images/studio/espacio-studio.webp',
    imageAlt: 'Interior del estudio Fine Line',
    imagePosition: 'down',
    backgroundClass: 'bg-beige',
    imageStyle: 'square',
  } as const;
}
