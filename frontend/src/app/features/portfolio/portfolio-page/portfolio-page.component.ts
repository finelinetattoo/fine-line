import { Component } from '@angular/core';
import { portfolioPageData } from './portfolio-page.config';
import { CarouselImagesComponent } from '../../../shared/components/carousel/carousel-images/carousel-images.component';
import { ParallaxSectionComponent } from '../../../shared/components/parallax-section/parallax-section.component';

@Component({
  selector: 'app-portfolio-page',
  imports: [CarouselImagesComponent, ParallaxSectionComponent],
  templateUrl: './portfolio-page.component.html',
  styleUrl: './portfolio-page.component.scss',
})
export class PortfolioPageComponent {
  portfolioData = portfolioPageData;
}
