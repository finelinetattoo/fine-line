import { Component, inject, OnInit } from '@angular/core';
import { ParallaxSectionComponent } from '../../../shared/components/parallax-section/parallax-section.component';
import { InfoBlockComponent } from '../../../shared/components/info-block/info-block.component';
import { CarouselImagesComponent } from '../../../shared/components/carousel/carousel-images/carousel-images.component';
import { SocialFollowComponent } from '../../../shared/components/social-follow/social-follow.component';
import { studioPageData } from './studio-page.config';
import { SeoService } from '../../../core/seo/seo.service';

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
export class StudioPageComponent implements OnInit {
  studioData = studioPageData;
  private seo = inject(SeoService);

  ngOnInit(): void {
    this.seo.setAllSeoTags({
      title: 'Nuestro Estudio - Fine Line Tattoo',
      description:
        'Descubre nuestro estudio de tatuajes en Badajoz. Espacio creativo, higiénico y profesional.',
      url: 'https://www.finelinetattoostudio.com/estudio',
      image:
        'https://www.finelinetattoostudio.com/assets/images/fine-line-social.jpg',
      indexFollow: true,
      twitterCardType: 'summary_large_image',
    });
  }
}
