import { Component } from '@angular/core';
import { ParallaxSectionComponent } from '../../shared/components/molecules/parallax-section/parallax-section.component';
import { InfoBlockComponent } from '../../shared/components/molecules/info-block/info-block.component';
import { CarouselImagesComponent } from '../../shared/components/molecules/carousel-images/carousel-images.component';
import { SocialFollowComponent } from '../../shared/components/molecules/social-follow/social-follow.component';
import { studioPageData } from '../../config/studio-page.config';

@Component({
  selector: 'app-studio',
  imports: [
    ParallaxSectionComponent,
    InfoBlockComponent,
    CarouselImagesComponent,
    SocialFollowComponent,
  ],
  templateUrl: './studio.component.html',
  styleUrl: './studio.component.scss',
})
export class StudioComponent {
  studioData = studioPageData;
}
