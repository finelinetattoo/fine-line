import { Component } from '@angular/core';
import { HeroCarouselComponent } from '../../components/molecules/hero-carousel/hero-carousel.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home',
  imports: [CommonModule, HeroCarouselComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {}
