import { Component, inject, OnInit } from '@angular/core';
import { portfolioPageData } from './portfolio-page.config';
import { CarouselImagesComponent } from '../../../shared/components/carousel/carousel-images/carousel-images.component';
import { ParallaxSectionComponent } from '../../../shared/components/parallax-section/parallax-section.component';
import { SeoService } from '../../../core/seo/seo.service';

@Component({
  selector: 'app-portfolio-page',
  imports: [CarouselImagesComponent, ParallaxSectionComponent],
  templateUrl: './portfolio-page.component.html',
  styleUrl: './portfolio-page.component.scss',
})
export class PortfolioPageComponent implements OnInit {
  portfolioData = portfolioPageData;
  private seo = inject(SeoService);

  ngOnInit(): void {
    this.seo.setAllSeoTags({
      title: 'Trabajos Realizados - Fine Line Tattoo',
      description:
        'Explora nuestra galería de tatuajes realistas y minimalistas. Descubre trabajos realizados por nuestros artistas en Badajoz.',
      url: 'https://www.finelinetattoostudio.com/trabajos-realizados',
      image:
        'https://www.finelinetattoostudio.com/assets/images/fine-line-social.jpg',
      indexFollow: true,
      twitterCardType: 'summary_large_image',
    });
  }
}
