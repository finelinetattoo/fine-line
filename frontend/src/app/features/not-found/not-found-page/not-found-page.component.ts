import { Component, inject, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ButtonComponent } from '../../../shared/components/button/button.component';
import { notFoundPageData } from './not-found-page.config';
import { SeoService } from '../../../core/seo/seo.service';

@Component({
  selector: 'app-not-found-page',
  imports: [RouterModule, ButtonComponent],
  templateUrl: './not-found-page.component.html',
  styleUrl: './not-found-page.component.scss',
})
export class NotFoundPageComponent implements OnInit {
  notFoundData = notFoundPageData;
  private seo = inject(SeoService);

  ngOnInit(): void {
    this.seo.setAllSeoTags({
      title: 'Página no encontrada | Fine Line Tattoo',
      description: 'Lo sentimos, no hemos encontrado la página que buscas.',
      url: 'https://www.finelinetattoostudio.com/404',
      indexFollow: false,
    });
  }
}
