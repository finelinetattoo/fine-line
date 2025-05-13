import { Component } from '@angular/core';
import { recommendationsPageData } from './recommendations-page.config';
import { InfoBlockComponent } from '../../../shared/components/info-block/info-block.component';
import { ParallaxSectionComponent } from '../../../shared/components/parallax-section/parallax-section.component';
import { SocialFollowComponent } from '../../../shared/components/social-follow/social-follow.component';

@Component({
  selector: 'app-recommendations-page',
  imports: [
    InfoBlockComponent,
    ParallaxSectionComponent,
    SocialFollowComponent,
  ],
  templateUrl: './recommendations-page.component.html',
  styleUrl: './recommendations-page.component.scss',
})
export class RecommendationsPageComponent {
  recommendationsData = recommendationsPageData;
}
