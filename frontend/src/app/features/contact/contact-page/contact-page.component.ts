import { Component, inject } from '@angular/core';
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
export class ContactPageComponent {
  private router = inject(Router);
  private notificationService = inject(NotificationService);
  private contactMessageService = inject(ContactMessageService);
  contactData = ContactPageData;

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
