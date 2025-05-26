import { Component, inject, OnInit } from '@angular/core';
import { ClientsListComponent } from '../clients-list/clients-list.component';
import { SeoService } from '../../../core/seo/seo.service';

@Component({
  selector: 'app-clients-page',
  imports: [ClientsListComponent],
  templateUrl: './clients-page.component.html',
  styleUrl: './clients-page.component.scss',
})
export class ClientsPageComponent implements OnInit {
  private seo = inject(SeoService);

  ngOnInit(): void {
    this.seo.setAllSeoTags({
      title: 'Listado de clientes | Admin',
      description: 'Administración interna de clientes del estudio.',
      url: 'https://www.finelinetattoostudio.com/admin/clients',
      indexFollow: false,
    });
  }
}
