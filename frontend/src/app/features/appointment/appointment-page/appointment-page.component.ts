import { Component, inject, OnInit } from '@angular/core';
import { AppointmentFormComponent } from '../appointment-form/appointment-form.component';
import { appointmentPageData } from './appointment-page.config';
import { SeoService } from '../../../core/seo/seo.service';

@Component({
  selector: 'app-appointment-page',
  imports: [AppointmentFormComponent],
  templateUrl: './appointment-page.component.html',
  styleUrl: './appointment-page.component.scss',
})
export class AppointmentPageComponent implements OnInit {
  appointmentData = appointmentPageData;
  private seo = inject(SeoService);

  ngOnInit(): void {
    this.seo.setAllSeoTags({
      title: 'Reserva tu cita - Fine Line Tattoo',
      description:
        'Reserva tu cita en nuestro estudio de tatuajes en Badajoz. Te ofrecemos un proceso fácil y seguro para que elijas tu diseño ideal.',
      url: 'https://www.finelinetattoostudio.com/reserva-cita',
      image:
        'https://www.finelinetattoostudio.com/assets/images/fine-line-social.jpg',
      indexFollow: true,
      twitterCardType: 'summary_large_image',
    });
  }
}
