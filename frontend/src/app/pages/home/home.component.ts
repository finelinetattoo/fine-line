import { Component } from '@angular/core';
import { HeroCarouselComponent } from '../../shared/components/molecules/hero-carousel/hero-carousel.component';
import { CommonModule } from '@angular/common';
import { ParallaxSectionComponent } from '../../shared/components/molecules/parallax-section/parallax-section.component';
import { HoverCardComponent } from '../../shared/components/molecules/hover-card/hover-card.component';
import { ButtonComponent } from '../../shared/components/atoms/button/button.component';
import { InfoBlockComponent } from '../../shared/components/molecules/info-block/info-block.component';
import { CarouselRatingComponent } from '../../shared/components/molecules/carousel-rating/carousel-rating.component';
import { SocialFollowComponent } from '../../shared/components/molecules/social-follow/social-follow.component';
import { homePageData } from '../../config/home-page.config';

@Component({
  selector: 'app-home',
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
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {
  homeData = homePageData;
}
