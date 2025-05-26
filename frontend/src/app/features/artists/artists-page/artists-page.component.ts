import { Component, inject, OnInit } from '@angular/core';
import { ArtistListComponent } from '../artists-list/artist-list.component';
import { SeoService } from '../../../core/seo/seo.service';

@Component({
  selector: 'app-artists-page',
  imports: [ArtistListComponent],
  templateUrl: './artists-page.component.html',
  styleUrl: './artists-page.component.scss',
})
export class ArtistsPageComponent implements OnInit {
  private seo = inject(SeoService);

  ngOnInit(): void {
    this.seo.setAllSeoTags({
      title: 'Gestión de Artistas | Admin',
      description: 'Panel de administración para gestionar artistas.',
      url: 'https://www.finelinetattoostudio.com/admin/artists',
      indexFollow: false,
    });
  }
}
