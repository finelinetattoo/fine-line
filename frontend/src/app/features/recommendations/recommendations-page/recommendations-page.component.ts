import { Component, inject, OnInit } from '@angular/core';
import { recommendationsPageData } from './recommendations-page.config';
import { InfoBlockComponent } from '../../../shared/components/info-block/info-block.component';
import { ParallaxSectionComponent } from '../../../shared/components/parallax-section/parallax-section.component';
import { SocialFollowComponent } from '../../../shared/components/social-follow/social-follow.component';
import { SeoService } from '../../../core/seo/seo.service';

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
export class RecommendationsPageComponent implements OnInit {
  recommendationsData = recommendationsPageData;
  private seo = inject(SeoService);

  ngOnInit(): void {
    this.seo.setAllSeoTags({
      title: 'Recomendaciones y Cuidados - Fine Line Tattoo',
      description:
        'Sigue nuestras recomendaciones para el cuidado antes y después de tu tatuaje. Asegura una curación adecuada y resultados duraderos.',
      url: 'https://www.finelinetattoostudio.com/recomendaciones',
      image:
        'https://www.finelinetattoostudio.com/assets/images/fine-line-social.jpg',
      indexFollow: true,
      twitterCardType: 'summary_large_image',
    });
  }
}
