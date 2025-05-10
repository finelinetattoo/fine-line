import { Component } from '@angular/core';
import { ParallaxSectionComponent } from '../../../shared/components/parallax-section/parallax-section.component';
import { InfoBlockComponent } from '../../../shared/components/info-block/info-block.component';
import { CarouselImagesComponent } from '../../../shared/components/carousel/carousel-images/carousel-images.component';
import { SocialFollowComponent } from '../../../shared/components/social-follow/social-follow.component';
import { studioPageData } from './studio-page.config';

@Component({
  selector: 'app-studio-page',
  imports: [
    ParallaxSectionComponent,
    InfoBlockComponent,
    CarouselImagesComponent,
    SocialFollowComponent,
  ],
  templateUrl: './studio-page.component.html',
  styleUrl: './studio-page.component.scss',
})
export class StudioPageComponent {
  studioData = studioPageData;
}
