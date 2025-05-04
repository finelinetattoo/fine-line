import { Component } from '@angular/core';
import { HeroCarouselComponent } from '../../components/molecules/hero-carousel/hero-carousel.component';
import { CommonModule } from '@angular/common';
import { ParallaxSectionComponent } from '../../components/molecules/parallax-section/parallax-section.component';
import { HoverCardComponent } from '../../components/molecules/hover-card/hover-card.component';
import { ButtonComponent } from '../../components/atoms/button/button.component';
import { InfoBlockComponent } from '../../components/molecules/info-block/info-block.component';
import { CarouselDisplayComponent } from '../../components/molecules/carousel-display/carousel-display.component';

@Component({
  selector: 'app-home',
  imports: [
    CommonModule,
    HeroCarouselComponent,
    ParallaxSectionComponent,
    HoverCardComponent,
    ButtonComponent,
    InfoBlockComponent,
    CarouselDisplayComponent,
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
      'assets/images/carousel/carousel1.jpeg',
      'assets/images/carousel/carousel2.jpeg',
      'assets/images/carousel/carousel3.jpeg',
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
      imageMain: 'assets/images/tattoos/tatuaje-brazo-calavera.jpg',
      imageOverlay: 'assets/images/tattoos/tatuaje-boceto.webp',
      ctaLink: '/portafolio',
      ctaLabel: 'Trabajos realizados',
      decoration: 'assets/icons/tatuaje.png',
    },
    {
      title: 'Kit post-tatuaje',
      imageMain: 'assets/images/kit-tattoo/kit-post-tatuaje.jpg',
      imageOverlay: 'assets/images/kit-tattoo/cremas-instrucciones.webp',
      ctaLink: '/recomendaciones',
      ctaLabel: 'Ver recomendaciones',
      decoration: 'assets/icons/band-aid.png',
    },
  ];

  soonSectionCardData = [
    {
      title: 'Micropigmentación',
      imageMain: 'assets/images/micropigmentation/micropigmentacion.png',
      imageOverlay:
        'assets/images/micropigmentation/ilustracion-micropigmentacion.webp',
      ctaLink: '',
      ctaLabel: '',
      decoration: 'assets/icons/lapiz-de-cejas.png',
    },
  ];

  teamSection = {
    title: 'Nuestro equipo',
    paragraphs: [
      'Fine Line cuenta con Liz, nuestra artista especializada en microrealismo, geometría y técnicas avanzadas de cuidado de la piel.',
      'Su atención al detalle y su enfoque meticuloso garantizan una experiencia estética única, profesional y personalizada para cada cliente.',
    ] as string[],
    buttonLabel: 'Contacta',
    buttonLink: '/contacto',
    imageSrc: 'assets/images/artists/liz.webp',
    imageAlt: 'Liz, artista de Fine Line',
    imagePosition: 'left',
    backgroundClass: 'bg-beige',
    imageStyle: 'rounded',
  } as const;

  spaceSection = {
    title: 'Nuestro espacio',
    paragraphs: [
      'El estudio Fine Line está diseñado para ofrecer una atmósfera de calma, limpieza y estética minimalista.',
      'Cada detalle ha sido pensado para asegurar comodidad, intimidad y una experiencia única tanto para el cliente como para el artista.',
    ] as string[],
    buttonLabel: 'Ver estudio',
    buttonLink: '/estudio',
    imageSrc: 'assets/images/studio/espacio-studio.webp',
    imageAlt: 'Interior del estudio Fine Line',
    imagePosition: 'right',
    backgroundClass: 'bg-granite',
    imageStyle: 'square',
  } as const;

  testimonials = [
    {
      quote:
        'Un trato impecable y el diseño quedó espectacular. 100% recomendable.',
      name: 'Claudia M.',
      avatar: 'assets/images/clients/claudia.jpg',
    },
    {
      quote:
        'Me sentí muy cómoda durante toda la sesión. Profesional y limpio.',
      name: 'Alejandro G.',
      avatar: 'assets/images/clients/alejandro.jpg',
    },
  ];
}
