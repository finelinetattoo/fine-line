import { Component, inject, OnInit } from '@angular/core';
import { ClientsPageComponent } from '../../clients/clients-page/clients-page.component';
import { SeoService } from '../../../core/seo/seo.service';

@Component({
  selector: 'app-dashboard-page',
  imports: [ClientsPageComponent],
  templateUrl: './dashboard-page.component.html',
  styleUrl: './dashboard-page.component.scss',
})
export class DashboardPageComponent implements OnInit {
  private seo = inject(SeoService);

  ngOnInit(): void {
    this.seo.setAllSeoTags({
      title: 'Panel de administración | Fine Line Tattoo',
      description: 'Panel privado para gestión interna del estudio.',
      url: 'https://www.finelinetattoostudio.com/admin/dashboard',
      indexFollow: false,
    });
  }
}
