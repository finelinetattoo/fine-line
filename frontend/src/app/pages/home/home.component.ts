import { Component } from '@angular/core';
import { HeroCarouselComponent } from '../../components/molecules/hero-carousel/hero-carousel.component';
import { CommonModule } from '@angular/common';
import { ParallaxSectionComponent } from '../../components/molecules/parallax-section/parallax-section.component';

@Component({
  selector: 'app-home',
  imports: [CommonModule, HeroCarouselComponent, ParallaxSectionComponent],
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
}
