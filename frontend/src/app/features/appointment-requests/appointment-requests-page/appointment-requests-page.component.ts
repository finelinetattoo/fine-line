import { Component, inject, OnInit } from '@angular/core';
import { AppointmentRequestsListComponent } from '../appointment-requests-list/appointment-requests-list.component';
import { SeoService } from '../../../core/seo/seo.service';

@Component({
  selector: 'app-appointment-requests-page',
  imports: [AppointmentRequestsListComponent],
  templateUrl: './appointment-requests-page.component.html',
  styleUrl: './appointment-requests-page.component.scss',
})
export class AppointmentRequestsPageComponent implements OnInit {
  private seo = inject(SeoService);

  ngOnInit(): void {
    this.seo.setAllSeoTags({
      title: 'Solicitudes de Cita | Admin',
      description:
        'Panel de administración para gestionar las solicitudes de cita.',
      url: 'https://www.finelinetattoostudio.com/admin/solicitudes-cita',
      indexFollow: false,
    });
  }
}
