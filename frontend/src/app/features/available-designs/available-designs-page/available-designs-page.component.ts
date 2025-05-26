import { Component, inject, OnInit } from '@angular/core';
import { CardGridComponent } from '../../../shared/components/card-grid/card-grid.component';
import { AvailableDesignsPageData } from './available-designs-page.config';
import { ParallaxSectionComponent } from '../../../shared/components/parallax-section/parallax-section.component';
import { SeoService } from '../../../core/seo/seo.service';

@Component({
  selector: 'app-available-designs-page',
  imports: [CardGridComponent, ParallaxSectionComponent],
  templateUrl: './available-designs-page.component.html',
  styleUrl: './available-designs-page.component.scss',
})
export class AvailableDesignsPageComponent implements OnInit {
  availabeDesignsData = AvailableDesignsPageData;
  private seo = inject(SeoService);

  ngOnInit(): void {
    this.seo.setAllSeoTags({
      title: 'Diseños Disponibles de Tatuajes - Fine Line Tattoo',
      description:
        'Descubre nuestros diseños exclusivos de tatuajes disponibles para reserva. Arte original y personalizado en Badajoz.',
      url: 'https://www.finelinetattoostudio.com/disenos',
      image:
        'https://www.finelinetattoostudio.com/assets/images/fine-line-social.jpg',
      indexFollow: true,
      twitterCardType: 'summary_large_image',
    });
  }
}
