import { Component, inject, OnInit } from '@angular/core';
import { HeroCarouselComponent } from '../../../shared/components/hero-carousel/hero-carousel.component';
import { CommonModule } from '@angular/common';
import { ParallaxSectionComponent } from '../../../shared/components/parallax-section/parallax-section.component';
import { HoverCardComponent } from '../../../shared/components/hover-card/hover-card.component';
import { ButtonComponent } from '../../../shared/components/button/button.component';
import { InfoBlockComponent } from '../../../shared/components/info-block/info-block.component';
import { CarouselRatingComponent } from '../../../shared/components/carousel/carousel-rating/carousel-rating.component';
import { SocialFollowComponent } from '../../../shared/components/social-follow/social-follow.component';
import { homePageData } from './home-page.config';
import { SeoService } from '../../../core/seo/seo.service';

@Component({
  selector: 'app-home-page',
  imports: [
    CommonModule,
    HeroCarouselComponent,
    ParallaxSectionComponent,
    HoverCardComponent,
    ButtonComponent,
    InfoBlockComponent,
    CarouselRatingComponent,
    SocialFollowComponent,
  ],
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.scss',
})
export class HomePageComponent implements OnInit {
  homeData = homePageData;
  private seo = inject(SeoService);

  ngOnInit(): void {
    this.seo.setAllSeoTags({
      title: 'Estudio de Tatuajes Profesional en Badajoz | Fine Line Tattoo',
      description:
        'Estudio de tatuajes en Badajoz especializado en fineline, diseños minimalistas y micropigmentación. Tattoo profesional con detalle.',
      url: 'https://www.finelinetattoostudio.com',
      image:
        'https://www.finelinetattoostudio.com/assets/images/fine-line-social.jpg',
      indexFollow: true,
      twitterCardType: 'summary_large_image',
    });
  }
}
