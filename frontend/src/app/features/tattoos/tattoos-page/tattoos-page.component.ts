import { Component, inject, OnInit } from '@angular/core';
import { TattooListComponent } from '../tattoo-list/tattoo-list.component';
import { SeoService } from '../../../core/seo/seo.service';

@Component({
  selector: 'app-tattoos-page',
  imports: [TattooListComponent],
  templateUrl: './tattoos-page.component.html',
  styleUrl: './tattoos-page.component.scss',
})
export class TattoosPageComponent implements OnInit {
  private seo = inject(SeoService);

  ngOnInit(): void {
    this.seo.setAllSeoTags({
      title: 'Gestión de Tatuajes | Panel Admin - Fine Line Tattoo',
      description: 'Panel interno para administrar tatuajes del estudio.',
      url: 'https://www.finelinetattoostudio.com/admin/tattoos',
      indexFollow: false,
    });
  }
}
