import { Component } from '@angular/core';
import { HeroCarouselComponent } from '../../components/molecules/hero-carousel/hero-carousel.component';
import { CommonModule } from '@angular/common';
import { AboutUsComponent } from '../../components/molecules/about-us/about-us.component';

@Component({
  selector: 'app-home',
  imports: [CommonModule, HeroCarouselComponent, AboutUsComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {}
