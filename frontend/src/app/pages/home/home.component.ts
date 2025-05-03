import { Component } from '@angular/core';
import { HeroCarouselComponent } from '../../components/molecules/hero-carousel/hero-carousel.component';
import { CommonModule } from '@angular/common';
import { ParallaxSectionComponent } from '../../components/molecules/parallax-section/parallax-section.component';
import { HoverCardComponent } from '../../components/molecules/hover-card/hover-card.component';

@Component({
  selector: 'app-home',
  imports: [
    CommonModule,
    HeroCarouselComponent,
    ParallaxSectionComponent,
    HoverCardComponent,
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {
  parallaxSectionData = {
    parallaxBgClass: 'bg-about-mobile md:bg-about-desktop',
    title: '¿Qué es Fine Line?',
    description:
      'Fine Line es un estudio donde el arte minimalista cobra vida. Nuestro espacio refleja equilibrio, calma y una estética cuidada, ofreciendo tatuajes de precisión con un enfoque moderno y profesional.',
    buttonLabel: 'Reserva tu cita',
    buttonLink: '/reserva',
  };

  heroCarouselData = {
    images: [
      'assets/images/carousel1.jpeg',
      'assets/images/carousel2.jpeg',
      'assets/images/carousel3.jpeg',
    ],
    title: 'FINE LINE Tattoo',
    subtitle: 'Un estudio diferente',
    paragraph1:
      'Estudio de estilo minimalista donde el arte toma forma con precisión y detalle.',
    paragraph2: 'Microrealismo y geometría para quienes buscan algo único.',
    buttonLabel: 'Contáctanos',
    buttonLink: '/contacto',
  };

  hoverCardsData = [
    {
      title: 'Tatuajes',
      imageMain: 'assets/images/tatuaje-brazo-calavera.jpg',
      imageOverlay: 'assets/images/tatuaje-boceto.webp',
      imageLink: 'admin',
    },
    {
      title: 'Kit post-tatuaje',
      imageMain: 'assets/images/kit-post-tatuaje.jpg',
      imageOverlay: 'assets/images/cremas-instrucciones.webp',
      imageLink: 'admin',
    },
  ];
}
