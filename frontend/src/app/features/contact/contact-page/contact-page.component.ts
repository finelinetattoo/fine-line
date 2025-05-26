import { Component, inject, OnInit } from '@angular/core';
import { VideoBannerComponent } from '../../../shared/components/video-banner/video-banner.component';
import { ContactPageData } from './contact-page.config';
import { FormBuilderComponent } from '../../../shared/components/form-builder/form-builder.component';
import { Router } from '@angular/router';
import { NotificationService } from '../../../shared/services/notification/notification.service';
import { IconsSectionComponent } from '../../../shared/components/icons-section/icons-section.component';
import { ParallaxSectionComponent } from '../../../shared/components/parallax-section/parallax-section.component';
import { SocialFollowComponent } from '../../../shared/components/social-follow/social-follow.component';
import { ScheduleSectionComponent } from '../../../shared/components/schedule-section/schedule-section.component';
import { MapSectionComponent } from '../../../shared/components/map-section/map-section.component';
import { ContactMessageService } from '../../messages-contact/messages-contact-service/messages-contact.service';
import { SeoService } from '../../../core/seo/seo.service';

@Component({
  selector: 'app-contact-page',
  imports: [
    VideoBannerComponent,
    FormBuilderComponent,
    IconsSectionComponent,
    ParallaxSectionComponent,
    SocialFollowComponent,
    ScheduleSectionComponent,
    MapSectionComponent,
  ],
  templateUrl: './contact-page.component.html',
  styleUrl: './contact-page.component.scss',
})
export class ContactPageComponent implements OnInit {
  private router = inject(Router);
  private notificationService = inject(NotificationService);
  private contactMessageService = inject(ContactMessageService);
  contactData = ContactPageData;
  private seo = inject(SeoService);

  ngOnInit(): void {
    this.seo.setAllSeoTags({
      title: 'Contacto - Fine Line Tattoo',
      description:
        'Contáctanos para resolver tus dudas o reservar tu cita. Estamos encantados de ayudarte en nuestro estudio en Badajoz.',
      url: 'https://www.finelinetattoostudio.com/contacto',
      image:
        'https://www.finelinetattoostudio.com/assets/images/fine-line-social.jpg',
      indexFollow: true,
      twitterCardType: 'summary_large_image',
    });
  }

  handleSubmit(formData: any): void {
    this.contactMessageService.create(formData).subscribe({
      next: () => {
        this.notificationService.success(
          'Mensaje enviado',
          'Gracias por contactarnos. Te responderemos pronto.'
        );
        this.router.navigateByUrl('/');
      },
      error: () => {
        this.notificationService.error(
          'Error al enviar',
          'Hubo un problema al enviar tu mensaje. Intenta nuevamente.'
        );
      },
    });
  }
}
